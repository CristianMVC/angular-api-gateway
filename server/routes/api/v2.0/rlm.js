import express from 'express'
import cache from './../../../../config/cache'
import rlmCtrl from '../../../controllers/v2.0/rlm'
import APIError from '../../../helpers/APIError'
/* import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation' */


const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 * Routes RLM
 * BasePath: ~/v2.0/rlm
 ** ------------------------------------*/

const rlmCustomCache = (req, res, next) => {
  let rlmKeycache = 'rlm-' + req.params.codigo
  if (req.query.filtro) {
    rlmKeycache += Buffer.from(req.query.filtro).toString('base64')
  }
  if (req.query.pagina) {
    rlmKeycache += '-' + req.query.pagina
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
 * @api {GET} v2.0/rlm/{codigo} Obtener Registro Publico
 * @apiName listRegistroExternos
 * @apiGroup RLM
 * @apiVersion  2.0.0
 *
 */
router.route('/:codigo')
  .get(rlmCustomCache, rlmCustomCacheExp, rlmCtrl.listRegistroExternos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
