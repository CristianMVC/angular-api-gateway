import express                      from 'express'
import cache                        from './../../../../config/cache'
import mercadosCtrl                 from '../../../controllers/v1.0/mercados'
import APIError                     from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
router.route('/').get(cache.route())

/**
 *
 * @api {GET} v1.0/mercados                                 Lista de Mercados
 * @apiName mercados
 * @apiGroup MERCADOS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results
 * @apiSuccess (200) {Number}     results.id
 * @apiSuccess (200) {String}     results.provincia         Provincia del mercado
 * @apiSuccess (200) {String}     results.barrio            Barrio del mercado
 * @apiSuccess (200) {String}     results.dia
 * @apiSuccess (200) {String}     results.fecha
 * @apiSuccess (200) {String}     results.horario           Horario del mercado
 * @apiSuccess (200) {String}     results.lugar
 * @apiSuccess (200) {String}     results.localidad
 * @apiSuccess (200) {Number}     results.latitud
 * @apiSuccess (200) {Number}     results.longitud
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *         "count": 2,
 *         "offset": 0,
 *         "limit": 0
 *       }
 *     },
 *     "results": [
 *       {
 *         "id": 1001,
 *         "provincia": "Buenos Aires",
 *         "barrio": "",
 *         "dia": "Lunes",
 *         "fecha": "2019-04-01T03:00:00.000Z",
 *         "horario": "9 a 14 hs.",
 *         "lugar": "Claypole - Parque Estación Claypole - Alcorta y Remedios de Escalada de San Martin",
 *         "localidad": "Almirante Brown",
 *         "latitud": -34.801712,
 *         "longitud": -58.337175
 *       },
 *       {
 *         "id": 1021,
 *         "provincia": "Buenos Aires",
 *         "barrio": "",
 *         "dia": "Lunes",
 *         "fecha": "2019-04-01T03:00:00.000Z",
 *         "horario": "9 a 13 hs.",
 *         "lugar": "Plaza Almafuerte - Calle 7 y 158",
 *         "localidad": "Berisso",
 *         "latitud": -34.875273,
 *         "longitud": -57.89341
 *       }
 *     ]
 *   }
 *
 *
 */


/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/')
  .get(mercadosCtrl.list)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
