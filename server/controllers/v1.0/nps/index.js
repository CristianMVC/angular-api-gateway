import Promise                      from 'bluebird'
import APIError                     from '../../../helpers/APIError'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import request                      from 'superagent'
import redis                        from '../../../helpers/Redis'
import paramValidation              from '../../../../config/param-validation'
import Joi                          from 'joi'
import moment                       from 'moment'


/**
 * Promise, Que realiza la Autenticacion
 * @private
 */
function _authorize() {
  return new Promise((resolve, reject) => {
    request
      .post(config.ws.msCrm.login.url)
      .type('form')
      .send(config.ws.msCrm.login.body)
      .then((result) => {
        // Get Token Value
        const token = result.body.token_type + ' ' + result.body.access_token
        // Cache Token
        redis.set('Auth:Token:minModernizacion:MsCRM', token)
          .then((expire) => {
            redis.expire('Auth:Token:minModernizacion:MsCRM', result.body.expires_in)
              .then(() => {
                if (expire) resolve(token)
              })
              .catch((e) => {
                logger.error('Controller::NPS::_authorize::RedisExpire', e)
                reject(e)
              })
          })
          .catch((e) => {
            logger.error('Controller::NPS::_authorize::RedisSet', e)
            reject(e)
          })
      })
      .catch((e) => {
        logger.error('Controller::NPS::_authorize::Request', e)
        reject(e)
      })
  })
}


/**
 * Promise, Que retorna el Token
 * @private
 */
function _getToken() {
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:minModernizacion:MsCRM')
      .then((exists) => {
        if (exists === true) {
          redis.get('Auth:Token:minModernizacion:MsCRM')
            .then((reply) => {
              resolve(reply)
            })
            .catch((e) => {
              logger.error('Controller::NPS::_getToken::_consultarToken::Exists:Catch')
              logger.error('%j', e)
              reject(e)
            })
        } else {
          _authorize()
            .then((token) => {
              resolve(token)
            })
            .catch((e) => {
              logger.error('Controller::NPS::_getToken::_authorize:Catch')
              logger.error('%j', e)
              reject(e)
            })
        }
      })
      .catch((e) => {
        logger.error('Controller::NPS::_getToken::_consultarToken::Exists')
        logger.error('%j', e)
        reject(e)
      })
  })
}



/**
 * Almacena una nueva Encuesta
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function store(req, res, next) {
  logger.log('debug', 'Controller::NPS::Store')
  // Se valida en el Controlador debido a un Bug en el express-validation para validar Raw
  Joi.validate(req.body, paramValidation.webServices.ciudadanoDigital.nps.body, (err, _p) => {
    if (!err) {
      const _npsData =  {
                          surveyresponse: {
                            'msdyn_SurveyId@odata.bind': '/msdyn_surveys(645F4F5E-6A78-E711-80F1-E0071B6E8DC1)',
                            msdyn_name: (_p.surveyresponse.name) ? _p.surveyresponse.name : 'Encuesta de Atención',
                            msdyn_respondent: (_p.surveyresponse.respondent) ? _p.surveyresponse.respondent : '',
                            msdyn_completedon: moment(),
                            mcs_dni: (_p.surveyresponse.dni) ? _p.surveyresponse.dni : null,
                            mcs_organismo: (_p.surveyresponse.organismo) ? _p.surveyresponse.organismo : '',
                            mcs_categoriaservicio: (_p.surveyresponse.categoriaservicio) ? _p.surveyresponse.categoriaservicio : '',
                            mcs_provincia: (_p.surveyresponse.provincia) ? _p.surveyresponse.provincia : '',
                            mcs_localidad: (_p.surveyresponse.localidad) ? _p.surveyresponse.localidad : '',
                            mcs_canal: (_p.surveyresponse.canal) ? _p.surveyresponse.canal : null,
                          },
                          questionresponses: [],
                        }

      _npsData.questionresponses = _p.questionresponses.map((o) => {
        const aux = {}

        aux['msdyn_name'] = ''
        aux['@odata.type'] = 'Microsoft.Dynamics.CRM.msdyn_questionresponse'
        aux['msdyn_SurveyId@odata.bind'] = '/msdyn_surveys(645F4F5E-6A78-E711-80F1-E0071B6E8DC1)'

        aux['msdyn_QuestionId@odata.bind'] = `/msdyn_questions(${o.questionId})`

        if (o.answerId)
          aux['msdyn_AnswerId@odata.bind'] = `/msdyn_answers(${o.answerId})`

        if (o.valueAsString)
          aux['msdyn_valueasstring'] = o.valueAsString

        return aux
      })

      // Guardo la Encuesta
      _getToken()
        .then((_token) => {
          // Token
          request
            .post(config.ws.msCrm.nps.url)
            .set('Content-Type', 'application/json')
            .set('Authorization', _token)
            .send(_npsData)
            .then((result) => {
              res.json(result.body)
            })
            .catch((e) => {
              logger.error('Controller::NPS::Store::PostCRM')
              logger.error(e.message)
              const _stack = {
                data: _npsData,
                request: e,
                response: JSON.parse(e.response.text),
              }
              next(APIError({ status: e.status, devMessage: JSON.stringify(_stack), }))
            })
        })
        .catch((e) => {
          logger.error('Controller::NPS::Store::_authorize')
          next(APIError({ status: 500, message: 'External Authorize Failed', devMessage: e.message, }))
        })
    } else {
      next(APIError({ status: 400, devMessage: err.details, }))
    }
  })
}



export default {
  store,
}
