import { setUserData, } from '../helpers/token'
import { validateToC, } from './../models/pg'
import APIError from '../helpers/APIError'
import Promise from 'bluebird'

const useValidateToC = ({ username: idUser, }, model, next) => {
  const tacPromises = model.toc.map((term) => validateToC(idUser, term))

    Promise.all(tacPromises)
      .then(() => next())
      .catch(() => {
        const apiError = APIError({
          status: 404,
          message: 'Not Found',
          devMessage: 'Términos no aceptados',
        })

        next(apiError)
      })
}

/**
 *
 * @param {Object} model
 * @returns {Function}
 */
const tcMiddleware = (model) => {
  return (req, res, next) => {
    const { userData, } = req

    if (!userData) {
      setUserData(req, next, () => useValidateToC(req.userData, model, next))

      return
    }

    useValidateToC(userData, model, next)
  }
}

export {
  tcMiddleware,
}