import fs           from 'fs'
import { verify, }  from 'jsonwebtoken'
import APIError     from '../helpers/APIError'
import config       from '../../config/env'

const { dir, } = config.ca

const idArgentinaCert = fs.readFileSync(`${dir}/idArgentina-authJwt-publicCert.pem`)
const openidArgentinaCert = fs.readFileSync(`${dir}/OpenIdArgentina-authJwt-publicCert.pem`)

const options = {
    algorithms: [
        'RS256',
    ],
    ignoreExpiration: true,
}

const verifyToken = (headers) => {
    let tokenJWT
    let cert

    if (headers['id-token']) {
        tokenJWT = headers['id-token']
        cert = idArgentinaCert
    } else if (headers['open-id-token']) {
        tokenJWT = headers['open-id-token']
        cert = openidArgentinaCert
    } else {
        // TODO: Error 400
        return Promise.reject(false)
    }

    const tokenPromise = new Promise((resolve, reject) => {
        verify(tokenJWT, cert, options, (err, decode) => {
            if (err) {
                reject(err)
                return
            }

            resolve(decode)
        })
    })

    return tokenPromise
}

const setUserData = (req, next, callback) => {
    const { headers, } = req

    verifyToken(headers)
        .then((userData) => {
            req.userData = userData

            if (!callback) {
                next()
                return
            }

            callback()
        })
        .catch((e) => {
            if (e === false) {
                const apiError = APIError({
                    status: 400,
                    message: 'Missing ID Token',
                })
                next(apiError)
                return
            }

            const apiError = APIError({
                status: 401,
                message: 'Invalid ID Token',
            })
            next(apiError)
        })
}
/*
const getTokenProperty = (property, decodedToken) =>  decodedToken[property] !== undefined ? decodedToken[property] :

const getTokenProperties = async (properties = [], decodedTokenArg, headers) => {
    let decodedIDtoken

    if (!tokenArg && headers) {
        try {
            decodedIDtoken = await verifyToken(headers)
        } catch (e) {
            throw e
        }
    }

    let response = []

    for (const property of properties){
        getTokenProperty()
    }


} */


export { verifyToken, setUserData, }
