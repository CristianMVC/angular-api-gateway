import Joi from 'joi'

export default {
  servicios: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      fields: Joi.string(),
      cod_organismo: Joi.string(),
    },
  },

  organismos: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      fields: Joi.string(),
      cod_organismo: Joi.string(),
    },
  },
}