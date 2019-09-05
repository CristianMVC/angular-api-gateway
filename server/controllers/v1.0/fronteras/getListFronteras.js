import request                  from 'superagent'
import { stringToFloat, }       from './utils'
import redis                    from '../../../helpers/Redis'
import logger                   from '../../../../config/winston'
import Promise                  from 'bluebird'
import Store                    from './store'

/**
 * Listado de pasos de GNA y PNA
 * @returns {Promise}
 */
export default function getListFronteras(origen, url) {
  logger.log('debug', 'Controller::fronteras::listFronteras:', origen)
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .timeout({ deadline: 15000, })
      .then((result) => {
        const responseData = result.body.results.map((dato) => {
          return {
            id: dato.id,
            nombre: dato.nombre,
            latitud: stringToFloat(dato.latitud),
            longitud: stringToFloat(dato.longitud),
            pais: dato.pais,
            destino: (dato.destino) ? dato.destino : null,
            provincia: dato.provincia,
            estado: dato.estado,
            origen: origen,
          }
        })
        redis.set(`cache-double:fronteras:${origen}`, JSON.stringify(responseData))
          .then((v) => {
            if (v)
              resolve(responseData)
            else {
              logger.error('ERROR: No se pudo guardar en cache, fronteras:' + origen)
              logger.error('Se retorna los datos de fronteras:' + origen)
              resolve(responseData)
            }
          })
          .catch((e) => {
            logger.error('ERROR: No se pudo guardar en cache, fronteras:' + origen)
            logger.error('Se retorna los datos de fronteras:' + origen)
            logger.error(e)
            resolve(responseData)
          })
      })
      .catch((e) => {
        logger.error('Controller::fronteras::listFronteras::RequestError:', origen)
        logger.error(e)
        Store(origen)
          .then((resp) => {
            resolve(resp)
          })
          .catch((e) => {
            logger.log('debug', 'Controller::fronteras::listFronteras::cacheError:', origen)
            logger.error(e)
            reject(e)
          })
      })
  })
}
