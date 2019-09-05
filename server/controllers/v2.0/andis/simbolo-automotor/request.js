import request  from 'superagent'
import config   from '../../../../../config/env'


const url = `${config.ws.andis.simboloAutomotor.url}/beneficiario`

function getBeneficiary(documentTypeId, documentNumber, renderQr) {
  return new Promise((resolve, reject) => {
    const queryData = {
      type: documentTypeId,
      num: documentNumber,
      renderQr,
    }

    request
      .get(url)
      .set('Accept', 'application/json,application/javascript;q=0.9,*/*;q=0.8')
      .set('Accept-Language', 'en-US,en;q=0.5')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Cache-Control', 'no-cache')
      .set('User-Agent', 'Mozilla/5.0')
      .timeout(10000)
      .query(queryData)
      .then(({ body: data, }) => {
        if (!data) {
          const error = {
            status: 503,
            message: 'ExtError: La estructura de Datos no es correcta',
          }
          reject(error)
          return
        }

        const { beneficiario: beneficiary, } = data

        if (!beneficiary) {
          const error = {
            status: 503,
            message: 'ExtError: La estructura de Datos no es correcta',
          }
          reject(error)
          return
        }
        resolve(beneficiary)
      })
      .catch((e) => {
        const error = {
          status: (e.status) ? e.status : 503,
          message: (e.message),
          devMessage: (e.stack),
        }
        reject(error)
      })
  })
}



export {
  getBeneficiary,
}
