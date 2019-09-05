import redis from '../../../helpers/Redis'
import logger from '../../../../config/winston'
import Promise from 'bluebird'

/**
 * Busca si está cacheado en Redis el listado
 * @returns {Promise}
 */

export default function Store(key) {
  return new Promise((resolve, reject) => {
    redis.exists(`cache-double:fronteras:${key}`)
      .then((exists) => {
        if (exists) {
          logger.log('debug', 'Redis::exists')
          redis.get(`cache-double:fronteras:${key}`)
            .then((reply) => {
              logger.log('debug', 'Controller::fronteras::_getRedis::exists::resolve')
              resolve(JSON.parse(reply))
            })
            .catch((err) => {
              logger.error('Controller::fronteras::_getRedis::exists::reject')
              logger.error(err)
              reject(err)
            })
        } else {
          logger.log('debug', 'No hay datos cacheados')
          resolve([])
        }
      })
      .catch((e) => {
        logger.error('Redis::exists::Catch', e)
        resolve([])
      })
  })
}
