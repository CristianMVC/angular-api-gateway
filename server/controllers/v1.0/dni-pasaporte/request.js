import config                       from '../../../../config/env'
import Promise                      from 'bluebird'
import Auth                         from './auth'
import request                      from 'request'
import APIError                     from '../../../helpers/APIError'

/**
 * Realiza el Request al servicio de minInterior
 * @param params - Parametros del request
 * @private
 */
export default function doRequest(params) {
  return new Promise((resolve, reject) => {
    Auth()
      .then((token) => {
        const options = {
          url: config.ws.minInterior.url,
          method: params.method,
          qs: params.query,
          headers: {
            Authorization: token,
          },
        }
        request(options, (error, response, body) => {
          if (error)
            return reject(APIError({
              status: 500,
              message: error.message,
              devMessage: error.stack,
              isPublic: false,
            }))
          else
            try {
              const r = JSON.parse(body)
              if (!r.Error)
                return resolve(r)
              else
                return reject(APIError({
                  status: 404,
                  message: (r.ErrorString),
                  errorCode: (r.ErrorNro),
                }))
            } catch (e) {
              return reject(APIError({
                status: 500,
                message: 'Error al intentar parsear datos externos',
                devMessage: e.stack,
                isPublic: false,
              }))
            }
        })
      })
      .catch((e) => reject(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.devMessage),
        isPublic: false,
      })))
  })
}
