import Joi from 'joi'

export default {

  listFeriados: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  },

}