import Joi from 'joi'

export default {
    credenciales: {
      params: {
        credential: Joi.number().required().min(10),
      },
    },
    credencial: {
      params: {
        credential: Joi.number().required().min(10),
        policy: Joi.number().required(),
      },
      query: {
        imagenes: Joi.number().optional().equal(1),
      },
    },
}