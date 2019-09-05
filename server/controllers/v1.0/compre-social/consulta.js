import request                      from 'superagent'
import config                       from '../../../../config/env'


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
    .query(params.query)
    .then((result) => resolve(result))
    .catch((e) => reject(e))
  })
}
