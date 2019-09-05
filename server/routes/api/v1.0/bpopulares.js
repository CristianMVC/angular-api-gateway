import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import bPopularesCtrl                 from '../../../controllers/v1.0/barrios-populares'
//import APIResponse                  from '../../../helpers/APIStandarResponses'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Caché
 **/
router.route('/*').get(cache.route())

/**
 * Routes
 **/
/**
 * @api {GET} v1.0/barrios-populares/consultar-padron Consultar Padron
 * @apiName getConsultarPadron
 * @apiGroup Barrios-Populares
 * @apiVersion 1.0.0
 *
 * @apiDeprecated
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dni
 * @apiParam  {String} fecha_nacimiento
 */
router.route('/consultar-padron')
  .get(validate(paramValidation.webServices.bpopulares.consultarPadron), bPopularesCtrl.consultarPadron)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/barrios-populares/ Consultar Barrios
 * @apiName getConsultarBarrios
 * @apiGroup Barrios-Populares
 * @apiVersion 1.0.0
 *
 * @apiDeprecated
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 */
router.route('/')
/** GET - Get list of Clients */
  .get(validate(paramValidation.webServices.bpopulares.listBarriosPopulares), bPopularesCtrl.list)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/barrios-populares/localidades Consultar Localidades
 * @apiName getConsultarlocalidades
 * @apiGroup Barrios-Populares
 * @apiVersion 1.0.0
 *
 * @apiDeprecated
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 */
router.route('/localidades')
/** GET - Get list of Clients */
  .get(validate(paramValidation.webServices.bpopulares.listLocalidades), bPopularesCtrl.list_localidades)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
