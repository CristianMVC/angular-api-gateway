import express from 'express'
// import cache from '../../../../config/cache'
import apostillaCtrl from '../../../controllers/v1.0/apostilla'
import APIError from '../../../helpers/APIError'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
// router.route('/*').get(cache.route())

/** -------------------------------------
 * Routes Apostilla
 * BasePath: ~/v1.0/apostilla
 *  consultarDocumentoDetalle
 *  consultarDocumentoEnExpedientes
 *  consultarDocumentoPdf
 *  consultarDocumentoPorNumero
 *  consultarDocumentoPublicablePorNumero
 ** ------------------------------------*/


/**
 *  consultarDocumentoDetalle
 */
/**
 * @api {GET} v1.0/apostilla/consultar-documento-detalle Consultar documento Detalle
 * @apiName getConsultarDocumentoDetalle
 * @apiGroup Apostilla
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} usuario_consulta
 * @apiParam {string} numero_documento
 * @apiParam {string} sistema_origen
 * @apiParam {string} numero_especial
 * @apiParam {string} assignee
 */
router.route('/consultar-documento-detalle')
  .get(validate(paramValidation.webServices.apostilla.generic), apostillaCtrl.consultarDocumentoDetalle)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *  consultarDocumentoEnExpedientes
 */
/**
 * @api {GET} v1.0/apostilla/consultar-documento-en-expedientes Consultar documento En Expedientes
 * @apiName getConsultarDocumentoEnExpedientes
 * @apiGroup Apostilla
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} usuario_consulta
 * @apiParam {string} numero_documento
 * @apiParam {string} sistema_origen
 * @apiParam {string} numero_especial
 * @apiParam {string} assignee
 */
router.route('/consultar-documento-en-expedientes')
  .get(validate(paramValidation.webServices.apostilla.generic), apostillaCtrl.consultarDocumentoEnExpedientes)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *  consultarDocumentoPdf
 */
/**
 * @api {GET} v1.0/apostilla/consultar-documento-pdf Consultar documento PDF
 * @apiName getConsultarDocumentoPdf
 * @apiGroup Apostilla
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} usuario_consulta
 * @apiParam {string} numero_documento
 * @apiParam {string} sistema_origen
 * @apiParam {string} numero_especial
 * @apiParam {string} assignee
 */
router.route('/consultar-documento-pdf')
  .get(validate(paramValidation.webServices.apostilla.generic), apostillaCtrl.consultarDocumentoPdf)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *  consultarDocumentoPorNumero
 */
/**
 * @api {GET} v1.0/apostilla/consultar-documento-por-numero Consultar documento por numero
 * @apiName getConsultarDocumentoPorNumero
 * @apiGroup Apostilla
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} usuario_consulta
 * @apiParam {string} numero_documento
 * @apiParam {string} sistema_origen
 * @apiParam {string} numero_especial
 * @apiParam {string} assignee
 */
router.route('/consultar-documento-por-numero')
  .get(validate(paramValidation.webServices.apostilla.generic), apostillaCtrl.consultarDocumentoPorNumero)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *  consultarDocumentoPublicablePorNumero
 */
/**
 * @api {GET} v1.0/apostilla/consultar-documento-publicable-por-numero Consultar documento publicable por numero
 * @apiName getConsultarDocumentoPublicablePorNumero
 * @apiGroup Apostilla
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} usuario_consulta
 * @apiParam {string} numero_documento
 * @apiParam {string} sistema_origen
 * @apiParam {string} numero_especial
 * @apiParam {string} assignee
 */
router.route('/consultar-documento-publicable-por-numero')
  .get(validate(paramValidation.webServices.apostilla.generic), apostillaCtrl.consultarDocumentoPublicablePorNumero)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
