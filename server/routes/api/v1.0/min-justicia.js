import APIError                 from '../../../helpers/APIError'
import express                  from 'express'
import cache                    from '../../../../config/cache'
import validate                 from 'express-validation'
import paramValidation          from '../../../../config/param-validation'
import menoresCtrl              from '../../../controllers/v1.0/min-justicia/menores'


const router = express.Router()	// eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {GET} v1.0/min-justicia/personas-menores-extraviadas/menores 01 Menores Listado
 * @apiName getPersonasExtraviadasList
 * @apiGroup Min Justicia Personas Extraviadas
 * @apiVersion  1.0.0
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
 *              "limit": 1
 *          }
 *      },
 *      "results": [
 *          {
 *              "ExpedienteId": "20815",
 *              "Nombre": "Nataly Grisel",
 *              "Apellido": "PUCHETA",
 *              "Sexo": "Femenino",
 *              "Contextura": "DELGADA",
 *              "ColorPiel": "",
 *              "ColorOjos": "Negro",
 *              "Altura": "1.7",
 *              "Peso": "",
 *              "ColorCabello": "Negro",
 *              "TipoCabello": "",
 *              "Indumentaria": "PANTALÓN DE JEAN , ZAPATILLAS FUCSIA Y CAMPERA NEGRA",
 *              "Sobrenombre": "",
 *              "SeniaParticular": "",
 *              "TipoCasoId": "1",
 *              "TipoCaso": "Buscado",
 *              "CasoId": "21046",
 *              "DocumentoId": "24516",
 *              "PersonaId": "67792",
 *              "AutoridadInterviniente": "CONSEJO DE LOS DERECHOS DE NIÑO/AS Y ADOLESCENTES DEL G.C.B.A.",
 *              "AutoridadTelefono": "4331-3232/3297",
 *              "AutoridadCodigoPostal": "",
 *              "AutoridadFax": "",
 *              "AutoridadNumeroTribunal": "",
 *              "AutoridadEmail": "",
 *              "AutoridadResponsable": "Dra Gondra",
 *              "AutoridadPais": "Argentina",
 *              "AutoridadProvincia": "Ciudad Autónoma de Buenos Aires",
 *              "AutoridadDomicilio": "ROQUE SAENZ PEÑA 547 6º PISO",
 *              "CircunstanciaHecho": "",
 *              "FechaHecho": "2019-07-05T00:00:00-03:00",
 *              "PresicionFechaHecho": "false",
 *              "DomicilioHecho": "HOGAR JESÚS AMIGO",
 *              "ProvinciaHecho": "Ciudad Autónoma de Buenos Aires",
 *              "PaisHecho": "Argentina",
 *              "LocalidadHecho": "",
 *              "PaisNacimiento": "",
 *              "FechaNacimiento": "2006-02-21T00:00:00-03:00",
 *              "ProvinciaNacimiento": "",
 *              "LocalidadNacimiento": "",
 *              "EstiloCabello": "",
 *              "Edad": "13",
 *              "ImagenMiniatura": "http://complementos.jus.gov.ar/downloads/download.aspx?prefix=JCFotoR&DownloadPK=20815",
 *              "ImagenNormal": "http://complementos.jus.gov.ar/downloads/download.aspx?prefix=JCFoto&DownloadPK=20815"
 *          }
 *      ]
 *  }
 */
router.route('/personas-menores-extraviadas/menores')
  .get(validate(paramValidation.webServices.generic.getList), menoresCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


/**
 * @api {GET} v1.0/min-justicia/personas-menores-extraviadas/menores/{ExpedienteId} 02 Menores Element
 * @apiName getPersonasExtraviadasElement
 * @apiGroup Min Justicia Personas Extraviadas
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String} ExpedienteId
 * @apiParam  {String} fields
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "ExpedienteId": "20815",
 *       "Nombre": "Nataly Grisel",
 *       "Apellido": "PUCHETA",
 *       "Sexo": "Femenino",
 *       "Contextura": "DELGADA",
 *       "ColorPiel": "",
 *       "ColorOjos": "Negro",
 *       "Altura": "1.7",
 *       "Peso": "",
 *       "ColorCabello": "Negro",
 *       "TipoCabello": "",
 *       "Indumentaria": "PANTALÓN DE JEAN , ZAPATILLAS FUCSIA Y CAMPERA NEGRA",
 *       "Sobrenombre": "",
 *       "SeniaParticular": "",
 *       "TipoCasoId": "1",
 *       "TipoCaso": "Buscado",
 *       "CasoId": "21046",
 *       "DocumentoId": "24516",
 *       "PersonaId": "67792",
 *       "AutoridadInterviniente": "CONSEJO DE LOS DERECHOS DE NIÑO/AS Y ADOLESCENTES DEL G.C.B.A.",
 *       "AutoridadTelefono": "4331-3232/3297",
 *       "AutoridadCodigoPostal": "",
 *       "AutoridadFax": "",
 *       "AutoridadNumeroTribunal": "",
 *       "AutoridadEmail": "",
 *       "AutoridadResponsable": "Dra Gondra",
 *       "AutoridadPais": "Argentina",
 *       "AutoridadProvincia": "Ciudad Autónoma de Buenos Aires",
 *       "AutoridadDomicilio": "ROQUE SAENZ PEÑA 547 6º PISO",
 *       "CircunstanciaHecho": "",
 *       "FechaHecho": "2019-07-05T00:00:00-03:00",
 *       "PresicionFechaHecho": "false",
 *       "DomicilioHecho": "HOGAR JESÚS AMIGO",
 *       "ProvinciaHecho": "Ciudad Autónoma de Buenos Aires",
 *       "PaisHecho": "Argentina",
 *       "LocalidadHecho": "",
 *       "PaisNacimiento": "",
 *       "FechaNacimiento": "2006-02-21T00:00:00-03:00",
 *       "ProvinciaNacimiento": "",
 *       "LocalidadNacimiento": "",
 *       "EstiloCabello": "",
 *       "Edad": "13",
 *       "ImagenMiniatura": "http://complementos.jus.gov.ar/downloads/download.aspx?prefix=JCFotoR&DownloadPK=20815",
 *       "ImagenNormal": "http://complementos.jus.gov.ar/downloads/download.aspx?prefix=JCFoto&DownloadPK=20815"
 *   }
 */
router.route('/personas-menores-extraviadas/menores/:id')
  .get(validate(paramValidation.webServices.generic.getElement), menoresCtrl.getElement)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/personas-menores-extraviadas')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/')
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
