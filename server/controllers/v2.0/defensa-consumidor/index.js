import APIResponse                                      from '../../../helpers/APIStandarResponses'
import APIError                                         from '../../../helpers/APIError'
import {
  getProviderByCuit as getProviderByCuitRequest,
  getProvidersByQuery as getProvidersByQueryRequest,
  getIssuesByClientDni as getIssuesByClientDniRequest,
  getIssueById as getIssueByIdRequest,
  saveIssue as saveIssueRequest,
}                                                       from './request'
import logger                                               from '../../../../config/winston'

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getProviderByCuit = (req, res, next) => {
  const { cuit: providerCuit, } = req.params

  getProviderByCuitRequest(providerCuit)
    .then((provider) => {
      res.json(provider)
      return
    })
    .catch((e) => {
      const apiError = new APIError(e)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getProvidersByQuery = (req, res, next) => {
  const { query, } = req.query

  getProvidersByQueryRequest(query)
    .then((providers) => {
      res.json(providers)
      return
    })
    .catch((e) => {
      const apiError = new APIError(e)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getIssuesByClientDni = (req, res, next) => {
  const { userData, } = req
  const { cuil, } = userData

  getIssuesByClientDniRequest(cuil)
    .then((issues) => {
      res.json(APIResponse.list(0, 0, issues))
      return
    })
    .catch((e) => {
      const apiError = new APIError(e)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getIssueById = (req, res, next) => {
  const { id: issueId, } = req.params

  getIssueByIdRequest(issueId)
    .then((issue) => {
      res.json(issue)
      return
    })
    .catch((e) => {
      const apiError = new APIError(e)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const saveIssue = (req, res, next) => {
  const { userData, } = req

  const data = req.body
  data.user_id_c = userData.idUser

  saveIssueRequest(data)
    .then((issue) => {
      res.json(issue)
      return
    })
    .catch((e) => {
      const apiError = new APIError(e)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const sendIssueAndFiles = (req, res, next) => {
  const handleFiles = function (err, data) {
    data.toString('base64')
  }
}


export default {
  getProviderByCuit,
  getProvidersByQuery,
  getIssuesByClientDni,
  getIssueById,
  saveIssue,
}