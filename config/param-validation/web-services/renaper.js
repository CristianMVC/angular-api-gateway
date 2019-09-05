import Joi from 'joi'

export default {
  dni: {
    query: {
      dni: Joi.string().required(),
      sexo: Joi.string().required(),
    },
  },
}
