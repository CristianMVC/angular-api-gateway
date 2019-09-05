import methods from './methods'
import request from './request'
import { assign, isArray, kebabCase, snakeCase, } from 'lodash'
import config from '../../../../config/env'
import logger from '../../../../config/winston'
import APIResponse from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'


/**
 * Index Method
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function index(req, res, next) {
  logger.log('debug', 'Controller::Sintys::Index')
  const params = assign(config.ws.sintys.index.body, { operacion: 'login', })

  request(params)
    .then((r) => {
      try {
        const data = r.resultado.METODOS.map((v) => {
          v.metodo = kebabCase(v.metodo)
          v.parametrosEntrada = v.parametrosEntrada.map((j) => {
            return snakeCase(j)
          })
          return v
        })

        return res.json(APIResponse.list(0, 0, data))
      } catch (e) {
        return next(APIError({
          status: 500,
          message: e.message,
          devMessage: e.stack,
        }))
      }
    })
    .catch((e) => next(e))
}

/**
 * obtenerPersonaFisicaWSFiltros
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function obtenerPersonaFisicaWSFiltros(req, res, next) {
  const m = methods('obtener-persona-fisica-ws-filtros')

  const params = assign(config.ws.sintys.index.body, {
    operacion: m,
    parametros: {
      filtros: {
        0: {
          campo: 'NDOC',
          operador: '=',
          valor: (req.query.nro_documento),
        },
      },
    },
  })

  request(params)
    .then((r) => {
      const { resultado, } = r

      if (isArray(resultado))
        return res.json(APIResponse.list(0, 0, resultado))
      else
        return res.json(resultado)
    })
    .catch((e) => next(e))
}


/**
 * Index Method
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function getRequest(req, res, next) {
  const m = methods(req.params.method)

  const params = assign(config.ws.sintys.index.body, {
    operacion: m,
    parametros: {
      CUIL: (req.query.cuil),
    },
  })

  request(params)
    .then((r) => {
      const { resultado, } = r

      if (isArray(resultado))
        return res.json(APIResponse.list(0, 0, resultado))
      else
        return res.json(resultado)
    })
    .catch((e) => next(e))
}


export default {
  index,
  obtenerPersonaFisicaWSFiltros,
  getRequest,
}
