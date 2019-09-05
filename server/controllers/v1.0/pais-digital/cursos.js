import Promise                        from 'bluebird'
import request                        from 'superagent'
import config                         from '../../../../config/env'
import logger                         from '../../../../config/winston'
import { isArray, }                   from 'lodash'


export default function () {
  return new Promise((resolve, reject) => {
    request
      .get(config.ws.paisDigital.puntoDigitalCursos.url)
      .set('Accept-Encoding', '')
      .query({
        wstoken: config.ws.paisDigital.wstoken,
        wsfunction: 'core_course_get_categories',
        moodlewsrestformat: 'json',
      })
      .then((r) => {
        try {
          if (isArray(r.body))
            resolve(r.body)
          else
            return reject({ status: 500, devMessage: 'EXTWS: Structura de Datos Invalida', })
        } catch (e) {
          return reject({
            status: 500,
            message: (e.message),
            devMessage: (e.devMessage),
            isPublic: true,
          })
        }
      })
      .catch((e) => {
        logger.log('debug', 'Controller::PaisDigital::Cursos')
        return reject({
          status: (e.status),
          message: (e.message),
          devMessage: (e.response),
          isPublic: true,
        })
      })
  })
}
