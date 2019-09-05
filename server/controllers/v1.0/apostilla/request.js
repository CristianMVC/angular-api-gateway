import { readFileSync, }          from 'fs'
import request                    from 'superagent'
import TlsReject                  from '../../../helpers/TlsReject'
import APIError                   from '../../../helpers/APIError'
import config                     from '../../../../config/env'

// import { isObject, } from 'lodash'

const key = readFileSync(`${config.ca.dir}/apostilla-privateKey.key`)
const cert = readFileSync(`${config.ca.dir}/apostilla-publicCert.crt`)


function post(options = {}) {
  const {
    url = null,
    query = {},
    body = {},
  } = options

  if (!url)
    throw APIError({
      status: 500,
      message: 'Error: RequestURL is undefined',
    })

  return new Promise((resolve, reject) => {
    TlsReject.set()

    request
      .post(url)
      .set('content-type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '')
      .set('Accept', '*/*')
      .set('Accept-Language', 'en-US,en,es-AR,es;q=0.5')
      .set('Accept-Encoding', 'gzip,deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .cert(cert)
      .key(key)
      .query(query)
      .send(body)
      .then((d) => resolve(d))
      .catch((e) => {
        let status, message, devMessage
        if (e.timeout) {
          status = 503
          message = 'error: timeout; code: ECONNABORTED'
          devMessage = (e.stack)
        } else if (e.status === 401) {
          status = 503
          message = 'Error: extWS, falló la autenticación con el servicio externo.'
          devMessage = `Error: extWS; Stack: ${e.response.text}`
        } else {
          // El WsExt engloba los 404 en los 500
          status = (e.status) ? 404 : 500
          message = `Error: extWS, ${e.message}`
          devMessage = `Error: extWS; Status: ${e.status}, Stack: ${e.response.text}`
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
  post,
}
