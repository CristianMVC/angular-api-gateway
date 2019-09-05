import { isObject, } from 'lodash'
import request from 'superagent'

import { logPgError, pgRequest, pgResponse, } from '../../../models/pg'
import APIError from '../../../helpers/APIError'
import config from '../../../../config/env'
import logger from '../../../../config/winston'
import TlsReject from '../../../helpers/TlsReject'


/**
 * licenciaDigitalDemo
 * @namespace options
 * @property {string} url
 * @property {object} body
 * @property {object} query
 * @property {boolean} jsonRequest
 */
function get(options, idUser, entity) {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Model::Request')

    const {
      url = '',
      body = {},
      query = {},
      jsonRequest = true,
    } = options

    TlsReject.set()

    const reqObject = new pgRequest({}, query, JSON.stringify(body), 'GET', url) // data para PG log

    request
      .get(url)
      .timeout({ deadline: 20000, })
      .set('Authorization', config.ws.seguridadVial.licenciaDigital.headers.Authorization)
      .send(body)
      .query(query)
      .then((d) => {
        if (jsonRequest && isObject(d.body))
          return resolve(d.body)
        else if (!jsonRequest)
          return resolve(d.text)
        else
          return reject(APIError({
            status: 500,
            message: 'Error: extWS, invalid response',
            devMessage: `request: status ${d.status}; body ${d.text}`,
          }))
      })
      .catch((e) => {
        let status, message, devMessage
        if (e.timeout) {
          status = 503
          message = 'error: timeout; code: ECONNABORTED'
          devMessage = (e.stack)
        } else if (e.status === 401) {
          status = 503
          message = 'Error: extWS, falló la autenticación con el servicio externo.'
          devMessage = `Error: extWS; Stack: ${e.stack}`
        } else {
          status = (e.status) ? e.status : 500
          message = `Error: extWS, ${e.message}`
          devMessage = `Error: extWS; Stack: ${e.stack}`
        }

        // Por definición, Seguridad Vial envia el mensaje de Error como texto plano
        // y debe ser devuelto como el mensaje del error
        message = (e.response.text)

        reject(APIError({
          status: (status),
          message: (message),
          devMessage: (devMessage),
        }))

        //Log de error en Postgres
        const { header, text, } = e.response

        const resObject =  new pgResponse(status, header, text)

        logPgError(idUser, entity, reqObject, resObject)
      })
  })
}

export default {
  get,
}
