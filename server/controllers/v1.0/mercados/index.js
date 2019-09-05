import APIResponse                  from '../../../helpers/APIStandarResponses'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import moment                       from 'moment'
import request                      from 'superagent'
import APIError                     from '../../../helpers/APIError'


// todo: stringToNumber() --> parseo de string a numero. Si falla, valor por defecto (try/catch)

/**
 * Retorna la Lista
 * @param str - String
 */
function _stringToFloat(str, next) {
  let resultado = 0
  try {
    if (!isNaN(str)) {
      resultado = parseFloat(str)
      if (!resultado) {
        resultado = 0
      }
    }
  } catch (e) {
    logger.error('Controller::mercados::parse::Catch')
    // logger.error(e.message)
    next(APIError({
      status: e.status,
      message: e.message,
    }))
  }
  return resultado
}

function _stringToInt(str) {
  let resultado = 0
  try {
    if (!isNaN(str)) {
      resultado = parseInt(str)
      if (!resultado) {
        resultado = 0
      }
    }
  } catch (e) {
    logger.error('Controller::mercados::parse::Catch')
    logger.error(e.message)
  }
  return resultado
}

function list(req, res, next) {
  logger.log('debug', 'Controller::mercados::List')
  request
    .get(config.ws.mercados.url)
    .then((result) => {
      try {
        const resultData = result.body.feed.entry
          const responseData = resultData.map((dato) => {
            return {
              id: _stringToInt(dato.gsx$id.$t),
              provincia: dato.gsx$provincia.$t,
              barrio: dato.gsx$barrio.$t,
              dia: dato.gsx$dia.$t,
              fecha: moment(dato.gsx$fecha.$t, 'DD-MM-YYYY'),
              horario: dato.gsx$horario.$t,
              lugar: dato.gsx$lugar.$t,
              localidad: dato.gsx$localidad.$t,
              latitud: _stringToFloat(dato.gsx$latitud.$t),
              longitud: _stringToFloat(dato.gsx$longitud.$t),
            }
          })
          res.json(APIResponse.list(0, 0, responseData))
      } catch (e) {
        logger.error('Controller::mercados::list::Catch')
        next(APIError({
          status: 500,
        }))
      }
    })
    .catch((e) => {
      logger.error('Controller::mercados::list::RequestError')
      next(APIError({
        status: e.status,
        message: e.message,
      }))
    })
}

export default {
  list,
}
