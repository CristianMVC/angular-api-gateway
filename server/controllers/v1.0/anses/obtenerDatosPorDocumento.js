import moment from 'moment'
import config from '../../../../config/env'
import request from 'superagent'
import xmlParser from 'xml2json'
import errorHandler from './error-handler'
import ansesAuth from './auth'
import { isArray, isPlainObject, } from 'lodash'


/**
 * parserDataCUIL
 * @param {Object} v - CUIL
 */
function parserDataCUIL(v) {
  return {
    cuil: v.cuil,
    apellido_nombre: v.ape_nom,
    nro_documento: v.doc_nro,
    tipo_documento: v.doc_c_tipo, // int
    tipo_documento_descripcion: v.doc_da_tipo, // 'DU'
    fecha_nacimiento: (v.f_naci) ? moment(v.f_naci, 'DDMMYYYY') : v.f_naci, // '07111970'
    sexo: v.sexo, // 'M'
    estado: v.c_est_grcon, //'9'
    estado_descripcion: v.estado, // 'ACREDITADO'
  }
}


/**
 * Request Obtener Datos x Documento
 * @param params - Request Params
 * @returns {Promise}
 * @private
 */
/*
Casos de Prueba
26315778
23553320
46753098
48239704
*/
function _request(params) {
  return new Promise((resolve, reject) => {
    // Request Data
    const data = `<soapenv:Envelope
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:adp="http://adp.anses.gov.ar">
                  <soapenv:Header>
                    <token xmlns="http://director.anses.gov.ar">${params.auth.token}</token>
                    <sign xmlns="http://director.anses.gov.ar">${params.auth.sign}</sign>
                  </soapenv:Header>
                  <soapenv:Body>
                    <adp:ObtenerDatosxDocumento>
                        <adp:documento>${params.nro_documento}</adp:documento>
                        <adp:nro_pagina_entrada>${params.nro_pagina_entrada}</adp:nro_pagina_entrada>
                    </adp:ObtenerDatosxDocumento>
                  </soapenv:Body>
                </soapenv:Envelope>`

    request
      .post(config.ws.anses.obtenerDatosxDocumento.url)
      .set('Content-Type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '"http://adp.anses.gov.ar/ObtenerDatosxDocumento"')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip;q=0,deflate;q=0')
      .set('Connection', 'Keep-Alive')
      .set('Content-Length', data.length)
      .set('Host', 'soaservicios.anses.gob.ar')
      .send(data)
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|soapenv:|adp:/g, ''))
                            .Envelope
                            .Body
                            .ObtenerDatosxDocumentoResponse
                            .ObtenerDatosxDocumentoResult

          const cod_retorno = parseInt(_data.cod_retorno)

          if (cod_retorno === 0) {
            let l
            if (isArray(_data.Lista.DatosPw02))
              l = _data.Lista.DatosPw02.map((o) => parserDataCUIL(o))
            else if (isPlainObject(_data.Lista.DatosPw02))
              l = parserDataCUIL(_data.Lista.DatosPw02)
            else
              return reject(errorHandler({
                status: 503,
                method: 'Controllers::Anses::ObtenerDatosxDocumento::ANSES-Error',
                message: 'ExtWSError::Estructura de datos Invalida',
                stack: JSON.stringify(_data),
              }))

            return resolve({
              status: 200,
              error: false,
              errorCode: 0,
              result: l,
            })
          } if (cod_retorno === 1)
            return reject(errorHandler({
              status: 404,
              method: 'Controllers::Anses::ObtenerDatosxDocumento::ANSES-Error',
            }))
          else if (cod_retorno === 76)
            return reject(errorHandler({
              status: 400,
              method: 'Controllers::Anses::ObtenerDatosxDocumento::ANSES-Error',
            }))
          else
            return reject(errorHandler({
              status: 503,
              method: 'Controllers::Anses::ObtenerDatosxDocumento::ANSES-Error',
              stack: JSON.stringify(_data),
            }))
        } catch (e) {
          return reject(errorHandler({
            status: 500,
            message: 'Exception Response Data Error',
            method: 'Controllers::Anses::ObtenerDatosxDocumento::ResponseParser',
            stack: e.message,
          }))
        }
      })
      .catch((e) => resolve({
        status: 503,
        error: false,
        errorCode: 0,
        result: e.response,
      }))
  })
}


/**
 * Index Method
 * @param params
 * @returns {Promise}
 */
export default function (params) {
  return new Promise((resolve, reject) => {
    ansesAuth()
      .then((token) => {
        params.auth = token
        _request(params)
          .then((v) => resolve(v.result))
          .catch((e) => reject(e))
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Data Error Unauthorized',
          method: 'Controllers::Anses::ObtenerDatosxDocumento::ResponseParser',
          stack: e.message,
        }))
      })
  })
}
