import BaseJoi from 'joi'
import Extension from 'joi-date-extensions'
const Joi = BaseJoi.extend(Extension)

export default {
  convocatorias: {
    query: {
      ordering: Joi.string(),
      titulo: Joi.string(),
      abierta: Joi.boolean(),
      fecha_inicio: Joi.date().format('YYYY-MM-DD'),
      fecha_fin: Joi.date().format('YYYY-MM-DD'),
      limit: Joi.string(),
      offset: Joi.string(),
    },
  },
}