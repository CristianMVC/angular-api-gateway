import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from '../../../../config/cache'
import g20Ctrl                      from '../../../controllers/v1.0/g20'
import APIError                     from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/*').get(cache.route())


/**
 * Routes
 **/
/**
 * @api {GET} v1.0/g20/paginas Paginas
 * @apiName getG20paginas
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 */
router.route('/paginas')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.listPages)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/eventos Eventos
 * @apiName getG20eventos
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 */
router.route('/eventos')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.listEventos)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/noticias Noticias
 * @apiName getG20noticias
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 */
router.route('/noticias')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.listNoticias)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/provincias Provincias
 * @apiName getG20provincias
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 */
router.route('/provincias')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.listProvincias)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/workstreams Workstreams
 * @apiName getG20workstreams
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 */
router.route('/workstreams')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.listWorkstreams)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/eventos/:qr_code Eventos QR
 * @apiName getG20eventosQr
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 * @apiParam  {String} type
 * @apiParam  {String} qr_code
 */
router.route('/eventos/:qr_code')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.showJSON)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/g20/eventos/:type/:qr_code Eventos QR Tipos
 * @apiName getG20eventosQrTipos
 * @apiGroup G20
 * @apiVersion 1.0.0
 *
 * @apiDeprecated Proyecto Finalizado
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields Campos Retornados
 * @apiParam  {Boolean} featured true, false
 * @apiParam  {String} type
 * @apiParam  {String} qr_code
 */
router.route('/eventos/:type/:qr_code')
  .get(validate(paramValidation.webServices.g20.list), g20Ctrl.showEventQR)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


router.route('/')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
