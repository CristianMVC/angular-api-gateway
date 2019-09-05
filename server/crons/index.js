/* eslint-disable no-console */
import Promise from 'bluebird'
import { CronJob, } from 'cron'
import moment from 'moment'
import cronsV2 from './v2'
import { cronsNew, cronsMail, cronsCredentials, } from './v2'
/* import config                                   from '../../config/env' */
import logger from '../../config/winston'


import { getTransactionUsers, getTransactionUsersNew, updateTransactionUsersNew, getTransactionCredUsers, updateTransactionCredUsers, getTransactionBenUsers, proccessBenefitsUsers, updateTransactionBenUsers, /* pgModelList, */ } from '../models/pg'
import pgMailsModel from '../models/pg-utils/pgMailsModel'


const crons = [
    ...cronsV2,
]

/*
const {
    lots: userLotSize,
} = config.crons
 */
const {
    API_CRONS,
    API_CACHE_CRONS,
    API_CREDENTIALS,
    API_NOTIFICATIONS,
    API_BENEFITS,
} = process.env

if (API_CRONS) {
    logger.info('::::CRON, modulo cargado')

    let loopCounter = 0

    const getUserCron = new CronJob('* * * * * *', function () {
        logger.info('::::CRON, inicio de actividad')

        getUserCron.stop()
        const pgUserTimeout = () => {
            const current_unix = moment().unix()
            console.time('API_CRON_' + current_unix)

            loopCounter++

            logger.info(`::::CRON, lote de usuarios n°: ${loopCounter} - INICIO`)
            getTransactionUsers()
                .then(({ usersData: userLot, uuid, }) => {
                    logger.info(`::::CRON, lote de usuarios n°: ${loopCounter} - PROCESO`)
                    const cronPromises = []

                    for (const cron of crons) {
                        cronPromises.push(cron(userLot, uuid))
                    }
                    Promise.all(cronPromises)
                        .then(() => {
                            logger.info('::::CRON, lote de usuarios liberados - CORRECTAMENTE')
                        })
                        .catch((e) => {
                            logger.error('::::CRON, lote de usuarios liberados - FALLIDAMENTE')
                        })
                        .finally(() => {
                            setTimeout(pgUserTimeout, 200)
                        })
                })
                .catch((e) => {
                    console.log(e)
                    //TODO: verificar error de especifico de empty users
                    logger.error('::::CRON, tiempo de duración: ')
                    console.timeEnd('API_CRON_' + current_unix)
                    getUserCron.start()
                    return
                })
        }

        setTimeout(pgUserTimeout, 200)
    })

    getUserCron.start()
}


const runCacheCron = (cronPromise, model) => {
    let loopCounter = 0

    const pgUserTimeout = () => {
        const { transactionFunctions, value, } = model
        const current_unix = moment().unix()
        console.time('API_CRON_' + current_unix)

        loopCounter++

        logger.info(`::::CRON, lote de usuarios n°: ${loopCounter} - INICIO`)
        getTransactionUsersNew(transactionFunctions, value)
            .then(({ usersData: userLot, uuid, }) => {
                logger.info(`::::CRON, lote de usuarios n°: ${loopCounter} - PROCESO`)

                cronPromise(userLot)
                    .then((logsFiltered) => {
                        updateTransactionUsersNew(uuid, transactionFunctions, value, logsFiltered)
                            .then(() => {
                                logger.info(`-------- ${logsFiltered.length} registros insertados`)
                            })
                            .catch((e) => {
                                logger.error('-------- ERROR en multiInsert ', e.message)
                            })
                        logger.info('::::CRON, lote de usuarios liberados - CORRECTAMENTE')
                    })
                    .catch((e) => {
                        logger.error('::::CRON, lote de usuarios liberados - FALLIDAMENTE')
                    })
                    .finally(() => {
                        setTimeout(pgUserTimeout, 200)
                    })
            })
            .catch((e) => {
                console.log(e)
                //TODO: verificar error de especifico de empty users
                logger.error('::::CRON, tiempo de duración: ')
                console.timeEnd('API_CRON_' + current_unix)
                return
            })
    }

    setTimeout(pgUserTimeout, 200)
}


const runMailCron = (model) => {
    const {
        value: mailName,
        filter: modelFilter,
        template,
        subject,
        dbFunction,
        conditions,
        before,
        chunkBy,
    } = model
    let loopCounter = 0

    const mailsModel = new pgMailsModel(mailName, template, dbFunction)
    const mailsOptions = { subject, }

    mailsModel.beforeExecute(before)

    const pgMailTimeout = async () => {
        loopCounter++

        logger.info(`::::CRON: ${mailName} n°: ${loopCounter} - INICIO`)

        try {
            if (conditions instanceof Function) {
                await conditions()
            }
        } catch (e) {
            logger.error(`::::CRON: ${mailName} - CONDICIÓN NO CUMPLIDA`)
            logger.error(e)

            return
        }

        mailsModel
            .setChunk(chunkBy)
            .setOptions(mailsOptions)
            .setFilter(modelFilter)
            .execute()
            .then(() => {
                logger.info(`::::CRON: ${mailName} n°: ${loopCounter} FINALIZADO`)
            })
            .catch((e) => {
                logger.error(`::::CRON: ${mailName} - FALLIDO`)
                logger.error(e)
                return
            })
    }

    setTimeout(pgMailTimeout, 200)
}

const runCacheCredentialsCron = (model) => {
    let loopCounter = 0

    const pgUserTimeout = () => {
        const { job: cronPromise, transactionFunctions, value, } = model

        loopCounter++

        logger.info(`::::CRON ${value} - lote de usuarios n°: ${loopCounter} - INICIO`)
        getTransactionCredUsers(transactionFunctions, value)
            .then(({ usersData: userLot, uuid, }) => {
                logger.info(`::::CRON ${value} - lote de usuarios n°: ${loopCounter} - PROCESO`)

                cronPromise(userLot)
                    .then((logsFiltered) => {
                        updateTransactionCredUsers(uuid, logsFiltered, transactionFunctions)
                            .then((num) => {
                                logger.info(`-------- ${value}: ${loopCounter} - ${num} registros insertados`)
                            })
                            .catch((e) => {
                                logger.error(`-------- ERROR ${value}: ${loopCounter} - en multiInsert`, e.message)
                            })
                        logger.info(`::::CRON ${value} - lote de usuarios liberados - CORRECTAMENTE`)
                    })
                    .catch((e) => {
                        logger.error(`::::CRON ${value} - lote de usuarios liberados - FALLIDAMENTE`)
                    })
                    .finally(() => {
                        setTimeout(pgUserTimeout, 200)
                    })
            })
            .catch((e) => {
                console.log(e)
                if (e.message !== 'noRows') {
                    setTimeout(pgUserTimeout, 200)
                }
            })
    }

    setTimeout(pgUserTimeout, 200)
}

const runCacheBenefitsCron = () => {
    let loopCounter = 0

    const pgUserTimeout = () => {
        const current_unix = moment().unix()
        console.time('API_CRON_' + current_unix)

        loopCounter++

        logger.info(`::::CRON: BENEFICIOS, lote de usuarios n°: ${loopCounter} - INICIO`)
        getTransactionBenUsers()
            .then(({ usersData: userLot, uuid, }) => {
                logger.info(`::::CRON BENEFICIOS, lote de usuarios n°: ${loopCounter} - PROCESO`)

                proccessBenefitsUsers(userLot)
                    .then((logsFiltered) => {
                        updateTransactionBenUsers(uuid, logsFiltered)
                            .then((num) => {
                                logger.info(`-------- CRON BENEFICIOS: ${num} registros insertados`)
                            })
                            .catch((e) => {
                                logger.error('-------- CRON BENEFICIOS: ERROR en multiInsert ', e.message)
                            })
                        logger.info('::::CRON BENEFICIOS, lote de usuarios liberados - CORRECTAMENTE')
                    })
                    .catch((e) => {
                        logger.error('::::CRON BENEFICIOS, lote de usuarios liberados - FALLIDAMENTE')
                    })
                    .finally(() => {
                        setTimeout(pgUserTimeout, 200)
                    })
            })
            .catch((e) => {
                console.log(e)
                logger.error('::::CRON BENEFICIOS, tiempo de duración: ')
                console.timeEnd('API_CRON_' + current_unix)
                return
            })
    }

    setTimeout(pgUserTimeout, 200)
}


if (API_CACHE_CRONS) {
    for (const { job, model, } of cronsNew) {
        runCacheCron(job, model)
    }
}

if (API_CREDENTIALS) {
    for (const model of cronsCredentials) {
        runCacheCredentialsCron(model)
    }
    runCacheBenefitsCron()
}

// if (API_BENEFITS) {
// }

if (API_NOTIFICATIONS) {
    for (const model of cronsMail) {
        runMailCron(model)
    }
}