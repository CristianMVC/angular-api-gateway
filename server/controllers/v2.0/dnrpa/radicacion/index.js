import request      from 'superagent'
import xmlParser    from 'xml2json'
import fs           from 'fs'
import config       from '../../../../../config/env'
import TlsReject    from '../../../../helpers/TlsReject'
import json         from './links.json'

const { ca, ws, } = config

const key = fs.readFileSync(`${ca.dir}/dnrpa-privateKey.pem`)
const cert = fs.readFileSync(`${ca.dir}/dnrpa-publicCert.pem`)

const getRadication = (domain) => {

  const getRadicationPromise = new Promise((resolve, reject) => {
    const reqParams = `<x:Envelope
                        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:wsr="http://ar.gov.dnrpa.ws/WS-RadicacionPorDominio/">
                        <x:Header/>
                        <x:Body>
                            <wsr:consultaRadicacion>
                            <wsr:dominio>${domain}</wsr:dominio>
                            </wsr:consultaRadicacion>
                        </x:Body>
                        </x:Envelope>`

    TlsReject.set()

    request
      .post(ws.dnrpa.radicacionDominio.url)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(reqParams)
      .then(({ text, }) => {
        try {
          const rows = json.links

          const parsedText = text.replace(/<([^\/>]+)\/>/g, '<$1> <\/$1>')

          const xmlJsoned = xmlParser.toJson(parsedText).replace(/SOAP-ENV:|ns1:/g, '')

          const resultData = JSON.parse(xmlJsoned)

          const response = resultData.Envelope.Body.consultaRadicacionResponse.respuesta.datosRadicacion.radicacion

          if (!response) {
            reject(new Error('Empty Radication'))
            return
          }

          const item = rows.find((element) => element.provincia.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() == response.provincia)
          response.link = item

          resolve(response)
        } catch (e) {
          reject(e)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

  return getRadicationPromise
}

export {
  getRadication,
}