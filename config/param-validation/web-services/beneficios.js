import Joi from 'joi'

export default {
  //ID del servicio
  cuil: {
    params: {
      cuil: Joi.string()
      .required(),
    },
  },
}
