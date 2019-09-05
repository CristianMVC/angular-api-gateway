import express from 'express'
import APIError from '../../../helpers/APIError'
import cache from '../../../../config/cache'
import consultaCtrl from '../../../controllers/v1.0/pami/consultaExpedienteTAD'


const router = express.Router() // eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())

/**
 *
 * @api {GET} v1.0/pami/consulta-expediente                 Consulta de Expediente
 * @apiName apiName
 * @apiGroup PAMI
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiSuccess (200) {Object}   caratula
 * @apiSuccess (200) {String}   caratula.tipoActuacion
 * @apiSuccess (200) {Number}   caratula.anio
 * @apiSuccess (200) {Number}   caratula.numero
 * @apiSuccess (200) {String}   caratula.codigoReparticionActuacion
 * @apiSuccess (200) {String}   caratula.descripcionReparticionActuacion
 * @apiSuccess (200) {String}   caratula.codigoReparticionUsuario
 * @apiSuccess (200) {String}   caratula.descripcionReparticionUsuario
 * @apiSuccess (200) {String}   caratula.codigoTrata
 * @apiSuccess (200) {String}   caratula.descripcionTrata
 * @apiSuccess (200) {Number}   caratula.fechaCaratulacion
 * @apiSuccess (200) {String}   caratula.motivo
 * @apiSuccess (200) {String}   caratula.descripcionAdicional
 * @apiSuccess (200) {String}   caratula.estadoActual
 * @apiSuccess (200) {String}   tipoExpediente
 * @apiSuccess (200) {String}   sistemaImpactado
 * @apiSuccess (200) {Object[]} historialPases
 * @apiSuccess (200) {String}   historialPases.tipoOperacion
 * @apiSuccess (200) {Number}   historialPases.fechaOperacion
 * @apiSuccess (200) {String}   historialPases.usuario
 * @apiSuccess (200) {String}   historialPases.expediente
 * @apiSuccess (200) {Number}   historialPases.idExpediente
 * @apiSuccess (200) {String}   historialPases.motivo
 * @apiSuccess (200) {String}   historialPases.destinatario
 * @apiSuccess (200) {String}   historialPases.estado
 * @apiSuccess (200) {String}   historialPases.origenPaseCodigoReparticion
 * @apiSuccess (200) {String}   historialPases.origenPaseDescripcionReparticion
 * @apiSuccess (200) {String}   historialPases.destinoPaseCodigoReparticion
 * @apiSuccess (200) {String}   historialPases.destinoPaseDescripcionReparticion
 * @apiSuccess (200) {String}   historialPases.origenPaseCodigoSector
 * @apiSuccess (200) {String}   historialPases.origenPaseDescripcionSector
 * @apiSuccess (200) {String}   historialPases.destinoPaseCodigoSector
 * @apiSuccess (200) {String}   historialPases.destinoPaseDescripcionSector
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "caratula": {
 *       "tipoActuacion": "EX",
 *       "anio": 2018,
 *       "numero": 40585524,
 *       "codigoReparticionActuacion": "APN",
 *       "descripcionReparticionActuacion": "Administración Publica Nacional",
 *       "codigoReparticionUsuario": "DNTEID#MM",
 *       "descripcionReparticionUsuario": "Dirección Nacional de Tramitación e Identificación a Distancia",
 *       "codigoTrata": "MMOD00102",
 *       "descripcionTrata": "Solicitud de Integración a Servicios Web",
 *       "fechaCaratulacion": 1534882719000,
 *       "motivo": null,
 *       "descripcionAdicional": "Solicitud de integración a servicios externos TAD",
 *       "estadoActual": "Tramitación"
 *     },
 *     "tipoExpediente": "Expediente Digital",
 *     "sistemaImpactado": "EE",
 *     "historialPases": [
 *       {
 *         "tipoOperacion": "Pase",
 *         "fechaOperacion": 1541099872000,
 *         "usuario": "BEORTIZ",
 *         "expediente": "EX201840585524APN-DNTEID#MM",
 *         "idExpediente": 8365261,
 *         "motivo": "Pase interno.",
 *         "destinatario": "BEORTIZ",
 *         "estado": "Tramitación",
 *         "origenPaseCodigoReparticion": "DNTEID#JGM",
 *         "origenPaseDescripcionReparticion": "Dirección Nacional de Tramitación e Identificación a Distancia",
 *         "destinoPaseCodigoReparticion": "DNTEID#JGM",
 *         "destinoPaseDescripcionReparticion": "Dirección Nacional de Tramitación e Identificación a Distancia",
 *         "origenPaseCodigoSector": "PVD",
 *         "origenPaseDescripcionSector": "Privada",
 *         "destinoPaseCodigoSector": "PVD",
 *         "destinoPaseDescripcionSector": "Privada"
 *       },
 *       ...
 *     ]
 *   }
 *
 *
 */


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
router.route('/consulta-expediente')
  .get(consultaCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router