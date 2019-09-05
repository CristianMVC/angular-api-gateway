import _                            from 'lodash'
import { readFileSync, }            from 'fs'
import APIResponse                  from '../../../helpers/APIStandarResponses'
import APIError                     from '../../../helpers/APIError'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import TlsReject                    from '../../../helpers/TlsReject'
import xmlParser                    from 'xml2json'

const key = readFileSync(`${config.ca.dir}/obsequios-privateKey.key`)
const cert = readFileSync(`${config.ca.dir}/obsequios-publicCert.crt`)

/**
 * _crearObjeto
 * @param data
 * @return {Object}
 * @private
 */
function _crearObjeto(data) {
  const doc = {}
  doc.numero = data.numero
  data.valoresFC.forEach((valor) => {
    const val = valor.split('|')
    doc[val[0]] = val[1]
  })
  return doc
}


/**
 * _consultarObsequiosViajes
 * @param params - Request Params
 * @private
 */
function _consultarObsequiosViajes(params) {
  return new Promise((resolve, reject) => {
    // Disable SSL Reject
    TlsReject.set()

    const reqParams = `<x:Envelope
                          xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:ext="http://external.services.rlm.gcaba.gob.ar/">
                        <x:Header/>
                        <x:Body>
                            <ext:listRegistroPublico>
                                <arg0>
                                    <filtro>${params.value}</filtro>
                                    <idTipoRegistro>${params.mid}</idTipoRegistro>
                                </arg0>
                            </ext:listRegistroPublico>
                        </x:Body>
                    </x:Envelope>`

    request
      .post(config.ws.obsequios.url)
      .cert(cert)
      .key(key)
      .send(reqParams)
      .then((result, err) => {
        if (err) {
          logger.error('Bad response request')
          reject({ status: 500, devMessage: err, })
        }
        try {
          const resultData =  JSON.parse(xmlParser.toJson(result.text)
            .replace(/soap:/g, 'soap_').replace(/ns2:/g, 'ns2_'))
            .soap_Envelope
            .soap_Body
            .ns2_listRegistroPublicoResponse
            .return
          if (resultData) {
            const docs = []
            if (_.isPlainObject(resultData)) {
              docs.push(_crearObjeto(resultData))
            } else {
              resultData.forEach((data) => {
                docs.push(_crearObjeto(data))
              })
            }
            if (params.limit == null) {
              resolve(docs)
            } else {
              resolve(docs.slice(parseInt(params.offset), parseInt(params.limit)))
            }
          } else {
            logger.info('Request ConsultarObsequios: Not Found')
            reject({ status: 404, devMessage: null, })
          }
        } catch (e) {
          logger.error('Request ConsultarObsequios', e)
          reject({ status: 500, devMessage: e, })
        }
      })
      .catch((e)=>{
        logger.info('Request ConsultarObsequios: Request Error')
        reject({ status: e.status, devMessage: e.message, })
      })
  })
}


/**
 * consultarViajes
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function consultarViajes(req, res, next) {
  const params = {
    value: (req.query.value) ? req.query.value : '',
    offset: (req.query.offset) ? req.query.offset : 0,
    limit: (req.query.limit) ? req.query.limit : null,
    mid: 11916,
  }

  _consultarObsequiosViajes(params)
    .then((list) => {
      res.json(APIResponse.list(params.offset, params.limit, list))
    })
    .catch((e) => {
      next(APIError({ status: e.status, devMessage: e.devMessage, }))
    })
}


/**
 * consultarObsequios
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function consultarObsequios(req, res, next) {
  const params = {
    value: (req.query.value) ? req.query.value : '',
    offset: (req.query.offset) ? req.query.offset : 0,
    limit: (req.query.limit) ? req.query.limit : null,
    mid: 11716,
  }

  _consultarObsequiosViajes(params)
    .then((list) => {
      res.json(APIResponse.list(params.offset, params.limit, list))
    })
    .catch((e) => {
      next(APIError({ status: e.status, devMessage: e.devMessage, }))
    })
}


export default {
  consultarObsequios,
  consultarViajes,
}