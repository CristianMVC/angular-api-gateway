import express                  from 'express'
import renaperCtrl            	from '../../../controllers/v1.0/renaper'
import cache                    from './../../../../config/cache'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import APIError                 from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/renaper/dni-ultimo-ejemplar DNI Ultimo Ejemplar
 * @apiName getDniUltimoEjemplar
 * @apiGroup RENAPER
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} dni
 * @apiParam  {String} sexo Masculino: M; Femenino:F
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "idTramitePrincipal": "580799321",
 *      "idTramiteTarjetaReimpresa": "0",
 *      "ejemplar": "B",
 *      "vencimiento": "02/02/2034",
 *      "emision": "02/02/2019",
 *      "apellido": "CARO",
 *      "nombres": "Andrea Alejandra",
 *      "fechaNacimiento": "1984-04-26",
 *      "cuil": "27302654986",
 *      "calle": "CHACABUCO",
 *      "numero": "446",
 *      "piso": "",
 *      "departamento": "",
 *      "cpostal": "2252",
 *      "barrio": "0",
 *      "monoblock": "",
 *      "ciudad": "GáLVEZ",
 *      "municipio": "SAN_JERóNIMO",
 *      "provincia": "SANTA_FE",
 *      "pais": "ARGENTINA",
 *      "codigoError": "99",
 *      "codigof": "03",
 *      "mensaf": "Sin Aviso de Fallecimiento",
 *      "origenf": "RENAPER",
 *      "fechaf": "-",
 *      "idciudadano": "39548713",
 *      "nroError": "0",
 *      "descripcionError": "SIN TARJETA REIMPRESA"
 *  }
 */
router.route('/dni-ultimo-ejemplar')
	.get(validate(paramValidation.webServices.renaper.dni), renaperCtrl.getDniUltimoEjemplar)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
