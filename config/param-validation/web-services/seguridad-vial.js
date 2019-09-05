import Joi from 'joi'

export default {
  consultarLicenciaCertificado: {
    query: {
      gender: Joi.string().uppercase(),
      document_type: Joi.string(),
      document_number: Joi.string(),
    },
  },
  licenciaDigital: {
    query: {
      imagenes: Joi.string(),
    },
    headers: {
      'id-token': Joi.string(),
      'open-id-token': Joi.string(),
    },
  },
  // consultarLicenciaCertificado: {
  //   query: {
  //     gender: Joi.string()
  //       .regex(/^(F|M)$/)
  //       .required(),
  //     document_type: Joi.string()
  //       .regex(/^[1-5]$/)
  //       .required(),
  //     document_number:
  //       Joi.alternatives()
  //       .when('document_type', {
  //         is: 1,
  //         then:
  //           Joi.number()
  //             .min(999999)
  //             .max(99999999)
  //             .required(),
  //       })
  //       .when('document_type', {
  //         is: 4,
  //         then:
  //           Joi.string()
  //             .regex(/^\w{3}\d{6}$/i)
  //             .required(),
  //         otherwise:
  //           Joi.number()
  //             .min(999999)
  //             .max(99999999)
  //             .required(),
  //       }),
  //   },
  // },
}