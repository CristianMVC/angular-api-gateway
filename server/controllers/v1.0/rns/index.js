import APIResponse from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'
import { obtenerSociedades as obtenerSociedadesReq, } from './request'



const obtenerSociedades = (req, res, next) => {
    const {
        limit,
        offset,
        cuit,
        razon_social,
    } = req.query

    if (!cuit && !razon_social) {
        const apiError = APIError({
            status: 400,
            message: 'Missing both, "cuit" and "razon_social"',
        })
        next(apiError)
        return
    }

    obtenerSociedadesReq(cuit, razon_social, limit, offset)
        .then((sociedades) => {
            res.json(APIResponse.list(limit, offset, sociedades))
        })
        .catch((e) => {
            const apiError = APIError(e)

            next(apiError)
        })
}


export default {
    obtenerSociedades,
}