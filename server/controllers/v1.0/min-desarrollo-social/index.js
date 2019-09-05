import config from '../../../../config/env'
import logger from '../../../../config/winston'
import request from './request'
import { parserPersona, } from './parser-persona'
import APIResponse from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'
import { isEmpty, findIndex, } from 'lodash'
import moment from 'moment'

/**
 * Persons -> Temp
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function getListPersons(req, res, next) {
  logger.log('debug', 'Controllers::minDesarrolloSocial::getListPersons')
  const url = config.ws.minDesarrolloSocial.persons.url
  const query = req.query

  request({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * Persons By CUIL
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function getElementPersons(req, res, next) {
  logger.log('debug', 'Controllers::minDesarrolloSocial::getElementPersons')
  const url = `${config.ws.minDesarrolloSocial.personsByCuil.url}/${req.params.cuil}`
  const query = req.query

  request({ url, query, })
    .then((v) => {
      if (v.data.results.length !== 1)
        return next(APIError({
          message: 'La estructura de datos externa es invalida. Existe más de un valor.',
        }))
      else
        try {
          if (isEmpty(v.data.results[0].programas[0]))
            return next(APIError({
              status: 404,
              message: 'La persona existe en la Base de Datos, pero no tiene programas asignados',
            }))

          const data = parserPersona(v.data.results[0])

          // Filtro para extraer el ultimo pograma
          if (req.query.ultimo_programa) {
            const values = data.programas
            let max = moment(values[0].periodoAlta, 'YYYY-MM-DD')
            let max_pos = 0
            const len = values.length
            for (let i = 0; i < len; i++) {
              const a = moment(values[i].periodoAlta, 'YYYY-MM-DD')
              if (max.diff(a) <= 0) {
                max = moment(values[i].periodoAlta, 'YYYY-MM-DD')
                max_pos = i
              }
            }
            data.programas = data.programas[max_pos]
          }

          return res.json(data)
        } catch (e) {
          return next(e)
        }
    })
    .catch((e) => next(e))
}


/**
 * getListPrograms
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function getListPrograms(req, res, next) {
  logger.log('debug', 'Controllers::minDesarrolloSocial::getListPrograms')
  const url = `${config.ws.minDesarrolloSocial.personsByCuil.url}/${req.params.cuil}`
  const query = req.query

  request({ url, query, })
    .then((v) => {
      if (v.data.results.length !== 1)
        return next(APIError({
          message: 'La estructura de datos externa es invalida. Existe más de un valor.',
        }))
      else
        try {
          if (isEmpty(v.data.results[0].programas[0]))
            return next(APIError({
              status: 404,
              message: 'La persona existe en la Base de Datos, pero no tiene programas asignados',
            }))

          const data = parserPersona(v.data.results[0])
          return res.json(APIResponse.list(0, 0, data.programas))
        } catch (e) {
          return next(e)
        }
    })
    .catch((e) => next(e))
}


/**
 * getElementProgram
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function getElementProgram(req, res, next) {
  logger.log('debug', 'Controllers::minDesarrolloSocial::getListPrograms')
  const url = `${config.ws.minDesarrolloSocial.personsByCuil.url}/${req.params.cuil}`
  const query = req.query

  request({ url, query, })
    .then((v) => {
      if (v.data.results.length !== 1)
        return next(APIError({
          message: 'La estructura de datos externa es invalida. Existe más de un valor.',
        }))
      else
        try {
          if (isEmpty(v.data.results[0].programas[0]))
            return next(APIError({
              status: 404,
              message: 'La persona existe en la Base de Datos, pero no tiene programas asignados',
            }))

          const data = parserPersona(v.data.results[0])
          const p = data.programas

          const i = findIndex(p, (o) => o.id === req.params.idPrograma)

          if (i === -1)
            return next(APIError({ status: 404, }))

          return res.json(p[i])
        } catch (e) {
          return next(e)
        }
    })
    .catch((e) => next(e))
}


/**
 * getListPagos
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function getListPagos(req, res, next) {
  logger.log('debug', 'Controllers::minDesarrolloSocial::getListPrograms')
  const url = `${config.ws.minDesarrolloSocial.personsByCuil.url}/${req.params.cuil}`
  const query = req.query

  request({ url, query, })
    .then((v) => {
      if (v.data.results.length !== 1)
        return next(APIError({
          message: 'La estructura de datos externa es invalida. Existe más de un valor.',
        }))
      else
        try {
          if (isEmpty(v.data.results[0].programas[0]))
            return next(APIError({
              status: 404,
              message: 'La persona existe en la Base de Datos, pero no tiene programas asignados',
            }))

          const data = parserPersona(v.data.results[0])
          const p = data.programas

          const i = findIndex(p, (o) => o.id === req.params.idPrograma)

          if (i === -1)
            return next(APIError({ status: 404, }))

          return res.json(APIResponse.list(0, 0, p[i].pagos))
        } catch (e) {
          return next(e)
        }
    })
    .catch((e) => next(e))
}


export default {
  getListPersons,
  getElementPersons,
  getListPrograms,
  getElementProgram,
  getListPagos,
}