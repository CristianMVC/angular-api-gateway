import APIResponses from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'
import { sheets, } from '../../../helpers/google/sheets'
import logger from '../../../../config/winston'


const methods = {
  getElement() {
    const sheetsPromise = new Promise((resolve, reject) => {
      const googleSheets = sheets()
      const empty = []

      googleSheets.spreadsheets.values.get({
        spreadsheetId: '1pvcQRLcLr8_gvJfb5rij-QhqUHcs5mS3lkJnBnfqyCw',
        range: 'Sheet1!A3:B',
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
              return {
                provincia: row[1],
              }
            }).filter((row) => {
              if (empty.includes(row.provincia)) {
                return false
              }

              empty.push(row.provincia)
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
  logger.log('debug', 'Controller::Provincias::Methods::getElement')

  methods.getElement()
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