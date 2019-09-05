import APIResponse                        from '../../../helpers/APIStandarResponses'
import config                             from '../../../../config/env'
import logger                             from '../../../../config/winston'
import request                            from 'superagent'
import moment                             from 'moment'
import Promise                            from 'bluebird'
import APIError                           from '../../../helpers/APIError'
import { isEmptyData, }                   from './utils'
import getListFronteras                   from './getListFronteras'


/**
 * Lista los pasos de PNA y GNA
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getList(req, res, next) {
  logger.log('debug', 'Controller::fronteras::list')
  Promise.all([
    getListFronteras(0, config.ws.fronteras.gna.url),
    getListFronteras(1, config.ws.fronteras.pna.list.url),
  ])
  .then((v) => {
    const a = v[0].concat(v[1])
    res.json(APIResponse.list(0, 0, a))
  })
  .catch((e) => {
    logger.error('Controller::fronteras::list::PromiseAll')
    next(APIError({
      status: 500,
      message: (e.message),
      devMessage: (e.stack),
    }))
  })
}


/**
 * List pasos fronterizos de Prefectura
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getListGNA(req, res, next) {
  logger.log('debug', 'Controller::fronteras::getListGNA')
  getListFronteras(0, config.ws.fronteras.gna.url)
    .then((v) => {
      res.json(APIResponse.list(0, 0, v))
    })
    .catch((e) => {
      logger.error('Controller::fronteras::list::PromiseAll')
      next(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


/**
 * Muestra según ID el detalle de un paso de GNA
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getDetalleGNA(req, res, next) {
  logger.log('debug', 'Controller::fronteras::detalleGNA')
  const params = {
    id: req.params.id,
  }
  request
    .get(`${config.ws.fronteras.gna.url}/${params.id}`)
    .query(params)
    .then((result) => {
      if (isEmptyData(result.body)) {
        logger.error('Controller::fronteras::detalleGNA::catch')
        next(APIError({
          status: 404,
        }))
      } else {
        res.json(result.body)
      }
    })
    .catch((e) => {
      logger.error('Controller::fronteras::detalleGNA::RequestError')
      next(APIError({
        status: e.status,
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


/**
 * List pasos fronterizos de Gerndarmería
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getListPNA(req, res, next) {
  logger.log('debug', 'Controller::fronteras::getListPNA')
  getListFronteras(1, config.ws.fronteras.pna.list.url)
    .then((v) => {
      res.json(APIResponse.list(0, 0, v))
    })
    .catch((e) => {
      logger.error('Controller::fronteras::list::PromiseAll')
      next(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


/**
 * Muestra según ID el detalle de un paso de PNA
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getDetallePNA(req, res, next) {
  logger.log('debug', 'Controller::fronteras::detallePNA')
  const params = {
    puerto_id: req.params.id,
  }
  request
    .get(config.ws.fronteras.pna.detalle.url)
    .query(params)
    .then((result) => {
      const self = result.body
      if (isEmptyData(self)) {
        res.json(self)
      } else {
        self.fecha_registro = moment(self.fecha_registro).toISOString()
        res.json(self)
      }
    })
    .catch((e) => {
      logger.error('Controller::fronteras::detallePNA::RequestError')
      next(APIError({
        status: e.status,
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


export default {
  getList,
  getListGNA,
  getDetalleGNA,
  getListPNA,
  getDetallePNA,
}
