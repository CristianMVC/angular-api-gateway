import config from '../../../../config/env'
import request from './request'
import logger from '../../../../config/winston'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getElement(req, res, next) {
  logger.log('debug', 'Controller::Convocatoria-Detalle::getElement')

  const url = `${config.ws.cultura.convocatorias.url}${req.params.id}`

  request
    .get({ url, })
    .then((v) => {
      return res.json(v)
    })
    .catch((e) => next(e))
}

export default {
  getElement,
}