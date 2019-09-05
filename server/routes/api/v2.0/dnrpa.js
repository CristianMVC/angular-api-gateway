import express                        from 'express'
import dnrpaCtrl                      from '../../../controllers/v2.0/dnrpa'
import rtoCtrl                        from '../../../controllers/v2.0/dnrpa/rto'
import APIError                       from '../../../helpers/APIError'
import { idTokenMiddleware, }         from '../../../middelwares/tokenMiddleware'
import { pgMiddleware, }              from '../../../middelwares/pgMiddleware'
import { pgModelList, }               from '../../../models/pg'

const router = express.Router()	// eslint-disable-line new-cap


/**
 *
 * @api {GET} v2.0/dnrpa/vehiculos                                    Lista de Vehiculos
 * @apiName listaDeVehiculos
 * @apiGroup DNRPA v2
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String="a"}        [imagenes]                          Imagenes de la cedula
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                                     Resultado
 * @apiSuccess (200) {String}     results.dominio                             Dominio de vehiculo
 * @apiSuccess (200) {String}     results.placa                               Placa de vehiculo
 * @apiSuccess (200) {String}     results.marca                               Marca de vehiculo
 * @apiSuccess (200) {String}     results.modelo                              Modelo de vehiculo
 * @apiSuccess (200) {String}     results.tipo                                Tipo de vehiculo
 * @apiSuccess (200) {Object[]}   results.cedulas_verdes
 * @apiSuccess (200) {String}     results.cedulas_verdes.tipo_cedula
 * @apiSuccess (200) {String}     results.cedulas_verdes.numero_cedula
 * @apiSuccess (200) {Boolean}    results.cedulas_verdes.habilitada
 * @apiSuccess (200) {String}     [results.cedulas_verdes.hash]               Hash para solicitar imagenes
 * @apiSuccess (200) {Object[]}   results.cedulas_azules
 * @apiSuccess (200) {String}     results.cedulas_azules.tipo_cedula
 * @apiSuccess (200) {String}     results.cedulas_azules.numero_cedula
 * @apiSuccess (200) {Boolean}    results.cedulas_azules.habilitada
 * @apiSuccess (200) {String}     [results.cedulas_azules.hash]               Hash para solicitar imagenes
 * @apiSuccess (200) {Object[]}   results.seguros
 * @apiSuccess (200) {String}     results.seguros.nombreCompania
 * @apiSuccess (200) {String}     results.seguros.nroPoliza
 * @apiSuccess (200) {String}     results.seguros.marca
 * @apiSuccess (200) {String}     results.seguros.modelo
 * @apiSuccess (200) {String}     results.seguros.motor
 * @apiSuccess (200) {String}     results.seguros.chasis
 * @apiSuccess (200) {String}     results.seguros.ano
 * @apiSuccess (200) {String}     results.seguros.patente
 * @apiSuccess (200) {String}     results.seguros.fechaVigenciaDesde
 * @apiSuccess (200) {String}     results.seguros.fechaVigenciaHasta
 * @apiSuccess (200) {String}     results.seguros.estado
 * @apiSuccess (200) {String}     results.seguros.nombreApellidoAsegurado
 * @apiSuccess (200) {String}     results.seguros.ramo
 * @apiSuccess (200) {String}     [results.seguros.hash]                      Hash para solicitar imagenes
 * @apiSuccess (200) {Object[]}   results.radicaciones
 * @apiSuccess (200) {String}     results.radicaciones.tipoVehiculo
 * @apiSuccess (200) {String}     results.radicaciones.dominio
 * @apiSuccess (200) {String}     results.radicaciones.dominioAnterior
 * @apiSuccess (200) {String}     results.radicaciones.codigoRegistroSeccional
 * @apiSuccess (200) {String}     results.radicaciones.descripcionRegistroSeccional
 * @apiSuccess (200) {String}     results.radicaciones.telefono
 * @apiSuccess (200) {String}     results.radicaciones.calle
 * @apiSuccess (200) {String}     results.radicaciones.numero
 * @apiSuccess (200) {String}     results.radicaciones.piso
 * @apiSuccess (200) {String}     results.radicaciones.depto
 * @apiSuccess (200) {String}     results.radicaciones.localidad
 * @apiSuccess (200) {String}     results.radicaciones.provincia
 * @apiSuccess (200) {String}     results.radicaciones.codigoPostal
 * @apiSuccess (200) {String}     results.radicaciones.horario
 * @apiSuccess (200) {Object}     [results.radicaciones.link]
 * @apiSuccess (200) {String}     results.radicaciones.link.provincia
 * @apiSuccess (200) {String}     results.radicaciones.link.titulo
 * @apiSuccess (200) {String}     results.radicaciones.link.bajada
 * @apiSuccess (200) {String}     results.radicaciones.link.nombre_del_link_1
 * @apiSuccess (200) {String}     results.radicaciones.link.link_1
 * @apiSuccess (200) {String}     results.radicaciones.link.nombre_del_link_2
 * @apiSuccess (200) {String}     results.radicaciones.link.link_2
 * @apiSuccess (200) {String}     results.radicaciones.link.nombre_del_link_3
 * @apiSuccess (200) {String}     results.radicaciones.link.link_3
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
 *         "dominio": "RJJ966",
 *         "placa": "Original",
 *         "marca": "HELVETICA",
 *         "modelo": "S.A.D.T. 25 TT",
 *         "tipo": "ACOPLADO",
 *         "cedulas_verdes": [
 *           {
 *             "tipo_cedula": "IDENTIFICACION",
 *             "numero_cedula": "028980752",
 *             "habilitada": true,
 *             "hash": "671bf2713dd252f3e50fec95ac55870563f77c12480c442e98d7ba5e3526d6b5",
 *              "exp": "2019-07-17T12:36:52.000"
 *           }
 *         ],
 *         "cedulas_azules": [
 *           {
 *             "tipo_cedula": "IDENTIFICACION",
 *             "numero_cedula": "028980752",
 *             "habilitada": true,
 *             "hash": "671bf2713dd252f3e50fec95ac55870563f77c12480c442e98d7ba5e3526d6b5",
 *             "exp": "2019-07-17T12:36:52.000"
 *           }
 *         ],
 *        "seguros": [
 *           {
 *             "nombreCompania":"FEDERACION PATRONAL SEGUROS S.A.",
 *             "nroPoliza":"24353997",
 *             "marca":"FIAT",
 *             "modelo":"FIAT FIORINO FURGON",
 *             "motor":"178E80110358882",
 *             "chasis":"9BD25521AC8921226",
 *             "ano":"2011",
 *             "patente":"KAL026",
 *             "fechaVigenciaDesde":"2018-11-03T03:00:00.000Z",
 *             "fechaVigenciaHasta":"2019-04-05T03:00:00.000Z",
 *             "estado":"Vigente",
 *             "nombreApellidoAsegurado":"CIGARRA SEBASTIAN FACUNDO",
 *             "ramo":"Automotor",
 *             "hash": "671bf2713dd252f3e50fec95ac55870563f77c12480c442e98d7ba5e3526d6b5"
 *           }
 *         ]
 *        "radicaciones": [
 *           {
 *             "tipoVehiculo": "AUTOMOTOR",
 *             "dominio": "AAA333",
 *             "dominioAnterior": "",
 *             "codigoRegistroSeccional": "13030",
 *             "descripcionRegistroSeccional": "MENDOZA N° 18",
 *             "telefono": "(0261)4251920",
 *             "calle": "BELGRANO",
 *             "numero": "00679",
 *             "piso": "1",
 *             "depto": "...",
 *             "localidad": "MENDOZA",
 *             "provincia": "MENDOZA",
 *             "codigoPostal": "5500",
 *             "horario": "08:00 a 12:00",
 *             "link": {
 *               "provincia": "Mendoza",
 *               "titulo": "Impuesto automotor",
 *               "bajada": "Consultá vencimientos, deudas y boletas de la patente del vehículo radicado en la provincia de Mendoza.",
 *               "nombre_del_link_1": "CONOCÉ TUS VENCIMIENTOS",
 *               "link_1": "https://www.atm.mendoza.gov.ar/portalatm/zoneBottom/datosInteres/vencimientos/pdf/Calendario_de_Vencimientos_2018.pdf",
 *               "nombre_del_link_2": "IMPRIMÍ LAS BOLETAS",
 *               "link_2": "https://www.atm.mendoza.gov.ar/portalatm/zoneTop/boletos/automotor/automotor.jsp",
 *               "nombre_del_link_3": "",
 *               "link_3": ""
 *             }
 *           }
 *         ]
 *       }
 *     ]
 *   }
 *
 */

/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/vehiculos')
  .get(pgMiddleware(pgModelList.obtenerVehiculosV2, null, true), dnrpaCtrl.getCarsFromIdCards)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/vehiculos/imagenes')
.get(idTokenMiddleware, dnrpaCtrl.getCarsFromIdCardsWithImages)
/** 405 - Method Not Allowed */
.post((req, res, next) => next(APIError({ status: 405, })))
.put((req, res, next) => next(APIError({ status: 405, })))
.delete((req, res, next) => next(APIError({ status: 405, })))


  /**
 *
 * @api {GET} v2.0/dnrpa/vehiculos/:patente/cedulas/:cedula/imagenes/:hash                Detalle de Cedula
 * @apiName detalleCedula
 * @apiGroup DNRPA v2
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 * @apiParam  {Number}            patente               Patente del vehiculo
 * @apiParam  {Number}            cedula                Numero de cedula
 * @apiParam  {Number}            hash                  Hash para consultar imagenes
 *
 * @apiSuccess (200) {String}     [frente]              Frente de la cedula
 * @apiSuccess (200) {String}     [dorso]               Dorso de la cedula
 * @apiSuccess (200) {String}     [qr]                  Qr de la cedula
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *    "frente": "Base64",
 *    "dorso": "Base64",
 *    "qr": "Base64",
 *    "exp": "2019-07-17T12:36:52.000"
 *   }
 *
 */


router.route('/vehiculos/:patente/cedulas/:cedula/imagenes/:hash')
  .get(idTokenMiddleware, dnrpaCtrl.getIdCard)
   /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {GET} v2.0/dnrpa/vehiculos/seguros                Detalle de Seguro
 * @apiName detalleSeguro
 * @apiGroup DNRPA v2
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 * @apiParam  {Number}            cedula                  Numero de Cedula del Vehiculo
 *
 * @apiSuccess (200) {String}     nroPoliza               Numero de poliza
 * @apiSuccess (200) {String}     nombreCompania          Nombre de compañia
 * @apiSuccess (200) {String}     marca                   Marca
 * @apiSuccess (200) {String}     modelo                  Modelo
 * @apiSuccess (200) {String}     motor                   Motor
 * @apiSuccess (200) {String}     chasis                  Chasis
 * @apiSuccess (200) {String}     patente                 Patente
 * @apiSuccess (200) {String}     fechaVigenciaDesde      Fecha de vigencia desde
 * @apiSuccess (200) {String}     fechaVigenciaHasta      Fecha de vigencia hasta
 * @apiSuccess (200) {String}     estado                  Estado
 * @apiSuccess (200) {String}     nombreApellidoAsegurado Nombre y apellido del asegurado
 * @apiSuccess (200) {String}     ano                     Año
 * @apiSuccess (200) {String}     ramo                    Ramo
 * @apiSuccess (200) {Object}     imagenes
 * @apiSuccess (200) {String}     imagenes.frente
 * @apiSuccess (200) {String}     imagenes.dorso
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *
 *  {
 *    "nroPoliza": "190040695899",
 *    "nombreCompania": "ALLIANZ ARGENTINA COMPAÑÍA DE SEGUROS S.A.",
 *    "marca": "TOYOTA HILUX L/12 2.5 DC ",
 *    "modelo": "TOYOTA HILUX L/12 2.5 DC 4X2 TD DX PACK",
 *    "motor": "2KD5795949",
 *    "chasis": "8AJER32GXC4043599",
 *    "patente": "LRY915",
 *    "fechaVigenciaDesde": "2019-04-16T03:00:00.000Z",
 *    "fechaVigenciaHasta": "2019-09-17T03:00:00.000Z",
 *    "estado": "Vigente",
 *    "nombreApellidoAsegurado": "ANZOLUT, NESTOR ARIEL",
 *    "ano": "2012",
 *    "ramo": "Automotor",
 *    "imagenes": {
 *      "frente": "Base64",
 *      "qr": "Base64",
 *     }
 *  }
 *
 *
 */

router.route('/vehiculos/seguros')
  .get(pgMiddleware(pgModelList.seguroAutomotorV2, null, true), dnrpaCtrl.getInsurance)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


router.route('/vehiculos/:patente/seguros/:seguro/imagenes/:hash')
  .get(idTokenMiddleware, dnrpaCtrl.getInsuranceImages)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

/**
 *
 * @api {PUT} v2.0/dnrpa/cedulas/:cedula/activar       Activar cedula
 * @apiName activarCedula
 * @apiGroup DNRPA v2
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 * @apiParam  {Number}            Cedula                Numero de cedula
 *
 *
 * @apiSuccess (200) {String}     tipo_cedula
 * @apiSuccess (200) {String}     numero_cedula
 * @apiSuccess (200) {Boolean}    habilitada
 * @apiSuccess (200) {String}     hash
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *    {
 *      "tipo_cedula": "IDENTIFICACION",
 *      "numero_cedula": "AKN6S553",
 *      "habilitada": true,
 *      "hash": "828ca0ggb85fgb5gfb583fbec2df4ba1"
 *      "exp": "2019-07-17T12:36:52.000"
 *    }
 *
 */

router.route('/cedulas/:cedula/activar')
  .put(idTokenMiddleware, dnrpaCtrl.activateIdCard)
   /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 *
 * @api {GET} v2.0/dnrpa/obleas/:dominio       Obleas de un Dominio
 * @apiName obleasDominio
 * @apiGroup DNRPA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthIDHeaders
 *
 * @apiParam  {String}  dominio     Dominio del vehiculo
 *
 * @apiSuccess (200) {String}       catEscalabilidad
 * @apiSuccess (200) {String}       categoriaVehiculo
 * @apiSuccess (200) {String}       certificado
 * @apiSuccess (200) {String}       cpLocalidadVehiculo
 * @apiSuccess (200) {String}       dominio
 * @apiSuccess (200) {String}       fechaRevision
 * @apiSuccess (200) {String}       fechaVencimiento
 * @apiSuccess (200) {String}       habilitacionCNRT
 * @apiSuccess (200) {String}       inscriptoRUTA
 * @apiSuccess (200) {String}       jwt
 * @apiSuccess (200) {String}       localidadVehiculo
 * @apiSuccess (200) {String}       marcaChasis
 * @apiSuccess (200) {String}       marcaMotor
 * @apiSuccess (200) {String}       modeloChasis
 * @apiSuccess (200) {String}       nroChasis
 * @apiSuccess (200) {String}       nroDocOperador
 * @apiSuccess (200) {String}       nroMotor
 * @apiSuccess (200) {String}       provinciaVehiculo
 * @apiSuccess (200) {String}       razonSocialOperador
 * @apiSuccess (200) {String}       resultado
 * @apiSuccess (200) {String}       tallerCENT
 * @apiSuccess (200) {String}       tipoCertificado
 * @apiSuccess (200) {String}       tipoDocOperador
 * @apiSuccess (200) {String}       tipoUso
 * @apiSuccess (200) {Object}       imagenes
 * @apiSuccess (200) {String}       imagenes.frente
 * @apiSuccess (200) {String}       imagenes.dorso
 * @apiSuccess (200) {String}       imagenes.qr
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *    "catEscalabilidad": "",
 *    "categoriaVehiculo": "N1",
 *    "certificado": "Q-98625",
 *    "cpLocalidadVehiculo": "5925",
 *    "dominio": "WEQ577",
 *    "fechaRevision": "2019-05-24T03:00:00.000Z",
 *    "fechaVencimiento": "2019-11-24T03:00:00.000Z",
 *    "habilitacionCNRT": "NO POSEE",
 *    "inscriptoRUTA": "NO",
 *    "jwt": "iLCJpYXQiOjE...",
 *    "localidadVehiculo": "Villa de María",
 *    "marcaChasis": "DODGE",
 *    "marcaMotor": "PERKINS",
 *    "modeloChasis": "RAM 350 CUSTOM",
 *    "nroChasis": "2B5WB31P8CK185105",
 *    "nroDocOperador": "20260566734",
 *    "nroMotor": "PA6256998",
 *    "provinciaVehiculo": "Córdoba",
 *    "razonSocialOperador": "ZIPITRIA PENSADO SEBASTIAN",
 *    "resultado": "Apto",
 *    "tallerCENT": "(049) Verificar S.A",
 *    "tipoCertificado": "Mercosur",
 *    "tipoDocOperador": "CUIT",
 *    "tipoUso": "Carga",
 *    "imagenes": {
 *      "frente": "Base64",
 *      "dorso": "Base64",
 *      "qr": "Base64"
 *    }
 *  }
 *
 *
 */

router.route('/obleas/:dominio')
  .get(idTokenMiddleware, rtoCtrl.getObleasDominio)
   /** 405 - Method Not Allowed */
  .put((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router