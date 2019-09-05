import { verifyToken, } from '../helpers/token'
import APIError from '../helpers/APIError'

const idTokenMiddleware = (req, res, next) => {
    verifyToken(req.headers)
        .then((userData) => {
            req.userData = userData
            next()
        })
        .catch((e) => {
            if (e === false) {
                const error = APIError({
                    status: 400,
                    message: 'Missing ID Token',
                })
                next(error)
                return
            }
            const error = APIError({
                status: 401,
                message: 'Invalid ID Token',
            })

            next(error)
        })
}

const optionalIdTokenMiddleware = (req, res, next) => {
    if (!req.headers['id-token'] && !req.headers['open-id-token']) {
        next()
        return
    }

    idTokenMiddleware(req, res, next)
}

export {
    idTokenMiddleware,
    optionalIdTokenMiddleware,
}