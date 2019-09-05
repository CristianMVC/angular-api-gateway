import Joi from 'joi'

export default {
  genericEndPoint: {
    query: {
      numero: Joi.string(),
      texto: Joi.string(),
      dependencia: Joi.string(),
      provincia: Joi.string(), //fecha formato YYYY-MM-DD
      publicacion: Joi.string(), //fecha formato YYYY-MM-DD
      publicacion_desde: Joi.string(), //fecha formato YYYY-MM-DD
      publicacion_hasta: Joi.string(), //fecha formato YYYY-MM-DD
      sancion: Joi.string(), //fecha formato YYYY
      id: Joi.string(),
      limit: Joi.string(),
      offset: Joi.string(),
    },
  },
}

