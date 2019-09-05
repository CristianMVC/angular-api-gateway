import Joi from 'joi'

export default {
  getList: {
    query: {
      limit: Joi.string(),
      offset: Joi.string(),
      fields: Joi.string(),
      sort: Joi.string(),
      year: Joi.string(),
      month: Joi.string(),
      day: Joi.string(),
    },
  },

  getElement: {
    query: {
      fields: Joi.string(),
    },
    params: {
      id: Joi.string(),
    },
  },
}
