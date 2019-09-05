import dnrpaCrons from './dnrpa'
import cudCron from './cud'
import safetyVialCrons from './seguridad-vial'
import pgUserCredentialsList from './../../models/pg-utils/pgUserCredentialsList'
import pgMailsList from './../../models/pg-utils/pgMailsList'

const crons = [
    ...dnrpaCrons,
]

const cronsNew = [
    ...safetyVialCrons,
    ...cudCron,
]

const cronsCredentials = [
    pgUserCredentialsList.licencia,
    pgUserCredentialsList.cud,
    pgUserCredentialsList.dni,
    pgUserCredentialsList.cedulasAutomotor,
]

const cronsMail = [
    pgMailsList.licenseExpiresIn90Days,
    pgMailsList.licenseExpiresIn30Days,
    pgMailsList.licenseExpired,
    pgMailsList.cronPeopleFourteen,
    pgMailsList.cronPeopleSixtyFive,
    // pgMailsList.cudExpiresIn90Days,
    // pgMailsList.cudExpiresIn30Days,
    // pgMailsList.cudExpired,
    // pgMailsList.cronDniExpiresIn60Days,
    // pgMailsList.cronDniExpiresIn30Days,
    // pgMailsList.cronDniExpired,
]

export default crons
export {
    cronsNew,
    cronsCredentials,
    cronsMail,
}