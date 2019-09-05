import APIResponses from '../../../helpers/APIStandarResponses'
import APIError from '../../../helpers/APIError'
import logger from '../../../../config/winston'
import json from './mapaCentroSalud.json'

const methods = {
  getElement(opt) {
    logger.log('debug', 'Options', opt)
    const mapsCentro = new Promise((resolve, reject) => {
      logger.log('debug', 'promise')

      const rows = json.establecimientos

      const response = rows.filter((row) => {
        const rowProvincia = row.provincia
        const rowLocalidad = row.localidad

        if ((opt.provincia && rowProvincia != opt.provincia)) {
          return false
        }

        if ((opt.localidad && rowLocalidad != opt.localidad)) {
          return false
        }

        return true
      })

      const start = ((opt.offset - 1) * opt.limit)
      const end = (opt.offset * opt.limit)

      const pagination = response.slice(start, end)

      resolve(pagination)
    })

    return mapsCentro
  },
}


const getElement = (req, res, next) => {
  logger.log('debug', 'Controller::MapaJson::Methods::getElement')

  const opt = {
    provincia: req.query.provincia,
    localidad: req.query.localidad,
    offset: req.query.offset ? req.query.offset : 1,
    limit: req.query.limit ? req.query.limit : 10,
  }

  if (opt.offset == 0) {
    opt.offset = 1
  }

  if (opt.localidad && !opt.provincia) {
    const apiError = APIError({
      status: 400,
      message: 'Error: se envío localidad, el campo provincia es requerido.',
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
      return
    }

    return res.json(APIResponses.list(opt.offset, opt.limit, v))
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