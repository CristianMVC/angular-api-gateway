import Joi from 'joi'

export default {
  departamentos: {
    query: {
      nombre: Joi.string(),
      provincia: Joi.string(),
      limit: Joi.string(),
      orden: Joi.string(),
    },
  },
  provincias: {
    query: {
      nombre: Joi.string(),
      limit: Joi.string(),
      orden: Joi.string(),
    },
  },
  localidades: {
    query: {
      nombre: Joi.string(),
      departamento: Joi.string(),
      provincia: Joi.string(),
      limit: Joi.string(),
      orden: Joi.string(),
      id: Joi.string(),
    },
  },
}