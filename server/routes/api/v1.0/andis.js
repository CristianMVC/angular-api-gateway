import express from 'express'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'
import cache from './../../../../config/cache'
import simboloAutomotorCtrl from '../../../controllers/v1.0/andis/simbolo-automotor'
import APIError from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/simbolo-automotor/beneficiario').get(cache.route())
router.route('/simbolo-automotor/tipos-documentos').get(cache.route())


/**
 * Routes
 * ~/andis/*
 **/
/**
 * @api {GET} v1.0/andis/simbolo-automotor/beneficiario Beneficiario
 * @apiName getBeneficiario
 * @apiGroup Andis
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {string} nro_documento
 * @apiParam  {string} tipo_documento
 * @apiParam  {bolean} render_qr Indica si retorna codigo QR. SI (1), NO (0)
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *      "apellido": "ERNAU",
 *      "nombre": "MARIA JOSEFA",
 *      "fechaNacimiento": "1933-07-31",
 *      "fechaInicio": "2018-03-16",
 *      "fechaVencimiento": "2022-08-07",
 *      "qrString": "https://apps.snr.gob.ar/qrservicio/data/411278e709c1ca7ae9de5dd660a940574dde0632f49ada213112040af5970289",
 *      "qr": [],
 *      "tipo": "Símbolo Internacional de Acceso",
 *      "anio": 2018,
 *      "telefono": "46286388",
 *      "email": "INFO@SNR.GOB.AR"
 *  }
 */
router.route('/simbolo-automotor/beneficiario')
  .get(validate(paramValidation.webServices.andis.simboloAutomotor.generic), simboloAutomotorCtrl.getBeneficiario)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/andis/simbolo-automotor/qr Obtener Codigo QR
 * @apiName getQR
 * @apiGroup Andis
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} nro_documento
 * @apiParam  {String} tipo_documento
 *
 * @apiSuccess (200) {binary} file Imagen QR
 *
 */
router.route('/simbolo-automotor/qr')
  .get(validate(paramValidation.webServices.andis.simboloAutomotor.generic), simboloAutomotorCtrl.getQr)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/andis/simbolo-automotor/tipos-documentos Listado Tipos Documentos
 * @apiName get
 * @apiGroup Andis
 * @apiVersion 1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 6,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 1,
 *              "name": "DNI",
 *              "gender": "F",
 *              "description": "DNI femenino"
 *          },
 *          {
 *              "id": 2,
 *              "name": "DNI",
 *              "gender": "M",
 *              "description": "DNI masculino"
 *          },
 *          {
 *              "id": 3,
 *              "name": "LC",
 *              "gender": null,
 *              "description": "Libreta Civica"
 *          },
 *          {
 *              "id": 4,
 *              "name": "LE",
 *              "gender": null,
 *              "description": "Libreta de Enrolamiento"
 *          },
 *          {
 *              "id": 75,
 *              "name": "CIE",
 *              "gender": null,
 *              "description": "Cedula de Identidad del Exterior"
 *          },
 *          {
 *              "id": 99,
 *              "name": "PASS",
 *              "gender": null,
 *              "description": "Pasaporte"
 *          }
 *      ]
 *  }
 */
router.route('/simbolo-automotor/tipos-documentos')
  .get(simboloAutomotorCtrl.getTiposDocumentos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** 405 - Method Not Allowed */
router.route('/simbolo-automotor')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
