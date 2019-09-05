import express from 'express'
import cache from './../../../../config/cache'
import compreSocialCtrl from '../../../controllers/v1.0/compre-social'

const router = express.Router() // eslint-disable-line new-cap

/**
 * Cache
 **/
router.route('/*').get((req, res, next) => {
  try {
    const regex = new RegExp('\/archivos\/', 'i'),
        path  = req.path

    if (regex.exec(path))
        res.use_express_redis_cache = false

    if (path == '/productos') // Se pidió excluir productos del cache
        res.use_express_redis_cache = false

    next()
  } catch (e) {
    next(APIError({ status: 500, devMessage: e.message, }))
  }
}, cache.route())


/**
 * Routes
 **/
/**
 * @api {GET} v1.0/compre-social/archivos/:archivo_id Descargar Archivo
 * @apiName apiCompreSocialArchivos
 * @apiGroup CompreSocial
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} archivo_id File ID
 *
 * @apiSuccess (200) {binary} file Archivo Binario
 */
router.route('/archivos/:archivo_id')
  .get(compreSocialCtrl.resources)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/compre-social/* Proxy
 * @apiName apiCompreSocialProxy
 * @apiGroup CompreSocial
 * @apiVersion  1.0.0
 *
 * @apiDescription Este EndPoint se encuentra proxy-ficado. Por favor remitirse a la documentacion
 * del servicio de origen.<br>
 * Para acceder a los EndPoint's, reemplazar el * con el path relativo a partir del numero de version.<br>
 * Ejemplo:<br>
 *  URL EndPoint Externo: http://interfaz.argentina.gob.ar/api/v1/productos<br>
 *  URL EndPoint Proxy: https://api.argentina.gob.ar/api/v1.0/compre-social/productos<br>
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~/productos
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "data": [{}],
 *    "links": {
 *        "first": "http://interfaz.argentina.gob.ar/api/v1/productos?page=1",
 *        "last": "http://interfaz.argentina.gob.ar/api/v1/productos?page=30",
 *        "prev": null,
 *        "next": "http://interfaz.argentina.gob.ar/api/v1/productos?page=2"
 *    },
 *    "meta": {
 *        "current_page": 1,
 *        "from": 1,
 *        "last_page": 30,
 *        "path": "http://interfaz.argentina.gob.ar/api/v1/productos",
 *        "per_page": 15,
 *        "to": 15,
 *        "total": 450
 *    }
 * }
 */
router.route('/*')
  .get(compreSocialCtrl.consultar)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
