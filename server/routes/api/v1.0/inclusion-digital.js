import express from 'express'
import APIError from '../../../helpers/APIError'
import inclusionDigital from  '../../../controllers/v1.0/inclusion-digital'
import { asyncMiddleware, } from '../../../middelwares/asyncMiddleware'

const router = express.Router()	// eslint-disable-line new-cap

/**
 *
 * @api {GET} v1.0/inclusion-digital/certificados     Certificado
 * @apiName inclusionDigital
 * @apiGroup INCLUSION Digital
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}  results
 * @apiSuccess (200) {String}    results.apellido
 * @apiSuccess (200) {String}    results.nombre
 * @apiSuccess (200) {String}    results.dni
 * @apiSuccess (200) {String}    results.cuil
 * @apiSuccess (200) {String}    results.tipo
 * @apiSuccess (200) {String}    results.duracion
 * @apiSuccess (200) {String}    results.localidad
 * @apiSuccess (200) {String}    results.provincia
 * @apiSuccess (200) {String}    results.alfabetizador
 * @apiSuccess (200) {String}    results.mes
 * @apiSuccess (200) {String}    results.ano
 * @apiSuccess (200) {String}    results.certificado
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *    {
 *       "metadata": {
 *          "resultset": {
 *            "count": 1,
 *            "offset": 0,
 *            "limit": 0
 *          },
 *       },
 *       "results": [
 *          {
 *            "apellido": "Aguirre",
 *            "nombre": "Sofía",
 *            "dni": "3616463",
 *            "cuil": "",
 *            "tipo": "Club Digital",
 *            "duracion": "12",
 *            "localidad": "Morón",
 *            "provincia": "Buenos Aires",
 *            "alfabetizador": "Balliro Leandro",
 *            "mes": "Abril",
 *            "ano": "2019",
 *            "certificado": "Base64",
 *          }
 *       ]
 *    }
 *
 *
 */


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
router.route('/certificados')
  .get(asyncMiddleware(inclusionDigital.getCertificados))
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router