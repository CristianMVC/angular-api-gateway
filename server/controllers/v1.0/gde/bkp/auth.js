// import request from 'superagent'
// import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import url from 'url'
// import config from '../../../../config/env/index'
// import logger from '../../../../config/winston'
// import redis from '../../../helpers/Redis'
// import TlsReject from '../../../helpers/TlsReject'
// import APIError from '../../../helpers/APIError'


// const data = {
//   token1: '',
//   token2: '',
//   codeTGT: '',
//   codeST: '',
//   codeSTencoded: '',
// }

// const tokenKey = 'Auth:Token:GDE:Token'
// const tokenKeyExpire = '900'

// /**
//  * Generate Token JWT
//  * @returns {*}
//  * @private
//  */
// function getTokenJWT() {
//   logger.log('debug', 'RLM::ControllerAuth::getToken1')
//   return new Promise((resolve, reject) => {
//     try {
//       logger.log('debug', 'RLM::ControllerAuth::getToken1::Promise::GenerateJWT')
//       const key = fs.readFileSync(`${config.ca.dir}/rlm-privateKey.pem`)
//       const accessToken = jwt.sign(
//         {
//           iss: 'MM_APIGATEWAY',
//         },
//         key,
//         {
//           algorithm: 'RS256',
//           expiresIn: 3600,
//           notBefore: 0,
//         }
//       )

//       data.token1 = `Bearer ${accessToken}`
//       return resolve(data.token1)
//     } catch (e) {
//       return reject(APIError({
//         status: 500,
//         message: (e.message),
//         devMessage: (e.stack),
//         isPublic: false,
//       }))
//     }
//   })
// }


// /**
//  * getTGT
//  * @returns {Promise<T>}
//  */
// function getCodeTGT() {
//   return new Promise((resolve, reject) => {
//     getTokenJWT()
//       .then((token1) => request
//         .post(config.ws.gde.tgt.url)
//         .set('Authorization', token1)
//         .send(config.ws.gde.tgt.body)
//         .then((v) => {
//           try {
//             const code = v['header']['location']
//             if (!code)
//               return reject(APIError({
//                 status: 500,
//                 message: 'Error al obtener codigo TGT',
//               }))
//             else {
//               data.codeTGT = resolve(code.substring(code.lastIndexOf('/') + 1))
//               return resolve(data.codeTGT)
//             }
//           } catch (e) {
//             return reject(e)
//           }
//         })
//         .catch((e) => reject(APIError({
//           status: (e.status),
//           message: (e.message),
//           devMessage: (e.stack),
//         }))))
//       .catch((e) => reject(e))
//   })
// }

// /**
//  * getCodeST
//  * @returns {Promise<any>}
//  */
// function getCodeST() {
//   return new Promise((resolve, reject) => {
//     getCodeTGT()
//       .then((codeTGT) => {
//         const reqUrl = url.resolve(config.ws.gde.st.url, codeTGT)

//         TlsReject.set()

//         request
//           .post(reqUrl)
//           .set('Authorization', data.token1)
//           .set('content-type', 'text/plain')
//           .set('Accept', '*/*')
//           .set('Accept-Language', 'en-US,en;q=0.5')
//           .set('Accept-Encoding', 'gzip, deflate')
//           .set('Cache-Control', 'no-cache')
//           .set('User-Agent', 'Mozilla/5.0')
//           .send(config.ws.gde.st.body)
//           .then((v) => {
//             try {
//               if (v.text) {
//                 data.codeST = v.text
//                 return resolve(data.codeST)
//               } else
//                 return reject(APIError({
//                   status: 500,
//                   message: 'Error al obtener codigo ST',
//                 }))
//             } catch (e) {
//               return reject(APIError({
//                 status: 500,
//                 message: (e.message),
//                 devMessage: (e.stack),
//               }))
//             }
//           })
//           .catch((e) => reject(APIError({
//             status: (e.status),
//             message: (e.message),
//             devMessage: (e.stack),
//           })))
//       })
//       .catch((e) => reject(e))
//   })
// }


// /**
//  * getTokens
//  */
// function getTokens() {
//   return new Promise((resolve, reject) => {
//     getCodeST()
//       .then((codeST) => {
//         const serviceURL = `${config.ws.gde.cas.serviceURL},${codeST}`
//         data.codeSTencoded = Buffer.from(serviceURL, 'utf-8').toString('base64')
//         const reqData = { token: data.codeSTencoded, }

//         logger.log('debug', 'TOKEN2')
//         logger.log('debug', 'TOKEN2::data::%j', data)

//         request
//           .post(config.ws.gde.cas.url)
//           .set('Authorization', data.token1)
//           .set('content-type', 'application/json')
//           .set('Accept', '*/*')
//           .set('Accept-Language', 'en-US,en;q=0.5')
//           .set('Accept-Encoding', 'gzip, deflate')
//           .set('Cache-Control', 'no-cache')
//           .set('User-Agent', 'Mozilla/5.0')
//           .query(config.ws.gde.cas.query)
//           .send(reqData)
//           .then((v) => {
//             if (v.body) {
//               data.token2 = `Bearer ${v.body}`
//               redis
//                 .set(tokenKey, JSON.stringify(data))
//                 .then((expire) => redis.expire(tokenKey, tokenKeyExpire)
//                   .then(() => {
//                     if (expire)
//                       return resolve(data)
//                     else
//                       return reject(APIError({
//                         status: 500,
//                         message: 'Error al Obtener Token Externo',
//                         isPublic: false,
//                       }))
//                   })
//                   .catch((e) => reject(APIError({
//                     status: 500,
//                     message: (e.message),
//                     devMessage: (e.stack),
//                     isPublic: false,
//                   }))))
//                 .catch((e) => reject(APIError({
//                   status: 500,
//                   message: (e.message),
//                   devMessage: (e.stack),
//                   isPublic: false,
//                 })))
//             } else
//               return reject(APIError({
//                 status: 500,
//                 message: 'Error Request Token',
//               }))
//           })
//           .catch((e) => reject(APIError({
//             status: (e.status),
//             message: (e.message),
//             devMessage: (e.stack),
//           })))
//       })
//       .catch((e) => reject(e))
//   })
// }


// /**
//  * getTokens
//  */
// export default function () {
//   return new Promise((resolve, reject) => {
//     redis
//       .exists(tokenKey)
//       .then((exists) => {
//         if (exists)
//           redis
//             .get(tokenKey)
//             .then((reply) => resolve(JSON.parse(reply)))
//             .catch((e) => reject(APIError({
//               status: 500,
//               message: (e.message),
//               devMessage: (e.stack),
//               isPublic: false,
//             })))
//         else
//           getTokens()
//             .then((token) => resolve(token))
//             .catch((e) => reject(e))
//       })
//   })
// }
