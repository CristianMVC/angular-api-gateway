import logger                       from '../../../../config/winston'
import APIError                     from '../../../helpers/APIError'
import APIResponse                  from '../../../helpers/APIStandarResponses'
import {
    getExternalKey,
    getSelfToken,
    getExternalToken,
    getListadoExcepciones,
}                                   from './request_cabotajes'


const getListadoCabotajes = (req, res, next) => {
    getExternalKey()
        .then(() => {
            const selfToken = getSelfToken()

            if (!selfToken) {
                logger.error('Controller::PuertosViasNavegables::methods::getSelfToken')
                const apiError = APIError({
                    status: 500,
                    devMessage: e.message,
                })
                next(apiError)
            }

            getExternalToken(selfToken)
                .then((externalToken) => {
                    getListadoExcepciones(externalToken)
                        .then((listadoRes) => {
                            const response = APIResponse.list(0, 0, listadoRes)

                            res.json(response)
                        })
                        .catch((e) => {
                            logger.error('Controller::PuertosViasNavegables::methods::getListadoCabotaje')
                            const apiError = APIError({
                                status: 500,
                                devMessage: e.message,
                            })
                            next(apiError)
                        })
                })
                .catch((e) => {
                    logger.error('Controller::PuertosViasNavegables::methods::getExternalToken')
                    const apiError = APIError({
                        status: 500,
                        devMessage: e.message,
                    })
                    next(apiError)
                })
        })
        .catch((e) => {
            logger.error('Controller::PuertosViasNavegables::methods::getKey')
            const apiError = APIError({
                status: 500,
                devMessage: e.message,
            })
            next(apiError)
        })
}


export default {
    getListadoCabotajes,
}
