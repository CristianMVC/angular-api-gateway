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
    params: {
      cuil: Joi.string(),
      idPrograma: Joi.number(),
    },
  },

  getElement: {
    query: {
      fields: Joi.string(),
      ultimo_programa: Joi.boolean(),
    },
    params: {
      cuil: Joi.string(),
      idPrograma: Joi.number(),
    },
  },
}
