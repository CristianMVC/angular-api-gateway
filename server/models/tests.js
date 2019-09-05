import moment               from 'moment'
import mongoose             from 'mongoose'
import Promise              from 'bluebird'


const Schema = mongoose.Schema

mongoose.Promise = Promise

const TestSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },

  access_to_admin: {
    type: Boolean,
    default: false,
  },
  access_to_api: {
    type: Boolean,
    default: false,
  },

  create: {
    type: Boolean,
  },
  read: {
    type: Boolean,
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
TestSchema.statics = {
  /**
   * Get user by Id
   * @param id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync()
      .then((v) => {
        if (v)
          return v
        else
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
      .sort({
        name: 1,
      })
      .skip(offset)
      .limit(limit)
      .execAsync()
  },

}


export default mongoose.model('Test', TestSchema)
