import request from 'superagent'
import logger from '../../../../config/winston'
import config from '../../../../config/env'
import APIError from '../../../helpers/APIError'
import Auth from './auth'
import TlsReject from '../../../helpers/TlsReject'
import _6pKanxuYicW70JSMHP0Y from './_6pKanxuYicW70JSMHP0Y'
import _iV5Ec0jr3Qm7TizGoUDU from './_iV5Ec0jr3Qm7TizGoUDU'
import _CUWPZUMBmscDV5I3tCfO from './_CUWPZUMBmscDV5I3tCfO'
import _31uUrw6jJerXhfZuEs5m from './_31uUrw6jJerXhfZuEs5m'
import _PC8gb5ALz5f3f5MZU0Jj from './_PC8gb5ALz5f3f5MZU0Jj'
import _mmmNaKNYal6PoZgdfBRR from './_mmmNaKNYal6PoZgdfBRR'
import _5APmBlCcMiZKJg86Xc2p from './_5APmBlCcMiZKJg86Xc2p'
import _WUlNXKDVQbOriTaCPCCI from './_WUlNXKDVQbOriTaCPCCI'
import _3w8jhYntPCrTC0nom3mV from './_3w8jhYntPCrTC0nom3mV'


function listPages(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.page_es.url : config.ws.g20.page.url
  logger.log('debug', 'Controller::g20::listPages')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::listPages::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (params.limit == undefined) {
        params.limit = 50
      }

      TlsReject.set()
      request
        .get(endpoint)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::listPages::RequestError')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::listPages::error')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


function listEventos(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.eventos_es.url : config.ws.g20.eventos.url
  logger.log('debug', 'Controller::g20::listEventos')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::listEventos::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (params.limit == undefined) {
        params.limit = 200
      }
      TlsReject.set()
      request
        .get(endpoint)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::listEventos::error')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::listEventos::tokenError')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


function listNoticias(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.noticias_es.url : config.ws.g20.noticias.url
  logger.log('debug', 'Controller::g20::listNoticias')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::listNoticias::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (req.query.featured) {
        params.filters = {
          promote: (req.query.featured === 'true') ? 1 : 0,
        }
      }
      if (params.limit == undefined) {
        params.limit = 50
      }
      TlsReject.set()
      request
        .get(endpoint)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::listNoticias::error')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::listNoticias::tokenError')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


function listProvincias(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.provincias_es.url : config.ws.g20.provincias.url
  logger.log('debug', 'Controller::g20::listProvincias')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::listProvincias::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (params.limit == undefined) {
        params.limit = 50
      }
      TlsReject.set()
      request
        .get(endpoint)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::listProvincias::error')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::listProvincias::tokenError')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


function showJSON(req, res, next) {
  const qr_code = String(req.params.qr_code)

  if (qr_code === '6pKanxuYicW70JSMHP0Y')
    return res.json(_6pKanxuYicW70JSMHP0Y)
  else if (qr_code === 'iV5Ec0jr3Qm7TizGoUDU')
    return res.json(_iV5Ec0jr3Qm7TizGoUDU)
  else if (qr_code === 'CUWPZUMBmscDV5I3tCfO')
    return res.json(_CUWPZUMBmscDV5I3tCfO)
  else if (qr_code === '31uUrw6jJerXhfZuEs5m')
    return res.json(_31uUrw6jJerXhfZuEs5m)
  else if (qr_code === 'PC8gb5ALz5f3f5MZU0Jj')
    return res.json(_PC8gb5ALz5f3f5MZU0Jj)
  else if (qr_code === 'mmmNaKNYal6PoZgdfBRR')
    return res.json(_mmmNaKNYal6PoZgdfBRR)
  else if (qr_code === '5APmBlCcMiZKJg86Xc2p')
    return res.json(_5APmBlCcMiZKJg86Xc2p)
  else if (qr_code === 'WUlNXKDVQbOriTaCPCCI')
    return res.json(_WUlNXKDVQbOriTaCPCCI)
  else if (qr_code === '3w8jhYntPCrTC0nom3mV')
    return res.json(_3w8jhYntPCrTC0nom3mV)
  else
    return next(APIError({ status: 404, }))
}


function showEventQR(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.eventos_es.url : config.ws.g20.eventos.url
  logger.log('debug', 'Controller::g20::showEventQR')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::showEventQR::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (params.limit == undefined) {
        params.limit = 50
      }
      TlsReject.set()
      request
        .get(`${endpoint}/${req.params.type}/${req.params.qr_code}`)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::showEventQR::error')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::showEventQR::tokenError')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


function listWorkstreams(req, res, next) {
  const endpoint = (req.query.lang && req.query.lang == 'es') ? config.ws.g20.workstreams_es.url : config.ws.g20.workstreams.url
  logger.log('debug', 'Controller::g20::listWorkstreams')
  Auth()
    .then((token) => {
      logger.log('debug', 'Controller::g20::listWorkstreams::token')
      const params = {
        limit: req.query.limit,
        offset: req.query.offset,
        fields: req.query.fields,
      }
      if (params.limit == undefined) {
        params.limit = 50
      }
      TlsReject.set()
      request
        .get(endpoint)
        .set('Authorization', token)
        .query(params)
        .then((result) => {
          res.json(result.body)
        })
        .catch((e) => {
          logger.log('debug', 'Controller::g20::listWorkstreams::error')
          return next(APIError({
            status: (e.status),
            message: (e.message),
            devMessage: (e.stack),
          }))
        })
    })
    .catch((e) => {
      logger.log('debug', 'Controller::g20::listWorkstreams::tokenError')
      return next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.stack),
      }))
    })
}


export default {
  listPages,
  listEventos,
  listNoticias,
  listProvincias,
  showJSON,
  showEventQR,
  listWorkstreams,
}
