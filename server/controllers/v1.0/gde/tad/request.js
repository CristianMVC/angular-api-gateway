import request from 'superagent'
import TlsReject from '../../../../helpers/TlsReject'
import APIError from '../../../../helpers/APIError'
import { isObject, } from 'lodash'


function get(options = {}) {
  const {
    url = null,
    path = null,
    query = {},
    body = {},
    tokens = null,
  } = options

  if (!url)
    throw APIError({
      status: 500,
      message: 'Error: URL is undefined',
    })

  if (!tokens)
    throw APIError({
      status: 500,
      message: 'Error: Tokens is undefined',
    })

  return new Promise((resolve, reject) => {
    TlsReject.set()

    request
    .get(`${url}${path}`)
    .set('Authorization', tokens.tokenKong)
    .set('Auth', tokens.tokenTAD)
    .set('content-type', 'application/json')
    .set('Accept', '*/*')
    .set('Accept-Language', 'en-US,en;q=0.5')
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Cache-Control', 'no-cache')
    .set('User-Agent', 'Mozilla/5.0')
    .timeout(10000)
    .query(query)
    .send(body)
    .then((d) => {
      if (isObject(d.body)) {
        if (d.body.error)
          return reject(APIError({
            status: 400,
            message: d.body.mensaje,
            devMessage: `request: status ${d.status}; body ${d.text}`,
          }))
        else
          return resolve(d.body)
      } else {
        return reject(APIError({
          status: 500,
          message: 'Error: extWS, not is appilication/json',
          devMessage: `request: status ${d.status}; body ${d.text}`,
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
        status = 503
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
