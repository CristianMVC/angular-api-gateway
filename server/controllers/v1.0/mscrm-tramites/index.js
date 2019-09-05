import APIError                             from '../../../helpers/APIError'
import _categoriaServicios                  from './categoria-servicios'
import _organismos                          from './organismos'


/**
 * categoriaServicios
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function categoriaServicios(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
    fields: req.query.fields,
    cod_organismo: req.query.cod_organismo,
  }

  _categoriaServicios(params)
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError({
        status: e.status,
        devMessage: e.devMessage,
        isPublic: e.isPublic,
      }))
    })
}


/**
 * organismos
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function organismos(req, res, next) {
  const params = {
    limit: req.query.limit,
    offset: req.query.offset,
    fields: req.query.fields,
    cod_organismo: req.query.cod_organismo,
  }

  _organismos(params)
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError({
        status: e.status,
        devMessage: e.devMessage,
        isPublic: e.isPublic,
      }))
    })
}


export default {
  categoriaServicios,
  organismos,
}