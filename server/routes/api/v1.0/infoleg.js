import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import infoLegCtrl                  from '../../../controllers/v1.0/infoleg'
import APIError                     from '../../../helpers/APIError'
import cache                        from './../../../../config/cache'


const router = express.Router()	// eslint-disable-line new-cap

/**
 * Cache
 **/
router.route('/*').get((req, res, next) => {
  try {
    const regex = new RegExp('\/resources\/', 'i')

    if (regex.exec(req.path))
      res.use_express_redis_cache = false

    next()
  } catch (e) {
    next(APIError({ status: 500, devMessage: e.message, }))
  }
}, cache.route())


/**
 * Routes
 **/
/** ~/InfoLeg Resources Proxy */
/**
 * @api {GET} v1.0/infoleg/{version}/{tipo}/resources/{path} Infoleg Resources
 * @apiName getResources
 * @apiGroup INFOLEG
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {version} Version Version del Endpont Externo. Ejemplo v1.0; v2.0
 * @apiParam {tipo} nacionales o provinciales
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~/api/v1.0/infoleg/v2.0/provinciales/normativos/resources/klmnoprs-tuvw-leyp-rovj-0300200f1pdf%20name:J0300200F1.PDF
 *
 * @apiSuccess (200) {binary} file Archivo Binario
 */
router.route('/v[0-9].0/*/resources/*')
  .get(infoLegCtrl.resources)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/InfoLeg Proxy */
/**
 * @api {GET} v1.0/infoleg/{version}/{path} Infoleg Proxy
 * @apiName getProxy
 * @apiGroup INFOLEG
 * @apiVersion  1.0.0
 *
 * @apiDescription Este EndPoint se encuentra proxy-ficado. Por favor remitirse a la documentacion
 * del servicio de origen.<br>
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {version} Version Version del Endpont Externo. Ejemplo v1.0; v2.0
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~/api/v1.0/infoleg/v1.0/nacionales/actas?texto=ley
 *
 * @apiParam {string} numero
 * @apiParam {string} texto
 * @apiParam {string} dependencia
 * @apiParam {string} provincia fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion_desde fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion_hasta fecha formato YYYY-MM-DD
 * @apiParam {string} sancion fecha formato YYYY
 * @apiParam {string} id
 * @apiParam {string} limit
 * @apiParam {string} offset
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 74,
 *              "offset": 1,
 *              "limit": 25
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 271274,
 *              "jurisdiccion": "Nacional",
 *              "claseNorma": " ",
 *              "idNormas": [
 *                  {
 *                      "numero": "1251",
 *                      "dependencia": "INSTITUTO NACIONAL DE TECNOLOGIA INDUSTRIAL (INTI)",
 *                      "ramaDigesto": ""
 *                  }
 *              ],
 *              "tipoNorma": "Acta",
 *              "numeroBoletin": 33555,
 *              "numeroPagina": 21,
 *              "publicacion": "2017-01-30",
 *              "sancion": "2016-12-29",
 *              "tituloSumario": "INSTITUTO NACIONAL DE TECNOLOGIA INDUSTRIAL",
 *              "tituloResumido": "CONSEJO DIRECTIVO",
 *              "textoResumido": "SE REUNEN PARA LA: I) PARA APROBACION DEL CONSEJO DIRECTIVO A) ACTA ORDINARIA Nº 1250 - REUNION ORDINARIA DEL 23 DE NOVIEMBRE DE 2016.",
 *              "estado": ""
 *          },
 *      ]
 *  }
 */
router.route('/v[0-9].0/*')
  .get(validate(paramValidation.webServices.infoleg.genericEndPoint), infoLegCtrl.consulta)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/InfoLeg Resources Proxy */
/**
 * @api {GET} v1.0/infoleg/nacionales/resources/{path} Legacy Resources
 * @apiName getLegacyResources
 * @apiGroup INFOLEG
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} path Path relativo del archivo
 *
 * @apiSuccess (200) {binary} file Archivo Binario
 */
router.route('/nacionales/resources/*')
  .get(infoLegCtrl.resources_v0)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/InfoLeg Proxy */
/**
 * @api {GET} v1.0/infoleg/* Legacy Proxy
 * @apiName getLegacyProxy
 * @apiGroup INFOLEG
 * @apiVersion  1.0.0
 *
 * @apiDescription Este EndPoint se encuentra proxy-ficado. Por favor remitirse a la documentacion
 * del servicio de origen.<br>
 * Para acceder a los EndPoint's, reemplazar el * con el path relativo a partir del numero de version.<br>
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~/api/v1.0/infoleg/nacionales/actas?texto=ley
 *
 * @apiParam {string} numero
 * @apiParam {string} texto
 * @apiParam {string} dependencia
 * @apiParam {string} provincia fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion_desde fecha formato YYYY-MM-DD
 * @apiParam {string} publicacion_hasta fecha formato YYYY-MM-DD
 * @apiParam {string} sancion fecha formato YYYY
 * @apiParam {string} id
 * @apiParam {string} limit
 * @apiParam {string} offset
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 74,
 *              "offset": 1,
 *              "limit": 25
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 271274,
 *              "jurisdiccion": "Nacional",
 *              "claseNorma": " ",
 *              "idNormas": [
 *                  {
 *                      "numero": "1251",
 *                      "dependencia": "INSTITUTO NACIONAL DE TECNOLOGIA INDUSTRIAL (INTI)",
 *                      "ramaDigesto": ""
 *                  }
 *              ],
 *              "tipoNorma": "Acta",
 *              "numeroBoletin": 33555,
 *              "numeroPagina": 21,
 *              "publicacion": "2017-01-30",
 *              "sancion": "2016-12-29",
 *              "tituloSumario": "INSTITUTO NACIONAL DE TECNOLOGIA INDUSTRIAL",
 *              "tituloResumido": "CONSEJO DIRECTIVO",
 *              "textoResumido": "SE REUNEN PARA LA: I) PARA APROBACION DEL CONSEJO DIRECTIVO A) ACTA ORDINARIA Nº 1250 - REUNION ORDINARIA DEL 23 DE NOVIEMBRE DE 2016.",
 *              "estado": ""
 *          },
 *      ]
 *  }
 */
router.route('/*')
  .get(validate(paramValidation.webServices.infoleg.genericEndPoint), infoLegCtrl.consulta_v0)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
