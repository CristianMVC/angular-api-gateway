import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import config                       from '../../../../config/env'
import _getToken                    from './helpersToken'


/**
 * categoriaServicios
 * @param params
 * @return {Promise}
 */
export default function categoriaServicios(params) {
  return new Promise((resolve, reject) => {
    _getToken()
      .then((token) => {
        logger.log('debug', 'Controller::mscrm::categoria-servicios')
        logger.log('debug', 'Controller::mscrm::categoria-servicios:Params: %j', params)
        request
          .get(config.ws.categoriaServicios.url)
          .set('Authorization', `Bearer ${token}`)
          .query(params)
          .then((result) => {
            resolve(result.body)
          })
          .catch((e) => {
            logger.error('Controller::mscrm::categoria-servicios::RequestError')
            reject({ status: e.status, devMessage: e.message, isPublic: true, })
          })
      })
      .catch((e) => {
        logger.error('Controller::mscrm::categoria-servicios::TokenError')
        reject({ status: 500, devMessage: e.message, isPublic: false, })
      })
  })
}
