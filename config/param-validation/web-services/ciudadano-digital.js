import Joi from 'joi'


export default {
  nps: {
    body: Joi.object().keys({
      surveyresponse: Joi.object().keys({
        name: Joi.string()
          .allow(null)
          .empty(''),
        respondent: Joi.string()
          .allow(null)
          .empty(''),
        dni: Joi.number()
          .allow(null)
          .empty(''),
        organismo: Joi.string()
          .allow(null)
          .empty(''),
        categoriaservicio: Joi.string()
          .allow(null)
          .empty(''),
        provincia: Joi.string()
          .allow(null)
          .empty(''),
        localidad: Joi.string()
          .allow(null)
          .empty(''),
        canal: Joi.number()
          .required(),
      }).required(),
      questionresponses: Joi.array().items(Joi.object().keys({
        questionId: Joi.string()
          .required(),
        answerId: Joi.string()
          .allow(null)
          .empty(''),
        valueAsString: Joi.string()
          .allow(null)
          .empty(''),
      })).required(),
    }),
  },
}
