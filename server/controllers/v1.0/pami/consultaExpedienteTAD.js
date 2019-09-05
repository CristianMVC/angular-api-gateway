import config from '../../../../config/env'
import request from './request'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getElement(req, res, next) {
  const url = `${config.ws.pami.url}`

  request
    .get({ url, })
    .then((v) => {
      return res.json(v.respuesta)
    })
    .catch((e) => next(e))
}

export default {
  getElement,
}