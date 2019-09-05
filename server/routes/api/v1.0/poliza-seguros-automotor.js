import express from 'express'
import cache from './../../../../config/cache'
import polizaSegurosAutomotorCtrl from '../../../controllers/v1.0/gde/poliza-seguros-automotor'
import APIError from '../../../helpers/APIError'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
router.route('/*').get(cache.route())

/** -------------------------------------
 * Routes Poliza Seguros Automotor
 * BasePath: ~/v1.0/poliza-seguros-automotor
 ** ------------------------------------*/


/**
 * list-registro-externos
 */
/**
 * @api {GET} v1.0/poliza-seguros-automotor/{id} List Poliza Por Documento
 * @apiName getpolizaSegurosAutomotor
 * @apiGroup Poliza Seguros Automotor
 * @apiVersion  1.0.0
 *
 * @apiDeprecated No Funciona QA ni PRD
 *
 * @apiUse AuthHeaders
 */
router.route('/:id')
  .get(validate(paramValidation.webServices.generic.getElement), polizaSegurosAutomotorCtrl.listPolizaPorDocumento)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * list-registro-externos
 */
router.route('/')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
