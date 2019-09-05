import express from 'express'
import nomivacCtrl from '../../../controllers/v2.0/nomivac'
import APIError from '../../../helpers/APIError'
import { pgMiddleware, } from '../../../middelwares/pgMiddleware'
import { tcMiddleware, } from './../../../middelwares/tcMiddleware'
import { pgModelList, } from '../../../models/pg-utils'


const router = express.Router()	// eslint-disable-line new-cap


/**
 *
 * @api {GET} v2.0/nomivac/aplicaciones-vacunas-ciudadano Listado de Vacunas
 * @apiName ListadoDeVacunas
 * @apiGroup NOMIVAC
 * @apiVersion 2.0.0
 *
 * @apiUse AuthIDHeaders
 *
 *
 * @apiSuccess (200) {String}   qr                                                    QR en Base64
 * @apiSuccess (200) {Object[]} vacunas                                               Listado de vacunas recibidas por el usuario
 * @apiSuccess (200) {Object[]} vacunas.aplicaciones                                  Listado de aplicaciones de la vacuna
 * @apiSuccess (200) {Number}   vacunas.aplicaciones.idSniAplicacion                  Identificador unico de la aplicación de la vacuna
 * @apiSuccess (200) {String}   vacunas.aplicaciones.nombre                           Nombre del receptor de la vacuna
 * @apiSuccess (200) {String}   vacunas.aplicaciones.apellido                         Apellido del receptor de la vacuna
 * @apiSuccess (200) {Number}   vacunas.aplicaciones.idTipoDoc                        Tipo de documento de Identificación
 * @apiSuccess (200) {String}   vacunas.aplicaciones.nrodoc                           Número del Documento
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sexo                             Sexo del receptor de la vacuna
 * @apiSuccess (200) {String}   vacunas.aplicaciones.fechaNacimiento                  Fecha de nacimiento del receptor de la vacuna
 * @apiSuccess (200) {Number}   vacunas.aplicaciones.idSniVacuna                      Identificador unico de la vacuna
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniVacunaNombre                  Nombre de la vacuna
 * @apiSuccess (200) {Number}   vacunas.aplicaciones.idSniAplicacionCondicion
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniAplicacionCondicionNombre
 * @apiSuccess (200) {Number}   vacunas.aplicaciones.idSniVacunaEsquema
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniVacunaEsquemaNombre
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniDosisOrden
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniDosisNombre
 * @apiSuccess (200) {String}   vacunas.aplicaciones.fechaAplicacion                  Fecha de aplicacion
 * @apiSuccess (200) {String}   vacunas.aplicaciones.fechaRegistro
 * @apiSuccess (200) {String}   vacunas.aplicaciones.lote
 * @apiSuccess (200) {String}   vacunas.aplicaciones.origenCodigo                     Codigo de Origen
 * @apiSuccess (200) {String}   vacunas.aplicaciones.origenNombre                     Centro medico de Origen
 * @apiSuccess (200) {String}   vacunas.aplicaciones.origenLocalidad                  Localidad de Origen
 * @apiSuccess (200) {String}   vacunas.aplicaciones.origenProvincia                  Provincia de Origen
 * @apiSuccess (200) {String}   vacunas.aplicaciones.origenDepartamento               Departamento de Origen
 * @apiSuccess (200) {String}   vacunas.aplicaciones.sniTipoExcepcionNombre
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *  {
 *      "qr": "Base64",
 *      "vacunas": [
 *          {
 *              "idSniVacuna": 127,
 *              "sniVacunaNombre": "Hepatitis B",
 *              "aplicaciones": [
 *                {
 *                  "idSniAplicacion": 104382071,
 *                  "nombre": "LEONOARDO MIGUEL",
 *                  "apellido": "OLMOS",
 *                  "idTipoDoc": 1,
 *                  "nrodoc": "34785538",
 *                  "sexo": "M",
 *                  "fechaNacimiento": "1991-08-22 00:00:00.0",
 *                  "idSniVacuna": 127,
 *                  "sniVacunaNombre": "Hepatitis B",
 *                  "idSniAplicacionCondicion": 3,
 *                  "sniAplicacionCondicionNombre": "Calendario Nacional",
 *                  "idSniVacunaEsquema": 109,
 *                  "sniVacunaEsquemaNombre": "Regular",
 *                  "sniDosisOrden": "1",
 *                  "sniDosisNombre": "1ra Dosis",
 *                  "fechaAplicacion": "2014-11-07 00:00:00.0",
 *                  "fechaRegistro": "2015-02-13 09:53:00.0",
 *                  "lote": "0000",
 *                  "origenCodigo": "10700352177454",
 *                  "origenNombre": "HOSPITAL DR. CESAR AGUILAR",
 *                  "origenLocalidad": "Caucete",
 *                  "origenProvincia": "San Juan",
 *                  "origenDepartamento": "Caucete",
 *                  "sniTipoExcepcionNombre": "Lote"
 *                }
 *              ]
 *          }
 *      ]
 *  }
 *
 *
 */


/** -------------------------------------
 * Routes
 ** ------------------------------------*/
router.route('/aplicaciones-vacunas-ciudadano')
  .get(
    tcMiddleware(pgModelList.aplcacionesVacunasV2),
    pgMiddleware(pgModelList.aplcacionesVacunasV2),
    nomivacCtrl.getList
  )
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

  export default router