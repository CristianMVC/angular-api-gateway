import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import _consulta from './consulta'
import _auth from './auth'
import _resources from './resources'
import { isEmpty, } from 'lodash'


/**
 * Consulta
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */

function consultar(req, res, next) {
  _auth()
    .then((token) => {
      logger.log('debug', 'Controller::compre-social::_consulta')
      const params = {
        path: req.path,
        query: req.query,
        token: token,
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
              return next(APIError({
                status: e.response.status,
                isPublic: true,
              }))
            else
              return next(APIError({
                status: e.response.body.status,
                message: e.response.body.userMessage,
                devMessage: e.response.body.developerMessage,
                errorCode: e.response.body.errorCode,
                moreInfo: e.response.body.moreInfo,
                isPublic: true,
              }))
          } catch (e) {
            return next(APIError({
              status: 500,
              devMessage: e.message,
            }))
          }
        })
    })
    .catch((e) => next(APIError({
      status: 500,
      devMessage: e.message,
    })))
}

function resources(req, res, next) {
  _auth()
    .then((token) => {
      logger.log('debug', 'Controller::compre-social::_resources')
      const params = {
        path: req.path,
        params: req.query,
        token: token,
      }
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
              return next(APIError({
                status: e.response.status,
                isPublic: true,
              }))
            else
              return next(e)
          } catch (e) {
            return next(APIError({
              status: 500,
              devMessage: e.message,
            }))
          }
        })
    })
    .catch((e) => next(APIError({
      status: 500,
      devMessage: e.message,
    })))
}

export default {
  consultar,
  resources,
}
