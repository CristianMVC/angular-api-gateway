import APIResponses from '../../../helpers/APIStandarResponses'
import config from '../../../../config/env'
import request from './request'
import moment from 'moment'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
  const url = `${config.ws.cultura.convocatorias.url}`

  const params = {
    ordering: req.query.ordering,
    titulo: req.query.titulo,
    abierta: req.query.abierta,
    fecha_inicio: req.query.fecha_inicio,
    fecha_fin: req.query.fecha_fin,
    limit: req.query.limit,
    offset: req.query.offset,
  }

  // TODO: fix moment joi
  let inicio,
      fin,
      prev2,
      next2

  if (params.fecha_inicio) {
    inicio = moment(params.fecha_inicio)
    params.fecha_inicio = inicio.format('YYYY-MM-DD')
  }

  if (params.fecha_fin) {
    fin = moment(params.fecha_fin)
    params.fecha_fin = fin.format('YYYY-MM-DD')
  }

  request
    .get({ url, query: params, })
    .then((v) => {
      const metadata = {
        total: v.count,
        prev: v.previous,
        next: v.next,
      }

      const protocol = req.protocol + '://'
      const host = req.headers.host + '/api/v1.0/cultura'

      if (metadata.next) {
        next2 = metadata.next.split('v2.0', 2)
        metadata.next = protocol + host + next2[1]
      } else {
        delete metadata.next
      }

      if (metadata.prev) {
        prev2 = metadata.prev.split('v2.0', 2)
        metadata.prev = protocol + host + prev2[1]
      } else {
        delete metadata.prev
      }

      return res.json(APIResponses.list(params.offset, params.limit, v.results, metadata))
    })
    .catch((e) => next(e))
}

export default {
  getList,
}