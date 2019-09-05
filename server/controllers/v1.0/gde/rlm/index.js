import APIResponses from '../../../../helpers/APIStandarResponses'
import logger from '../../../../../config/winston'
import request from './request'
import parseData from './utils/parse-data'
import config from '../../../../../config/env'

/**
 * listAllTipoRegistroPublico
 * @param req
 * @param res
 * @param next
 */
function listAllTipoRegistroPublico(req, res, next) {
  logger.log('debug', 'Controller::listAllTipoRegistroPublico')
  const options = {
    url: config.ws.gde.rlm.url,
    path: '/listAllTipoRegistroPublico',
  }
  request
    .get(options)
    .then((l) => res.json(APIResponses.list(0, 0, l)))
    .catch((e) => next(e))
}

/**
 * demoGetList
 * @param req
 * @param res
 * @param next
 */
function listRegistroExternos(req, res, next) {
  logger.log('debug', 'Controller::listRegistroExternos')
  const options = {
    url: config.ws.gde.rlm.url,
    path: '/listRegistroExternos',
    query: {
      filtro: req.query.filtro,
      codigo: req.params.codigo,
    },
  }
  request
    .get(options)
    .then((d) => {
      const l = d.map((o) => parseData(o))
      res.json(APIResponses.list(0, 0, l, { codigo: req.params.codigo, }))
    })
    .catch((e) => next(e))
}


export default {
  listAllTipoRegistroPublico,
  listRegistroExternos,
}

