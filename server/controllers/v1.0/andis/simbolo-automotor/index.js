import APIResponse from '../../../../helpers/APIStandarResponses'
import config from '../../../../../config/env'
import logger from '../../../../../config/winston'
import APIError from '../../../../helpers/APIError'
import request from './request'


/**
 * getBeneficiario
 * @param req
 * @param res
 * @param next
 */
function getBeneficiario(req, res, next) {
  logger.log('debug', 'Controller::getBeneficiario')
  const query = {}
  query.type = req.query.tipo_documento
  query.num = req.query.nro_documento
  query.renderQr = req.query.render_qr

  const url = `${config.ws.andis.simboloAutomotor.url}/beneficiario`

  request
    .get({ url, query, })
    .then((v) => {
      const d = v.beneficiario
      if (d)
        return res.json(d)
      else
        throw APIError({
          status: 503,
          message: 'ExtError: La estructura de Datos no es correcta',
        })
    })
    .catch((e) => next(e))
}


/**
 * getQr
 * @param req
 * @param res
 * @param next
 */
function getQr(req, res, next) {
  logger.log('debug', 'Controller::getQr')
  const query = {}
  query.type = req.query.tipo_documento
  query.num = req.query.nro_documento
  query.renderQr = req.query.render_qr

  const url = `${config.ws.andis.simboloAutomotor.url}/qr`

  request
    .getBinary({ url, query, })
    .then((v) => {
      return res
        .set({ 'Content-Type': v['header']['content-type'], })
        .send(v.body)
        .end()
    })
    .catch((e) => next(e))
}


/**
 * getTipoDocumento
 * @param req
 * @param res
 * @param next
 */
function getTiposDocumentos(req, res, next) {
  const l = [
    { id: 1, name: 'DNI', gender: 'F', description: 'DNI femenino', },
    { id: 2, name: 'DNI', gender: 'M', description: 'DNI masculino', },
    { id: 3, name: 'LC', gender: null, description: 'Libreta Civica', },
    { id: 4, name: 'LE', gender: null, description: 'Libreta de Enrolamiento', },
    { id: 75, name: 'CIE', gender: null, description: 'Cedula de Identidad del Exterior', },
    { id: 99, name: 'PASS', gender: null, description: 'Pasaporte', },
  ]

  return res.json(APIResponse.list(0, 0, l))
}


export default {
  getBeneficiario,
  getQr,
  getTiposDocumentos,
}
