import dniUltimoEjemplar from './dniUltimoEjemplar'
import APIError from '../../../helpers/APIError'
import logger from '../../../../config/winston'

/**
 * GetDniUltimoEjemplar
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 */
function getDniUltimoEjemplar(req, res, next) {
  logger.log('debug', 'Controller::Renaper:getDniUltimoEjemplar')
  // Params
  const params = {
    dni: req.query.dni,
    sexo: req.query.sexo,
  }

  // Request
  dniUltimoEjemplar(params)
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(APIError(e)))
}


export default {
  getDniUltimoEjemplar,
}
