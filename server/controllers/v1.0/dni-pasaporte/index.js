import request                      from './request'
import APIError                     from '../../../helpers/APIError'
import { assignIn, }                from 'lodash'
import dniUltimoEjemplar            from '../renaper/dniUltimoEjemplar'
import logger from '../../../../config/winston'

/**
 * Controlador DniEstado
 * @param req - Object Request
 * @param res - Object Response
 * @param next - next Middleware
 */
function dniEstado(req, res, next) {
  const params = {
    query: assignIn(req.query, { consulta: 'estadoDNI', }),
    method: 'GET',
  }

  request(params)
    .then((r) => res.json(r))
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      isPublic: (e.isPublic),
    })))
}


/**
 * Controlador dniVencimiento
 * @param req - Object Request
 * @param res - Object Response
 * @param next - next Middleware
 */
// function dniVencimiento(req, res, next) {
//   const params = {
//     query: assignIn(req.query, { consulta: 'vencimientoDNI', }),
//     method: 'GET',
//   }
//
//   request(params)
//     .then((r) => res.json(r))
//     .catch((e) => next(APIError({
//       status: (e.status),
//       message: (e.message),
//       devMessage: (e.devMessage),
//       isPublic: (e.isPublic),
//     })))
// }

function dniVencimiento(req, res, next) {
  logger.log('debug', 'Controller::Renaper:getDniUltimoEjemplar')
  // Params
  const params = {
    dni: req.query.dni,
    sexo: req.query.sexo,
  }

  // Request
  dniUltimoEjemplar(params)
    .then((v) => {
      const o = {
        Error: false,
        respuesta: {
          letra: v['ejemplar'],
          vencimiento: v['vencimiento'],
          idtramite: v['idTramitePrincipal'],
        },
      }
      res.json(o)
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      errorCode: (e.errorCode),
      moreInfo: (e.moreInfo),
    })))
}



/**
 * Controlador pasaporteEstado
 * @param req - Object Request
 * @param res - object Response
 * @param next - next Middleware
 */
function pasaporteEstado(req, res, next) {
  const params = {
    query: assignIn(req.query, { consulta: 'estadoPAS', }),
    method: 'GET',
  }

  request(params)
    .then((r) => res.json(r))
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      isPublic: (e.isPublic),
    })))
}


export default {
  dniEstado,
  dniVencimiento,
  pasaporteEstado,
}
