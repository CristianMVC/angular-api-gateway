import request                                              from 'superagent'
import config                                               from '../../../../config/env'

const { url, } = config.ws2.idArgentina

/**
 *
 * @param {String} province_id
 */
const getDistrictsByProvince = (province_id) => {
  return request.get(`${url}districts_from_indec/?province=${province_id}`)
    .then(({ body, }) => {
      const { results, } = body

      return results.map((r) => ({ id: r.value, nombre: r.name, }))
    })
    .catch((e) => {
      throw e
    })
}


/**
 *
 * @param {String} province_id
 */
const getLocalitiesByProvince = (province_id) => {
  return request.get(`${url}localities_from_indec/?province=${province_id}`)
    .then(({ body, }) => {
      const { results, } = body

      return results.map((r) => ({ id: r.value, nombre: r.name, }))
    })
    .catch((e) => {
      throw e
    })
}


/**
 *
 * @param {String} district_id
 */
const getLocalitiesByDistrict = (district_id) => {
  return request.get(`${url}localities_from_indec/?district=${district_id}`)
    .then(({ body, }) => {
      const { results, } = body

      return results.map((r) => ({ id: r.value, nombre: r.name, }))
    })
    .catch((e) => {
      throw e
    })
}

export default {
  getDistrictsByProvince,
  getLocalitiesByProvince,
  getLocalitiesByDistrict,
}