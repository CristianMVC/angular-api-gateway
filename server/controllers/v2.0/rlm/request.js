import request      from 'superagent'
import Auth         from './auth'
import parseData    from './utils/parse-data'
import config       from '../../../../config/env'
import TlsReject    from '../../../helpers/TlsReject'
import APIError     from '../../../helpers/APIError'

const { url: urlRlmExternalFiles, } = config.ws2.rlm

/**
 *
 * @param {String} codigo
 * @param {String} filtro
 */

function getExternalFiles(codigo, filtro, pagina) {
  return new Promise((resolve, reject) => {
    Auth()
      .then((tokens) => {
        TlsReject.set()

        const { security, kong, } = tokens
        const requestData = {
          codigoTipoRegistro: codigo,
          filtro,
          pagina,
        }

        request
          .post(`${urlRlmExternalFiles}`)
          .set('Authorization', kong)
          .set('Auth', security)
          .set('Content-Type', 'application/json')
          .set('Accept', '*/*')
          .set('Accept-Language', 'en-US,en;q=0.5')
          .set('Accept-Encoding', 'gzip, deflate')
          .set('Cache-Control', 'no-cache')
          .set('User-Agent', 'Mozilla/5.0')
          //.query(query)
          .send(requestData)
          .then(({ body, status, text, }) => {
            if (typeof body !== 'object' || !body) {
              const apiError = APIError({
                status: 500,
                message: 'Error: extWS, not is appilication/json',
                devMessage: `request: status ${status}; body ${text}`,
              })
              reject(apiError)
              return
            }
            const response = body.map((o) => parseData(o))

            resolve(response)
            return
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
              devMessage = `Error: extWS; Stack: ${e.response ? e.response.text : e.message}`
            }

            reject(APIError({
              status: (status),
              message: (message),
              devMessage: (devMessage),
            }))
            return
          })
      })
      .catch((e) => reject(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
      })))
  })
}


export {
  getExternalFiles,
}
