import request from 'superagent'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import config from '../../../../../config/env'
import logger from '../../../../../config/winston'
import redis from '../../../../helpers/Redis'
import TlsReject from '../../../../helpers/TlsReject'
import APIError from '../../../../helpers/APIError'


const data = {
  token1: '',
  token2: '',
}

const tokenKey = 'Auth:Token:GDE:PolizaSegurosAutomotor:Token'
const tokenKeyExpire = '900'

/**
 * Generate Token JWT
 * @returns {*}
 * @private
 */
function getKongToken() {
  logger.log('debug', 'RLM::ControllerAuth::getToken1')
  return new Promise((resolve, reject) => {
    try {
      logger.log('debug', 'RLM::ControllerAuth::getToken1::Promise::GenerateJWT')
      // const key = fs.readFileSync(`${config.ca.dir}/gdeKong-privateKey.pem`)
      const key = fs.readFileSync(`${config.ca.dir}/rlm-privateKey.pem`)
      const accessToken = jwt.sign(
        {
          iss: 'MM_APIGATEWAY',
        },
        key,
        {
          algorithm: 'RS256',
          expiresIn: 3600,
          notBefore: 0,
        }
      )

      data.token1 = `Bearer ${accessToken}`
      return resolve(data.token1)
    } catch (e) {
      return reject(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.stack),
        isPublic: false,
      }))
    }
  })
}


/**
 * getTokens
 */
function getTokens() {
  logger.log('debug', 'RLM::ControllerAuth::getTokens')
  logger.log('debug', 'RLM::getTokens::Data:%j', data)
  return new Promise((resolve, reject) => {
    getKongToken()
      .then(() => {
        TlsReject.set()

        request
          .post(config.ws.gde.security.url)
          .set('Authorization', data.token1)
          .set('content-type', 'application/json')
          .set('Accept', 'application/json;charset=UTF-8')
          .set('Accept-Language', 'en-US,en,es,es-AR;q=0.5')
          .set('Accept-Encoding', 'gzip, deflate')
          .set('Cache-Control', 'no-cache')
          .set('User-Agent', 'Mozilla/5.0')
          .query(config.ws.gde.security.query)
          .then((v) => {
            if (v.body) {
              data.token2 = `Bearer ${v.body.accessToken}`
              redis
                .set(tokenKey, JSON.stringify(data))
                .then((expire) => redis.expire(tokenKey, tokenKeyExpire)
                  .then(() => {
                    if (expire)
                      return resolve(data)
                    else
                      return reject(APIError({
                        status: 500,
                        message: 'Error al Obtener Token Externo',
                        isPublic: false,
                      }))
                  })
                  .catch((e) => reject(APIError({
                    status: 500,
                    message: (e.message),
                    devMessage: (e.stack),
                    isPublic: false,
                  }))))
                .catch((e) => reject(APIError({
                  status: 500,
                  message: (e.message),
                  devMessage: (e.stack),
                  isPublic: false,
                })))
            } else
              return reject(APIError({
                status: 500,
                message: 'Error Request Token',
              }))
          })
          .catch((e) => reject(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          })))
      })
      .catch((e) => reject(e))
  })
}


/**
 * getTokens
 */
export default function () {
  logger.log('debug', 'RLM::Controller::Auth::Promise::Auth')
  logger.log('debug', 'RLM::Auth::Data:%j', data)
  return new Promise((resolve, reject) => {
    redis
      .exists(tokenKey)
      .then((exists) => {
        if (exists)
          redis
            .get(tokenKey)
            .then((reply) => resolve(JSON.parse(reply)))
            .catch((e) => reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.stack),
              isPublic: false,
            })))
        else
          getTokens()
            .then((token) => resolve(token))
            .catch((e) => reject(e))
      })
  })
}
