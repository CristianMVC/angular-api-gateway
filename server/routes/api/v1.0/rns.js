import express from 'express'
import rnsCtrl from '../../../controllers/v1.0/rns'
import APIError from '../../../helpers/APIError'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'


const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 * Routes RNS
 * BasePath: ~/v1.0/rns
 ** ------------------------------------*/


 /**
 *
 * @api {GET} v1.0/rns/sociedades Listado de Sociedades
 * @apiName ListadoDeSociedades
 * @apiGroup RNS
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Number} [cuit]           Cuit de una Sociedad, obligatorio si no se envia 'razon_social'
 * @apiParam  {String} [razon_social]   Razón social de una sociedad, obligatorio si no se envia 'cuit'
 * @apiParam  {String} [limit]          Filtro para requisitos
 * @apiParam  {String} [offset]         Filtro para requisitos
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]} results                                       Resultado
 * @apiSuccess (200) {Object[]} results.sociedades                            Sociedades
 * @apiSuccess (200) {String}   results.sociedades.CUIT
 * @apiSuccess (200) {String}   results.sociedades.RAZON_SOCIAL
 * @apiSuccess (200) {String}   results.sociedades.FECHA_CONTRATO_SOCIAL
 * @apiSuccess (200) {String}   results.sociedades.TIPO_SOCIETARIO
 * @apiSuccess (200) {String}   results.sociedades.FECHA_ACTUALIZACION
 * @apiSuccess (200) {String}   results.sociedades.CORREO
 * @apiSuccess (200) {String}   results.sociedades.NUMERO_INSCRIPCION
 * @apiSuccess (200) {String}   results.sociedades.DOMICILIO_FISCAL
 * @apiSuccess (200) {String}   results.sociedades.DF_PROVINCIA
 * @apiSuccess (200) {String}   results.sociedades.DF_LOCALIDAD
 * @apiSuccess (200) {String}   results.sociedades.DF_CALLE
 * @apiSuccess (200) {String}   results.sociedades.DF_NUMERO
 * @apiSuccess (200) {String}   results.sociedades.DF_PISO
 * @apiSuccess (200) {String}   results.sociedades.DF_CP
 * @apiSuccess (200) {String}   results.sociedades.DF_ESTADO_DOMICILIO
 * @apiSuccess (200) {String}   results.sociedades.DOMICILIO_LEGAL
 * @apiSuccess (200) {String}   results.sociedades.DL_PROVINCIA
 * @apiSuccess (200) {String}   results.sociedades.DL_LOCALIDAD
 * @apiSuccess (200) {String}   results.sociedades.DL_CALLE
 * @apiSuccess (200) {String}   results.sociedades.DL_NUMERO
 * @apiSuccess (200) {String}   results.sociedades.DL_PISO
 * @apiSuccess (200) {String}   results.sociedades.DL_DEPARTAMENTO
 * @apiSuccess (200) {String}   results.sociedades.DL_CP
 * @apiSuccess (200) {String}   results.sociedades.DL_ESTADO_DOMICILIO
 * @apiSuccess (200) {String}   results.sociedades.FECHA_CORTE
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *    "metadata": {
 *         "resultset": {
 *             "count": 1,
 *             "offset": 0,
 *             "limit": 0
 *         }
 *     },
 *    "results": [
 *         {
 *             "CUIT": "30500000127",
 *             "RAZON_SOCIAL": "SEGUROS SURA S.A",
 *             "FECHA_CONTRATO_SOCIAL": "1912-04-30T13:43:00.000Z",
 *             "TIPO_SOCIETARIO": "SOCIEDAD ANONIMA",
 *             "FECHA_ACTUALIZACION": "2019-01-14T13:06:00.000Z",
 *             "CORREO": "cristina.garasini@segurossura.com.ar",
 *             "NUMERO_INSCRIPCION": "",
 *             "DOMICILIO_FISCAL": "FISCAL",
 *             "DF_PROVINCIA": "CIUDAD AUTONOMA BUENOS AIRES",
 *             "DF_LOCALIDAD": "CAPITAL FEDERAL",
 *             "DF_CALLE": "GRIERSON,CECILIA BOULEVARD",
 *             "DF_NUMERO": "255",
 *             "DF_PISO": "1",
 *             "DF_DEPARTAMENTO": "",
 *             "DF_CP": "1107",
 *             "DF_ESTADO_DOMICILIO": "CONFIRMADO",
 *             "DOMICILIO_LEGAL": "LEGAL/REAL",
 *             "DL_PROVINCIA": "CIUDAD AUTONOMA BUENOS AIRES",
 *             "DL_LOCALIDAD": "CAPITAL FEDERAL",
 *             "DL_CALLE": "GRIERSON,CECILIA BOULEVARD",
 *             "DL_NUMERO": "255",
 *             "DL_PISO": "1",
 *             "DL_DEPARTAMENTO": "",
 *             "DL_CP": "1107",
 *             "DL_ESTADO_DOMICILIO": "DECLARADO",
 *             "FECHA_CORTE": "2018-11-13T03:00:00.000Z"
 *         }
 *    ]
 *   }
 *
 *
 */

router.route('/sociedades')
  .get(validate(paramValidation.webServices.rns.obtenerSociedades), rnsCtrl.obtenerSociedades)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
