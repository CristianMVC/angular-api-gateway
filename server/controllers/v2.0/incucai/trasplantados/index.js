import APIResponses from '../../../../helpers/APIStandarResponses'
import APIError from '../../../../helpers/APIError'
import {
  getCredentials        as getCredentialsRequest,
  getCredential         as getCredentialRequest,
  getExpiredCredentials as getExpiredCredentialsRequest,
} from './request'

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCredentials = (req, res, next) => {
  const { userData, } = req
  const { dni_number: dniNumber, gender, } = userData

  getCredentialsRequest(dniNumber, gender)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      const apiError = APIError(err)

      next(apiError)
    })
}


/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCredential = (req, res, next) => {
  const { params, } = req
  const { credential, } = params

  getCredentialRequest(credential)
    .then((data) => res.json(data))
    .catch((err) => {
      const apiError = APIError(err)

      next(apiError)
    })
}


/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getExpiredCredentials = (req, res, next) => {
  const { query, } = req
  const { fecha: date, } = query

  getExpiredCredentialsRequest(date)
    .then((data) => {
      res.json(APIResponses.list(0, 0, data))
    })
    .catch((err) => {
      const apiError = APIError(err)

      next(apiError)
    })
}


export default {
  getCredentials,
  getCredential,
  getExpiredCredentials,
}
