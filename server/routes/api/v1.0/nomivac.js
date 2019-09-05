import express from 'express'
import cache from '../../../../config/cache'
import aplicacionesVacunasCiudadanoCtrl from '../../../controllers/v1.0/nomivac/aplicacionesVacunasCiudadano'
import calendarioVacunasCtrl from '../../../controllers/v1.0/nomivac/calendarioVacunas'
import validate from 'express-validation'
import paramValidation from '../../../../config/param-validation'
import APIError from '../../../helpers/APIError'


const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
router.route('/').get(cache.route())

/** ---------------------------------------
 * Falta 'aplicaciones-vacunas-ciudadano' v1
 ** ----------------------------------------*/

/**
 *
 * @api {GET} v1.0/nomivac/calendario-vacunas             Calendario de Vacunas
 * @apiName calendarioDeVacunas
 * @apiGroup NOMIVAC
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccess (200) {Object}     calendarioVacunacion                                  Resultado
 * @apiSuccess (200) {Object[]}   calendarioVacunacion.grupoEdades                      Lista de grupo de edades
 * @apiSuccess (200) {Object[]}   calendarioVacunacion.vacuna                           Lista de tipos de vacunas
 * @apiSuccess (200) {Object[]}   calendarioVacunacion.calendarioNacional
 * @apiSuccess (200) {String}     calendarioVacunacion.calendarioNacional.grupoEdad     Grupo de edad para la vacuna
 * @apiSuccess (200) {String}     calendarioVacunacion.calendarioNacional.vacuna        Tipo de vacuna
 * @apiSuccess (200) {Object[]}   calendarioVacunacion.calendarioNacional.dosis         Lista de dosis de vacunas
 * @apiSuccess (200) {String}     resultado
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "calendarioVacunacion": {
 *       "grupoEdades": [
 *         "Recién nacido",
 *         "2 meses",
 *         "3 meses",
 *         "4 meses",
 *         ...
 *       ],
 *       "vacuna": [
 *         "BCG",
 *         "Hepatitis B",
 *         "Triple Viral",
 *         ...
 *       ],
 *       "calendarioNacional": [
 *         {
 *           "grupoEdad": "5-6 años",
 *           "vacuna": "Triple Bacteriana Celular",
 *           "dosis": [
 *             "Refuerzo"
 *           ]
 *         },
 *         {
 *           "grupoEdad": "2 meses",
 *           "dosis": [
 *             "1er Dosis",
 *             "3er Dosis"
 *           ]
 *         },
 *         ...
 *       ]
 *     },
 *     "resultado": "OK"
 *   }
 *
 *
 */


/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/aplicaciones-vacunas-ciudadano')
  .get(validate(paramValidation.webServices.nomivac.generic), aplicacionesVacunasCiudadanoCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/calendario-vacunas')
  .get(calendarioVacunasCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
