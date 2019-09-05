import { getCertificado, }      from '../../controllers/v1.0/cud/request'
import { pgModelList, }         from '../../models/pg'
import { pgParseData, }         from '../../models/pg-utils'
import logger                   from '../../../config/winston'

const cudCron = (pgUsers) => {
  const cron = new Promise((resolve, reject) => {
    const cudPromisesArray = []

    const pgUserFiltered = pgUsers.filter((user) => user.dniNumber)

    for (const pgUser of pgUserFiltered) {
      const { dniNumber, gender, username: idUser, } = pgUser

      logger.info(`------CRON, pre procesando (externo) usuario: ${dniNumber}`)

      const cudPromise = async () => {
        logger.info(`------CRON, procesando (externo) usuario: ${dniNumber}`)

        let certificate = null
        let log = null

        try {
          certificate = await getCertificado(dniNumber, gender, idUser)
          log = await pgParseData(idUser, dniNumber, pgModelList.cudCertificado, certificate)
        } catch (e) {
          logger.error(`------CRON, proceso fallido (externo) usuario: ${pgUser.dniNumber}`)
          return e
        }

        return log
      }

      cudPromisesArray.push(cudPromise())
    }

    Promise.all(cudPromisesArray)
      .then((cudLogs) => {
        const logsFiltered = cudLogs.filter((log) => !(log instanceof Error))

        resolve(logsFiltered)
      })
      .catch((e) => reject(e))
  })

  return cron
}

export default [
  {
    job: cudCron,
    model: pgModelList.cudCertificado,
  },
]