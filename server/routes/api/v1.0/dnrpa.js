import express                  from 'express'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import cache                    from '../../../../config/cache'
import dnrpaCtrl                from '../../../controllers/v1.0/dnrpa'
import APIError                 from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/dnrpa/dominio/consultarRadicacion Dominio Consultar Radicacion
 * @apiName getConsultarRadicacion
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dominio Ejemplo: LPE956
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 1,
 *              "offset": 0,
 *              "limit": 0
 *          },
 *          "observaciones": {}
 *      },
 *      "results": [
 *          {
 *              "tipoVehiculo": "AUTOMOTOR",
 *              "dominio": "AAA333",
 *              "dominioAnterior": "",
 *              "codigoRegistroSeccional": "13030",
 *              "descripcionRegistroSeccional": "MENDOZA N° 18",
 *              "telefono": "(0261)4251920",
 *              "calle": "BELGRANO",
 *              "numero": "00679",
 *              "piso": "1",
 *              "depto": "...",
 *              "localidad": "MENDOZA",
 *              "provincia": "MENDOZA",
 *              "codigoPostal": "5500",
 *              "horario": "08:00 a 12:00"
 *          }
 *      ]
 *  }
 */
router.route('/dominio/consultarRadicacion')
	.get(validate(paramValidation.webServices.dnrpa.radicacionDominio), dnrpaCtrl.consultarRadicacionDominio)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarProvincias Radicacion 01-Consultar Provincias
 * @apiName getConsultarProvincias
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} tipoVehiculo Ejemplo: A
 *
 * @apiSuccessExample {Json} Success-Response:
 *  [
 *    {
 *        "tipoVehiculo": "A",
 *        "idProvincia": "01",
 *        "denominacion": "BUENOS AIRES",
 *        "metodoSiguiente": "consultarDepartamentos"
 *    },
 *    {
 *        "tipoVehiculo": "A",
 *        "idProvincia": "02",
 *        "denominacion": "CAPITAL FEDERAL",
 *        "metodoSiguiente": "consultarDepartamentos"
 *    },
 *  ]
 */
router.route('/radicacion/consultarProvincias')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaProvincias), dnrpaCtrl.consultarProvincias)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarDepartamentos Radicacion 02-Consultar Departamentos
 * @apiName getConsultarDepartamentos
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} tipoVehiculo Ejemplo: A
 * @apiParam  {String} idProvincia Ejemplo: 02
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "tipoVehiculo": "A",
 *    "idProvincia": "02",
 *    "idDepartamento": "1",
 *    "denominacion": "CAPITAL FEDERAL",
 *    "metodoSiguiente": "consultarLocalidades"
 *  }
 */
router.route('/radicacion/consultarDepartamentos')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaDepartamentos), dnrpaCtrl.consultarDepartamentos)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarLocalidades Radicacion 03-Consultar Localidades
 * @apiName getconsultarLocalidades
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} tipoVehiculo Ejemplo: A
 * @apiParam  {String} idProvincia Ejemplo: 02
 * @apiParam  {String} idDepartamento Ejemplo: 1
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "tipoVehiculo": "A",
 *    "idProvincia": "02",
 *    "idDepartamento": "1",
 *    "idLocalidad": "1",
 *    "denominacion": "CAPITAL FEDERAL",
 *    "metodoSiguiente": "consultarCallesBarrios"
 *  }
 */
router.route('/radicacion/consultarLocalidades')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaLocalidades), dnrpaCtrl.consultarLocalidades)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarCallesBarrios Radicacion 04-Consultar Calles Barrios
 * @apiName getConsultarCallesBarrios
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} tipoVehiculo Ejemplo: A
 * @apiParam  {String} idProvincia Ejemplo: 02
 * @apiParam  {String} idDepartamento Ejemplo: 1
 * @apiParam  {String} idLocalidad Ejemplo: 1
 *
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    {
 *        "tipoVehiculo": "A",
 *        "idProvincia": "02",
 *        "idDepartamento": "1",
 *        "idLocalidad": "1",
 *        "idCalle": "392",
 *        "denominacion": "10 (ZONA PUERTO)",
 *        "metodoSiguiente": "consultarAlturaExacta"
 *    },
 *  ]
 */
router.route('/radicacion/consultarCallesBarrios')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaCallesBarrios), dnrpaCtrl.consultarCallesBarrios)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarAlturaExacta Radicacion 05-Consultar Registro Seccional
 * @apiName getConsultarRegistroSeccional
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} tipoVehiculo Ejemplo: A
 * @apiParam  {String} idProvincia Ejemplo: 02
 * @apiParam  {String} idDepartamento Ejemplo: 1
 * @apiParam  {String} idLocalidad Ejemplo: 1
 * @apiParam  {String} idCalle Ejemplo: 3
 * @apiParam  {String} alturaExacta Ejemplo: 1100
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *     "codigoRegistroSeccional": "02017",
 *     "metodoSiguiente": "consultarRegistroSeccional"
 *  }
 */
router.route('/radicacion/consultarAlturaExacta')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaAlturaExacta), dnrpaCtrl.consultarAlturaExacta)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/radicacion/consultarRegistroSeccional Radicacion 06-Consultar Registro Seccional
 * @apiName getConsultarRegistroSeccional
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} codigoRegistroSeccional Ejemplo: 13033
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "codigo": "13033",
 *    "denominacion": "MAIPÚ Nº 3",
 *    "domicilio": "BARCALÁ NRO:283   PISO: DTO/OF:",
 *    "localidad": "MAIPÚ",
 *    "codigoPostal": "M5515",
 *    "telefono": "(0261)4973358",
 *    "fax": "()",
 *    "horarioAtencion": "08:00 a 12:00 hs.",
 *    "encargado": "Int. Dr. MAURICIO LE DONNE",
 *    "datosBancarios": {
 *        "datos": [
 *            {
 *                "cbu": "0110347020034700638876",
 *                "cbuAlias": {},
 *                "cuitCuil": "23320198879",
 *                "numeroCuenta": "3470063887",
 *                "banco": "BANCO DE LA NACIÓN ARGENTINA",
 *                "sucursal": "2327",
 *                "red": "LINK"
 *            },
 *            {
 *                "cbu": "0170240020000000777988",
 *                "cbuAlias": "TRONCO.PLATO.MONTE",
 *                "cuitCuil": "23320198879",
 *                "numeroCuenta": "24077798",
 *                "banco": "BBVA BANCO FRANCÉS S.A.",
 *                "sucursal": "0240",
 *                "red": "BANELCO"
 *            }
 *        ]
 *    }
 *  }
 */
router.route('/radicacion/consultarRegistroSeccional')
	.get(validate(paramValidation.webServices.dnrpa.radiacionDomicilio.consultaRegistroSeccional), dnrpaCtrl.consultarRegistroSeccional)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/dnrpa/cedulas Cedulas Automotor
 * @apiName getCedulas
 * @apiGroup DNRPA v1
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} dominio Ejemplo: LPE956
 * @apiParam  {String} nro_documento
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "metadata": {
 *        "resultset": {
 *            "count": 3,
 *            "offset": 0,
 *            "limit": 0
 *        }
 *    },
 *    "results": [
 *        {
 *            "cedulaTipo": "TITULAR",
 *            "cedulaNumero": "040586774",
 *            "cedulaFechaEmision": "2012-08-22",
 *            "vehiculoDominio": "LPE956",
 *            "vehiculoClase": "AUTOMOTOR",
 *            "vehiculoMarca": "VOLKSWAGEN",
 *            "vehiculoModelo": "GOL 1.4 L",
 *            "vehiculoTipo": "SEDAN 5 PTAS",
 *            "vehiculoAnioModelo": "2012"
 *        },
 *        {
 *            "cedulaTipo": "AUTORIZADO",
 *            "cedulaNumero": "008455632",
 *            "cedulaFechaEmision": "2012-08-22",
 *            "vehiculoDominio": "LPE956",
 *            "vehiculoClase": "AUTOMOTOR",
 *            "vehiculoMarca": "VOLKSWAGEN",
 *            "vehiculoModelo": "GOL 1.4 L",
 *            "vehiculoTipo": "SEDAN 5 PTAS",
 *            "vehiculoAnioModelo": "2012"
 *        },
 *        {
 *            "cedulaTipo": "AUTORIZADO",
 *            "cedulaNumero": "008455631",
 *            "cedulaFechaEmision": "2012-08-22",
 *            "vehiculoDominio": "LPE956",
 *            "vehiculoClase": "AUTOMOTOR",
 *            "vehiculoMarca": "VOLKSWAGEN",
 *            "vehiculoModelo": "GOL 1.4 L",
 *            "vehiculoTipo": "SEDAN 5 PTAS",
 *            "vehiculoAnioModelo": "2012"
 *        }
 *    ],
 *  }
 */
router.route('/cedulas')
	.get(validate(paramValidation.webServices.dnrpa.consultaCedulas), dnrpaCtrl.consultarCedulas)
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
