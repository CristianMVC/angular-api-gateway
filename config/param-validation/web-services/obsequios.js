import Joi from 'joi'

export default {
  consultarObsequios: {
    query: {
		value: Joi.string(),
		offset: Joi.number(),
		limit: Joi.number(),
    },
  },
}