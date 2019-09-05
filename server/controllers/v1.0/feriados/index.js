import request                      from 'superagent'
import APIError                     from '../../../helpers/APIError'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import redis                        from '../../../helpers/Redis'
import Promise                      from 'bluebird'

function _requestToken() {
  return new Promise((resolve, reject) => {
    request
      .post(config.ws.interfaces.login.url)
      .type('form')
      .send(config.ws.interfaces.login.body)
      .then((result) => {
        resolve(result.body.token)
      }).catch((e) => {
      logger.log('debug', e)
      reject(e)
    })
  })
}

function _getToken() {
  logger.log('debug', 'Controller::feriados:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:BarriosPopulares')
      .then((exists) => {
        if (exists === true) {
          logger.log('debug', 'Controller::feriados::_getToken:exists')
          redis.get('Auth:Token:BarriosPopulares')
            .then((reply) => {
              logger.log('debug', 'Controller::feriados::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::feriados::_getToken::exists:reject')
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


function list(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
  }

  _getToken()
    .then((token) => {
      logger.log('debug', 'Controller::bPopulares::list')
      request
        .get(config.ws.feriadosList.url)
        .set('Authorization', `Bearer ${token}`)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.error('Controller::feriados::feriadosList::RequestError')
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::feriados::feriadosList::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


function list_tipos(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
  }

  _getToken()
    .then((token) => {
      logger.log('debug', 'Controller::bPopulares::localidades')
      request
        .get(config.ws.feriadosTiposList.url)
        .set('Authorization', `Bearer ${token}`)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.error('Controller::bPopulares::bPopularesLocalidades::RequestError')
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::bPopulares::bPopularesLocalidades::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}

export default {
  list,
  list_tipos,
}