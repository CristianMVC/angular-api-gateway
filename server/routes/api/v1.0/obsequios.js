import express                  from 'express'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import obsequiosCtrl            from '../../../controllers/v1.0/obsequios'
import cache                    from './../../../../config/cache'

const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())

/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/gde/consultarobsequios Consultar Obsequios
 * @apiName getConsultarObsequios
 * @apiGroup GDE Obsequios y Viajes
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 1,
 *              "offset": 0,
 *              "limit": 1
 *          }
 *      },
 *      "results": [
 *          {
 *              "numero": "65594447",
 *              "descripcion": "Bufanda artesanal de lana de vicuña - Pergamino enmarcado en madera agradecimiento gestión.",
 *              "bandbox_reparticion": "PRESIDENCIA INAES",
 *              "combo_quien_otorgo": "Persona Jurídica",
 *              "combo_caracter_excepcion": "Cortesía",
 *              "fecha_recepcion": "13/07/2019",
 *              "nombres": "Marcelo O.",
 *              "primer_nombre_representante": "María Ester",
 *              "combo_donde_fue_recibido": "Evento/Actividad Oficial",
 *              "bandbox_jurisidccion": "PRESIDENCIA INAES",
 *              "combo_finalidad_obsequioo": "Otro por naturaleza del obsequio",
 *              "apellidos": "Collomb",
 *              "combo_valor_estimado": "Inferior a 4 módulos.",
 *              "combo_tipo_obsequio": "Artesanías (productos regionales)",
 *              "cargo_representante": "Presidente",
 *              "razon_social": "Mutual Esperanza de Vida de Jubilados y Pensionados de Tucumán",
 *              "lugar_realizacion": "Pje. José María Gutierrez  1475 - Tucumán",
 *              "primer_apellido_representante": "Robles",
 *              "cargo_funcion": "Presidente",
 *              "descripcion_0": "Acto de Inauguración sede Fed. Asociaciones Mutualistas de Tucumán"
 *          }
 *      ]
 *  }
 */
router.route('/consultarobsequios')
	.get(validate(paramValidation.webServices.obsequios.consultarObsequios), obsequiosCtrl.consultarObsequios)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
	.delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/gde/consultarviajes Consultar Viajes
 * @apiName getConsultarViajes
 * @apiGroup GDE Obsequios y Viajes
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} limit
 * @apiParam  {String} offset
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": {
 *          "resultset": {
 *              "count": 1,
 *              "offset": 0,
 *              "limit": 1
 *          }
 *      },
 *      "results": [
 *          {
 *              "numero": "65580246",
 *              "medio_transporte": "Aéreo",
 *              "jurisdiccioon": "Ente Nacional de Comunicaciones",
 *              "date_fecha_inicio": "16/03/2019",
 *              "razon_social_fuente_financiami": "UNITED STATES TELECOMMUNICATIONS TRAINING INSTITUTE - USTTI",
 *              "reparticioon": "Dirección Nacional de Planificación y Convergencia",
 *              "combo_erogacion": "No",
 *              "nombre_1": "José Darío",
 *              "otro": "false",
 *              "evento_participara": "Curso “5G - The Path to the Next Generation,”“Digital Transformation: Unlocking the Potential of IoT,”“Regulatory Principles and Best Practices,”“Creating a Regulatory Environment for Cloud Services,”“Enabling the Full Value of Wireless Connectivity\"",
 *              "date_inicio_evento": "17/03/2019",
 *              "nombre_rep": "Jim",
 *              "combo_fuente_financiamiento": "Entidad",
 *              "cargo_representante": "Presidente",
 *              "date_finalizacoin_evento": "27/03/2019",
 *              "capacitador": "false",
 *              "destino_viaje": "ESTADOS UNIDOS",
 *              "date_fecha_finalizacion": "28/03/2019",
 *              "apellido_rep": "O’Connor",
 *              "participante": "true",
 *              "apellido_1": "Levi",
 *              "expositor": "false",
 *              "cargo_funcion": "Jefe de Área Planificación y Gestión de Redes Radioeléctricas"
 *          }
 *      ]
 *  }
 */
router.route('/consultarviajes')
	.get(validate(paramValidation.webServices.obsequios.consultarObsequios), obsequiosCtrl.consultarViajes)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
	.delete((req, res, next) => next(APIError({ status: 405, })))


export default router
