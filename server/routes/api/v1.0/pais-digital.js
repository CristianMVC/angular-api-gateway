import express                  from 'express'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import cache                    from '../../../../config/cache'
import APIError                 from '../../../helpers/APIError'
import paisDigitalCtrl          from '../../../controllers/v1.0/pais-digital'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/paisdigital/cursos/categorias Cursos Categorias
 * @apiName getCursosCategorias
 * @apiGroup Pais Digital Cursos
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} cuil
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "metadata": {
 *           "resultset": {
 *               "count": 10,
 *               "offset": 0,
 *               "limit": 0
 *           }
 *       },
 *       "results": [
 *           {
 *               "id": 94,
 *               "name": "Con tutoría",
 *               "idnumber": "",
 *               "description": "<p><img src=\"https://cursos-puntodigital.paisdigital.modernizacion.gob.ar/webservice/pluginfile.php/80647/coursecat/description/01-05.png\" alt=\"\" /><br /></p>",
 *               "descriptionformat": 1,
 *               "parent": 0,
 *               "sortorder": 10000,
 *               "coursecount": 25,
 *               "visible": 1,
 *               "visibleold": 1,
 *               "timemodified": 1550499027,
 *               "depth": 1,
 *               "path": "/94",
 *               "theme": ""
 *           },
 *       ]
 *   }
 */
router.route('/puntodigital/cursos/categorias')
  .get(validate(paramValidation.webServices.paisDigital.puntoDigital.cursos), paisDigitalCtrl.cursos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/paisdigital/cursos/usuario Cursos Usuario
 * @apiName getCursosUsuario
 * @apiGroup Pais Digital Cursos
 * @apiVersion  1.0.0
 *
 * @apiDescription WIP Falta caso de pruebas
 *
 * @apiParam  {String} cuil
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/puntodigital/cursos/usuario')
  .get(validate(paramValidation.webServices.paisDigital.puntoDigital.cursos), paisDigitalCtrl.usuario)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/paisdigital/cursos/usuario-cursos Usuario Cursos
 * @apiName getUsuarioCursos
 * @apiGroup Pais Digital Cursos
 * @apiVersion  1.0.0
 *
 * @apiDescription WIP Falta caso de pruebas
 *
 * @apiParam  {String} cuil
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/puntodigital/cursos/usuario-cursos')
	.get(validate(paramValidation.webServices.paisDigital.puntoDigital.cursos), paisDigitalCtrl.usuarioCursos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
