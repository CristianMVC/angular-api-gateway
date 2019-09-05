import Promise from 'bluebird'
import request from 'superagent'
import config from './../../../../../config/env'
// eslint-disable-next-line no-unused-vars
import logger from './../../../../../config/winston'

const { trasplantados, } = config.ws2.incucai

const trasplantadosUrlV3 = `${trasplantados.url}/v3.0/trasplantados/credencial`
const trasplantadosUrlV2 = `${trasplantados.url}/v2.0/trasplantados/credencial`

/**
 * @param {String} dniNumber
 * @param {String} gender
 */
const getCredentials = (dniNumber, gender) => {
  return new Promise((resolve, reject) => {
    const getCredentialQuery = {
      id_tipo_documento: 1,
      nro_documento: dniNumber,
      sexo: gender,
      token: trasplantados.query.token,
    }

    request
      .get(trasplantadosUrlV3)
      .query(getCredentialQuery)
      .timeout(80000)
      .then(({ body: data, }) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })
}

/**
 * @param {Number} credential
 */
const getCredential = (credential) => {
  return new Promise((resolve, reject) => {
    const getCredentialUrl = `${trasplantadosUrlV3}/${credential}`
    const getCredentialQuery = trasplantados.query

    request
      .get(getCredentialUrl)
      .timeout(80000)
      .query(getCredentialQuery)
      .then(({ body: data, }) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })
}

/**
 * @param {String} date
 */
const getExpiredCredentials = (date) => {
  return new Promise((resolve, reject) => {
    const getCredentialUrl = `${trasplantadosUrlV2}/vencidas`

    const getCredentialQuery = trasplantados.query

    Object.assign(getCredentialQuery, { fecha: date, })

    request
      .get(getCredentialUrl)
      .timeout(80000)
      .query(getCredentialQuery)
      .then(({ body: data, }) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })
}

export default {
  getCredentials,
  getCredential,
  getExpiredCredentials,
}