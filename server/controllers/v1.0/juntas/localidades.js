import APIResponses from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'
import { sheets, } from '../../../helpers/google/sheets'
import logger from '../../../../config/winston'


const methods = {
  getElement(opt) {
    const sheetsPromise = new Promise((resolve, reject) => {
      const googleSheets = sheets()
      const empty = []

      googleSheets.spreadsheets.values.get({
        spreadsheetId: '1pvcQRLcLr8_gvJfb5rij-QhqUHcs5mS3lkJnBnfqyCw',
        range: 'Sheet1!A3:C',
        }, (err, res) => {
          if (err) {
            reject(err)
            return
          }

          try {
            const rows = res.data.values

            if (!rows.length) {
              resolve([])
              return
            }

            const response = rows.map((row) => {
              const rowProvincia = row[1] ? row[1].trim() : row[1]

              if ((opt.provincia && rowProvincia != opt.provincia)) {
                return
              }

              row = row.map((col, index) => col ? col.replace(/\s\s+/g, '') : '')

              return {
                localidad: row[2] ? row[2].trim() : '',
              }
            }).filter((row) => row)
              .filter((row) => {
                if (empty.includes(row.localidad)) {
                  return false
                }

                empty.push(row.localidad)
                return true
              })

            resolve(response)
          } catch (e) {
              reject(e)
          }
      })
    })

    return sheetsPromise
  },
}


const getElement = (req, res, next) => {
  logger.log('debug', 'Controller::Localidades::Methods::getElement')

  const opt = {
    provincia: req.query.provincia,
  }

  if (!opt.provincia) {
    const apiError = APIError({
      status: 400,
      message: 'Error: el campo provincia es requerido.',
    })

    next(apiError)

    return
  }

  methods.getElement(opt)
  .then((v) => {
    if (!v || !v.length) {
      const apiError = APIError({
        status: 404,
        message: 'Not Found',
      })
      next(apiError)
    }

    return res.json(APIResponses.list(0, 0, v))
  })
  .catch((e) => {
    const apiError = APIError({
      status: (e.status) ? e.status : 503,
      message: `Error: extWS, ${e.message}`,
    })

    next(apiError)
  })
}

export default {
  getElement,
}