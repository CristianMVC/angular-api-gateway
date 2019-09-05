// import APIResponse                                      from '../../../helpers/APIStandarResponses'
import APIError                                         from '../../../helpers/APIError'
// import logger                                           from '../../../../config/winston'
import provinces                                        from './provincias'
import {
  getDistrictsByProvince as getDistrictsByProvinceRequest,
  getLocalitiesByProvince as getLocalitiesByProvinceRequest,
  getLocalitiesByDistrict as getLocalitiesByDistrictRequest,
}                                                       from './request'

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getProvinces = (req, res, next) => {
  res.json(provinces)
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDistrictsByProvince = (req, res, next) => {
  const { province_id, } = req.params

  getDistrictsByProvinceRequest(province_id)
    .then((districts) => {
      res.json(districts)
      return
    })
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}


/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getLocalitiesByProvince = (req, res, next) => {
  const { province_id, } = req.params

  getLocalitiesByProvinceRequest(province_id)
    .then((localities) => {
      res.json(localities)
      return
    })
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}


/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getLocalitiesByDistrict = (req, res, next) => {
  const { district_id, } = req.params

  getLocalitiesByDistrictRequest(district_id)
    .then((localities) => {
      res.json(localities)
      return
    })
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}

export default {
  getProvinces,
  getDistrictsByProvince,
  getLocalitiesByProvince,
  getLocalitiesByDistrict,
}