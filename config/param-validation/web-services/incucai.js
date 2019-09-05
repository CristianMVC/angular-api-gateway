import Joi from 'joi'

export default {
  esDonante: {
    query: {
      id_tipo_documento: Joi.string(),
      docnro: Joi.string(),
      fecha_nacimiento: Joi.string(),
    },
  },
  esDonanteCph: {
    query: {
      id_tipo_documento: Joi.string(),
      docnro: Joi.string(),
      fecha_nacimiento: Joi.string(),
    },
  },
  generic: {
    params: {
      id: Joi.string(),
    },
    query: {
      id_tipo_documento: Joi.string(),
      fecha_nacimiento: Joi.string(),
    },
  },
  credencial: {
    query: {
      id_tipo_documento: Joi.string(),
      fecha_nacimiento: Joi.string(),
    },
    params: {
      dni: Joi.string(),
    },
  },
  registro: {
    body: {
      id_tipo_documento: Joi.string().empty('').default(''),
      nro_documento: Joi.string().empty('').default(''),
      apellido: Joi.string().empty('').default(''),
      nombre: Joi.string().empty('').default(''),
      sexo: Joi.string().empty('').default(''),
      mail: Joi.string().empty('').default(''),
      fecha_nacimiento: Joi.string().empty('').default(''),
      id_estado_civil: Joi.string().empty('').default(''),
      calle: Joi.string().empty('').default(''),
      numero: Joi.string().empty('').default(''),
      telefono: Joi.string().empty('').default(''),
      id_provincia: Joi.string().empty('').default(''),
      id_partido: Joi.string().empty('').default(''),
      id_localidad: Joi.string().empty('').default(''),
      donante: Joi.string().empty('').default(''),
      confirmado: Joi.string().empty('').default(''),
      nombre_apellido_familiar: Joi.string().empty('').default(''),
      nombre_familiar: Joi.string().empty('').default(''),
      apellido_familiar: Joi.string().empty('').default(''),
      vinculo: Joi.string().empty('').default(''),
      telefono_familiar: Joi.string().empty('').default(''),
      mail_familiar: Joi.string().empty('').default(''),
      piso: Joi.string().empty('').default(''),
      departamento: Joi.string().empty('').default(''),
      url_validacion: Joi.string().empty('').default(''),
      dona: Joi.string().empty('').default(''),
      id_proposito: Joi.string().empty('').default(''),
    },
  },
  trasplantadosCredencial: {
    query: {
      id_tipo_documento: Joi.string(),
      nro_documento: Joi.string(),
      sexo: Joi.string(),
    },
    params: {
      nroCredencial: Joi.string(),
    },
  },
  trasplantadosVencida: {
    query: {
      fecha: Joi.string(),
    },
  },

}
