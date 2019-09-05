import APIResponse                                from '../../../helpers/APIStandarResponses'
import APIError                                   from '../../../helpers/APIError'
import {
  getCredentials as getCredentialsRequest,
  getPolicy as getPolicyRequest,
  getOrCreateImageByHash as getPolicyImagesRequest,
}                                                 from './request'
import { refreshPgLogForcefully, }                from '../../../middelwares/pgMiddleware'
import { pgModelList, }                           from '../../../models/pg'

/**
 *
 * @param {String} credential
 * @param {String} dniNumber
 */

const getCredentialsWithExps = (credential, dniNumber) => {
  const getCredentialsWithExpsPromise = new Promise((resolve, reject) => {
    getCredentialsRequest(credential)
      .then((data) => {
        const policiesPromises = []
        for (const policyIndex in data) {
          const { poliza: policy, } = data[policyIndex]
          const { numero: policyNumber, } = policy

          const policyPromise = getPolicyRequest(dniNumber, credential, policyNumber, true)
          policyPromise
            .then(({ poliza: policy, }) => {
              const { imagenes, } = policy
              const { exp, } = imagenes
              data[policyIndex].poliza.exp = exp
            })
            .catch(() => {})

          policiesPromises.push(policyPromise)
        }

        Promise.all(policiesPromises)
          .then(() => {})
          .catch(() => {})
          .finally(() => {
            resolve(data)
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
  return getCredentialsWithExpsPromise
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCredentials = (req, res, next) => {
  const { params, userData, } = req
  const { dni_number: dniNumber, } = userData
  const { credential, } = params

  getCredentialsWithExps(credential, dniNumber)
    .then((data) => {
      res.json(APIResponse.list(0, 0, data))
    })
    .catch((err) => {
      const apiError = APIError(err)
      next(apiError)
    })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */

const getPolicy = (req, res, next) => {
  const { params, query, userData, } = req

  const { credential, policy, } = params
  const { imagenes: queryImages, } = query

  const { dni_number: dniNumber, username: idUser, } = userData

  const images = queryImages == 1

  getPolicyRequest(dniNumber, credential, policy, images)
    .then((policyRes) => {
      if (!images) {
        res.json(policyRes)
        return
      }

      const { isRefresh, } = policyRes.poliza.imagenes

      if (!isRefresh) {
        res.json(policyRes)
        return
      }

      delete policyRes.poliza.imagenes.isRefresh

      getCredentialsWithExps(credential, dniNumber)
        .then((data) => refreshPgLogForcefully(pgModelList.srtCredencial, idUser, dniNumber, APIResponse.list(0, 0, data), credential))
        .catch(() => {})
        .finally(() => {
          res.json(policyRes)
      })
    })
    .catch((err) => {
      const apiError = APIError(err)
      next(apiError)
    })
}


const getPolicyImages = (req, res, next) => {
    const { params, userData, } = req

    const { credential, policy, } = params

    const { dni_number: dniNumber, } = userData

    getPolicyImagesRequest(credential, dniNumber, policy)
      .then(({ frente, qr, exp, }) =>  {
        res.json({ frente, qr, exp, })
      })
      .catch((err) => {
        const apiError = APIError(err)
        next(apiError)
      })
}

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getCredentialsImages = (req, res, next) => {
  const { params, userData, } = req
  const { dni_number: dniNumber, } = userData
  const { credential, } = params

  getCredentialsRequest(credential)
    .then((data) => {
      const policiesPromises = []
      for (const policyIndex in data) {
        const { poliza: policy, } = data[policyIndex]
        const { numero: policyNumber, } = policy

        const policyPromise = new Promise((resolve) => {
          getPolicyRequest(dniNumber, credential, policyNumber, true)
            .then(({ poliza: policy, }) => {
              const { imagenes, } = policy
              const { exp, } = imagenes
              policy.exp = exp
              data[policyIndex].poliza = policy
            })
            .catch(() => {
              data[policyIndex].poliza.imagenes = {
                qr: null,
                frente: null,
                exp: null,
              }
              data[policyIndex].poliza.exp = null
            })
            .finally(resolve)
        })

        policiesPromises.push(policyPromise)
      }

      Promise.all(policiesPromises)
        .catch(() => {})
        .finally(() => {
          res.json(APIResponse.list(0, 0, data))
        })
    })
    .catch((err) => {
      const apiError = APIError(err)
      next(apiError)
    })
}

export default {
  getCredentials,
  getPolicy,
  getCredentialsImages,
  getPolicyImages,
}