/* eslint-disable no-unused-vars */
import consultarLicenciaCertificado from '../../controllers/v1.0/seguridad-vial/consultarLicenciaCertificado.js'
import { getCertificado, } from '../../controllers/v1.0/cud/request.js'
import dniUltimoEjemplar from '../../controllers/v1.0/renaper/dniUltimoEjemplar.js'
import { getIdCards, } from '../../controllers/v2.0/dnrpa/request'
import moment                       from 'moment'
import logger from '../../../config/winston.js'

export default {
  licencia: {
    value: 'licencia',
    transactionFunctions: {
      start: 'start_id_cred_transaction',
      get: 'get_json_expired_users_for_id_cred',
      finish: 'generic_finish_cred_transaction',
    },
    job: (userLot) => {
      const promises = []

      for (const userData of userLot) {
        const {
          id,
          gender,
          dniNumber,
        } = userData

        if (!dniNumber) {
          continue
        }

        const logData = {
          idUser: id,
          credentialType: 'licencia',
          expiration: null,
          extraData: {},
          excluder: null,
        }

        promises.push(consultarLicenciaCertificado({
            gender,
            document_type: 1,
            document_number: dniNumber,
          })
          .then(({ expiration_date, }) => {
            logData.expiration = moment(expiration_date, 'DD/MM/YYYY').local().format('YYYY-MM-DD HH:mm:ss')
            return logData
          })
          .catch(() => Promise.resolve(new Error('error')))
        )
      }

      return Promise.all(promises).then((logs) => {
        return logs.filter((log) => {
          return !(log instanceof Error)
        })
      })
    },
  },
  cud: {
    value: 'cud',
    transactionFunctions: {
      start: 'start_id_cred_transaction',
      get: 'get_json_expired_users_for_id_cred',
      finish: 'generic_finish_cred_transaction',
    },
    job: (userLot) => {
      const promises = []

      for (const userData of userLot) {
        const {
          id,
          gender,
          dniNumber,
          username,
        } = userData

        if (!dniNumber) {
          continue
        }

        const logData = {
          idUser: id,
          credentialType: 'cud',
          expiration: null,
          extraData: {},
          excluder: null,
        }

        promises.push(getCertificado(dniNumber, gender, username, false, false, true)
          .then(({ hasta, }) => {
            logData.expiration = moment(hasta).local().format('YYYY-MM-DD HH:mm:ss')
            return logData
          })
          .catch(() => Promise.resolve(new Error('error')))
        )
      }

      return Promise.all(promises)
        .then((logs) => logs.filter((log) => !(log instanceof Error)))
    },
  },
  dni: {
    value: 'dni',
    transactionFunctions: {
      start: 'start_id_cred_transaction',
      get: 'get_json_expired_users_for_id_cred',
      finish: 'generic_finish_cred_transaction',
    },
    job: (userLot) => {
      const promises = []

      for (const userData of userLot) {
        const {
          id,
          gender,
          dniNumber,
        } = userData

        if (!dniNumber) {
          continue
        }

        const logData = {
          idUser: id,
          credentialType: 'dni',
          expiration: null,
          extraData: {},
          excluder: null,
        }

        promises.push(dniUltimoEjemplar({ dni: dniNumber, sexo: gender, }).then(({ vencimiento, }) => {
            logData.expiration = moment(vencimiento, 'DD/MM/YYYY').local().format('YYYY-MM-DD HH:mm:ss')
            return logData
          })
          .catch(() => Promise.resolve(new Error('error')))
        )
      }

      return Promise.all(promises).then((logs) => {
        return logs.filter((log) => {
          return !(log instanceof Error)
        })
      })
    },
  },
  cedulasAutomotor: {
    value: 'cedulas-automotor',
    transactionFunctions: {
      // start: 'start_id_cred_transaction',
      get: 'get_json_users_for_id_user_cedula',
      // finish: 'generic_finish_cred_transaction',
    },
    job: (userLot) => {
      const promises = []
      const logs = []

      for (const userData of userLot) {
        const {
          id,
          dniNumber,
        } = userData

        if (!dniNumber) {
          continue
        }

        promises.push(getIdCards(dniNumber).then((idCards) => {
          for (const { tipo_cedula: tipoCedula, habilitada: enabled, modelo: model, tipo: carType, dominio: excluder, } of idCards) {
            const idCardType = tipoCedula == 'AUTORIZADO' ? 'AZUL' : 'VERDE'

            logs.push({
              idUser: id,
              credentialType: 'cedulas-automotor',
              expiration: moment().local().format('YYYY-MM-DD HH:mm:ss'),
              extraData: {
                idCardType,
                enabled,
                model,
                carType,
              },
              excluder,
            })
          }

          return true
        })
          .catch(() => Promise.resolve(logs.push(new Error('error'))))
        )
      }

      return Promise.all(promises).then(() => {
        return logs.filter((log) => {
          return !(log instanceof Error)
        })
      })
    },
  },
}