import xmlParser from 'xml2json'
import request from './request'
import APIError from '../../../helpers/APIError'

/*
Params:
  <numeroDocumento>?</numeroDocumento>
  <sistemaOrigen>?</sistemaOrigen>
  <usuarioConsulta>?</usuarioConsulta>
*/

/**
 * @param {*} params - Params
 */
export default function (params) {
  const {
    url,
    usuario_consulta = '',
    numero_documento = '',
    sistema_origen = '',
  } = params

  return new Promise((resolve, reject) => {
    // set Request XML
    const body = `<soapenv:Envelope
                        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:ar="http://ar.gob.gcaba.gedo.satra.services.external.consulta/"
                      >
                      <soapenv:Header/>
                      <soapenv:Body>
                        <ar:consultarDocumentoEnExpedientes>
                            <request>
                              <numeroDocumento>${numero_documento}</numeroDocumento>
                              <usuarioConsulta>${usuario_consulta}</usuarioConsulta>
                              <sistemaOrigen>${sistema_origen}</sistemaOrigen>
                            </request>
                        </ar:consultarDocumentoEnExpedientes>
                      </soapenv:Body>
                  </soapenv:Envelope>`

    // return resolve(body)
    request.post({ url, body, })
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:|xmlns:(soap|ns.)=".{0,}"|ns.:/g, ''))
                            .Envelope
                            .Body
                            .consultarDocumentoEnExpedientesResponse
                            .return

          return resolve(_data)
        } catch (e) {
          reject(APIError({
            status: 500,
            message: `Exception Response Data Error: ${e.message}`,
            stack: e.stack,
          }))
        }
      })
      .catch((e) => reject(e))
  })
}
