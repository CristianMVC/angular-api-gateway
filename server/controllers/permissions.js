import Permissions          from '../models/permissions'
import Roles                from '../models/roles'
import logger               from '../../config/winston'
import moment               from 'moment'
import ApiResponse          from '../helpers/APIStandarResponses'
import APIError             from '../helpers/APIError'


/**
 * Get permission
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - User Objects
 */
function get(req, res, next) {
	logger.log('Controller::Permissions::Get')
  Permissions.get(req.params.role_id, req.params.permission_id)
    .then((_p) => {
      res.json({
        _id: _p._id,
        role_id: _p._id,
        key: _p.key,
        create: _p.create,
        read: _p.read,
        update: _p.update,
        delete: _p.delete,
        created_at: _p.created_at,
        updated_at: _p.updated_at,
      })
    })
    .catch((e) => {
      logger.error('Controller::Permissions::Get:Catch')
      logger.error(e)
      next(APIError({ status: 404, devMessage: e.message, }))
    })
}


/**
 * Create new Permission
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - Permission's Object
 */
function create(req, res, next) {
	logger.log('debug', 'Controller::Permissions:Create')

  const permission = new Permissions({
    role_id: req.params.role_id,
    key: req.body.key,
    create: req.body.create,
    read: req.body.read,
    update: req.body.update,
    delete: req.body.delete,
  })

  Roles.get(req.params.role_id)
    .then((_r) => {
      permission.saveAsync()
        .then((_p) => {
          _r.permissions.push({
            _id: _p._id,
          })

          _r.saveAsync()
            .then((v) => {
              res.json({
                _id: _p._id,
                role_id: v._id,
                key: _p.key,
                create: _p.create,
                read: _p.read,
                update: _p.update,
                delete: _p.delete,
                created_at: _p.created_at,
                updated_at: _p.updated_at,
              })
            })
            .catch((e) => {
              logger.error('Controller::Permissions::Create::SaveRole')
              logger.error(e)
              next(APIError({ status: 500, devMessage: e.message, }))
            })
        })
        .catch((e) => {
          logger.error('Controller::Permissions:Get')
          logger.error(e)
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::Permissions::Create::Roles::Get')
      logger.error(e)
      next(APIError({ status: 404, }))
    })
}


/**
 * Update existing Permission
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - Permission's Object
 */
function update(req, res, next) {
	logger.log('debug', 'Controller::Permissions::Update')
  Permissions.get(req.params.role_id, req.params.permission_id)
    .then((v) => {
      v.key = req.body.key
      v.create = req.body.create
      v.read = req.body.read
      v.update = req.body.update
      v.delete = req.body.delete
      v.updated_at = moment()

      v.saveAsync()
        .then((v) => {
          res.json({
            _id: v._id,
            key: v.key,
            create: v.create,
            read: v.read,
            update: v.update,
            delete: v.delete,
            created_at: v.created_at,
            updated_at: v.updated_at,
          })
        })
        .catch((e) => {
          logger.error('Controller::Permissions::Update::Get:SaveAsync')
          logger.error(e)
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.info('Controller::Permissions::Get')
      next(APIError({ status: 404, devMessage: e.message, }))
    })
}


/**
 * Get Permission list.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {list} - List of Permission's Objects
 */
function list(req, res, next) {
  logger.log('debug', 'Controller::Permissions:List')

  const limit = (req.query.limit) ? parseInt(req.query.limit) : 50,
        offset = (req.query.limit) ? parseInt(req.query.offset) : 0,
        role_id = req.params.role_id

  Permissions.list({ limit, offset, role_id, })
    .then((v) => {
      res.json(ApiResponse.list(limit, offset, v))
    })
    .catch((e) => {
      logger.error('Controller::Permissions::List:getList')
      logger.error(e)
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


/**
 * Delete Permission.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - Permission Object
 */
function remove(req, res, next) {
	logger.log('debug', 'Controller::Permissions::Delete')
  Permissions.get(req.params.role_id, req.params.permission_id)
    .then((v) => {
      v.removeAsync()
        .then((v) => {
          res.json({
            _id: v._id,
            key: v.key,
            create: v.create,
            read: v.read,
            update: v.update,
            delete: v.delete,
            created_at: v.created_at,
            updated_at: v.updated_at,
            deleted_at: moment(),
          })
        })
        .catch((e) => {
          logger.error('Controller::Roles::Delete::Get:RemoveAsync')
          logger.error(e)
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.info('Controller::Permissions::Get:Catch')
      next(APIError({ status: 404, devMessage: e.message, }))
    })
}


export default {
  get,
  create,
  update,
  list,
  remove,
}
