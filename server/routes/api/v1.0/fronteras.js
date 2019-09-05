import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import fronterasCtrl                from '../../../controllers/v1.0/fronteras'
import APIError                     from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/*').get(cache.route({
  expire: {
    200: 900, //15 minutos
    xxx: 1,
  },
}))

/**
 * Routes
 **/

/** List pasos fronterizos de Gendarmeria */
/**
 * @api {GET} v1.0/fronteras/gna Pasos fronterizos de GNA
 * @apiName apiFronterasGna
 * @apiGroup Fronteras
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *   "metadata": {
 *       "resultset": {
 *           "count": 68,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *   },
 *   "results": [
 *       {
 *           "id": 27,
 *           "nombre": "Agua Negra",
 *           "latitud": -30.2828,
 *           "longitud": -69.8261,
 *           "pais": {
 *               "id": 4,
 *               "nombre": "Chile"
 *           },
 *           "destino": null,
 *           "provincia": {
 *               "id": 10,
 *               "nombre": "San Juan"
 *           },
 *           "estado": {
 *               "estado": "Cerrado",
 *               "demoras": "Hs  Minutos",
 *               "tiempo_entrada": "00:00",
 *               "tiempo_salida": "00:00",
 *               "motivo_demora": "",
 *               "observaciones": "",
 *               "ultima_actualizacion": "2019-07-04T08:09:06",
 *               "motivo_cierre": "Cierre Por Horario De Atención. Paso Internacional Cerrado Temporada 2018/2019."
 *           },
 *           "origen": 0
 *       },
 *       {
 *           "id": 23,
 *           "nombre": "Aguas Blancas - Bermejo",
 *           "latitud": -22.7263,
 *           "longitud": -64.3695,
 *           "pais": {
 *               "id": 2,
 *               "nombre": "Bolivia"
 *           },
 *           "destino": null,
 *           "provincia": {
 *               "id": 2,
 *               "nombre": "Salta"
 *           },
 *           "estado": {
 *               "estado": "Abierto",
 *               "demoras": "",
 *               "tiempo_entrada": "00:00",
 *               "tiempo_salida": "00:00",
 *               "motivo_demora": "Tránsito Normal.",
 *               "observaciones": "Circulación Normal.",
 *               "ultima_actualizacion": "2019-07-04T07:05:45",
 *               "motivo_cierre": ""
 *           },
 *           "origen": 0
 *       }
 *   ]
 * }
 */
router.route('/gna')
  .get(fronterasCtrl.getListGNA)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** List Pasos fronterizos de */
/**
 * @api {GET} v1.0/fronteras/gna/:id Paso fronterizo GNA
 * @apiName apiFronterasGNAobject
 * @apiGroup Fronteras
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Number} id Id de Paso fronterizo de GNA
 *
 * @apiSuccess (200) {json} objectGNA Paso fronterizo de GNA
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *   "imagen": "http://www.gendarmeria.gob.ar/fotos/683aguanegra.jpg",
 *   "descripcion_general": "Las Flores (AR) - Huanta (CL)",
 *   "horario_atencion": "Cerrado por temporada a partir 13ABR18",
 *   "categorias_migratorias_habilitadas": "Todas Las Categorías.",
 *   "operatorias_aduaneras_habilitadas": "Régimen De Equipajes Y Cargas.",
 *   "seguridad": "Gendarmería Nacional Argentina. Escuadrón 25",
 *   "migraciones": "Dirección Nacional De Migraciones.",
 *   "aduana": "Dirección General De Aduanas.",
 *   "transporte": "Gendarmería Nacional Argentina (Por Convenio Stn - Gna)",
 *   "fito_zoosanitario": "Gendarmería Nacional Argentina (Por Convenio Senasa - Gna).",
 *   "dirección_nacional_sanidad_fronteras": "",
 *   "contacto": "2647 420473",
 *   "clima": {
 *       "sensacion": "Regular",
 *       "nubosidad": "Despejado",
 *       "temperatura": -10,
 *       "viento": "Muy Fuerte",
 *       "velocidad": "50 A 61 Km/H",
 *       "direccion": "Dirección Oeste",
 *       "visibilidad": "Regular",
 *       "distancia": "4000 A 10000 Mts"
 *   }
 * }
 */
router.route('/gna/:id')
  .get(validate(paramValidation.webServices.fronteras.id), fronterasCtrl.getDetalleGNA)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** List pasos fronterizos de Prefectura */
/**
 * @api {GET} v1.0/fronteras/pna Pasos fronterizos de PNA
 * @apiName apiFronterasPNA
 * @apiGroup Fronteras
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *   "metadata": {
 *       "resultset": {
 *           "count": 48,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *   },
 *   "results": [
 *       {
 *          "id": 88,
 *          "nombre": "Puerto Alba Posse – Porto Maua",
 *          "latitud": -27.571337,
 *          "longitud": -54.679184,
 *          "pais": {
 *              "id": 85,
 *              "nombre": "Brasil"
 *          },
 *          "destino": null,
 *          "provincia": {
 *              "id": 13,
 *              "nombre": "Misiones"
 *          },
 *          "estado": {
 *              "estado": "Abierto",
 *              "demoras": "",
 *              "motivo_demora": "",
 *              "motivo_cierre": "",
 *              "tiempo_entrada": "00:10",
 *              "tiempo_salida": "00:10",
 *              "observaciones": "",
 *              "ultima_actualizacion": "2019-07-04T14:00:53"
 *          },
 *          "origen": 1
 *      },
 *      {
 *          "id": 17,
 *          "nombre": "Puerto Alvear - Itaquí",
 *          "latitud": -29.113556,
 *          "longitud": -56.55521,
 *          "pais": {
 *              "id": 85,
 *              "nombre": "Brasil"
 *          },
 *          "destino": null,
 *          "provincia": {
 *              "id": 21,
 *              "nombre": "Corrientes"
 *          },
 *          "estado": {
 *              "estado": "Cerrado",
 *              "demoras": "",
 *              "motivo_demora": "",
 *              "motivo_cierre": "Fuera de Horario de Atención al Público",
 *              "tiempo_entrada": "00:10",
 *              "tiempo_salida": "00:10",
 *              "observaciones": "",
 *              "ultima_actualizacion": "2019-07-04T17:10:36"
 *          },
 *          "origen": 1
 *      },
 *   ]
 * }
 */
router.route('/pna')
  .get(fronterasCtrl.getListPNA)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** Detalle de un paso fronterizo de Prefectura */
/** List Pasos fronterizos */
/**
 * @api {GET} v1.0/fronteras/pna/:id Paso fronterizo PNA
 * @apiName apiFronterasPNAobject
 * @apiGroup Fronteras
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Number} id Id de Paso fronterizo de PNA
 *
 * @apiSuccess (200) {json} objectPNA Paso fronterizo de PNA
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *   "descripcion_general": "Alba Possse (AR) - Porto Maua (BR)",
 *   "horario_atencion": "LUNES A VIERNES DE 08:00 A 11:30 hs. Y 14:00 A 17:30 hs.\\\\\\\\n\\\\\\\\n SABADOS, DOMINGOS Y FERIADOS DE 08:30 A 11:30 hs. Y DE 14:30 A 17:30 hs.",
 *   "operatoria_paso": "Régimen de Tráfico Vecinal, Régimen General de Equipaje y Cargas",
 *   "medios": "Balsa  - Remolcador",
 *   "cruce_vehiculo": "Si",
 *   "cruce_pasajero": "Si",
 *   "contacto": "3755482090",
 *   "altura_rio": "0",
 *   "etapa_alerta": "8",
 *   "etapa_evacuacion": "12",
 *   "estado_rio": "S/E.",
 *   "fecha_registro": "2019-07-04T15:00:00.000Z"
 * }
 */
router.route('/pna/:id')
  .get(validate(paramValidation.webServices.fronteras.id), fronterasCtrl.getDetallePNA)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** Listado de pasos fronterizos */
/**
 * @api {GET} v1.0/fronteras Listado Pasos fronterizos
 * @apiName apiFronteras
 * @apiGroup Fronteras
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccess (200) {json} PasosFronterizos listado de los pasos fronterizos de GNA y PNA
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *   "metadata": {
 *       "resultset": {
 *           "count": 116,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *   },
 *   "results": [
 *       {
 *           "id": 27,
 *           "nombre": "Agua Negra",
 *           "latitud": -30.2828,
 *           "longitud": -69.8261,
 *           "pais": {
 *               "id": 4,
 *               "nombre": "Chile"
 *           },
 *           "destino": null,
 *           "provincia": {
 *               "id": 10,
 *               "nombre": "San Juan"
 *           },
 *           "estado": {
 *               "estado": "Cerrado",
 *               "demoras": "Hs  Minutos",
 *               "tiempo_entrada": "00:00",
 *               "tiempo_salida": "00:00",
 *               "motivo_demora": "",
 *               "observaciones": "",
 *               "ultima_actualizacion": "2019-07-04T08:09:06",
 *               "motivo_cierre": "Cierre Por Horario De Atención. Paso Internacional Cerrado Temporada 2018/2019."
 *           },
 *           "origen": 0
 *       },
 *       {
 *           "id": 23,
 *           "nombre": "Aguas Blancas - Bermejo",
 *           "latitud": -22.7263,
 *           "longitud": -64.3695,
 *           "pais": {
 *               "id": 2,
 *               "nombre": "Bolivia"
 *           },
 *           "destino": null,
 *           "provincia": {
 *               "id": 2,
 *               "nombre": "Salta"
 *           },
 *           "estado": {
 *               "estado": "Abierto",
 *               "demoras": "",
 *               "tiempo_entrada": "00:00",
 *               "tiempo_salida": "00:00",
 *               "motivo_demora": "Tránsito Normal.",
 *               "observaciones": "Circulación Normal.",
 *               "ultima_actualizacion": "2019-07-04T07:05:45",
 *               "motivo_cierre": ""
 *           },
 *           "origen": 0
 *       }
 *   ]
 * }
 */
router.route('/')
  .get(fronterasCtrl.getList)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
