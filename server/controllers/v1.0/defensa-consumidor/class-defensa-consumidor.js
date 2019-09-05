import logger                   from '../../../../config/winston'
import _                        from 'lodash'

/**
 * Clase Interfaz para el Suggar CRM, Mapper
 */
class issueDC {
  constructor() {
    this.data = {
      issue: {
        project_id: null,
        subject: null,
        priority_id: null,
        custom_fields: {
          id: null,
          name: null,
          nombre: null,
          apellido: null,
          doc_tipo: null,
          doc_numero: null,
          sexo: null,
          fecha_nacimiento: null,
          domicilio: null,
          provincia: null,
          localidad: null,
          cp: null,
          tel_prefijo: null,
          tel_numero: null,
          email: null,
          estitular: null,
          titular_nombre: null,
          uso_producto: null,
          problema: null,
          como_espera_que_se_resuelva: null,
          pretensiones: null,
          reclamo_al_proveedor: null,
          reclamo_numero: null,
          reclamo_gob: null,
          organismo_que_reclamo: null,
          reclamo_gob_numero: null,
          loc_provincia: null,
          loc_compra: null,
          provincia_uso: null,
          localidad_uso: null,
          documentacion_probatoria: null,
          adjunta_documentacion: null,
          elige_organismo: null,
          prov_1_nombre: null,
          prov_1_cuit: null,
          prov_1_domicilio: null,
          prov_1_provincia: null,
          prov_1_localidad: null,
          prov_2_nombre: null,
          prov_2_cuit: null,
          prov_2_domicilio: null,
          prov_2_provincia: null,
          prov_2_localidad: null,
          prov_3_nombre: null,
          prov_3_cuit: null,
          prov_3_domicilio: null,
          prov_3_provincia: null,
          prov_3_localidad: null,
          prov_4_nombre: null,
          prov_4_cuit: null,
          prov_4_domicilio: null,
          prov_4_provincia: null,
          prov_4_localidad: null,
          prov_5_nombre: null,
          prov_5_cuit: null,
          prov_5_domicilio: null,
          prov_5_provincia: null,
          prov_5_localidad: null,
          documents: null,
        },
      },
    }
  }

  /**
   * Setea los parametros recibidos en el objeto Issue
   * @param params - req.body
   */
  setIssue(params) {
    // Body documents viajó como string por form data
    if (typeof params.documents !== 'undefined') {
      params.documents = params.documents.split(',')
    }
    logger.log('debug', 'Class::DefensaConsumidor::Body %j', params)
    // Crea custom fields tomando los keys del objeto custom fields
    // this.data.issue.custom_fields = _.pick(body, _.keys(this.data.issue.custom_fields))
    // Join del array con espacios por CRM
    // this.data.issue.custom_fields.como_espera_que_se_resuelva = this.data.issue.custom_fields.como_espera_que_se_resuelva.join('\n')
    // Convierte booleans en 1 y 0 por CRM
    // this.data.issue.custom_fields = _.mapValues(this.data.issue.custom_fields, (value) => {
    //   if (value === false)
    //     return 0
    //   if (value === true)
    //     return 1
    //   return value
    // })

    this.data.issue.project_id                                     = !(params.project_id) ? null : params.project_id
    this.data.issue.subject                                        = !(params.subject) ? null : params.subject
    this.data.issue.priority_id                                    = !(params.priority_id) ? null : params.priority_id

    // this.data.issue.custom_fields.id                               = !(params.priority_id) ? null : params.priority_id
    this.data.issue.custom_fields.name                             = !(params.name) ? null : params.name
    this.data.issue.custom_fields.nombre                           = !(params.nombre) ? null : params.nombre
    this.data.issue.custom_fields.apellido                         = !(params.apellido) ? null : params.apellido
    this.data.issue.custom_fields.doc_tipo                         = !(params.doc_tipo) ? null : params.doc_tipo
    this.data.issue.custom_fields.doc_numero                       = !(params.doc_numero) ? null : params.doc_numero
    this.data.issue.custom_fields.sexo                             = !(params.sexo) ? null : params.sexo
    this.data.issue.custom_fields.fecha_nacimiento                 = !(params.fecha_nacimiento) ? null : params.fecha_nacimiento
    this.data.issue.custom_fields.domicilio                        = !(params.domicilio) ? null : params.domicilio
    this.data.issue.custom_fields.provincia                        = !(params.provincia) ? null : params.provincia
    this.data.issue.custom_fields.localidad                        = !(params.localidad) ? null : params.localidad
    this.data.issue.custom_fields.cp                               = !(params.cp) ? null : params.cp
    this.data.issue.custom_fields.tel_prefijo                      = !(params.tel_prefijo) ? null : params.tel_prefijo
    this.data.issue.custom_fields.tel_numero                       = !(params.tel_numero) ? null : params.tel_numero
    this.data.issue.custom_fields.email                            = !(params.email) ? null : params.email
    this.data.issue.custom_fields.estitular                        = !(params.estitular) ? null : params.estitular
    this.data.issue.custom_fields.titular_nombre                   = !(params.titular_nombre) ? null : params.titular_nombre
    this.data.issue.custom_fields.uso_producto                     = !(params.uso_producto) ? null : params.uso_producto
    this.data.issue.custom_fields.problema                         = !(params.problema) ? null : params.problema
    this.data.issue.custom_fields.como_espera_que_se_resuelva      = !(params.como_espera_que_se_resuelva) ? null : params.como_espera_que_se_resuelva
    this.data.issue.custom_fields.pretensiones                     = !(params.pretensiones) ? null : params.pretensiones
    this.data.issue.custom_fields.reclamo_al_proveedor             = !(params.reclamo_al_proveedor) ? null : params.reclamo_al_proveedor
    this.data.issue.custom_fields.reclamo_numero                   = !(params.reclamo_numero) ? null : params.reclamo_numero
    this.data.issue.custom_fields.reclamo_gob                      = !(params.reclamo_gob) ? null : params.reclamo_gob
    this.data.issue.custom_fields.organismo_que_reclamo            = !(params.organismo_que_reclamo) ? null : params.organismo_que_reclamo
    this.data.issue.custom_fields.reclamo_gob_numero               = !(params.reclamo_gob_numero) ? null : params.reclamo_gob_numero
    this.data.issue.custom_fields.loc_provincia                    = !(params.loc_provincia) ? null : params.loc_provincia
    this.data.issue.custom_fields.loc_compra                       = !(params.loc_compra) ? null : params.loc_compra
    this.data.issue.custom_fields.provincia_uso                    = !(params.provincia_uso) ? null : params.provincia_uso
    this.data.issue.custom_fields.localidad_uso                    = !(params.localidad_uso) ? null : params.localidad_uso
    this.data.issue.custom_fields.documentacion_probatoria         = !(params.documentacion_probatoria) ? null : params.documentacion_probatoria
    this.data.issue.custom_fields.adjunta_documentacion            = !(params.adjunta_documentacion) ? null : params.adjunta_documentacion
    this.data.issue.custom_fields.elige_organismo                  = !(params.elige_organismo) ? null : params.elige_organismo
    this.data.issue.custom_fields.prov_1_nombre                    = !(params.prov_1_nombre) ? null : params.prov_1_nombre
    this.data.issue.custom_fields.prov_1_cuit                      = !(params.prov_1_cuit) ? null : params.prov_1_cuit
    this.data.issue.custom_fields.prov_1_domicilio                 = !(params.prov_1_domicilio) ? null : params.prov_1_domicilio
    this.data.issue.custom_fields.prov_1_provincia                 = !(params.prov_1_provincia) ? null : params.prov_1_provincia
    this.data.issue.custom_fields.prov_1_localidad                 = !(params.prov_1_localidad) ? null : params.prov_1_localidad
    this.data.issue.custom_fields.prov_2_nombre                    = !(params.prov_2_nombre) ? null : params.prov_2_nombre
    this.data.issue.custom_fields.prov_2_cuit                      = !(params.prov_2_cuit) ? null : params.prov_2_cuit
    this.data.issue.custom_fields.prov_2_domicilio                 = !(params.prov_2_domicilio) ? null : params.prov_2_domicilio
    this.data.issue.custom_fields.prov_2_provincia                 = !(params.prov_2_provincia) ? null : params.prov_2_provincia
    this.data.issue.custom_fields.prov_2_localidad                 = !(params.prov_2_localidad) ? null : params.prov_2_localidad
    this.data.issue.custom_fields.prov_3_nombre                    = !(params.prov_3_nombre) ? null : params.prov_3_nombre
    this.data.issue.custom_fields.prov_3_cuit                      = !(params.prov_3_cuit) ? null : params.prov_3_cuit
    this.data.issue.custom_fields.prov_3_domicilio                 = !(params.prov_3_domicilio) ? null : params.prov_3_domicilio
    this.data.issue.custom_fields.prov_3_provincia                 = !(params.prov_3_provincia) ? null : params.prov_3_provincia
    this.data.issue.custom_fields.prov_3_localidad                 = !(params.prov_3_localidad) ? null : params.prov_3_localidad
    this.data.issue.custom_fields.prov_4_nombre                    = !(params.prov_4_nombre) ? null : params.prov_4_nombre
    this.data.issue.custom_fields.prov_4_cuit                      = !(params.prov_4_cuit) ? null : params.prov_4_cuit
    this.data.issue.custom_fields.prov_4_domicilio                 = !(params.prov_4_domicilio) ? null : params.prov_4_domicilio
    this.data.issue.custom_fields.prov_4_provincia                 = !(params.prov_4_provincia) ? null : params.prov_4_provincia
    this.data.issue.custom_fields.prov_4_localidad                 = !(params.prov_4_localidad) ? null : params.prov_4_localidad
    this.data.issue.custom_fields.prov_5_nombre                    = !(params.prov_5_nombre) ? null : params.prov_5_nombre
    this.data.issue.custom_fields.prov_5_cuit                      = !(params.prov_5_cuit) ? null : params.prov_5_cuit
    this.data.issue.custom_fields.prov_5_domicilio                 = !(params.prov_5_domicilio) ? null : params.prov_5_domicilio
    this.data.issue.custom_fields.prov_5_provincia                 = !(params.prov_5_provincia) ? null : params.prov_5_provincia
    this.data.issue.custom_fields.prov_5_localidad                 = !(params.prov_5_localidad) ? null : params.prov_5_localidad
    this.data.issue.custom_fields.documents                        = !(params.documents) ? null : params.documents

    // Convierte booleans en 1 y 0 por CRM
    this.data.issue.custom_fields = _.mapValues(this.data.issue.custom_fields, (value) => {
      if (value === false)
        return 0
      if (value === true)
        return 1
      return value
    })
    logger.log('debug', '---- posted issue ----')
    logger.log('debug', this.data.issue)
    logger.log('debug', '---- posted issue ----')
  }

  /**
   * Retorna el Objeto Issue
   * @returns Object Issue
   */
  getIssue() {
    return this.data
  }
}

export default new issueDC()
