import Joi from 'joi'

export default {
  //ID del spreadsheet
  consultar: {
    params: {
      id: Joi.string()
        .required(),
    },
  },
}