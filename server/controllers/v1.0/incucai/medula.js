import moment from 'moment'
import request from './request_private'
import logger from '../../../../config/winston'
import config from '../../../../config/env'
import { assign, } from 'lodash'
import { verifyToken, } from '../../../helpers/token'
import APIError from '../../../helpers/APIError'



// async function getIDToken(headers) {
//   let IDtoken
//   try {
//       IDtoken = await verifyToken(headers) // eslint-disable-line
//   } catch (e) {
//       const apiError = APIError({
//           status: 400,
//           message: 'IDtoken Invalido',
//       })
//       logger.error('IDtoken Invalido')
//       throw apiError
//   }

//   return IDtoken
// }


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getCredencial(req, res, next) {
  logger.log('debug', 'Controller::Organos::getCredencial')

  verifyToken(req.headers)
    .then((IDtoken) => {
      const {
        dni_number: numeroDocumento,
        // gender,
      } = IDtoken
      // const idSexo = gender === 'M' ? 1 : 2
      const url = `${config.ws.incucai.private.url}v2.0/medula/donantes/${numeroDocumento}`
      const query = assign({ token: config.ws.incucai.private.token, }, req.query)

      request
        .get({ url, query, })
        .then((v) => {
          v.fecha_registro = moment(v.fecha_registro).toISOString()
          res.json(v)
        })
        .catch((e) => next(e))
    })
    .catch((e) => next(APIError({
      status: 400,
      message: 'IDtoken Invalido',
    })))
}



export default {
  getCredencial,
}
