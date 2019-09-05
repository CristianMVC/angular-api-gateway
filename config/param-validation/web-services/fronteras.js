import Joi from 'joi'

export default {
  //ID del servicio
  id: {
    params: {
      id: Joi.number(),
    },
  },
}