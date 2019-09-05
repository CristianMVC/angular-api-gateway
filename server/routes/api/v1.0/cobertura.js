import express              from 'express'
import { asyncMiddleware, } from '../../../middelwares/asyncMiddleware'
import coberturaCtrl        from '../../../controllers/v1.0/cobertura'
import APIError             from '../../../helpers/APIError'
import { pgMiddleware, }    from '../../../middelwares/pgMiddleware'
import { tcMiddleware, }    from './../../../middelwares/tcMiddleware'
import { pgModelList, }     from './../.././../models/pg-utils'

const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/federador/coberturas Federador Coberturas GET
 * @apiName getFederadorCoberturas
 * @apiGroup Federador Coberturas
 * @apiVersion  1.0.0
 *
 * @apiDescription WIP
 *
 * @apiUse AuthHeaders
 *
 */
router.route('/')
	.get(
    tcMiddleware(pgModelList.cobertura),
    pgMiddleware(pgModelList.cobertura),
    asyncMiddleware(coberturaCtrl.get)
  )
  /** 405 - Method Not Allowed */
    .post((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
