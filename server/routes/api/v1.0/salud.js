import express                      from 'express'
import saludCtrl                    from '../../../controllers/v1.0/salud'
import mapaCentroCtrl               from '../../../controllers/v1.0/salud/mapaDeCentro'
import APIError                     from '../../../helpers/APIError'
import cache                        from './../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Cache
 **/
// router.route('/*').get(cache.route())


/**
 *
 * @api {GET} v1.0/interfaces-api/salud/mapa                          Mapa de Centro de Salud
 * @apiName mapaCentroDeSalud
 * @apiGroup SALUD
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} [provincia]                                    Filtro para obtener datos por provincias
 * @apiParam  {String} [localidad]                                    Filtro para obtener datos de las localidades por provincia
 * @apiParam  {String} [limit]                                        Filtro para paginación
 * @apiParam  {String} [offset]                                       Filtro para paginación
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                             Resultado
 * @apiSuccess (200) {String}     results.tipologia_descripcion       Descripción de la tipología
 * @apiSuccess (200) {Boolean}    results.vih
 * @apiSuccess (200) {String}     results.cp
 * @apiSuccess (200) {Number}     results.id
 * @apiSuccess (200) {String}     results.domicilio                   Nombre del domicilio
 * @apiSuccess (200) {String}     results.web
 * @apiSuccess (200) {String}     results.provincia                   Nombre de la provincia
 * @apiSuccess (200) {Number}     results.lon                         Longitud
 * @apiSuccess (200) {String}     results.tipologia
 * @apiSuccess (200) {String}     results.nombre
 * @apiSuccess (200) {String}     results.telefono
 * @apiSuccess (200) {String}     results.email
 * @apiSuccess (200) {String}     results.financiamiento
 * @apiSuccess (200) {String}     results.departamento
 * @apiSuccess (200) {Number}     results.lat                         Latitud
 * @apiSuccess (200) {String}     results.tipologia_categoria         Categoría de tipología
 * @apiSuccess (200) {Boolean}    results.sangre
 * @apiSuccess (200) {String}     results.dependencia
 * @apiSuccess (200) {Number}     results.zoom
 * @apiSuccess (200) {String}     results.tipo_telefono
 * @apiSuccess (200) {String}     results.localidad
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *   {
 *     "metadata": {
 *       "resultset": {
 *         "count": 2,
 *         "offset": 1,
 *         "limit": 2
 *       }
 *     },
 *     "results": [
 *       {
 *         "tipologia_descripcion": "Establecimiento de salud sin internación de diagnóstico y tratamiento",
 *         "vih": false,
 *         "cp": "3240",
 *         "id": 50260212329179,
 *         "domicilio": "Avenida Rivadavia 633",
 *         "web": null,
 *         "provincia": "Chubut",
 *         "lon": -67.48355500000002,
 *         "tipologia": "ESSIDT",
 *         "nombre": "Kin Sport",
 *         "telefono": "0297-4475310",
 *         "email": "kin_sportcomodoro@hotmail.com",
 *         "financiamiento": "Privado",
 *         "departamento": "Escalante",
 *         "lat": -45.8621272,
 *         "tipologia_categoria": "Con atención médica diaria y con especialidades y/o otras profesiones",
 *         "sangre": false,
 *         "dependencia": "Privado",
 *         "zoom": 14,
 *         "tipo_telefono": "Recepción",
 *         "localidad": "Comodoro Rivadavia"
 *       },
 *       {
 *         "tipologia_descripcion": "Establecimiento de salud sin internación de diagnóstico y tratamiento",
 *         "vih": false,
 *         "cp": "9000",
 *         "id": 50260212329186,
 *         "domicilio": "Ameghino 1311",
 *         "web": null,
 *         "provincia": "Chubut",
 *         "lon": -67.49461984625668,
 *         "tipologia": "ESSIDT",
 *         "nombre": "Odontologia Del Plata",
 *         "telefono": "0297-4064477",
 *         "email": "drsiciliano@live.com",
 *         "financiamiento": "Privado",
 *         "departamento": "Escalante",
 *         "lat": -45.863383491641954,
 *         "tipologia_categoria": "Con atención médica diaria y con especialidades y/o otras profesiones",
 *         "sangre": false,
 *         "dependencia": "Privado",
 *         "zoom": 14,
 *         "tipo_telefono": "Recepción",
 *         "localidad": "Comodoro Rivadavia  (Comodoro Rivadavia)"
 *       }
 *     ]
 *   }
 *
 *
 * @apiSuccess (400) {Number} status                                  Tipo de Error
 * @apiSuccess (400) {String} userMessage                             Mensaje de Error
 * @apiSuccess (400) {String} stack                                   Mensaje del stack
 *
 * @apiErrorExample {json} Respuesta de Error:
 *
 *   {
 *     "status": 400,
 *     "userMessage": "Error: se envío localidad, el campo provincia es requerido.",
 *     "stack": "url del stack"
 *   }
 *
 */


/**
 * Routes
 **/
router.route('/mapa')
  .get(mapaCentroCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/Salud Proxy */
router.route('/*')
  .get(saludCtrl.index)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
