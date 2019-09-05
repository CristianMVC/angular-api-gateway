import {
    getDNIimages as getDNIimagesRequest,
    getDNIData as getDNIRequest,
}                                           from './request'
import APIError                             from '../../../helpers/APIError'

/**
 * getDNI
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDNI = (req, res, next) => {
    const { userData, } = req

    const {
        dni_number: dniNumber,
        //username: idUser,
        gender,
    } = userData

    getDNIRequest(dniNumber, gender)
        .then((dniData) => {
            res.json(dniData)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

/**
 * getDNIimages
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDNIimages = (req, res, next) => {
    const { userData, } = req

    const {
        dni_number: dniNumber,
        //username: idUser,
        gender,
    } = userData

    getDNIimagesRequest(dniNumber, gender)
        .then((dniImages) => {
            res.json(dniImages)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}


export default {
    getDNI,
    getDNIimages,
}