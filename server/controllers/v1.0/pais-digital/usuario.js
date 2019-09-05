import Promise                        from 'bluebird'
import request                        from 'superagent'
import config                         from '../../../../config/env'
import logger                         from '../../../../config/winston'
import { isArray, }                   from 'lodash'


export default function (params) {
  return new Promise((resolve, reject) => {
    request
      .get(config.ws.paisDigital.puntoDigitalCursos.url)
      .set('Accept-Encoding', '')
      .query({
        wstoken: config.ws.paisDigital.wstoken,
        wsfunction: 'core_user_get_users_by_field',
        moodlewsrestformat: 'json',
        field: 'username',
        'values[0]': 'cuil:' + params.cuil,
      })
      .then((r) => {
        try {
          let err_flag = false,
              err_detail = {}

          if (isArray(r.body) && r.body.length === 0) {
            err_flag = true
            err_detail = {
              status: 404,
              devMessage: 'Usuario Inexistente',
              isPublic: true,
            }
          } else if (isArray(r.body) && r.body.length > 1) {
            err_flag = true
            err_detail = {
              status: 500,
              message: 'Error en el WebService Externo, se esperaba un unico nodo',
              devMessage: 'Error en el WebService Externo, se esperaba un unico nodo',
              isPublic: true,
            }
          }

          if (!err_flag)
            return resolve(r.body[0])
          else
            return reject({
              status: err_detail.status,
              message: (err_detail.message),
              devMessage: (err_detail.devMessage),
              isPublic: err_detail.isPublic,
            })
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
        logger.log('debug', 'Controller::Usuarios::GetUserId')
        return reject({
          status: (e.status),
          message: (e.message),
          devMessage: (e.response),
          isPublic: true,
        })
      })
  })
}
