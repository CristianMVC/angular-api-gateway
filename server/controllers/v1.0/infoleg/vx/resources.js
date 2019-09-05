import config from '../../../../../config/env/index'
import logger from '../../../../../config/winston'
import request from 'superagent'
import binaryParser from 'superagent-binary-parser'


/**
 * Request method
 * @param params
 * @return {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::infoleg::Resources::v1')
    request
      .get(`${config.ws.infoleg.index.url}${params.path}`)
      .set('Accept', 'text/html,application/xhtml+xml,application/xml,application/pdf,*/*;q=0.9,*/*;q=0.8')
      .set('Accept-Language', 'en-US,en,es-AR,es;q=0.5')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .query(params.query)
      .parse(binaryParser)
      .buffer()
      .end((err, resp) => {
        if (!err)
          resolve(resp)
        else
          reject(err)
      })
  })
}
