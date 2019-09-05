import jwt from 'jsonwebtoken'
import request from './request'
import config from '../../../../config/env'
import logger from '../../../../config/winston'
import APIError from '../../../helpers/APIError'
import { pgModelList, } from '../../../models/pg-utils'

/**
 * licenciaDigitalDemo
 * @param options
 * @param {String} idUser
 */
export default function (options, idUser) {
  return new Promise((resolve, reject) => {
    logger.log('debug', 'Model::licenciaNacionalDigital')

    const {
      document_type: tipodocumento,
      document_number: nrodocumento,
      gender: sexo,
      imagenes,
    } = options

    request
      .get({
        url: config.ws.seguridadVial.licenciaDigital.url,
        query: {
          tipodocumento,
          nrodocumento,
          sexo,
          imagenes,
        },
        jsonRequest: false,
      }, idUser, pgModelList.licenciaV2)
      .then((d) => {
        const payload = jwt.decode(d)
        resolve(payload)
      })
      .catch((e) => reject(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
      })))
  })
}
