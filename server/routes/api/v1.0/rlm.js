import express from 'express'
import cache from './../../../../config/cache'
import rlmCtrl from '../../../controllers/v1.0/gde/rlm'
import APIError from '../../../helpers/APIError'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
//router.route('/*').get(cache.route())

/** -------------------------------------
 * Routes RLM
 * BasePath: ~/v1.0/rlm
 ** ------------------------------------*/

/**
 *  list-all-tipo-registro-publico
 */
/**
 * @api {GET} v1.0/rlm Listado de Registros Publicos
 * @apiName listAllTipoRegistroPublico
 * @apiGroup RLM
 * @apiVersion  1.0.0
 *
 *
 */
router.route('/')
  .get(cache.route(), validate(paramValidation.webServices.rlm.getList), rlmCtrl.listAllTipoRegistroPublico)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


const rlmCustomCache = (req, res, next) => {
  let rlmKeycache = 'rlm-' + req.params.codigo
  if (req.query.filtro) {
    rlmKeycache += Buffer.from(req.query.filtro).toString('base64')
  }
  res.express_redis_cache_name = rlmKeycache
  next()
}

const rlmCustomCacheExp = cache.route(
  {
    expire: {
      200: 3600,
      '4xx': 10,
      '5xx': 10,
      xxx: 1,
    },
  }
)

/**
 * list-registro-externos
 */
/**
 * @api {GET} v1.0/rlm/{codigo} Obtener Registro Publico
 * @apiName listRegistroExternos
 * @apiGroup RLM
 * @apiVersion  1.0.0
 *
 *
 */
router.route('/:codigo')
  .get(rlmCustomCache, rlmCustomCacheExp, validate(paramValidation.webServices.rlm.getElement), rlmCtrl.listRegistroExternos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
