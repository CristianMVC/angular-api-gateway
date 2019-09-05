import express from 'express'
import validate from 'express-validation'
import seguridadVialCtrl from '../../../controllers/v2.0/seguridad-vial'
import paramValidation from '../../../../config/param-validation'
import APIError from '../../../helpers/APIError'
import { pgMiddleware, } from '../../../middelwares/pgMiddleware'
import { pgModelList, } from '../../../models/pg-utils'
const router = express.Router()	// eslint-disable-line new-cap

/**
 * '/licencia-nacional-digital'
 */
router.route('/licencia-nacional-digital')
  .get(pgMiddleware(pgModelList.licenciaV2, null, true), validate(paramValidation.webServices.seguridadVial.licenciaDigital), seguridadVialCtrl.licenciaDigital)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
