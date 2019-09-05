import Promise                      from 'bluebird'
import request                      from 'request'
import config                       from '../../../../config/env'
import redis                        from '../../../helpers/Redis'
import APIError                     from '../../../helpers/APIError'


/**
 * Obtiene el Token y lo cachea
 * @private
 */
function _consultarToken() {
  return new Promise((resolve, reject) => {
    const options = {
      url: config.ws.minInterior.login.url,
      qs: config.ws.minInterior.login.query,
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
          const token = 'Bearer ' + JSON.parse(body).Token
          redis.set('Auth:Token:minInterior:DniPasaporte', token)
            .then((expire) => {
              redis.expire('Auth:Token:minInterior:DniPasaporte', '1800')
                .then(() => {
                  if (expire)
                    return resolve(token)
                  else
                    return reject(APIError({
                    status: 500,
                    message: 'Error al Obtener Toekn Externo',
                    isPublic: false,
                  }))
                })
                .catch((e) => reject(APIError({
                  status: 500,
                  message: (e.message),
                  devMessage: (e.stack),
                  isPublic: false,
                })))
            })
            .catch((e) => reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.stack),
              isPublic: false,
            })))
        } catch (e) {
          return reject(APIError({
            status: 500,
            message: (e.message),
            devMessage: (e.stack),
            isPublic: false,
          }))
        }
    })
  })
}


/**
 * Retorna el Token cacheado, caso contrario solicita uno nuevo
 * @private
 */
export default function getToken() {
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:minInterior:DniPasaporte')
      .then((exists) => {
        if (exists)
          redis.get('Auth:Token:minInterior:DniPasaporte')
            .then((reply) => {
              return resolve(reply)
            })
            .catch((e) => reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.stack),
              isPublic: false,
            })))
        else
          _consultarToken()
            .then((token) => resolve(token))
            .catch((e) => reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.devMessage),
              isPublic: false,
            })))
      })
      .catch((e) => reject(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.stack),
        isPublic: false,
      })))
  })
}
