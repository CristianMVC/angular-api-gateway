import moment               from 'moment'
import mongoose             from 'mongoose'
import Promise              from 'bluebird'


const Schema = mongoose.Schema

mongoose.Promise = Promise

const PermissionSchema = new Schema({
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  key: {
    type: String,
    required: true,
  },
  create: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
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
PermissionSchema.statics = {
  /**
   * Get user by Id
   * @param role_id - The objectId of Role.
   * @param permission_id - The objectId of Permission.
   * @returns {Promise}
   */
  get(role_id, permission_id) {
    return this.findById(permission_id)
      .select('-__v')
      .where({ role_id: role_id, })
      .execAsync()
      .then((user) => {
        if (user) {
          return user
        }
        return Promise.reject('No such Permission exists!')
      })
  },

  /**
   * List permissions in ascending order of 'createdAt' timestamp.
   * @param {number} offset - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @param {Object} role_id - Role Id.
   * @returns {Promise}
   */
  list({ offset = 0, limit = 50, role_id, } = {}) {
    return this.find()
      .where({ role_id: role_id, })
      .select('-__v -deleted_at')
      .sort({
        created_at: 1,
      })
      .skip(offset)
      .limit(limit)
      .execAsync()
  },

  hasPermission(role_id, key) {
    return this.findOne()
      .where({
        role_id: role_id,
        key: key,
      })
      .execAsync()
      .then((v) => {
        return v
      })
      .catch((e) => {
        return false
      })
  },

}


export default mongoose.model('Permission', PermissionSchema)
