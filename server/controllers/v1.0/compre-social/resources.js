import config from '../../../../config/env'
import request from 'superagent'
import binaryParser from 'superagent-binary-parser'


/**
 * Request method
 * @param params
 * @return {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.ws.compreSocial.api.url}${params.path}`)
      .set('Authorization', params.token)
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .timeout({ deadline: 20000, })
      .parse(binaryParser)
      .buffer()
      .end((err, resp) => {
        if (!err)
          return resolve(resp)
        else
          return reject(err)
      })
  })
}