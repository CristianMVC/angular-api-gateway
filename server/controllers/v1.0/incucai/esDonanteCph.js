import request            from './request_public'
import config             from '../../../../config/env'
import APIError           from '../../../helpers/APIError'
import moment             from 'moment'


/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getElement(req, res, next) {
  const params = {
    url: `${config.ws.incucai.public.url}/v1.0/webmaster/esDonanteCph`,
    query: req.query,
  }

  request.get(params)
    .then((v) => {
      try {
        const date = moment(v.data.fechaRegistro, 'DD/MM/YYYY')

        return res.json({
          nombre: v.data.nombre,
          apellido: v.data.apellido,
          doctipo: v.data.doctipo,
          docnro: v.data.docnro,
          donante: v.data.donante,
          provincia: v.data.provincia,
          situacion_medula: v.data.situacionMedula,
          fecha_registro: (date.isValid()) ? date.toISOString() : 'invalid date',
        })
      } catch (e) {
        return next(APIError({
          status: (e.status),
          message: (e.message),
          devMessage: (e.devMessage),
          errorCode: (e.errorCode),
        }))
      }
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.devMessage),
      errorCode: (e.errorCode),
    })))
}


export default {
  getElement,
}
