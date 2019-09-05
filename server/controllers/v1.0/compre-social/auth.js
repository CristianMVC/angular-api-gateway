import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import config                       from '../../../../config/env'
import redis                        from '../../../helpers/Redis'

/**
 * Request method
 * @return {Promise}
 */
function _requestToken() {
  return new Promise((resolve, reject) => {
    request
      .post(config.ws.compreSocial.login.url)
      .type('form')
      .send(config.ws.compreSocial.login.body)
      .then((result) => resolve(result.body))
      .catch((e) => reject(e))
  })
}

export default () => {
  logger.log('debug', 'Controller::compre-social:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:compre-social')
      .then((exists) => {
        if (exists === true) {
          redis.get('Auth:Token:compre-social')
            .then((reply) => resolve(reply))
            .catch((err) => reject(err))
        } else {
          _requestToken()
            .then((result) => {
              redis.set('Auth:Token:compre-social', `${result.token_type} ${result.access_token}`)
                .then((expire) => {
                  redis.expire('Auth:Token:compre-social', result.expires_in)
                    .then(() => {
                      if (expire) resolve(`${result.token_type} ${result.access_token}`)
                    })
                    .catch((e) => reject(e))
                })
                .catch((e) => reject(e))
            })
            .catch((e) => reject(e))
        }
      })
  })
}