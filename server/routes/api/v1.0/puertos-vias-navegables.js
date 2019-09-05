import express from 'express'
import cache from './../../../../config/cache'
import APIError from '../../../helpers/APIError'
import cabotajesController from '../../../controllers/v1.0/puertos-vias-navegables/cabotajes'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
router.route('/*').get(cache.route())

/** -------------------------------------
 * Routes Poliza Seguros Automotor
 * BasePath: ~/v1.0/puertos-vias-navegables
 ** ------------------------------------*/


/**
 * listado de excepciones de cabotaje
 */
/**
 * @api {GET} v1.0/puertos-vias-navegables/cabotajes/excepciones Cabotajes Excepciones
 * @apiName getListadoCabotajes
 * @apiGroup Puertos Vias Navegables
 * @apiVersion  1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *     "metadata": {
 *         "resultset": {
 *             "count": 21,
 *             "offset": 0,
 *             "limit": 0
 *         }
 *     },
 *     "results": [
 *         {
 *             "nro_expediente": "EX-2019-17302559-   -APN-DNPNYP#MTR",
 *             "fecha_y_hora_publicacion": "2019-03-21 15:19:33",
 *             "tipo_equipo": "Buque",
 *             "fecha_inicio_operacion": "2019-04-05 00:00:00",
 *             "fecha_fin_operacion": "2019-05-04 00:00:00",
 *             "caracteristicas": "a)\tDoble casco.\nb)\tLastre totalmente segregado.\nc)\tDimensiones y maniobras apropiadas para operar en las terminales propuestas.\n\n",
 *             "lugar_operacion": "Puerto La Plata, Campana, San Lorenzo, Dock Sud, San Nicolas y Rosario",
 *             "estado": "Activo"
 *         },
 *     ]
 *  }
 */
router.route('/cabotajes/excepciones')
  .get(cabotajesController.getListadoCabotajes)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



export default router
