import APIResponse                          from '../../../helpers/APIStandarResponses'
import ansesAuth                            from './auth'
import _constanciaDeCUILCodificada          from './constanciaDeCuilCodificada'
import _traerBeneficiosAsociadosPorCUIL     from './traerBeneficiosAsociadosPorCuil'
import _dondeCobroPorBeneficio              from './dondeCobroPorBeneficio'
import _dondeCobroPorCUILyBeneficio         from './dondeCobroPorCUILyBeneficio'
import _traerCuilPorNroBeneficio            from './traerCuilPorNroBeneficio'
import _obtenerDatosPorDocumento            from './obtenerDatosPorDocumento'
import APIError                             from '../../../helpers/APIError'

/**
 * ParseSpecialChars: Remove Special Chars
 * @param str
 * @private
 */
function _parseSpecialChars(str) {
  // ÀÁÂÃÄÅ
  str = str.replace(/[ÀÁÂÃÄÅ]/gi, 'A')

  // ÈÉÊË
  str = str.replace(/[ÈÉÊË]/gi, 'E')

  // ÌÍÎÏ
  str = str.replace(/[ÌÍÎÏ]/gi, 'I')

  // ÒÓÔÕÖ
  str = str.replace(/[ÒÓÔÕÖ]/gi, 'O')

  // ÙÚÛÜ
  str = str.replace(/[ÙÚÛÜ]/gi, 'U')

  // Ñ
  str = str.replace(/[Ñ]/gi, 'N')

  // Apostrofe
  str = str.replace(/[']/gi, ' ')

  return str
}



/**
 * Funcion que realiza la Autenticacion
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function login(req, res, next) {
  ansesAuth()
    .then((v) => {
      res.json({
        status: 'OK',
      })
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.stack),
      errorCode: (e.errorCode),
      moreInfo: (e.moreInfo),
    })))
}

/**
 * Constancia De CUIL Codificada
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function constanciaDeCUILCodificada(req, res, next) {
  // Set Params
  const params = {
    apellido: req.query.apellido,
    nombre: req.query.nombre,
    fecha_nacimiento: req.query.fecha_nacimiento,
    sexo: req.query.sexo,
    tipo_doc: req.query.tipo_doc,
    num_doc: req.query.num_doc,
  }

  // Validate and Parser
  if (params.num_doc) {
    const limit = params.num_doc.length
    if (limit < 10)
      for (let i = 0; i < (10 - limit); i++)
        params.num_doc = '0' + params.num_doc
  }

  // temp Hotfix Special Chars
  params.apellido = _parseSpecialChars(params.apellido)
  params.nombre = _parseSpecialChars(params.nombre)
  params.fecha_nacimiento = _parseSpecialChars(params.fecha_nacimiento)
  params.sexo = _parseSpecialChars(params.sexo)
  params.tipo_doc = _parseSpecialChars(params.tipo_doc)
  params.num_doc = _parseSpecialChars(params.num_doc)


  // Execute ANSES Method
  _constanciaDeCUILCodificada(params)
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(APIError({
        status: (e.status),
        message: (e.message),
        errorCode: (e.errorCode),
    })))
}


/**
 * Beneficios Asociados Por CUIL, listado de beneficios por CUIL
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function traerBeneficiosAsociadosPorCUIL(req, res, next) {
  // Set Params
  const params = {
    cuil: req.query.cuil,
  }

  // Execute ANSES Method
  _traerBeneficiosAsociadosPorCUIL(params)
    .then((v) => {
      res.json(APIResponse.list(0, 0, v))
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      errorCode: (e.errorCode),
    })))
}


/**
 * Donde Cobro Por Beneficio
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function dondeCobroPorBeneficio(req, res, next) {
  // Set Params
  const params = {
    beneficio: req.query.beneficio,
  }

  // Execute ANSES Method
  _dondeCobroPorBeneficio(params)
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      errorCode: (e.errorCode),
    })))
}


/**
 * Donde Cobro Por CUIL y Beneficio
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function dondeCobroPorCUILyBeneficio(req, res, next) {
  // Set Params
  const params = {
    beneficio: req.query.beneficio,
    cuil: req.query.cuil,
  }

  // Execute ANSES Method
  _dondeCobroPorCUILyBeneficio(params)
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      errorCode: (e.errorCode),
    })))
}


/**
 * Traer CUIL Por Numero de Beneficio
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
function traerCuilPorNroBeneficio(req, res, next) {
  // Set Params
  const params = {
    beneficio: req.query.beneficio,
  }

  // Execute ANSES Method
  _traerCuilPorNroBeneficio(params)
    .then((v) => {
      res.json(v)
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      errorCode: (e.errorCode),
    })))
}


/**
 * obtenerDatosPorDocumento
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Middleware
 */
function obtenerDatosPorDocumento(req, res, next) {
  // Set Params
  const {
    nro_documento = '',
    nro_pagina_entrada = 1,
  } = req.query

  // Execute ANSES Method
  _obtenerDatosPorDocumento({ nro_documento, nro_pagina_entrada, })
    .then((l) => {
    //   const data = {
    //     cuil: v.cuil,
    //     apellido_nombre: v.ape_nom,
    //     nro_documento: v.doc_nro,
    //     tipo_documento: v.doc_c_tipo, // int
    //     tipo_documento_descripcion: v.doc_da_tipo, // 'DU'
    //     fecha_nacimiento: (v.f_naci) ? moment(v.f_naci, 'DDMMYYYY') : v.f_naci, // '07111970'
    //     sexo: v.sexo, // 'M'
    //     estado: v.c_est_grcon, //'9'
    //     estado_descripcion: v.estado, // 'ACREDITADO'
    // }

      res.json(APIResponse.list(0, 0, l))
    })
    .catch((e) => next(APIError({
      status: (e.status),
      message: (e.message),
      devMessage: (e.stack),
      errorCode: (e.errorCode),
    })))
}



export default {
  login,
  constanciaDeCUILCodificada,
  traerBeneficiosAsociadosPorCUIL,
  dondeCobroPorBeneficio,
  dondeCobroPorCUILyBeneficio,
  traerCuilPorNroBeneficio,
  obtenerDatosPorDocumento,
}
