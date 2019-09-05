import APIError                       from '../../../helpers/APIError'
import logger                         from '../../../../config/winston'
import config                         from '../../../../config/env'
import request                        from 'superagent'

/**
 * parseError: validate string to JSON
 * @param str
 * @return {*}
 */
function parseError(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

/**
 * Proxy GET
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function get(req, res, next) {
  logger.log('debug', 'Controller::SNT::GET')
  const {
    path,
    query,
  } = req

  request
    .get(config.ws.snt.index.url + path)
    .query(query)
    .then((r) => {
      try {
        return res
          .status(r.status)
          .send(r.body)
          .end()
      } catch (e) {
        return next(APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
        }))
      }
    })
    .catch((e) => {
      return next(APIError({
        status: (e.status),
        message: (e.response.text) ? parseError(e.response.text) : e.message,
      }))
    })
}


/**
 * Proxy POST
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function post(req, res, next) {
  logger.log('debug', 'Controller::SNT::POST')
  const {
    path,
    query,
    body,
  } = req

  request
    .post(config.ws.snt.index.url + path)
    .query(query)
    .send(body)
    .then((r) => {
      try {
        return res
          .status(r.status)
          .set({ 'Content-Type': r['header']['content-type'], })
          .send(r.body)
          .end()
      } catch (e) {
        return next(APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
        }))
      }
    })
    .catch((e) => {
      return next(APIError({
        status: (e.status),
        message: (e.response.text) ? parseError(e.response.text) : e.message,
      }))
    })
}


/**
 * Proxy PUT
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function put(req, res, next) {
  logger.log('debug', 'Controller::SNT::PUT')
  const {
    path,
    query,
    body,
  } = req

  request
    .put(config.ws.snt.index.url + path)
    .query(query)
    .send(body)
    .then((r) => {
      try {
        return res
          .status(r.status)
          .set({ 'Content-Type': r['header']['content-type'], })
          .send(r.body)
          .end()
      } catch (e) {
        return next(APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
        }))
      }
    })
    .catch((e) => {
      return next(APIError({
        status: (e.status),
        message: (e.response.text) ? parseError(e.response.text) : e.message,
      }))
    })
}


/**
 * Proxy REMOVE (DELETE)
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function remove(req, res, next) {
  logger.log('debug', 'Controller::SNT::REMOVE')
  const {
    path,
    query,
    body,
  } = req

  request
    .del(config.ws.snt.index.url + path)
    .query(query)
    .send(body)
    .then((r) => {
      try {
        return res
          .status(r.status)
          .set({ 'Content-Type': r['header']['content-type'], })
          .send(r.body)
          .end()
      } catch (e) {
        return next(APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
        }))
      }
    })
    .catch((e) => {
      return next(APIError({
        status: (e.status),
        message: (e.response.text) ? parseError(e.response.text) : e.message,
      }))
    })
}


export default {
  get,
  post,
  put,
  remove,
}
