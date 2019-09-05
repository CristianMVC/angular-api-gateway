import logger from '../../../../config/winston'
import request from 'superagent'
import Auth from './auth'
import APIError from '../../../helpers/APIError'
import { isObject, } from 'lodash'


/**
 * Request method
 * @param params
 * @return {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'MinDesarrolloSocial::Controller::consulta')
    Auth()
      .then((token) => {
        request
          .get(params.url)
          .set('Authorization', token)
          .set('Accept', '*/*')
          .set('Accept-Encoding', 'gzip, deflate')
          .set('Cache-Control', 'no-cache')
          .set('User-Agent', 'Mozilla/5.0')
          .timeout({ deadline: 10000, })
          .query(params.query)
          .then((d) => {
            if (isObject(d.body)) {
              if (d.body.status === 'error')
                return reject(APIError({
                  status: 404,
                  message: (d.body.message) ? d.body.message : null,
                  devMessage: `request: status ${d.status}; body ${d.text}`,
                }))

              return resolve(d.body)
            } else {
              return reject(APIError({
                status: 500,
                message: 'Error: not is appilication/json',
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
      .catch((e) => reject(e))
  })
}
