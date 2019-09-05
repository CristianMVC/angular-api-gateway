import express                  from 'express'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import beneficiosCtrl           from '../../../controllers/v1.0/beneficios/index'
import cache                    from './../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/:cuil').get(cache.route())

/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} /path title
 * @apiName apiName
 * @apiGroup group
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} cuil Numero de CUIL
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *    "descripcion": "Agente activo.",
 *    "estadoExistenciaLegajo": "Verde"
 * }
 */
router.route('/:cuil')
  .get(validate(paramValidation.webServices.beneficios.cuil), beneficiosCtrl.consultarCuil)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


router.route('/')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
