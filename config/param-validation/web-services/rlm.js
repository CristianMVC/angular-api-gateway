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
      filtro: Joi.string(),
    },
  },

  getElement: {
    query: {
      fields: Joi.string(),
      filtro: Joi.string(),
    },
    params: {
      codigo: Joi.string(),
    },
  },
}
