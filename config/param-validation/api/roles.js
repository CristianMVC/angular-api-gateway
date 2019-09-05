import Joi from 'joi'

export default {
  // POST Roles
  create: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      access_to_admin: Joi.boolean(),
      access_to_api: Joi.boolean(),
    },
  },
  // PUT Roles
  update: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      access_to_admin: Joi.boolean(),
      access_to_api: Joi.boolean(),
    },
  },
}