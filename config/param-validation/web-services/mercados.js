import Joi from 'joi'

export default {
  //ID del spreadsheet
  list: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
    },
  },
}