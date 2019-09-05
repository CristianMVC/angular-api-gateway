import _licenciaDigital from './licenciaDigital'

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
          res.sendPgLog(e)
        })
}

export default {
  licenciaDigital,
}
