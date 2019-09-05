import _                            from 'lodash'
import logger                       from '../../../../config/winston'

/**
 * Retorna la Lista
 * @param str - String
 */

export function stringToFloat(str) {
  let resultado = 0
  try {
    if (!isNaN(str)) {
      resultado = parseFloat(str)
      if (!resultado) {
        resultado = 0
      }
    }
  } catch (e) {
    logger.error('Controller::fronteras::parse::Catch')
    logger.error(e.message)
  }
  return resultado
}

export function isEmptyData(a) {
  let _flag = true

  if (_.isObject(a)) {
    if (!_.isEmpty(a))
      for (const k in a)
        if (a[k]) {
          if (_.isObject(a[k])) {
            if (!_.isEmpty(a[k]))
              for (const j in a[k])
                if (a[k][j]) {
                  _flag = false
                  break
                }
          } else {
            _flag = false
            break
          }
        }
  } else {
    _flag = !a
  }
  return _flag
}
