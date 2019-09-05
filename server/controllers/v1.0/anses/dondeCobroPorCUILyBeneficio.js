import config                         from '../../../../config/env'
import request                        from 'superagent'
import xmlParser                      from 'xml2json'
import errorHandler                   from './error-handler'
import ansesAuth                      from './auth'
import { parser, }                    from './dondeCobroHelper'



/**
 * Request Donde Cobro Por CUIL y Beneficio
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
                      <ans:DondeCobroWsPorCuilyBeneficio>
                        <ans:oAud>
                          <ans:aplicacion/>
                          <ans:casoDeUso/>
                          <ans:ipOrigen/>
                          <ans:organismo>0</ans:organismo>
                          <ans:organismoSpecified>false</ans:organismoSpecified>
                          <ans:userID/>
                        </ans:oAud>
                        <ans:unCuil>${params.cuil}</ans:unCuil>
                        <ans:Beneficio>${params.beneficio}</ans:Beneficio>
                      </ans:DondeCobroWsPorCuilyBeneficio>
                    </soapenv:Body>
                  </soapenv:Envelope>`


    request
      .post(config.ws.anses.dondeCobro.url)
      .set('Content-Type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '"http://anses.gov.ar/DondeCobroWsPorCuilyBeneficio"')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip;q=0,deflate;q=0')
      .set('Connection', 'Keep-Alive')
      // .set('Content-Length', data.length)
      .set('Host', 'soaservicios.anses.gob.ar')
      .send(data)
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:|xsi:nil="."/g, ''))
                            .Envelope
                            .Body
                            .DondeCobroWsPorCuilyBeneficioResponse
                            .DondeCobroWsPorCuilyBeneficioResult


          if (parseInt(_data.Error.codigo) === 0) {
            const _resultData = parser(_data)

            resolve({
              status: 200,
              error: false,
              errorCode: 0,
              result: _resultData,
            })
          } else {
            reject(errorHandler({
              status: (parseInt(_data.Error.codigo) === 100) ? 404 : 400,
              message: (parseInt(_data.Error.codigo) === 100) ? _data.Error.descripcion : 'Exception Response',
              method: 'Controllers::Anses::DondeCobroPorCUILyBeneficio::ANSES-Error',
              stack: `ANSES Error Code: ${_data.Error.codigo}`,
            }))
          }
        } catch (e) {
          reject(errorHandler({
            status: 500,
            message: 'Exception Response Data Error',
            method: 'Controllers::Anses::DondeCobroPorCUILyBeneficio::ResponseParser',
            stack: e.message,
          }))
        }
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Request Error',
          method: 'Controllers::Anses::DondeCobroPorCUILyBeneficio::Request',
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
          method: 'Controllers::Anses::DondeCobroPorCUILyBeneficio::ResponseParser',
          stack: e.message,
        }))
      })
  })
}
