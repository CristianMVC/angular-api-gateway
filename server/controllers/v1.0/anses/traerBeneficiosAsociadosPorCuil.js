import _                              from 'lodash'
import config                         from '../../../../config/env'
import request                        from 'superagent'
import xmlParser                      from 'xml2json'
import errorHandler                   from './error-handler'
import ansesAuth                      from './auth'


/**
 * Request Traer Beneficios Asociados por CUIL
 * @param params - Request Params
 * @returns {Promise}
 * @private
 */
function _request(params) {
  return new Promise((resolve, reject) => {
    // Request Data
    const data = `<soapenv:Envelope 
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:ans="http://anses.gov.ar/">
                  <soapenv:Header>
                    <token xmlns="http://director.anses.gov.ar">${params.auth.token}</token>
                    <sign xmlns="http://director.anses.gov.ar">${params.auth.sign}</sign>
                  </soapenv:Header>
                  <soapenv:Body>
                    <ans:TraerBeneficiosAsociadosPorCUIL>
                      <ans:unCuil>${params.cuil}</ans:unCuil>
                    </ans:TraerBeneficiosAsociadosPorCUIL>
                  </soapenv:Body>
                </soapenv:Envelope>`


    request
      .post(config.ws.anses.traerBeneficiosAsociadosPorCUIL.url)
      .set('Content-Type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '"http://anses.gov.ar/TraerBeneficiosAsociadosPorCUIL"')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip;q=0,deflate;q=0')
      .set('Connection', 'Keep-Alive')
      .set('Content-Length', data.length)
      .set('Host', 'soaservicios.anses.gob.ar')
      .send(data)
      .then((v) => {
        try {
          let _resultData = []

          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:/g, ''))
                            .Envelope
                            .Body
                            .TraerBeneficiosAsociadosPorCUILResponse
                            .TraerBeneficiosAsociadosPorCUILResult


          if (parseInt(_data.Error.CodError) === 0) {
            if (typeof _data.Datos.Beneficio != 'undefined')
              if (!_.isArray(_data.Datos.Beneficio))
                _resultData.push(_data.Datos.Beneficio)
              else
                _resultData = _data.Datos.Beneficio

            resolve({
              status: 200,
              error: false,
              errorCode: 0,
              result: _resultData,
            })
          } else {
            reject(errorHandler({
              status: 400,
              message: 'Exception Response',
              method: 'Controllers::Anses::TraerBeneficiosAsociadosPorCUIL::ANSES-Error',
              stack: `ANSES Error Code: ${_data.Error.CodError}`,
            }))
          }
        } catch (e) {
          reject(errorHandler({
            status: 500,
            message: 'Exception Response Data Error',
            method: 'Controllers::Anses::TraerBeneficiosAsociadosPorCUIL::ResponseParser',
            stack: e.message,
          }))
        }
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Data Error',
          method: 'Controllers::Anses::TraerBeneficiosAsociadosPorCUIL::Request',
          stack: e.message,
        }))
      })
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
          .then((v) => {
            resolve(v.result)
          })
          .catch((e) => {
            reject(e)
          })
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Data Error Unauthorized',
          method: 'Controllers::Anses::TraerBeneficiosAsociadosPorCUIL::ResponseParser',
          stack: e.message,
        }))
      })
  })
}
