import { keys, } from 'lodash'
import fs from 'fs'
import request from 'superagent'
import xmlParser from 'xml2json'
import config from '../../../../config/env/index'
import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import TlsReject from '../../../helpers/TlsReject'


/**
 * xmlReqConsultarRadicacionDominio
 * @param opt
 */
function consultarRadicacionDominio(opt) {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Controller::DNRPA::consultarRadicacionDominio')

    const reqParams = `<x:Envelope 
                        xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" 
                        xmlns:wsr="http://ar.gov.dnrpa.ws/WS-RadicacionPorDominio/">
                      <x:Header/>
                        <x:Body>
                          <wsr:consultaRadicacion>
                            <wsr:dominio>${opt.dominio}</wsr:dominio>
                          </wsr:consultaRadicacion>
                        </x:Body>
                      </x:Envelope>`

    TlsReject.set()
    const
      key = fs.readFileSync(`${config.ca.dir}/dnrpa-privateKey.pem`),
      cert = fs.readFileSync(`${config.ca.dir}/dnrpa-publicCert.pem`)

    request
      .post(config.ws.dnrpa.radicacionDominio.url)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(reqParams)
      .then((result) => {
        try {
          const resultData = JSON.parse(
            xmlParser.toJson(
              result.text.replace(/<([^\/>]+)\/>/g, '<$1> <\/$1>')
            ).replace(/SOAP-ENV:|ns1:/g, '')
          )
            .Envelope
            .Body
            .consultaRadicacionResponse
            .respuesta

          resolve(resultData)
        } catch (e) {
          logger.error('Controller::DNRPA::consultaRadicacion::RequestOK:Catch')
          logger.error('%j', e)
          reject(APIError({
            status: 500,
            devMessage:
            e.message,
            isPublic: true,
          }))
        }
      })
      .catch((e) => {
        logger.error('Controller::DNRPA::consultaRadicacion::RequestError')
        logger.error('%j', e)
        reject(APIError({
          status: e.status,
          message: e.message,
          isPublic: true,
        }))
      })
  })
}


/**
 * xmlReqConsultarRadicacionDomicilio
 * @param opt
 * @param type
 */
function consultarRadicacionDomicilio(opt, type) {
  return new Promise((resolve, reject) => {
    let metodoCampos = ''
    Object.keys(opt).forEach(function (key) {
      metodoCampos += `<${key}>${opt[key]}</${key}>`
    })

    const reqParams = `<x:Envelope 
                      xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" 
                      xmlns:wsr="http://ar.gov.dnrpa.ws/WS-RadicacionPorDomicilio/">
                      <x:Header/>
                      <x:Body>
                        <wsr:consultar${type}>
                          ${metodoCampos}
                        </wsr:consultar${type}>
                      </x:Body>
                    </x:Envelope>`

    logger.log('debug', '_xmlRequest::Raw:')
    logger.log('debug', reqParams)

    TlsReject.set()
    const
      key = fs.readFileSync(`${config.ca.dir}/dnrpa-privateKey.pem`),
      cert = fs.readFileSync(`${config.ca.dir}/dnrpa-publicCert.pem`)

    request
      .post(config.ws.dnrpa.radicacionDomiciolio.url)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(reqParams)
      .then((result) => {
        try {
          const resultData = JSON.parse(
            xmlParser
              .toJson(result.text)
              .replace(/SOAP-ENV:|ns1:/g, '')
          ).Envelope.Body

          logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData', resultData)

          const
            obj1 = keys(resultData),
            obj2 = keys(resultData[obj1]),
            obj3 = keys(resultData[obj1][obj2])

          logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData[obj1]')
          logger.log('debug', resultData[obj1])
          logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData[obj1][obj2]')
          logger.log('debug', resultData[obj1][obj2])
          logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData[obj1][obj2][obj3]')
          logger.log('debug', resultData[obj1][obj2][obj3])

          if (resultData[obj1][obj2][obj3]) {
            logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData[obj1][obj2][obj3]')
            resolve(resultData[obj1][obj2][obj3])
          } else if (resultData[obj1][obj2]) {
            logger.log('debug', 'Ctrl::DNRPA::_xmlRequest::Request::Then:resultData[obj1][obj2]')
            resolve(resultData[obj1][obj2])
          } else {
            reject({ status: 404, devMessage: 'No se encontró datos en la estructura original', isPublic: false, })
          }
        } catch (e) {
          logger.log('debug', 'Controller::DNRPA::consulta' + type + '::RequestOK:Catch', e)
          reject({
            status: 500,
            message: 'Error en la Estructura de Datos externa',
            devMessage: e.message,
            isPublic: true,
          })
        }
      })
      .catch((e) => {
        logger.log('debug', 'Controller::DNRPA::consulta' + type + '::RequestError')

        let errorDevMsg

        try {
          errorDevMsg = JSON.parse(
            xmlParser
              .toJson(e.response.text)
              .replace(/SOAP-ENV:|ns1:/g, '')
          ).Envelope.Body.Fault
        } catch (e) {
          errorDevMsg = e.message
        }

        reject({
          status: (e.status) ? e.status : 500,
          message: (e.message) ? e.message : null,
          devMessage: errorDevMsg,
          isPublic: true,
        })
      })
  })
}


/**
 * xmlReqConsultarCedulas
 * @param opt
 * @param type
 */
function consultarCedulas(opt, type) {
  return new Promise(((resolve, reject) => {
    const reqParams = `<soapenv:Envelope
                        xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:ws="http://ar.gov.dnrpa.ws/WS-ConsultaCedulas/"
                      >
                      <soapenv:Header/>
                      <soapenv:Body>
                        <ws:${(type) ? 'consultaPorDocumento' : 'consultaPorDominio'}>
                          <${(type) ? 'numeroDocumento' : 'dominio'}>${opt.data}</${(type) ? 'numeroDocumento' : 'dominio'}>
                          <usuario>?</usuario>
                        </ws:${(type) ? 'consultaPorDocumento' : 'consultaPorDominio'}>
                      </soapenv:Body>
                      </soapenv:Envelope>`


    TlsReject.set()
    const
      key = fs.readFileSync(`${config.ca.dir}/dnrpa-privateKey.pem`),
      cert = fs.readFileSync(`${config.ca.dir}/dnrpa-publicCert.pem`)

    request
      .post(config.ws.dnrpa.cedulas.url)
      .key(key)
      .cert(cert)
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(reqParams)
      .then((result) => {
        try {
          let resultData = JSON.parse(
            xmlParser
              .toJson(result.text)
              .replace(/SOAP-ENV:|ns1:/g, '')
          ).Envelope.Body

          if (type)
            resultData = resultData.consultaPorDocumentoResponse.cedulas.cedula
          else
            resultData = resultData.consultaPorDominioResponse.cedulas.cedula


          return resolve(resultData)
        } catch (e) {
          logger.log('debug', 'Controller::DNRPA::Cedula::RequestOK:Catch', e)
          reject({
            status: 500,
            message: 'Error en la Estructura de Datos externa',
            devMessage: (e.message),
            isPublic: true,
          })
        }
      })
      .catch((e) => {
        try {
          const errorData = JSON.parse(
            xmlParser
              .toJson(e.response.text)
              .replace(/SOAP-ENV:|ns1:/g, '')
          ).Envelope.Body.Fault

          let status, message, devMessage

          if (errorData.faultcode === 'Error en parametros') {
            status = 400
            message = `${(errorData.faultcode)}, ${(errorData.faultstring)}`
          } else {
            status = 500
            message = (e.message)
            devMessage = (e.stack)
          }

          return reject(APIError({
            status,
            message,
            devMessage,
          }))
        } catch (e) {
          logger.log('debug', 'Controller::DNRPA::Cedula::RequestKO:Catch', e)
          reject({
            status: 500,
            message: (e.message),
            devMessage: (e.stack),
          })
        }
      })
  }))
}


export default {
  consultarRadicacionDominio,
  consultarRadicacionDomicilio,
  consultarCedulas,
}
