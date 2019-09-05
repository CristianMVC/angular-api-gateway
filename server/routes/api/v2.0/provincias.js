import express                        from 'express'
import provinciasCtrl          from '../../../controllers/v2.0/provincias'
import APIError                       from '../../../helpers/APIError'
import cache from './../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap

/**
 *
 * @api {GET} v2.0/provincias      Obtener provincias
 * @apiName obtenerProvincias
 * @apiGroup Provincias
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccess (200) {Object[]}   listado  Listado de provincias
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *     [
 *        {
 *          "id": 1,
 *          "nombre": "Provincia",
 *        },
 *     ]
 *
 */

router.route('/')
  .get(cache.route(), provinciasCtrl.getProvinces)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



/**
 *
 * @api {GET} v2.0/provincias/:province_id/distritos      Obtener distritos por provincia
 * @apiName obtenerDistritosPorProvincia
 * @apiGroup Provincias
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 * @apiParam  {Number}            province_id                Id de la provincia
 *
 * @apiSuccess (200) {Object[]}   listado  Listado de distritos
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *     [
 *        {
 *          "id": 1,
 *          "nombre": "Distrito",
 *        },
 *     ]
 *
 */

router.route('/:province_id/distritos')
  .get(cache.route(), provinciasCtrl.getDistrictsByProvince)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



/**
 *
 * @api {GET} v2.0/provincias/:province_id/localidades      Obtener localidades por provincia
 * @apiName obtenerLocalidadesPorProvincia
 * @apiGroup Provincias
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 * @apiParam  {Number}            province_id                Id de la provincia
 *
 * @apiSuccess (200) {Object[]}   listado  Listado de localidades
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *     [
 *        {
 *          "id": 1,
 *          "nombre": "Localidad",
 *        },
 *     ]
 *
 */

router.route('/:province_id/localidades')
  .get(cache.route(), provinciasCtrl.getLocalitiesByProvince)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



/**
 *
 * @api {GET} v2.0/provincias/distritos/:district_id/localidades      Obtener localidades por disstrito
 * @apiName obtenerLocalidadesPorDistrito
 * @apiGroup Provincias
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 * @apiParam  {Number}            district_id                Id del distrito
 *
 * @apiSuccess (200) {Object[]}   listado  Listado de localidades
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *     [
 *        {
 *          "id": 1,
 *          "nombre": "Localidad",
 *        },
 *     ]
 *
 */

router.route('/distritos/:district_id/localidades')
  .get(cache.route(), provinciasCtrl.getLocalitiesByDistrict)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router