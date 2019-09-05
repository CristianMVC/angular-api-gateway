import express                        from 'express'
import simboloAutomotorCtrl           from '../../../controllers/v2.0/andis/simbolo-automotor'
import APIError                       from '../../../helpers/APIError'
import { tcMiddleware, }              from '../../../middelwares/tcMiddleware'
//import { idTokenMiddleware, }              from '../../../middelwares/tokenMiddleware'
import { pgModelList, }               from '../../../models/pg'

const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/simbolo-automotor/beneficiario')
  .get(tcMiddleware(pgModelList.simboloAutomotorV2), simboloAutomotorCtrl.getBeneficiary)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

  export default router