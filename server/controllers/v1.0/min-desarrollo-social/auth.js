import redis                    from '../../../helpers/Redis'
import request                  from 'superagent'
import config                   from '../../../../config/env'
import Promise                  from 'bluebird'
import logger                   from '../../../../config/winston'


function _requestToken() {
  logger.log('debug', 'minDesarrolloSocial::AuthCtrl::_requestToken')
  return new Promise((resolve, reject) => {
    const url = config.ws.minDesarrolloSocial.login.url
    request
      .post(url)
      .type('form')
      .send(config.ws.minDesarrolloSocial.login.body)
      .then((result) => resolve(result.body))
      .catch((e) => reject(e))
  })
}


export default function getToken() {
  logger.log('debug', 'minDesarrolloSocial::AuthCtrl::_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:minDesarrolloSocial')
      .then((exists) => {
        if (exists) {
          logger.log('debug', 'minDesarrolloSocial::AuthCtrl::_getToken:exists')
          redis.get('Auth:Token:minDesarrolloSocial')
            .then((reply) => {
              logger.log('debug', 'minDesarrolloSocial::AuthCtrl::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((e) => reject(e))
        } else {
          _requestToken()
            .then((result) => {
              redis
                .set('Auth:Token:minDesarrolloSocial', `Bearer ${result.token}`)
                .then(() => {
                  redis.expire('Auth:Token:minDesarrolloSocial', '3500')
                    .then(() => resolve(`Bearer ${result.token}`))
                    .catch((e) => reject(e))
                })
                .catch((e) => reject(e))
            })
            .catch((e) => reject(e))
        }
      })
  })
}
