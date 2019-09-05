import redis                    from '../../../helpers/Redis'
import request                  from 'superagent'
import config                   from '../../../../config/env'
import Promise                  from 'bluebird'
import logger                   from '../../../../config/winston'
import TlsReject from '../../../helpers/TlsReject'


function _requestToken() {
  return new Promise((resolve, reject) => {
    const url = config.ws.g20.login.url
    TlsReject.set()
    request
      .post(url)
      .type('form')
      .send(config.ws.g20.login.body)
      .then((result) => {
        resolve(result.body)
      })
      .catch((e) => {
        reject(e)
      })
  })
}


export default function getToken() {
  logger.log('debug', 'Controller::g20:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:g20')
      .then((exists) => {
        if (exists === true) {
          logger.log('debug', 'Controller::g20::_getToken:exists')
          redis.get('Auth:Token:g20')
            .then((reply) => {
              logger.log('debug', 'Controller::g20::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::g20::_getToken::exists:reject')
              logger.error(err)
              reject(err)
            })
        } else {
          _requestToken()
            .then((result) => {
              redis.set('Auth:Token:g20', `${result.token_type} ${result.access_token}`)
                .then((expire) => {
                  redis.expire('Auth:Token:g20', result.expires_in)
                    .then(() => {
                      if (expire) resolve(`${result.token_type} ${result.access_token}`)
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
