import express                  from 'express'
import sintysCtrl        	      from '../../../controllers/v1.0/sintys'
import APIError                 from '../../../helpers/APIError'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import cache                    from '../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/
router.route('/*').get(cache.route())

/** Obtener el listado de los servicios */
/**
 * @api {GET} v1.0/sintys Listado
 * @apiName apiSintys
 * @apiGroup SINTYS
 * @apiVersion  1.0.0
 *
 * @apiDeprecated No funciona en QA ni PRD
 */
router.route('/')
  .get(sintysCtrl.index)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** Obtener el listado de los servicios */
router.route('/obtener-persona-fisica-ws-filtros')
  .get(validate(paramValidation.webServices.sintys.consultas), sintysCtrl.obtenerPersonaFisicaWSFiltros)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** Proxy para consultar todos los servicios */
router.route('/:method')
  .get(validate(paramValidation.webServices.sintys.consultas), sintysCtrl.getRequest)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
