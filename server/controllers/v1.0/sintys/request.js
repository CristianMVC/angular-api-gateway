import TlsReject                    from '../../../helpers/TlsReject'
import request                      from 'superagent'
import APIError                     from '../../../helpers/APIError'
import config                       from '../../../../config/env'
import fs                           from 'fs'


export default function (params) {
  return new Promise((resolve, reject) => {
    try {
      TlsReject.set()
      const key = fs.readFileSync(`${config.ca.dir}/sintys-privateKey.pem`)
      const cert = fs.readFileSync(`${config.ca.dir}/sintys-publicCert.pem`)

      request
        .post(config.ws.sintys.index.url)
        .key(key)
        .cert(cert)
        .set('content-type', 'application/json')
        .set('accept', '*/*')
        .set('accept-encoding', 'gzip, deflate')
        .set('cache-control', 'no-cache')
        .send(params)
        .then((r) => {
          try {
            const data = JSON.parse(r.text)
            if (!data.error)
              return resolve(data)
            else
              return reject(APIError({
                status: 400,
                message: (data.error),
              }))
          } catch (e) {
            return reject(APIError({
              status: 500,
              message: (e.message),
              devMessage: (e.stack),
            }))
          }
        })
        .catch((e) => {
          return reject(APIError({
            status: (e.status),
            message: (e.response.text) ? e.response.text : e.message,
          }))
        })
    } catch (e) {
      return reject(APIError({
        status: 500,
        message: (e.message),
        devMessage: (e.stack),
      }))
    }
  })
}
