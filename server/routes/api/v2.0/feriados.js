import express                                         from 'express'
import validate                                        from 'express-validation'
import paramValidation                                 from '../../../../config/param-validation'
import APIError                                        from '../../../helpers/APIError'
import feriadosCtrl                                    from '../../../controllers/v2.0/feriados'


const router = express.Router() // eslint-disable-line new-cap

/** -------------------------------------
 * Routes
 ** ------------------------------------*/

/**
 *
 * @api {GET} v2.0/feriados  Feriados
 * @apiName feriados
 * @apiGroup FERIADOS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 *
 */

router.route('/')
    .get(feriadosCtrl.getAllHolidays)
    .post((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/feriados/mes/:mes  Feriados de un mes
 * @apiName feriadosMonth
 * @apiGroup FERIADOS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}    [marzo]  mes
 *
 */

router.route('/mes/:month')
    .get(
        validate(paramValidation.webServices.feriadosV2.holidaysByMonth),
        feriadosCtrl.getAllHolidaysByMonth
    )
    .post((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/feriados/dia/:fecha  Feriados de un día específico
 * @apiName feriadosFecha
 * @apiGroup FERIADOS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}    fecha
 */

router.route('/dia/:date')
    .get(
        validate(paramValidation.webServices.feriadosV2.holidaysByDay),
        feriadosCtrl.getHolidaysByDay
    )
    .post((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/feriados/:desde/hasta/:hasta  Feriados de un rango de fechas
 * @apiName feriadosRange
 * @apiGroup FERIADOS
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}    desde
 * @apiParam  {String}    hasta
 */

router.route('/:from/hasta/:to')
    .get(
        validate(paramValidation.webServices.feriadosV2.holidaysByRange),
        feriadosCtrl.getAllHolidaysByRange
    )
    .post((req, res, next) => next(APIError({ status: 405, })))
    .put((req, res, next) => next(APIError({ status: 405, })))
    .delete((req, res, next) => next(APIError({ status: 405, })))

export default router