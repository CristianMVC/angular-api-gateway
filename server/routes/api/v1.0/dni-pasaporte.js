import express                  from 'express'
import dniPasaporteCtrl        	from '../../../controllers/v1.0/dni-pasaporte'
import cache                    from './../../../../config/cache'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import APIError                 from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/mininterior/dni/estado DNI Estado
 * @apiName getDNIestado
 * @apiGroup DNI Pasaporte
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Deprecada por el proveedor
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dni
 * @apiParam  {String} sexo
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "Error": false,
 *      "respuesta": "El DNI ya fue entregado"
 *  }
 */
router.route('/dni/estado')
	.get(validate(paramValidation.webServices.dniPassport.dni.estado), dniPasaporteCtrl.dniEstado)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/mininterior/dni/vencimiento DNI Vencimiento
 * @apiName getDNIvencimiento
 * @apiGroup DNI Pasaporte
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Deprecada por el proveedor
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dni
 * @apiParam  {String} sexo
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "Error": false,
 *      "respuesta": {
 *          "letra": "A",
 *          "vencimiento": "17/10/2026",
 *          "idtramite": "76637364"
 *      }
 *  }
 */
router.route('/dni/vencimiento')
	.get(validate(paramValidation.webServices.dniPassport.dni.vencimiento), dniPasaporteCtrl.dniVencimiento)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/mininterior/pasaporte/estado Pasaporte Estado
 * @apiName getPasaporteEstado
 * @apiGroup DNI Pasaporte
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Deprecada por el proveedor
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dni
 * @apiParam  {String} sexo
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "Error": false,
 *      "respuesta": "No se encontraron trámites"
 *  }
 */
router.route('/pasaporte/estado')
	.get(validate(paramValidation.webServices.dniPassport.passport.estado), dniPasaporteCtrl.pasaporteEstado)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
