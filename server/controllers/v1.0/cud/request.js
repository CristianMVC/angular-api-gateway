import request                      from 'superagent'
import sharp                        from 'sharp'
import config                       from '../../../../config/env'
import logger                       from '../../../../config/winston'
import moment                       from 'moment'
import {
    pgModelList,
    pgRequest,
    pgResponse,
    logPgError,
}                                   from '../../../models/pg'

const areaToCrop = {
    front: {
        top: 1267,
        left: 147,
        width: 387,
        height: 273,
    },
    back: {
        top: 1267,
        left: 550,
        width: 385,
        height: 250,
    },
}


 /**
  *
  * @param {Buffer} imageBuffer
  * @param {Number} reduceForm
  * @param {Number} reduceCerts
  */

const cropCudImage = (imageBuffer, reduceForm, reduceCerts) => {
    const { back: backArea, front: frontArea, } = areaToCrop

    let backSharp = sharp(imageBuffer).extract(backArea)
    let frontSharp = sharp(imageBuffer).extract(frontArea)

    if (reduceCerts) {
        backSharp = backSharp.resize({
            width: parseInt(backArea.width * reduceCerts),
            fit: sharp.fit.inside,
        })

        frontSharp = frontSharp.resize({
            width: parseInt(frontArea.width * reduceCerts),
            fit: sharp.fit.inside,
        })
    }

    const sharpPromises = [
        frontSharp.toBuffer(),
        backSharp.toBuffer(),
    ]

    if (reduceForm) {
        const formSharp = sharp(imageBuffer).resize({
            width: reduceForm,
            fit: sharp.fit.inside,
        })

        sharpPromises.push(formSharp.toBuffer())
    }

    const cropPromise = new Promise((resolve, reject) => {
        Promise.all(sharpPromises)
            .then((imageBuffers) => {
                const front64 = imageBuffers[0].toString('base64')
                const back64 = imageBuffers[1].toString('base64')

                const base64Object = { front64, back64, }

                if (imageBuffers.length === 3) {
                    const image64 = imageBuffers[2].toString('base64')
                    base64Object.form64 = image64
                }

                resolve(base64Object)
            })
            .catch((e) => {
                reject(e)
            })
    })

    return cropPromise
}
const getCertificadoUrl = `${config.ws.snr.cudValidezLegal.url}/`

/**
 *
 * @param {Number} number
 * @param {String} gender
 * @param {String} idUser
 * @param {Number} reduceForm
 * @param {Number} reduceCerts
 */

const getCertificado = (number, gender, idUser, reduceForm = false, reduceCerts = false, withOutImages = false) => {
    const query = {
        type: gender,
        number: number,
    }

    const reqObject = new pgRequest({}, query, '', 'GET', getCertificadoUrl)

    const getCertificadoPromise  = new Promise((resolve, reject)=> {
        request
            .get(getCertificadoUrl)
            .query(query)
            .then((res) => {
                try {
                    const response = res.body

                    // respuesta modificada
                    const properties = response.cud.properties
                    delete response.cud.properties
                    Object.assign(response, properties)


                    response.acompanante = (response.acompanante == 'SI')
                    response.asignacionFamiliar = (response.asignacionFamiliar == 'SI')
                    response.desde = moment(response.desde, 'YYYY-MM-DD').utc().toISOString()
                    response.hasta = moment(response.hasta).utc().toISOString()
                    response.fechaNacimiento = moment(response.fechaNacimiento, 'YYYY-MM-DD').utc().toISOString()
                    response.fechaInicioDanio = moment(response.fechaInicioDanio, 'YYYY-MM-DD').utc().toISOString()

                    if (withOutImages) {
                        resolve(response)
                        return
                    }

                    const { front: image64, token, } = response.cud

                    const originaImageBuffer = Buffer.from(image64, 'base64')

                    const sharpObject = sharp(originaImageBuffer)

                    //const areaToCropFinale = getAreaToCrop(reduce)

                    const metadataPromise = reduceForm ? sharpObject.metadata() : Promise.reject()

                    metadataPromise
                        .then(({ width, }) => {
                            cropCudImage(originaImageBuffer, parseInt(width * reduceForm), reduceCerts)
                                .then(({ back64, front64, form64: image64Reduced, }) => {
                                    response.cud = {
                                        front: front64,
                                        back: back64,
                                        form: image64Reduced || image64,
                                        token: token,
                                    }

                                    const qr = response.qr.replace('data:image/png;base64,', '')

                                    response.qr = qr

                                    resolve(response)
                                })
                                .catch((e) => {
                                    reject({
                                        message: 'Crop image Error: ' + e.message,
                                        status: 500,
                                        devMessage: e.stack,
                                    })
                                })
                        })
                        .catch((e) => {
                            cropCudImage(originaImageBuffer, false, reduceCerts)
                                .then(({ back64, front64, }) => {
                                    response.cud = {
                                        front: front64,
                                        back: back64,
                                        form: image64,
                                        token: token,
                                    }

                                    const qr = response.qr.replace('data:image/png;base64,', '')

                                    response.qr = qr

                                    resolve(response)
                                })
                                .catch((e) => {
                                    reject({
                                        message: 'Crop image Error: ' + (e ? e.message : 'Unkown'),
                                        status: 500,
                                        devMessage: e.stack,
                                    })
                                })
                        })
                } catch (e) {
                    reject({
                        message: (e ? e.message : 'Unkown'),
                        status: 503,
                        devMessage: e.stack,
                    })
                }
            })
            .catch((e) => {
                const { status, stack, response, message: errMessage, } = e

                const message = (response && response.text) ? response.text : errMessage

                reject({
                    message: message,
                    status: status,
                    devMessage: stack,
                })

                const header = response && response.headers ? response.headers : {}
                const resObject = new pgResponse(status, header, message)
                logPgError(idUser, pgModelList.cudCertificado, reqObject, resObject)
            })
    })

    return getCertificadoPromise
}

export {
    getCertificado,
}
