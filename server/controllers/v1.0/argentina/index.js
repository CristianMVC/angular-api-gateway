import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import config                       from '../../../../config/env'
import Promise                      from 'bluebird'
import redis                        from '../../../helpers/Redis'
import APIError                     from '../../../helpers/APIError'
import APIResponse                  from '../../../helpers/APIStandarResponses'

// todo: Agregar los JSDOC
// todo: Utilizar APIError para generar los Errores
// todo: Modularizar el código
// todo: Los catch no estandarizan Errores. Puede Generar Error de Timeout
// todo: Hay funciones que reciben parámetros no utilizados como req y res.
// todo: Limpiar los loggers
// todo: Validar los parámetros al instanciar APIError. Puede Generar Error de Timeout.
// todo: No hay manjo de exepciones, en caso de error da Timeout
// todo: No es necesario parsear todo el objeto para agregar un campo nuevo.
// todo: Utilizar variables const y let correctamente


function _requestToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const url = config.ws.argentinaGobAr.login.url
    request
      .post(url)
      .type('form')
      .send(config.ws.argentinaGobAr.login.body)
      .then((result) => {
        logger.log('debug', 'requestToken')
        logger.log('debug', result.body)
        resolve(result.body)
      })
      .catch((e) => {
        logger.log('debug', e)
        reject(e)
      })
      .catch((e) => {
        logger.error('Controller::argentina::list::RequestError')
        next(APIError({
          status: e.status,
          message: e.error,
        }))
      })
  })
}

function _getToken() {
  logger.log('debug', 'Controller::argentina:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:argentina')
      .then((exists) => {
        if (exists === true) {
          logger.log('debug', 'Controller::argentina::_getToken:exists')
          redis.get('Auth:Token:argentina')
            .then((reply) => {
              logger.log('debug', 'Controller::argentina::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::argentina::_getToken::exists:reject')
              logger.error(err)
              reject(err)
            })
        } else {
          _requestToken()
            .then((result) => {
              redis.set('Auth:Token:argentina', `${result.token_type} ${result.access_token}`)
                .then((expire) => {
                  redis.expire('Auth:Token:argentina', result.expires_in)
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

function consultarServicio(req, res, next) {
  logger.log('debug', 'Controller::argentina::consultarServicio')
  _getToken()
    .then((token) => {
      logger.log('debug', 'Controller::argentina::consultarServicio::token')
      logger.log('debug', token)
      const url = `${config.ws.argentinaGobAr.servicio.url}/${req.params.id}`
      request
        .get(url)
        .set('Authorization', token)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.error('Controller::argentina::consultarServicio::RequestError')
          next(APIError({
            status: e.status,
            message: e.message,
          }))
        })
    })
    .catch((e) => {
      logger.error('Controller::argentina::consultarServicio::TokenError')
      next(APIError({
        status: e.status,
        message: e.message,
      }))
    })
}

function listViejos(req, res) {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::argentina::listViejos')
    const url = `${config.ws.argentinaGobAr.servicioViejo.url}/0`
    request
      .get(url)
      .then((result) => {
        const responseData = result.body.map((dato) => {
          return {
            id: dato.id,
            alias: dato.alias,
            title: dato.title,
            body: dato.body,
            is_service: false,
          }
        })
        resolve(responseData)
      })
      .catch((e) => {
        logger.error('Controller::argentina::listViejos::RequestError')
        reject(e)
      })
  })
}

function list(req, res) {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::argentina::list')
    _getToken()
      .then((token) => {
        logger.log('debug', 'Controller::argentina::list::token')
        const url = config.ws.argentinaGobAr.servicio.url
          const params = {
            fields: 'id,title,body,alias',
            limit: 0,
          }
        request
          .get(url)
          .set('Authorization', token)
          .query(params)
          .then((result) => {
            const responseData = result.body.results.map((dato) => {
              return {
                id: dato.id,
                alias: dato.alias,
                title: dato.title,
                body: dato.body.safe_value,
                is_service: true,
              }
            })
            resolve(responseData)
          }).catch((e) => {
            logger.error('Controller::argentina::list::RequestError')
            reject(e)
        })
      }).catch((e) => {
        logger.error('Controller::argentina::list::error')
        reject(e)
      })
    })
}

function listAll(req, res, next) {
  logger.log('debug', 'Controller::argentina::listAll')
  Promise.all([
    list(),
    listViejos(),
  ])
    .then((v) => {
      let a = []
      a = v[0].concat(v[1])
      res.json(APIResponse.list(0, 0, a))
    })
    .catch((e) => {
      logger.error('Controller::argentina::list::PromiseAll')
      next(APIError({
        status: 500,
        message: e.message,
      }))
    })
}

export default {
  consultarServicio,
  listAll,
}
