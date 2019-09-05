import express from 'express'
import validate from 'express-validation'
import seguridadVialCtrl from '../../../controllers/v1.0/seguridad-vial'
import paramValidation from '../../../../config/param-validation'
import cache from '../../../../config/cache'
import APIError from '../../../helpers/APIError'
import { idTokenMiddleware, } from '../../../middelwares/tokenMiddleware'


const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/ConsultarLicenciaCertificado').get(cache.route())


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
 /**
 * '/ConsultarLicenciaCertificado'
 */
/**
 * @api {GET} v1.0/seguridad-vial/ConsultarLicenciaCertificado Consultar Licencia Certificado
 * @apiName getConsultarLicenciaCertificado
 * @apiGroup Seguridad Vial
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam {String} gender Masculino: M; Femenino: F
 * @apiParam {String} document_type Ejemplo: DNI:1
 * @apiParam {String} document_number
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 * }
 */
 router.route('/ConsultarLicenciaCertificado')
  .get(validate(paramValidation.webServices.seguridadVial.consultarLicenciaCertificado), seguridadVialCtrl.consultarLicenciaCertificado)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * '/licencia-nacional-digital'
 */
/**
 * @api {GET} v1.0/seguridad-vial/licencia-nacional-digital Licencia Nacional Digital
 * @apiName getLicenciaDigital
 * @apiGroup Seguridad Vial
 * @apiVersion  1.0.0
 *
 * @apiDescription Tener en cuenta que los siguientes campos, forman parte del payload del JWT
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam {Boolean} imagenes Indica si descargar las imagens de front y back de la licencia o solo el QR
 *
 * @apiSuccess (200) {type} sub: String
 * @apiSuccess (200) {type} iat: String
 * @apiSuccess (200) {type} exp: String
 * @apiSuccess (200) {type} id: String
 * @apiSuccess (200) {type} idTramite: String
 * @apiSuccess (200) {type} tipoDocumento: DNI
 * @apiSuccess (200) {type} numeroDocumento: String
 * @apiSuccess (200) {type} sexo: {M|F}
 * @apiSuccess (200) {type} apellido: String
 * @apiSuccess (200) {type} nombre: String
 * @apiSuccess (200) {type} nacionalidad: ARGENTINA
 * @apiSuccess (200) {type} fechaNacimiento: YYYY-MM-DDTHH:mm:ss
 * @apiSuccess (200) {type} localidad: String
 * @apiSuccess (200) {type} codigoPostal: String
 * @apiSuccess (200) {type} calle: String
 * @apiSuccess (200) {type} altura: String
 * @apiSuccess (200) {type} piso: String
 * @apiSuccess (200) {type} departamento: String
 * @apiSuccess (200) {type} barrio: String
 * @apiSuccess (200) {type} fechaEmision: YYYY-MM-DDTHH:mm:ss
 * @apiSuccess (200) {type} fechaVencimiento: YYYY-MM-DDTHH:mm:ss
 * @apiSuccess (200) {type} tipoFactorSanguineo: String
 * @apiSuccess (200) {type} cuil: String
 * @apiSuccess (200) {type} donante: Boolean
 * @apiSuccess (200) {type} principiante: Boolean
 * @apiSuccess (200) {type} lugarEmision: String
 * @apiSuccess (200) {type} responsableCEL: String
 * @apiSuccess (200) {type} fechaRetencion: String
 * @apiSuccess (200) {type} retenida: Boolean
 * @apiSuccess (200) {type} inhabilitada: Boolean
 * @apiSuccess (200) {type} observacionesEnLicencia: String
 * @apiSuccess (200) {type} observaciones: String
 * @apiSuccess (200) {type} frente: {ImgBase64}
 * @apiSuccess (200) {type} dorso: {ImgBase64}
 * @apiSuccess (200) {type} qr: {ImgBase64}
 * @apiSuccess (200) {type} clase: []
 * @apiSuccess (200) {type} escudo: ''
 * @apiSuccess (200) {type} foto: ''
 * @apiSuccess (200) {type} firma: ''
 * @apiSuccess (200) {type} firmaResponsableCEL: ''
 * @apiSuccess (200) {type} categoriaLicencia: String
 * @apiSuccess (200) {type} nombreProvincia: String
 * @apiSuccess (200) {type} clasesCodigos: String
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *    data: {LicenciaDigital_JWT}
 * }
 */
router.route('/licencia-nacional-digital')
  .get(idTokenMiddleware, validate(paramValidation.webServices.seguridadVial.licenciaDigital), seguridadVialCtrl.licenciaDigital)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ------------------------------------
 *    Demo Service Routes
 *    todo: remove
 ** ------------------------------------*/
/**
 * '/demo/ConsultarLicenciaCertificado'
 */
router.route('/demo/ConsultarLicenciaCertificado')
  .get(validate(paramValidation.webServices.seguridadVial.consultarLicenciaCertificado), seguridadVialCtrl.consultarLicenciaCertificadoDemo)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
