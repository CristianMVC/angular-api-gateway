import express                    from 'express'
import acl                        from '../../../middelwares/acl'

/** Imports Routes */
import andisRoutes                from './andis'
import ansesRoutes                from './anses'
import argentinaRoutes            from './argentina'
import apostillaRoutes            from './apostilla'
import barriosPopularesRoutes     from './bpopulares'
import beneficiosRoutes           from './beneficios'
import ciudadanoDigitalRoutes     from './ciudadano-digital'
import cudRoutes                  from './cud'
import coberturaRoutes            from './cobertura'
import culturaRoutes              from './cultura'
import compreSocialRoutes         from './compre-social'
import defensaConsumidorRoutes    from './defensa-consumidor'
import dnrpaRoutes                from './dnrpa'
import feriadosRoutes             from './feriados'
import fronterasRoutes            from './fronteras'
import g20Routes                  from './g20'
import geoRefRoutes               from './georef'
import inclusionDigitalRoutes     from './inclusion-digital'
import incucaiRoutes              from './incucai'
import infolegRoutes              from './infoleg'
import juntasRoutes               from './juntas'
import mercadosRoutes             from './mercados'
import minDesarrolloSocial        from './min-desarrollo-social'
import minInteriorRoutes          from './dni-pasaporte'
import minJusticiaRoutes          from './min-justicia'
import msCrmRoutes                from './mscrm-tramites'
import nomivacRoutes              from './nomivac'
import obsequiosRoutes            from './obsequios'
import paisDigitalRoutes          from './pais-digital'
import pamiRoutes                 from './pami'
import puertosViasRoutes          from './puertos-vias-navegables'
import polizaSegurosRoutes        from './poliza-seguros-automotor'
import renaperRoutes              from './renaper'
import rlmRoutes                  from './rlm'
import rnsRoutes                  from './rns'
import saludRoutes                from './salud'
import seguridadVialRoutes        from './seguridad-vial'
import sntRoutes                  from './sistema-nacional-turnos'
import sintysRoutes               from './sintys'
import tadRoutes                  from './tad'
import turnosRoutes               from './turnos'

const router = express.Router()	// eslint-disable-line new-cap

/** Filas */
router.use('/api-filas', acl('apiFilas'), (req, res, next) => {
 req.isFilas = true
 next()
}, turnosRoutes)

/** Turnos */
router.use('/api-turnos', acl('apiTurnos'), (req, res, next) => {
 req.isTurnos = true
 next()
}, turnosRoutes)

/** Andis */
router.use('/andis', acl('apiAndis'), andisRoutes)

/** Anses */
router.use('/anses', acl('apiAnses'), ansesRoutes)

/** Apostilla */
router.use('/apostilla', acl('apiApostilla'), apostillaRoutes)

/** Argentina */
router.use('/argentina', acl('apiArgentina'), argentinaRoutes)

/** Barrios populares */
router.use('/barrios-populares', acl('apiBarriosPopulares'), barriosPopularesRoutes)

/** Beneficios empleados públicos */
router.use('/beneficios', acl('apiBeneficios'), beneficiosRoutes)

/** Ciudadano-Digital */
router.use('/ciudadano-digital', acl('apiMinMordernizacion'), ciudadanoDigitalRoutes)

/** Federador Cobertura **/
router.use('/federador/coberturas', acl('apiFederadorCoberturas'), coberturaRoutes)

/** Compre Social - 100% nuestro */
router.use('/compre-social', acl('apiArgentina'), compreSocialRoutes)

/** Certificado único de discapacidad */
router.use('/cud', acl('apiCud'), cudRoutes)

/** Cultura */
router.use('/cultura', acl('apiCultura'), culturaRoutes)

/** Defensa Consumidor */
router.use('/defensa-consumidor', acl('apiDefensaConsumidor'), defensaConsumidorRoutes)

/** DNRPA */
router.use('/dnrpa', acl('apidnrpa'), dnrpaRoutes)

/** Feriados */
router.use('/feriados', acl('apiMinMordernizacion'), feriadosRoutes)

/** Pasos fronterizos */
router.use('/fronteras', acl('apiFronteras'), fronterasRoutes)

/** G20 */
router.use('/g20', acl('apig20'), g20Routes)

/** GDE */
router.use('/gde', acl('apiGde'), obsequiosRoutes)

/** Datos - geoRef */
router.use('/georef', acl('apiDatosAbiertosGeoRef'), geoRefRoutes)

/** Certificado de inclusion digital **/
router.use('/inclusion-digital',  acl('apiInclusionDigital'), inclusionDigitalRoutes)

/** Incucai */
router.use('/incucai', acl('apiIncucai'), incucaiRoutes)

/** Infoleg */
router.use('/infoleg', acl('apiInfoleg'), infolegRoutes)

/** Juntas */
router.use('/juntas', acl('apiJuntas'), juntasRoutes)

/** Interfaces-Salud */
router.use('/interfaces-api/salud', acl('apiInterfacesApiSalud'), saludRoutes)

/** Mercados */
router.use('/mercados', acl('apiMercados'), mercadosRoutes)

/** Ministerio Desarrollo Social */
router.use('/min-desarrollo-social', acl('apiMinDesarrolloSocial'), minDesarrolloSocial)

/** Ministerio del interior */
router.use('/mininterior', acl('apiMinInterior'), minInteriorRoutes)

/** Ministerio de Justicia de Derechos Humanos */
router.use('/min-justicia', acl('apiMinJusticia'), minJusticiaRoutes)

/** MS-CRM - Trámites */
router.use('/mscrm-tramites', acl('apiMsCrmTramites'), msCrmRoutes)

/** NOMIVAC */
router.use('/nomivac', acl('apiNomivac'), nomivacRoutes)

/** Pais Digital */
router.use('/paisdigital', acl('apiPaisDigital'), paisDigitalRoutes)

/** PAMI */
router.use('/pami', acl('apiPami'), pamiRoutes)

/** Poliza Seguros Automotor */
router.use('/poliza-seguros-automotor', acl('apiPolizaSegurosAutomotor'), polizaSegurosRoutes)

/** Puertos y Vias navegables **/
router.use('/puertos-vias-navegables', acl('apiPuertosViasNavegables'), puertosViasRoutes)

/** Renaper */
router.use('/renaper', acl('apiRenaper'), renaperRoutes)

/** RLM */
router.use('/rlm', acl('apiRLM'), rlmRoutes)

/** RNS */
router.use('/rns', acl('apiRNS'), rnsRoutes)

/** Licencias */
router.use('/seguridad-vial', acl('apiSeguridadVial'), seguridadVialRoutes)

/** Sistema Nacional de Turnos */
//router.use('/snt', acl('apiSNT'), sntRoutes)

/** SINTyS - Seguridad social */
router.use('/sintys', acl('apiSintys'), sintysRoutes)

/** RLM */
router.use('/tad', acl('apiTAD'), tadRoutes)

router.use('/rns', acl('apiRNS'), rnsRoutes)

router.get('/', (req, res) => res.json({
  title: 'Welcome to API v1.0',
  user: req.user,
  remote: {
    address: req.socket.remoteAddress,
    family: req.socket.remoteFamily,
    port: req.socket.remotePort,
  },
}))


export default router
