import Joi from 'joi'

export default {
  // Constancia De CUIL Codificada
  constanciaDeCUILCodificada: {
    query: {
      apellido: Joi.string(),
      nombre: Joi.string(),
      fecha_nacimiento: Joi.string(),
      sexo: Joi.string(),
      tipoDoc: Joi.string(),
      numDoc: Joi.string(),
    },
  },

  // Traer Beneficios Asociados Por CUIL
  traerBeneficiosAsociadosPorCUIL: {
    query: {
      cuil: Joi.string().required(),
    },
  },

  // Donde Cobro por Beneficio
  dondeCobroPorBeneficio: {
    query: {
      beneficio: Joi.string().required(),
    },
  },

  // Donde Cobro por CUIL y Beneficio
  dondeCobroPorCUILyBeneficio: {
    query: {
      cuil: Joi.string().required(),
      beneficio: Joi.string().required(),
    },
  },

  // Traer CUIL por Numero de Beneficio
  traerCuilPorNroBeneficio: {
    query: {
      beneficio: Joi.string().required(),
    },
  },

  obtenerDatosxDocumento: {
    query: {
      nro_documento: Joi.string(),
      nro_pagina_entrada: Joi.number()
        .min(1)
        .max(5)
        .default(1),
    },
  },
}