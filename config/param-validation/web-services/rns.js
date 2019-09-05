import Joi from 'joi'

export default {
  obtenerSociedades: {
    query: {
        limit: Joi.number(),
        offset: Joi.number(),
        cuit: Joi.string(),
        razon_social: Joi.string(),
    },
    headers: {
      'id-token': Joi.string(),
      'open-id-token': Joi.string(),
    },
  },
}