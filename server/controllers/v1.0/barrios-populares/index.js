import request                      from 'superagent'
import APIResponse                  from '../../../helpers/APIStandarResponses'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import TlsReject                    from '../../../helpers/TlsReject'
import moment                       from 'moment'
import redis                        from '../../../helpers/Redis'
import Promise                      from 'bluebird'
import APIError                     from '../../../helpers/APIError'

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

function _getToken() {
  logger.log('debug', 'Controller::bpopulares:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:BarriosPopulares')
      .then((exists) => {
        if (exists === true) {
          logger.log('debug', 'Controller::bpopulares::_getToken:exists')
          redis.get('Auth:Token:BarriosPopulares')
            .then((reply) => {
              logger.log('debug', 'Controller::bpopulares::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::bpopulares::_getToken::exists:reject')
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

function consultarPadron(req, res, next) {
  logger.log('debug', 'Controller::bPopulares::consultarPadron')
  TlsReject.set()
  const params = {
    dni: req.query.dni,
    fecha_nacimiento: req.query.fecha_nacimiento,
  }

  //cambio formato de fecha de YYYY/MM/DD a DD/MM/YYYY
  params.fecha_nacimiento = moment(params.fecha_nacimiento).format('DD-MM-YYYY')
  request
    .post(config.ws.bPopulares.url)
    .type('form')
    .send(params)
    .then((result) => {
      const _r = JSON.parse(result.text)
      const _result = {}
      const fecha = (_r.fecha_de_nacimiento)

      _result.dni = (_r.dni)
      _result.apellido_nombre = (_r.apellido_nombre)

      if (fecha) {
        _result.fecha_de_nacimiento = (moment(_r.fecha_de_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      }

      _result.situacion = _r.situacion
      _result.mensaje = _r.mensaje

      res.json(_result)
    })
    .catch((e) => {
      logger.log('Controller::bPopulares::consultarPadron::RequestError')
      next(APIError({
        status: e.status,
        message: e.error,
      }))
    })
}

//bPopularesList
function list(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
  }
  _getToken()
    .then((token) => {
      logger.log('debug', 'Controller::bPopulares::list')
      request
        .get(config.ws.bPopularesList.url)
        .set('Authorization', `Bearer ${token}`)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.error('Controller::bPopulares::bPopularesList::RequestError')
          logger.error(e.message)
          res.status(500).json(APIResponse.error(500))
        })
    })
    .catch((e) => {
      logger.error('Controller::bPopulares::bPopularesList::TokenError')
      next(APIError({
        status: e.status,
        message: e.message,
      }))
    })
}

//bPopularesLocalidades
function list_localidades(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
  }

  _getToken()
    .then((token) => {
      logger.log('debug', 'Controller::bPopulares::localidades')
      request
        .get(config.ws.bPopularesLocalidades.url)
        .set('Authorization', `Bearer ${token}`)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.error('Controller::bPopulares::bPopularesLocalidades::RequestError')
          logger.error(e)
          res.status(500).json(APIResponse.error(500))
        })
    })
    .catch((e) => {
      logger.error('Controller::bPopulares::bPopularesLocalidades::TokenError')
      next(APIError({
        status: e.status,
        message: e.message,
      }))
    })
}

export default {
  consultarPadron,
  list,
  list_localidades,
}