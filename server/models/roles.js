import logger               from '../../config/winston'
import moment               from 'moment'
import mongoose             from 'mongoose'
import Permissions          from './permissions'
import Promise              from 'bluebird'


const Schema = mongoose.Schema

mongoose.Promise = Promise

const RoleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  access_to_admin: {
    type: Boolean,
    default: false,
  },
  access_to_api: {
    type: Boolean,
    default: false,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  created_at: {
    type: Date,
    default: moment(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
})


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * Methods
 */


/**
 * Statics
 */
RoleSchema.statics = {
  /**
   * Get user by Id
   * @param id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('permissions', '-__v -deleted_at')
      .execAsync()
      .then((v) => {
        if (v) {
          return v
        }
        return Promise.reject('No such Role exists!')
      })
  },

  /**
   * List roles in ascending order of 'name'
   * @param {number} offset - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise}
   */
  list({ limit = 50, offset = 0, } = {}) {
    return this.find()
      .select('-__v -deleted_at -permissions')
      .sort({
        name: 1,
      })
      .skip(offset)
      .limit(limit)
      .execAsync()
  },

  /**
   * List roles with Permissions in ascending order of 'name'
   * @param {number} offset - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise}
   */
  listWithPermissions({ limit = 50, offset = 0, } = {}) {
    return this.find()
      .select('-__v -deleted_at')
      .populate('permissions')
      .sort({
        name: 1,
      })
      .skip(offset)
      .limit(limit)
      .execAsync()
  },

  /**
   * hasAccess to Admin
   * @param {Object} id - The objectId of user.
   * @returns {Boolean}
   */
  hasAccessToAdmin(id) {
    return this.findById(id)
      .execAsync()
      .then((v) => v.access_to_admin)
      .catch((e) => Promise.reject(e))
  },

  /**
   * hasAccess to Api
   * @param {Object} id - The objectId of user.
   * @returns {Boolean}
   */
  hasAccessToApi(id) {
    return this.findById(id)
      .execAsync()
      .then((v) => v.access_to_api)
      .catch((e) => Promise.reject(e))
  },


  /**
   * removeRole - Remove a Role and Permissions
   * @param id - RoleId
   * @param cb - CallBack
   */
  removeRole(id, cb) {
    logger.log('debug', 'Model::Roles::removeRole')
    return this.findById(id)
      .execAsync()
      .then((r) => {
        logger.log('debug', 'Model::Roles::removeRole::findById::Then')
        logger.log('debug', '%j', r)
        if (r) {
          Permissions
            .find({ role_id: r._id, })
            .removeAsync()
              .then(() => {
                r.removeAsync()
                  .then((v) => {
                    logger.log('debug', 'Model::Roles::Permissions')
                    logger.log('debug', '%j', v)
                    cb(false, v)
                  })
                  .catch((e) => {
                    logger.error('Model::Roles::Permissions')
                    logger.error(e)
                    cb(true, e)
                  })
              })
              .catch((e) => {
                logger.error('Model::Roles')
                logger.error(e)
                cb(true, e)
              })
        } else {
          cb(true, 'No such Role exists!')
        }
      })
      .catch((e) => {
        logger.error('Model::Roles')
        logger.error(e)
        cb(true, e)
      })
  },
}


export default mongoose.model('Role', RoleSchema)
