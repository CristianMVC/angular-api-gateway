import Joi from 'joi'

export default {
  generic: {
    query: {
      id: Joi.string(),
      limit: Joi.string(),
      offset: Joi.string(),
      codigo: Joi.string(),
      tipo_documento: Joi.string(),
      nro_documento: Joi.string(),
      sexo: Joi.string(),
      id_vacuna: Joi.number(),
    },
  },
}
