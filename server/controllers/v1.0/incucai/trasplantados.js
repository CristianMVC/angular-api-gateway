import request from './request_private'
import logger from '../../../../config/winston'
import config from '../../../../config/env'
import { assign, } from 'lodash'
import APIResponses from '../../../helpers/APIStandarResponses'


/**
 * getCredencialByQs
 * @param req
 * @param res
 * @param next
 */
function getCredencialByQs(req, res, next) {
  logger.log('debug', 'Controller::Transplantados::getCredencialByQs')
  //TODO: usar id Token
  const url = `${config.ws.incucai.private.url}v3.0/trasplantados/credencial`
  const query = assign({ token: config.ws.incucai.private.token, }, req.query)

  request
    .get({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * getCredencialById
 * @param req
 * @param res
 * @param next
 */
function getCredencialById(req, res, next) {
  logger.log('debug', 'Controller::Transplantados::getCredencialById')
  const url = `${config.ws.incucai.private.url}v3.0/trasplantados/credencial/${req.params.nroCredencial}`
  const query = assign({ token: config.ws.incucai.private.token, }, req.query)

  request
    .get({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * getCredencialesVencidas
 * @param req
 * @param res
 * @param next
 */
function getCredencialesVencidas(req, res, next) {
  logger.log('debug', 'Controller::Transplantados::getCredencialesVencidas')
  const url = `${config.ws.incucai.private.url}v2.0/trasplantados/credencial/vencidas` //FIXME: v2 funciona, oficialmente se debe usar v3
  const query = assign({ token: config.ws.incucai.private.token, }, req.query)
  request
    .get({ url, query, })
    .then((v) => {
      const l = APIResponses.list(0, 0, v)
      return res.json(l)
    })
    .catch((e) => next(e))
}


export default {
  getCredencialByQs,
  getCredencialById,
  getCredencialesVencidas,
}
