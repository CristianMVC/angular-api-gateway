import Joi from 'joi'

export default {
  signIn: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
  },
}