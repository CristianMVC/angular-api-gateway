import express                      from 'express'
import mapaChatbotCtrl              from '../../../controllers/v2.0/salud/mapaCentroSaludChatbot'
import APIError                     from '../../../helpers/APIError'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Routes
 **/

router.route('/mapa/chatbot')
  .get(validate(paramValidation.webServices.salud.chatbot), mapaChatbotCtrl.getElement)
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
