import Promise            from 'bluebird'
import request            from 'superagent'
import APIError           from '../../../helpers/APIError'


/**
 * Request Method GET
 * @param params {object}
 */
function get(params) {
  return new Promise((resolve, reject) => {
    request
      .get(params.url)
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .timeout({ deadline: 80000, })
      .query(params.query)
      .then((d) => {
        try {
          if (d.body.estado !== 'OK')
            return reject(APIError({
              status: 400,
              message: (d.body.mensaje),
              devMessage: (d.text),
            }))

          if (d.body.estado === 'OK' && !d.body.data)
            return reject(APIError({
              status: 404,
              message: (d.body.mensaje),
              devMessage: (d.text),
            }))

          return resolve({
            status: 200,
            data: d.body.data,
          })
        } catch (e) {
          return reject(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.response.text),
          }))
        }
      })
      .catch((e) => {
        let status, message, devMessage
        if (e.timeout) {
          status = 503
          message = 'error: timeout; code: ECONNABORTED'
          devMessage = (e.stack)
        } else if (e.status === 401) {
          status = 500
          message = 'Error: extWS, falló la autenticación con el servicio externo.'
          devMessage = `Error: extWS; Stack: ${e.stack}`
        } else {
          status = (e.status) ? e.status : 500
          message = `Error: extWS, ${e.message}`
          devMessage = `Error: extWS; Stack: ${e.stack}`
        }

        return reject(APIError({
          status: (status),
          message: (message),
          devMessage: (devMessage),
        }))
      })
  })
}


export default {
  get,
}
