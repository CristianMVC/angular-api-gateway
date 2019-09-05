import express                      from 'express'
import validate                     from 'express-validation'
import paramValidation              from '../../../../config/param-validation'
import cache                        from './../../../../config/cache'
import defensaConsumidorCtrl        from '../../../controllers/v1.0/defensa-consumidor'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/search').get(cache.route())
router.route('/issues').get(cache.route())
router.route('/issues/:issue_id').get(cache.route())
router.route('/projects').get(cache.route())
router.route('/projects/:project_id').get(cache.route())


/** ------------------------------------
 *    Service Routes
 *    ~/api/v1.0/defensa-consumidor
 ** ------------------------------------*/

/** ~/search */
/**
 *
 * @api {GET} v1.0/defensa-consumidor/search Search Issues
 * @apiName getSearchIssues
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} paramName description
 * @apiParam  {String} dni Numero de documento
 * @apiParam  {String} tipoDNI Tipo de Documento
 * @apiParam  {String} issues Numeros de issues
 * @apiParam  {String} fields
 * @apiParam  {String} offset
 * @apiParam  {String} limit
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *     "metadata": {
 *         "resultset": {
 *             "count": 1,
 *             "offset": 0,
 *             "limit": 0
 *         }
 *     },
 *     "results": [
 *         {
 *             "issue": {
 *                 "custom_fields": {
 *                     "id": "2891905e-3b95-fc1b-3c1e-5a96b17fdc26",
 *                     "name": "",
 *                     "date_entered": "2018-02-28 13:40:00",
 *                     "date_modified": "2018-03-12 18:44:23",
 *                     "modified_user_id": "d3b0c3c8-2f0b-fb27-7fb3-5a9802997bdd",
 *                     "created_by": "b8d83c3e-eaae-71ad-db64-594a6f1a24d0",
 *                     "description": null,
 *                     "deleted": "0",
 *                     "assigned_user_id": "",
 *                     "nombre": "Sergio Gabriel",
 *                     "apellido": "Mengual",
 *                     "doc_tipo": "mdp_dni",
 *                     "doc_numero": "25587333",
 *                     "fecha_nacimiento": "1976-11-05",
 *                     "domicilio": "Godofredo Paladini 1401 Los Corralitos Guaymallen",
 *                     "cp": "5527",
 *                     "tel_prefijo": "261",
 *                     "tel_numero": "6654420",
 *                     "email": "sergiogabrielmengual@gmail.com",
 *                     "titular_nombre": null,
 *                     "reclamo_numero": "Reclamo por Whattsap",
 *                     "loc_compra": "Los Corralitos",
 *                     "prov_1_nombre": "Wesnet Internet",
 *                     "prov_1_cuit": "20204982215",
 *                     "prov_1_domicilio": "Calle 9 de Julio 1257, M5500ALM Mendoza",
 *                     "prov_1_localidad": "Mendoza",
 *                     "prov_2_nombre": null,
 *                     "prov_2_cuit": null,
 *                     "prov_2_domicilio": null,
 *                     "prov_2_localidad": null,
 *                     "prov_3_nombre": null,
 *                     "prov_3_cuit": null,
 *                     "prov_3_domicilio": null,
 *                     "prov_3_localidad": null,
 *                     "prov_4_nombre": null,
 *                     "prov_4_cuit": null,
 *                     "prov_4_domicilio": null,
 *                     "prov_4_localidad": null,
 *                     "prov_5_nombre": null,
 *                     "prov_5_cuit": null,
 *                     "prov_5_domicilio": null,
 *                     "prov_5_localidad": null,
 *                     "percepcion": null,
 *                     "expediente_numero": null,
 *                     "horario_audiencia": null,
 *                     "horario_nueva_audencia": null,
 *                     "problema": "Westnet Internet no  atiende los reclamos que he echo por corted reiterados del servicio de internet. Hace mas de 2 meses que la coneccion se interrumpe. Constantemente debo desconectar todo, antena y router y volver a conectar todo, y la coneccion vuelve como mucho por 5 minutos y se vuelve a cortar. Tengo todas las facturas pagas y con comprobantes. Lo peor de todo que el costo de la factura incluye el alquiler de los equipos de antena y coneccion que son en comodato, y no funcionan, y ya he reclamado un sinnumero de veces al numero de whatssap del servicio tecnico para que envien un tecnico a verificar si el equipo funciona bien o lo reemplazen y nada.",
 *                     "resumen_laudo": null,
 *                     "monto": null,
 *                     "fecha_ingreso_snac": null,
 *                     "fecha_intimacion_cosumidor": null,
 *                     "fecha_intimacion_empresa": null,
 *                     "notifica_empresa": null,
 *                     "notifica_consumidor": null,
 *                     "fecha_recepcion_documentacion": null,
 *                     "notifica_empresa_no_adherida_1": null,
 *                     "libram_empresa_no_adherida_1": null,
 *                     "notifica_empresa_no_adherida_2": null,
 *                     "libram_empresa_no_adherida_2": null,
 *                     "notifica_empresa_no_adherida_3": null,
 *                     "libram_empresa_no_adherida_3": null,
 *                     "notifica_empresa_adherida_1": null,
 *                     "libram_empresa_adherida_1": null,
 *                     "notifica_empresa_adherida_2": null,
 *                     "libram_empresa_adherida_2": null,
 *                     "notifica_empresa_adherida_3": null,
 *                     "libram_empresa_adherida_3": null,
 *                     "pase_jurisdiccion": null,
 *                     "notificacion_consumidor": null,
 *                     "conformacion_de_tribunal": null,
 *                     "libram_translado_de_doc_1": null,
 *                     "nofica_translado_de_doc_1": null,
 *                     "libram_translado_de_doc_2": null,
 *                     "nofica_translado_de_doc_2": null,
 *                     "libram_translado_de_doc_3": null,
 *                     "nofica_translado_de_doc_3": null,
 *                     "autos_para_resolver": null,
 *                     "expedientes_abierto_prueba": null,
 *                     "desistido": null,
 *                     "laudo": null,
 *                     "notificacion_laudo_emp_1": null,
 *                     "notificacion_laudo_emp_2": null,
 *                     "notificacion_laudo_emp_3": null,
 *                     "archivo": null,
 *                     "desarchivo": null,
 *                     "laudo_electronico": null,
 *                     "laudo_turistico": null,
 *                     "estitular": "1",
 *                     "uso_producto": "1",
 *                     "reclamo_gov": "0",
 *                     "documentacion_probatoria": "1",
 *                     "enviado": "0",
 *                     "sexo": "mdp_masculino",
 *                     "provincia": "13",
 *                     "loc_provincia": "13",
 *                     "prov_1_provincia": "13",
 *                     "prov_2_provincia": null,
 *                     "prov_3_provincia": null,
 *                     "prov_4_provincia": null,
 *                     "prov_5_provincia": null,
 *                     "categoria": "servicios",
 *                     "modalidad_compra": "a_distancia",
 *                     "observaciones": "ninguna",
 *                     "jurisdiccion_pase": null,
 *                     "elige_organismo": "0",
 *                     "subject": "25587333",
 *                     "created_on": null,
 *                     "empresa_acepta_rechaza_arb_1": null,
 *                     "empresa_acepta_rechaza_arb_2": null,
 *                     "empresa_acepta_rechaza_arb_3": null,
 *                     "telefono": null,
 *                     "direccion": null,
 *                     "horario_de_atencion": null,
 *                     "como_espera_que_se_resuelva": "Bonificación en el abono.\nReparación del producto / servicio técnico.\nDevolución del dinero.",
 *                     "organismo_resolucion": null,
 *                     "localidad": "Los Corralitos",
 *                     "organismo_al_que_reclamo": null,
 *                     "n_de_reclamo_al_organismo": null,
 *                     "status": "en_curso",
 *                     "motivo_de_cancelacion": null,
 *                     "rubro": "servicios_servicios_de_comunicaciones",
 *                     "subrubro": "servicios_servicios_de_comunicaciones_internet",
 *                     "motivo": "servicios_servicios_de_comunicaciones_cumplimiento_parcial_o_defectuoso_de_la_prestacion_del_servicio",
 *                     "especificacion_motivo": "servicios_servicios_de_comunicaciones_cumplimiento_parcial_o_defectuoso_de_la_prestacion_del_servicio_conectividad_deficiente",
 *                     "localidad_uso": "Los Corralitos",
 *                     "provincia_uso": "13",
 *                     "motivo_de_archivo": null,
 *                     "reclamo_al_proveedor": "1",
 *                     "adjunta_documentacion": "1",
 *                     "motivo_rechazo": null,
 *                     "sorteo_de_arbitro_ins": null,
 *                     "sustituto_de_arbitro": null,
 *                     "arbitros_consumidores": null,
 *                     "arbitros_empresariales": null,
 *                     "notas": null,
 *                     "proyect_ant": "mendoza",
 *                     "pretensiones": null,
 *                     "proyecto": "mendoza",
 *                     "user_id_c": "298092dd-1d13-716a-585a-594151e5e96d",
 *                     "remplazar_por_id": null,
 *                     "prov_extra_nombre": null,
 *                     "prov_extra_cuit": null,
 *                     "prov_extra_domicilio": null,
 *                     "prov_extra_localidad": null,
 *                     "prov_extra_provincia": null,
 *                     "securityrol": "VUFDC_VIEW_GROUP_MOD_DERIVADOR",
 *                     "empresa_acepta_arb_1": "vufdc_acepta_vacio",
 *                     "empresa_acepta_arb_2": "vufdc_acepta_vacio",
 *                     "empresa_acepta_arb_3": "vufdc_acepta_vacio",
 *                     "nueva_audiencia": null,
 *                     "audiencia": null,
 *                     "laudo_con_acuerdo": "vufdc_acepta_vacio",
 *                     "sus_sorteo_de_arbitro_ins": null,
 *                     "sus_arbitro_consumidor": null,
 *                     "sus_arbitro_empresariales": null,
 *                     "redmine_id": "126744",
 *                     "coprec_cbte_fecha_c": null,
 *                     "coprec_cuit_3_c": "",
 *                     "prov_1_domicilio_calle_c": "Calle",
 *                     "prov_1_domicilio_dto_c": "",
 *                     "coprec_cbte_monto_c": null,
 *                     "coprec_cuit_c": "20204982215",
 *                     "prov_1_domicilio_piso_c": "",
 *                     "domicilio_departamento_c": "",
 *                     "coprec_usuario_c": "",
 *                     "nacionalidad_c": "-",
 *                     "coprec_fecha_c": null,
 *                     "domicilio_piso_c": "",
 *                     "coprec_cuit_4_c": "",
 *                     "domicilio_numero_c": "1401",
 *                     "dndc_banco_central_c": "0",
 *                     "coprec_numero_c": "",
 *                     "user_id1_c": "298092dd-1d13-716a-585a-594151e5e96d",
 *                     "coprec_cbte_numero_c": "",
 *                     "coprec_cbte_item_c": "",
 *                     "coprec_cbte_tipo_c": "",
 *                     "superestado_c": "abierto",
 *                     "domicilio_calle_c": "Godofredo Paladini",
 *                     "prov_1_domicilio_numero_c": "9",
 *                     "coprec_cuit_5_c": "",
 *                     "coprec_cuit_2_c": "",
 *                     "coprec_localidad_c": "",
 *                     "coprec_loc_compra_c": "",
 *                     "coprec_loc_uso_c": "",
 *                     "coprec_proveedor_1_loc_c": "",
 *                     "coprec_proveedor_1_prov_c": "4661",
 *                     "coprec_proveedor_2_loc_c": "",
 *                     "coprec_proveedor_2_prov_c": "0",
 *                     "coprec_proveedor_3_loc_c": "",
 *                     "coprec_proveedor_3_prov_c": "0",
 *                     "coprec_proveedor_4_loc_c": "",
 *                     "coprec_proveedor_4_prov_c": "0",
 *                     "coprec_proveedor_5_loc_c": "",
 *                     "coprec_proveedor_5_prov_c": "0",
 *                     "coprec_provincia_c": "4661",
 *                     "coprec_prov_compra_c": "4661",
 *                     "coprec_prov_uso_c": "4661",
 *                     "prov_2_domicilio_calle_c": "",
 *                     "prov_2_domicilio_dto_c": "",
 *                     "prov_2_domicilio_numero_c": "0",
 *                     "prov_2_domicilio_piso_c": "",
 *                     "prov_3_domicilio_calle_c": "",
 *                     "prov_3_domicilio_dto_c": "",
 *                     "prov_3_domicilio_numero_c": "0",
 *                     "prov_3_domicilio_piso_c": "",
 *                     "prov_4_domicilio_calle_c": "",
 *                     "prov_4_domicilio_dto_c": "",
 *                     "prov_4_domicilio_numero_c": "0",
 *                     "prov_4_domicilio_piso_c": "",
 *                     "prov_5_domicilio_calle_c": "",
 *                     "prov_5_domicilio_dto_c": "",
 *                     "prov_5_domicilio_numero_c": "0",
 *                     "prov_5_domicilio_piso_c": "",
 *                     "modified_by_name": "alejandro.quilpatay",
 *                     "modified_by_name_owner": "3545d403-814a-d86e-e0c4-5861744fe842",
 *                     "modified_by_name_mod": "Users",
 *                     "created_by_name": "argentinagobar",
 *                     "created_by_name_owner": "62261933-1db0-8903-d8a9-58c69a34df5f",
 *                     "created_by_name_mod": "Users",
 *                     "assigned_user_name": null,
 *                     "assigned_user_name_owner": null,
 *                     "assigned_user_name_mod": "Users",
 *                     "proyecto_asignado": "JURISDICCIONES PROYECTO",
 *                     "security_group_user_id_c": "JURISDICCIONES PROYECTO"
 *                 },
 *                 "id": "126744",
 *                 "proyect": {
 *                     "name": "JURISDICCIONES PROYECTO",
 *                     "address": null,
 *                     "phone": null,
 *                     "opening_hours": "",
 *                     "email": ""
 *                 }
 *             }
 *         }
 *     ]
 * }
 *
 */
router.route('/search')
  /** GET - Get list of issues */
  .get(validate(paramValidation.webServices.defensaConsumidor.searchCRM), defensaConsumidorCtrl.search)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))




/** ~/issues/:issue_id */
/**
 *
 * @api {GET} v1.0/defensa-consumidor/search/:issue_id Get Issue
 * @apiName getIssue
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} issue_id Id de Issue
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *     "issue": {
 *         "custom_fields": {
 *             "id": "2891905e-3b95-fc1b-3c1e-5a96b17fdc26",
 *             "name": "",
 *             "date_entered": "2018-02-28 13:40:00",
 *             "date_modified": "2018-03-12 18:44:23",
 *             "modified_user_id": "d3b0c3c8-2f0b-fb27-7fb3-5a9802997bdd",
 *             "created_by": "b8d83c3e-eaae-71ad-db64-594a6f1a24d0",
 *             "description": null,
 *             "deleted": "0",
 *             "assigned_user_id": "",
 *             "nombre": "Sergio Gabriel",
 *             "apellido": "Mengual",
 *             "doc_tipo": "mdp_dni",
 *             "doc_numero": "25587333",
 *             "fecha_nacimiento": "1976-11-05",
 *             "domicilio": "Godofredo Paladini 1401 Los Corralitos Guaymallen",
 *             "cp": "5527",
 *             "tel_prefijo": "261",
 *             "tel_numero": "6654420",
 *             "email": "sergiogabrielmengual@gmail.com",
 *             "titular_nombre": null,
 *             "reclamo_numero": "Reclamo por Whattsap",
 *             "loc_compra": "Los Corralitos",
 *             "prov_1_nombre": "Wesnet Internet",
 *             "prov_1_cuit": "20204982215",
 *             "prov_1_domicilio": "Calle 9 de Julio 1257, M5500ALM Mendoza",
 *             "prov_1_localidad": "Mendoza",
 *             "prov_2_nombre": null,
 *             "prov_2_cuit": null,
 *             "prov_2_domicilio": null,
 *             "prov_2_localidad": null,
 *             "prov_3_nombre": null,
 *             "prov_3_cuit": null,
 *             "prov_3_domicilio": null,
 *             "prov_3_localidad": null,
 *             "prov_4_nombre": null,
 *             "prov_4_cuit": null,
 *             "prov_4_domicilio": null,
 *             "prov_4_localidad": null,
 *             "prov_5_nombre": null,
 *             "prov_5_cuit": null,
 *             "prov_5_domicilio": null,
 *             "prov_5_localidad": null,
 *             "percepcion": null,
 *             "expediente_numero": null,
 *             "horario_audiencia": null,
 *             "horario_nueva_audencia": null,
 *             "problema": "Westnet Internet no  atiende los reclamos que he echo por corted reiterados del servicio de internet. Hace mas de 2 meses que la coneccion se interrumpe. Constantemente debo desconectar todo, antena y router y volver a conectar todo, y la coneccion vuelve como mucho por 5 minutos y se vuelve a cortar. Tengo todas las facturas pagas y con comprobantes. Lo peor de todo que el costo de la factura incluye el alquiler de los equipos de antena y coneccion que son en comodato, y no funcionan, y ya he reclamado un sinnumero de veces al numero de whatssap del servicio tecnico para que envien un tecnico a verificar si el equipo funciona bien o lo reemplazen y nada.",
 *             "resumen_laudo": null,
 *             "monto": null,
 *             "fecha_ingreso_snac": null,
 *             "fecha_intimacion_cosumidor": null,
 *             "fecha_intimacion_empresa": null,
 *             "notifica_empresa": null,
 *             "notifica_consumidor": null,
 *             "fecha_recepcion_documentacion": null,
 *             "notifica_empresa_no_adherida_1": null,
 *             "libram_empresa_no_adherida_1": null,
 *             "notifica_empresa_no_adherida_2": null,
 *             "libram_empresa_no_adherida_2": null,
 *             "notifica_empresa_no_adherida_3": null,
 *             "libram_empresa_no_adherida_3": null,
 *             "notifica_empresa_adherida_1": null,
 *             "libram_empresa_adherida_1": null,
 *             "notifica_empresa_adherida_2": null,
 *             "libram_empresa_adherida_2": null,
 *             "notifica_empresa_adherida_3": null,
 *             "libram_empresa_adherida_3": null,
 *             "pase_jurisdiccion": null,
 *             "notificacion_consumidor": null,
 *             "conformacion_de_tribunal": null,
 *             "libram_translado_de_doc_1": null,
 *             "nofica_translado_de_doc_1": null,
 *             "libram_translado_de_doc_2": null,
 *             "nofica_translado_de_doc_2": null,
 *             "libram_translado_de_doc_3": null,
 *             "nofica_translado_de_doc_3": null,
 *             "autos_para_resolver": null,
 *             "expedientes_abierto_prueba": null,
 *             "desistido": null,
 *             "laudo": null,
 *             "notificacion_laudo_emp_1": null,
 *             "notificacion_laudo_emp_2": null,
 *             "notificacion_laudo_emp_3": null,
 *             "archivo": null,
 *             "desarchivo": null,
 *             "laudo_electronico": null,
 *             "laudo_turistico": null,
 *             "estitular": "1",
 *             "uso_producto": "1",
 *             "reclamo_gov": "0",
 *             "documentacion_probatoria": "1",
 *             "enviado": "0",
 *             "sexo": "mdp_masculino",
 *             "provincia": "13",
 *             "loc_provincia": "13",
 *             "prov_1_provincia": "13",
 *             "prov_2_provincia": null,
 *             "prov_3_provincia": null,
 *             "prov_4_provincia": null,
 *             "prov_5_provincia": null,
 *             "categoria": "servicios",
 *             "modalidad_compra": "a_distancia",
 *             "observaciones": "ninguna",
 *             "jurisdiccion_pase": null,
 *             "elige_organismo": "0",
 *             "subject": "25587333",
 *             "created_on": null,
 *             "empresa_acepta_rechaza_arb_1": null,
 *             "empresa_acepta_rechaza_arb_2": null,
 *             "empresa_acepta_rechaza_arb_3": null,
 *             "telefono": null,
 *             "direccion": null,
 *             "horario_de_atencion": null,
 *             "como_espera_que_se_resuelva": "Bonificación en el abono.\nReparación del producto / servicio técnico.\nDevolución del dinero.",
 *             "organismo_resolucion": null,
 *             "localidad": "Los Corralitos",
 *             "organismo_al_que_reclamo": null,
 *             "n_de_reclamo_al_organismo": null,
 *             "status": "en_curso",
 *             "motivo_de_cancelacion": null,
 *             "rubro": "servicios_servicios_de_comunicaciones",
 *             "subrubro": "servicios_servicios_de_comunicaciones_internet",
 *             "motivo": "servicios_servicios_de_comunicaciones_cumplimiento_parcial_o_defectuoso_de_la_prestacion_del_servicio",
 *             "especificacion_motivo": "servicios_servicios_de_comunicaciones_cumplimiento_parcial_o_defectuoso_de_la_prestacion_del_servicio_conectividad_deficiente",
 *             "localidad_uso": "Los Corralitos",
 *             "provincia_uso": "13",
 *             "motivo_de_archivo": null,
 *             "reclamo_al_proveedor": "1",
 *             "adjunta_documentacion": "1",
 *             "motivo_rechazo": null,
 *             "sorteo_de_arbitro_ins": null,
 *             "sustituto_de_arbitro": null,
 *             "arbitros_consumidores": null,
 *             "arbitros_empresariales": null,
 *             "notas": null,
 *             "proyect_ant": "mendoza",
 *             "pretensiones": null,
 *             "proyecto": "mendoza",
 *             "user_id_c": "298092dd-1d13-716a-585a-594151e5e96d",
 *             "remplazar_por_id": null,
 *             "prov_extra_nombre": null,
 *             "prov_extra_cuit": null,
 *             "prov_extra_domicilio": null,
 *             "prov_extra_localidad": null,
 *             "prov_extra_provincia": null,
 *             "securityrol": "VUFDC_VIEW_GROUP_MOD_DERIVADOR",
 *             "empresa_acepta_arb_1": "vufdc_acepta_vacio",
 *             "empresa_acepta_arb_2": "vufdc_acepta_vacio",
 *             "empresa_acepta_arb_3": "vufdc_acepta_vacio",
 *             "nueva_audiencia": null,
 *             "audiencia": null,
 *             "laudo_con_acuerdo": "vufdc_acepta_vacio",
 *             "sus_sorteo_de_arbitro_ins": null,
 *             "sus_arbitro_consumidor": null,
 *             "sus_arbitro_empresariales": null,
 *             "redmine_id": "126744",
 *             "coprec_cbte_fecha_c": null,
 *             "coprec_cuit_3_c": "",
 *             "prov_1_domicilio_calle_c": "Calle",
 *             "prov_1_domicilio_dto_c": "",
 *             "coprec_cbte_monto_c": null,
 *             "coprec_cuit_c": "20204982215",
 *             "prov_1_domicilio_piso_c": "",
 *             "domicilio_departamento_c": "",
 *             "coprec_usuario_c": "",
 *             "nacionalidad_c": "-",
 *             "coprec_fecha_c": null,
 *             "domicilio_piso_c": "",
 *             "coprec_cuit_4_c": "",
 *             "domicilio_numero_c": "1401",
 *             "dndc_banco_central_c": "0",
 *             "coprec_numero_c": "",
 *             "user_id1_c": "298092dd-1d13-716a-585a-594151e5e96d",
 *             "coprec_cbte_numero_c": "",
 *             "coprec_cbte_item_c": "",
 *             "coprec_cbte_tipo_c": "",
 *             "superestado_c": "abierto",
 *             "domicilio_calle_c": "Godofredo Paladini",
 *             "prov_1_domicilio_numero_c": "9",
 *             "coprec_cuit_5_c": "",
 *             "coprec_cuit_2_c": "",
 *             "coprec_localidad_c": "",
 *             "coprec_loc_compra_c": "",
 *             "coprec_loc_uso_c": "",
 *             "coprec_proveedor_1_loc_c": "",
 *             "coprec_proveedor_1_prov_c": "4661",
 *             "coprec_proveedor_2_loc_c": "",
 *             "coprec_proveedor_2_prov_c": "0",
 *             "coprec_proveedor_3_loc_c": "",
 *             "coprec_proveedor_3_prov_c": "0",
 *             "coprec_proveedor_4_loc_c": "",
 *             "coprec_proveedor_4_prov_c": "0",
 *             "coprec_proveedor_5_loc_c": "",
 *             "coprec_proveedor_5_prov_c": "0",
 *             "coprec_provincia_c": "4661",
 *             "coprec_prov_compra_c": "4661",
 *             "coprec_prov_uso_c": "4661",
 *             "prov_2_domicilio_calle_c": "",
 *             "prov_2_domicilio_dto_c": "",
 *             "prov_2_domicilio_numero_c": "0",
 *             "prov_2_domicilio_piso_c": "",
 *             "prov_3_domicilio_calle_c": "",
 *             "prov_3_domicilio_dto_c": "",
 *             "prov_3_domicilio_numero_c": "0",
 *             "prov_3_domicilio_piso_c": "",
 *             "prov_4_domicilio_calle_c": "",
 *             "prov_4_domicilio_dto_c": "",
 *             "prov_4_domicilio_numero_c": "0",
 *             "prov_4_domicilio_piso_c": "",
 *             "prov_5_domicilio_calle_c": "",
 *             "prov_5_domicilio_dto_c": "",
 *             "prov_5_domicilio_numero_c": "0",
 *             "prov_5_domicilio_piso_c": "",
 *             "modified_by_name": "alejandro.quilpatay",
 *             "modified_by_name_owner": "3545d403-814a-d86e-e0c4-5861744fe842",
 *             "modified_by_name_mod": "Users",
 *             "created_by_name": "argentinagobar",
 *             "created_by_name_owner": "62261933-1db0-8903-d8a9-58c69a34df5f",
 *             "created_by_name_mod": "Users",
 *             "assigned_user_name": null,
 *             "assigned_user_name_owner": null,
 *             "assigned_user_name_mod": "Users",
 *             "proyecto_asignado": "JURISDICCIONES PROYECTO",
 *             "security_group_user_id_c": "JURISDICCIONES PROYECTO"
 *         },
 *         "id": "126744",
 *         "proyect": {
 *             "name": "JURISDICCIONES PROYECTO",
 *             "address": null,
 *             "phone": null,
 *             "opening_hours": "",
 *             "email": ""
 *         }
 *     }
 * }
 *
 *
 */
router.route('/issues/:issue_id')
	/** GET - Get issue */
	.get(validate(paramValidation.webServices.defensaConsumidor.issues), defensaConsumidorCtrl.getById)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/issues */
/**
 *
 * @api {POST} v1.0/defensa-consumidor/issues Create Issue
 * @apiName postIssue
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {string} subject subject
 * @apiParam {string} nombre nombre
 * @apiParam {string} apellido apellido
 * @apiParam {string} doc_tipo doc_tipo
 * @apiParam {string} doc_numero doc_numero
 * @apiParam {string} sexo sexo
 * @apiParam {string} fecha_nacimiento fecha_nacimiento
 * @apiParam {string} domicilio domicilio
 * @apiParam {string} provincia provincia
 * @apiParam {string} localidad localidad
 * @apiParam {string} cp cp
 * @apiParam {number} tel_prefijo tel_prefijo
 * @apiParam {number} tel_numero tel_numero
 * @apiParam {string} email email
 * @apiParam {string} problema problema
 * @apiParam {string} reclamo_al_proveedor reclamo_al_proveedor
 * @apiParam {string} reclamo_numero reclamo_numero
 * @apiParam {string} reclamo_gob reclamo_gob
 * @apiParam {string} organismo_que_reclamo organismo_que_reclamo
 * @apiParam {string} reclamo_gob_numero reclamo_gob_numero
 * @apiParam {string} loc_compra loc_compra
 * @apiParam {string} localidad_uso localidad_uso
 * @apiParam {string} documentacion_probatoria documentacion_probatoria
 * @apiParam {string} adjunta_documentacion adjunta_documentacion
 * @apiParam {string} estitular estitular
 * @apiParam {string} titular_nombre titular_nombre
 * @apiParam {string} uso_producto uso_producto
 * @apiParam {string} como_espera_que_se_resuelva como_espera_que_se_resuelva
 * @apiParam {string} pretensiones pretensiones
 * @apiParam {string} elige_organismo elige_organismo
 * @apiParam {string} loc_provincia loc_provincia
 * @apiParam {string} provincia_uso provincia_uso
 * @apiParam {string} prov_1_nombre prov_1_nombre
 * @apiParam {number} prov_1_cuit prov_1_cuit
 * @apiParam {string} prov_1_domicilio prov_1_domicilio
 * @apiParam {string} prov_1_localidad prov_1_localidad
 * @apiParam {string} prov_1_provincia prov_1_provincia
 * @apiParam {string} prov_2_nombre prov_2_nombre
 * @apiParam {number} prov_2_cuit prov_2_cuit
 * @apiParam {string} prov_2_domicilio prov_2_domicilio
 * @apiParam {string} prov_2_localidad prov_2_localidad
 * @apiParam {string} prov_2_provincia prov_2_provincia
 * @apiParam {string} prov_3_nombre prov_3_nombre
 * @apiParam {number} prov_3_cuit prov_3_cuit
 * @apiParam {string} prov_3_domicilio prov_3_domicilio
 * @apiParam {string} prov_3_localidad prov_3_localidad
 * @apiParam {string} prov_3_provincia prov_3_provincia
 * @apiParam {string} prov_4_nombre prov_4_nombre
 * @apiParam {number} prov_4_cuit prov_4_cuit
 * @apiParam {string} prov_4_domicilio prov_4_domicilio
 * @apiParam {string} prov_4_localidad prov_4_localidad
 * @apiParam {string} prov_4_provincia prov_4_provincia
 * @apiParam {string} prov_5_nombre prov_5_nombre
 * @apiParam {number} prov_5_cuit prov_5_cuit
 * @apiParam {string} prov_5_domicilio prov_5_domicilio
 * @apiParam {string} prov_5_localidad prov_5_localidad
 * @apiParam {string} prov_5_provincia prov_5_provincia
 *
 * @apiSuccess (200) {Json} Object Issue Object
 */
router.route('/issues')
  /** POST - Create new issue */
	.post(validate(paramValidation.webServices.defensaConsumidor.createIssue), defensaConsumidorCtrl.createIssue)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** ~/projects */
router.route('/projects')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** ~/projects/:project_id */
/**
 *
 * @api {GET} v1.0/defensa-consumidor/projects/:project_id Get Proyect
 * @apiName getProyect
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} project_id Id Proyect
 */
router.route('/projects/:project_id')
  .get(validate(paramValidation.webServices.defensaConsumidor.projects), defensaConsumidorCtrl.getProject)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** ~/create-document */
/**
 *
 * @api {POST} v1.0/defensa-consumidor/create-document/:filename Post New File
 * @apiName postNewFile
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} filename Nombre de Archivo
 *
 * @apiSuccess (200) {text} uuid uuid
 *
 * @apiSuccessExample {String} Success-Response:
 * 901b0b2f-67b1-334a-3188-5d110a6da293
 */
router.route('/create-document/:filename')
  /** POST - Create new File */
  .post(validate(paramValidation.webServices.defensaConsumidor.createDocument), defensaConsumidorCtrl.createDocument)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/upload-file/:doc_id */
/**
 * @api {POST} v1.0/defensa-consumidor/upload-file/:doc_id Upload File
 * @apiName postUploadFile
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} project_id Id Proyect
 *
 * @apiSuccess (200) {uuid} id File ID
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *  "id": "e88550c7-9e1b-e0bb-eb0e-5d110966cde8"
 * }
 */
router.route('/upload-file/:doc_id')
  /** POST - Create new File */
	.post(validate(paramValidation.webServices.defensaConsumidor.uploadFile), defensaConsumidorCtrl.uploadFile)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/** ~/upload-file */
/**
 * @api {POST} v1.0/defensa-consumidor/upload-file Create File
 * @apiName postCreatFile
 * @apiGroup Defensa del Consumidor
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {File} files File Binary
 *
 * @apiSuccess (200) {uuid} id File ID
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *  "id": "e88550c7-9e1b-e0bb-eb0e-5d110966cde8"
 * }
 */
router.route('/upload-file')
  /** POST - Create new File */
  .post(defensaConsumidorCtrl.uploads)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
