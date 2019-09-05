import request                      from 'superagent'
import logger                       from '../../../../config/winston'
import config                       from '../../../../config/env'
import TlsReject                    from '../../../helpers/TlsReject'
import APIError                     from '../../../helpers/APIError'
import { getCertificado, }          from './request'


// todo: move to andis
/**
 * Consulta Padron CUD
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function consultarPadron(req, res, next) {
  logger.log('debug', 'Controller::cud::consultarPadron')
  TlsReject.set()
  request
    .get(`${config.ws.snr.cud.url}/${req.params.codbarras}`)
    .query({
      codbarras: req.params.codbarras,
    })
    .then((r) => {
      try {
        return res.json(r.body.beneficiario)
      } catch (e) {
        return next(APIError({
          status: 500,
          message: (e.message),
          devMessage: (e.stack),
        }))
      }
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.response.text) ? e.response.text : e.message,
    })))
}

function obtenerCertificado(req, res, next) {
  const { userData, query, } = req
  const { reduce_form: reduceForm = false, reduce_certs: reduceCerts = false, } = query
  const { dni_number: number, gender, username: idUser, } = userData

  getCertificado(number, gender, idUser, reduceForm, reduceCerts)
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      res.sendPgLog(APIError(e))
    })
}

export default {
  consultarPadron,
  obtenerCertificado,
}
