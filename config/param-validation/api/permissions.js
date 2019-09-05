import Joi from 'joi'

export default {
  // POST Permissions
  create: {
    body: {
      key: Joi.string().required(),
      create: Joi.boolean().required(),
      read: Joi.boolean().required(),
      update: Joi.boolean().required(),
      delete: Joi.boolean().required(),
    },
  },
  // PUT Permissions
  update: {
    body: {
      key: Joi.string().required(),
      create: Joi.boolean().required(),
      read: Joi.boolean().required(),
      update: Joi.boolean().required(),
      delete: Joi.boolean().required(),
    },
  },
}