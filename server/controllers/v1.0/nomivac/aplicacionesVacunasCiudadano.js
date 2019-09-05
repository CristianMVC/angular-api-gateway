import request from './request'
import APIResponse from '../../../helpers/APIStandarResponses'
import config from '../../../../config/env'
import { assign, } from 'lodash'

/**
 * getList
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
  const data = {
    codigo: (req.query.codigo),
    tipoDocumento: (req.query.tipo_documento),
    numeroDocumento: (req.query.nro_documento),
    sexo: (req.query.sexo),
  }

  //const url = `${config.ws.nomivac.index.url}${path}`
  const body = assign(config.ws.nomivac.index.body, data)

  request
    .post({
      url: `${config.ws.nomivac.index.url}`,
      path: '/aplicacionesVacunasCiudadano',
      query: req.query,
      body,
    })
    .then((v) => {
      let l = (v) ? v.aplicacionesVacunasCiudadano.aplicacionVacunaCiudadano : []

      if (req.query.id_vacuna)
        l = l.filter((o) => o.idSniVacuna === req.query.id_vacuna)

      return res.json(APIResponse.list(0, 0, l))
    })
    .catch((e) => next(e))
}


export default {
  getList,
}
