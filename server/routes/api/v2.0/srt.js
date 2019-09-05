import express                  from 'express'
import validate                 from 'express-validation'
import srtCtrl                  from '../../../controllers/v2.0/srt'
import APIError                 from '../../../helpers/APIError'
import paramValidation          from '../../../../config/param-validation'
import { idTokenMiddleware, }   from '../../../middelwares/tokenMiddleware'
import { pgMiddleware, }        from '../../../middelwares/pgMiddleware'
import { pgModelList, }        from '../../../models/pg'

const router = express.Router()	// eslint-disable-line new-cap

const { webServices, } = paramValidation
const { srt, } = webServices

/**
 *
 * @api {GET} v2.0/srt/credenciales/:credential                              Lista de Credenciales
 * @apiName ListaDeCredenciales
 * @apiGroup SRT
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {Number}     Credential                          CUIT
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                                     Resultados
 * @apiSuccess (200) {String}     results.nombre
 * @apiSuccess (200) {String}     results.fecha_nacimiento
 * @apiSuccess (200) {String}     results.dni
 * @apiSuccess (200) {String}     results.sexo
 * @apiSuccess (200) {Object}     results.poliza
 * @apiSuccess (200) {Number}     results.poliza.numero
 * @apiSuccess (200) {String}     results.poliza.desde
 * @apiSuccess (200) {String}     results.poliza.hasta
 * @apiSuccess (200) {Object}     results.poliza.empleador
 * @apiSuccess (200) {String}     results.poliza.empleador.cuit
 * @apiSuccess (200) {String}     results.poliza.empleador.nombre
 * @apiSuccess (200) {Object}     results.poliza.art
 * @apiSuccess (200) {String}     results.poliza.art.nombre
 * @apiSuccess (200) {String}     results.poliza.art.domicilio
 * @apiSuccess (200) {String}     results.poliza.art.telefono_denuncias
 * @apiSuccess (200) {String}     results.poliza.art.telefono_consultas
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *   "metadata": {
 *       "resultset": {
 *           "count": 2,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *   },
 *   "results": [
 *       {
 *           "nombre": "HEGYKOZI HERNAN JAVIER",
 *           "fecha_nacimiento": "1982-11-23T03:00:00.000Z",
 *           "dni": 29906396,
 *           "sexo": "M",
 *           "poliza": {
 *               "exp": "1982-11-23T03:00:00.000Z",
 *               "numero": 3243856,
 *               "desde": "2013-10-01T03:00:00.000Z",
 *               "hasta": null,
 *               "empleador": {
 *                   "cuit": 33709253099,
 *                   "nombre": "QUIASMA SRL"
 *               },
 *               "art": {
 *                   "nombre": "SWISS MEDICAL ART S.A.",
 *                   "domicilio": "CORRIENTES 1865",
 *                   "telefono_denuncias": "08002227854",
 *                   "telefono_consultas": "08002227854"
 *               }
 *           }
 *       },
 *       {
 *           "nombre": "HEGYKOZI HERNAN JAVIER",
 *           "fecha_nacimiento": "1982-11-23T03:00:00.000Z",
 *           "dni": 29906396,
 *           "sexo": "M",
 *           "poliza": {
 *               "exp": "1982-11-23T03:00:00.000Z",
 *               "numero": 4514329,
 *               "desde": "2017-12-01T03:00:00.000Z",
 *               "hasta": null,
 *               "empleador": {
 *                   "cuit": 33686471689,
 *                   "nombre": "SUPERINTENDENCIA DE RIESGOS DEL TRABAJO"
 *               },
 *               "art": {
 *                   "nombre": "ASOCIART SA ASEGURADORA DE RIESGOS  DEL TRABAJO",
 *                   "domicilio": "LEANDRO N. ALEM 621",
 *                   "telefono_denuncias": "08008880095",
 *                   "telefono_consultas": "08008880095"
 *               }
 *           }
 *      }
 *   ]
 * }
 *
 */

/**
 *
 * @api {GET} v2.0/srt/credenciales/:credential/polizas/:policy?imagenes=1  Obtener Poliza
 * @apiName Poliza
 * @apiGroup SRT
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam   {Number}     credential                          CUIT
 * @apiParam   {Number}     policy                              Número de la Póliza
 * @apiParam   {Number=1}   [imagenes]                            Agregar las imágenes a la respuesta
 *
 *
 * @apiSuccess (200) {String}     nombre
 * @apiSuccess (200) {String}     fecha_nacimiento
 * @apiSuccess (200) {String}     dni
 * @apiSuccess (200) {String}     sexo
 * @apiSuccess (200) {Object}     poliza
 * @apiSuccess (200) {Number}     poliza.numero
 * @apiSuccess (200) {String}     poliza.desde
 * @apiSuccess (200) {String}     poliza.hasta
 * @apiSuccess (200) {Object}     poliza.empleador
 * @apiSuccess (200) {String}     poliza.empleador.cuit
 * @apiSuccess (200) {String}     poliza.empleador.nombre
 * @apiSuccess (200) {Object}     poliza.art
 * @apiSuccess (200) {String}     poliza.art.nombre
 * @apiSuccess (200) {String}     poliza.art.domicilio
 * @apiSuccess (200) {String}     poliza.art.telefono_denuncias
 * @apiSuccess (200) {String}     poliza.art.telefono_consultas
 * @apiSuccess (200) {Object}     poliza.imagenes
 * @apiSuccess (200) {String}     poliza.imagenes.qr
 * @apiSuccess (200) {String}     poliza.imagenes.frente
 * @apiSuccess (200) {String}     poliza.imagenes.exp
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *        "nombre": "HEGYKOZI HERNAN JAVIER",
 *        "fecha_nacimiento": "1982-11-23T03:00:00.000Z",
 *        "dni": 29906396,
 *        "sexo": "M",
 *        "poliza": {
 *          "numero": 3243856,
 *          "desde": "2013-10-01T03:00:00.000Z",
 *          "hasta": null,
 *          "empleador": {
 *             "cuit": 33709253099,
 *             "nombre": "QUIASMA SRL"
 *          },
 *          "art": {
 *             "nombre": "SWISS MEDICAL ART S.A.",
 *             "domicilio": "CORRIENTES 1865",
 *             "telefono_denuncias": "08002227854",
 *             "telefono_consultas": "08002227854"
 *          },
 *          "imagenes": {
 *              "qr": "Base64",
 *              "frente": "Base64",
 *              "exp": "2013-10-01T03:00:00.000Z"
 *          }
 *        }
 *    }
 *
 */

/**
 *
 * @api {GET} v2.0/srt/credenciales/:credential/imagenes            Lista de Credenciales (Imágenes)
 * @apiName ListaDeCredencialesConImagenes
 * @apiGroup SRT
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {Number}     Credential                               CUIT
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                           Resultados
 * @apiSuccess (200) {String}     results.nombre
 * @apiSuccess (200) {String}     results.fecha_nacimiento
 * @apiSuccess (200) {String}     results.dni
 * @apiSuccess (200) {String}     results.sexo
 * @apiSuccess (200) {Object}     results.poliza
 * @apiSuccess (200) {Number}     results.poliza.numero
 * @apiSuccess (200) {String}     results.poliza.desde
 * @apiSuccess (200) {String}     results.poliza.hasta
 * @apiSuccess (200) {Object}     results.poliza.empleador
 * @apiSuccess (200) {String}     results.poliza.empleador.cuit
 * @apiSuccess (200) {String}     results.poliza.empleador.nombre
 * @apiSuccess (200) {Object}     results.poliza.art
 * @apiSuccess (200) {String}     results.poliza.art.nombre
 * @apiSuccess (200) {String}     results.poliza.art.domicilio
 * @apiSuccess (200) {String}     results.poliza.art.telefono_denuncias
 * @apiSuccess (200) {String}     results.poliza.art.telefono_consultas
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *   "metadata": {
 *       "resultset": {
 *           "count": 2,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *   },
 *   "results": [
 *       {
 *           "nombre": "HEGYKOZI HERNAN JAVIER",
 *           "fecha_nacimiento": "1982-11-23T03:00:00.000Z",
 *           "dni": 29906396,
 *           "sexo": "M",
 *           "poliza": {
 *               "exp": "1982-11-23T03:00:00.000Z",
 *               "numero": 3243856,
 *               "desde": "2013-10-01T03:00:00.000Z",
 *               "hasta": null,
 *               "empleador": {
 *                   "cuit": 33709253099,
 *                   "nombre": "QUIASMA SRL"
 *               },
 *               "art": {
 *                   "nombre": "SWISS MEDICAL ART S.A.",
 *                   "domicilio": "CORRIENTES 1865",
 *                   "telefono_denuncias": "08002227854",
 *                   "telefono_consultas": "08002227854"
 *               },
 *               "imagenes": {
 *                  "qr": "Base64",
 *                  "frente": "Base64",
 *                  "exp": "2013-10-01T03:00:00.000Z"
 *               }
 *           }
 *       },
 *       {
 *           "nombre": "HEGYKOZI HERNAN JAVIER",
 *           "fecha_nacimiento": "1982-11-23T03:00:00.000Z",
 *           "dni": 29906396,
 *           "sexo": "M",
 *           "poliza": {
 *               "exp": "1982-11-23T03:00:00.000Z",
 *               "numero": 4514329,
 *               "desde": "2017-12-01T03:00:00.000Z",
 *               "hasta": null,
 *               "empleador": {
 *                   "cuit": 33686471689,
 *                   "nombre": "SUPERINTENDENCIA DE RIESGOS DEL TRABAJO"
 *               },
 *               "art": {
 *                   "nombre": "ASOCIART SA ASEGURADORA DE RIESGOS  DEL TRABAJO",
 *                   "domicilio": "LEANDRO N. ALEM 621",
 *                   "telefono_denuncias": "08008880095",
 *                   "telefono_consultas": "08008880095"
 *               }
 *               "imagenes": {
 *                  "qr": "Base64",
 *                  "frente": "Base64",
 *                  "exp": "2013-10-01T03:00:00.000Z"
 *               }
 *           }
 *      }
 *   ]
 * }
 *
 */

/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/credenciales/:credential')
  .get(
    validate(srt.credenciales),
    pgMiddleware(pgModelList.srtCredencialV2, null, true),
    srtCtrl.getCredentials
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/credenciales/:credential/polizas/:policy')
  .get(
    idTokenMiddleware,
    validate(srt.credencial),
    srtCtrl.getPolicy
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/credenciales/:credential/polizas/:policy/imagenes')
  .get(
    idTokenMiddleware,
    validate(srt.credencial),
    srtCtrl.getPolicyImages
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/credenciales/:credential/imagenes')
  .get(
    idTokenMiddleware,
    validate(srt.credenciales),
    srtCtrl.getCredentialsImages
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router