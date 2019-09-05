import Joi from 'joi'

export default {
  puntoDigital: {
    cursos: {
      query: {
        cuil: Joi.string().regex(/^[\d]*$/),
      },
    },
  },
}