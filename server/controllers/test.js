import Test from '../models/tests'
import moment from 'moment'
import ApiResponse from '../helpers/APIStandarResponses'
import APIError from '../helpers/APIError'


/**
 * Get user list.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Test[]} - List of Test's Objects
 */
function list(req, res, next) {
  const limit = (req.query.limit) ? parseInt(req.query.limit) : 50,
    offset = (req.query.limit) ? parseInt(req.query.offset) : 0

  Test.list({ limit, offset, })
    .then((v) => res.json(ApiResponse.list(offset, limit, v)))
    .catch((e) => next(APIError({ status: 500, devMessage: e.message, })))
}


/**
 * Get user
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {object} - User Objects
 */
function get(req, res, next) {
  Test.get(req.params.test_id)
    .then((v) => res.json(v))
    .catch((e) => next(APIError({ status: 404, devMessage: e.message, })))
}


/**
 * Create new user
 * @param {object} req - Request.
 * @param {object} res - Response.
 * @param {function} next - next.
 * @return {Test} - Test's Object
 */
function create(req, res, next) {
  const test = new Test({
    name: req.body.name,
    description: req.body.description,
    access_to_admin: req.body.access_to_admin,
    access_to_api: req.body.access_to_api,
    delete: req.body.delete,
    update: req.body.update,
    read: req.body.read,
    create: req.body.create,
  })

  test.saveAsync()
    .then((v) => res.json(v))
    .catch((e) => next(APIError({ status: 500, devMessage: e.message, })))
}


/**
 * Update existing user
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Test} - Test's Object
 */
function update(req, res, next) {
  Test.get(req.params.test_id)
    .then((v) => {
      v.name = req.body.name
      v.description = req.body.description
      v.access_to_admin = req.body.access_to_admin
      v.access_to_api = req.body.access_to_api
      v.updated_at = moment()
      v.delete = req.body.delete
      v.update = req.body.update
      v.read = req.body.read
      v.create = req.body.create

      v.saveAsync()
        .then((v) => res.json(v))
        .catch((e) => next(APIError({ status: 500, devMessage: e.message, })))
    })
    .catch((e) => next(APIError({ status: 400, devMessage: e.message, })))


  // Test
  //   .findOneAndUpdateAsync({
  //       '_id': req.params.test_id, // eslint-disable-line
  //     },
  //     {
  //       delete: true,
  //     },
  //     {
  //       new: true,
  //       upsert: true,
  //     }
  //   )
  //   .then((v) => res.json(v))
  //   .catch((e) => res.json(e))
}


/**
 * Delete Test.
 * @param {object} req - Request
 * @param {object} res - Response
 * @param {function} next - Next
 * @return {Test} - Test Object
 */
function remove(req, res, next) {
  Test.get(req.params.test_id)
    .then((v) => {
      v.removeAsync()
        .then((v) => res.json(v))
        .catch((e) => next(APIError({ status: 500, devMessage: e.message, })))
    })
    .catch((e) => next(APIError({ status: 404, devMessage: e.message, })))
}


export default {
  list,
  get,
  create,
  update,
  remove,
}
