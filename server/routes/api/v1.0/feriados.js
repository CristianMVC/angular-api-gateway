import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import feriadosCtrl                 from '../../../controllers/v1.0/feriados'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * @api {GET} v1.0/feriados/list Feriados Listado
 * @apiName getFeriadosList
 * @apiGroup Feriados
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Proyecto Interfaces, actualmente dado de baja.
 *
 * @apiUse AuthHeaders
 *
 */
router.route('/list')
	.get(validate(paramValidation.webServices.feriados.listFeriados), feriadosCtrl.list)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/feriados/list/tipos Feriados Tipos
 * @apiName getFeriadosListTipos
 * @apiGroup Feriados
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Proyecto Interfaces, actualmente dado de baja.
 *
 * @apiUse AuthHeaders
 *
 */
router.route('/list/tipos')
	.get(validate(paramValidation.webServices.feriados.listFeriados), feriadosCtrl.list_tipos)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
