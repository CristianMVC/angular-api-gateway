import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import { pgMiddleware, }            from '../../../middelwares/pgMiddleware'
import { pgModelList, }             from '../../../models/pg'
import cudCtrl                      from '../../../controllers/v1.0/cud'
import APIError                     from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
//router.route('/:codbarras').get()

/**
 * Routes
 **/

 /**
  *
  * @api {GET} v1.0/cud/certificado Obtener Certificado
  * @apiName obtenerCertificado
  * @apiGroup CUD
  * @apiVersion  1.0.0
  *
  * @apiUse AuthIDHeaders
  *
  * @apiParam  {Number} [reduce_form] Proporción a reducir (formulario)
  * @apiParam  {Number} [reduce_certs] Proporción a reducir ()
  *
  * @apiSuccess (200) {Object} cud
  * @apiSuccess (200) {String} cud.front
  * @apiSuccess (200) {String} cud.back
  * @apiSuccess (200) {String} cud.form
  * @apiSuccess (200) {String} cud.token
  * @apiSuccess (200) {String} qr
  * @apiSuccess (200) {String} message
  * @apiSuccess (200) {String} recurso
  * @apiSuccess (200) {String} pais
  * @apiSuccess (200) {String} tipoDocumento
  * @apiSuccess (200) {Number} numero
  * @apiSuccess (200) {String} desde
  * @apiSuccess (200) {String} hasta
  * @apiSuccess (200) {String} cuit
  * @apiSuccess (200) {String} nombre
  * @apiSuccess (200) {String} apellido
  * @apiSuccess (200) {String} fechaNacimiento
  * @apiSuccess (200) {String} sexo
  * @apiSuccess (200) {String} fechaInicioDanio
  * @apiSuccess (200) {Number} hashCertificado
  * @apiSuccess (200) {String} diagnostico
  * @apiSuccess (200) {String} funcionesCorporales
  * @apiSuccess (200) {String} estructurasCorporales
  * @apiSuccess (200) {String} actividadParticipacion
  * @apiSuccess (200) {String} factoresAmbientales
  * @apiSuccess (200) {String} orientacionPrestacional
  * @apiSuccess (200) {Boolean} acompanante
  * @apiSuccess (200) {String} lugarEmision
  * @apiSuccess (200) {String} fechaEmision
  * @apiSuccess (200) {String} juntaEvaluadora
  * @apiSuccess (200) {String} medico1
  * @apiSuccess (200) {String} medico2
  * @apiSuccess (200) {String} medico3
  * @apiSuccess (200) {String} numeroFormulario
  * @apiSuccess (200) {String} numeroCertificado
  * @apiSuccess (200) {String} ley
  * @apiSuccess (200) {String} provincia
  * @apiSuccess (200) {Boolean} asignacionFamiliar
  *
  *
  * @apiSuccessExample {json} Success-Response:
  *
  *   {
  *     "cud": {
  *       "form": "Base64",
  *       "front": "Base64",
  *       "back": "Base64",
  *       "token": "Ey..."
  *     },
  *     "verified": true,
  *     "message": "CUD verificado!!!",
  *     "qr": "Base64"
  *     "recurso": "4363323436-03-05-2019-15-32",
  *     "pais": "AFG",
  *     "tipoDocumento": "D.N.I. - M -",
  *     "numero": 5199881,
  *     "desde": "2019-03-07T03:00:00.000Z",
  *     "hasta": "2029-03-07T03:00:00.000Z",
  *     "cuit": "20051998813",
  *     "nombre": "Luis Jorge",
  *     "apellido": "TAMARGO",
  *     "fechaNacimiento": "1943-01-29T03:00:00.000Z",
  *     "sexo": "M",
  *     "fechaInicioDanio": "2017-01-01T03:00:00.000Z",
  *     "hashCertificado": 4363323436,
  *     "diagnostico": "Trastorno depresivo recurrente. Gonartrosis [artrosis de la rodilla]. Hipoacusia neurosensorial, bilateral. Presencia de implante ortopédico articular.",
  *     "funcionesCorporales": "b230.3 b7100.2 b152.3",
  *     "estructurasCorporales": "s75011.411 s2600.373 s110.888",
  *     "actividadParticipacion": "d310.34 d3504.34 d115.34 d9205.34 d4503.22 d730.34 d760.34 d910.34 d750.34 d230.23 d3501.34",
  *     "factoresAmbientales": "e1151.+3 e1251.+4 e310.+3 e2500..3 e225..3 e5700.+3 e355.+3 e5801.+3 e1101.+3 e2501..3",
  *     "orientacionPrestacional": "PRESTACIONES DE REHABILITACION.",
  *     "acompanante": false,
  *     "lugarEmision": "La Plata                           ",
  *     "fechaEmision": "2019-03-18",
  *     "juntaEvaluadora": "Junta de La Plata (H.I.G.A. Gral. San Martin) ",
  *     "medico1": "CORTES Alvaro",
  *     "medico2": "HERNANDEZ Andrea Noemi",
  *     "medico3": "OGUICH Sandra Albina",
  *     "numeroFormulario": "01750882-9",
  *     "numeroCertificado": "AFG-02-00005199881-20190307-20290307-LA -453",
  *     "ley": "Ley N° 22.431",
  *     "provincia": "B",
  *     "asignacionFamiliar": true
  *   }
  *
  *
  */

router.route('/certificado')
  .get(pgMiddleware(pgModelList.cudCertificado), validate(paramValidation.webServices.cud.obtenerCertificado), cudCtrl.obtenerCertificado)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * @apiIgnore 'Falta mostrar la respuesta'
 * @api {GET} v1.0/cud/:numeroPadron Consultar Padron
 * @apiName consultarPadron
 * @apiGroup CUD
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Number} numeroPadron Número de identificación del padron
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *    "acompanante": true,
 *    "apellido": "Aguilar",
 *    "doc_num": 11453358,
 *    "doc_tipo": 1,
 *    "fecha_fin": "2022-01-18",
 *    "fecha_inicio": "2017-01-18",
 *    "fecha_nac": "1955-01-02",
 *    "nacionalidad": "Argentina",
 *    "nombre": "Graciela Maria",
 *    "sexo": "F",
 *    "vigencia": "CUD VIGENTE"
 * }
 *
 *
 */

router.route('/:codbarras')
  .get(cache.route(), validate(paramValidation.webServices.cud.consultarPadron), cudCtrl.consultarPadron)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



export default router
