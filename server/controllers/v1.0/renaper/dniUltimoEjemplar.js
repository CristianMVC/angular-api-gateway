import { camelCase, mapKeys, } from 'lodash'
import APIError from '../../../helpers/APIError'
// import charset from 'superagent-charset'
import config from '../../../../config/env'
import fs from 'fs'
import logger from '../../../../config/winston'
import Promise from 'bluebird'
import request from 'superagent'
import TlsReject from '../../../helpers/TlsReject'
import xmlParser from 'xml2json'

const key = fs.readFileSync(`${config.ca.dir}/renaper-privateKey.pem`)
const cert = fs.readFileSync(`${config.ca.dir}/renaper-publicCert.pem`)

/**
 * Mod dniUltimoEjemplar
 * @param params
 */
export default function dniUltimoEjemplar(params) {
  return new Promise((resolve, reject) => {
    // logger.log('debug', 'Controllers::Renaper::ModDniUltimoEjemplar')

    const {
      dni = '',
      sexo = '',
    } = params

    const reqData = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:miniteriorwsdl">
                        <soapenv:Header/>
                        <soapenv:Body>
                          <urn:obtenerUltimoEjemplar soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                            <DatosEntrada xsi:type="urn:DatosEntrada" xmlns:urn="urn:mininteriorwsdl">
                              <dni xsi:type="xsd:int">${dni}</dni>
                              <sexo xsi:type="xsd:string">${sexo}</sexo>
                            </DatosEntrada>
                          </urn:obtenerUltimoEjemplar>
                        </soapenv:Body>
                      </soapenv:Envelope>`



    TlsReject.set()

    // charset(request)

    request
      .post('https://renaperdatosc.idear.gov.ar:8446/DATOSC.php')
      .key(key)
      .cert(cert)
      // .charset('ISO-8859-1')
      .set('Content-Type', 'text/xml;charset=ISO-8859-1')
      .set('SOAPAction', '"urn:mininteriorwsdl#obtenerUltimoEjemplar"')
      .set('host', 'renaperdatosc.idear.gov.ar:8446')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .timeout(10000)
      .send(reqData)
      .then((d) => {
        try {
          let result = d.text.replace(/SOAP-ENV:|ns1:|xsi:.+?=".+?"|xmlns:.+?=".+?"/g, '')

          // Null Values
          result = result.replace(/<([^\/>]+)\/>/g, '<$1> <\/$1>')
          result = result.replace(/<(.+?)><\/(.+?)>/g, '<$1> <\/$2>')

          // XML to JSON
          result = xmlParser.toJson(result)
          result = JSON.parse(result)
          result = result['Envelope']['Body']['obtenerUltimoEjemplarResponse']['DatosSalida']
          result = mapKeys(result, (value, key) => camelCase(key))

          // Errors
          const nroError = Number(result['nroError'])

          if (nroError === 0 || nroError === 99)
            return resolve(result)

          if (nroError === 2 || nroError === 4)
            return reject({
              status: 404,
              message: result['descripcionError'],
              errorCode: result['nroError'],
            })

          return reject({
            status: 500,
            message: result['descripcionError'],
            errorCode: result['nroError'],
          })
        } catch (e) {
          return reject({
            status: 500,
            message: (e.message),
            devMessage: (e.stack),
          })
        }
      })
      .catch((e) => {
        if (e.timeout) {
          const apiError = {
            status: 503,
            message: 'Error en el servicio externo: Tiempo de espera Agotado',
            devMessage: e.message,
          }
          reject(apiError)
          return
        }
        reject({
          status: (e.status),
          message: (e.message),
          devMessage: (e.response.text),
        })
    })
  })
}
