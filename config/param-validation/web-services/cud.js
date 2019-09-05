import Joi from 'joi'

export default {
  consultarPadron: {
    params: {
      codbarras: Joi.string()
        .required(),
    },
  },
  obtenerCertificado: {
    query: {
      reduce_form: Joi.number().max(0.9).min(0.1).optional(),
      reduce_qr: Joi.number().max(0.9).min(0.1).optional(),
      reduce_certs: Joi.number().max(0.9).min(0.1).optional(),
    }, /*
    headers: {
      'id-token': Joi.string().optional(),
      'open-id-token': Joi.string().optional(),
    }, */
  },
}