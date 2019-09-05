/**
 * get Method
 * @param str - url string to method
 * @returns {string|boolean}
 */
export default function Method(str) {
  try {
  /* eslint-disable */
  const methods = {
    'obtener-asignaciones-familiares': 'obtenerAsignacionesFamiliares',
    'obtener-desempleo': 'obtenerDesempleo',
    'obtener-jubilaciones-y-pensiones': 'obtenerJubilacionesYPensiones',
    'obtener-relaciones-familiares': 'obtenerRelacionesFamiliares',
    'obtener-obras-sociales': 'obtenerObrasSociales',
    'obtener-periodo-empleo': 'obtenerPeriodoEmpleo',
    'obtener-periodos-autonomo': 'obtenerPeriodosAutonomo',
    'obtener-periodos-monotributista': 'obtenerPeriodosMonotributista',
    'obtener-periodos-servicio-domestico': 'obtenerPeriodosServicioDomestico',
    'obtener-persona-fisica-ws-filtros': 'obtenerPersonaFisicaWSFiltros',
    'obtener-empleo-formal': 'obtenerEmpleoFormal',
  }
  /* eslint-enable */

  if (methods.hasOwnProperty(str))
    return methods[str]
  else
    return false
  } catch (e) {
    return false
  }
}

