import express                                         from 'express'
import validate                                        from 'express-validation'
import paramValidation                                 from '../../../../config/param-validation'
import APIError                                        from '../../../helpers/APIError'
import analiticasCtrl                                  from '../../../controllers/v2.0/analiticas'
import {
    optionalIdTokenMiddleware as idTokenMiddleware,
}                                                      from '../../../middelwares/tokenMiddleware'


const router = express.Router() // eslint-disable-line new-cap

/**
 *
 * @api {POST} v2.0/analiticas  Nuevo Registro
 * @apiName analiticas
 * @apiGroup ANALITICAS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}    evento     Nombre del evento
 * @apiParam  {String}    origen     Nombre de origen
 * @apiParam  {String}    pagina     Nombre de la página
 * @apiParam  {Object}    metadata   Información adicional
 *
 */


/** -------------------------------------
 * Routes
 ** ------------------------------------*/

router.route('/')
    .post(idTokenMiddleware, validate(paramValidation.webServices.analiticas.registro), analiticasCtrl.registro)
    .get((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

export default router