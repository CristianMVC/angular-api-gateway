import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import { assign, isArray, isPlainObject, isUndefined, } from 'lodash'

/**
 * Parser Objeto Persona
 * @param o - Objeto Persona
 * @return {object} - Objeto Persona Parseado
 */
export function parserPersona(o) {
  logger.log('debug', 'minDesarrolloSocial::parsePersona')
  const d = {}
  assign(d, o['person'])
  d['programas'] = []
  const l = o['programas'][0].length, v = o['programas'][0], dp = []
  let p
  for (let i = 1; i <= l; i += 2) {
    p = {}
    if (!isUndefined(v[i - 1]) && isPlainObject(v[i - 1]))
      assign(p, v[i - 1])
    else
      throw APIError({
        message: 'La estructura de datos externa es invalida. Objeto Programas Invalido.',
        devMessage: 'Parser::Objeto Programas Invalido.',
        errorCode: '0x800003E8',
      })
    if (p.id) {
      const i = dp.indexOf(p.id)
      if (i === -1)
        dp.push(p.id)
      else
        throw APIError({
          message: 'La estructura de datos externa es invalida. Objeto Programas Invalido, Existen ID\'s Duplicados',
          devMessage: 'Parser::Objeto Programas Invalido.',
          errorCode: '0x800003E8',
        })
    } else {
      throw APIError({
        message: 'La estructura de datos externa es invalida. Objeto Programas Invalido, ID\'s indefinido',
        devMessage: 'Parser::Objeto Programas Invalido.',
        errorCode: '0x800003E8',
      })
    }
    if (!isUndefined(v[i]) && !isUndefined(v[i]['pagos']) && isArray(v[i]['pagos']))
      p['pagos'] = v[i]['pagos'].map((j) => j['pago'])
    else
      throw APIError({
        message: 'La estructura de datos externa es invalida. Objeto Pagos Invalido.',
        devMessage: 'Parser::Objeto Pagos Invalido.',
        errorCode: '0x800003E8',
      })
    d['programas'].push(p)
  }
  return d
}