import request from 'superagent'
import Auth from './auth'
import { isObject, } from 'lodash'
import TlsReject from '../../../../helpers/TlsReject'
import APIError from '../../../../helpers/APIError'
import logger from '../../../../../config/winston'


function get(options = {}) {
  return new Promise((resolve, reject) => {
    Auth()
      .then((tokens) => {
        const {
          url = null,
          path = null,
          query = {},
          body = {},
        } = options


        if (!url)
          return reject(APIError({
            status: 500,
            message: 'Error: URL is undefined',
          }))

        TlsReject.set()

        request
          .get(`${url}${path}`)
          .set('Authorization', tokens.kong)
          .set('Auth', tokens.security)
          .set('Content-Type', 'application/json')
          .set('Accept', '*/*')
          .set('Accept-Language', 'en-US,en;q=0.5')
          .set('Accept-Encoding', 'gzip, deflate')
          .set('Cache-Control', 'no-cache')
          .set('User-Agent', 'Mozilla/5.0')
          .query(query)
          .send(body)
          .then((d) => {
            if (isObject(d.body))
              return resolve(d.body)
            else
              return reject(APIError({
                status: 500,
                message: 'Error: extWS, not is appilication/json',
                devMessage: `request: status ${d.status}; body ${d.text}`,
              }))
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

            return reject(APIError({
              status: (status),
              message: (message),
              devMessage: (devMessage),
            }))
          })
      })
      .catch((e) => reject(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
      })))
  })
}


export default {
  get,
}
