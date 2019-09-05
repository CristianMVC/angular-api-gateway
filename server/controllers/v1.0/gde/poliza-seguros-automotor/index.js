import APIResponses from '../../../../helpers/APIStandarResponses'
import logger from '../../../../../config/winston'
import request from './request'
import config from '../../../../../config/env'


/**
 * listPolizaPorDocumento
 * @param req
 * @param res
 * @param next
 */
function listPolizaPorDocumento(req, res, next) {
  logger.log('debug', 'Controller::ListPolizaPorDocumento')
  const options = {
    url: config.ws.gde.polizaAutomotor.url,
    path: `/polizapordocumento/${req.params.id}`,
    query: req.query,
  }
  request
    .get(options)
    .then((d) => {
      const {
        hayDatos,
        responseMessage,
      } = d

      const l = d.consultasResponse

      res.json(APIResponses.list(0, 0, l, { hayDatos, responseMessage, }))
    })
    .catch((e) => next(e))
}


export default {
  listPolizaPorDocumento,
}
