import Promise                  from 'bluebird'
import Joi                      from 'joi'
import logger                   from '../../../config/winston'
import paramValidation          from '../../../config/param-validation'
import User                     from '../../models/user'
import Roles                    from '../../models/roles'


/**
 * Create - Render Page Create Form
 * @param req - Request Object
 * @param res - Response Object
 */
function create(req, res) {
  Roles.list()
    .then((v) => {
      res.render('cpanel/users/form', {
        roles: v,
      })
    })
    .catch((e) => {
      logger.error('Controller::Admin::Users::Create::Roles:List')
      logger.error(e)
      res.render('cpanel/error_pages/404')
    })
}

/**
 * Store - Create New Item on database
 * @param req - Request Object
 * @param res - Response Object
 */
function store(req, res) {
  const params = {
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    su: req.body.su,
    role_id: req.body.role_id,
  }
  Joi.validate(params, paramValidation.adminUser.createUser, (err, value) => {
    if (err) {
      Roles.list()
        .then((v) => {
          res.render('cpanel/users/form', {
            roles: v,
            msj: { type: 'warning', msj: `Error al crear el Usuario ${err.message}`, },
          })
        })
        .catch((e) => {
          logger.error('Controller::Admin::Users::Store::JOI::Roles:List')
          logger.error(e)
          res.render('cpanel/error_pages/404')
        })
    } else {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        su: req.body.su,
        role_id: req.body.role_id,
      })
      user.saveAsync()
        .then((savedUser) => {
          res.redirect('/admin/cp/users')
        })
        .catch((e) => {
          logger.error('UsersController::UserSave:store')
          logger.error(e)
          Roles.list()
            .then((v) => {
              res.render('cpanel/users/form', {
                roles: v,
                msj: { type: 'warning', msj: `Error al crear el Usuario ${e.message}`, },
              })
            })
            .catch((e) => {
              logger.error('Controller::Admin::Users::Store::SaveAsync::Roles::List')
              logger.error(e)
              res.render('cpanel/error_pages/404')
            })
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
  User.list({ limit, skip, })
    .then((users) =>  {
      res.render('cpanel/users/list', {
        users: users,
      })
    })
    .catch((e) => {
      logger.error('Controller::Admin::Users::List::Users:List')
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
  Promise.all([
    Roles.list(),
    User.get(req.params.user_id),
    ])
    .then((r) => {
      res.render('cpanel/users/form', {
        roles: r[0],
        user: r[1],
      })
    })
    .catch((e) => {
      logger.error('Controller::Admin::Users::Edit:PromiseAll')
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
     surname: req.body.surname,
     username: req.body.username,
     email: req.body.email,
     su: req.body.su,
     role_id: req.body.role_id,
   }

  if (req.body.password) {
    params.password = req.body.password
  }

  Joi.validate(params, paramValidation.adminUser.updateUser, (err, value) => {
      if (err) {
        logger.log('debug', 'Controller::Admin::Users::Update::Joi')
        logger.log('debug', err)
        Promise.all([
            Roles.list(),
            User.get(req.params.user_id),
          ])
          .then((r) => {
            res.render('cpanel/users/form', {
              roles: r[0],
              user: r[1],
              msj: { type: 'warning', msj: `Falló la modificación de usuario ${err.message}`, },
            })
          })
          .catch((e) => {
            logger.error('Controller::Admin::Users::Update:PromiseAll')
            logger.error(e)
            res.render('cpanel/error_pages/404')
          })
      } else {
        User.get(req.params.user_id)
          .then((user) => {
            user.name = params.name
            user.surname = params.surname
            user.username = params.username
            user.email = params.email
            user.role_id = params.role_id
            user.su = params.su
            if (params.password) {
              user.password = params.password
            }

            user.saveAsync()
              .then((user) => {
                Roles.list()
                  .then((r) => {
                    res.render('cpanel/users/form', {
                      roles: r,
                      user: user,
                      msj: { type: 'success', msj: 'Usuario Modificado Correctamente', },
                    })
                  })
                  .catch((e) => {
                    logger.error('Controller::Admin::Users::Update::SaveAsync::RolesList')
                    logger.error(e)
                    res.render('cpanel/error_pages/404')
                  })
              })
              .catch((e) => {
                logger.error('Controller::Admin::Users::Update::SaveAsync')
                logger.error(e)
                Promise.all([
                    Roles.list(),
                    User.get(req.params.user_id),
                  ])
                  .then((r) => {
                    res.render('cpanel/users/form', {
                      roles: r[0],
                      user: r[1],
                      msj: { type: 'warning', msj: `Falló la modificación de usuario ${e.message}`, },
                    })
                  })
                  .catch((e) => {
                    logger.error('Controller::Admin::Users::Update::SaveUpdate::Catch::PromiseAll')
                    logger.error(e)
                    res.render('cpanel/error_pages/404')
                  })
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
  User.get(req.params.user_id)
    .then((user) =>  {
      user.removeAsync()
        .then((user) => {
          res.redirect('/admin/cp/users')
        })
        .catch((e) => {
          logger.error('UsersCtrl::Destroy::UserGet:SaveAsync')
          logger.error(e)
          res.render('cpanel/users/list', { msj: { type: 'danger', msj: 'Error al intentar eliminar Usuario', }, })
        })
    })
    .catch((e) => {
      logger.error('UsersCtrl::Destroy:UserGet')
      logger.error(e)
      res.render('cpanel/users/list', { msj: { type: 'warning', msj: 'El usuario no existe', }, })
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
