import express from 'express'
import validate from 'express-validation'
import APIError from '../../../helpers/APIError'
import paramValidation from '../../../../config/param-validation'
import incucaiCtrl from '../../../controllers/v2.0/incucai'
import trasplantadosCrtl from './../../../controllers/v2.0/incucai/trasplantados'
import { tcMiddleware, } from './../../../middelwares/tcMiddleware'
import { pgModelList, } from './../../../models/pg-utils'

const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 * Routes
 ** ------------------------------------*/


/**
 *
 * @api {GET} v2.0/incucai/organos/donantes Información del Donante
 * @apiName InformacionDelDonante
 * @apiGroup INCUCAI
 * @apiVersion 1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 *
 * @apiSuccess (200) {String}   nombre
 * @apiSuccess (200) {String}   apellido
 * @apiSuccess (200) {String}   id_tipo_documento
 * @apiSuccess (200) {String}   tipo_documento
 * @apiSuccess (200) {String}   nro_documento
 * @apiSuccess (200) {String}   sexo
 * @apiSuccess (200) {String}   mail
 * @apiSuccess (200) {String}   fecha_nacimiento
 * @apiSuccess (200) {String}   id_estado_civil
 * @apiSuccess (200) {String}   calle
 * @apiSuccess (200) {String}   numero
 * @apiSuccess (200) {String}   piso
 * @apiSuccess (200) {String}   departamento
 * @apiSuccess (200) {String}   telefono
 * @apiSuccess (200) {String}   id_provincia
 * @apiSuccess (200) {String}   id_partido
 * @apiSuccess (200) {String}   id_localidad
 * @apiSuccess (200) {Boolean}  donante
 * @apiSuccess (200) {String[]} dona
 * @apiSuccess (200) {String}   id_proposito
 * @apiSuccess (200) {String}   nombre_apellido_familiar
 * @apiSuccess (200) {String}   vinculo
 * @apiSuccess (200) {String}   telefono_familiar
 * @apiSuccess (200) {String}   mail_familiar
 * @apiSuccess (200) {String}   fecha_registro
 * @apiSuccess (200) {String}   credencial                  Imagen Base64
 * @apiSuccess (200) {String}   credencial_frente           Imagen Base64
 * @apiSuccess (200) {String}   credencial_dorso            Imagen Base64
 * @apiSuccess (200) {String}   credencial_qr               Imagen Base64
 * @apiSuccess (200) {String}   id_situacion_donante
 * @apiSuccess (200) {String}   situacion_donante
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *     "nombre": "KBCSKX WQHWTC",
 *     "apellido": "UQIPNOSINY",
 *     "id_tipo_documento": "1",
 *     "tipo_documento": "DNI",
 *     "nro_documento": "28326638",
 *     "sexo": "M",
 *     "mail": null,
 *     "fecha_nacimiento": "1964-01-08T03:00:00.000Z",
 *     "id_estado_civil": null,
 *     "calle": null,
 *     "numero": null,
 *     "piso": null,
 *     "departamento": null,
 *     "telefono": null,
 *     "id_provincia": "2",
 *     "id_partido": null,
 *     "id_localidad": null,
 *     "donante": true,
 *     "dona": [
 *         "1"
 *     ],
 *     "id_proposito": "1",
 *     "nombre_apellido_familiar": null,
 *     "vinculo": null,
 *     "telefono_familiar": null,
 *     "mail_familiar": null,
 *     "fecha_registro": "1998-03-07T03:00:00.000Z",
 *     "credencial": "Base64",
 *     "credencial_frente": "Base64",
 *     "credencial_dorso": "Base64",
 *     "credencial_qr": "Base64",
 *     "id_situacion_donante": "2",
 *     "situacion_donante": "EFECTIVO"
 *  }
 *
 *
 */


/**
 *
 * @api {POST} v2.0/incucai/organos/donantes Nuevo Donante
 * @apiName nuevoDonante
 * @apiGroup INCUCAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {Boolean}                       [confirmado="true"]
 * @apiParam  {String}                        calle
 * @apiParam  {String}                        numero
 * @apiParam  {String}                        telefono
 * @apiParam  {String}                        id_provincia
 * @apiParam  {String}                        id_partido
 * @apiParam  {String}                        id_localidad
 * @apiParam  {String}                        id_proposito
 * @apiParam  {Boolean}                       donante
 * @apiParam  {String[]=["1"],["2","4","7"]}  dona
 * @apiParam  {String}                        [nombre_apellido_familiar]
 * @apiParam  {String}                        [vinculo]
 * @apiParam  {String}                        [telefono_familiar]
 * @apiParam  {String}                        [mail_familiar]
 * @apiParam  {String}                        [piso]
 * @apiParam  {String}                        [departamento]
 * @apiParam  {String}                        [id_estado_civil]
 * @apiParam  {String}                        [url_validacion]
 *
 *
 * @apiParamExample  {json} Peticion:
 *
 *   {
 *       "calle": "15",
 *       "numero": "3",
 *       "telefono": "95959",
 *       "id_provincia": "1",
 *       "id_partido": "2",
 *       "id_localidad": "1",
 *       "id_proposito": "1",
 *       "donante": false,
 *       "dona": ["1"],
 *       "nombre_apellido_familiar": "",
 *       "vinculo": "",
 *       "telefono_familiar": "",
 *       "mail_familiar": "",
 *       "piso": "",
 *       "departamento": "",
 *       "id_estado_civil": "",
 *       "url_validacion": "",
 *       "confirmado": true
 *   }
 *
 *
 * @apiSuccess (200) {String}    nombre
 * @apiSuccess (200) {String}    apellido
 * @apiSuccess (200) {String}    id_tipo_documento
 * @apiSuccess (200) {String}    tipo_documento
 * @apiSuccess (200) {String}    nro_documento
 * @apiSuccess (200) {String}    sexo
 * @apiSuccess (200) {String}    mail
 * @apiSuccess (200) {String}    fecha_nacimiento
 * @apiSuccess (200) {String}    id_estado_civil
 * @apiSuccess (200) {String}    calle
 * @apiSuccess (200) {String}    numero
 * @apiSuccess (200) {String}    piso
 * @apiSuccess (200) {String}    departamento
 * @apiSuccess (200) {String}    telefono
 * @apiSuccess (200) {String}    id_provincia
 * @apiSuccess (200) {String}    id_partido
 * @apiSuccess (200) {String}    id_localidad
 * @apiSuccess (200) {Boolean}   donante
 * @apiSuccess (200) {Object[]}  dona
 * @apiSuccess (200) {String}    id_proposito
 * @apiSuccess (200) {String}    nombre_apellido_familiar
 * @apiSuccess (200) {String}    vinculo
 * @apiSuccess (200) {String}    telefono_familiar
 * @apiSuccess (200) {String}    mail_familiar
 * @apiSuccess (200) {String}    fecha_registro
 * @apiSuccess (200) {String}    credencial
 * @apiSuccess (200) {String}    id_situacion_donante
 * @apiSuccess (200) {String}    situacion_donante
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *       "nombre": "Prueba",
 *       "apellido": "Donante",
 *       "id_tipo_documento": "1",
 *       "tipo_documento": "DNI",
 *       "nro_documento": "92511216",
 *       "sexo": "M",
 *       "mail": "aaaaaa@gmail.com",
 *       "fecha_nacimiento": "1964-01-08T03:00:00.000Z",
 *       "id_estado_civil": "",
 *       "calle": "15",
 *       "numero": "3",
 *       "piso": "",
 *       "departamento": "",
 *       "telefono": "95959",
 *       "id_provincia": "1",
 *       "id_partido": "2",
 *       "id_localidad": "1",
 *       "donante": false,
 *       "dona": [
 *           "2",
 *           "4",
 *           ...
 *       ],
 *       "id_proposito": "1",
 *       "nombre_apellido_familiar": "",
 *       "vinculo": "",
 *       "telefono_familiar": "",
 *       "mail_familiar": "",
 *       "fecha_registro": null,
 *       "credencial": null,
 *       "id_situacion_donante": null,
 *       "situacion_donante": null
 *   }
 *
 *
 */


/**
 *
 * @api {PUT} v2.0/incucai/organos/donantes Actualizar Donante
 * @apiName actualizarDonante
 * @apiGroup INCUCAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {Boolean}                       [confirmado="true"]
 * @apiParam  {String}                        calle
 * @apiParam  {String}                        numero
 * @apiParam  {String}                        telefono
 * @apiParam  {String}                        id_provincia
 * @apiParam  {String}                        id_partido
 * @apiParam  {String}                        id_localidad
 * @apiParam  {String}                        id_proposito
 * @apiParam  {Boolean}                       donante
 * @apiParam  {String[]=["1"],["2","4","7"]}  dona
 * @apiParam  {String}                        [nombre_apellido_familiar]
 * @apiParam  {String}                        [vinculo]
 * @apiParam  {String}                        [telefono_familiar]
 * @apiParam  {String}                        [mail_familiar]
 * @apiParam  {String}                        [piso]
 * @apiParam  {String}                        [departamento]
 * @apiParam  {String}                        [id_estado_civil]
 * @apiParam  {String}                        [url_validacion]
 *
 *
 * @apiParamExample  {json} Peticion:
 *
 *   {
 *       "calle": "15",
 *       "numero": "3",
 *       "telefono": "95959",
 *       "id_provincia": "1",
 *       "id_partido": "2",
 *       "id_localidad": "1",
 *       "id_proposito": "1",
 *       "donante": false,
 *       "dona": ["1"],
 *       "nombre_apellido_familiar": "",
 *       "vinculo": "",
 *       "telefono_familiar": "",
 *       "mail_familiar": "",
 *       "piso": "",
 *       "departamento": "",
 *       "id_estado_civil": "",
 *       "url_validacion": "",
 *       "confirmado": true
 *   }
 *
 *
 * @apiSuccess (200) {String}    nombre
 * @apiSuccess (200) {String}    apellido
 * @apiSuccess (200) {String}    id_tipo_documento
 * @apiSuccess (200) {String}    tipo_documento
 * @apiSuccess (200) {String}    nro_documento
 * @apiSuccess (200) {String}    sexo
 * @apiSuccess (200) {String}    mail
 * @apiSuccess (200) {String}    fecha_nacimiento
 * @apiSuccess (200) {String}    id_estado_civil
 * @apiSuccess (200) {String}    calle
 * @apiSuccess (200) {String}    numero
 * @apiSuccess (200) {String}    piso
 * @apiSuccess (200) {String}    departamento
 * @apiSuccess (200) {String}    telefono
 * @apiSuccess (200) {String}    id_provincia
 * @apiSuccess (200) {String}    id_partido
 * @apiSuccess (200) {String}    id_localidad
 * @apiSuccess (200) {Boolean}   donante
 * @apiSuccess (200) {Object[]}  dona
 * @apiSuccess (200) {String}    id_proposito
 * @apiSuccess (200) {String}    nombre_apellido_familiar
 * @apiSuccess (200) {String}    vinculo
 * @apiSuccess (200) {String}    telefono_familiar
 * @apiSuccess (200) {String}    mail_familiar
 * @apiSuccess (200) {String}    fecha_registro
 * @apiSuccess (200) {String}    credencial
 * @apiSuccess (200) {String}    id_situacion_donante
 * @apiSuccess (200) {String}    situacion_donante
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *       "nombre": "Prueba",
 *       "apellido": "Donante",
 *       "id_tipo_documento": "1",
 *       "tipo_documento": "DNI",
 *       "nro_documento": "92511216",
 *       "sexo": "M",
 *       "mail": "aaaaaa@gmail.com",
 *       "fecha_nacimiento": "1964-01-08T03:00:00.000Z",
 *       "id_estado_civil": "",
 *       "calle": "15",
 *       "numero": "3",
 *       "piso": "",
 *       "departamento": "",
 *       "telefono": "95959",
 *       "id_provincia": "1",
 *       "id_partido": "2",
 *       "id_localidad": "1",
 *       "donante": false,
 *       "dona": [
 *           "2",
 *           "4",
 *           ...
 *       ],
 *       "id_proposito": "1",
 *       "nombre_apellido_familiar": "",
 *       "vinculo": "",
 *       "telefono_familiar": "",
 *       "mail_familiar": "",
 *       "fecha_registro": null,
 *       "credencial": null,
 *       "id_situacion_donante": null,
 *       "situacion_donante": null
 *   }
 *
 *
 */

router.route('/organos/donantes')
  .get(tcMiddleware(pgModelList.donacionOrganosV2), incucaiCtrl.getDonor)
  /** 405 - Method Not Allowed */
  .post(tcMiddleware(pgModelList.donacionOrganosV2), validate(paramValidation.webServices.incucaiV2.registro), incucaiCtrl.newDonor)
  .put(tcMiddleware(pgModelList.donacionOrganosV2), incucaiCtrl.updateDonor)
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/incucai/trasplantados/credencial Trasplantados Credencial
 * @apiName trasplantadoCredencial
 * @apiGroup INCUCAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiSuccess (200) {String}    nro_credencial
 * @apiSuccess (200) {String}    nombre
 * @apiSuccess (200) {String}    apellido
 * @apiSuccess (200) {String}    id_tipo_documento
 * @apiSuccess (200) {String}    tipo_documento
 * @apiSuccess (200) {String}    nro_documento
 * @apiSuccess (200) {String}    sexo
 * @apiSuccess (200) {String}    fecha_nacimiento
 * @apiSuccess (200) {String}    fecha_inicio_vigencia
 * @apiSuccess (200) {String}    fecha_fin_vigencia
 * @apiSuccess (200) {String}    credencial_frente
 * @apiSuccess (200) {String}    credencial_dorso
 * @apiSuccess (200) {String}    credencial_qr
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *        "nro_credencial": "3019124",
 *        "nombre": "ESTANISLAO",
 *        "apellido": "SUAREZ",
 *        "id_tipo_documento": "1",
 *        "tipo_documento": "DNI",
 *        "nro_documento": "16225067",
 *        "sexo": "M",
 *        "fecha_nacimiento": "21/02/1963",
 *        "fecha_inicio_vigencia": "14/08/2018",
 *        "fecha_fin_vigencia": "14/08/2021"
 *        "credencial_frente": "Base64"
 *        "credencial_dorso": "Base64"
 *        "credencial_qr": "Base64"
 *   }
 *
 *
 */

router.route('/trasplantados/credencial')
  .get(
    tcMiddleware(pgModelList.trasplantadosV2),
    trasplantadosCrtl.getCredentials
  )
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 * @apiIgnore
 *
 * @api {GET} v2.0/incucai/trasplantados/credencial/vencidas Trasplantados Vencidas
 * @apiName trasplantadoVencidas
 * @apiGroup INCUCAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiUse metadata
 * @apiSuccess (200) {Object[]}  results
 * @apiSuccess (200) {String}    results.nro_credencial
 * @apiSuccess (200) {String}    results.nombre
 * @apiSuccess (200) {String}    results.apellido
 * @apiSuccess (200) {String}    results.id_tipo_documento
 * @apiSuccess (200) {String}    results.tipo_documento
 * @apiSuccess (200) {String}    results.nro_documento
 * @apiSuccess (200) {String}    results.sexo
 * @apiSuccess (200) {String}    results.fecha_nacimiento
 * @apiSuccess (200) {String}    results.fecha_inicio_vigencia
 * @apiSuccess (200) {String}    results.fecha_fin_vigencia
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 * {
 *        "metadata": {
 *          "resultset": {
 *            "count": 2,
 *            "offset": 0,
 *            "limit": 0
 *          }
 *        },
 *        "results": [{
 *          "nro_credencial": "3019124",
 *          "nombre": "ESTANISLAO",
 *          "apellido": "SUAREZ",
 *          "id_tipo_documento": "1",
 *          "tipo_documento": "DNI",
 *          "nro_documento": "16225067",
 *          "sexo": "M",
 *          "fecha_nacimiento": "21/02/1963",
 *          "fecha_inicio_vigencia": "14/08/2018",
 *          "fecha_fin_vigencia": "14/08/2021"
 *         }]
 * }
 *
 */
// router.route('/trasplantados/credencial/vencidas')
//   .get(
//     tcMiddleware(pgModelList.trasplantados),
//     validate(paramValidation.webServices.trasplantados.trasplantadosVencidos),
//     trasplantadosCrtl.getExpiredCredentials
//   )
//   .post((req, res, next) => next(APIError({ status: 405, })))
//   .put((req, res, next) => next(APIError({ status: 405, })))
//   .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *
 * @api {GET} v2.0/incucai/trasplantados/credencial/:credential Trasplantados Obtener Credencial
 * @apiName trasplantadosObtenerCredencial
 * @apiGroup INCUCAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiSuccess (200) {String}    nro_credencial
 * @apiSuccess (200) {String}    nombre
 * @apiSuccess (200) {String}    apellido
 * @apiSuccess (200) {String}    id_tipo_documento
 * @apiSuccess (200) {String}    tipo_documento
 * @apiSuccess (200) {String}    nro_documento
 * @apiSuccess (200) {String}    sexo
 * @apiSuccess (200) {String}    fecha_nacimiento
 * @apiSuccess (200) {String}    fecha_inicio_vigencia
 * @apiSuccess (200) {String}    fecha_fin_vigencia
 * @apiSuccess (200) {String}    credencial_frente
 * @apiSuccess (200) {String}    credencial_dorso
 * @apiSuccess (200) {String}    credencial_qr
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 * {
 *      "nro_credencial": "3019124",
 *      "nombre": "ESTANISLAO",
 *      "apellido": "SUAREZ",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "16225067",
 *      "sexo": "M",
 *      "fecha_nacimiento": "21/02/1963",
 *      "fecha_inicio_vigencia": "14/08/2018",
 *      "fecha_fin_vigencia": "14/08/2021"
 *      "credencial_frente": "Base64"
 *      "credencial_dorso": "Base64"
 *      "credencial_qr": "Base64"
 * }
 *
 */
router.route('/trasplantados/credencial/:credential')
  .get(
    validate(paramValidation.webServices.trasplantados.credenciales),
    trasplantadosCrtl.getCredential
  )
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

export default router