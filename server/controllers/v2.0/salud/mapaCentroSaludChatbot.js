import APIResponses     from '../../../helpers/APIStandarResponses'
import APIError         from '../../../helpers/APIError'
import HealthCenter     from '../../../models/healthCenter'

const methods = {
  getElement(opt) {
    const mapsCentro = new Promise((resolve, reject) => {
      const lat = opt.lat
      const long = opt.long
      const num = Number(opt.num)

      const HealthCenterAggregate = HealthCenter.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              // eslint-disable-next-line comma-dangle
              coordinates: [parseFloat(lat), parseFloat(long)],
            },
            distanceField: 'distancia',
            maxDistance: 10000,
            spherical: true,
            num,
          },
        },
        {
          $project: {
            id_ref: 1,
            // eslint-disable-next-line comma-spacing
            lat: { $arrayElemAt: ['$coordenadas', 0,], },
            // eslint-disable-next-line comma-spacing
            lon: { $arrayElemAt: ['$coordenadas', 1,], },
            domicilio: 1,
            web: 1,
            provincia: 1,
            localidad: 1,
            distancia: 1,
            tipologia_descripcion: 1,
            tipologia_categoria: 1,
            tipologia: 1,
            dependencia: 1,
            departamento: 1,
            telefono: 1,
            tipo_telefono: 1,
            nombre: 1,
            email: 1,
          },
        },
        { $sort: { distancia: 1, }, },
      ])

      resolve(HealthCenterAggregate)
    })

    return mapsCentro
  },
}


const getElement = (req, res, next) => {
  const opt = {
    lat: req.query.latitud,
    long: req.query.longitud,
    num: req.query.cantidad ? req.query.cantidad : 10,
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