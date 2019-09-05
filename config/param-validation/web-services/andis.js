import Joi from 'joi'

export default {
  simboloAutomotor: {
    generic: {
      query: {
        tipo_documento: Joi.string(),
        nro_documento: Joi.string(),
        render_qr: Joi.string(),
      },
    },
  },
}
