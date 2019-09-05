/* eslint-disable no-unused-vars */
import request                from 'superagent'
import moment                 from 'moment'
import logger                 from '../../../config/winston'
import pgUserCredentialsList  from './pgUserCredentialsList'
import { getHolidaysByDay, }  from './../../controllers/v2.0/feriados/request'

const campaigns = {
  licenseExpired90Days: 'vencimiento-licencia-90-dias',
  licenseExpired30Days: 'vencimiento-licencia-30-dias',
  licenseExpired0Days: 'vencimiento-licencia-0-dias',
}

/**
 * @name Modelos para crons de envío de correos
 * @property {Object} Cron el cron representa el modelo que se usará para el envío de notificaciones
 * @property {Cron.String} value tag de la notificación a enviar
 * @property {Cron.String} subject Subject de la notificación a enviar
 * @property {[Cron.String | Cron.Function]} template Template a usar
 * @property {Cron.String} dbFunction función de la DB para obtener los usuarios a lo que se enviarán las notificaciones
 * @property {Cron.Array} dbFunctionParams array para usar como parámetros de la función de la base de datos
 * @property {Cron.Number} chunkBy número para indicar en cuántas piezas se enviarán las notificaciones
 * @property {[Cron.Function | Cron.Null]} conditions función que se ejecuta para saber si el cron debe ejecutarse
 * @property {[Cron.Function | Cron.Null]} before función para agregar contenido extra para todos los usuarios (contenido general)
 * @property {[Cron.Function | Cron.Null]} filter función para filtrar los usuarios en caso de que se necesite (retornar false en caso de que no se enviar una notificación a un usuario)
 * @description {Cron.filter} puede ser usado para sobreeescribir los keys de los usuarios
*/

export default {
  licenseExpiresIn90Days: {
    value: campaigns.licenseExpired90Days,
    subject: 'Tu Licencia Nacional de Conducir',
    template: 'template-mail-vencimiento-licencia',
    dbFunction: `get_days_expired_users_credentials(90, apigw.get_credential_id('${pgUserCredentialsList.licencia.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      const expiresIn = '3 meses'

      return Promise.resolve({
        expiresIn,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  licenseExpiresIn30Days: {
    value: campaigns.licenseExpired30Days,
    subject: 'Tu Licencia Nacional de Conducir',
    template: 'template-mail-vencimiento-licencia',
    dbFunction: `get_days_expired_users_credentials(30, apigw.get_credential_id('${pgUserCredentialsList.licencia.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      const expiresIn = '1 mes'

      return Promise.resolve({
        expiresIn,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  licenseExpired: {
    value: campaigns.licenseExpired0Days,
    subject: 'Tu Licencia Nacional de Conducir',
    template: 'template-mail-vencimiento-licencia-hoy',
    dbFunction: `get_days_expired_users_credentials(0, apigw.get_credential_id('${pgUserCredentialsList.licencia.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null, //Null||Function
    before: () => {
      const day = moment().local().format('DD/MM/YYYY')

      return Promise.resolve({
        day,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },

  cudExpiresIn90Days: {
    value: 'vencimiento-cud-90-dias',
    subject: 'En 3 meses vence tu CUD',
    template: 'template-mail-cud',
    dbFunction: `get_days_expired_users_credentials(90, apigw.get_credential_id('${pgUserCredentialsList.cud.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      return Promise.resolve({
        title: 'Te recordamos que en 3 meses vence tu CUD',
        content: 'Para saber cómo renovarlo ingresá a Argentina.gob.ar y hacelo con tiempo.',
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  cudExpiresIn30Days: {
    value: 'vencimiento-cud-30-dias',
    subject: 'En un mes vence tu CUD',
    template: 'template-mail-cud',
    dbFunction: `get_days_expired_users_credentials(30, apigw.get_credential_id('${pgUserCredentialsList.cud.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      return Promise.resolve({
        title: 'Te recordamos que en un meses vence tu CUD',
        content: 'Para saber cómo renovarlo ingresá a Argentina.gob.ar y hacelo con tiempo.',
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  cudExpired: {
    value: 'vencimiento-cud-0-dias',
    subject: 'Hoy venció tu CUD',
    template: 'template-mail-cud',
    dbFunction: `get_days_expired_users_credentials(0, apigw.get_credential_id('${pgUserCredentialsList.cud.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null, //Null||Function
    before: () => {
      return Promise.resolve({
        title: 'Te recordamos que hoy venció tu CUD',
        content: '¿Te olvidaste de renovarlo? Ingresá a Argentina.gob.ar para saber cómo hacerlo.',
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },

  holidays: {
    value: 'feriados',
    subject: 'Hoy es feriado :D',
    template: 'template-mail-feriados',
    dbFunction: 'get_users_holidays()',
    chunkBy: 50,
    conditions: async () => {
      try {
        const actualDay = moment().local().add(6, 'days').format('YYYY-MM-DD')

        const holiday = getHolidaysByDay(actualDay)

        if (holiday.length === 0) {
          throw new Error
        }
      } catch (e) {
        throw e
      }
    },
    before: null,
    filter: null,
  },
  cronPeopleFourteen: {
    value: 'cumple-14-años',
    subject: 'En el día de tu cumpleaños queremos regalarte unos consejos',
    template: 'template-people-fourteen',
    dbFunction: 'get_people_fourteen()',
    chunkBy: 30,
    conditions: null,
    before: null,
    filter: (user) => {
      return {
        results: {
          username: user.cuil,
          firstName: user.fi,
          lastName: user.lna,
          email: user.em,
        },
      }
    },
  },

  cronPeopleSixtyFive: {
    value: 'cumple-65-años',
    subject: 'En el día de tu cumpleaños queremos regalarte unos consejos',
    template: () => {
      const month = moment().month() + 1

      let template = ''

      switch (month) {
        case 6: //jun
        case 7: //jul
            template = 'template-people-sixtyfive-1'
            break
        case 8: //aug
        case 9: //sep
        case 10: //oct
        case 11: //nov
        case 12: //dec
            template = 'template-people-sixtyfive-2'
            break
      }

      return template
    },
    dbFunction: 'get_people_sixtyfive()',
    chunkBy: 30,
    conditions: () => {
      return new Promise((resolve, reject) => {
        const month = moment().month() + 1

        if (month <= 5) {
          reject()
          return
        }

        resolve()
      })
    },
    before: null,
    filter: (user) => {
      return {
        results: {
          username: user.cuil,
          firstName: user.fi,
          lastName: user.lna,
          email: user.em,
        },
      }
    },
  },

  cronDniExpiresIn60Days: {
    value: 'vencimiento-dni-60-dias',
    subject: 'Vencimiento DNI',
    template: 'template-mail-vencimiento-dni',
    dbFunction: `get_days_expired_users_credentials(60, apigw.get_credential_id('${pgUserCredentialsList.dni.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      const expiresIn = 'en 2 meses vence tu DNI'

      return Promise.resolve({
        expiresIn,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  cronDniExpiresIn30Days: {
    value: 'vencimiento-dni-30-dias',
    subject: 'Vencimiento DNI',
    template: 'template-mail-vencimiento-dni',
    dbFunction: `get_days_expired_users_credentials(30, apigw.get_credential_id('${pgUserCredentialsList.dni.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      const expiresIn = 'en 1 mes vence tu DNI'

      return Promise.resolve({
        expiresIn,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  cronDniExpired: {
    value: 'vencimiento-dni-0-dias',
    subject: 'Vencimiento DNI',
    template: 'template-mail-vencimiento-dni',
    dbFunction: `get_days_expired_users_credentials(0, apigw.get_credential_id('${pgUserCredentialsList.dni.value}'))`,
    dbFunctionParams: [],
    chunkBy: 30,
    conditions: null,
    before: () => {
      const expiresIn = 'Hoy venció tu DNI'

      return Promise.resolve({
        expiresIn,
      })
    },
    filter: (user) => {
      if (!user.id_user_id) {
        return false
      }

      return {
        results: {
          email: user.email,
          username: user.id_user_id,
          firstName: user.firstname,
          lastName: user.lastname,
        },
      }
    },
  },
  formWizardCud: {
    value: 'wizard-cud',
  },
}
