// import APIResponses from '../../../helpers/APIStandarResponses'
// import config from '../../../../config/env'
// import request from './request_private'
import logger from '../../../../config/winston'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
  logger.log('debug', 'Controller::Provincias::getElement')

  // const url = `${config.ws.incucai.private.url}/v1.0/dona_proposito`

  // request
  //   .get({ url, })
  //   .then((v) => res.json(APIResponses.list(0, 0, v)))
  //   .catch((e) => next(e))

  // Fix por tildes
  const a = {
    metadata: {
      resultset: {
        count: 3,
        offset: 0,
        limit: 0,
      },
    },
    results: [
      {
        id: 1,
        descripcion: 'Trasplante e investigación',
      },
      {
        id: 2,
        descripcion: 'Trasplante',
      },
      {
        id: 3,
        descripcion: 'Investigación',
      },
    ],
  }

  res.json(a)
}

export default {
  getList,
}
