import request  from 'superagent'
import fs       from 'fs'
import jwt      from 'jsonwebtoken'
import config   from '../../../../../config/env'
import redis    from '../../../../helpers/Redis'

const privateKey = fs.readFileSync(`${config.ca.dir}/rlm-privateKey.pem`)

const tokenKey = 'Auth:Token:GDE:SEGUROAUTOMOTOR:Token'
const tokenKeyExpire = '100'

const {
    query: securityQuery,
    url: securityUrl,
} = config.ws2.dnrpa.seguroAutomotor.security

const signConfig = {
  algorithm: 'RS256',
  expiresIn: 3600,
  notBefore: 0,
}
const secretData = {
  iss: 'MM_APIGATEWAY',
}

const getKongToken = () => {
    const getTokenPromise = new Promise((resolve, reject) => {
        jwt.sign(secretData, privateKey, signConfig, (e, accessToken) => {
          if (e) {
            reject(e)
            return
          }

          const tokenKong = `Bearer ${accessToken}`
          resolve(tokenKong)
        })
      })

    return getTokenPromise
}

function getTokens() {
    return new Promise((resolve, reject) => {
      getKongToken()
        .then((tokenKong) => {
          request
            .post(securityUrl)
            .query(securityQuery)
            .set('Authorization', tokenKong)
            /* .ok(({ body: securityToken, text, type, }) => {
              if (type === 'text/xml') {
                reject({
                    status: 500,
                    message: 'Error Request Token',
                })
                return false
              }
              return true
            }) */
            .then(({ body: securityToken, }) => {
              const tokens = {
                security: `Bearer ${securityToken}`,
                kong: tokenKong,
              }
              resolve(tokens)
            })
            .catch((e) => {
                reject({
                    status: (e.status),
                    message: (e.message),
                    devMessage: (e.stack),
                })
            })
        })
        .catch((e) => {
            reject(e)
        })
    })
  }

const auth = () => {
    const authPromise = new Promise((resolve, reject) => {
        /* getTokens()
            .then((tokens) => {
              resolve(tokens)
            })
            .catch((e) => {
                reject(e)
            }) */

          redis.exists(tokenKey)
            .then((exists) => {
                if (!exists) {
                    getTokens()
                      .then((tokens) => {
                          redis.setExp(tokenKey, JSON.stringify(tokens), tokenKeyExpire)
                              .catch(() => {})
                              .finally(() => {
                                  resolve(tokens)
                              })
                      })
                      .catch(reject)
                    return
                }

                redis.get(tokenKey)
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

    return authPromise
}

export default auth