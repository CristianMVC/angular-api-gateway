import express from 'express'
import validate from 'express-validation'
import APIError from '../../../helpers/APIError'
import cache from '../../../../config/cache'
import paramValidation from '../../../../config/param-validation'
import esDonanteCtrl from '../../../controllers/v1.0/incucai/esDonante'
import esDonanteCphCtrl from '../../../controllers/v1.0/incucai/esDonanteCph'
import organosCtrl from '../../../controllers/v1.0/incucai/organos'
import tiposDeDocumentoCtrl from '../../../controllers/v1.0/incucai/tipos-de-documento'
import provinciasCtrl from '../../../controllers/v1.0/incucai/provincias'
import partidosCtrl from '../../../controllers/v1.0/incucai/partidos'
import localidadesCtrl from '../../../controllers/v1.0/incucai/localidades'
import estadosCivilesCtrl from '../../../controllers/v1.0/incucai/estados-civiles'
import trasplantadosCtrl from '../../../controllers/v1.0/incucai/trasplantados'
import donaCtrl from '../../../controllers/v1.0/incucai/dona'
import donaPropositoCtrl from '../../../controllers/v1.0/incucai/dona_proposito'
import medulaCtrl from '../../../controllers/v1.0/incucai/medula'


const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
// router.route('/*').get(cache.route({
//   expire: {
//     200: 600, //10 minutos
//     xxx: 1,
//   },
// }))


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/incucai/es-donante Es-Donante
 * @apiName getEsDonante
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id_tipo_documento
 * @apiParam  {String} docnro
 * @apiParam  {String} fecha_nacimiento formato: YYYY-MM-DD
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "nombre": "FABIANA S",
 *       "apellido": "SIFFRE",
 *       "doctipo": "DNI",
 *       "docnro": "17499632",
 *       "donante": "SI",
 *       "fecha_registro": "1999-08-31T03:00:00.000Z"
 *   }
 */
router.route('/es-donante')
  .get(validate(paramValidation.webServices.incucai.esDonante), esDonanteCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/es-donante-cph Es-Donante-CPH
 * @apiName getEsDonanteCPH
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id_tipo_documento
 * @apiParam  {String} docnro
 * @apiParam  {String} fecha_nacimiento formato: YYYY-MM-DD
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "ANA ANDREA",
 *      "apellido": "MORALES",
 *      "doctipo": "DNI",
 *      "docnro": "24819106",
 *      "donante": "SI",
 *      "provincia": "BUENOS AIRES",
 *      "situacion_medula": "TIPIFICADO",
 *      "fecha_registro": "2003-07-15T03:00:00.000Z"
 *  }
 */
router.route('/es-donante-cph')
  .get(validate(paramValidation.webServices.incucai.esDonanteCph), esDonanteCphCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {POST} v1.0/incucai/organos/donantes/confirmacion/{dni} Donante Confirmacion
 * @apiName postConfirmacion
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiDescription WIP, falta caso de test
 *
 * @apiParam  {String} dni
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/organos/donantes/confirmacion/:dni')
  .post(validate(paramValidation.webServices.incucai.credencial), organosCtrl.postConfirmacion)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/organos/donantes/{dni} Obtener Credencial
 * @apiName getCredencial
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dni
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "FABIANA S",
 *      "apellido": "SIFFRE",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "17499632",
 *      "sexo": "F",
 *      "mail": null,
 *      "fecha_nacimiento": "1964-12-10 00:00:00.0",
 *      "id_estado_civil": null,
 *      "calle": null,
 *      "numero": "0",
 *      "piso": null,
 *      "departamento": null,
 *      "telefono": null,
 *      "id_provincia": "2",
 *      "id_partido": null,
 *      "id_localidad": null,
 *      "donante": "SI",
 *      "dona": [
 *          "1"
 *      ],
 *      "id_proposito": "2",
 *      "nombre_apellido_familiar": null,
 *      "vinculo": null,
 *      "telefono_familiar": null,
 *      "mail_familiar": null,
 *      "fecha_registro": "1999-08-31 00:00:00.0",
 *      "fecha_modificacion": "2018-05-22 12:00:22.0",
 *      "credencial": "http://sintra.incucai.gov.ar/credenciales/donante/?action=credencial-img&params=H4sIAAAAAAAAAKtWykyJL8ksyI9PyU8uzU3NK8lXslIyVNJRyivKBwqBOOYmlpZmxkZKtQBOMc%2FcLQAAAA%3D%3D",
 *      "id_situacion_donante": "2",
 *      "situacion_donante": "EFECTIVO"
 *  }
 */
router.route('/organos/donantes/:dni')
  .get(validate(paramValidation.webServices.incucai.credencial), organosCtrl.getCredencial)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {POST} v1.0/incucai/organos/donantes Donante Registro Create
 * @apiName postRegistro
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id_tipo_documento Ejemplo:1
 * @apiParam  {String} nro_documento Ejemplo:30265489
 * @apiParam  {String} apellido Ejemplo:Apellido
 * @apiParam  {String} nombre Ejemplo:Nombre
 * @apiParam  {String} sexo Ejemplo:M
 * @apiParam  {String} mail Ejemplo:napellido@gmail.com
 * @apiParam  {String} fecha_nacimiento Ejemplo:1990-01-01
 * @apiParam  {String} calle Ejemplo:Falsa
 * @apiParam  {String} numero Ejemplo:123
 * @apiParam  {String} telefono Ejemplo:12345678
 * @apiParam  {String} id_provincia Ejemplo:2
 * @apiParam  {String} id_partido Ejemplo:359
 * @apiParam  {String} id_localidad Ejemplo:2272
 * @apiParam  {String} id_estado_civil Ejemplo:1
 * @apiParam  {String} confirmado Ejemplo:SI
 * @apiParam  {String} apellido_familiar Ejemplo:Apellido Familiar
 * @apiParam  {String} nombre_familiar Ejemplo:Nombre Familiar
 * @apiParam  {String} vinculo Ejemplo:Padre
 * @apiParam  {String} telefono_familiar Ejemplo:87654321
 * @apiParam  {String} mail_familiar Ejemplo:familiar
 * @apiParam  {String} piso Ejemplo:4
 * @apiParam  {String} departamento Ejemplo:F
 * @apiParam  {String} url_validacion Ejemplo:https://www.foo.com/
 * @apiParam  {String} donante Ejemplo:SI
 * @apiParam  {String} dona Ejemplo:1
 * @apiParam  {String} id_proposito Ejemplo:1
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "NOMBRE",
 *      "apellido": "APELLIDO",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "30265489",
 *      "sexo": "M",
 *      "mail": "NAPELLIDO@GMAIL.COM",
 *      "fecha_nacimiento": "1990-01-01 00:00:00.0",
 *      "id_estado_civil": "1",
 *      "calle": "FALSA",
 *      "numero": "123",
 *      "piso": "4",
 *      "departamento": "F",
 *      "telefono": "12345678",
 *      "id_provincia": "2",
 *      "id_partido": "359",
 *      "id_localidad": "2272",
 *      "donante": "SI",
 *      "dona": [
 *          "1"
 *      ],
 *      "id_proposito": "1",
 *      "nombre_apellido_familiar": "NOMBRE FAMILIAR APELLIDO FAMILIAR",
 *      "vinculo": "PADRE",
 *      "telefono_familiar": "87654321",
 *      "mail_familiar": "FAMILIAR",
 *      "fecha_registro": "2019-07-18 15:32:48.0",
 *      "fecha_modificacion": null,
 *      "credencial": null,
 *      "id_situacion_donante": "2",
 *      "situacion_donante": "EFECTIVO"
 *  }
 */
/**
 * @api {PUT} v1.0/incucai/organos/donantes Donante Registro Update
 * @apiName putRegistro
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id_tipo_documento Ejemplo:1
 * @apiParam  {String} nro_documento Ejemplo:30265489
 * @apiParam  {String} apellido Ejemplo:Apellido
 * @apiParam  {String} nombre Ejemplo:Nombre
 * @apiParam  {String} sexo Ejemplo:M
 * @apiParam  {String} mail Ejemplo:napellido@gmail.com
 * @apiParam  {String} fecha_nacimiento Ejemplo:1990-01-01
 * @apiParam  {String} calle Ejemplo:Falsa
 * @apiParam  {String} numero Ejemplo:123
 * @apiParam  {String} telefono Ejemplo:12345678
 * @apiParam  {String} id_provincia Ejemplo:2
 * @apiParam  {String} id_partido Ejemplo:359
 * @apiParam  {String} id_localidad Ejemplo:2272
 * @apiParam  {String} id_estado_civil Ejemplo:1
 * @apiParam  {String} confirmado Ejemplo:SI
 * @apiParam  {String} apellido_familiar Ejemplo:Apellido Familiar
 * @apiParam  {String} nombre_familiar Ejemplo:Nombre Familiar
 * @apiParam  {String} vinculo Ejemplo:Padre
 * @apiParam  {String} telefono_familiar Ejemplo:87654321
 * @apiParam  {String} mail_familiar Ejemplo:familiar
 * @apiParam  {String} piso Ejemplo:4
 * @apiParam  {String} departamento Ejemplo:F
 * @apiParam  {String} url_validacion Ejemplo:https://www.foo.com/
 * @apiParam  {String} donante Ejemplo:SI
 * @apiParam  {String} dona Ejemplo:1
 * @apiParam  {String} id_proposito Ejemplo:1
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "NOMBRE",
 *      "apellido": "APELLIDO",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "30265489",
 *      "sexo": "M",
 *      "mail": "NAPELLIDO@GMAIL.COM",
 *      "fecha_nacimiento": "1990-01-01 00:00:00.0",
 *      "id_estado_civil": "1",
 *      "calle": "FALSA",
 *      "numero": "123",
 *      "piso": "4",
 *      "departamento": "F",
 *      "telefono": "12345678",
 *      "id_provincia": "2",
 *      "id_partido": "359",
 *      "id_localidad": "2272",
 *      "donante": "SI",
 *      "dona": [
 *          "1"
 *      ],
 *      "id_proposito": "1",
 *      "nombre_apellido_familiar": "NOMBRE FAMILIAR APELLIDO FAMILIAR",
 *      "vinculo": "PADRE",
 *      "telefono_familiar": "87654321",
 *      "mail_familiar": "FAMILIAR",
 *      "fecha_registro": "2019-07-18 15:32:48.0",
 *      "fecha_modificacion": null,
 *      "credencial": null,
 *      "id_situacion_donante": "2",
 *      "situacion_donante": "EFECTIVO"
 *  }
 */
router.route('/organos/donantes')
  .post(validate(paramValidation.webServices.incucai.registro), organosCtrl.postRegistro)
  .put(validate(paramValidation.webServices.incucai.registro), organosCtrl.putRegistro)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/tipos-de-documento Listado Tipos De Documento
 * @apiName getTiposDeDocumento
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 8,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id_tipo_documento": 1,
 *              "descripcion": "DNI"
 *          },
 *          {
 *              "id_tipo_documento": 2,
 *              "descripcion": "CI"
 *          },
 *          {
 *              "id_tipo_documento": 3,
 *              "descripcion": "LC"
 *          },
 *          {
 *              "id_tipo_documento": 4,
 *              "descripcion": "LE"
 *          },
 *          {
 *              "id_tipo_documento": 5,
 *              "descripcion": "PAS"
 *          },
 *          {
 *              "id_tipo_documento": 6,
 *              "descripcion": "SD"
 *          },
 *          {
 *              "id_tipo_documento": 7,
 *              "descripcion": "DNIF"
 *          },
 *          {
 *              "id_tipo_documento": 8,
 *              "descripcion": "DNIM"
 *          }
 *      ]
 *  }
 */
router.route('/tipos-de-documento')
  .get(cache.route(), validate(paramValidation.webServices.incucai.generic), tiposDeDocumentoCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/provincias Listado Provincias
 * @apiName getProvincias
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 24,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 1,
 *              "descripcion": "CAPITAL FEDERAL"
 *          },
 *          {
 *              "id": 2,
 *              "descripcion": "BUENOS AIRES"
 *          },
 *          {
 *              "id": 3,
 *              "descripcion": "CATAMARCA"
 *          },
 *          {
 *              "id": 4,
 *              "descripcion": "CHACO "
 *          },
 *          {
 *              "id": 5,
 *              "descripcion": "CHUBUT"
 *          },
 *          {
 *              "id": 6,
 *              "descripcion": "CORDOBA"
 *          },
 *          {
 *              "id": 7,
 *              "descripcion": "CORRIENTES"
 *          },
 *          {
 *              "id": 8,
 *              "descripcion": "ENTRE RIOS"
 *          },
 *          {
 *              "id": 9,
 *              "descripcion": "FORMOSA"
 *          },
 *          {
 *              "id": 10,
 *              "descripcion": "JUJUY"
 *          },
 *          {
 *              "id": 11,
 *              "descripcion": "LA PAMPA"
 *          },
 *          {
 *              "id": 12,
 *              "descripcion": "LA RIOJA"
 *          },
 *          {
 *              "id": 13,
 *              "descripcion": "MENDOZA"
 *          },
 *          {
 *              "id": 14,
 *              "descripcion": "MISIONES"
 *          },
 *          {
 *              "id": 15,
 *              "descripcion": "NEUQUEN"
 *          },
 *          {
 *              "id": 16,
 *              "descripcion": "RIO NEGRO"
 *          },
 *          {
 *              "id": 17,
 *              "descripcion": "SALTA"
 *          },
 *          {
 *              "id": 18,
 *              "descripcion": "SAN JUAN"
 *          },
 *          {
 *              "id": 19,
 *              "descripcion": "SAN LUIS"
 *          },
 *          {
 *              "id": 20,
 *              "descripcion": "SANTA CRUZ"
 *          },
 *          {
 *              "id": 21,
 *              "descripcion": "SANTA FE"
 *          },
 *          {
 *              "id": 22,
 *              "descripcion": "SANTIAGO DEL ESTERO"
 *          },
 *          {
 *              "id": 23,
 *              "descripcion": "TIERRA DEL FUEGO"
 *          },
 *          {
 *              "id": 24,
 *              "descripcion": "TUCUMAN"
 *          }
 *      ]
 *  }
 */
router.route('/provincias')
  .get(cache.route(), provinciasCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/partidos/{id} Listado partidos
 * @apiName getPartidos
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id Id Provincia
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 1,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 1,
 *              "descripcion": "CAPITAL FEDERAL"
 *          }
 *      ]
 *  }
 */
router.route('/partidos/:id')
  .get(cache.route(), validate(paramValidation.webServices.incucai.generic), partidosCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/localidades/{id} Listado Localidades
 * @apiName getEsDonante
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id Id Partido
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "metadata": {
 *           "resultset": {
 *               "count": 1,
 *               "offset": 0,
 *               "limit": 0
 *           }
 *       },
 *       "results": [
 *           {
 *               "id": 1,
 *               "descripcion": "CIUDAD AUTONOMA DE BUENOS AIRES "
 *           }
 *       ]
 *   }
 */
router.route('/localidades/:id')
  .get(cache.route(), validate(paramValidation.webServices.incucai.generic), localidadesCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/estados-civiles Listado Estados-Civiles
 * @apiName getEstadosCiviles
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 6,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 1,
 *              "descripcion": "Soltero/a"
 *          },
 *          {
 *              "id": 2,
 *              "descripcion": "Casado/a"
 *          },
 *          {
 *              "id": 3,
 *              "descripcion": "Divorciado/a"
 *          },
 *          {
 *              "id": 4,
 *              "descripcion": "Viudo/a"
 *          },
 *          {
 *              "id": 5,
 *              "descripcion": "Vínculo de hecho"
 *          },
 *          {
 *              "id": 6,
 *              "descripcion": "Separado/a"
 *          }
 *      ]
 *  }
 */
router.route('/estados-civiles')
  .get(cache.route(), estadosCivilesCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/trasplantados/credencial Trasplantados Credencial
 * @apiName getTrasplantadosCredencial
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} id_tipo_documento
 * @apiParam  {String} docnro
 * @apiParam  {String} sexo Sexo: Masculino: M; Femenino: F
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nro_credencial": "2895730",
 *      "nombre": "PZLJLNZIJH",
 *      "apellido": "UODWML",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "27074280",
 *      "sexo": "M",
 *      "fecha_nacimiento": "21/02/1963",
 *      "fecha_inicio_vigencia": "13/06/2017",
 *      "fecha_fin_vigencia": "13/06/2020",
 *      "credencial_frente": "{ImgBase64Encoded}",
 *      "credencial_dorso": "{ImgBase64Encoded}",
 *      "credencial_qr": "{ImgBase64Encoded}"
 *  }
 */
router.route('/trasplantados/credencial')
  .get(validate(paramValidation.webServices.incucai.trasplantadosCredencial), trasplantadosCtrl.getCredencialByQs)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/trasplantados/credencial/vencidas Trasplantados Credenciales Vencidas
 * @apiName getCredencialesVencidas
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} fecha Fecha Inicio, Formato: YYYY-MM-DD
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "metadata": {
 *           "resultset": {
 *               "count": 20549,
 *               "offset": 0,
 *               "limit": 0
 *           }
 *       },
 *       "results": [
 *           {
 *               "nro_credencial": "2427039",
 *               "nombre": "LDXWXWQJ XXYJW",
 *               "apellido": "EENIA",
 *               "id_tipo_documento": "1",
 *               "tipo_documento": "DNI",
 *               "nro_documento": "55685161",
 *               "sexo": "M",
 *               "fecha_nacimiento": "08/10/1982",
 *               "fecha_inicio_vigencia": "03/12/2015",
 *               "fecha_fin_vigencia": "03/12/2018"
 *           },
 *       ]
 *   }
 */
router.route('/trasplantados/credencial/vencidas')
  .get(validate(paramValidation.webServices.incucai.trasplantadosVencida), trasplantadosCtrl.getCredencialesVencidas)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/trasplantados/credencial/{nroCredencial} Trasplantados Credencial
 * @apiName getCredencialById
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} nroCredencial Numero de Credencial
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nro_credencial": "2895730",
 *      "nombre": "PZLJLNZIJH",
 *      "apellido": "UODWML",
 *      "id_tipo_documento": "1",
 *      "tipo_documento": "DNI",
 *      "nro_documento": "27074280",
 *      "sexo": "M",
 *      "fecha_nacimiento": "21/02/1963",
 *      "fecha_inicio_vigencia": "13/06/2017",
 *      "fecha_fin_vigencia": "13/06/2020",
 *      "credencial_frente": "{ImgBase64Encoded}",
 *      "credencial_dorso": "{ImgBase64Encoded}",
 *      "credencial_qr": "{ImgBase64Encoded}"
 *  }
 */
router.route('/trasplantados/credencial/:nroCredencial')
  .get(validate(paramValidation.webServices.incucai.trasplantadosCredencial), trasplantadosCtrl.getCredencialById)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/dona Dona Listado de Organos
 * @apiName getDonaList
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "metadata": {
 *           "resultset": {
 *               "count": 10,
 *               "offset": 0,
 *               "limit": 0
 *           }
 *       },
 *       "results": [
 *           {
 *               "id": 1,
 *               "descripcion": "Todos los organos"
 *           },
 *           {
 *               "id": 2,
 *               "descripcion": "Riñón"
 *           },
 *           {
 *               "id": 3,
 *               "descripcion": "Corazón"
 *           },
 *           {
 *               "id": 4,
 *               "descripcion": "Pulmones"
 *           },
 *           {
 *               "id": 5,
 *               "descripcion": "Hígado"
 *           },
 *           {
 *               "id": 6,
 *               "descripcion": "Intestino"
 *           },
 *           {
 *               "id": 7,
 *               "descripcion": "Páncreas"
 *           },
 *           {
 *               "id": 8,
 *               "descripcion": "Piel"
 *           },
 *           {
 *               "id": 9,
 *               "descripcion": "Huesos"
 *           },
 *           {
 *               "id": 10,
 *               "descripcion": "Córneas"
 *           }
 *       ]
 *   }
 */
router.route('/dona')
  .get(cache.route(), donaCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/incucai/dona_proposito Dona Listado Propositos
 * @apiName getEsDonante
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 3,
 *              "offset": 0,
 *              "limit": 0
 *          }
 *      },
 *      "results": [
 *          {
 *              "id": 1,
 *              "descripcion": "Trasplante e investigación"
 *          },
 *          {
 *              "id": 2,
 *              "descripcion": "Trasplante"
 *          },
 *          {
 *              "id": 3,
 *              "descripcion": "Investigación"
 *          }
 *      ]
 *  }
 */
router.route('/dona_proposito')
  .get(cache.route(), donaPropositoCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))



/**
 * @api {GET} v1.0/incucai/es-donante Es-Donante
 * @apiName getEsDonante
 * @apiGroup INCUAI
 * @apiVersion  1.0.0
 *
 * @AuthIDHeaders
 *
 * @apiDescription WIP, Falta caso de Prueba
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 * }
 */
router.route('/medula/donantes')
  .get(medulaCtrl.getCredencial)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
