import Joi from 'joi'

export default {
  //consulta por CUIL/DNI y fecha de nacimiento
  consultarPadron: {
    query: {
      dni: Joi.string()
        .required(),
      fecha_nacimiento: Joi.string()
        .regex(/(\d{4})[-\/](\d{2})[-\/](\d{2})/)
        .required(),
    },
  },

  listBarriosPopulares: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  },

  listLocalidades: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  },
}