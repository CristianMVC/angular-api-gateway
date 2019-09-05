import express                from 'express'
import APIError               from '../../../helpers/APIError'
import cache                  from '../../../../config/cache'
import juntasCtrl             from '../../../controllers/v1.0/juntas/juntas'
import provinciasCtrl         from '../../../controllers/v1.0/juntas/provincias'
import localidadesCtrl        from '../../../controllers/v1.0/juntas/localidades'
import planillaCtrl           from '../../../controllers/v1.0/juntas/planilla'
import { idTokenMiddleware, } from '../../../middelwares/tokenMiddleware'


const router = express.Router() // eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
//router.route('/*').get(cache.route())

/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/


/**
 *
 * @api {GET} v1.0/juntas/juntas                      Listado de Juntas con Requisitos
 * @apiName listadoDeJuntasYRequisitos
 * @apiGroup SALUD
 * @apiVersion 1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}                 [provincia]                       Filtro para obtener las provincias
 * @apiParam  {String}                 [localidad]                       Filtro para obtener las localidades por provincia
 * @apiParam  {Boolean="true","false"} [tramite_solicitud="false"]       Tipo de tramite - Solicitud por primera vez
 * @apiParam  {Boolean="true","false"} [tramite_renovacion="false"]      Tipo de tramite - Renovacion
 * @apiParam  {Boolean="true","false"} [tramite_perdida_certi="false"]    Tipo de tramite - Perdida del certificado
 * @apiParam  {Boolean="true","false"} [tramite_agravamiento="false"]    Tipo de tramite - Agravamiento
 * @apiParam  {Boolean="true","false"} [tramite_fallecimiento="false"]   Tipo de tramite - Baja por fallecimiento
 * @apiParam  {Boolean="true","false"} [tramite_voluntaria="false"]      Tipo de tramite - Baja voluntaria
 * @apiParam  {Boolean="true","false"} [tramite_cambio_adopcion="false"] Tipo de tramite - Cambio de identidad por adopcion
 * @apiParam  {Boolean="true","false"} [tramite_cambio_genero="false"]   Tipo de tramite - Cambio de identidad por genero
 * @apiParam  {Boolean="true","false"} [edad="false"]                    Tiene 16 años o mas
 * @apiParam  {Boolean="true","false"} [mayor_firma="false"]             Si es mayor - Firma por si misma
 * @apiParam  {Boolean="true","false"} [mayor_apoyo="false"]             Si es mayor - Apoyo/s designado/s judicialmente
 * @apiParam  {Boolean="true","false"} [mayor_curatela="false"]          Si es mayor - Curatela
 * @apiParam  {Boolean="true","false"} [tutor="false"]                   Si tiene tutor
 * @apiParam  {Boolean="true","false"} [obra_social="false"]             Cobertura medica - obra social
 * @apiParam  {Boolean="true","false"} [prepaga="false"]                 Cobertura medica - medicina prepaga
 * @apiParam  {Boolean="true","false"} [atencion="false"]                Cobertura medica - atencion en hospital o centro de salud publica
 * @apiParam  {Boolean="true","false"} [salud="false"]                   Cobertura medica - incluir salud
 * @apiParam  {Boolean="true","false"} [pami="false"]                    Cobertura medica - pami
 * @apiParam  {Boolean="true","false"} [intelectual_mental="false"]      Discapacidad - intelectual y mental
 * @apiParam  {Boolean="true","false"} [visual="false"]                  Discapacidad - visual
 * @apiParam  {Boolean="true","false"} [motor="false"]                   Discapacidad - motor
 * @apiParam  {Boolean="true","false"} [auditivo="false"]                Discapacidad - auditivo
 * @apiParam  {Boolean="true","false"} [respiratorio="false"]            Discapacidad - respiratorio
 * @apiParam  {Boolean="true","false"} [cardiovascular="false"]          Discapacidad - cardiovascular
 * @apiParam  {Boolean="true","false"} [renal="false"]                   Discapacidad - renal urologico
 * @apiParam  {Boolean="true","false"} [digestivo_hepatico="false"]      Discapacidad - digestivo / hepatico
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]} results                                Resultado
 * @apiSuccess (200) {Object}   results.juntas                         Juntas
 * @apiSuccess (200) {String}   results.juntas.provincia               Nombre de la provincia
 * @apiSuccess (200) {String}   results.juntas.localidad               Nombre de la localidad
 * @apiSuccess (200) {String}   results.juntas.nombre
 * @apiSuccess (200) {String}   results.juntas.direccion
 * @apiSuccess (200) {String}   results.juntas.telefono
 * @apiSuccess (200) {String}   results.juntas.mail
 * @apiSuccess (200) {String}   results.juntas.botonTurno
 * @apiSuccess (200) {String}   results.juntas.botonAsesoramiento
 * @apiSuccess (200) {String}   results.juntas.botonConsulta
 * @apiSuccess (200) {Object[]} results.requisitos                     Listado de requisitos - Formato HTML
 * @apiSuccess (200) {String}   results.mensaje                        Mensaje - Formato HTML
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *         "count": 1,
 *         "offset": 0,
 *         "limit": 0
 *       }
 *     },
 *     "results": [
 *       {
 *         "juntas":
 *           {
 *             "provincia": "Buenos Aires",
 *             "localidad": "9 de Julio",
 *             "nombre": "Junta Evaluadora – Dirección General de Discapacidad.",
 *             "direccion": "Urquiza 1162",
 *             "telefono": "02317-610070/71 ",
 *             "mail": "juntaevaluadora9dejulio@outlook.com.ar",
 *             "botonTurno": "",
 *             "botonAsesoramiento": "",
 *             "botonConsulta": ""
 *           },
 *          "requisitos": [
 *            "<p>Resolución judicial donde conste la <strong>designación del curador o curadores designados</strong> + DNI de la/s persona/s designada/s judicialmente como curador o curadores. (original y fotocopia)</p>",
 *            "<p>En caso de no contar con un certificado médico con las características descritas se sugiere presentar la siguiente planilla completada por el equipo tratante (no más de 6 meses de antiguedad)\n<a href=\"https://www.argentina.gob.ar/sites/default/files/planilla_para_evaluar_condicion_de_salud_enfermedad_renal_urologica.pdf\">Descargar Planilla (Trastrorno renal urológico)</a></p>",
 *            "<p><strong>DNI</strong> de la persona que será evaluada (original y fotocopia) y CUD anterior (original). En caso de pérdida del CUD traer la denuncia de extravío.</p>",
 *            "<p><strong>Certificado médico completo o Resumen de historia clínica original (de no más de 6 meses)</strong> especificando:</p>\n\n<ul><li>Diagnóstico principal</li><li>Antecedentes de la enfermedad y tiempo de evolución</li><li>Filtrado glomerular</li><li>Tratamiento indicado</li><li>Firma y sello del médico y/o equipo tratante</li></ul>",
 *            "<p><strong>Credencial de PAMI</strong>.</p>",
 *            "<p><strong>Planilla para solicitar el certificado único de discapacidad</strong> <a href='https://www.argentina.gob.ar/sites/default/files/planilla_beneficiario_2018.pdf'>Descargar Planilla (Solicitud de certificado único de discapacidad)</a></p>",
 *            "<p>Si poseés, <strong>estudios complementarios</strong> de no más de 6 meses de antigüedad que avalen el diagnóstico:campo visual u otros estudios complementarios que avalen el diagnóstico (original y fotocopia).</p>",
 *            "<p><strong>Planilla</strong> para personas con <strong>discapacidad visual</strong> completada por el médico oftalmológico con una antiguedad no mayor a 6 meses. (original y fotocopia) <a href='https://www.argentina.gob.ar/sites/default/files/planilla_para_evaluar_condicion_de_salud_visual.pdf'>Descargar Planilla (Visual)</a></p>"
 *          ],
 *          "mensaje": "<p>Según el trámite a realizar <strong>(Renovación)</strong>, el origen del problema de salud por el cual se solicita el certificado <strong>(Visual, Renal urológico)</strong>, la edad <strong>(mayor de 16 años)</strong> y el tipo de cobertura <strong>(PAMI)</strong> tenés que presentar esta documentación:</p>"
 *       }
 *     ]
 *   }
 *
 * @apiSuccess (400) {Number} status                            Tipo de Error
 * @apiSuccess (400) {String} userMessage                       Mensaje de Error
 * @apiSuccess (400) {String} stack                             Mensaje del stack
 *
 * @apiErrorExample {json} Respuesta de Error:
 *
 *   {
 *     "status": 400,
 *     "userMessage": "Error: se envío localidad, el campo provincia es requerido.",
 *     "stack": "url del stack"
 *   }
 *
 */

router.route('/juntas')
  .get(idTokenMiddleware, juntasCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *
 * @api {GET} v1.0/juntas/provincias                            Listado de Provincias
 * @apiName listadoDeProvincias
 * @apiGroup SALUD
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                       Listado de Provincias
 * @apiSuccess (200) {String}     results.provincia             Nombre de la provincia
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *           "count": 3,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *     },
 *     "results": [
 *       {
 *         "provincia": "Ciudad Autónoma de Buenos Aires"
 *       },
 *       {
 *         "provincia": "Buenos Aires"
 *       },
 *       {
 *         "provincia": "Río Negro"
 *       }
 *     ]
 *   }
 *
 *
 */
router.route('/provincias')
  .get(cache.route(), provinciasCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *
 * @api {GET} v1.0/juntas/localidades-provincia               Listado de Localidades por Provincia
 * @apiName listadoDeLocalidades
 * @apiGroup SALUD
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {String} provincia                               Filtro para obtener las localidades por provincia
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]} results                       Listado de Localidad
 * @apiSuccess (200) {String}   results.localidad             Nombre de la localidad
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *           "count": 3,
 *           "offset": 0,
 *           "limit": 0
 *       }
 *     },
 *     "results": [
 *       {
 *         "localidad": "Paraná"
 *       },
 *       {
 *         "localidad": "Colón"
 *       },
 *       {
 *         "localidad": "Concepción"
 *       }
 *     ]
 *   }
 *
 * @apiSuccess (400) {Number} status                          Tipo de Error
 * @apiSuccess (400) {String} userMessage                     Mensaje de Error
 * @apiSuccess (400) {String} stack                           Mensaje del stack
 *
 * @apiErrorExample {json} Respuesta de Error:
 *
 *   {
 *     "status": 400,
 *     "userMessage": "Error: el campo provincia es requerido.",
 *     "stack": "url del stack"
 *   }
 *
 */
router.route('/localidades-provincia')
  .get(localidadesCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *
 * @api {POST} v1.0/juntas/planilla     Envio de planilla pdf por mail
 * @apiName envioPlanillaPdf
 * @apiGroup SALUD
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiHeader {String}  Content-Type
 *
 * @apiParam  {Object}  solicitante
 * @apiParam  {String}  solicitante.nombres                      Nombres
 * @apiParam  {String}  solicitante.apellidos                    Apellidos
 * @apiParam  {String}  solicitante.fecha_nacimiento             Fecha de nacimiento
 * @apiParam  {String}  solicitante.genero                       Genero
 * @apiParam  {String}  solicitante.tipoDoc                      Documento de identidad
 * @apiParam  {String}  solicitante.pais                         Pais
 * @apiParam  {String}  solicitante.nro_doc                      Nro. de documento
 * @apiParam  {String}  solicitante.cuil                         Cuil
 * @apiParam  {String}  solicitante.nacionalidad                 Nacionalidad
 * @apiParam  {String}  solicitante.tipo                         Tipo
 * @apiParam  {String}  solicitante.tipo_residencia              Tipo de residencia
 * @apiParam  {String}  solicitante.fecha_vencimiento            Fecha de vencimiento
 * @apiParam  {String}  solicitante.domicilio                    Domicilio
 * @apiParam  {String}  solicitante.provincia"                   Provincia
 * @apiParam  {String}  solicitante.departamento                 Departamento
 * @apiParam  {String}  solicitante.localidad                    Localidad
 * @apiParam  {String}  solicitante.cod_postal                   Codigo postal
 * @apiParam  {String}  solicitante.telefono                     Telefono
 * @apiParam  {String}  solicitante.email                        Email
 * @apiParam  {String}  solicitante.estado_civil                 Estado civil
 * @apiParam  {Boolean} solicitante.vehiculo_ley                 Adquirir Vehiculo a traves de la Ley
 * @apiParam  {String}  solicitante.fecha_ley                    Fecha
 * @apiParam  {Boolean} solicitante.simbolo_internacinal         Posse simbolo internacional de acceso
 * @apiParam  {Boolean} solicitante.percibir_asignacion
 * @apiParam  {Object}  representante
 * @apiParam  {String}  representante.interesado
 * @apiParam  {String}  representante.familiar                   Madre, padre o tutor
 * @apiParam  {String}  representante.nombre_familiar            Nombres - madre, padre o tutor
 * @apiParam  {String}  representante.apellido_familiar          Apellidos - madre, padre o tutor
 * @apiParam  {String}  representante.tipo_doc_familiar          Documento de identidad - madre, padre o tutor
 * @apiParam  {String}  representante.pais_familiar              Pais - madre, padre o tutor
 * @apiParam  {String}  representante.nro_doc_familiar           Nro. de documento - madre, padre o tutor
 * @apiParam  {String}  representante.nacionalidad_familiar      Nacionalidad - madre, padre o tutor
 * @apiParam  {String}  representante.domicilio_familiar         Domicilio - madre, padre o tutor
 * @apiParam  {String}  representante.cod_postal_familiar        Cod. Postal - madre, padre o tutor
 * @apiParam  {String}  representante.localidad_familiar         Localidad - madre, padre o tutor
 * @apiParam  {String}  representante.provincia_familiar         Provincia - madre, padre o tutor
 * @apiParam  {String}  representante.telefono_familiar          Telefono - madre, padre o tutor
 * @apiParam  {Object}  tutor
 * @apiParam  {String}  tutor.designacion                        Designacion
 * @apiParam  {String}  tutor.fecha_designacion                  Fecha
 * @apiParam  {String}  tutor.juzgado                            Juzgado
 * @apiParam  {String}  tutor.secretaria                         Secretaria
 * @apiParam  {String}  tutor.dpto_judicial                      Dpto. Judicial
 * @apiParam  {String}  tutor.fiscalia                           Fiscalia
 * @apiParam  {String}  tutor.defensoria                         Defensoria
 *
 *
 * @apiParamExample {json} Peticion:
 *    {
 *      "solicitante": {
 *        "nombres": "Juan Antonio",
 *        "apellidos": "Garcia Candio",
 *        "fecha_nacimiento": "08-24-1994",
 *        "genero": "FEMENINO",
 *        "tipo_doc": "DNI",
 *        "pais": "SOMALIA",
 *        "nro_doc": "981224324",
 *        "cuil": "32435436",
 *        "nacionalidad": "SOMALIANO",
 *        "tipo": "NATIVO",
 *        "tipo_residencia": "PRECARIA",
 *        "fecha_vencimiento": "24-06-1994",
 *        "domicilio": "Alguno",
 *        "provincia": "Buenos Aires",
 *        "departamento": "2A",
 *        "localidad": "Alguna",
 *        "cod_postal": "235465",
 *        "telefono": "4354778",
 *        "email": "ficticio@gmail.com",
 *        "estado_civil": "Soltero",
 *        "vehiculo_ley": true,
 *        "fecha_ley": "23-12-1994",
 *        "simbolo_internacional": true,
 *        "percibir_asignacion": true
 *      },
 *      "representante": {
 *        "interesado": "Designacion normal",
 *        "familiar": "Madre",
 *        "nombre_familiar": "Rosa Guadalupe de la concepcion",
 *        "apellido_familiar": "Palacios",
 *        "tipo_doc_familiar": "DNI",
 *        "pais_familiar": "TANZANIA",
 *        "nro_doc_familiar": "44575987",
 *        "nacionalidad_familiar": "Tanzaniano",
 *        "domicilio_familiar": "Alguno",
 *        "cod_postal_familiar": "336668",
 *        "localidad_familiar": "Alguno",
 *        "provincia_familiar": "Santa Fe",
 *        "telefono_familiar": "3465867"
 *      },
 *      "tutor": {
 *        "designacion": "Super Designacion",
 *        "fecha_designacion": "21-04-2009",
 *        "juzgado": "Alguna",
 *        "secretaria": "Alguna",
 *        "dpto_judicial": "Alguna",
 *        "fiscalia": "Alguna",
 *        "defensoria": "Alguna"
 *      }
 *    }
 *
 */
router.route('/planilla')
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post(planillaCtrl.sendPDF)
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
