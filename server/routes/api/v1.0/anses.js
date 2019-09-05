import express                  from 'express'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import APIError                 from '../../../helpers/APIError'
import ansesCtrl                from '../../../controllers/v1.0/anses'
import cache                    from './../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/anses/login Check ANSES Connection
 * @apiName getLogin
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccess (200) {string} status resultado de la autenticacion con ANSES
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     status: 'ok'
 * }
 */
router.route('/login')
  .get(ansesCtrl.login)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/anses/constancia-de-cuil-codificada Constancia de Cuil
 * @apiName getConstanciaDeCUILCodificada
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} apellido Apellido
 * @apiParam {string} nombre Nombre
 * @apiParam {string} fecha_nacimiento Fecha de Nacimiento, formato: DD/MM/AAAA
 * @apiParam {string} sexo Sexo [M|F]
 * @apiParam {string} tipoDoc Tipo Documento (29: DNI)
 * @apiParam {string} numDoc Numero de Documento
 *
 * @apiSuccess (200) {base64} constanciaCodificada Constancia de CUIL codificada en BASE64
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     constanciaCodificada: "JVBERi0xLjQKJeLjz9MKMSAwIG9iaiA8PC9EZWNvZGVQYXJtczw8L0NvbG9yc...",
 * }
 */
router.route('/constancia-de-cuil-codificada')
	.get(validate(paramValidation.webServices.anses.constanciaDeCUILCodificada), ansesCtrl.constanciaDeCUILCodificada)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/anses/traer-beneficios-asociados-por-cuil Beneficios Asociados
 * @apiName getTraerBeneficiosAsociadosPorCUIL
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} cuil CUIL
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/traer-beneficios-asociados-por-cuil')
  .get(validate(paramValidation.webServices.anses.traerBeneficiosAsociadosPorCUIL), ansesCtrl.traerBeneficiosAsociadosPorCUIL)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * @api {GET} v1.0/anses/donde-cobro-por-beneficio Donde Cobro por Beneficio
 * @apiName getDondeCobroPorBeneficio
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} beneficio Numero de beneficio
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/donde-cobro-por-beneficio')
  .get(validate(paramValidation.webServices.anses.dondeCobroPorBeneficio), ansesCtrl.dondeCobroPorBeneficio)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * @api {GET} v1.0/anses/traer-cuil-por-beneficio Obtener CUIL por beneficio
 * @apiName getTraerCuilPorNroBeneficio
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} beneficio Numero de beneficio
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/traer-cuil-por-beneficio')
  .get(validate(paramValidation.webServices.anses.traerCuilPorNroBeneficio), ansesCtrl.traerCuilPorNroBeneficio)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * @api {GET} v1.0/anses/obtener-datos-por-documento Obtener datos por documento
 * @apiName getObtenerDatosPorDocumento
 * @apiGroup ANSES
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} nro_documento Numero de Documento
 * @apiParam {number} nro_pagina_entrada Numero de Pagina, default=1
 *
 * @apiSuccess (200) {string} cuil Numero de CUIL
 * @apiSuccess (200) {string} apellido_nombre Nombre y Apellido
 * @apiSuccess (200) {string} nro_documento Numero de Documento
 * @apiSuccess (200) {string} tipo_documento Tipo Documento
 * @apiSuccess (200) {string} tipo_documento_descripcion Tipo documento descripcion
 * @apiSuccess (200) {string} fecha_nacimiento fecha de nacimiento
 * @apiSuccess (200) {string} sexo Sexo
 * @apiSuccess (200) {string} estado Codigo Estado
 * @apiSuccess (200) {string} estado_descripcion Estado descripcion
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "metadata": {
 *         "resultset": {
 *             "count": 1,
 *             "offset": 0,
 *             "limit": 0
 *         }
 *     },
 *     "results": [
 *         {
 *             "cuil": "20235533201",
 *             "apellido_nombre": "ALONSO GUSTAVO JUAN",
 *             "nro_documento": "23553320",
 *             "tipo_documento": "29",
 *             "tipo_documento_descripcion": "DU",
 *             "fecha_nacimiento": "1974-01-21T03:00:00.000Z",
 *             "sexo": "M",
 *             "estado": "8",
 *             "estado_descripcion": "ACREDITADO (A)"
 *         }
 *     ]
 * }
 */
router.route('/obtener-datos-por-documento')
  .get(validate(paramValidation.webServices.anses.obtenerDatosxDocumento), ansesCtrl.obtenerDatosPorDocumento)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
