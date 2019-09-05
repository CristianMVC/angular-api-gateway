import config from '../../../../../config/env'
import { assign, isString, } from 'lodash'

/**
 * parseDataRegistro
 * @param {object} body
 * @param {object} query
 */
export default function parseDataRegistro({ body, query, }) {
  // Set QueryString Vars; Set Obj Query String
  const { confirmado, url_validacion, } = body
  const token = config.ws.incucai.private.token
  // let { query, } = req.query
  query = assign(query, { token, confirmado, url_validacion, })

  // Set Data; Remove Unnecesary Vars
  const data = body
  const nombre_apellido_familiar = (body.nombre_apellido_familiar) ? body.nombre_apellido_familiar : ''
  const nombre_familiar = (body.nombre_familiar) ? body.nombre_familiar : ''
  const apellido_familiar = (body.apellido_familiar) ? body.apellido_familiar : ''

  data.nombre_apellido_familiar = (nombre_apellido_familiar) ? nombre_apellido_familiar : `${nombre_familiar} ${apellido_familiar}`

  // Validate if dona isArray
  try {
    if (isString(data.dona))
      data.dona = data.dona.split(',').map((o) => o.toString())
  } catch (e) {
    throw e
  }

  delete data['confirmado']
  delete data['url_validacion']
  delete data['apellido_familiar']
  delete data['nombre_familiar']

  return { body: data, query, }
}
