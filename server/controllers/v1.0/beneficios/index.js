import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import xmlParser                    from 'xml2json'
import APIError                     from '../../../helpers/APIError'

function consultarCuil(req, res, next) {
  const params = {
    cuil: req.params.cuil,
  }
  const reqParams = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ar="http://ar.gob.gcaba.le.services/">
                       <soapenv:Header/>
                         <soapenv:Body>
                            <ar:consultaExistenciaLegajoPorCuil>
                               <cuil>${params.cuil}</cuil>
                            </ar:consultaExistenciaLegajoPorCuil>
                         </soapenv:Body>
                        </soapenv:Envelope>`
  request
    .post(config.ws.beneficios.url)
    .send(reqParams)
    .then((result) => {
      try {
        const resultData = JSON.parse(xmlParser.toJson(result.text)
          .replace(/soap:/g, 'soap_').replace(/ns2:/g, 'ns2_'))
          .soap_Envelope
          .soap_Body
          .ns2_consultaExistenciaLegajoPorCuilResponse
          .consultaLegajoResponse
        res.json(resultData)
      } catch (err) {
          logger.error('Controller::beneficios:consultarCuil::try/catch', err)
          next(APIError({
            status: err.status,
            message: err.error,
          }))
        }
      })
      .catch((e) => {
        logger.log('debug', 'Controller::beneficios:consultarCuil::catch')
        next(APIError({
          status: e.status,
          message: e.error,
        }))
      })
}

export default {
  consultarCuil,
}
