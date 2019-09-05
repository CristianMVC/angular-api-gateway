import logger from '../../../../config/winston'
import request from 'superagent'
import config from '../../../../config/env'


/**
 * Request method
 * @param params
 * @return {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::infoleg::consulta')
    request
      .get(`${config.ws.infoleg.v0.url}${params.path}`)
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
