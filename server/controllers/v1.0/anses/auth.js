import fs                           from 'fs'
import moment                       from 'moment'
import { exec, }                    from 'child_process'
import request                      from 'superagent'
import xmlParser                    from 'xml2json'
import errorHandler                 from './error-handler'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import redis                        from '../../../helpers/Redis'


/**
 * _requestCreate: Genera el Archivo temporal para el Request
 * @returns {Promise}
 * @private
 */
function _requestCreate() {
  // logger.log('debug', 'Anses::Auth::_requestCreate')
  // Params:
  const file = '/tmp/api' + moment().format('YYYYMMDDkkmmssSSSSSS'),
        genTime = moment().subtract(3, 'hour').unix(),
        expTime = moment().subtract(2, 'hour').unix()

  // Request File:
  const requestTicket = `<?xml version='1.0'?>
                          <sso>
                              <id src="C=AR, O=Ministerio de Modernizacion, CN=Servicios, serialNumber=CUIT 30715117564" 
                                  dst="CN=authserver, OU=DGIIT, O=ANSES, L=CABA, S=CABA, C=AR" 
                                  unique_id="id_token" 
                                  gen_time="${genTime}" 
                                  exp_time="${expTime}" />
                              <operation type="login">
                                  <login  entity="30715117564" 
                                          system="ARGENTINA"
                                          username="30715117564"
                                          authmethod="Ticket">
                                  </login>
                              </operation>
                          </sso>`

  return new Promise((resolve, reject) => {
    fs.writeFile(file, requestTicket, (err) => {
      if (!err) resolve(file)
      else reject(errorHandler({
        status: 500,
        method: 'Controllers::Anses::Auth::OpenSSL:smime',
        stack: err,
      }))
    })
  })
}


/**
 * Method de Autenticacion
 * @returns {Promise}
 */
function _getNewToken() {
  //logger.log('debug', 'Anses::Auth::_getNewToken')
  return new Promise((resolve, reject) => {
    const key = `${config.ca.dir}/anses-privateKey.pem`
    const cert = `${config.ca.dir}/anses-publicCert.pem`

    _requestCreate()
      .then((file) => {
        const OSSLSign = 'openssl smime -sign -signer ' + cert + ' -inkey ' + key + ' -in ' + file + ' -outform PEM -nodetach'
        exec(OSSLSign, { shell: '/bin/bash', }, (err, stdout, stderr) => {
          if (err) {
            reject(errorHandler({
              status: 500,
              method: 'Controllers::Anses::Auth::OpenSSL:smime',
              stack: err,
            }))
          } else {
            //logger.log('debug', 'Anses::Auth::_getNewToken::Request')
            const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:arq="http://anses.gov.ar/arquitectura/">
                               <soapenv:Header/>
                               <soapenv:Body>
                                  <arq:login_pkcs7>
                                     <arq:reqpkcs7_base64>${stdout}</arq:reqpkcs7_base64>
                                  </arq:login_pkcs7>
                               </soapenv:Body>
                            </soapenv:Envelope>`

            request
              .post(config.ws.anses.login.url)
              .set('Content-Type', 'text/xml;charset=UTF-8')
              .set('SOAPAction', '"http://anses.gov.ar/arquitectura/login_pkcs7"')
              .set('Accept', '*/*')
              .set('Connection', 'Keep-Alive')
              .set('Content-Length', data.length)
              .set('Host', 'soaservicios.anses.gob.ar')
              .send(data)
              .then((v) => {
                //logger.log('debug', 'Anses::Auth::_getNewToken::Request::Then')
                try {
                  const _data = JSON.parse(xmlParser.toJson(v.text).replace(/soap:|arq:/g, ''))
                                    .Envelope
                                    .Body
                                    .login_pkcs7Response
                                    .login_pkcs7Result

                  const OSSLDecrypt = 'openssl asn1parse -inform PEM -in <(echo \"' + _data + '\")'
                  exec(OSSLDecrypt, { shell: '/bin/bash', }, (error, stdout, stderr) => {
                    if (err) {
                      reject(errorHandler({
                        status: 500,
                        method: 'Controllers::Anses::Auth::OpenSSL:asn1parse',
                        stack: err,
                      }))
                    } else {
                      const str_stdout = stdout.toString()
                      //logger.log('debug', 'stdout.toString')
                      //logger.log('debug', '%s', stdout.toString())

                      try {
                        const sso = /<sso>([\s\S]*?)<\/sso>/g.exec(str_stdout)[1]

                        const token = /<token token='(.*?)' \/>/g.exec(sso)[1]
                        const sign = /<sign sign='(.*?)' \/>/g.exec(sso)[1]
                        if (token && sign) {
                          resolve({
                            token: token,
                            sign: sign,
                          })
                        } else {
                          reject(errorHandler({
                            status: 500,
                            message: 'Error al Obtener Token y Sign',
                            method: 'Controllers::Anses::Auth::OpenSSL:asn1parse',
                            stack: str_stdout,
                          }))
                        }
                      } catch (e) {
                        const mISO = moment().toISOString()
                        const mUNIX = moment().unix()
                        reject(errorHandler({
                          status: 500,
                          message: 'Error al Obtener Token y Sign',
                          // stack: `ISOTime:${mISO}::UnixTime:${mUNIX}::Message:${e.message}::devMessage${str_stdout}`,
                          stack: `ISOTime:${mISO}::UnixTime:${mUNIX}::Message:${e.message}::devMessage${str_stdout}`,
                          method: 'Controllers::Anses::Auth::OpenSSL::Catch:asn1parse',
                        }))
                      }
                    }
                  })
                } catch (e) {
                  reject(errorHandler({
                    status: 500,
                    method: 'Controllers::Anses::Auth::request::ParserXmlData',
                    stack: e,
                  }))
                }
              })
              .catch((e) => {
                reject(errorHandler({
                  status: 500,
                  method: 'Controllers::Anses::Auth::RequestLogin',
                  stack: e,
                }))
              })
          }
        })
      })
      .catch((err) => {
        reject(errorHandler({
          status: 500,
          method: 'Controllers::Anses::Auth::requestCreateError',
          stack: err,
        }))
      })
  })
}


/**
 * Auth - Index Method
 * @returns {Promise}
 * @private
 */
export default function () {
  return new Promise((resolve, reject) => {
    redis.exists('Auth:Token:ANSES')
      .then((exists) => {
        if (exists === true) {
          redis.get('Auth:Token:ANSES')
            .then((reply) => {
              resolve(JSON.parse(reply))
            })
            .catch((err) => {
              reject(errorHandler({
                status: 500,
                method: 'Controllers::Anses::Auth::_getToken::exists:reject',
                stack: err,
              }))
            })
        } else {
          // Genero Token Nuevo
          _getNewToken()
            .then((result) => {
              redis.set('Auth:Token:ANSES', JSON.stringify(result))
                .then((expire) => {
                  redis.expire('Auth:Token:ANSES', 3000) //50 minutos
                    .then(() => {
                      if (expire)
                        resolve(result)
                      else
                        reject(errorHandler({
                          status: 500,
                          method: 'Controllers::Anses::Auth::_getToken::exists:reject',
                          stack: e,
                        }))
                    })
                    .catch((e) => {
                      reject(errorHandler({
                        status: 500,
                        method: 'Controllers::Anses::Auth::_getToken::exists:reject',
                        stack: e,
                      }))
                    })
                })
                .catch((e) => {
                  reject(errorHandler({
                    status: 500,
                    method: 'Controllers::Anses::Auth::_getToken::exists:reject',
                    stack: e,
                  }))
                })
            })
            .catch((e) => {
              reject(errorHandler({
                status: 500,
                method: 'Controllers::Anses::Auth::_getToken::exists:reject',
                stack: e,
              }))
            })
        }
      })
  })
}

