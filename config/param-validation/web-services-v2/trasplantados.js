import Joi from 'joi'

export default {
  credenciales: {
    params: {
      credential: Joi.number().required(),
    },
  },
  trasplantadosVencidos: {
    query: {
      fecha: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    },
  },
}