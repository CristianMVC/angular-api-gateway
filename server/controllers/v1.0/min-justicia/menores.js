import logger from '../../../../config/winston'
import config from '../../../../config/env'
import APIError from '../../../helpers/APIError'
import request from './request'


/**
 * getList Menores
 * @param req - Reques
 * @param res - Response
 * @param next - Middleware
 */
function getList(req, res, next) {
  logger.log('debug', 'Controllers::PersonasMenoresExtraviadas:GetList')

  const url = `${config.ws.minJusticia.personasMenoresExtraviadas.url}/menores`
  const { query, } = req

  request({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      errorCode: (e.errorCode),
      moreInfo: (e.moreInfo),
    })))
}


/**
 * getElement Menores
 * @param req - Reques
 * @param res - Response
 * @param next - Middleware
 */
function getElement(req, res, next) {
  logger.log('debug', 'Controllers::PersonasMenoresExtraviadas:GetElement')
  const url = `${config.ws.minJusticia.personasMenoresExtraviadas.url}/menores/${req.params.id}`
  const { query, } = req

  request({ url, query, })
    .then((v) => res.json(v))
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      errorCode: (e.errorCode),
      moreInfo: (e.moreInfo),
    })))
}


export default {
  getList,
  getElement,
}
