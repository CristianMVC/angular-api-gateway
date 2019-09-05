import omitEmpty from 'omit-empty'
import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import APIResponse from '../../../helpers/APIStandarResponses'
import request from './request'

/** ---------------------------------------------------
 *  Servicio Web de Radicación por Dominio:
 *  consultarRadicacionDominio
 *
 *  Servicio Web de Radicación por Domicilio (Uso Jerárquico):
 *  consultarProvincias
 *  consultarDepartamentos
 *  consultarLocalidades
 *  consultarCallesBarrios
 *  consultarAlturaExacta
 *  consultarRegistroSeccional
 * ------------------------------------------------- */


/**
 * consultarRadicacionDominio
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function consultarRadicacionDominio(req, res, next) {
  logger.log('debug', 'Controller::DNRPA::consultarRadicacionDominio')

  const { dominio, } = req.query

  request
    .consultarRadicacionDominio({ dominio, })
    .then((d) => {
      if (d.datosRadicacion.radicacion) {
        const metadata = {
          observaciones: (d.observaciones) ? d.observaciones : {},
        }

        return res.json(APIResponse.list(0, 0, d.datosRadicacion.radicacion, metadata))
      } else {
        return next(APIError({
          status: 500,
          message: (d.observaciones) ? d.observaciones : {},
          isPublic: true,
        }))
      }
    })
    .catch()
}


/**
 * Consultar provincias por tipo de licencia
 * @param  req - Request
 * @param  res - Response
 * @param  next - next
 */
function consultarProvincias(req, res, next) {
  const params = {
    tipoVehiculo: req.query.tipoVehiculo,
  }

  request
    .consultarRadicacionDomicilio(params, 'Provincias')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}

/**
 * Consultar departamentos de una provincia
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json} Listado de departamentos de la provincia requerida
 */
function consultarDepartamentos(req, res, next) {
  const params = {
    tipoVehiculo: req.query.tipoVehiculo,
    idProvincia: req.query.idProvincia,
  }

  request
    .consultarRadicacionDomicilio(params, 'Departamentos')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}


/**
 * Consultar localidades de un departamento
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json} Listado de localidades del departamento requerido
 */
function consultarLocalidades(req, res, next) {
  const params = {
    tipoVehiculo: req.query.tipoVehiculo,
    idProvincia: req.query.idProvincia,
    idDepartamento: req.query.idDepartamento,
  }

  request
    .consultarRadicacionDomicilio(params, 'Localidades')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}


/**
 * Consultar calles de una localidad
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json} Listado de calles de la localidad requerida
 */
function consultarCallesBarrios(req, res, next) {
  const params = {
    tipoVehiculo: req.query.tipoVehiculo,
    idProvincia: req.query.idProvincia,
    idDepartamento: req.query.idDepartamento,
    idLocalidad: req.query.idLocalidad,
  }

  request
    .consultarRadicacionDomicilio(params, 'CallesBarrios')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}

/**
 * Consultar altura de una calle
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json} Listado de calles de la localidad requerida
 */
function consultarAlturaExacta(req, res, next) {
  let params = {}

  params.tipoVehiculo = (req.query.tipoVehiculo)
  params.idProvincia = (req.query.idProvincia)
  params.idDepartamento = (req.query.idDepartamento)
  params.idLocalidad = (req.query.idLocalidad)
  params.alturaExacta = (req.query.alturaExacta)
  params.idCalle = (req.query.idCalle)
  params.idBarrio = (req.query.idBarrio)

  params = omitEmpty(params)

  request
    .consultarRadicacionDomicilio(params, 'AlturaExacta')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}


/**
 * Consultar registro seccional
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json} Listado de calles de la localidad requerida
 */
function consultarRegistroSeccional(req, res, next) {
  const params = {
    codigoRegistroSeccional: req.query.codigoRegistroSeccional,
  }

  request
    .consultarRadicacionDomicilio(params, 'RegistroSeccional')
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      next(APIError(e))
    })
}


/**
 * Consultar Cedulas
 * @param  req - Request
 * @param  res - Response
 * @param  next - Next
 * @return {json}
 */
function consultarCedulas(req, res, next) {
  const {
    dominio = null,
    nro_documento = null,
  } = req.query

  const params = {
    data: (nro_documento) ? nro_documento : dominio,
  }

  const type = !!nro_documento

  request
    .consultarCedulas(params, type)
    .then((r) => {
      return res.json(APIResponse.list(0, 0, r))
    })
    .catch((e) => next(APIError(e)))
}


export default {
  consultarRadicacionDominio,
  consultarProvincias,
  consultarDepartamentos,
  consultarLocalidades,
  consultarCallesBarrios,
  consultarAlturaExacta,
  consultarRegistroSeccional,
  consultarCedulas,
}
