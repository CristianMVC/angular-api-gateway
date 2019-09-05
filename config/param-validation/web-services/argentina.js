import Joi from 'joi'

export default {
  //ID del servicio
  servicio: {
    params: {
      id: Joi.string()
        .required(),
    },
  },

  list: {
    query: {
      limit: Joi.string(),
      offset: Joi.string(),
      fields: Joi.string(),
    },
  },
}