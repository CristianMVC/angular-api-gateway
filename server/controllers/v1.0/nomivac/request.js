import request from 'superagent'
import { isPlainObject, } from 'lodash'
import APIError from '../../../helpers/APIError'
import TlsReject from '../../../helpers/TlsReject'
import logger from '../../../../config/winston'


/**
 * Request
 * @param opt
 * @property {string} url
 */
function post(opt = {}) {
  return new Promise((resolve, reject) => {
    const {
      path = '',
      url = '',
      query = null,
      body = null,
    } = opt

    const reqUrl = `${url}${path}`
    logger.log('debug', 'ClientHTTP::Options::', opt)
    // const body = assign(config.ws.nomivac.calVacunas.body, data)

    TlsReject.set()

    request
      .post(reqUrl)
      .query(query)
      .send(body)
      .then((v) => {
        const { resultado, } = v.body
        if (resultado === 'OK')
          if (isPlainObject(v.body))
            return resolve(v.body)
          else
            return reject(APIError({
              status: 500,
              devMessage: 'Parser Error, Error en el WebService Externo',
            }))
        else if (resultado === 'ERROR')
          return reject(APIError({
            status: 500,
            message: (v.body.description),
            devMessage: 'Parser Error, Error en WebService Externo',
          }))
        else if (resultado === 'ERROR_AUTENTICACION')
          return reject(APIError({
            status: 500,
            message: (v.body.description),
            devMessage: 'Error en WebService Externo::Unauthorized',
          }))
        else
          return resolve(null)

        // Otras Validaciones Para Codigo de Error, Ejemplo:
        // else if (resultado === 'REGISTRO_NO_ENCONTRADO')
        //   return reject(APIError({
        //     status: 404,
        //     message: (v.body.description),
        //   }))
        // else if (resultado === 'ERROR_DATOS')
        //   return reject(APIError({
        //     status: 400,
        //     message: (v.body.description),
        //   }))
      })
      .catch((e) => reject(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
      })))
  })
}


export default {
  post,
}