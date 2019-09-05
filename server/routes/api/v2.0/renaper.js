import express from 'express'
import renaperCtrl from '../../../controllers/v2.0/renaper'
import APIError from '../../../helpers/APIError'
import { idTokenMiddleware, } from '../../../middelwares/tokenMiddleware'
/* import { pgMiddleware, } from '../../../middelwares/pgMiddleware'
import { pgModelList, } from '../../../models/pg-utils' */

const router = express.Router()	// eslint-disable-line new-cap

/**
 *
 * @api {GET} v2.0/renaper/dni Detalle DNI
 * @apiName DataDNI
 * @apiGroup RENAPER
 * @apiVersion 1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiSuccess (200) {String}                                                                 id_tramite_princial
 * @apiSuccess (200) {String}                                                                 id_tramite_tarjeta_reimpresa
 * @apiSuccess (200) {String}                                                                 ejemplar
 * @apiSuccess (200) {String}                                                                 vencimiento
 * @apiSuccess (200) {String}                                                                 emision
 * @apiSuccess (200) {String}                                                                 codigo_error
 * @apiSuccess (200) {String}                                                                 codigo_fallecimiento
 * @apiSuccess (200) {String}                                                                 fecha_fallecimiento
 * @apiSuccess (200) {String}                                                                 mensaje_fallecimiento
 * @apiSuccess (200) {String}                                                                 id_ciudadano
 * @apiSuccess (200) {String}                                                                 nro_error
 * @apiSuccess (200) {String}                                                                 descripcion_error
 * @apiSuccess (200) {String}                                                                 fecha_nacimiento
 * @apiSuccess (200) {String}                                                                 codigo_postal
 * @apiSuccess (200) {String}                                                                 cuil
 * @apiSuccess (200) {String}                                                                 calle
 * @apiSuccess (200) {String}                                                                 numero
 * @apiSuccess (200) {String}                                                                 piso
 * @apiSuccess (200) {String}                                                                 nombres
 * @apiSuccess (200) {String}                                                                 apellidos
 * @apiSuccess (200) {String}                                                                 nro_dni
 * @apiSuccess (200) {String}                                                                 pais
 * @apiSuccess (200) {String}                                                                 municipio
 * @apiSuccess (200) {String}                                                                 provincia
 * @apiSuccess (200) {String}                                                                 monoblock
 * @apiSuccess (200) {String}                                                                 barrio
 * @apiSuccess (200) {String}                                                                 ciudad
 * @apiSuccess (200) {Object={"qr": "Base64", "frente": "Base64", "dorso": "base64"},null}    [imagenes]                     Objeto con imagenes
 * @apiSuccess (200) {String}                                                                 imagenes.qr                    QR en Base64
 * @apiSuccess (200) {String}                                                                 imagenes.frente                Frente en Base64
 * @apiSuccess (200) {String}                                                                 imagenes.dorso                 Dorso en Base64
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *      "id_tramite_princial": "219519899",
 *      "id_tramite_tarjeta_reimpresa": "0",
 *      "ejemplar": "B",
 *      "vencimiento": "2028-09-19T03:00:00.000Z",
 *      "emision": "2013-09-19T03:00:00.000Z",
 *      "codigo_error": "99",
 *      "codigo_fallecimiento": "03",
 *      "fecha_fallecimiento": "-",
 *      "mensaje_fallecimiento": "Sin Aviso de Fallecimiento",
 *      "id_ciudadano": "18799841",
 *      "nro_error": "0",
 *      "descripcion_error": "SIN TARJETA REIMPRESA",
 *      "fecha_nacimiento": "1979-10-13T03:00:00.000Z",
 *      "codigo_postal": "1900",
 *      "cuil": "20276774930",
 *      "calle": "12",
 *      "numero": "30",
 *      "piso": "",
 *      "nombres": "Rodrigo Mariano",
 *      "pais": "ARGENTINA",
 *      "municipio": "LA_PLATA",
 *      "provincia": "BUENOS_AIRES",
 *      "monoblock": "",
 *      "barrio": "0",
 *      "ciudad": "LA_PLATA",
 *      "nro_dni": "95876354",
 *      "sexo": "M",
 *      "apellidos": "Arias"
 *      "imagenes": {
 *          "qr": "Base64",
 *          "frente": "Base64",
 *          "dorso": "base64"
 *       }
 *  }
 *
 *
 */

router.route('/dni')
  .get(idTokenMiddleware, renaperCtrl.getDNI)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/renaper/dni/imagenes Imagenes DNI
 * @apiName ImagenesDNI
 * @apiGroup RENAPER
 * @apiVersion 1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 *
 * @apiSuccess (200) {String}   qr                                                    QR en Base64
 * @apiSuccess (200) {String}   frente                                                Frente en Base64
 * @apiSuccess (200) {String}   dorso                                                Dorso en Base64
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *      "qr": "Base64",
 *      "frente": "Base64",
 *      "dorso": "base64"
 *  }
 *
 *
 */

router.route('/dni/imagenes')
  .get(idTokenMiddleware, renaperCtrl.getDNIimages)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router