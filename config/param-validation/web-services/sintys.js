import Joi from 'joi'

export default {
  consultas: {
    query: {
      id_persona: Joi.string(),
      deno: Joi.string(),
      tipo_documento: Joi.string(),
      nro_documento: Joi.string(),
      sexo: Joi.string(),
      fecha_nacimiento: Joi.string(),
      cuil: Joi.string(),
    },
  },
}
