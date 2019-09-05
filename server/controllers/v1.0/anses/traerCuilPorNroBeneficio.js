import config                         from '../../../../config/env'
import request                        from 'superagent'
import xmlParser                      from 'xml2json'
import errorHandler                   from './error-handler'
import ansesAuth                      from './auth'



/**
 * Request Traer CUIL por Numero de Beneficio
 * @param params - Request Params
 * @returns {Promise}
 * @private
 */
function _request(params) {
  return new Promise((resolve, reject) => {
    // Request Data
    const data = `<soapenv:Envelope
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:ans="http://anses.gov.ar">
                    <soapenv:Header>
                      <token xmlns="http://director.anses.gov.ar">${params.auth.token}</token>
                      <sign xmlns="http://director.anses.gov.ar">${params.auth.sign}</sign>
                    </soapenv:Header>
                    <soapenv:Body>
                      <ans:TraerCuil_PorNroBeneficio>
                        <ans:NroBeneficio>${params.beneficio}</ans:NroBeneficio>
                      </ans:TraerCuil_PorNroBeneficio>
                    </soapenv:Body>
                  </soapenv:Envelope>`


    request
      .post(config.ws.anses.dondeCobro.url)
      .set('Content-Type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '"http://anses.gov.ar/TraerCuil_PorNroBeneficio"')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip;q=0,deflate;q=0')
      .set('Connection', 'Keep-Alive')
      .set('Content-Length', data.length)
      .set('Host', 'soaservicios.anses.gob.ar')
      .send(data)
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:/g, ''))
                            .Envelope
                            .Body
                            .TraerCuil_PorNroBeneficioResponse
                            .TraerCuil_PorNroBeneficioResult


          if (parseInt(_data.Cuil) !== 0) {
            resolve({
              status: 200,
              error: false,
              errorCode: 0,
              result: {
                cuil: _data.Cuil,
                beneficioNro: _data.BeneficioNro,
              },
            })
          } else {
            reject(errorHandler({
              status: 404,
              method: 'Controllers::Anses::TraerCuilPorNroBeneficio::ANSES-Error',
            }))
          }
        } catch (e) {
          reject(errorHandler({
            status: 500,
            message: 'Exception Response Data Error',
            method: 'Controllers::Anses::TraerCuilPorNroBeneficio::ResponseParser',
            stack: e.message,
          }))
        }
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Request Error',
          method: 'Controllers::Anses::TraerCuilPorNroBeneficio::Request',
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
          method: 'Controllers::Anses::TraerCuilPorNroBeneficio::ResponseParser',
          stack: e.message,
        }))
      })
  })
}
