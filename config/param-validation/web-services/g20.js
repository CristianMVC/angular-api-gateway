import Joi from 'joi'

export default {
  list: {
    query: {
      limit: Joi.string(),
      offset: Joi.string(),
      fields: Joi.string(),
      featured: Joi.string().valid('true', 'false'),
    },
    params: {
      type: Joi.string(),
      qr_code: Joi.string(),
    },
  },
}