import config                         from '../../../../config/env'
import request                        from 'superagent'
import xmlParser                      from 'xml2json'
import errorHandler                   from './error-handler'
import ansesAuth                      from './auth'


/**
 * Request ConstanciaDeCUILCodificada
 * @param params - Request Params
 * @returns {Promise}
 * @private
 */
function _request(params) {
  return new Promise((resolve, reject) => {
    // Request Data
    const data = `<soap:Envelope
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:adp="http://adp.anses.gov.ar">
                   <soap:Header>
                     <token xmlns="http://director.anses.gov.ar">${params.auth.token}</token>
                     <sign xmlns="http://director.anses.gov.ar">${params.auth.sign}</sign>
                   </soap:Header>
                   <soap:Body>
                      <adp:ObtenerPDFCodificado>
                         <adp:Apellido>${params.apellido}</adp:Apellido>
                         <adp:Nombre>${params.nombre}</adp:Nombre>
                         <adp:FechaNacimiento>${params.fecha_nacimiento}</adp:FechaNacimiento>
                         <adp:Sexo>${params.sexo}</adp:Sexo>
                         <adp:TipoDoc>${params.tipo_doc}</adp:TipoDoc>
                         <adp:NumDoc>${params.num_doc}</adp:NumDoc>
                      </adp:ObtenerPDFCodificado>
                   </soap:Body>
                </soap:Envelope>`

    request
      .post(config.ws.anses.constanciaDeCuilCodificada.url)
      .set('Content-Type', 'text/xml;charset=UTF-8')
      .set('SOAPAction', '"http://adp.anses.gov.ar/ObtenerPDFCodificado"')
      .set('Accept', '*/*')
      .set('Accept-Encoding', 'gzip;q=0,deflate;q=0')
      .set('Connection', 'Keep-Alive')
      .set('Content-Length', data.length)
      .set('Host', 'soaservicios.anses.gob.ar')
      .timeout(15000)
      .send(data)
      .then((v) => {
        try {
          const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|s:/g, '')).Envelope.Body

          // Validate Error Request
          const errorCode = parseInt(_data.ObtenerPDFCodificadoResponse.ObtenerPDFCodificadoResult.CodigoRetorno)

          if (errorCode !== 0) {
            // Request Error
            reject({
              status: (errorCode === 8005) ? 404 : 400,
              error: true,
              errorCode: errorCode,
              result: _data.ObtenerPDFCodificadoResponse
                .ObtenerPDFCodificadoResult
                .DescripcionMensaje,
            })
          } else {
            // Request 200
            resolve({
              status: 200,
              error: false,
              errorCode: 0,
              result: {
                constanciaCodificada: _data.ObtenerPDFCodificadoResponse
                  .ObtenerPDFCodificadoResult
                  .constanciaCodificada,
              },
            })
          }
        } catch (e) {
          reject(errorHandler({
            status: 500,
            message: 'Exception Data Error',
            method: 'Controllers::Anses::ConstanciaDeCuilCodificada::ResponseParser::Catch',
            stack: e.message,
          }))
        }
      })
      .catch((e) => {
        reject(errorHandler({
          status: 500,
          message: 'Exception Data Error',
          method: 'Controllers::Anses::ConstanciaDeCuilCodificada::ResponseParser::Request',
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
          method: 'Controllers::Anses::ConstanciaDeCuilCodificada::ResponseParser',
          stack: e.message,
        }))
      })
  })
}
