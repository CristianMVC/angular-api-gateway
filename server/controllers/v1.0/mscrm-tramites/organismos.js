import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import config                       from '../../../../config/env'
import _getToken                    from './helpersToken'


/**
 * organismos
 * @param params
 * @return {Promise}
 */
export default function organismos(params) {
  return new Promise((resolve, reject) => {
    _getToken()
      .then((token) => {
        logger.log('debug', 'Controller::mscrm::organismos')
        logger.log('debug', 'Controller::mscrm::organismos:Params: %j', params)
        request
          .get(config.ws.organismos.url)
          .set('Authorization', `Bearer ${token}`)
          .query(params)
          .then((result) => {
            resolve(result.body)
          })
          .catch((e) => {
            logger.error('Controller::mscrm::organismos::RequestError')
            logger.error(e)
            reject({ status: e.status, devMessage: e.message, isPublic: true, })
          })
      })
      .catch((e) => {
        logger.error('Controller::mscrm::organismos::TokenError')
        reject({ status: e.status, devMessage: e.message, isPublic: false, })
      })
  })
}
