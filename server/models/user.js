import bcrypt               from 'bcrypt'
import logger               from './../../config/winston'
import moment               from 'moment'
import mongoose             from 'mongoose'
import Promise              from 'bluebird'


const Schema = mongoose.Schema

mongoose.Promise = Promise

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: [
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/, 'The value of path {PATH} ({VALUE}) is not a valid email.',
    ],
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: [
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'The value of path {PATH} ({VALUE}) is not a valid password.',
    ],
  },
  su: {
    type: Boolean,
    default: false,
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
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

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})


/**
 * Methods
 */
UserSchema.method({
  comparePassword: function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      return cb(null, isMatch)
    })
  },
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user by Id
   * @param id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .select('-password -__v -deleted_at')
      .execAsync()
      .then((user) => {
        if (user) {
          return user
        }
        // const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
        return Promise.reject('No such user exists!')
      })
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50, } = {}) {
    return this.find()
      .select('-password -__v -deleted_at')
      .sort({
        surname: 1,
        name: 1,
        created_at: 1,
      })
      .skip(skip)
      .limit(limit)
      .execAsync()
  },

  validateUserCredentials(email, pass) {
    return this.findOne()
      .where('email').equals(email)
      .execAsync()
      .then((user) => {
        if (user) {
          logger.log('silly', 'FindOne User:', user.name)
          //Compare Password
          if (bcrypt.compareSync(pass, user.password)) {
            logger.log('silly', 'Method::Users::validateUserCredentials::bcryptCompareOK')
            return {
              _id: user._id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              username: user.username,
              su: user.su,
              role_id: user.role_id,
              created_at: user.created_at,
              updated_at: user.updated_at,
            }
          } else {
            logger.log('error', 'Method::Users::validateUserCredentials::bcryptCompareKO')
            return false
          }
        } else {
          logger.error('Method::Users::validateUserCredentials::User Not Found')
          return false
        }
      })
      .catch((e) => Promise.reject(e))
  },

  /**
   * Este Metodo retorna si el usuario es su.
   * @param email - User email
   * @returns {Boolean}
   */
  isSudo(email) {
    return this.findOne()
      .where('email')
      .equals(email)
      .execAsync()
      .then((user) => {
        if (user) {
          logger.log('silly', 'Method::Users::isSudo::FindOne:', user.name)
          //Compare Password
          return user.su
        } else {
          logger.error('Method::Users::isSudo::FindOne:User Not Found')
          return false
        }
      })
      .catch((e) => Promise.reject(e))
  },
}

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema)
