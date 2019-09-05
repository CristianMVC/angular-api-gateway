import _                            from 'lodash'
import Promise                      from 'bluebird'
import request                      from 'superagent'
import Joi                          from 'joi'
import APIResponse                  from '../../../helpers/APIStandarResponses'
import APIError                     from '../../../helpers/APIError'
import redis                        from '../../../helpers/Redis'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import paramValidation              from '../../../../config/param-validation'
import issueDC                      from './class-defensa-consumidor'
import omitEmpty                    from 'omit-empty'


/**
 * Return Sugar Url
 * @param custom
 * @returns {string}
 * @private
 */
function _urlCRM(custom) {
  if (custom)
    return config.ws.defensaConsumidor.url + '/custom/service/v4_1_custom/rest.php'
  else
    return config.ws.defensaConsumidor.url + '/service/v4_1/rest.php'
}


/**
 * Request method
 * @param params
 * @private
 */
function _requestCRM(params) {
  return new Promise((resolve, reject) => {
    const _data = {
      method: params.method,
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: JSON.stringify(params.rest_data),
    }

    request
      .post(_urlCRM(params.custom))
      .type('form')
      .send(_data)
      .then((result) => {
        if (_.isPlainObject(result.body)) {
          resolve(result.body)
        } else {
          logger.log('warn', 'Controller::DefensaConsumidor::_requestCRM::textPlain')
          resolve(JSON.parse(result.text))
        }
      }).catch((e) => {
        logger.log('debug', e)
        logger.log('debug', '%j', e)
        logger.log('debug', 'RequestError::Status: %s', e.status)
        logger.log('debug', 'RequestError::Response: %j', e.response)
        logger.log('debug', 'RequestError::Body: %s', e.response.text)
        reject(e)
      })
  })
}

/**
 * Get Token from redis or new login
 * @private
 */
function _getToken() {
  logger.log('debug', 'Controller::DefensaConsumidor:_getToken')
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:DefensaConsumidor')
      .then((exists) => {
        logger.log('debug', 'Controller::DefensaConsumidor::_getToken:exists')
        if (exists === true) {
          redis.get('Auth:Token:DefensaConsumidor')
            .then((reply) => {
              logger.log('debug', 'Controller::DefensaConsumidor::_getToken::exists:resolve, TokenValue: %j', reply)
              resolve(reply)
            })
            .catch((err) => {
              logger.error('Controller::DefensaConsumidor::_getToken::exists:reject')
              logger.error(err)
              reject(err)
            })
        } else {
          const params = {
            method: 'login',
            custom: false,
            rest_data: {
              user_auth: {
                user_name: 'argentinagobar',
                password: 'UB99OC',
                encryption: 'PLAIN',
              },
            },
          }

          _requestCRM(params)
            .then((result) => {
              // const login = JSON.parse(result.text)
              redis.set('Auth:Token:DefensaConsumidor', result.id)
                .then((expire) => {
                  redis.expire('Auth:Token:DefensaConsumidor', 3600)
                    .then(() => {
                      if (expire) resolve(result.id)
                    })
                })
            })
            .catch((e) => {
              reject(e)
            })
        }
    })
    .catch((e) => {
      reject(e)
    })
  })
}

/**
 * Get an Issue
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function getById(req, res, next) {
  const Token = _getToken()
  Token
    .then((token) => {
      const params = {
          method: 'get_by_id',
          custom: true,
          rest_data: {
            session: token,
            modulo: 'VUFD2_VUFDC',
            data: { id: req.params.issue_id, },
          },
      }

      _requestCRM(params)
        .then((result) => {
          res.json(result)
        }, (reject) => {
          logger.error('Controller::DefensaConsumidor::getPorID::_requestCRM:reject')
          logger.error(reject)
          next(APIError({ status: 500, }))
        })
        .catch((e) => {
          logger.error('Controller::DefensaConsumidor::getPorID::RequestError')
          logger.error(e.message)
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::DefensaConsumidor::getPorID::TokenError')
      logger.error(e.message)
      next(APIError({ status: 500, }))
    })
}


/**
 * POST new Issue, Crear campo VUFDC
 * @param req - Requesst
 * @param res - Reponse
 * @param next - next
 */
function createIssue(req, res, next) {
  logger.log('debug', 'Controller::DefensaConsumidor::createIssue')
  const Token = _getToken()
  Token
    .then((token) => {
      logger.log('debug', 'Controller::DefensaConsumidor::createIssue::Token: %j', token)
      issueDC.setIssue(req.body)
      const params = {
        method: 'save_vufdc',
        custom: true,
        rest_data: {
          session: token,
          modulo: 'VUFD2_VUFDC',
          data: issueDC.getIssue(),
        },
      }

      logger.log('debug', 'Controller::DefensaConsumidor::createIssue::getIssue: %j', issueDC.getIssue())
      // logger.log('debug', 'Controller::DefensaConsumidor::createIssue::params: %j', params)

      _requestCRM(params)
        .then((result) => {
          res.json(result)
        }, (reject) => {
          logger.error('Controller::DefensaConsumidor::createIssue::reject')
          logger.error(reject)
          next(APIError({ status: 500, }))
        })
        .catch((e) => {
          logger.error('Controller::DefensaConsumidor::createIssue::RequestError')
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::DefensaConsumidor::createIssue::issues::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}

/**
 * POST new document to file
 * @param req - Requesst
 * @param res - Response
 * @param next - Next
 * @private
 */
function createDocument(req, res, next) {
  const Token = _getToken(req, res)
    Token
      .then((token) => {
        const params =  {
                          method: 'set_entry',
                          custom: false,
                          rest_data: {
                            session: token,
                            modulo: 'Documents',
                            data: [
                              {
                                name: 'document_name',
                                value: req.params.filename,
                              },
                              {
                                name: 'revision',
                                value: 1,
                              },
                            ],
                          },
                        }

        _requestCRM(params)
          .then((result)=>{
            res.end(result.id)
          })
          .catch((e) => {
            logger.error('Controller::DefensaConsumidor::createDocument::_RequestCRM::Catch')
            next(APIError({ status: 500, devMessage: e.message, }))
          })
  })
}


/**
 * Search
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function search(req, res, next) {
  const Token = _getToken(req, res)
  Token.then((token) => {
    let datos = {}
    datos.doc_tipo      = (req.query.tipoDNI)
    datos.doc_numero    = (req.query.dni)
    datos.issues        = (req.query.issues)
    datos.fields        = (req.query.fields)
    datos.offset        = (req.query.offset)
    datos.limit         = (req.query.limit)

    //parseo de issues y fields
    if (req.query.issues)
      datos.issues = datos.issues.split(',')

    if (req.query.fields)
      datos.fields = datos.fields.split(',')

    datos = omitEmpty(datos)
    const params = {
      method: 'get_by_issue',
      custom: true,
      rest_data: {
        session: token,
        modulo: 'VUFD2_VUFDC',
        data: datos,
      },
    }

    _requestCRM(params)
      .then((result)=>{
        res.json(APIResponse.list(0, 0, result))
      })
      .catch((e) => {
        logger.error('Controller::DefensaConsumidor::Search::_RequestCRM::Catch')
        next(APIError({ status: 500, devMessage: e.message, }))
      })
  })
  .catch((e) => {
    logger.error('Controller::DefensaConsumidor::issues::TokenError')
    next(APIError({ status: 500, devMessage: e.message, }))
  })
}


/**
 * getProject
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function getProject(req, res, next) {
  const Token = _getToken()
  Token
    .then((token) => {
      const rest_data = {
        issue:
          {
            custom_fields: {
              user_id_c: req.params.project_id,
            },
          },
      }

      const params = {
        method: 'get_proyect_by_id',
        custom: true,
        rest_data: {
          session: token,
          modulo: 'VUFD2_VUFDC',
          rest_data: rest_data,
        },
      }
      _requestCRM(params)
        .then((result) => {
          res.json(result)
        }, (reject) => {
          logger.error('Controller::DefensaConsumidor::getProject::_requestCRM:reject')
          logger.error(reject)
          next(APIError({ status: 500, }))
        })
        .catch((e) => {
          logger.error('Controller::DefensaConsumidor::getProject::RequestError')
          next(APIError({ status: 500, devMessage: e.message, }))
        })
    })
    .catch((e) => {
      logger.error('Controller::DefensaConsumidor::getProject::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}

/**
 * Upload File
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function uploadFile(req, res, next) {
  const Token = _getToken()
  Token
    .then((token) => {
      const params = {
        files: req.files,
      }
      Joi.validate(params, paramValidation.webServices.defensaConsumidor.uploads, (err, value) => {
        if (err) {
          logger.error('Controller::DefensaConsumidor::UploadFile:ValidationError')
          logger.error(err)
          next(APIError({ status: 400, devMessage: err.details, }))
        } else {
          const _fileBase64 = req.files.file.data.toString('base64')
          logger.log('debug', 'Controller::DefensaConsumidor::UploadFile:ReqOK')

          const params = {
            method: 'set_document_revision',
            custom: false,
            rest_data: {
              session: token,
              document_revision: {
                id: req.params.doc_id,
                revision: 1,
                filename: req.files.file.name,
                file: _fileBase64,
              },
            },
          }

          _requestCRM(params)
            .then((result) => {
                logger.log('Controller::DefensaConsumidor::UploadFile')
                logger.log('Controller%j', result)
                res.json({ id: req.params.doc_id, })
              }, (reject) => {
                logger.error('Controller::DefensaConsumidor::UploadFile::CreateDocument::_requestCRM::reject')
                logger.error(reject)
                next(APIError({ status: 500, }))
              })
            .catch((e) => {
              logger.error('Controller::DefensaConsumidor::UploadFile::RequestError')
              next(APIError({ status: 500, devMessage: e.message, }))
            })
        }
      })
    })
    .catch((e) => {
      logger.error('Controller::DefensaConsumidor::UploadFile::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}

/**
 * POST new document to file
 * @param token
 * @param doc
 * @private
 */
function _createDocument(token, doc) {
  return new Promise((resolve, reject) => {
    const params =  {
                      method: 'set_entry',
                      custom: false,
                      rest_data: {
                        session: token,
                        modulo: 'Documents',
                        data: [
                          {
                            name: 'document_name',
                            value: doc,
                          },
                          {
                            name: 'revision',
                            value: 1,
                          },
                        ],
                      },
                    }
    _requestCRM(params)
      .then((result)=>{
        resolve(result.id)
      }).catch((error) => {
        logger.error('Controller::DefensaConsumidor::_createDocument')
        reject(error)
      })
  })
}

/**
 * Upload File
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function uploads(req, res, next) {
  logger.log('debug', 'Controller::DefensaConsumidor::Upload:Controller')
  const Token = _getToken()
  Token
    .then((token) => {
      const params = {
        files: req.files,
      }
      Joi.validate(params, paramValidation.webServices.defensaConsumidor.uploads, (err, value) => {
        if (err) {
          logger.error('Controller::DefensaConsumidor::Uploads:ValidationError')
          logger.error(err)
          next(APIError({ status: 400, message: err.details, }))
        } else {
          const _fileBase64 = req.files.file.data.toString('base64')
          logger.log('debug', 'Controller::DefensaConsumidor::Uploads:ReqOK')
          _createDocument(token, req.files.file.name)
            .then((doc_id) => {
              const params = {
                method: 'set_document_revision',
                custom: false,
                rest_data: {
                  session: token,
                  document_revision: {
                    id: doc_id,
                    revision: 1,
                    filename: req.files.file.name,
                    file: _fileBase64,
                  },
                },
              }
              _requestCRM(params)
                .then((result) => {
                  logger.log('Controller::DefensaConsumidor::Uploads')
                    res.json({ id: doc_id, })
                  }, (reject) => {
                    logger.error('Controller::DefensaConsumidor::Uploads::CreateDocument::_requestCRM::reject')
                    logger.error(reject)
                    next(APIError({ status: 500, }))
                  })
                .catch((e) => {
                  logger.error('Controller::DefensaConsumidor::Uploads::RequestError')
                  next(APIError({ status: 500, devMessage: e.message, }))
                })
            }, (reject) => {
              logger.error('Controller::DefensaConsumidor::Uploads::CreateDocument::_requestCRM::reject')
              logger.error(reject)
              next(APIError({ status: 500, }))
            })
            .catch((error) => {
              logger.error('Controller::DefensaConsumidor::Uploads::CreateDocument::RequestError')
              logger.error(error)
              next(APIError({ status: 500, }))
            })
        }
      })
    })
    .catch((e) => {
      logger.error('Controller::DefensaConsumidor::Uploads::TokenError')
      next(APIError({ status: 500, devMessage: e.message, }))
    })
}


export default {
  getById,
  createIssue,
  search,
  getProject,
  createDocument,
  uploads,
  uploadFile,
}
