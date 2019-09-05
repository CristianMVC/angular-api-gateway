import logger from '../../../../config/winston'
import config from '../../../../config/env'

import _consultarDocumentoDetalle from './consultarDocumentoDetalle'
import _consultarDocumentoEnExpedientes from './consultarDocumentoEnExpedientes'
import _consultarDocumentoPdf from './consultarDocumentoPdf'
import _consultarDocumentoPorNumero from './consultarDocumentoPorNumero'
import _consultarDocumentoPublicablePorNumero from './consultarDocumentoPublicablePorNumero'

/** -------------------------------------
 *  consultarDocumentoDetalle
 *  consultarDocumentoEnExpedientes
 *  consultarDocumentoPdf
 *  consultarDocumentoPorNumero
 *  consultarDocumentoPublicablePorNumero
 ** ------------------------------------*/

/**
 * consultarDocumentoDetalle
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
function consultarDocumentoDetalle(req, res, next) {
  logger.log('debug', 'Controller::consultarDocumentoDetalle')

  const url = config.ws.apostilla.index.url

  const {
    usuario_consulta,
    numero_documento,
    numero_especial,
  } = req.query

  _consultarDocumentoDetalle({ url, usuario_consulta, numero_documento, numero_especial, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * consultarDocumentoEnExpedientes
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
function consultarDocumentoEnExpedientes(req, res, next) {
  logger.log('debug', 'Controller::consultarDocumentoEnExpedientes')

  const url = config.ws.apostilla.index.url

  const {
    usuario_consulta,
    numero_documento,
    sistema_origen,
  } = req.query

  _consultarDocumentoEnExpedientes({ url, usuario_consulta, numero_documento, sistema_origen, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * consultarDocumentoPdf
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
function consultarDocumentoPdf(req, res, next) {
  logger.log('debug', 'Controller::consultarDocumentoPdf')

  const url = config.ws.apostilla.index.url

  const {
    usuario_consulta,
    numero_documento,
    sistema_origen,
    numero_especial,
    assignee,
  } = req.query

  _consultarDocumentoPdf({ url, usuario_consulta, numero_documento, sistema_origen, numero_especial, assignee, })
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(e))
}


/**
 * consultarDocumentoPorNumero
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
function consultarDocumentoPorNumero(req, res, next) {
  logger.log('debug', 'Controller::consultarDocumentoPorNumero')

  const url = config.ws.apostilla.index.url

  const {
    usuario_consulta,
    numero_documento,
    sistema_origen,
    numero_especial,
    assignee,
  } = req.query

  _consultarDocumentoPorNumero({ url, usuario_consulta, numero_documento, sistema_origen, numero_especial, assignee, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


/**
 * consultarDocumentoPublicablePorNumero
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
function consultarDocumentoPublicablePorNumero(req, res, next) {
  logger.log('debug', 'Controller::consultarDocumentoPublicablePorNumero')

  const url = config.ws.apostilla.index.url

  const {
    usuario_consulta,
    numero_documento,
    sistema_origen,
    numero_especial,
    assignee,
  } = req.query

  _consultarDocumentoPublicablePorNumero({ url, usuario_consulta, numero_documento, sistema_origen, numero_especial, assignee, })
    .then((v) => res.json(v))
    .catch((e) => next(e))
}


export default {
  consultarDocumentoDetalle,
  consultarDocumentoEnExpedientes,
  consultarDocumentoPdf,
  consultarDocumentoPorNumero,
  consultarDocumentoPublicablePorNumero,
}
