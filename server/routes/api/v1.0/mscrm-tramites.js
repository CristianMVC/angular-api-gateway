import express                            from 'express'
import validate                           from 'express-validation'
import paramValidation                    from '../../../../config/param-validation'
import cache                              from './../../../../config/cache'
import msCrmTramitesCtrl                  from '../../../controllers/v1.0/mscrm-tramites'

const router = express.Router()	// eslint-disable-line new-cap

/** ----------------------------------------------
 * Cache
 ** ------------------------------------------- */
router.route('/*').get(cache.route())

/** ----------------------------------------------
 * Routes
 ** ------------------------------------------- */
/**
 * @api {GET} v1.0/mscrm-tramites/categoria-servicios Categoria Servicios
 * @apiName getCategoriaServicios
 * @apiGroup MSCRM Tramites
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Proyecto Interfaces, actualmente dado de baja.
 *
 * @apiUse AuthHeaders
 *
 */
router.route('/categoria-servicios')
  .get(validate(paramValidation.webServices.msCrmTramites.servicios), msCrmTramitesCtrl.categoriaServicios)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/mscrm-tramites/organismos Organismos
 * @apiName getOrganismos
 * @apiGroup MSCRM Tramites
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Proyecto Interfaces, actualmente dado de baja.
 *
 * @apiUse AuthHeaders
 *
 */
router.route('/organismos')
  .get(validate(paramValidation.webServices.msCrmTramites.organismos), msCrmTramitesCtrl.organismos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
