import Joi from 'joi'

export default {
  dni: {
    estado: {
      query: {
        boleta: Joi.string(),
        dni: Joi.string(),
        sexo: Joi.string(),
      },
    },
    vencimiento: {
      query: {
        boleta: Joi.string(),
        dni: Joi.string(),
        sexo: Joi.string(),
      },
    },
  },
  passport: {
    estado: {
      query: {
        boleta: Joi.string(),
        dni: Joi.string(),
        sexo: Joi.string(),
      },
    },
  },
}
