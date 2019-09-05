import request from 'superagent'
import sharp from 'sharp'
import { isPlainObject, assign, } from 'lodash'
import config from '../../../../config/env'
import TlsReject from '../../../helpers/TlsReject'
import { logPgError, pgModelList, pgRequest, pgResponse, } from '../../../models/pg'


const qrSharpConfig = {
    width: 200,
    height: 200,
    fit: sharp.fit.inside,
}

const sortAplicaciones = (vacunas) => {
    const vacunasSorted = vacunas.map((vacuna) => {
        vacuna.aplicaciones.sort((a, b)=> {
            if (a.idSniAplicacion > b.idSniAplicacion) {
                return -1
            } else if (a.idSniAplicacion < b.idSniAplicacion) {
                return 1
            }

            return 0
        })

        return vacuna
    })

    return vacunasSorted
}

const aplicacionesToVacunas = (aplicaciones) => {
    const vacunasObject = {}

    for (const aplicacion of aplicaciones) {
        const { idSniVacuna, sniVacunaNombre, } = aplicacion

        if (!vacunasObject[idSniVacuna]) {
            vacunasObject[idSniVacuna] = {
                    idSniVacuna,
                    sniVacunaNombre,
                    aplicaciones: [
                        aplicacion,
                    ],
            }
            continue
        }

        vacunasObject[idSniVacuna].aplicaciones.push(aplicacion)
    }

    const vacunas = Object.values(vacunasObject)

    return sortAplicaciones(vacunas)
}

const urlAplicacionesVacuna = `${config.ws2.nomivac.index.url}/aplicacionesVacunasCiudadano`

/**
 *
 * @param {Number} dniNumber
 * @param {String} idUser
 */

const getVacunasCiudadano = (dniNumber, idUser, sexo) => {
    const data = {
        nroDoc: dniNumber,
        sexo,
    }

    const body = assign(config.ws2.nomivac.index.body, data)

    TlsReject.set()

    const requestPromise = request
                                .post(urlAplicacionesVacuna)
                                .send(body)
                                .timeout({
                                    deadline: 20000, // but allow 30 secs for the file to finish loading.
                                  })

    const reqObject = new pgRequest({}, {}, JSON.stringify(body), 'POST', urlAplicacionesVacuna)

    const vacunasPromise = new Promise((resolve, reject) => {
        requestPromise
            .then((res) => {
                try {
                    const { body: v, } = res
                    let rejectValue
                    switch (v.resultado) {
                        case 'OK':
                            if (!isPlainObject(v)) {
                                rejectValue = {
                                    status: 503,
                                    devMessage: 'Parser Error, Error en el WebService Externo',
                                }
                            }
                            break
                        case 'ERROR':
                            if (!v || !v.body) {
                                rejectvalue = {
                                    status: 404,
                                    message: 'Not Found',
                                    devMessage: 'Error en WebService Externo:404 provisional',
                                }
                                break
                            }

                            rejectValue = {
                                status: 503,
                                message: (v.body.description),
                                devMessage: 'Error en WebService Externo',
                            }
                            break
                        case 'ERROR_AUTENTICACION':
                            rejectValue = {
                                status: 503,
                                message: (v.body.description),
                                devMessage: 'Error en WebService Externo::Unauthorized',
                            }
                            break
                        case 'REGISTRO_NO_ENCONTRADO':
                            rejectValue = {
                                status: 404,
                                message: 'Not Found',
                            }
                            break
                        default:
                            rejectValue = {
                                status: 503,
                                message: 'Error en WebService Externo',
                                devMessage: 'Error en WebService Externo',
                            }
                            break
                    }

                    if (rejectValue) { //si se causó un error
                        const { status, headers, text, } = res
                        const resObject = new pgResponse(status, headers, text)

                        logPgError(idUser, pgModelList.aplcacionesVacunasV2, reqObject, resObject)

                        reject(rejectValue)
                        return
                    }


                    const aplicaciones = (v) ? v.aplicacionesVacunasCiudadano.aplicacionVacunaCiudadano : []

                    const vacunas = aplicacionesToVacunas(aplicaciones)

                    const response = {
                        vacunas: vacunas,
                    }

                    if (!v.qr) {
                        response.qr = null
                        resolve(response)
                        return
                    }

                    const qrBuffer = Buffer.from(v.qr, 'base64')

                    const qrResizedBufferPromise = sharp(qrBuffer)
                                                .resize(qrSharpConfig)
                                                .toBuffer()

                    qrResizedBufferPromise
                        .then((qrResizedBuffer) => {
                            const qrResizedBase64 = qrResizedBuffer.toString('base64')
                            response.qr = qrResizedBase64

                            resolve(response)
                        })
                        .catch((e) => {
                            reject({
                                status: 503,
                                message: 'Error en el ws externo::QR no es válido',
                                devMessage: e.message,
                            })
                        })
                } catch (e) {
                    reject({
                        status: 500,
                        message: `Error de composicion en el ws Externo ${e.message}`,
                    })
                }
            })
            .catch((e) => {
                reject({
                    status: (e.timeout ? 404 : e.status),
                    message: (e.message),
                    devMessage: (e.devMessage),
                })
                const resObject = new pgResponse(e.status, e.header, e.message)
                logPgError(idUser, pgModelList.aplcacionesVacunasV2, reqObject, resObject)
            })
    })

    return vacunasPromise
}

export {
    getVacunasCiudadano,
}
