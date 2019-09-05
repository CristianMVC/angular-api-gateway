import APIResponses from '../../../helpers/APIStandarResponses'
import config from '../../../../config/env'
import request from './request_private'
import logger from '../../../../config/winston'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
  logger.log('debug', 'Controller::Provincias::getElement')

  const url = `${config.ws.incucai.private.url}/v1.0/provincias`

  request
    .get({ url, })
    .then((v) => res.json(APIResponses.list(0, 0, v)))
    .catch((e) => next(e))
}

export default {
  getList,
}
