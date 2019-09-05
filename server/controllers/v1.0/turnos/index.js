import config from '../../../../config/env'
import logger from '../../../../config/winston'
import request from './request'
import { verifyToken, } from '../../../helpers/token'

/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */


function genericGet(req, res, next) {
  logger.log('debug', 'Controller::Turnos::get')
  let path = req.path
  if (path === '/')
      path = ''

const query = req.query
const headers = req.headers
const body = req.body
let url = ''

if (req.isFilas) {
 url = `${config.ws.filas.url}${path}`
}

if (req.isTurnos) {
 url = `${config.ws.turnos.url}${path}`
}

 logger.log('debug', url)
 logger.log('debug', headers)
  request
    .get({ url, headers, query, body, })
    .then((v) => res.json(v.body))
    .catch((e) => {
const { status, } = e.response
res.status(status).json(JSON.parse(e.response.text))
	})
}

/**
 * Post Element
 * @param req
 * @param res
 * @param next
 */
function genericPost(req, res, next) {
  logger.log('debug', 'Controller::Turnos::post')
  let path = req.path
  if (path === '/')
      path = ''

const query = req.query
const headers = req.headers
const body = req.body
logger.log('debug', req.user)

let url = ''

if (req.isFilas) {
 url = `${config.ws.filas.url}${path}`
}

if (req.isTurnos) {
 url = `${config.ws.turnos.url}${path}`
}

logger.log('debug', url)

  request
    .post({ url, headers, query, body, })
    .then((v) => res.json(v.body))
    .catch((e) => {
const { status, } = e.response
res.status(status).json(JSON.parse(e.response.text))
	})
}


/**
 * Delete Put
 * @param req
 * @param res
 * @param next
 */
function genericPut(req, res, next) {
  logger.log('debug', 'Controller::Turnos::put')
  let path = req.path
  if (path === '/')
      path = ''

const query = req.query
const headers = req.headers
const body = req.body

let url = ''

if (req.isFilas) {
 url = `${config.ws.filas.url}${path}`
}

if (req.isTurnos) {
 url = `${config.ws.turnos.url}${path}`
}


  request
    .put({ url, headers, query, body, })
    .then((v) => res.json(v.body))
    .catch((e) => {
const { status, } = e.response
res.status(status).json(JSON.parse(e.response.text))
logger.info('body:' + JSON.parse(e.response.text))
    })
}

/**
 * Delete Element
 * @param req
 * @param res
 * @param next
 */
function genericDelete(req, res, next) {
  logger.log('debug', 'Controller::Turnos::delete')
  let path = req.path
  if (path === '/')
      path = ''

const query = req.query
const headers = req.headers
const body = req.body

let url = ''

if (req.isFilas) {
 url = `${config.ws.filas.url}${path}`
}

if (req.isTurnos) {
 url = `${config.ws.turnos.url}${path}`
}

  logger.log('debug', url)

  request
    .remove({ url, headers, query, body, })
    .then((v) => res.json(v.body))
    .catch((e) => {
const { status, } = e.response
res.status(status).json(JSON.parse(e.response.text))
	})
}


export default {
  genericGet,
  genericPost,
  genericDelete,
  genericPut,
}
