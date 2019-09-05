import Promise from 'bluebird'
import request from './request'
import logger from '../../../../../config/winston'
import config from '../../../../../config/env'
import auth from './auth'
import authUser from './auth-user'
import APIResponses from '../../../../helpers/APIStandarResponses'


/**
 * notificacionCountSinLeer
 * @param {any} req - Request
 * @param {any} res - Response
 * @param {any} next - Next
 */
function notificacionCountSinLeer(req, res, next) {
  logger.log('debug', 'Controller::TAD::notificacionCountSinLeer')
  const {
    query = null, body = null,
  } = req
  const {
    cuil,
  } = req.params

  Promise.all([
      auth(),
      authUser(cuil),
    ])
    .then((v) => {
      // Set Options
      const options = {
        url: config.ws.gde.tad.url,
        path: `/notificacion/count-sin-leer/${cuil}`,
        tokens: {
          tokenKong: v[0].token,
          tokenTAD: v[1].token,
        },
        query: null,
        body: null,
      }

      if (query)
        options.query = query

      if (body)
        options.body = body

      request
        .get(options)
        .then((v) => res.json({
          count: v.respuesta,
        }))
        .catch((e) => next(e))
    })
    .catch((e) => next(e))
}


/**
 * tareasPendientesCount
 * @param {any} req - Request
 * @param {any} res - Response
 * @param {any} next - Next
 */
function tareasPendientesCount(req, res, next) {
  logger.log('debug', 'Controller::TAD::tareasPendientesCount')
  const {
    query = null, body = null,
  } = req
  const {
    cuil,
  } = req.params

  Promise.all([
      auth(),
      authUser(cuil),
    ])
    .then((v) => {
      // Set Options
      const options = {
        url: config.ws.gde.tad.url,
        path: `/tareas-pendientes/count/${cuil}`,
        tokens: {
          tokenKong: v[0].token,
          tokenTAD: v[1].token,
        },
        query: null,
        body: null,
      }

      if (query)
        options.query = query

      if (body)
        options.body = body

      request
        .get(options)
        .then((v) => res.json({
            count: v.respuesta,
        }))
        .catch((e) => next(e))
    })
    .catch((e) => next(e))
}


/**
 * tareasPendientes
 * @param {any} req - Request
 * @param {any} res - Response
 * @param {any} next - Next
 */
function tareasPendientes(req, res, next) {
  logger.log('debug', 'Controller::TAD::tareasPendientes')
  const {
    query = null, body = null,
  } = req
  const {
    cuil,
  } = req.params

  Promise.all([
      auth(),
      authUser(cuil),
    ])
    .then((v) => {
      // Set Options
      const options = {
        url: config.ws.gde.tad.url,
        path: `/tareas-pendientes/${cuil}`,
        tokens: {
          tokenKong: v[0].token,
          tokenTAD: v[1].token,
        },
        query: null,
        body: null,
      }

      if (query)
        options.query = query

      if (body)
        options.body = body

      request
        .get(options)
        .then((v) => {
          const l = v.respuesta
          return res.json(APIResponses.list(query.offset, query.limit, l))
        })
        .catch((e) => next(e))
    })
    .catch((e) => next(e))
}


export default {
  notificacionCountSinLeer,
  tareasPendientesCount,
  tareasPendientes,
}
