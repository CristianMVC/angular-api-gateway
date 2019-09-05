import fs                   from 'fs'
import moment               from 'moment'
import {
    createHash,
/*     createCipheriv,
    createDecipheriv, */
}                           from 'crypto'
import logger               from '../../config/winston'
import config               from '../../config/env'

const {
/*     algorithm: cipherAlgorithm,
    password: cipherPassword, */
    path: apiPathLocal,
} = config.base64FileCipher

const dataSeparator = '<||----||>'

try {
    fs.mkdirSync(apiPathLocal)
} catch (e) {
    if (e.code !== 'EEXIST') {
        logger.log('debug', e.message)
    }
}

/**
 *
 * @param {String} dniNumber
 * @param {String} extraData
 */
const createHashString = (dniNumber, extraData) => {
    const hash = createHash('md5')
    const dataToHash = `${dniNumber}${extraData}`

    hash.update(dataToHash, 'utf8')

    return hash.digest('hex')
}

const isValidHash = (hashStringToCompare, dniNumber, extraData) => {
    const hashStringFromUserData = createHashString(dniNumber, extraData)

    return hashStringToCompare === hashStringFromUserData
}

const createFileByHash = (dniNumber, userDir, base64Key, base64Value, validUntil = false) => {
    const validUntilString = validUntil ? validUntil.toISOString() : moment().add(12, 'hours').toISOString()

    const filePromise = new Promise((resolve, reject) => {
        const base64FileName = createHashString(dniNumber, base64Key)

        /* const fileCipher = createCipheriv(cipherAlgorithm, cipherPassword, Buffer.from(hashString, 'hex'))

        let fileCrypted = fileCipher.update(Buffer.from(base64Value, 'utf8'))
        fileCrypted = Buffer.concat([
            fileCrypted,
            fileCipher.final(),
        ])

        fs.writeFile(`${userDir}/${base64FileName}`, fileCrypted, (e) => {
            if (e) {
                logger.log('debug', e)
                reject(e)
                return
            }

            resolve()
        }) */

        fs.writeFile(`${userDir}/${base64FileName}`, `${base64Value}${dataSeparator}${validUntilString}`, (e) => {
            if (e) {
                reject(e)
                return
            }

            resolve()
        })
    })

    return filePromise
}

/**
 *
 * @param {String} dniNumber
 * @param {String} group
 * @param {String} folder
 * @param {Object} base64Objects
 * @param {moment.Moment} validUntil
 */


const createFilesByHash = (dniNumber, group, folder, base64Objects, validUntil = false) => {
    const hashString = createHashString(dniNumber, group + folder)
    const userDir = `${apiPathLocal}/${hashString}`

    //const validUntilString = validUntil ? validUntil.toISOString() : moment().add(12, 'hours').toISOString()

    const createFilesPromise = new Promise((resolve, reject) => {
        fs.mkdir(userDir, (eDir) => {
            if (eDir && eDir.code !== 'EEXIST') {
                reject(eDir)
                return
            }

            const createPromises = []
            let base64Pars
            try {
                base64Pars = Object.entries(base64Objects)
            } catch (e) {
                reject(e)
                return
            }


            // eslint-disable-next-line comma-spacing
            for (const [base64Key, base64Value,] of base64Pars) {
                const filePromise = createFileByHash(dniNumber, userDir, base64Key, base64Value, validUntil)
                createPromises.push(filePromise)
            }

            Promise.all(createPromises)
                .then(() => {
                    resolve(hashString)
                })
                .catch((eFile) => {
                    reject(eFile)
                })
        })
    })

    return createFilesPromise
}

/**
 *
 * @param {String} hashString
 * @param {String} base64FilePath
 * @param {String} base64Key
 */
const getValidFile = (hashString, base64FilePath, base64Key) => {
    const getValidFilePromise = new Promise((resolve, reject) => {
        fs.stat(base64FilePath, (e, base64FileStats) => {
            if (e) {
                reject(e)
                return
            }

            fs.readFile(base64FilePath, (e, data) => {
                if (e) {
                    reject(e)
                    return
                }

                const dataString = data.toString()
                const haveValidUntilDate = dataString.includes(dataSeparator)

                if (!haveValidUntilDate) {
                    if ((base64FileStats.mtimeM / 43200000) >= 1) { //43200000 milisegundos = 12 horas limite
                        reject(new Error('File too Old'))
                        return
                    }
                    resolve({
                        key: base64Key,
                        value: dataString,
                    })
                    return
                }

                const dataStringSplited = dataString.split(dataSeparator)

                const now = moment()

                const dateLimit = moment(dataStringSplited[1])

                //expired Limit
                if (now.isAfter(dateLimit)) {
                    reject(new Error('File too Old'))
                    return
                }

                resolve({
                    key: base64Key,
                    value: dataStringSplited[0],
                    validUntil: dateLimit.toISOString(),
                })

                /* const fileDecipher = createDecipheriv(cipherAlgorithm, cipherPassword, Buffer.from(hashString, 'hex'))
                let descryptedFile = fileDecipher.update(data)
                descryptedFile = Buffer.concat([
                    descryptedFile,
                    fileDecipher.final(),
                ])

                resolve({
                    key: base64Key,
                    value: descryptedFile.toString('utf8'),
                }) */
            })
        })
    })

    return getValidFilePromise
}
/**
 *
 * @param {String} hashToCompare
 * @param {String} dniNumber
 * @param {String} extraData
 * @param {String} folder
 * @param {String[]} base64sKeys
 */

const getFilesByHash = (hashToCompare, dniNumber, extraData, group, folder, base64sKeys) => {
    if (hashToCompare) {
        const isValid = isValidHash(hashToCompare, dniNumber, extraData)

        if (!isValid) {
            return Promise.reject(new Error('Invalid Hash for data provided'))
        }
    }

    const hashString = createHashString(dniNumber, group + folder)
    const userDir = `${apiPathLocal}/${hashString}`

    const getFilesByHashPromise = new Promise((resolve, reject) => {
        const getFilesPromises = []

        for (const base64Key of base64sKeys) {
            const base64FileName = createHashString(dniNumber, base64Key)
            const base64FilePath = `${userDir}/${base64FileName}`

            getFilesPromises.push(getValidFile(hashToCompare, base64FilePath, base64Key))
        }

        Promise.all(getFilesPromises)
            .then((filesRes) => {
                const files = {}
                const validities = {}
                for (const { key, value, validUntil, } of filesRes) {
                    files[key] = value
                    validities[key] = validUntil
                }
                resolve({ files, validities, })
            })
            .catch((e) => {
                reject(e)
            })
    })

    return getFilesByHashPromise
}

/**
 *
 * @param {Object} modelWithFiles
 */

const createFilesByModel = async (instanceWithFiles, modelWithFiles, dniNumber, group, folder) => {
    const entries = Object.entries(modelWithFiles)

    const valuesToFiles = {}
    // eslint-disable-next-line comma-spacing
    for (const [key, value,] of entries) {
        if (value !== String) { //comparador, interface String
            instanceWithFiles[key] = await createFilesByModel(instanceWithFiles[key], modelWithFiles[key], dniNumber, group, folder)
            continue
        }
        valuesToFiles[key] = instanceWithFiles[key]
        delete instanceWithFiles[key]
    }
    if (Object.keys(valuesToFiles).length) {
        const hashToGetFiles = await createFilesByHash(dniNumber, group, folder, valuesToFiles)

        instanceWithFiles.hash = hashToGetFiles
    }

    return instanceWithFiles
}

const getFilesByModel = async (instanceWithFiles, modelWithFiles, dniNumber, group, folder) => {
    const entries = Object.entries(modelWithFiles)

    const filesToValues = []
    // eslint-disable-next-line comma-spacing
    for (const [key, value,] of entries) {
        if (value !== String) { //comparador, interface String
            instanceWithFiles[key] = await getFilesByModel(instanceWithFiles[key], modelWithFiles[key], dniNumber, group, folder)
            continue
        }
        filesToValues.push(key)
    }

    if (!instanceWithFiles.hash) {
        throw new Error('noHash')
    }

    delete instanceWithFiles.hash

    const { files, } = await getFilesByHash(false, dniNumber, false, group, folder, filesToValues)

    Object.assign(instanceWithFiles, files)

    return instanceWithFiles
}


export {
    getFilesByHash,
    createFilesByHash,
    createHashString,
    getFilesByModel,
    createFilesByModel,
}