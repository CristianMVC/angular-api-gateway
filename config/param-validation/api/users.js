import Joi from 'joi'

export default {
  // POST /api/users
  createUser: {
    body: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string()
        .regex(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)
        .required(),
      username: Joi.string().required(),
      password: Joi.string()
        .regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
        .required(),
      role: Joi.string()
        .regex(/^(su)$|^(api)$/g)
        .required(),
    },
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string()
        .regex(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)
        .required(),
      username: Joi.string().required(),
      password: Joi.string()
        .regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
        .required(),
      role: Joi.string()
        .regex(/^(su)$|^(api)$/g)
        .required(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },
}