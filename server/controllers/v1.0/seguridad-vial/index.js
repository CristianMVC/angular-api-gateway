import _consultarLicenciaCertificado from './consultarLicenciaCertificado'
import _licenciaDigital from './licenciaDigital'
import APIError from '../../../helpers/APIError'


/**
 * consultarLicenciaCertificado: Consultar Licencia de Conduicir
 * @param req
 * @param res
 * @param next
 */
function consultarLicenciaCertificado(req, res, next) {
  const {
    gender,
    document_type,
    document_number,
  } = req.query

  _consultarLicenciaCertificado({
      gender,
      document_type,
      document_number,
    })
    .then((v) => res.json(v))
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}


/**
 * licenciaDigital
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function licenciaDigital(req, res, next) {
      const { userData, query, } = req

      const {
        dni_type,
        dni_number,
        gender,
        username,
      } = userData

      const opt = {
        document_type: dni_type,
        document_number: (parseInt(dni_number, 10)),
        gender: gender,
        imagenes: query.imagenes,
      }

      _licenciaDigital(opt, username)
        .then((d) => {
          res.json(d)
        })
        .catch((e) => {
          next(e)
        })
}



/**
 * consultarLicenciaCertificadoDemo
 * @param req
 * @param res
 * @param next
 */
function consultarLicenciaCertificadoDemo(req, res, next) {
  const {
    gender,
    document_type,
    document_number,
  } = req.query

  return res.json({
    last_name: 'APELLIDO',
    first_name: 'NOMBRE SEGUNDO_NOMBRE',
    document_type: document_type,
    document_number: document_number,
    birthdate: '1/1/1900',
    gender: gender.toUpperCase(),
    classes: 'B.1',
    valid_from: '1/1/2017',
    expiration_date: '31/1/2022',
    status: 'Vigente',
    national_licence: true,
    licence_category: 'ORIGINAL',
    emission_center: 'ROCA',
    province: 'CIUDAD AUTÓNOMA DE BS. AS.',
  })
}


export default {
  consultarLicenciaCertificado,
  licenciaDigital,
  consultarLicenciaCertificadoDemo,
}
