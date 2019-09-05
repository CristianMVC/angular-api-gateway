import Joi                      from 'joi'
import logger                   from '../../../config/winston'
import paramValidation          from '../../../config/param-validation'
import Role                     from '../../models/roles'


/**
 * Create - Render Page Create Form
 * @param req - Request Object
 * @param res - Response Object
 */
function create(req, res) {
  res.render('cpanel/roles/form')
}


/**
 * Store - Create New Item on database
 * @param req - Request Object
 * @param res - Response Object
 */
function store(req, res) {
  const params = {
    name: req.body.name,
    description: req.body.description,
    access_to_admin: req.body.access_to_admin,
    access_to_api: req.body.access_to_api,
  }
  Joi.validate(params, paramValidation.adminRoles.create, (err, value) => {
    if (err) {
      res.render('cpanel/roles/form', {
        msj: { type: 'warning', msj: 'Falló la creación del Role: ' + err.message, },
      })
    } else {
      const role = new Role({
        name: req.body.name,
        description: req.body.description,
        access_to_admin: req.body.access_to_admin,
        access_to_api: req.body.access_to_api,
      })
      role.saveAsync()
        .then((saved) => {
          res.render('cpanel/roles/form', {
            msj: { type: 'success', msj: `Role "${saved.name}" Creado Correctamente`, },
          })
        })
        .catch((e) => {
          logger.error('Controller::Admin::Roles::RoleSave:store')
          logger.error(e)
          res.render('cpanel/roles/form', { msj: { type: 'warning', msj: 'Error al crear el Role', }, })
        })
    }
  })
}


/**
 * List - Render Page List
 * @param req - Request Object
 * @param res - Response Object
 */
function list(req, res) {
  const { limit = 50, skip = 0, } = req.query
  Role.list({ limit, skip, })
    .then((v) =>  {
      res.render('cpanel/roles/list', {
        roles: v,
      })
    }).catch((e) => {
      logger.error('Controller::Admin::Roles::list')
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
  Role.get(req.params.role_id)
    .then((v) =>  {
      res.render('cpanel/roles/form', {
        role: v,
      })
    }).catch((e) => {
      logger.error('Controller::Admin::Roles::Edit:RoleGet')
      logger.error(e)
      res.render('cpanel/error_pages/404')
    })
}


/**
 * Update - Update Item
 * @param req - Request Object
 * @param res - Response Object
 */
function update(req, res) {
   const params = {
     name: req.body.name,
     description: req.body.description,
     access_to_admin: req.body.access_to_admin,
     access_to_api: req.body.access_to_api,
   }

  Joi.validate(params, paramValidation.adminRoles.update, (err, value) => {
      if (err) {
        logger.error('Controller::Admin::Roles::Update')
        logger.error(err)
        Role.get(req.params.role_id)
          .then((v) =>  {
            res.render('cpanel/roles/form', {
              role: v,
              msj: { type: 'warning', msj: 'Falló la modificación del Role', },
            })
          })
      } else {
        Role.get(req.params.role_id)
          .then((role) => {
            role.name = params.name
            role.description = params.description
            role.access_to_admin = params.access_to_admin
            role.access_to_api = params.access_to_api

            role.saveAsync()
              .then((v) => {
                res.render('cpanel/roles/form', {
                  role: v,
                  msj: { type: 'success', msj: `Role "${v.name}" Editado Correctamente`, },
                })
              })
              .catch((e) => {
                logger.error('RolesCtrl::Update:SaveAsync')
                logger.error(e)
                res.render('cpanel/roles/form', { msj: { type: 'danger', msj: 'El usuario no pudo ser modificado', }, })
              })
          })
      }
  })
}


/**
 * Destroy - Destroy Item
 * @param req - Request Object
 * @param res - Response Object
 */
function destroy(req, res) {
  Role.removeRole(req.params.role_id, (err, v) => {
    logger.log('debug', 'Controller::Roles::RemoveRole')
    if (err) {
      logger.error('RolesCtrl::Destroy::RoleGet:SaveAsync')
      logger.error(err)
      res.render('cpanel/roles/list', { msj: { type: 'danger', msj: 'Error al intentar eliminar el Role', }, })
    } else {
      res.redirect('/admin/cp/roles')
    }
  })
}



export default {
  create,
  store,
  list,
  edit,
  update,
  destroy,
}
