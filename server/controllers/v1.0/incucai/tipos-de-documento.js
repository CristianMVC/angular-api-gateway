import logger from '../../../../config/winston'
import config from '../../../../config/env'
import request from './request_private'
import APIResponses from '../../../helpers/APIStandarResponses'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
  logger.log('debug', 'Controller::TiposDeDocumento::getElement')

  const url = `${config.ws.incucai.private.url}/v1.0/tiposdedocumento`

  request
    .get({ url, })
    .then((v) => res.json(APIResponses.list(0, 0, v)))
    .catch((e) => next(e))
}

export default {
  getList,
}
