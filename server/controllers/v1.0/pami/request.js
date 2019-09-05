import Promise from 'bluebird'
import request from 'superagent'
import APIError from '../../../helpers/APIError'
import { isObject, } from 'lodash'
import logger from '../../../../config/winston'


/**
 * Request Method
 * @namespace opt - Options
 * @property {string} url
 * @property {object} query
 * @property {object} body
 * @property {string} method
 * @property {boolean} isJson
 * @returns  {Promise}
 */
function clientHttp(opt) {
  const {
    url = '',
    method = '',
    body = {},
    isJson = false,
  } = opt

  return new Promise((resolve, reject) => {
    let _r
    // Set Method:
    if (method === 'GET')
      _r = request.get(url)

    // Set Headers
    _r.set('Accept', '*/*')
    _r.set('Accept-Encoding', 'gzip, deflate')
    _r.set('Cache-Control', 'no-cache')
    _r.set('User-Agent', 'Mozilla/5.0')

    if (isJson) {
      logger.log('debug', 'RequestMethod::isJson:%s', isJson)
      _r.set('Content-Type', 'application/json')
      _r.type('json')
    }

    // Set TimeOut
    _r.timeout({ deadline: 80000, })

    if (body)
      _r.send(body)

    _r.then((d) => {
      if (isObject(d.body))
        return resolve(d.body)
      else if (d) {
        const { status = '', text = '', } = d
        return reject(APIError({
          status: 500,
          message: 'Error: parser application/json',
          devMessage: `request: status ${status}; body ${text}`,
        }))
      } else
        return reject(APIError({ status: 500, }))
    })
    .catch((e) => {
      let status, message, devMessage, errorCode
      if (e.timeout) {
        status = 503
        message = 'error: timeout; code: ECONNABORTED'
        devMessage = (e.stack)
      } else if (e.status === 401) {
        status = 500
        message = 'Error: extWS, falló la autenticación con el servicio externo.'
        devMessage =  `Error: extWS; Stack: ${e.stack}`
      }

      return reject(APIError({
        status: (status),
        message: (message),
        devMessage: (devMessage),
        errorCode: (errorCode),
      }))
    })
  })
}

/**
 * Request Method GET
 * @param url
 */
function get({ url, } = {}) {
  return clientHttp({ url, method: 'GET', })
}

export default {
  get,
}