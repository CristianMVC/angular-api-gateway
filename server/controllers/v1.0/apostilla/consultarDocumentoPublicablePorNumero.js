import xmlParser from 'xml2json'
import request from './request'
import APIError from '../../../helpers/APIError'
import moment from 'moment'


/*
Params:
<assignee>?</assignee>
<numeroDocumento>?</numeroDocumento>
<numeroEspecial>?</numeroEspecial>
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
    numero_especial = '',
    sistema_origen = '',
    assignee = '',
  } = params

  return new Promise((resolve, reject) => {
    // set Request XML
    const body = `<soapenv:Envelope
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:ar="http://ar.gob.gcaba.gedo.satra.services.external.consulta/"
                  >
                    <soapenv:Header/>
                    <soapenv:Body>
                      <ar:consultarDocumentoPublicablePorNumero>
                          <request>
                            <usuarioConsulta>${usuario_consulta}</usuarioConsulta>
                            <numeroDocumento>${numero_documento}</numeroDocumento>
                            <numeroEspecial>${numero_especial}</numeroEspecial>
                            <sistemaOrigen>${sistema_origen}</sistemaOrigen>
                            <assignee>${assignee}</assignee>
                          </request>
                      </ar:consultarDocumentoPublicablePorNumero>
                    </soapenv:Body>
                  </soapenv:Envelope>`

    // return resolve(body)
    request.post({ url, body, })
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:|xmlns:(soap|ns.)=".{0,}"|ns.:/g, ''))
                            .Envelope
                            .Body
                            .consultarDocumentoPublicablePorNumeroResponse
                            .return

          _data['fechaCreacion'] = moment.utc(_data['fechaCreacion'])

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
