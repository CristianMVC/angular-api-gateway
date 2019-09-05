import express from 'express'
import validate from 'express-validation'
import APIError from '../../../helpers/APIError'
import cache from '../../../../config/cache'
import paramValidation from '../../../../config/param-validation'
import convocatoriasCtrl from '../../../controllers/v1.0/cultura/convocatorias'
import convocatoriaDetalleCtrl from '../../../controllers/v1.0/cultura/convocatoria-detalle'


const router = express.Router() // eslint-disable-line new-cap


/** ------------------------------------
 *    Mount Middleware Cache Routes
 ** -----------------------------------*/
router.route('/*').get(cache.route())


/**
 *
 * @api {GET} v1.0/cultura/convocatorias/:id                          Detalle de la Convocatoria
 * @apiName detalleConvocatoria
 * @apiGroup CULTURA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Number} id                                             Id de la convocatoria
 *
 * @apiSuccess (200) {Number}     id                                  Id de la convocatoria
 * @apiSuccess (200) {String}     url                                 Url de la convocatoria
 * @apiSuccess (200) {String}     link                                Link de la convocatoria
 * @apiSuccess (200) {String}     imagen                              Imagen de la convocatoria
 * @apiSuccess (200) {String}     titulo                              Titulo de la convocatoria
 * @apiSuccess (200) {String}     bajada
 * @apiSuccess (200) {String}     cuerpo                              Cuerpo de la convocatoria
 * @apiSuccess (200) {String}     estado                              Estado de la convocatoria
 * @apiSuccess (200) {String}     fecha_inicio                        Fecha de inicio
 * @apiSuccess (200) {String}     fecha_fin                           Fecha fin
 * @apiSuccess (200) {Object[]}   documentos                          Documentos de la convocatoria
 *
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "id": 7273,
 *     "url": "https://www.cultura.gob.ar/api/v2.0/convocatorias/7273/",
 *     "link": "https://www.cultura.gob.ar/concurso-de-letras-2019-del-fondo-nacional-de-las-artes_7273/",
 *     "imagen": "https://www.cultura.gob.ar/media/uploads/ig_1_concursoletras2019.jpg",
 *     "titulo": "Concurso de Letras 2019 del Fondo Nacional de las Artes",
 *     "bajada": "Convocatoria abierta del 6/3 al 14/5",
 *     "cuerpo": "<p><strong>&iquest;Qu&eacute; es?</strong> Con el fin de fomentar, reconocer y premiar la creaci&oacute;n de obras literarias de diferentes<br />g&eacute;neros, el FONDO NACIONAL DE LAS ARTES lanza el CONCURSO DE LETRAS 2019, dirigido a<br />escritores argentinos y extranjeros que residan legalmente en el pa&iacute;s.<br />Los g&eacute;neros literarios a concursar ser&aacute;n:<br />-Poes&iacute;a<br />-Cuento<br />-Novela<br />-No Ficci&oacute;n (Ensayo, Cr&oacute;nica, Biograf&iacute;as, Memorias, Reportaje, etc.)</p>\r\n<p><br />En la categor&iacute;a Poes&iacute;a se entiende por obra un libro, conformado por uno o varios poemas, que<br />tenga como extensi&oacute;n m&iacute;nima 35 p&aacute;ginas y m&aacute;xima 200 p&aacute;ginas. En las categor&iacute;as de prosa se<br />entiende por obra un libro, conformado por uno o m&aacute;s textos, con una extensi&oacute;n m&iacute;nima de 100<br />p&aacute;ginas y una m&aacute;xima de 300 p&aacute;ginas.<br />Los temas son libres y las obras deben estar escritas en espa&ntilde;ol y firmadas con seud&oacute;nimo. Las obras deber&aacute;n permanecer in&eacute;ditas hasta la fecha de publicaci&oacute;n de los ganadores.<br />Descarg&aacute; el Reglamento <a href=\"https://archivos.fnartes.gob.ar/reglamentos/Reglamento-Concurso-de-Letras-2019.pdf\" target=\"_blank\" rel=\"noopener\">ac&aacute;</a></p>\r\n<p><strong>&iquest;Para qu&eacute;?</strong> Para reconocer y valorar la producci&oacute;n literaria y premiar la labor creativa de nuestros<br />escritores. Se entregar&aacute;n 3 premios por g&eacute;nero</p>\r\n<p>1&deg; Premio<br />$120.000<br />2&deg; Premio<br />$70.000<br />3&deg; Premio<br />$40.000</p>\r\n<p><strong>&iquest;Para qui&eacute;nes?</strong> para escritores argentinos y extranjeros que residan legalmente en el pa&iacute;s.</p>\r\n<p><strong>&iquest;C&oacute;mo participar?</strong> La inscripci&oacute;n al Concurso se realiza mediante la plataforma web del FNA hasta<br />las 23.59 h del d&iacute;a se&ntilde;alado como cierre de la convocatoria. Para inscribirte ten&eacute;s que estar<br />registrado. Si a&uacute;n no lo hiciste hacelo ahora desde <a href=\"https://fnartes.gob.ar/\" target=\"_blank\" rel=\"noopener\">www.fnartes.gob.ar</a></p>\r\n<p><strong>Fechas de la convocatoria:</strong> Del 6/3 al 14/5.</p>\r\n<p>Para m&aacute;s informaci&oacute;n, ingres&aacute; <a href=\"https://fnartes.gob.ar/concursos/letras\" target=\"_blank\" rel=\"noopener\">ac&aacute;</a></p>",
 *     "estado": "abierta",
 *     "fecha_inicio": "2019-03-06",
 *     "fecha_fin": "2019-05-14",
 *     "documentos": []
 *   }
 *
 *
 */


/**
 *
 * @api {GET} v1.0/cultura/convocatorias                              Lista de Convocatorias
 * @apiName listaDeConvocatorias
 * @apiGroup CULTURA
 * @apiVersion  1.0.0
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {String}                                                                                              [titulo]            Filtro para la convocatoria
 * @apiParam  {String="titulo","-titulo","evento_fecha","-evento_fecha","evento__fecha_fin","evento__fecha_fin"}    [ordering]          Filtro para la convocatoria
 * @apiParam  {Boolean}                                                                                             [abierta]           Filtro para la convocatoria
 * @apiParam  {Date}                                                                                                [fecha_inicio]      Filtro para la convocatoria
 * @apiParam  {Date}                                                                                                [fecha_fin]         Filtro para la convocatoria
 * @apiParam  {String}                                                                                              [limit]             Filtro para la paginación
 * @apiParam  {String}                                                                                              [offset]            Filtro para la paginación
 *
 * @apiUse metadata
 *
 * @apiSuccess (200) {Object[]}   results                     Resultado
 * @apiSuccess (200) {Number}     results.id                  Id de la convocatoria
 * @apiSuccess (200) {String}     results.url                 Url de la convocatoria
 * @apiSuccess (200) {String}     results.link                Link de la convocatoria
 * @apiSuccess (200) {String}     results.imagen              Imagen de la convocatoria
 * @apiSuccess (200) {String}     results.titulo              Titulo de la convocatoria
 * @apiSuccess (200) {String}     results.bajada
 * @apiSuccess (200) {String}     results.cuerpo              Cuerpo de la convocatoria
 * @apiSuccess (200) {String}     results.estado              Estado de la convocatoria
 * @apiSuccess (200) {String}     results.fecha_inicio        Fecha de inicio
 * @apiSuccess (200) {String}     results.fecha_fin           Fecha fin
 * @apiSuccess (200) {Object[]}   results.documentos          Documentos de la convocatoria
 * @apiSuccess (200) {Number}     metadata.total              Cantidad total de convocatorias
 * @apiSuccess (200) {String}     [metadata.prev]             Página anterior
 * @apiSuccess (200) {String}     [metadata.next]             Página siguiente
 *
 * @apiSuccessExample {json} Respuesta Exitosa:
 *
 *   {
 *     "metadata": {
 *       "resultset": {
 *         "count": 2,
 *         "offset": 0,
 *         "limit": 2
 *       },
 *       "total": 272,
 *       "prev": "http://localhost:3000/api/v1.0/cultura/convocatorias/?limit=2&ordering=evento__fecha_fin",
 *       "next": "http://localhost:3000/api/v1.0/cultura/convocatorias/?limit=2&ordering=evento__fecha_fin"
 *     },
 *     "results": [
 *       {
 *         "id": 3162,
 *         "url": "https://www.cultura.gob.ar/api/v2.0/convocatorias/3162/",
 *         "link": "http://convocatorias.cultura.gob.ar/fabricadeemprendedores",
 *         "imagen": "https://www.cultura.gob.ar/media/uploads/fabrica-de-emp.jpg",
 *         "titulo": "Fábrica de Emprendedores",
 *         "bajada": "Capacitaciones para proyectos culturales",
 *         "cuerpo": "",
 *         "estado": "cerrada",
 *         "fecha_inicio": "2016-08-12",
 *         "fecha_fin": "2016-09-02",
 *         "documentos": []
 *       },
 *       {
 *         "id": 3161,
 *         "url": "https://www.cultura.gob.ar/api/v2.0/convocatorias/3161/",
 *         "link": "https://www.cultura.gob.ar/linea-arte-y-transformacion-social-del-fna_3161/",
 *         "imagen": "https://www.cultura.gob.ar/media/uploads/becas_fondo_nacional_artes_argentina_20121-740x0.jpg",
 *         "titulo": "Línea Arte y Transformación Social, del FNA",
 *         "bajada": "Está destinada a proyectos que promuevan el arte como herramienta de transformación social",
 *         "cuerpo": "<p>El Fondo Nacional de las Artes lanza una l&iacute;nea de Arte y Transformaci&oacute;n Social transversal a todas sus becas, subsidios, concursos y pr&eacute;stamos. El Fondo reconoce el arte y la cultura como ejes para la construcci&oacute;n de una sociedad creativa, orientada al bien com&uacute;n, pac&iacute;fica y equitativa.</p>\r\n<p>Con este lanzamiento, convoca a los artistas, gestores culturales y emprendedores sociales a participar por una beca de $50.000. Estas est&aacute;n destinadas a la creaci&oacute;n y/o desarrollo de cualquier obra o proyecto que promueva el arte y la formaci&oacute;n art&iacute;stica como herramienta de<br />transformaci&oacute;n social.</p>\r\n<p>A su vez, el Fondo pone a disposici&oacute;n subsidios y pr&eacute;stamos para todos aquellos proyectos que trabajen en la intersecci&oacute;n del arte con otras disciplinas (educaci&oacute;n, urbanismo, justicia, salud, derechos, pobreza, convivencia), que sean innovadores y tengan un alto impacto en sus<br />propuestas de transformar la sociedad en diferentes dimensiones.</p>",
 *         "estado": "cerrada",
 *         "fecha_inicio": "2016-07-12",
 *         "fecha_fin": "2016-12-18",
 *         "documentos": []
 *       }
 *     ]
 *   }
 *
 *
 */


/** ------------------------------------
 *    Service Routes
 ** ------------------------------------*/
router.route('/convocatorias')
  .get(validate(paramValidation.webServices.cultura.convocatorias), convocatoriasCtrl.getList)
  /** 405 - Method Not Allowed */
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))

router.route('/convocatorias/:id')
  .get(convocatoriaDetalleCtrl.getElement)
  /** 405 - Method Not Allowed */
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