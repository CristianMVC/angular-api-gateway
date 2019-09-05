import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import geoRefCtrl                   from '../../../controllers/v1.0/georef'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/*').get(cache.route())

/**
 * Routes
 **/

/** ~/georef/provincias  */
/**
 * @api {GET} v1.0/georef/provincias Provincias
 * @apiName getGeoRefprovincias
 * @apiGroup GEO Ref
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} nombre
 * @apiParam  {String} limit
 * @apiParam  {String} orden
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "metadata": {
 *         "resultset": {
 *             "count": 24,
 *             "offset": 0,
 *             "limit": 0
 *         }
 *     },
 *     "results": [
 *         {
 *             "centroide": {
 *                 "lat": -26.8753965086829,
 *                 "lon": -54.6516966230371
 *             },
 *             "id": "54",
 *             "nombre": "Misiones"
 *         },
 *     ],
 * }
 */
router.route('/provincias')
  .get(validate(paramValidation.webServices.georef.provincias), geoRefCtrl.provincias)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/georef/departamentos  */
/**
 * @api {GET} v1.0/georef/provincias Departamentos
 * @apiName getGeodepartamentos
 * @apiGroup GEO Ref
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} nombre
 * @apiParam  {String} provincia
 * @apiParam  {String} limit
 * @apiParam  {String} orden
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 10,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "centroide": {
 *                  "lat": -27.2575511794731,
 *                  "lon": -60.6806781684245
 *              },
 *              "id": "22112",
 *              "nombre": "O'Higgins",
 *              "provincia": {
 *                  "id": "22",
 *                  "nombre": "Chaco"
 *              }
 *          },
 *      ],
 *  }
 */
router.route('/departamentos')
  .get(validate(paramValidation.webServices.georef.departamentos), geoRefCtrl.departamentos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/georef/localidades  */
/**
 * @api {GET} v1.0/georef/localidades Localidades
 * @apiName getGeoReflocalidades
 * @apiGroup GEO Ref
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} nombre
 * @apiParam  {String} provincia
 * @apiParam  {String} departamento
 * @apiParam  {String} limit
 * @apiParam  {String} orden
 * @apiParam  {String} id
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 10,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "categoria": "Localidad simple",
 *              "centroide": {
 *                  "lat": -33.4394729739475,
 *                  "lon": -64.8316610855999
 *              },
 *              "departamento": {
 *                  "id": "14098",
 *                  "nombre": "Río Cuarto"
 *              },
 *              "id": "14098270000",
 *              "localidad_censal": {
 *                  "id": "14098270",
 *                  "nombre": "Suco"
 *              },
 *              "municipio": {
 *                  "id": "142588",
 *                  "nombre": "Suco"
 *              },
 *              "nombre": "SUCO",
 *              "provincia": {
 *                  "id": "14",
 *                  "nombre": "Córdoba"
 *              }
 *          },
 *      ]
 *  }
 */
router.route('/localidades')
  .get(validate(paramValidation.webServices.georef.localidades), geoRefCtrl.localidades)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
