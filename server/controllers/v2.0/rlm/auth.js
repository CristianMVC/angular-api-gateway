import request      from 'superagent'
import jwt          from 'jsonwebtoken'
import fs           from 'fs'
import config       from '../../../../config/env'
import TlsReject    from '../../../helpers/TlsReject'
import APIError     from '../../../helpers/APIError'
import redis        from '../../../helpers/Redis'
import logger       from '../../../../config/winston'

const { url: rlmSecurityUrl, query: rlmSecurityQuery, } = config.ws2.rlm.security

const privateKey = fs.readFileSync(`${config.ca.dir}/rlm-privateKey.pem`)
const signConfig = {
  algorithm: 'RS256',
  expiresIn: 3600,
  notBefore: 0,
}
const secretData = {
  iss: 'MM_APIGATEWAY',
}

const tokenKey = 'Auth:Token:GDE:RLM:Token'
const tokenKeyExpire = '100'

/**
 * Generate Token JWT
 * @returns {*}
 * @private
 */
function getKongToken() {
  return new Promise((resolve, reject) => {
    jwt.sign(secretData, privateKey, signConfig, (e, accessToken) => {
      if (!accessToken) {
        const apiError = APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
          isPublic: false,
        })
        reject(apiError)
        return
      }
      resolve(`Bearer ${accessToken}`)
    })
  })
}


function getTokens() {
  return new Promise((resolve, reject) => {
    getKongToken()
      .then((tokenKong) => {
        logger.log('debug', 'pidio el token')
        TlsReject.set()
        request
          .post(rlmSecurityUrl)
          .set('Authorization', tokenKong)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json;charset=UTF-8')
          .set('Accept-Language', 'en-US,en,es,es-AR;q=0.5')
          .set('Accept-Encoding', 'gzip, deflate')
          .set('Cache-Control', 'no-cache')
          .set('User-Agent', 'Mozilla/5.0')
          .query(rlmSecurityQuery)
          .then(({ body: securityToken, }) => {
            if (!securityToken) {
              const apiError = APIError({
                status: 503,
                message: 'Error Request Token',
              })
              return reject(apiError)
            }

            const response = {
              security: `Bearer ${securityToken}`,
              kong: tokenKong,
            }

            resolve(response)
          })
          .catch((e) => {
            const apiError = APIError({
              status: (e.status),
              message: (e.message),
              devMessage: (e.stack),
            })
            reject(apiError)
          })
      })
      .catch((e) => reject(e))
  })
}


export default function () {
    return new Promise((resolve, reject) => {
        redis.exists(tokenKey)
            .then((exists) => {
                if (!exists) {
                    getTokens()
                      .then((tokens) => {
                          redis.setExp(tokenKey, JSON.stringify(tokens), tokenKeyExpire)
                              .then(() => {})
                              .catch(() => {})
                              .finally(() => {
                                  resolve(tokens)
                              })
                      })
                      .catch((e) => {
                        reject(e)
                      })
                    return
                }

                redis
                    .get(tokenKey)
                    .then((reply) => {
                      let tokens
                      try {
                            tokens = JSON.parse(reply)
                      } catch (e) {
                        const apiError = {
                            status: 500,
                            message: (e.message),
                            devMessage: (e.stack),
                            isPublic: false,
                        }
                        reject(APIError(apiError))
                        return
                      }
                      resolve(tokens)
                    })
                    .catch((e) => {
                      const apiError = {
                          status: 500,
                          message: (e.message),
                          devMessage: (e.stack),
                          isPublic: false,
                      }
                      reject(APIError(apiError))
                    })
              })
              .catch((e) => {
                const apiError = {
                    status: 500,
                    message: (e.message),
                    devMessage: (e.stack),
                    isPublic: false,
                }
                reject(APIError(apiError))
              })
      })
}

