import Promise                  from 'bluebird'
import request                  from 'superagent'
import config                   from '../../../../config/env'
import logger                   from '../../../../config/winston'
import _usuario                 from './usuario'


export default function (params) {
  return new Promise((resolve, reject) => {
    _usuario(params)
      .then((user) => {
        request
          .get(config.ws.paisDigital.puntoDigitalCursos.url)
          .set('Accept-Encoding', '')
          .query({
            wstoken: config.ws.paisDigital.wstoken,
            wsfunction: 'core_enrol_get_users_courses',
            moodlewsrestformat: 'json',
            userid: user.id,
          })
          .then((r) => {
            logger.log('debug', 'Controller::UsuariosCursos::Request::GetUserCursos')
            return resolve(r.body)
          })
          .catch((e) => {
            logger.log('debug', 'Controller::UsuariosCursos::GetUsuariosCursos')
            return reject({
              status: (e.status),
              message: (e.message),
              devMessage: (e.response && e.response.text),
              isPublic: true,
            })
          })
      })
      .catch((e) => {
        logger.log('debug', 'Controller::UsuariosCursos::GetUserId')
        return reject({
          status: (e.status),
          message: (e.message),
          devMessage: (e.response && e.response.text),
          isPublic: true,
        })
      })
  })
}
