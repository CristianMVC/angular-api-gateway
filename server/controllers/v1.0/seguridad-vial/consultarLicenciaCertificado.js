import request                      from 'superagent'
import xmlParser                    from 'xml2json'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import APIError                     from '../../../helpers/APIError'
import TlsReject                    from '../../../helpers/TlsReject'


/**
 * consultarLicenciaCertificado: Consultar Licencia de Conduicir
 * @param options - Options
 */
export default function (options) {
  return new Promise((resolve, reject) => {
    // Disable SSL Reject
    TlsReject.set()

    const {
      gender,
      document_type,
      document_number,
    } = options

    //set Request Params
    const reqParams = `<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope 
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <ConsultarLicenciaCertificado xmlns="http://tempuri.org/">
                <nroDocumento>${document_number}</nroDocumento>
                <sexo>${gender}</sexo>
                <tipoDocumento>${document_type}</tipoDocumento>
                </ConsultarLicenciaCertificado>
              </soap:Body>
              </soap:Envelope>`

    // Set Request and Get Data from WS
    request
      .post(config.ws.seguridadVial.url)
      .timeout({
        // response: 5000,  // Wait 5 seconds for the server to start sending,
        deadline: 100000, // but allow 1 minute for the file to finish loading.
      })
      .set('Content-Type', 'text/xml;charset=utf-8')
      .send(reqParams)
      .then((result) => {
        try {
          // Parce String to JSON obj and get Data
          const resultData =  JSON.parse(xmlParser.toJson(result.text).replace(/soap:/g, 'soap_'))
            .soap_Envelope
            .soap_Body
            .ConsultarLicenciaCertificadoResponse
            .ConsultarLicenciaCertificadoResult
            .LicenciaCertificadoDTO

          if (resultData) {
            const responseData = {
              last_name: resultData.Apellido,
              first_name: resultData.Nombre,
              document_type: resultData.TipoDocumento,
              document_number: resultData.NumeroDocumento,
              birthdate: resultData.FechaNacimiento,
              gender: resultData.Sexo,
              classes: resultData.Clases,
              valid_from: resultData.FechaOtorgamiento,
              expiration_date: resultData.FechaVencimiento,
              status: resultData.Estado,
              national_licence: (resultData.LicenciaNacional === 'SI'),
              licence_category: resultData.CategoriaLicencia,
              emission_center: resultData.CentroEmisionLicencia,
              province: resultData.NombreProvincia,
            }
            resolve(responseData)
          } else {
            logger.log('debug', 'Request ConsultarLicenciaCertificado: Not Found')
            reject({ status: 404, })
          }
        } catch (e) {
          logger.log('debug', 'Request ConsultarLicenciaCertificado', e)
          reject({ status: 503, devMessage: e.message, })
        }
      })
      .catch((e) => {
        logger.log('debug', 'Api::Controller::Seguridad-Vial::RequestError', document_number)
        logger.log('debug', 'Api::Controller::Seguridad-Vial::RequestError', e)
        reject({ status: 503, devMessage: e.message, })
      })
  })
}
