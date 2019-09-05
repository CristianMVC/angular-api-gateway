import jwt                    from 'jsonwebtoken'
import config                 from '../../config/env'
import logger                 from '../../config/winston'
import APIError               from '../helpers/APIError'
import User                   from '../models/user'
import Role                   from '../models/roles'


/**
 * Returns jwt token if valid username and password is provided
 * @param req - Request
 * @param res - Response
 * @param next - Next Middleware
 * @returns {*}
 */
function login(req, res, next) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err

    if (!user) {
      next(APIError({ status: 401, isPublic: true, }))
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          Role.get(user.role_id)
            .then((r) => {
              if (r.access_to_api || user.su) {
                // Payload
                const payload = {
                  name: user.name,
                  surname: user.surname,
                  username: user.username,
                  email: user.email,
                  uri: user.role_id,
                }

                // Create token if the password matched and no error was thrown
                jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expire, }, (e, token) => {
                  if (e) {
                    next(APIError({ status: 500, message: 'Fallo de autenticación', devMessage: e.message, }))
                    return
                  }

                  res.status(200).json({
                    token: token,
                    token_type: 'Bearer',
                    expires_in: config.jwt.expire,
                  })
                })
              } else {
                next(APIError({ status: 404, isPublic: true, }))
              }
            })
            .catch((e) => {
              logger.info('API::Auth::Role::NotAccessToApi')
              next(APIError({ status: 404, devMessage: e.message, isPublic: true, }))
            })
        } else {
          logger.info('API::Auth::JWT:Password did not match')
          next(APIError({ status: 401, isPublic: true, }))
        }
      })
    }
  })
}



export default {
  login,
}
