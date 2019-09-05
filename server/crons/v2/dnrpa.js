import moment                                       from 'moment'
import { getCarsFromIdCards, }                      from '../../controllers/v2.0/dnrpa/request'
import { pgModelList, updateTransactionUsers, }     from '../../models/pg'
import APIResponse                                  from '../../helpers/APIStandarResponses'
import sortByDate                                   from '../../helpers/sortByDate'
import logger                                       from '../../../config/winston'

/**
 * @param {String} uuid
 * @param {Object[]} pgUsers
 */
const carsCron = (pgUsers, uuid) => {
    const cron = new Promise((resolve, reject) => {
        const getCarsPromises = []

        const pgUsersLength = pgUsers.length

        for (const indexUser in pgUsers) {
            const pgUser = pgUsers[indexUser]

            if (!pgUser.dniNumber) {
                continue
            }
            logger.info(`------CRON, pre procesando (externo) usuario: ${pgUser.dniNumber}`)

            const getCarsPromise = new Promise((resolve) => {
                getCarsFromIdCards(pgUser.dniNumber, 1000, 0)
                    .then((cars) => {
                        logger.info(`------CRON, procesando (externo) usuario: ${pgUser.dniNumber}`)

                        const log = {
                            data: APIResponse.list(0, 0, cars),
                            idUser: pgUser.id,
                        }

                        const expTimes = []
                        for (const { cedulas_verdes: greenCards, cedulas_azules: blueCards, } of cars) {
                            for (const greenCard of greenCards) {
                                if (greenCard.exp) {
                                    expTimes.push(moment(greenCard.exp))
                                }
                            }
                            for (const blueCard of blueCards) {
                                if (blueCard.exp) {
                                    expTimes.push(moment(blueCard.exp))
                                }
                            }
                        }

                        logger.info(`------CRON, proceso exitoso (externo) usuario: ${pgUser.dniNumber}`)

                        if (!expTimes.length) {
                            resolve(log)
                            return
                        }

                        const expTimesSorted = expTimes.sort(sortByDate)

                        const firstExp = expTimesSorted[0]

                        //log.validUntil = firstExp.local().format('YYYY-MM-DD HH:mm:ss')
                        log.validUntil = firstExp.local().format('YYYY-MM-DD HH:mm:ss')

                        resolve(log)
                    })
                    .catch(() => {
                        logger.error(`------CRON, proceso fallido (externo) usuario: ${pgUser.dniNumber}`)

                        resolve(new Error('Error'))
                    })
            })

            getCarsPromises.push(getCarsPromise)

            const isFinal = pgUsersLength === (parseInt(indexUser) + 1)

            if (!isFinal) {
                continue
            }

            const getCarsPromisesAll = Promise.all(getCarsPromises)

            getCarsPromisesAll
                .then((carslogs) => {
                    const logsFiltered = carslogs.filter((log) => !(log instanceof Error))
                    /* if (!logsFiltered.length) {
                        resolve()
                        return
                    } */

                    updateTransactionUsers(uuid, pgModelList.obtenerVehiculosV2, logsFiltered)
                        .then(() => {
                            logger.info(`-------- ${logsFiltered.length} registros insertados`)
                        })
                        .catch((e) => {
                            logger.error('-------- ERROR en multiInsert ', e.message)
                        })
                        .finally(() => {
                            resolve()
                        })
                })
                .catch((e) => {
                    reject(e)
                })
        }
    })
    return cron
}

export default [
    carsCron,
]

