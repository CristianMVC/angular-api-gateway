import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import argentinaCtrl                 from '../../../controllers/v1.0/argentina'
import APIError                     from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/servicios').get(cache.route())
router.route('/servicios/:id').get(cache.route())

/**
 * Routes
 **/
/**
 * @api {GET} v1.0/argentina/servicios/:id Obtener Servicio
 * @apiName apiArgentinaServicio
 * @apiGroup Argentina
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {string} id
 * @apiSuccess (200) {string} alias
 * @apiSuccess (200) {string} title
 * @apiSuccess (200) {string} body
 * @apiSuccess (200) {is_service} is_service
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": "35341",
 *    "alias": "/transferencia-o-cambio-de-rubro-del-registro-de-un-modelo-o-diseno-industrial",
 *    "title": "Transferencia o Cambio de rubro del Registro de un Modelo o Diseño Industrial",
 *    "body": "<p>Transferir o cambiar el rubro del Registro de un Modelo o un Diseño Industrial.</p>\n",
 *    "is_service": true
 *  }
 */
router.route('/servicios/:id')
  .get(validate(paramValidation.webServices.argentina.servicio), argentinaCtrl.consultarServicio)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/argentina/servicios Listado de Servicios
 * @apiName apiArgentinaServicios
 * @apiGroup Argentina
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos incluidos en el objeto Servicio. Por defecto: Id, alias, title, body, is_service
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "metadata": {
 *        "resultset": {
 *            "count": 2050,
 *            "offset": 0,
 *            "limit": 0
 *        }
 *    },
 *    "results": [
 *        {
 *            "id": "35341",
 *            "alias": "/transferencia-o-cambio-de-rubro-del-registro-de-un-modelo-o-diseno-industrial",
 *            "title": "Transferencia o Cambio de rubro del Registro de un Modelo o Diseño Industrial",
 *            "body": "<p>Transferir o cambiar el rubro del Registro de un Modelo o un Diseño Industrial.</p>\n",
 *            "is_service": true
 *        }
 *    ]
 *  }
 */
router.route('/servicios')
  .get(validate(paramValidation.webServices.argentina.list), argentinaCtrl.listAll)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
