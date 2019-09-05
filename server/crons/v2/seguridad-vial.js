import getDigitalLicense                from '../../controllers/v2.0/seguridad-vial/licenciaDigital'
import { pgModelList, pgParseData, }    from '../../models/pg'
import logger                           from '../../../config/winston'


const safetyVialCron = (pgUsers) => {
  const cron = new Promise((resolve, reject) => {
    const safetyVialPromisesArray = []

    const pgUserFiltered = pgUsers.filter((user) => user.dniNumber)

    for (const pgUser of pgUserFiltered) {
      const { dniNumber, gender, username: idUser, } = pgUser

      const options = {
        document_type: 1, //DNI ID
        document_number: dniNumber,
        gender,
        imagenes: 'true',
      }

      logger.info(`------CRON, pre procesando (externo) usuario: ${dniNumber}`)

      const safetyVialPromise = async () => {
        logger.info(`------CRON, procesando (externo) usuario: ${dniNumber}`)

        let license = null
        let log = null

        try {
          license = await getDigitalLicense(options, idUser)
          log     = await pgParseData(idUser, dniNumber, pgModelList.licenciaV2, license)
        } catch (e) {
          return e
        }

        return log
      }

      safetyVialPromisesArray.push(safetyVialPromise())
    }

    Promise.all(safetyVialPromisesArray)
      .then((safetyVialLogs) => {
        const logsFiltered = safetyVialLogs.filter((log) => !(log instanceof Error))

        resolve(logsFiltered)
      })
      .catch((e) => reject(e))
  })

  return cron
}

export default [
  {
    job: safetyVialCron,
    model: pgModelList.licenciaV2,
  },
]