import Joi from 'joi'

export default {
  test: {
    query: {
      idConsulta: Joi.string().required(),
      CUIL: Joi.string(),
      Provincia: Joi.string(),
      idTramite: Joi.string(),
    },
  },
}
