import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import _consulta_v0 from './consulta'
import _resources_v0 from './resources'
import _consulta from './vx/consulta'
import _resources from './vx/resources'
import { isEmpty, } from 'lodash'



/**
 * V0::Consulta
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
function consulta_v0(req, res, next) {
  logger.log('debug', 'Controller::infoleg::Consulta::v0')
  const params = {
    path: req.path,
    query: req.query,
  }
  _consulta_v0(params)
    .then((r) => {
      return res
        .set({ 'Content-Type': r['header']['content-type'], })
        .send(r.body)
        .end()
    })
    .catch((e) => {
      try {
        if (isEmpty(e.response.body))
          next(APIError({
            status: e.response.status,
            isPublic: true,
          }))
        else
          next(APIError({
            status: e.response.body.status,
            message: e.response.body.userMessage,
            devMessage: e.response.body.developerMessage,
            errorCode: e.response.body.errorCode,
            moreInfo: e.response.body.moreInfo,
            isPublic: true,
          }))
      } catch (e) {
        next(APIError({
          status: 500,
          devMessage: e.message,
        }))
      }
    })
}


/**
 * V0::Resources
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
function resources_v0(req, res, next) {
  logger.log('debug', 'Controller::infoleg::Resources::v1')
  const params = {
    path: req.path,
    query: req.query,
  }
  _resources_v0(params)
    .then((r) => {
      return res
        .set({ 'Content-Type': r['header']['content-type'], })
        .send(r.body)
        .end()
    })
    .catch((e) => {
      try {
        if (isEmpty(e.response.body))
          next(APIError({
            status: e.response.status,
            isPublic: true,
          }))
        else
          next(APIError({
            status: e.response.body.status,
            message: e.response.body.userMessage,
            devMessage: e.response.body.developerMessage,
            errorCode: e.response.body.errorCode,
            moreInfo: e.response.body.moreInfo,
            isPublic: true,
          }))
      } catch (e) {
        next(APIError({
          status: 500,
          devMessage: e.message,
        }))
      }
    })
}




/**
 * Consulta
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
function consulta(req, res, next) {
  logger.log('debug', 'Controller::infoleg::Consulta::v1')
  const params = {
    path: req.path,
    query: req.query,
  }
  _consulta(params)
    .then((r) => {
      return res
        .set({ 'Content-Type': r['header']['content-type'], })
        .send(r.body)
        .end()
    })
    .catch((e) => {
      try {
        if (isEmpty(e.response.body))
          next(APIError({
            status: e.response.status,
            isPublic: true,
          }))
        else
          next(APIError({
            status: e.response.body.status,
            message: e.response.body.userMessage,
            devMessage: e.response.body.developerMessage,
            errorCode: e.response.body.errorCode,
            moreInfo: e.response.body.moreInfo,
            isPublic: true,
          }))
      } catch (e) {
        next(APIError({
          status: 500,
          devMessage: e.message,
        }))
      }
    })
}


/**
 * Resources
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
function resources(req, res, next) {
  logger.log('debug', 'Controller::infoleg::Resources::v1')
  const params = {
    path: req.path,
    query: req.query,
  }

  logger.log('debug', 'params::%j', params)

  _resources(params)
    .then((r) => {
      return res
        .set({ 'Content-Type': r['header']['content-type'], })
        .send(r.body)
        .end()
    })
    .catch((e) => {
      try {
        if (isEmpty(e.response.body))
          next(APIError({
            status: e.response.status,
            isPublic: true,
          }))
        else
          next(APIError({
            status: e.response.body.status,
            message: e.response.body.userMessage,
            devMessage: e.response.body.developerMessage,
            errorCode: e.response.body.errorCode,
            moreInfo: e.response.body.moreInfo,
            isPublic: true,
          }))
      } catch (e) {
        next(APIError({
          status: 500,
          devMessage: e.message,
        }))
      }
    })
}



export default {
  consulta_v0,
  resources_v0,
  consulta,
  resources,
}
