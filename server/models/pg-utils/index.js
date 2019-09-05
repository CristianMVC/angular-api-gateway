import moment                   from 'moment'
import sortByDate               from '../../helpers/sortByDate'
import { health, disability, }  from './pgTermsList'
// import { }  from './pgMailsList'

const pgModelList = {
    cobertura: {
        value: 'listado-coberturas',
        toc: [
            health,
        ],
    },
    licencia: {
        value: 'licencia-nacional-digital',
        model: {
            frente: String,
            dorso: String,
            qr: String,
        },
        group: 'VIAL',
        folder: 'licencia',
    },
    licenciaV2: {
        transactionFunctions: {
            start: 'generic_start_id_transaction',
            get: 'generic_get_json_expired_users',
            finish: 'generic_finish_transaction',
        },
        value: 'licencia-nacional-digital-v2',
        model: {
            frente: String,
            dorso: String,
            qr: String,
        },
        group: 'VIAL',
        folder: 'licencia',
        exp(license) {
            if (!license.exp) {
                throw new Error('noExpTime')
            }

            return moment.unix(license.exp).local().format('YYYY-MM-DD HH:mm:ss')
        },
    },
    aplcacionesVacunasV2: {
        value: 'listado-aplicaciones-vacunas-v2',
        toc: [
            health,
        ],
    },
    obtenerVehiculosV2: {
        value: 'listado-de-vehiculos-v2',
        exp({ results: cars, }) {
            const expTimes = []
            for (const { cedulas_verdes: greenCards, cedulas_azules: blueCards, } of cars) {
                for (const greenCard of greenCards) {
                    if (greenCard.exp) {
                        expTimes.push(moment(greenCard.exp))
                    }
                }
                for (const blueCard of blueCards) {
                    if (blueCard.exp) {
                        expTimes.push(moment(blueCard.exp))
                    }
                }
            }

            if (!expTimes.length) {
                throw new Error('noExpTime')
            }

            const expTimesSorted = expTimes.sort(sortByDate)

            const firstExp = expTimesSorted[0]

            return firstExp.local().format('YYYY-MM-DD HH:mm:ss')
        },
    },
    cudCertificado: {
        value: 'obtener-certificado-cud',
        transactionFunctions: {
            start: 'generic_start_id_transaction',
            get: 'generic_get_json_expired_users',
            finish: 'generic_finish_transaction',
        },
        model: {
            cud: {
                form: String,
                front: String,
                back: String,
            },
            qr: String,
        },
        toc: [
            health,
            disability,
        ],
        group: 'CUD',
        folder: 'certificado-unico-discapacidad',
        exp({ hasta: toDate, }) {
            if (!toDate) {
                throw new Error('noExpTime')
            }

            const momentToDate = moment(toDate)

            return momentToDate.local().format('YYYY-MM-DD HH:mm:ss')
        },
    },
    srtCredencialV2: {
        value: 'credencial-srt-v2',
        identifier({ params, }) {
            try {
                const { credential, } = params
                if (!credential) {
                    throw new Error('noIdentifier')
                }
                return credential
            } catch (e) {
                throw e
            }
        },
    },
    trasplantadosV2: {
        value: 'trasplantados-v2',
        // eslint-disable-next-line array-bracket-spacing
        toc: [ health, ],
    },
    donacionOrganosV2: {
        value: 'donacion-organos-v2',
        // eslint-disable-next-line array-bracket-spacing
        toc: [ health, ],
    },
    seguroAutomotorV2: {
        model: {
            imagenes: {
                qr: String,
                frente: String,
            },
        },
        value: 'seguro-automotor-v2',
        group: 'DNRPA',
        folder: 'seguro-automotor',
        identifier({ query, }) {
            try {
                const { cedula: idCard, } = query
                if (!idCard) {
                    throw new Error('noIdentifier')
                }
                return idCard
            } catch (e) {
                throw e
            }
        },
    },
    simboloAutomotorV2: {
        value: 'simbolo-automotor-v2',
        toc: [
            health,
        ],
    },
}

export { pgModelList, }