import Joi from 'joi'

export default {
  generic: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      fields: Joi.string(),
      sort: Joi.string(),
      year: Joi.string(),
      month: Joi.string(),
      day: Joi.string(),
    },
    params: {
      cuil: Joi.string(),
    },
  },
}
