import jwt from 'jsonwebtoken'
import fs from 'fs'
import config from '../../../../../config/env/index'
import logger from '../../../../../config/winston'
import redis from '../../../../helpers/Redis'
import APIError from '../../../../helpers/APIError'


const data = {
  token: '',
}

const tokenKey = 'Auth:Token:GDE:TAD:Token:User'
const tokenKeyExpire = '3600'

/**
 * Generate User Token JWT
 * @returns {*}
 * @private
 */
function getUserTokenJWT(userTokenKey) {
  logger.log('debug', 'TAD::ControllerAuth::getTokenTAD')
  return new Promise((resolve, reject) => {
    try {
      logger.log('debug', 'TAD::ControllerAuth::getTokenTAD::Promise::GenerateJWT')
      const key = fs.readFileSync(`${config.ca.dir}/tad-privateKey.pem`)
      const accessToken = jwt.sign(
        {
          iss: userTokenKey,
        },
        key,
        {
          algorithm: 'RS256',
          expiresIn: tokenKeyExpire,
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
function getNewTokens(userTokenKey) {
  return new Promise((resolve, reject) => {
    getUserTokenJWT(userTokenKey)
      .then(() => {
        redis
          .set(userTokenKey, JSON.stringify(data))
          .then((expire) => redis.expire(userTokenKey, tokenKeyExpire)
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
export default function (user) {
  const userTokenKey = `${tokenKey}:${user}`
  return new Promise((resolve, reject) => {
    redis
      .exists(userTokenKey)
      .then((exists) => {
        if (exists)
          redis
            .get(userTokenKey)
            .then((reply) => resolve(JSON.parse(reply)))
            .catch((e) => reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.stack),
              isPublic: false,
            })))
        else
          getNewTokens(userTokenKey)
            .then((token) => resolve(token))
            .catch((e) => reject(e))
      })
  })
}
