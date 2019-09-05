import Promise                      from 'bluebird'
import moment                       from 'moment'
import logger                       from '../../config/winston'
import { createFilesByModel, }      from './../helpers/base64Files'
import { pgModelList, }             from './pg-utils'
import { pgRequest, pgResponse, }   from './pg-utils/pgHttpModels'
import pgBaseModel                  from './pg-utils/pgBaseModel'
import pgErrorModel                 from './pg-utils/pgErrorModel'
import pgUserModel                  from './pg-utils/pgUserModel'
import { pgUserModelNew, }          from './pg-utils/pgUserModel'
import pgUserCredentialsModel       from './pg-utils/pgUserCredentialsModel'
import pgUserBenefitsModel          from './pg-utils/pgUserBenefitsModel'

export { pgModelList, pgRequest, pgResponse, }

/**
 *
 * @param {String} entityKey
 */
const getPgInstance = (entityKey) => {
    const instance = new pgBaseModel(entityKey)

    return instance
}

/**
 *
 * @param {String} data
 * @param {String} idUser
 * @param {String} modelKey
 * @param {String} expTime
 * @param {String} identifier
 */
const logPg = (data, idUser, modelKey, expTime, identifier) => {
    const instance = getPgInstance(modelKey)

    const logPromise = new Promise((resolve, reject) => {
        instance.insert(idUser, data, expTime, identifier)
            .then(() => {
                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })

    return logPromise
}

/**
 *
 * @param {String} idUser
 * @param {String} modelKey
 * @param {Number} lifetime
 */
const getValidPgLog = (idUser, modelKey, identifier) => {
    const instance = getPgInstance(modelKey)

    const logPromise = new Promise((resolve, reject) =>{
        instance.get(idUser, identifier)
            .then((logData) => {
                resolve(logData)
            })
            .catch((e) => {
                reject(e)
            })
    })

    return logPromise
}

/**
 *
 * @param {String} idUser
 * @param {String} key
 * @param {pgRequest} pgReq
 * @param {pgResponse} pgRes
 */
const createErrorLog = (idUser, key, pgReq, pgRes) => {
    const pgError = new pgErrorModel()
    const errorlogPromise = pgError.insert(idUser, key, pgReq, pgRes)

    errorlogPromise
        .then(() => {
            // TODO: accion si se logra el log
        })
        .catch((e) => {
            logger.log('debug', 'error en PG error Log', e.message)
        })
}

/**
 *
 * @param {String} idUser
 * @param {String} modelKey
 * @param {pgRequest} request
 * @param {pgResponse} response
 */

const logPgError = (idUser, modelKey, request, response) => {
    let key
    if (typeof modelKey === 'object') {
        key = modelKey.value
    } else {
        key = modelKey
    }

    createErrorLog(idUser, key, request, response)
}

/**
 *
 * @param {Object[]} logs
 * @param {string} modelKey
 */

const multiLogPg = (logs, modelKey) => {
    const multiLogPromise = pgBaseModel.multiInsert(modelKey, logs)

    return multiLogPromise
}

/**
 *
 * @param {String} idUser
 * @param {String} dniNumber
 * @param {Object} pgModel
 * @param {Object|Array} data
 *
 * @returns {Object}
 */
const pgParseData = async (idUser, dniNumber, pgModel, data) => {
    let expTime = null
    let modifiedData = null

    const { model, group, folder, exp: expCallback, } = pgModel

    if (expCallback) {
        try {
            const callbackExpTime = expCallback(data)
            expTime = moment(callbackExpTime)
        } catch (e) {
            expTime = false
        }
    }

    if (model) {
        try {
            modifiedData = await createFilesByModel(data, model, dniNumber, group, folder, expTime)
        } catch (e) {
            return e
        }
    } else {
        modifiedData = data
    }

    return {
        idUser,
        data: modifiedData,
        validUntil: expTime,
    }
}

/* const getPgUsersCursor = pgUserModel.getListCursor

const getPgUsersCount = pgUserModel.getCountTotal */

const getTransactionUsers = pgUserModel.getTransactionUsers
const updateTransactionUsers = pgUserModel.updateTransactionUsers
const validateToC = pgUserModel.hasToC
const getTransactionUsersNew = pgUserModelNew.getTransactionUsers
const updateTransactionUsersNew = pgUserModelNew.updateTransactionUsers

const getTransactionCredUsers = pgUserCredentialsModel.getTransactionUsers
const updateTransactionCredUsers = pgUserCredentialsModel.updateTransactionUsers

const getTransactionBenUsers = pgUserBenefitsModel.getTransactionUsers
const updateTransactionBenUsers = pgUserBenefitsModel.updateTransactionUsers
const proccessBenefitsUsers = pgUserBenefitsModel.proccessUsers

export {
    getValidPgLog,
    logPg,
    logPgError,
    multiLogPg,
    pgParseData,
    getTransactionUsers,
    updateTransactionUsers,
    validateToC,
    getTransactionUsersNew,
    updateTransactionUsersNew,
    getTransactionCredUsers,
    updateTransactionCredUsers,
    getTransactionBenUsers,
    updateTransactionBenUsers,
    proccessBenefitsUsers,
}