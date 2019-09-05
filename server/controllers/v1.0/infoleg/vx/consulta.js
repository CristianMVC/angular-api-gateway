import logger from '../../../../../config/winston'
import request from 'superagent'
import config from '../../../../../config/env/index'


/**
 * Request method
 * @param params
 * @return {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::infoleg::Request::v1')
    request
      .get(`${config.ws.infoleg.index.url}${params.path}`)
      .set('Accept-Encoding', '')
      .query(params.query)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
