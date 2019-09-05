import request                      from 'superagent'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import APIError                     from '../../../helpers/APIError'
import APIResponse                  from  '../../../helpers/APIStandarResponses'

const { login, obtener, } = config.ws.cobertura

const methods = {
    async getToken() {
        try {
            const response = await request
                .post(login.url)
                .type('json')
                .send(login.body)

            const { token, } = response.body

            return token
        } catch (e) {
            throw e
        }
    },
    async getCobertura(token, numeroDocumento, idSexo) {
        try {
            const { codDominio, } = obtener.headers

            const response = await request
                .get(obtener.url)
                .set({
                    codDominio: codDominio,
                    token: token,
                })
                .query({
                    nroDocumento: numeroDocumento,
                    idSexo: idSexo,
                })
                .type('json')
                .send()

            let { body, } = response
            const { status, } = response

            if (status === 204) {
                body = []
            }

            return body
        } catch (e) {
            throw e
        }
    },
}


const get = async (req, res, next) =>{
    const { userData, } = req
    const { dni_number: numeroDocumento, gender, } = userData

    const idSexo = gender === 'M' ? 1 : 2

    let requestToken

    try {
        requestToken = await methods.getToken()
    } catch (e) {
        logger.error('Controller::cobertura::methods::getToken::reject')
        const apiError = APIError({
            status: 500,
            devMessage: e.message,
        })
        throw apiError
    }

    let coberturas

    try {
        coberturas = await methods.getCobertura(requestToken, numeroDocumento, idSexo)
    } catch (e) {
        logger.error('Controller::cobertura::methods::getCobertura::reject')
        const apiError = APIError({
            status: 500,
            devMessage: e.message,
        })
        throw apiError
    }

    const response = APIResponse.list(0, 0, coberturas)

    if (!coberturas.length) {
        const apiError = APIError({
            status: 404,
            message: 'Not Found',
        })
        throw apiError
    }

    res.json(response)
}


export default {
    get,
}
