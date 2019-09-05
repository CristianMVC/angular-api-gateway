import Joi from 'joi'

export default {
  //consulta de 1 o todos los issues
  issues: {
    params: {
      issue_id: Joi.string(),
    },
  },

  //consulta de 1 o todos los proyectos
  projects: {
    params: {
      project_id: Joi.string(),
    },
  },

  //crear documento
  createDocument: {
    params: {
      filename: Joi.string(),
    },
  },

  //postear un issue
  createIssue: {
    body: {
        subject: Joi.string().required(),
          nombre: Joi.string().required(),
          apellido: Joi.string().required(),
          doc_tipo: Joi.string().required(),
          doc_numero: Joi.string().required(),
          sexo: Joi.string().required(),
          fecha_nacimiento: Joi.string().required(),
          domicilio: Joi.string().required(),
          provincia: Joi.string().required(),
          localidad: Joi.string().required(),
          cp: Joi.string().required(),
          tel_prefijo: Joi.number().allow(null),
          tel_numero: Joi.number().allow(null),
          email: Joi.string().allow(null),
          problema: Joi.string().required(),
          // reclamo_al_proveedor: Joi.bool().required(),
          // reclamo_numero: Joi.string().allow(null),
          reclamo_gob: Joi.string().allow(null),
          // organismo_que_reclamo: Joi.string().allow(null),
          // reclamo_gob_numero: Joi.string().allow(null),
          loc_compra: Joi.string().required(),
          localidad_uso: Joi.string().allow(null),
          // documentacion_probatoria: Joi.bool().required(),
          // adjunta_documentacion: Joi.bool().required(),
          // estitular: Joi.bool(),
          // titular_nombre: Joi.string().allow(null),
          uso_producto: Joi.string().allow(null),
          como_espera_que_se_resuelva: Joi.string().required(),
          // pretensiones: Joi.string().allow(null),
          elige_organismo: Joi.string().allow(null),
          loc_provincia: Joi.string().required(),
          provincia_uso: Joi.string().allow(null),
          prov_1_nombre: Joi.string().allow(null),
          prov_1_cuit: Joi.number().allow(null),
          prov_1_domicilio: Joi.string().allow(null),
          prov_1_localidad: Joi.string().allow(null),
          prov_1_provincia: Joi.string().allow(null),
          prov_2_nombre: Joi.string().allow(null),
          prov_2_cuit: Joi.number().allow(null),
          prov_2_domicilio: Joi.string().allow(null),
          prov_2_localidad: Joi.string().allow(null),
          prov_2_provincia: Joi.string().allow(null),
          prov_3_nombre: Joi.string().allow(null),
          prov_3_cuit: Joi.number().allow(null),
          prov_3_domicilio: Joi.string().allow(null),
          prov_3_localidad: Joi.string().allow(null),
          prov_3_provincia: Joi.string().allow(null),
          prov_4_nombre: Joi.string().allow(null),
          prov_4_cuit: Joi.number().allow(null),
          prov_4_domicilio: Joi.string().allow(null),
          prov_4_localidad: Joi.string().allow(null),
          prov_4_provincia: Joi.string().allow(null),
          prov_5_nombre: Joi.string().allow(null),
          prov_5_cuit: Joi.number().allow(null),
          prov_5_domicilio: Joi.string().allow(null),
          prov_5_localidad: Joi.string().allow(null),
          prov_5_provincia: Joi.string().allow(null),
    },
  },

  //subir un archivo
  uploads: {
    files: Joi
      .object()
      .keys({
        file: Joi.object().required(),
      })
      .required(),
  },

  uploadFile: {
    params: {
      doc_id: Joi.string()
      .regex(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)
      .required(),
    },
  },

  //crea un documento
  document: {
    params: {
      name: Joi.string(),
      revision: Joi.string(),
    },
  },

  //search
  searchCRM: {
    params: {
      dni: Joi.string(),
      tipoDNI: Joi.string(),
      issues: Joi.string(),
      fields: Joi.string(),
      offset: Joi.number(),
      limit: Joi.number(),
    },
  },
}