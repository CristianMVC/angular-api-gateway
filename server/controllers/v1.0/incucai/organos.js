import request from './request_private'
import logger from '../../../../config/winston'
import config from '../../../../config/env'
import { assign, } from 'lodash'
import APIError from '../../../helpers/APIError'
import parseDataRegistro from './utils/parseDataRegistro'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getCredencial(req, res, next) {
  logger.log('debug', 'Controller::Organos::getCredencial')

  const url = `${config.ws.incucai.private.url}v2.0/organos/donantes/${req.params.dni}`
  const query = assign({ token: config.ws.incucai.private.token, }, req.query)

  request
    .get({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * Create Element
 * @param req
 * @param res
 * @param next
 */
function postRegistro(req, res, next) {
  logger.log('debug', 'Controller::Organos::postRegistro')
  try {
    const url = `${config.ws.incucai.private.url}v2.0/organos/donantes`
    const data = parseDataRegistro({ body: req.body, query: req.query, })
    request
      .post({ url, query: data.query, body: data.body, isJson: true, })
      .then((v) => res.json(v))
      .catch((e) => next(e))
  } catch (e) {
    return next(APIError({
      status: 500,
      message: e.message,
      devMessage: e.stack,
    }))
  }
}

/**
 * Update Registro de usuario
 * @param req
 * @param res
 * @param next
 */
function putRegistro(req, res, next) {
  logger.log('debug', 'Controller::Organos::putRegistro')
  try {
    const url = `${config.ws.incucai.private.url}v2.0/organos/donantes`
    const data = parseDataRegistro({ body: req.body, query: req.query, })
    // return res.json({ url, query: data.query, body: data.body, isJson: true, })
    request
      .put({ url, query: data.query, body: data.body, isJson: true, })
      .then((v) => res.json(v))
      .catch((e) => next(e))
  } catch (e) {
    return next(APIError({
      status: 500,
      message: e.message,
      devMessage: e.stack,
    }))
  }
}


/**
 * Update Element, Confirmacion
 * @param req
 * @param res
 * @param next
 */
function postConfirmacion(req, res, next) {
  logger.log('debug', 'Controller::Organos::postConfirmacion')

  const url = `${config.ws.incucai.private.url}v2.0/organos/donantes/confirmacion/${req.params.dni}`
  const query = assign({ token: config.ws.incucai.private.token, }, req.query)

  request
    .post({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


export default {
  getCredencial,
  postRegistro,
  putRegistro,
  postConfirmacion,
}
