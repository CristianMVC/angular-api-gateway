import request                                              from 'superagent'
import moment                                               from 'moment'
import Promise                                              from 'bluebird'
import config                                               from '../../../../config/env'
import {
    getFilesByHash,
    createFilesByHash,
    createHashString,
}                                                           from '../../../helpers/base64Files'
import {
    getInsurance,
    getInsuranceImages,
    getInsuranceData,
}                                                           from './seguro-automor'
import { getRadication, }                                   from './radicacion'
import logger                                               from '../../../../config/winston'

const { token, personas, cedulas, } = config.ws2.dnrpa
const { body: tokenData, url: tokenUrl, } = token
const folderDnrpaCedulas = 'dnrpa/cedulas'

const { VERBOSE_ID_CARDS, API_CREDENTIALS, } = process.env


let externalToken = {}

/**
 *
 * @param {request.ResponseError} e
 * @param {String} customMessage
 */

const errorParser = (e, customMessage = '') => {
    return {
        status: e.status && e.status < 500 ? e.status : 503,
        message: e.status == 404 ? 'Not Found' : `Error en el servicio externo::${customMessage}`,
        devMessage: e.message,
    }
}

const refreshToken = () => {
    const refreshPromise = new Promise((resolve, reject) => {
    request.post(tokenUrl).type('form').send(tokenData)
        .then(({ body: data, }) => {
            try {
                const { expires_in: lifetime, access_token: token, token_type: type, } = data

                externalToken = {
                    lifetime,
                    token,
                    type,
                    limitDate: moment().add(lifetime - 100, 'seconds'),
                }

                resolve(type + ' ' + token)
            } catch (e) {
                reject(errorParser(e, 'Token'))
            }
        })
        .catch((e) => {
            reject(errorParser(e, 'Token'))
        })
    })

    return refreshPromise
}

const getExternalToken = () => {
    return Promise.resolve('Bearer token') //TODO: remover
    /* const { token, type, limitDate, } = externalToken

    if (!limitDate) {
        return refreshToken()
    }

    const currentDate = moment()

    const isExpired = moment(limitDate).isSameOrBefore(currentDate)

    if (isExpired) {
        return refreshToken()
    }

    return Promise.resolve(type + ' ' + token) */
}


const keysToTrim = [
    'dominio',
    'marca',
    'modelo',
    'tipo',
    'placa',
]

const idCardKeys = [
    'frente',
    'dorso',
    'qr',
]

/**
 *
 * @param {Object} idCard
 */
const parseIdCard = (idCard) => {
    //idCard.numero_cedula = parseInt(idCard.numero_cedula)
    for (const keyToTrim of keysToTrim) {
        idCard[keyToTrim] = idCard[keyToTrim].trim()
    }

    idCard.habilitada = idCard.habilitada.toUpperCase() === 'SI'

    return idCard
}


/**
 *
 * @param {String} dniNumber
 * @param {String} domain
 * @param {String} idCardNumber
 */
const getIdCardImage = (dniNumber, idCardNumber) => {
    return new Promise((resolve, reject) => {
        getExternalToken()
            .then((token) => {
                const getIdCardImageUrl = `${personas.url}/${dniNumber}/cedula-imagenes/${idCardNumber}`
                request.get(getIdCardImageUrl)
                        .accept('json')
                        .set('Authorization', token)
                        .set('Cache-Control', 'no-cache')
                        .then(({ body: data, status, }) => {
                            try {
                                const {
                                    cedula_frente: frente,
                                    cedula_contra_frente: dorso,
                                    qr,
                                    exp,
                                } = data

                                resolve({ frente, dorso, qr, exp, })

                                if (VERBOSE_ID_CARDS) {
                                    logger.info(`>>>>>> SUCCESS ENDPOINT 2; DNI:${dniNumber}; CEDULA:${idCardNumber}; STATUS:${status}`)
                                }
                            } catch (e) {
                                reject(errorParser(e, 'Obtener Imagen'))
                                return
                            }
                        })
                        .catch((e) => {
                            if (VERBOSE_ID_CARDS) {
                                logger.error(`>>>>>> ERROR ENDPOINT 2; DNI:${dniNumber}; CEDULA:${idCardNumber}; STATUS:${e.status}`)
                            }
                            reject(errorParser(e, 'Obtener Imagen'))
                            return
                        })
            })
            .catch((e) => {
                reject(e)
            })
    })
}

/**
 *
 * @param {String} hashToCompare
 * @param {String} dniNumber
 * @param {String} idCardNumber
 * @param {String} extraData
 */
const getOrCreateImageByHash = (hashToCompare, dniNumber, idCardNumber, extraData) => {
    const getOrCreateImageByHashPromise = new Promise((resolve, reject) => {
        getFilesByHash(hashToCompare, dniNumber, extraData, folderDnrpaCedulas, idCardNumber, idCardKeys)
            .then((response) => {
                const { files, validities, } = response
                const { qr: exp, } = validities
                files.exp = exp
                resolve(files)
            })
            .catch(() => {
                getIdCardImage(dniNumber, idCardNumber)
                    .then((files) => {
                        const { exp, } = files

                        delete files.exp

                        const validUntilMoment = moment.unix(exp)

                        createFilesByHash(dniNumber, folderDnrpaCedulas, idCardNumber, files, validUntilMoment)
                            .catch(() => {})
                            .finally(() => {
                                files.exp = validUntilMoment.toISOString()
                                files.isRefresh = true
                                resolve(files)
                            })
                    })
                    .catch(reject)
            })
    })

    return getOrCreateImageByHashPromise
}

/**
 *
 * @param {String} dniNumber
 * @param {Number} limit
 * @param {Number} offset
 * @param {Boolean} withImages
 */

const getIdCards = (dniNumber, limit = 1000, offset = 0, withImages = false) => {
    const idCardsPromise = new Promise((resolve, reject) => {
        getExternalToken()
            .then((token) => {
                const idCardsUrl = `${personas.url}/${dniNumber}/cedulas`
                request.get(idCardsUrl)
                        .accept('json')
                        .query({
                            limit,
                            offset,
                        })
                        .set('Authorization', token)
                        .set('Cache-Control', 'no-cache')
                            .then(({ body: data, status, }) => {
                                let idCardsParsed
                                try {
                                    idCardsParsed = data.results.map((idCard) => parseIdCard(idCard))
                                } catch (e) {
                                    reject(errorParser(e, 'Cedulas'))
                                    return
                                }

                                let idCardsCount = 0

                                const getImagesPromises = []

                                for (const indexIdCard in idCardsParsed) {
                                    const {
                                        habilitada: enabled,
                                    } = idCardsParsed[indexIdCard]

                                    if (!enabled) {
                                        continue
                                    }

                                    if (VERBOSE_ID_CARDS) {
                                        idCardsCount++
                                    }

                                    const {
                                        dominio: domain,
                                        numero_cedula: idCardNumber,
                                    } = idCardsParsed[indexIdCard]
                                    const extraData = domain + idCardNumber
                                    const hashToCompare = createHashString(dniNumber, extraData)

                                    const getImagesPromise = API_CREDENTIALS ? Promise.resolve() : new Promise((resolve, reject) => {
                                        getOrCreateImageByHash(hashToCompare, dniNumber, idCardNumber, extraData)
                                            .then(({ exp, frente, dorso, qr, }) => {
                                                if (withImages) {
                                                    Object.assign(idCardsParsed[indexIdCard], { exp, imagenes: { frente, dorso, qr, }, })
                                                    return
                                                }

                                                idCardsParsed[indexIdCard].exp = exp
                                            })
                                            .catch(() => {})
                                            .finally(() => {
                                                idCardsParsed[indexIdCard].hash = hashToCompare
                                                resolve()
                                            })
                                    })

                                    getImagesPromises.push(getImagesPromise)
                                }

                                if (VERBOSE_ID_CARDS) {
                                    logger.info(`>>>>>> SUCCESS ENDPOINT 1; DNI:${dniNumber}; CANTIDAD:${idCardsCount}; STATUS:${status};`)
                                }

                                Promise.all(getImagesPromises)
                                    .then(()=> {})
                                    .catch(() => {})
                                    .finally(() => {
                                        resolve(idCardsParsed)
                                    })
                            })
                            .catch((e) => {
                                if (VERBOSE_ID_CARDS) {
                                    logger.error(`>>>>>> ERROR ENDPOINT 1; DNI:${dniNumber}; STATUS:${e.status};`)
                                }

                                reject(errorParser(e, 'Cedulas'))
                            })
            })
            .catch((e) => {
                reject(e)
            })
    })

    return idCardsPromise
}

/**
 *
 * @param {String} dniNumber
 * @param {String} idCardNumber
 */

const activateIdCard = (dniNumber, idCardNumber) => {
    //mkdirSync('/tmp/tests-cedulas')
    const activatePromise = new Promise((resolve, reject) => {
        getExternalToken()
            .then((token) => {
                request.post(cedulas.url)
                    .accept('json')
                    .set('Authorization', token)
                    .send({
                        dni: dniNumber,
                        cedula: idCardNumber,
                    })
                    .then(() => {
                        resolve()
                    })
                    .catch((e) => {
                        reject(errorParser(e, 'Activar Cedulas'))
                    })
            })
            .catch((e) => {
                reject(e)
            })
    })

    return activatePromise
}

/**
 * @param {String} dniNumber
 * @param {String} idCardNumber
 * @param {Boolean} withImage
 */
const getIdCard = (dniNumber, domain, idCardNumber, hashToCompare) => {
    const idCardPromise = new Promise((resolve, reject) => {
        const extraData = domain + idCardNumber

        getOrCreateImageByHash(hashToCompare, dniNumber, idCardNumber, extraData)
            .then((fileRes) => {
                resolve(fileRes)
            })
            .catch((e) => {
                e.status = 400
                reject(errorParser(e, 'Cedula Individual'))
            })
    })

    return idCardPromise
}



/**
 *
 * @param {String} dniNumber
 * @param {Number} limit
 * @param {Number} offset
 * @param {Boolean} withImages
 */

const getCarsFromIdCards = (dniNumber, limit, offset, withImages = false) => {
    const cars = {}

    const carsPromise = new Promise((resolve, reject) => {
        getIdCards(dniNumber, limit, offset, withImages)
            .then((idCards) => {
                const resourcesPromises = []
                try {
                    for (const idCard of idCards) {
                        const {
                            dominio,
                            numero_cedula,
                            placa,
                            tipo_cedula,
                            marca,
                            modelo,
                            tipo,
                            habilitada,
                            hash,
                            exp,
                            imagenes,
                        } = idCard

                        const prettyIdCard = { tipo_cedula, numero_cedula, habilitada, hash, exp, }

                        if (imagenes) {
                            prettyIdCard.imagenes = imagenes
                        }

                        if (!cars[dominio]) {
                            cars[dominio] = {
                                dominio,
                                placa,
                                marca,
                                modelo,
                                tipo,
                                cedulas_verdes: [],
                                cedulas_azules: [],
                                seguros: [],
                                radicaciones: [],
                            }

                            /* const insurancePromise = new Promise((resolve, reject) => {
                                getInsurance(dominio, dniNumber)
                                    .then((insurance) => {
                                        cars[dominio].seguros.push(insurance)
                                    })
                                    .catch(() => {})
                                    .finally(() => {
                                        resolve()
                                    })
                            }) */

                            //const insurancePromise = Promise.resolve()

                            const insurancePromise = new Promise((resolve) => {
                                getInsuranceData(dominio, dniNumber)
                                    .then((insurance) => {
                                        cars[dominio].seguros.push(insurance)
                                    })
                                    .catch(() => {})
                                    .finally(resolve)
                            })

                            let radicationPromise = Promise.resolve()

                            if (tipo_cedula === 'IDENTIFICACION') {
                                radicationPromise = new Promise((resolve, reject) => {
                                    getRadication(dominio)
                                        .then((radication) => {
                                            cars[dominio].radicaciones.push(radication)
                                        })
                                        .catch(() => {})
                                        .finally(resolve)
                                })
                            }

                            resourcesPromises.push(insurancePromise, radicationPromise)
                        }

                        if (tipo_cedula === 'IDENTIFICACION') {
                            cars[dominio].cedulas_verdes.push(prettyIdCard)
                        } else if (tipo_cedula === 'AUTORIZADO') {
                            cars[dominio].cedulas_azules.push(prettyIdCard)
                        }
                    }

                    const finalPromise = Promise.all(resourcesPromises)

                    finalPromise
                        .then(()=> {})
                        .catch(() => {})
                        .finally(() => {
                            resolve(Object.values(cars))
                        })
                } catch (e) {
                    reject(errorParser(e, 'Vehiculos'))
                }
            })
            .catch((e) => {
                reject(e)
            })
    })

    return carsPromise
}

/**
 *
 * @param {String} dniNumber
 * @param {String} idCardNumber
 */

const getIdCardData = (dniNumber, idCardNumber) => {
    const url = `${personas.url}/${dniNumber}/cedulas/${idCardNumber}`

    const getIdCardDataPromise = new Promise((resolve, reject) => {
        getExternalToken()
                .then((token) => {
                    request.get(url)
                        .set('Authorization', token)
                        .set('Cache-Control', 'no-cache')
                        .then(({ body: data, }) => {
                            const parsedIdCard = parseIdCard(data)
                            resolve(parsedIdCard)
                        })
                        .catch((e) => {
                            reject(errorParser(e, 'Cedula Individual Información'))
                        })
                })
                .catch(reject)
    })

    return getIdCardDataPromise
}

/**
 *
 * @param {String} dniNumber
 * @param {String} idCardNumber
 */

const getInsuranceByIdCardNumber = (dniNumber, idCardNumber) => {
    const getInsuranceByIdCardNumberPromise = new Promise((resolve, reject) => {
        getIdCardData(dniNumber, idCardNumber)
            .then(({ dominio: domain, }) => {
                getInsurance(domain, dniNumber)
                    .then((insuranceData) => {
                        resolve(insuranceData)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })

    return getInsuranceByIdCardNumberPromise
}


export {
    getInsuranceImages,
    getCarsFromIdCards,
    getIdCard,
    getIdCards,
    activateIdCard,
    getInsuranceByIdCardNumber,
}