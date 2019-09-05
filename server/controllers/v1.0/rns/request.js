import request from 'superagent'
import moment from 'moment'
import config from '../../../../config/env'
import paginateArray from '../../../helpers/paginateArray'

const {
    auth: authData,
    obtenerSociedades: obtenerSociedadesData,
} = config.ws.rns

const {
    username: authUser,
    password: authPassword,
} = authData

const formatDatesSociedades = (sociedades) => {
    return sociedades.map((sociedad) => {
        const {
            FECHA_CONTRATO_SOCIAL: contratoSocial,
            FECHA_ACTUALIZACION: actualizacion,
            FECHA_CORTE: corte,
        } = sociedad

        sociedad.FECHA_CONTRATO_SOCIAL = moment(contratoSocial, 'YYYY-MM-DD-HH-mm').toISOString()
        sociedad.FECHA_ACTUALIZACION = moment(actualizacion, 'YYYY-MM-DD-HH-mm').toISOString()
        sociedad.FECHA_CORTE = moment(corte, 'YYYY-MM-DD-HH-mm').toISOString()

        return sociedad
    })
}

const bodySociedadesToArray = (bodyRes) => {
    const {
        value: sociedades,
    } = bodyRes

    if (sociedades && Array.isArray(sociedades)) {
        return sociedades
    }

    delete bodyRes['@odata.context']

    return [
        bodyRes,
    ]
}

const obtenerSociedades = (cuit, razonSocial,  limit = 0, offset = 0) => {
    const query = {
        $format: 'JSON',
    }

    let urlEndpoint = obtenerSociedadesData.url

    if (cuit) { // Si el cuit se envia, se ignora la razon social
        urlEndpoint = `${urlEndpoint}('${cuit}')`
    } else if (razonSocial) {
        query.$filter = `contains(RAZON_SOCIAL,'${razonSocial}')`
    }

    const getSociedadesPromise = new Promise((resolve, reject) => {
        const requestPromise = request
            .get(urlEndpoint)
            .auth(authUser, authPassword)
            .query(query)
            .timeout({
                response: 120000,
                deadline: 120000,
            })

        requestPromise
            .then((res) => {
                try {
                    const sociedades = bodySociedadesToArray(res.body)

                    const paginatedSociedades = paginateArray(sociedades, limit, offset)

                    if (!paginatedSociedades.length) {
                        reject({
                            status: 404,
                            message: 'Not Found',
                        })
                        return
                    }

                    const formatedSociedades = formatDatesSociedades(paginatedSociedades)

                    resolve(formatedSociedades)
                } catch (e) {
                    reject({
                        status: 503,
                        message: 'Error en el ws externo',
                        devMessage: e.message,
                    })
                    return
                }
            })
            .catch((e) => {
                reject({
                    status: e.status,
                    message: e.message,
                })
                return
            })
    })

    return getSociedadesPromise
}

export {
    obtenerSociedades,
}