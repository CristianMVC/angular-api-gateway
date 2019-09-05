import Joi from 'joi'

export default {
  radiacionDomicilio: {
    consultaProvincias: {
      query: {
        tipoVehiculo: Joi.string()
          .valid('A', 'M', 'a', 'm')
          .required(),
      },
    },
    consultaDepartamentos: {
      query: {
        tipoVehiculo: Joi.string()
          .valid('A', 'M', 'a', 'm')
          .required(),
        idProvincia: Joi.string()
          .required(),
      },
    },
    consultaLocalidades: {
      query: {
        tipoVehiculo: Joi.string()
          .valid('A', 'M', 'a', 'm')
          .required(),
        idProvincia: Joi.string()
          .required(),
        idDepartamento: Joi.string()
          .required(),
      },
    },
    consultaCallesBarrios: {
      query: {
        tipoVehiculo: Joi.string()
          .valid('A', 'M', 'a', 'm')
          .required(),
        idProvincia: Joi.string()
          .required(),
        idDepartamento: Joi.string()
          .required(),
        idLocalidad: Joi.string()
          .required(),
      },
    },
    consultaAlturaExacta: {
      query: {
        tipoVehiculo: Joi.string()
          .valid('A', 'M', 'a', 'm')
          .required(),
        idProvincia: Joi.string()
          .required(),
        idDepartamento: Joi.string()
          .required(),
        idLocalidad: Joi.string(),
        idCalle: Joi.string(),
        idBarrio: Joi.string(),
        alturaExacta: Joi.string()
          .required(),
      },
    },
    consultaRegistroSeccional: {
      query: {
        codigoRegistroSeccional: Joi.string()
          .required(),
      },
    },
  },
  radicacionDominio: {
    query: {
      dominio: Joi.string()
        .required(),
    },
  },
  consultaCedulas: {
    query: {
      dominio: Joi.string(),
      nro_documento: Joi.string(),
    },
  },
}
