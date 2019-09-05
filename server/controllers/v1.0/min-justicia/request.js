import Promise from 'bluebird'
import APIError from '../../../helpers/APIError'
import request from 'superagent'

export default function (params) {
  return new Promise((resolve, reject) => {
    const { url, query, } = params
    request
      .get(url)
      .set('Host', 'servicios.jus.gob.ar')
      .set('content-type', 'application/json;charset=UTF-8')
      .set('Accept', '*/*')
      .set('Accept-Language', 'en-US,en;q=0.5')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .query(query)
      .then((v) => resolve(v.body))
      .catch((e) => reject(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
        errorCode: (e.errorCode),
        moreInfo: (e.moreInfo),
      })))
  })
}
