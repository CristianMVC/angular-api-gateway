import jwt from 'jsonwebtoken'
import fs from 'fs'
import config from '../../../../../config/env/index'
import logger from '../../../../../config/winston'
import redis from '../../../../helpers/Redis'
import APIError from '../../../../helpers/APIError'


const data = {
  token: '',
}

const tokenKey = 'Auth:Token:GDE:TAD:Token'
const tokenKeyExpire = '3600'

/**
 * Generate Kong Token JWT
 * @returns {*}
 * @private
 */
function getKongTokenJWT() {
  logger.log('debug', 'TAD::ControllerAuth::getTokenKong')
  return new Promise((resolve, reject) => {
    try {
      logger.log('debug', 'TAD::ControllerAuth::getTokenKong::Promise::GenerateJWT')
      const key = fs.readFileSync(`${config.ca.dir}/gdeKong-privateKey.pem`)
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

      data.token = `Bearer ${accessToken}`
      return resolve(data.token)
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
 * Get New Tokens
 */
function getNewTokens() {
  return new Promise((resolve, reject) => {
    getKongTokenJWT()
      .then(() => {
        redis
          .set(tokenKey, JSON.stringify(data))
          .then((expire) => redis.expire(tokenKey, tokenKeyExpire)
            .then((err) => {
              if (err)
                return resolve(data)
              else
                return reject(APIError({
                  status: 500,
                  message: 'Error::SaveToken:Expire',
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
      })
      .catch((e) => reject(e))
  })
}


/**
 * getTokens
 */
export default function () {
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
          getNewTokens()
            .then((token) => resolve(token))
            .catch((e) => reject(e))
      })
  })
}
