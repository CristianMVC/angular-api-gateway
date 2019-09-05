/** Admin Validations */
import adminAuth                  from './admin/auth'
import adminUser                  from './admin/user'
import adminRoles                 from './admin/roles'
import adminClient                from './admin/client'

/** API Validations */
import apiUsers                   from './api/users'
import apiAuth                    from './api/auth'
import apiRoles                   from './api/roles'
import apiPermissions             from './api/permissions'

/** WebServices Validations */
import generic                    from './web-services/generic'
import apostilla                  from './web-services/apostilla'
import andis                      from './web-services/andis'
import dnrpa                      from './web-services/dnrpa'
import obsequios                  from './web-services/obsequios'
import dniPassport                from './web-services/dni-pasaporte'
import seguridadVial              from './web-services/seguridad-vial'
import defensaConsumidor          from './web-services/defensa-consumidor'
import bpopulares                 from './web-services/bpopulares'
import georef                     from './web-services/georef'
import mercadosTest               from './web-services/mercados-test'
import mercados                   from './web-services/mercados'
import argentina                  from './web-services/argentina'
import ciudadanoDigital           from './web-services/ciudadano-digital'
import feriados                   from './web-services/feriados'
import msCrmTramites              from './web-services/mscrm-tramites'
import fronteras                  from './web-services/fronteras'
import anses                      from './web-services/anses'
import beneficios                 from './web-services/beneficios'
import cud                        from './web-services/cud'
import snt                        from './web-services/sistema-nacional-turnos'
import g20                        from './web-services/g20'
import infoleg                    from './web-services/infoleg'
import paisDigital                from './web-services/pais-digital'
import sintys                     from './web-services/sintys'
import incucai                    from './web-services/incucai'
import renaper                    from './web-services/renaper'
import minDesarrolloSocial        from './web-services/min-desarrollo-social'
import nomivac                    from './web-services/nomivac'
import rlm                        from './web-services/rlm'
import tad                        from './web-services/tad'
import cultura                    from './web-services/cultura'
import rns                        from './web-services/rns'

/** WebServices Validations */
import analiticas                 from './web-services-v2/analiticas'
import incucaiV2                  from './web-services-v2/incucai'
import srt                        from './web-services-v2/srt'
import trasplantados              from './web-services-v2/trasplantados'
import salud                      from './web-services-v2/salud'
import feriadosV2                 from './web-services-v2/feriados'


export default {
  /** ----------------------------------------------
   * Admin Validations:
   ** ------------------------------------------- */
  adminAuth: adminAuth,
  adminUser: adminUser,
  adminRoles: adminRoles,
  adminClient: adminClient,

  /** ----------------------------------------------
   *  API WebServices Validations:
   ** ------------------------------------------- */

  // WebServices Externals
  webServices: {
    generic: generic,
    apostilla: apostilla,
    analiticas: analiticas,
    andis: andis,
    seguridadVial: seguridadVial,
    dnrpa: dnrpa,
    obsequios: obsequios,
    dniPassport: dniPassport,
    defensaConsumidor: defensaConsumidor,
    bpopulares: bpopulares,
    georef: georef,
    mercadosTest: mercadosTest,
    mercados: mercados,
    argentina: argentina,
    ciudadanoDigital: ciudadanoDigital,
    feriados: feriados,
    msCrmTramites: msCrmTramites,
    fronteras: fronteras,
    anses: anses,
    cud: cud,
    beneficios: beneficios,
    snt: snt,
    g20: g20,
    infoleg: infoleg,
    paisDigital: paisDigital,
    sintys: sintys,
    incucai: incucai,
    incucaiV2: incucaiV2,
    renaper: renaper,
    minDesarrolloSocial: minDesarrolloSocial,
    nomivac: nomivac,
    rlm: rlm,
    tad: tad,
    cultura: cultura,
    rns: rns,
    srt: srt,
    trasplantados: trasplantados,
    salud: salud,
    feriadosV2: feriadosV2,
  },

  /** ----------------------------------------------
   *  API Core Validations:
   ** ------------------------------------------- */

  /** /api/auth */
  apiAuth: apiAuth,

  /** Roles-Permissions */
  roles: apiRoles,
  permissions: apiPermissions,

	// users
	createUser: apiUsers.createUser,
	updateUser: apiUsers.updateUser,
}
