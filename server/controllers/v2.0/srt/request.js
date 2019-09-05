import request from 'superagent'
import Promise from 'bluebird'
import config from '../../../../config/env'
import moment from 'moment'
import {
  objectToSnakeCase,
} from './../../../helpers/strings'
import {
  getFilesByHash,
  createFilesByHash,
} from '../../../helpers/base64Files'

const folderSrtPolicies = 'srt/polizas'

const { credenciales, } = config.ws2.srt
const { url: credentialsUrl, query: credentialsQuery, } = credenciales

// eslint-disable-next-line array-bracket-spacing
const policyImageKeys = ['qr', 'frente', ]

const errorParser = (e, customMessage = '') => {
  return {
      status: e.status && e.status < 500 ? e.status : 503,
      message: e.status == 404 ? 'Not Found' : `Error en el servicio externo::${customMessage}`,
      devMessage: e.message,
  }
}

/**
 * @param {String} credential credential (cuit) number
 */
const getCredentials = (credencial) => {
  return new Promise((resolve, reject) => {
    const credentialsListUrl = `${credentialsUrl}/${credencial}`

    request.get(credentialsListUrl)
      .timeout(15000)
      .query(credentialsQuery)
      .then(({ body: data, }) => {
        if (!data || !data.length) {
          reject({
            message: 'Not Found',
            status: 404,
          })
          return
        }

        const formatedData = data.map((credencial) => {
          const newCredencial = objectToSnakeCase(credencial)

          newCredencial.fecha_nacimiento = moment(newCredencial.fecha_nacimiento).toISOString()
          newCredencial.poliza.desde = moment(newCredencial.poliza.desde).toISOString()
          newCredencial.poliza.hasta = moment(newCredencial.poliza.hasta).toISOString()

          return newCredencial
        })
        resolve(formatedData)
      }).catch((e) => {
        reject(errorParser(e, 'SRT'))
      })
  })
}

/**
 * @param {String} credential credential (cuit) number
 * @param {String} policy     policy number
 */
const getPolicyImages = (credential, policy) => {
  return new Promise((resolve, reject) => {
    const policyImagesUrl = `${credentialsUrl}/${credential}/${policy}/imagenes`

    request.get(policyImagesUrl)
      .timeout(50000)
      .query(credentialsQuery)
      .then(({ body: images, }) => {
        resolve({ qr: images.Qr, frente: images.Frente, })
      })
      .catch((e) => {
        reject(errorParser(e, 'SRT IMAGES'))
      })
  })
}
/**
 * @param {String} credential credential (cuit) number
 * @param {String} dni        dni number
 * @param {String} policy     policy number
 */

const getOrCreateImageByHash = (credential, dni, policy) => {
  return new Promise((resolve, reject) => {
    //CACHE
    getFilesByHash(false, dni, false, folderSrtPolicies, policy, policyImageKeys)
      .then(({ files, validities, }) => {
        files.exp = validities.qr
        resolve(files)
      })
      .catch((e) => {
        //SERVICE
        getPolicyImages(credential, policy)
          .then((images) => {
            images.isRefresh = true
            images.exp = moment().add(12, 'hours').toISOString()
            createFilesByHash(dni, folderSrtPolicies, policy, images)
              .then(() => {})
              .catch(() => {})
              .finally(() => {
                resolve(images)
              })
          })
          .catch((e) =>{
            reject(e)
          })
      })
  })
}

/**
 * @param {String} credential  credential (cuit) number
 * @param {String} dni         dni number
 * @param {String} policy      policy number
 * @param {Boolean} images     get images
 */
const getPolicy = (dniNumber, credential, policy, images = false) => {
  return new Promise((resolve, reject) => {
    const policyUrl = `${credentialsUrl}/${credential}/${policy}`

    request.get(policyUrl)
      .timeout(15000)
      .query(credentialsQuery)
      .then(({ body: credencial, }) => {
        credencial = objectToSnakeCase(credencial)

        credencial.fecha_nacimiento = moment(credencial.fecha_nacimiento).toISOString()
        credencial.poliza.desde = moment(credencial.poliza.desde).toISOString()
        credencial.poliza.hasta = moment(credencial.poliza.hasta).toISOString()

        if (images) {
          getOrCreateImageByHash(
            credential.toString(),
            dniNumber.toString(),
            policy.toString()
          )
            .then((images) => {
              credencial.poliza.imagenes = images
              resolve(credencial)
            })
            .catch((e) => reject(errorParser(credencial, 'SRT IMAGES')))

          return
        }

        resolve(credencial)
      })
      .catch((e) => reject(errorParser(e, 'SRT POLICIES')))
  })
}

export default {
  getCredentials,
  getPolicy,
  getOrCreateImageByHash,
}