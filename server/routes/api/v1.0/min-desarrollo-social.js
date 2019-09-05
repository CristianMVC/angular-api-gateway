import express from 'express'
import validate from 'express-validation'

import APIError from '../../../helpers/APIError'
import cache from '../../../../config/cache'
import minDesarrolloSocialCtrl from '../../../controllers/v1.0/min-desarrollo-social'
import paramValidation from '../../../../config/param-validation'

const router = express.Router()	// eslint-disable-line new-cap

/**
 * Cache
 **/
router.route('/*').get(cache.route())


/**
 * Routes
 **/
/** ~/min-desarrollo-social/hacemos-futuro/persons  */
/**
 * @api {GET} v1.0/min-desarrollo-social/hacemos-futuro/persons Hacemos-Futuro 02 Persons
 * @apiName getListPersonsHacemosFuturo
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Este endpoint con el filtro "hacemos-futuro" esta Deprecado, utilizar la version RESTFULL
 *
 * @apiDescription IMPORTANTE: Este endpoint retorna el Listado Sabana,
 * sin la normalizacion con el objetivo de debug, NO utilizar en ambientes productivos.
 *
 * @apiUse AuthHeaders
 */
router.route('/hacemos-futuro/persons')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getList), minDesarrolloSocialCtrl.getListPersons)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/hacemos-futuro/persons/:cuil  */
/**
 * @api {GET} v1.0/min-desarrollo-social/hacemos-futuro/persons/{cuil} Hacemos-Futuro 01 Person
 * @apiName getElementPersonsHacemosFuturo
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Este endpoint con el filtro "hacemos-futuro" esta Deprecado, utilizar la version RESTFULL
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} CUIL
 * @apiParam  {String} fields
 * @apiParam  {Boolean} ultimo_programa
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "Luis Felipe",
 *      "apellido": "Obregon Flores",
 *      "dni": 3760513,
 *      "cuil": 20624552386,
 *      "fechaNacimiento": "1960-12-12",
 *      "provincia": "BUENOS AIRES",
 *      "municipio": "LANUS",
 *      "programas": [
 *          {
 *              "id": 12,
 *              "programa": "Hacemos Futuro",
 *              "banco": "Banco de la Nacion Argentina, Suc.= LANUS ESTE",
 *              "periodoAlta": null,
 *              "pagos": [
 *                  {
 *                      "periodo": "2018-10-01",
 *                      "estado": "Inactivo",
 *                      "aviso": "Sin Dato",
 *                      "observaciones": "No hiciste la actualización de datos",
 *                      "fechaCobro": null
 *                  },
 *              ]
 *          }
 *      ]
 *  }
 */
router.route('/hacemos-futuro/persons/:cuil')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getElement), minDesarrolloSocialCtrl.getElementPersons)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/persons  */
/**
 * @api {GET} v1.0/min-desarrollo-social/persons 01 Persons List
 * @apiName getListPersonsList
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDescription IMPORTANTE: Este endpoint retorna el Listado Sabana,
 * sin la normalizacion con el objetivo de debug, NO utilizar en ambientes productivos.
 *
 * @apiUse AuthHeaders
 */
router.route('/persons')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getList), minDesarrolloSocialCtrl.getListPersons)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/persons/:cuil  */
/**
 * @api {GET} v1.0/min-desarrollo-social/persons/{cuil} 02 Persons Element
 * @apiName getListPersonsElement
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} CUIL
 * @apiParam  {String} fields
 * @apiParam  {Boolean} ultimo_programa
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "nombre": "Luis Felipe",
 *      "apellido": "Obregon Flores",
 *      "dni": 3760513,
 *      "cuil": 20624552386,
 *      "fechaNacimiento": "1960-12-12",
 *      "provincia": "BUENOS AIRES",
 *      "municipio": "LANUS",
 *      "programas": [
 *          {
 *              "id": 12,
 *              "programa": "Hacemos Futuro",
 *              "banco": "Banco de la Nacion Argentina, Suc.= LANUS ESTE",
 *              "periodoAlta": null,
 *              "pagos": [
 *                  {
 *                      "periodo": "2018-10-01",
 *                      "estado": "Inactivo",
 *                      "aviso": "Sin Dato",
 *                      "observaciones": "No hiciste la actualización de datos",
 *                      "fechaCobro": null
 *                  },
 *              ]
 *          }
 *      ]
 *  }
 */
router.route('/persons/:cuil')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getElement), minDesarrolloSocialCtrl.getElementPersons)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/persons/:cuil/programas  */
/**
 * @api {GET} v1.0/min-desarrollo-social/persons/{cuil}/programas 03 Persons Programas
 * @apiName getListPrograms
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDescription Retorna el listado de programas asignados a la persona
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields
 * @apiParam  {String} sort
 * @apiParam  {String} year
 * @apiParam  {String} month
 * @apiParam  {String} day
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
 *              "id": 12,
 *              "programa": "Hacemos Futuro",
 *              "banco": "Banco de la Nacion Argentina, Suc.= LANUS ESTE",
 *              "periodoAlta": null,
 *              "pagos": [
 *                  {
 *                      "periodo": "2018-10-01",
 *                      "estado": "Inactivo",
 *                      "aviso": "Sin Dato",
 *                      "observaciones": "No hiciste la actualización de datos",
 *                      "fechaCobro": null
 *                  },
 *              ]
 *          }
 *      ]
 *  }
 */
router.route('/persons/:cuil/programas')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getList), minDesarrolloSocialCtrl.getListPrograms)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/persons/:cuil/programas/:idPrograma  */
/**
 * @api {GET} v1.0/min-desarrollo-social/persons/{cuil}/programas/{idPrograma} 04 Persons Programa
 * @apiName getElementProgram
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDescription Retorna el Programa asignado a la persona.
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} CUIL
 * @apiParam  {String} idPrograma
 * @apiParam  {String} fields
 * @apiParam  {Boolean} ultimo_programa
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "id": 12,
 *      "programa": "Hacemos Futuro",
 *      "banco": "Banco de la Nacion Argentina, Suc.= LANUS ESTE",
 *      "periodoAlta": null,
 *      "pagos": [
 *          {
 *              "periodo": "2018-10-01",
 *              "estado": "Inactivo",
 *              "aviso": "Sin Dato",
 *              "observaciones": "No hiciste la actualización de datos",
 *              "fechaCobro": null
 *          },
 *      ]
 *  }
 */
router.route('/persons/:cuil/programas/:idPrograma')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getElement), minDesarrolloSocialCtrl.getElementProgram)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/** ~/min-desarrollo-social/persons/:cuil/programas/:idPrograma/pagos  */
/**
 * @api {GET} v1.0/min-desarrollo-social/persons/{cuil}/programas/{idPrograma}/pagos 05 Pagos
 * @apiName getListPagos
 * @apiGroup DESARROLLO SOCIAL
 * @apiVersion  1.0.0
 *
 * @apiDescription Retorna los pagos asignados al programa de la persona
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} CUIL
 * @apiParam  {String} idPrograma
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 * @apiParam  {String} fields
 * @apiParam  {String} sort
 * @apiParam  {String} year
 * @apiParam  {String} month
 * @apiParam  {String} day
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
 *              "periodo": "2018-10-01",
 *              "estado": "Inactivo",
 *              "aviso": "Sin Dato",
 *              "observaciones": "No hiciste la actualización de datos",
 *              "fechaCobro": null
 *          },
 *      ]
 *  }
 */
router.route('/persons/:cuil/programas/:idPrograma/pagos')
  .get(validate(paramValidation.webServices.minDesarrolloSocial.getList), minDesarrolloSocialCtrl.getListPagos)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
