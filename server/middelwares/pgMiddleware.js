
import moment                                                                       from 'moment'
import { setUserData, }                                                             from '../helpers/token'
import logger                                                                       from '../../config/winston'
import { logPg, getValidPgLog, }                                                    from '../models/pg'
import { getFilesByModel, createFilesByModel, }                                     from '../helpers/base64Files'

/**
 *
 * @param {String} idUser
 * @param {String} dniNumber
 * @param {String} key
 * @param {String} model
 * @param {String} group
 * @param {String} folder
 * @param {String} identifier
 */

const getValidPgLogPromise = (idUser, dniNumber, key, model, group, folder, identifier) => {
    return new Promise((resolve, reject) => {
        getValidPgLog(idUser, key, identifier)
            .then(({ data, createdAt, updatedAt, validUntil, }) => {
                const originDate = moment(createdAt || updatedAt)
                const expTime = moment(validUntil)
                const now = moment()

                const expires = expTime.toString()
                const age = now.diff(originDate, 'seconds')
                const maxAge = expTime.diff(now, 'seconds')

                const cacheHeaders = {
                    Age: age, // el tiempo que ha sido almacenado el cache en el servidor (Header Standard)
                    Expires: expires, // el tiempo de validez restante expresado humanamente (Header Standard) [deprecated]
                    'Cache-Control': `private, max-age=${maxAge}`, // el tiempo de vida del cache relativo al momento de la consulta (Header Custom)
                    'Apigw-Cache-Date': expTime.toISOString(), // fecha de vida maxima del cache, formato ISO 8601
                    'Apigw-Cache-Date-Ms': expTime.unix(), // fecha de vida maxima en formato unix MS
                    'Apigw-Cache-Entity': key,
                }

                if (identifier) {
                    cacheHeaders['Apigw-Cache-Identifier'] = identifier
                }

                if (model) {
                      getFilesByModel(data, model, dniNumber, group, folder)
                        .then((logDataWithFiles) => {
                           resolve({ data: logDataWithFiles, cacheHeaders, })
                        })
                        .catch((e) => {
                            reject(e)
                        })
                    return
                }

                resolve({ data, cacheHeaders, })
            })
            .catch((e) => {
                reject(e)
            })
    })
}

/**
 *
 * @param {String} dniNumber
 * @param {Object} data
 * @param {String} key
 * @param {String} model
 * @param {String} group
 * @param {String} folder
 * @param {String} identifier
 * @param {Function} expCallback
 */

const refreshPgLog = (dniNumber, idUser, data, key, model, group, folder, identifier, expCallback) => {
    const refreshPgLogPromise = new Promise((resolve, reject) => {
        let expTime = false

        if (expCallback) {
            try {
                const callbackExpTime = expCallback(data)
                expTime = moment(callbackExpTime)
            } catch (e) {
                expTime = false
            }
        }

        if (model) {
            createFilesByModel(data, model, dniNumber, group, folder, expTime)
                .then((dataWithHash) => {
                    logPg(dataWithHash, idUser, key, expTime, identifier)
                        .then(resolve)
                        .catch(reject)
                })
                .catch(reject)
            return
        }

        logPg(data, idUser, key, expTime, identifier)
            .then(resolve)
            .catch(reject)
    })

    return refreshPgLogPromise
}

const refreshPgLogForcefully = (modelKey, idUser, dniNumber, data, identifier = null) => {
    const { model, group, folder, value: key, exp: expCallback, } = modelKey

    return refreshPgLog(dniNumber, idUser, data, key, model, group, folder, identifier, expCallback)
}

/**
 *
 * @param {Express.Response} res
 * @param {Function} next
 * @param {Object} userData
 * @param {String} modelKey
 * @param {String} identifier
 * @param {Boolean} cacheFirst
 */

const flowHandler = (res, req, next, modelKey, cacheFirst) => {
    const { userData, } = req
    const { username: idUser, dni_number: dniNumber, } = userData

    const { model, group, folder, value: key, exp: expCallback, identifier: identifierCallback, } = modelKey

    let identifier = null

    if (identifierCallback) {
        try {
            identifier = identifierCallback(req)
        } catch (e) {
            identifier = null
        }
    }

    res.sendPgLog = (apiError) => {
        if (cacheFirst) {
            next(apiError)
            return
        }

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(reject, 500)
        })

        const pgLogPromise = getValidPgLogPromise(idUser, dniNumber, key, model, group, folder, identifier)

        Promise.race([
            pgLogPromise,
            timeoutPromise,
        ])
            .then(({ cacheHeaders, data: logData, }) => {
                res.isPgLog = true
                res.set(cacheHeaders)
                res.json(logData)
            })
            .catch((e) => {
                next(apiError)
            })
    }

    const oldJson = res.json

    res.json = function (data) { // se reemplaza la funcion de express por una que recolecta la informacion previa envio
        const { isPgLog, } = res

        if (!isPgLog) { // TODO: reutilizar esta expiracion para el log
            const now = moment()
            let expTime

            if (expCallback) {
                try {
                    const callbackExpTime = expCallback(data)
                    expTime = moment(callbackExpTime)
                } catch (e) {
                    expTime = moment().add(12, 'hours')
                }
            } else {
                expTime = moment().add(12, 'hours')
            }

            const expires = expTime.toString()
            const maxAge = expTime.diff(now, 'seconds')

            const cacheHeaders = {
                Age: 0, // el tiempo que ha sido almacenado el cache en el servidor (Header Standard)
                Expires: expires, // el tiempo de validez restante expresado humanamente (Header Standard) [deprecated]
                'Cache-Control': `private, max-age=${maxAge}`, // el tiempo de vida del cache relativo al momento de la consulta (Header Custom)
                'Apigw-Cache-Date': expTime.toISOString(), // fecha de vida maxima del cache, formato ISO 8601
                'Apigw-Cache-Date-Ms': expTime.unix(), // fecha de vida maxima en formato unix MS,
                'Apigw-Cache-Entity': key,
            }

            if (identifier) {
                cacheHeaders['Apigw-Cache-Identifier'] = identifier
            }

            res.set(cacheHeaders)
        }

        oldJson.apply(res, arguments)

        const { statusCode: status, } = res

        if (status !== 200 || isPgLog) {
            return
        }

        refreshPgLog(dniNumber, idUser, data, key, model, group, folder, identifier, expCallback)
            .catch((e) => {
                logger.log('debug', 'error al generar un log', e)
            })
        return
    }

    if (!cacheFirst) {
        next()
        return
    }

    const pgLogPromise = getValidPgLogPromise(idUser, dniNumber, key, model, group, folder, identifier)

    pgLogPromise
        .then(({ cacheHeaders, data: logData, }) => {
            res.isPgLog = true
            res.set(cacheHeaders)
            res.json(logData)
        })
        .catch(() => {
            next()
        })
}

/**
 *
 * @param {String} modelKey
 * @param {String} identifier
 * @param {Boolean} cacheFirst
 */

const pgMiddleware = (modelKey, lifetime, cacheFirst = false) => {
    return (req, res, next) => {
        const { userData, } = req

        if (!userData) {
            setUserData(req, next, () => flowHandler(res, req, next, modelKey, cacheFirst))
            return
        }

        flowHandler(res, req, next, modelKey, cacheFirst)
    }
}

export {
    pgMiddleware,
    refreshPgLogForcefully, // TODO: mover a helper
}
