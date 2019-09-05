import request from 'superagent'
import binaryParser from 'superagent-binary-parser'
import APIError from '../../../../helpers/APIError'


function get(opt = {}) {
  return new Promise((resolve, reject) => {
    const {
      url = '',
      query = null,
    } = opt

    request
      .get(url)
      .set('Accept', 'application/json,application/javascript;q=0.9,*/*;q=0.8')
      .set('Accept-Language', 'en-US,en;q=0.5')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .timeout(10000)
      .query(query)
      .then((v) => {
        if (v.body)
          return resolve(v.body)
        else
          return reject(APIError({
            status: 503,
            message: 'ExtError: La estructura de Datos no es correcta',
          }))
      })
      .catch((e) => reject(APIError({
        status: (e.status) ? e.status : 503,
        message: (e.message),
        devMessage: (e.stack),
      })))
  })
}


function getBinary(opt = {}) {
  return new Promise((resolve, reject) => {
    const {
      url = '',
      query = null,
    } = opt

    request
      .get(url)
      .set('Accept', 'image/png,application/pdf;q=0.9,*/*;q=0.8')
      .set('Accept-Language', 'en-US,en;q=0.5')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .query(query)
      .parse(binaryParser)
      .buffer()
      .end((err, resp) => {
        if (!err)
          resolve(resp)
        else
          reject(err)
      })
  })
}


export default {
  get,
  getBinary,
}
