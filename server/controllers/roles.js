import Role               from '../models/roles'
import logger             from '../../config/winston'
import moment             from 'moment'
import ApiResponse        from '../helpers/APIStandarResponses'
import APIError           from '../helpers/APIError'

/**
 * Get user
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - User Objects
 */
function get(req, res, next) {
  logger.log('debug', 'Controller::Roles:Get')

  Role.get(req.params.role_id)
    .then((v) => {
      res.json({
        _id: v._id,
        name: v.name,
        description: v.description,
        access_to_admin: v.access_to_admin,
        access_to_api: v.access_to_api,
        created_at: v.created_at,
        updated_at: v.updated_at,
      })
    })
    .catch((e) => {
      logger.error('Controller::Roles::Get:Catch')
      next(APIError({ status: 404, devMessage: e.message, }))
    })
}


/**
 * Create new user
 * @param {object} req - Request.
 * @param {object} res - Response.
 * @param {function} next - next.
 * @return {Role} - Role's Object
 */
function create(req, res, next) {
  logger.log('debug', 'Controller::Roles:Create')

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    access_to_admin: req.body.access_to_admin,
    access_to_api: req.body.access_to_api,
  })

  role.saveAsync()
    .then((v) => {
      res.json({
        _id: v._id,
        name: v.name,
        description: v.description,
        access_to_admin: v.access_to_admin,
        access_to_api: v.access_to_api,
        created_at: v.created_at,
        updated_at: v.updated_at,
      })
    })
    .catch((e) => {
      logger.error('Controller::Roles::Create::SaveAsync')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


/**
 * Update existing user
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Role} - Role's Object
 */
function update(req, res, next) {
  logger.log('debug', 'Controller::Roles:Update')

  Role.get(req.params.role_id)
    .then((v) => {
      v.name              = req.body.name
      v.description       = req.body.description
      v.access_to_admin   = req.body.access_to_admin
      v.access_to_api     = req.body.access_to_api
      v.updated_at        = moment()

      v.saveAsync()
        .then((v) => {
          res.json({
            _id: v._id,
            name: v.name,
            description: v.description,
            access_to_admin: v.access_to_admin,
            access_to_api: v.access_to_api,
            created_at: v.created_at,
            updated_at: v.updated_at,
          })
        })
        .catch((e) => {
          logger.error('Controller::Roles::Update::Get:SaveAsync')
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::Roles::Update:Get')
      next(APIError({ status: 400, devMessage: e.message, }))
    })
}


/**
 * Get user list.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Role[]} - List of Role's Objects
 */
function list(req, res, next) {
  logger.log('debug', 'Controller::Roles:List')

  const limit = (req.query.limit) ? parseInt(req.query.limit) : 50,
        offset = (req.query.limit) ? parseInt(req.query.offset) : 0

  Role.list({ limit, offset, })
    .then((v) => {
      res.json(ApiResponse.list(offset, limit, v))
    })
    .catch((e) => {
      logger.error('Controller::Roles::List:getList')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


/**
 * Delete role.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Role} - Role Object
 */
function remove(req, res, next) {
  logger.log('debug', 'Controller::Roles:Delete')

  Role.removeRole(req.params.role_id, (err, v) => {
    logger.log('debug', 'Controller::Roles::RemoveRole')

    if (err) {
      logger.error('Controller::Roles::RemoveRole %j', v)
      next(APIError({ status: 500, devMessage: v, }))
    } else {
      res.json({
        _id: v._id,
        name: v.name,
        description: v.description,
        access_to_admin: v.access_to_admin,
        access_to_api: v.access_to_api,
        created_at: v.created_at,
        updated_at: v.updated_at,
        deleted_at: moment(),
      })
    }
  })
}


export default {
  get,
  create,
  update,
  list,
  remove,
}
