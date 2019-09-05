import Joi from 'joi'

export default {
  generic: {
    query: {
      usuario_consulta: Joi.string(),
      numero_documento: Joi.string(),
      sistema_origen: Joi.string(),
      numero_especial: Joi.string(),
      assignee: Joi.string(),
    },
  },
}
