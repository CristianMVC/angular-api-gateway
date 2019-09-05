/**
 * Roles-Permissions Middlewares.
 * Valida si el usuario tiene acceso al endPoint mediante la Key del endPoint y el Rol
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
import Users from '../models/user'
import Roles from '../models/roles'
import Permissions from '../models/permissions'
import ApiError from '../helpers/APIError'


function hasAccess(roleId, isApi) {
  if (isApi)
    return Roles.hasAccessToApi(roleId)
  else
    return Roles.hasAccessToAdmin(roleId)
}


export default function (endPointKey, redirectUri = null) {
  const isApi = !(redirectUri)
  return (req, res, next) => {
    const email = (isApi) ? req.user.email : req.session.user.email
    const roleId = (isApi) ? req.user.uri : req.session.user.role_id

    Users.isSudo(email)
      .then((v) => {
        if (v)
          next()
        else
          hasAccess(roleId, isApi)
            .then((v) => {
              if (v)
                Permissions.hasPermission(roleId, endPointKey)
                  .then((v) => {
                    if ((req.method === 'GET' && v.read) ||
                      (req.method === 'POST' && v.create) ||
                      (req.method === 'PUT' && v.update) ||
                      (req.method === 'DELETE' && v.delete)) {
                      return next()
                    }

                    if (isApi)
                      return next(ApiError({ status: 403, errorCode: 100, }))
                    else
                    return res.redirect(redirectUri)
                  })
                  .catch((e) => {
                    if (isApi)
                      return next(ApiError({ status: 500, message: e.message, }))
                    else
                      return res.redirect(redirectUri)
                  })
              else if (isApi)
                return next(ApiError({ status: 403, }))
              else
                return res.redirect(redirectUri)
            })
            .catch((e) => {
              if (isApi)
                return next(ApiError({ status: 500, message: e.message, }))
              else
                return res.redirect(redirectUri)
            })
      })
      .catch((e) => {
        if (isApi)
          return next(ApiError({ status: 500, message: e.message, }))
        else
          return res.redirect(redirectUri)
      })
  }
}

