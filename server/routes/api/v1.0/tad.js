import express from 'express'
// import cache from './../../../../config/cache'
import tadCtrl from '../../../controllers/v1.0/gde/tad'
import APIError from '../../../helpers/APIError'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
// router.route('/*').get(cache.route())

/** -------------------------------------
 * Routes TAD
 * BasePath: ~/v1.0/tad
 ** ------------------------------------*/


/**
 *
 * @api {GET} v1.0/tad/tareas-pendientes/:cuil              Lista de Tareas Pendientes
 * @apiName tad
 * @apiGroup TRAMITES A DISTANCIA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {Number}  cuil       Numero de cuil
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results
 * @apiSuccess (200) {String}     results.nombreTramite     Nombre del tramite
 * @apiSuccess (200) {String}     results.referencia        Referencia del tramite
 * @apiSuccess (200) {String}     results.estado            Estado del tramite
 * @apiSuccess (200) {String}     results.fechaCreacion     Fecha de creacion del tramite
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *         "count": 45,
 *         "offset": 0,
 *         "limit": 0
 *       }
 *     },
 *     "results": [
 *       {
 *         "nombreTramite": "Importación de especialidades medicinales",
 *         "referencia": "Solicitud de autorización para importación",
 *         "estado": "PENDIENTE",
 *         "fechaCreacion": "21/02/2018 18:31"
 *       },
 *       {
 *         "nombreTramite": "Constitución SAS 64",
 *         "referencia": "Instrumento Constitutivo",
 *         "estado": "PENDIENTE",
 *         "fechaCreacion": "02/02/2018 18:43"
 *       }
 *     ]
 *   }
 *
 *
 */


/**
 *
 * @api {GET} v1.0/tad/tareas-pendientes/count/:cuil       Cantidad de Tareas Pendientes
 * @apiName tadCount
 * @apiGroup TRAMITES A DISTANCIA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {Number}  cuil                                Numero de cuil
 *
 * @apiSuccess (200) {Number} count                        Cantidad de tareas pendientes
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "count": 45
 *   }
 *
 *
 */


/**
 *
 * @api {GET} v1.0/tad/notificacion/count-sin-leer/:cuil       Cantidad de Tareas Sin Leer
 * @apiName tadCountNotificacion
 * @apiGroup TRAMITES A DISTANCIA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {Number}  cuil                                    Numero de cuil
 *
 * @apiSuccess (200) {Number} count                            Cantidad de tareas sin leer
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "count": 157
 *   }
 *
 *
 */


/**
 *  list-all-tipo-registro-publico
 */

/** ~/notificacion/count-sin-leer/:cuil */
router.route('/notificacion/count-sin-leer/:cuil')
  .get(validate(paramValidation.webServices.tad.generic), tadCtrl.notificacionCountSinLeer)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/tareas-pendientes/count/:cuil */
router.route('/tareas-pendientes/count/:cuil')
  .get(validate(paramValidation.webServices.tad.generic), tadCtrl.tareasPendientesCount)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/tareas-pendientes/:cuil */
router.route('/tareas-pendientes/:cuil')
  .get(validate(paramValidation.webServices.tad.generic), tadCtrl.tareasPendientes)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



export default router
