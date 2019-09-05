import { assign, concat, } from 'lodash'
import Promise from 'bluebird'
import logger from '../../../config/winston'
import Role from '../../models/roles'
import Permission from '../../models/permissions'
import configRolesPermissions from '../../../config/roles-permissions'


/**
 * List - Render Page List
 * @param req - Request Object
 * @param res - Response Object
 */
function list(req, res) {
  const { limit = 50, skip = 0, } = req.query
  Role.list({ limit, skip, })
    .then((v) => res.render('cpanel/permissions/list', { roles: v, }))
    .catch((e) => res.render('cpanel/error_pages/500'))
}


/**
 * Render Page - Render Page Edit Form with Item Data
 * @param req - Request Object
 * @param res - Response Object
 * @param msj - Optional User Message
 */
function renderPage(req, res, { msj = undefined, } = {}) {
  Role
    .get(req.params.role_id)
    .then((r) => {
      const pl = {}
      r.permissions.map((o) => {
        const aux = {}
        aux[o.key] = {}
        aux[o.key]['create'] = o.create
        aux[o.key]['read'] = o.read
        aux[o.key]['update'] = o.update
        aux[o.key]['delete'] = o.delete
        assign(pl, aux)
      })
      res.render('cpanel/permissions/form', {
        permissions: pl,
        role: {
          id: r._id,
          name: r.name,
        },
        accessToAdmin: r.access_to_admin,
        accessToApi: r.access_to_api,
        keys: configRolesPermissions.keys,
        msj: msj,
      })
    })
    .catch((e) => {
      logger.error('Controller::Admin::Permissions::Edit:RoleGet')
      logger.error(e)
      res.render('cpanel/error_pages/500')
    })
}


/**
 * Edit - Render Page Edit Form with Item Data
 * @param req - Request Object
 * @param res - Response Object
 */
function edit(req, res) {
  renderPage(req, res)
}


/**
 * Update - Update Item
 * @param req - Request Object
 * @param res - Response Object
 * Description: Este metodo busca los Permisos Creados y los Actualiza, si no existen los crea.
 */
function update(req, res) {
  const params = req.body
  const pathKeys = concat(configRolesPermissions.keys.admin, configRolesPermissions.keys.api)
  const pAll = []

  Role
    .get(req.params.role_id)
    .then((r) => {
      pathKeys.map((k) => {
        let optCreate, optRead, optUpdate, optDelete

        if (params[k.key]) {
          optCreate = !!params[k.key]['create']
          optRead = !!params[k.key]['read']
          optUpdate = !!params[k.key]['update']
          optDelete = !!params[k.key]['delete']
        } else {
          optCreate = false
          optRead = false
          optUpdate = false
          optDelete = false
        }

        pAll.push(
          Permission
            .findOneAndUpdateAsync({
                role_id: r._id,
                key: k.key,
              },
              {
                create: optCreate,
                read: optRead,
                update: optUpdate,
                delete: optDelete,
              },
              {
                new: true,
                upsert: true,
              }
            )
        )
      })

      Promise.all(pAll)
        .then((v) => {
          r.permissions = v.map((o) => o._id)
          r.saveAsync()
            .then((v) => renderPage(req, res, { msj: { type: 'success', msj: 'Permisos Editados Correctamente', }, }))
            .catch((e) => renderPage(req, res, { msj: { type: 'danger', msj: 'Error al Editar Permisos', }, }))
        })
        .catch((e) => renderPage(req, res, { msj: { type: 'danger', msj: 'Error al Editar Permisos', }, }))
    })
    .catch((e) => res.render('cpanel/error_pages/500'))
}


export default {
  list,
  edit,
  update,
}
