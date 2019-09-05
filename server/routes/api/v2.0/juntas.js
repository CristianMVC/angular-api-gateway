import express                from 'express'
import APIError               from '../../../helpers/APIError'
import juntasCtrl             from '../../../controllers/v2.0/juntas/juntas'
import { idTokenMiddleware, } from './../../../middelwares/tokenMiddleware'


const router = express.Router() // eslint-disable-line new-cap


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/

/**
 *
 * @api {GET} v2.0/juntas/juntas                      Listado de Juntas con Requisitos
 * @apiName listadoDeJuntasYRequisitos
 * @apiGroup SALUD
 * @apiVersion 1.1.0
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
 * @apiSuccess (200) {Object[]} results.juntas                         Juntas
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
 *         "juntas": [
 *           {
 *             "provincia": "Buenos Aires",
 *             "localidad": "Bahía Blanca ",
 *             "nombre": "Junta Evaluadora- Secretaría de Salud",
 *             "direccion": "Chiclana N° 451",
 *             "contacto": "(0291) 5506015 / 5506033/cudbahiablanca@gmail.com",
 *             "botonTurno": "",
 *             "botonAsesoramiento": "",
 *             "botonConsulta": ""
 *           },
 *           {
 *             "provincia": "Buenos Aires",
 *             "localidad": "Bahía Blanca",
 *             "nombre": "Junta Evaluadora 2da instancia: Región Sanitaria I",
 *             "direccion": "Moreno 267",
 *             "contacto": "0291-4537207/ discapacidad@regionsanitaria1.com",
 *             "botonTurno": "",
 *             "botonAsesoramiento": "",
 *             "botonConsulta": ""
 *           }
 *         ],
 *         "requisitos": [
 *            "<p>Resolución judicial donde conste la <strong>designación del curador o curadores designados</strong> + DNI de la/s persona/s designada/s judicialmente como curador o curadores. (original y fotocopia)</p>",
 *            "<p>En caso de no contar con un certificado médico con las características descritas se sugiere presentar la siguiente planilla completada por el equipo tratante (no más de 6 meses de antiguedad)\n<a href=\"https://www.argentina.gob.ar/sites/default/files/planilla_para_evaluar_condicion_de_salud_enfermedad_renal_urologica.pdf\">Descargar Planilla (Trastrorno renal urológico)</a></p>",
 *            "<p><strong>DNI</strong> de la persona que será evaluada (original y fotocopia) y CUD anterior (original). En caso de pérdida del CUD traer la denuncia de extravío.</p>",
 *            "<p><strong>Certificado médico completo o Resumen de historia clínica original (de no más de 6 meses)</strong> especificando:</p>\n\n<ul><li>Diagnóstico principal</li><li>Antecedentes de la enfermedad y tiempo de evolución</li><li>Filtrado glomerular</li><li>Tratamiento indicado</li><li>Firma y sello del médico y/o equipo tratante</li></ul>",
 *            "<p><strong>Credencial de PAMI</strong>.</p>",
 *            "<p><strong>Planilla para solicitar el certificado único de discapacidad</strong> <a href='https://www.argentina.gob.ar/sites/default/files/planilla_beneficiario_2018.pdf'>Descargar Planilla (Solicitud de certificado único de discapacidad)</a></p>",
 *            "<p>Si poseés, <strong>estudios complementarios</strong> de no más de 6 meses de antigüedad que avalen el diagnóstico:campo visual u otros estudios complementarios que avalen el diagnóstico (original y fotocopia).</p>",
 *            "<p><strong>Planilla</strong> para personas con <strong>discapacidad visual</strong> completada por el médico oftalmológico con una antiguedad no mayor a 6 meses. (original y fotocopia) <a href='https://www.argentina.gob.ar/sites/default/files/planilla_para_evaluar_condicion_de_salud_visual.pdf'>Descargar Planilla (Visual)</a></p>"
 *         ],
 *         "mensaje": "<p>Según el trámite a realizar <strong>(Renovación)</strong>, el origen del problema de salud por el cual se solicita el certificado <strong>(Visual, Renal urológico)</strong>, la edad <strong>(mayor de 16 años)</strong> y el tipo de cobertura <strong>(PAMI)</strong> tenés que presentar esta documentación:</p>"
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
  .get(
    idTokenMiddleware,
    juntasCtrl.getElement
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router
