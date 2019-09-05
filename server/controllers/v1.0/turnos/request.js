import Promise from 'bluebird'
import request from 'superagent'
import logger from '../../../../config/winston'


/**
 * Request Method
 * @namespace opt - Options
 * @property {string} url
 * @property {object} query
 * @property {object} body
 * @property {string} method
 * @property {boolean} isJson
 * @returns {Promise}
 */
function clientHttp(opt) {
  logger.log('debug', 'ClientHTTP::Options::', opt)
  const {
    url = '',
    headers = {},
    method = '',
    query = {},
    body = {},
    isJson = false,
  } = opt

 logger.log('debug', 'ClientHTTP::headers::', headers.token)
 logger.log('debug', 'ClientHTTP::body::', body)
  return new Promise((resolve, reject) => {
    let _r
    // Set Method:
    if (method === 'GET')
      _r = request.get(url)

    if (method === 'POST')
      _r = request.post(url)

    if (method === 'PUT')
      _r = request.put(url)

    if (method === 'DELETE')
      _r = request.delete(url)
    // Set Headers
//    _r.set('Accept', '*/*')
//    _r.set('Accept-Encoding', 'gzip, deflate')
//    _r.set('Cache-Control', 'no-cache')
//    _r.set('User-Agent', 'Mozilla/5.0')
      if (headers.token)
      _r.set('Authorization', headers.token)

    // Set TimeOut
    _r.timeout({ deadline: 80000, })
  //  if (headers) {
  //	for (const key in headers) {
//		_r.set(headers[key])
//	}
 //   }
    if (query)

      _r.query(query)

    if (body)
      _r.send(body)

    _r.then((d) => {
       return resolve(d)
       })
      .catch((e) => {
           return reject(e)
     })
  })
}

/**
 * Request Method GET
 * @param url
 * @param query
 */
function get({ url, headers = {}, query = {}, body = {}, } = {}) {
  return clientHttp({ url, headers, query, body, method: 'GET', })
}


/**
 * Request Method POST
 * @param url
 * @param query
 * @param body
 */
function post({ url = '', headers = {}, query = {}, body = {}, isJson = false, } = {}) {
  return clientHttp({ url, headers, query, body, method: 'POST', isJson, })
}


/**
 * Request Method PUT
 * @param url
 * @param query
 * @param body
 */
function put({ url = '', headers = {}, query = {}, body = {}, isJson = false, } = {}) {
  return clientHttp({ url, headers, query, body, method: 'PUT', isJson, })
}

/**
 * Request Method DELETE
 * @param url
 * @param query
 * @param body
 */
function remove({ url = '', headers = {}, query = {}, body = {}, isJson = false, } = {}) {
  return clientHttp({ url, headers, query, body, method: 'DELETE', isJson, })
}


export default {
  get,
  post,
  put,
  remove,
}
