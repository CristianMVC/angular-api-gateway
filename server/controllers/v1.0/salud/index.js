import Auth                         from './auth'
import APIError                     from '../../../helpers/APIError'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import { isEmpty, }                 from 'lodash'


/**
 * Index
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
function index(req, res, next) {
  logger.log('debug', 'Controller::interfaces-api::salud::index')
  const params = {
    path: req.path,
    query: req.query,
  }

  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::bPopulares::list')
      request
        .get(`${config.ws.interfaces.salud.url}${params.path}`)
        .set('Authorization', `Bearer ${token}`)
        .query(params.query)
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
    })
    .catch((e) => {
      logger.error('Controller::feriados::feriadosList::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


export default {
  index,
}
