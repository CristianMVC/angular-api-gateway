import APIResponse                                      from '../../../helpers/APIStandarResponses'
import APIError                                         from '../../../helpers/APIError'
import { pgModelList, }                          from '../../../models/pg'
import { refreshPgLogForcefully, }                      from '../../../middelwares/pgMiddleware'
import {
    activateIdCard as activateIdCardRequest,
    getCarsFromIdCards as getCarsFromIdCardsRequest,
    getIdCard as getIdCardRequest,
    // getInsuranceImages as getInsuranceImagesRequest,
    getInsuranceByIdCardNumber as getInsuranceByIdCardNumberRequest,
    getInsuranceImages as getInsuranceImagesRequest,
}                                                     from  './request'

const parsedIdCardNumber = (idCardNumber) => {
    return ({ numero_cedula: idCardNumberOrigin, }) => {
        while (idCardNumberOrigin.startsWith('0')) {
            idCardNumberOrigin = idCardNumberOrigin.slice(1, idCardNumberOrigin.length)
        }
        return idCardNumberOrigin.toUpperCase() === idCardNumber.toUpperCase()
    }
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */

const activateIdCard = (req, res, next) => {
    const {
        userData,
        params,
    } = req

    const { cedula: idCardNumber, } = params

    const { dni_number: dniNumber, username: idUser, } = userData

    /* let activatedVerified = false */
    // El servicio externo no es totalmente fiable en su respuesta, puede activar la cedula y dar error,
    // por ende se revisa el listado de cedulas para saber si esta se encuentra activa
    activateIdCardRequest(dniNumber, idCardNumber)
        .then(() => {
            /* activatedVerified = true  */// la cedula fue activada con certeza
        })
        .catch(() => {})
        .finally(() => {
            setTimeout(() => {
                getCarsFromIdCardsRequest(dniNumber, 1000, 0)
                    .then((cars) => {
                        refreshPgLogForcefully(pgModelList.obtenerVehiculosV2, idUser, dniNumber, APIResponse.list(0, 0, cars))
                            .catch(() => {})
                            .finally(() => {
                                for (const car of cars) {
                                    const { cedulas_verdes: greenCards, cedulas_azules: blueCards, } = car

                                    let activatedIdCard = greenCards.find(parsedIdCardNumber(idCardNumber))

                                    if (!activatedIdCard) {
                                        activatedIdCard = blueCards.find(parsedIdCardNumber(idCardNumber))
                                    }

                                    if (activatedIdCard) {
                                        res.json(activatedIdCard)
                                        return
                                    }
                                }

                                const apiError = APIError({
                                    status: 404,
                                    message: 'Not Found',
                                })

                                next(apiError)
                            })
                    })
                    .catch(() => {
                        const apiError = APIError({
                            status: 404,
                            message: 'Not Found',
                        })

                        next(apiError)
                    })
            }, 20000)
        })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCarsFromIdCards = (req, res, next) => {
    const {
        userData,
    } = req

    const { dni_number: dniNumber, } = userData

    getCarsFromIdCardsRequest(dniNumber, 1000, 0)
        .then((cars) => {
            res.json(APIResponse.list(0, 0, cars))
        })
        .catch((/* e */) => {
            const e = {
                status: 404,
                message: 'Not Found',
            }
            const apiError = APIError(e)
            next(apiError)
        })
}


/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCarsFromIdCardsWithImages = (req, res, next) => {
    const {
        userData,
    } = req

    const { dni_number: dniNumber, } = userData

    getCarsFromIdCardsRequest(dniNumber, 1000, 0, true)
        .then((cars) => {
            res.json(APIResponse.list(0, 0, cars))
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */

const getIdCard = (req, res, next) => {
    const {
        userData,
        params,
    } = req

    const {
        cedula: idCardNumber,
        patente: domain,
        hash,
    } = params

    const { dni_number: dniNumber, username: idUser, } = userData

    getIdCardRequest(dniNumber, domain, idCardNumber, hash)
        .then((idCardImages) => {
            const { isRefresh, } = idCardImages

            if (!isRefresh) {
                res.json(idCardImages)
                return
            }

            delete idCardImages.isRefresh

            getCarsFromIdCardsRequest(dniNumber, 1000, 0)
                .then((cars) => refreshPgLogForcefully(pgModelList.obtenerVehiculosV2, idUser, dniNumber, APIResponse.list(0, 0, cars)))
                .catch(() => {})
                .finally(() => {
                    res.json(idCardImages)
                })
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getInsurance = (req, res, next) => {
    const {
        userData,
        query,
    } = req

    const {
        cedula: idCardNumber,
    } = query

    const {
        dni_number: dniNumber,
    } = userData

    getInsuranceByIdCardNumberRequest(dniNumber, idCardNumber.toUpperCase())
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}


/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getInsuranceImages = (req, res, next) => {
    const {
        userData,
        params,
    } = req

    const {
        patente: domain,
        seguro: insuranceNumber,
        hash,
    } = params

    const {
        dni_number: dniNumber,
    } = userData

    getInsuranceImagesRequest(domain, insuranceNumber, dniNumber, hash)
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

export default {
    activateIdCard,
    getIdCard,
    getCarsFromIdCards,
    getCarsFromIdCardsWithImages,
    getInsurance,
    getInsuranceImages,
}