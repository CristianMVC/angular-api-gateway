import express                    from 'express'
import validate                   from 'express-validation'
import paramValidation            from '../../../config/param-validation'
import authCtrl                   from '../../controllers/auth'

const router = express.Router()	// eslint-disable-line new-cap

/**
 *
 * @api {POST} auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiVersion  1.0.0
 *
 * @apiParam {String} username
 * @apiParam {String} password
 *
 * @apiSuccess (200) {String} token JWT de Autorización
 * @apiSuccess (200) {String} token_type Tipo de token
 * @apiSuccess (200) {Numeric} expires_in Tiempo de expiración en Segundos
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *    "token" : "JWT",
 *    "token_type": "bearer",
 *    "expires_in": 3600
 *  }
 *
 *
 */
router.route('/login')
  .post(validate(paramValidation.apiAuth.login), authCtrl.login)


export default router
