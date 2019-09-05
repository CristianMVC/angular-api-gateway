import request                      from 'superagent'
import APIResponse                  from '../../../helpers/APIStandarResponses'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import APIError                     from '../../../helpers/APIError'


/**
 * Consultar-Provincias
 * @param req - Request
 * @param res - Response
 */
function provincias(req, res, next) {
  logger.log('debug', 'Controller::geoRef::provincias')
  request
    .get(`${config.ws.geoRef.url}/provincias`)
    .query({
      nombre: req.query.nombre,
      max: req.query.limit,
      orden: req.query.orden,
    })
    .then((result) => {
      res.json(APIResponse.list(0, req.query.limit, result.body.provincias))
    })
    .catch((e) => {
      logger.log('debug', 'Controller::geoRef::provincias::Request:Catch')
      next(APIError({
        status: e.response.status,
      }))
    })
}


/**
 * Consultar-Departamentos
 * @param req - Request
 * @param res - Response
 */
function departamentos(req, res, next) {
  logger.log('debug', 'Controller::geoRef::departamentos')
  request
    .get(`${config.ws.geoRef.url}/departamentos`)
    .query({
      nombre: req.query.nombre,
      provincia: req.query.provincia,
      max: req.query.limit,
      orden: req.query.orden,
    })
    .then((result) => {
      res.json(APIResponse.list(0, req.query.limit, result.body.departamentos))
    })
    .catch((e) => {
      logger.log('Controller::geoRef::departamentos::Request:Catch')
      next(APIError({
        status: e.status,
      }))
    })
}

/**
 * Consultar-Localidades
 * @param req - Request
 * @param res - Response
 */
function localidades(req, res, next) {
  logger.log('debug', 'Controller::geoRef::localidades')
  request
    .get(`${config.ws.geoRef.url}/localidades`)
    .query({
      nombre: req.query.nombre,
      departamento: req.query.departamento,
      provincia: req.query.provincia,
      max: req.query.limit,
      orden: req.query.orden,
      id: req.query.id,
    })
    .then((result) => {
      res.json(APIResponse.list(0, req.query.limit, result.body.localidades))
    })
    .catch((e) => {
      logger.log('debug', 'Controller::geoRef::localidades::Request:Catch')
      next(APIError({
        status: e.status,
      }))
    })
}


export default {
  provincias,
  departamentos,
  localidades,
}
