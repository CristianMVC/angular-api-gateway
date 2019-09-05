import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import Promise                      from 'bluebird'
import redis                        from '../../../helpers/Redis'
import request                      from 'superagent'


/**
 * Request Token
 */
function _requestToken() {
  return new Promise((resolve, reject) => {
    request
      .post(config.ws.interfaces.login.url)
      .type('form')
      .send(config.ws.interfaces.login.body)
      .then((result) => {
        logger.log('debug', 'requestToken')
        resolve(result.body.token)
      }).catch((e) => {
      logger.log('debug', e)
      reject(e)
    })
  })
}


/**
 * GetToken
 */
export default function getToken() {
  logger.log('debug', 'Controller::mscrm-tramites-helper:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:BarriosPopulares')
      .then((exists) => {
        if (exists === true) {
          logger.log('debug', 'Controller::mscrm-tramites-helper::_getToken:exists')
          redis.get('Auth:Token:BarriosPopulares')
            .then((reply) => {
              logger.log('debug', 'Controller::mscrm-tramites-helper::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::mscrm-tramites-helper::_getToken::exists:reject')
              logger.error(err)
              reject(err)
            })
        } else {
          _requestToken()
            .then((result) => {
              redis.set('Auth:Token:BarriosPopulares', result)
                .then((expire) => {
                  redis.expire('Auth:Token:BarriosPopulares', 3480) //58 minutos
                    .then(() => {
                      if (expire) resolve(result)
                    })
                    .catch((e) => {
                      reject(e)
                    })
                })
                .catch((e) => {
                  reject(e)
                })
            })
            .catch((e) => {
              reject(e)
            })
        }
      })
  })
}