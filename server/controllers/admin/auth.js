import User                         from '../../models/user'
import Roles                        from '../../models/roles'
import Permissions                  from '../../models/permissions'
import logger                       from '../../../config/winston'
import config                       from '../../../config/env'
import Joi                          from 'joi'
import paramValidation              from '../../../config/param-validation'

/**
 * This method set the user's session
 * @param req - Request
 * @param res - Response
 */
function signIn(req, res) {
  const email = req.body.email
  const pass = req.body.password
  const referer = (typeof req.body.referer === 'undefined') ? '/admin/cp/dashboard' : req.body.referer

  Joi.validate({ email: email, password: pass, }, paramValidation.adminAuth.signIn, (err, value) => {
    if (err) {
      res.render('login', { msj: 'Invalid Email or Password', })
    } else {
      User.validateUserCredentials(email, pass)
        .then((user) => {
          if (user) {
            //Get Roles and Permissions
            Roles.get(user.role_id)
              .then((r) => {
                // Permissions
                Permissions.list(user.role_id)
                  .then((p) => {
                    user.role = r
                    user.role.permissions = p
                    logger.log('debug', 'Controlllers::Admin::Auth::signIn::RolesPermissions::User')
                    logger.log('debug', '%j', user)
                    // Validate Access to Admin
                    if (r.access_to_admin || user.su) {
                      req.session.user = user
                      res.redirect(referer)
                    } else {
                      logger.error('validateUserCredentialsFail::User have not permission to access control panel')
                      res.render('login', { msj: { type: 'danger', msj: 'Usuario o Contraseña inválidos', }, })
                    }
                  })
              })
              .catch((e) => {
                logger.error('Admin::Auth::validateUserCredentials::Roles:Get')
                logger.error('User: %j', user)
                logger.error(e)
                res.render('login', { msj: { type: 'danger', msj: 'Usuario o Contraseña inválidos', }, })
              })
          } else {
            logger.error('validateUserCredentials Fail')
            res.render('login', { msj: { type: 'danger', msj: 'Usuario o Contraseña inválidos', }, })
          }
        })
        .catch((e) => {
          logger.error('Admin::Auth::validateUserCredentials')
          logger.error(e)
          res.render('login', { msj: { type: 'danger', msj: 'Usuario o Contraseña inválidos', }, })
        })
    }
  })
}

/**
 * This method close the user's session
 * @param req - Request
 * @param res - Response
 */
function signOut(req, res) {
  // Destroy User's Session:
  req.session.destroy()
  res.redirect(config.locals.baseURL + '/admin')
}

export default {
  signIn,
  signOut,
}