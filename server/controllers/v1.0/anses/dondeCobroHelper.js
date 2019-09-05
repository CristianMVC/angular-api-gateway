import _                              from 'lodash'
import moment                         from 'moment'


/**
 * _parserData: Valida y parsea el dato
 * @param a - Data to validate and parse
 * @private
 */
function _parserData(a) {
  let _result = ''

  const date_short  = new RegExp('.{2}\/.{2}\/.{4}'),
        date_long   = new RegExp('.{4}-.{2}-.{2}T.{2}:.{2}:.{2}')

  if (date_short.exec(a) !== null)
    _result = moment(a, 'DD/MM/YYYY')
  else if (date_long.exec(a) !== null)
    _result = moment(a, 'YYYY-MM-DDThh:mm:ss')
  else if (_.isObject(a) && _.isEmpty(a))
    _result = ''
  else if (a == 'true' || a == 'false')
    _result = (a == 'true')
  else
    _result = a

  return _result
}



/**
 * Parser: Parser del request
 * @param _data: Data From ANSES Request
 * @return {object}
 * @private
 */
export function parser(_data) {
  const _resultData = {
    cantidadFechaPago: 0,
    fechaPago: [],
    rub: {},
  }

  let _fechaPago = []

  // CantidadFechaPago
  _resultData.cantidadFechaPago = parseInt(_data.CantidadFP)

  // FechaPago
  if (typeof _data.FPago.SalidaFechaPago != 'undefined') {
    if (!_.isArray(_data.FPago.SalidaFechaPago))
      _fechaPago.push(_data.FPago.SalidaFechaPago)
    else
      _fechaPago = _data.FPago.SalidaFechaPago

    _resultData.fechaPago = _.compact(_fechaPago.map((o) => {
      const _o = {}
      if (!o.hasOwnProperty('xsi:nil')) {
        for (const key in o) {
          if (o.hasOwnProperty(key)) {
            const _key = _.camelCase(key)
            _o[_key] = _parserData(o[key])
          }
        }
        return _o
      }
    }))
  }

  // RUB
  const _RUB = _data.RUB.RUBPorBeneficio.TipoRUBPorBeneficioExt
  for (const key in _RUB) {
    if (_RUB.hasOwnProperty(key)) {
      const _key = _.camelCase(key)
      _resultData.rub[_key] = _parserData(_RUB[key])
    }
  }

  return _resultData
}
