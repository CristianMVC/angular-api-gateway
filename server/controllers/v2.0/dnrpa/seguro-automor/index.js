import moment                                                       from 'moment'
import { registerFont, loadImage, createCanvas, }                   from 'canvas'
import request                                                      from 'superagent'
import auth                                                         from './auth'
import img                                                          from './credential'
import config                                                       from '../../../../../config/env'
import { getFilesByHash, createFilesByHash, createHashString, }     from '../../../../helpers/base64Files'
import { assetsFolder, }                                            from '../../../../helpers/basePath'
const {
    url: urlSeguroAutomor,
} = config.ws2.dnrpa.seguroAutomotor

const folderDnrpaInsurance = 'dnrpa/seguros'
const insuranceKeys = [
    'qr',
    'frente',
]

registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular', })
registerFont(assetsFolder + '/fonts/Roboto-Bold.ttf', { family: 'Roboto-Bold', })
registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto', })

const createCredentialImage = (firstName, lastName, company, insuranceNumber, state, from, exp, year, brand, model, patent, chassis, motor) => {
    const getCredentialImagePromise = new Promise((resolve, reject) => {
        const canvas = createCanvas(461.597, 292.604)
        const ctx = canvas.getContext('2d')

        const parsdImg = img(firstName, lastName, company, insuranceNumber, state, from, exp, year, brand, model, patent, chassis, motor)

        loadImage(Buffer.from(parsdImg))
          .then((image) => {
            ctx.drawImage(image, 0, 0)

            const stringBase64 = canvas.toBuffer().toString('base64')

            resolve(stringBase64)
          })
          .catch((e) => {
            reject(e)
          })

        .catch((e) => {
          reject(e)
        })
    })

    return getCredentialImagePromise
}

/**
 * @param {String} domain Patente/N° placa del vehiculo
 */
const getInsurance = (domain) => {
    const getInsurancePromise = new Promise((resolve, reject) => {
        auth()
            .then(({ security: securityToken, kong: kongToken, }) => {
                request.get(`${urlSeguroAutomor}/${domain}`)
                    .set('Authorization', kongToken)
                    .set('Auth', securityToken)
                    .then(({ body: data, }) => {
                        const {
                            estado: state,
                        } = data

                        switch (state) {
                            case 'Verificar documentación':
                                resolve(data)
                                return
                        }

                        const {
                            año: year,
                            fechaVigenciaDesde: from,
                            fechaVigenciaHasta: exp,
                            Ramo: category,
                            nombreApellidoAsegurado: name,
                            nombreCompania: company,
                            marca: brand,
                            chasis: chassis,
                            modelo: model,
                            motor,
                            qr,
                            nroPoliza: insuranceNumber,
                        } = data

                        delete data.Ramo
                        delete data.año
                        delete data.qr

                        data.ano = year
                        data.ramo = category

                        data.fechaVigenciaDesde = moment(from, 'DD/MM/YYYY').toISOString()
                        data.fechaVigenciaHasta = moment(exp, 'DD/MM/YYYY').toISOString()

                        createCredentialImage(name, '', company, insuranceNumber, state, from, exp, year, brand, model, domain, chassis, motor)
                            .then((base64Credential) => {
                                data.imagenes =  {
                                    frente: base64Credential,
                                    qr,
                                }
                                resolve(data)
                            })
                            .catch((e) =>{
                                reject(e)
                            })
                    })
                    .catch((e) => {
                        reject(e)
                    })
            })
            .catch((e) => {
                reject(e)
            })
    })

    return getInsurancePromise
}


const getInsuranceData = (domain, dniNumber, withImages = false) => {
    const getInsuranceDataPromise = new Promise((resolve, reject) => {
        getInsurance(domain, dniNumber)
            .then((insuranceData) => {
                const { imagenes: images, nroPoliza: insuranceNumber, } = insuranceData

                if (!images) {
                    reject({
                        status: 404,
                        message: 'Not Found',
                        devMessage: 'No Insurance Images',
                    })
                    return
                }

                createFilesByHash(dniNumber, folderDnrpaInsurance, insuranceNumber, images)
                    .then(() => {
                        const extraData = domain + insuranceNumber
                        const hash = createHashString(dniNumber, extraData)
                        insuranceData.hash = hash

                        if (!withImages) {
                            delete insuranceData.imagenes
                        }

                        resolve(insuranceData)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })

    return getInsuranceDataPromise
}


/**
 *
 * @param {String} domain
 * @param {String} insuranceNumber
 * @param {String} dniNumber
 * @param {String} hashToCompare
 */
const getInsuranceImages = (domain, insuranceNumber, dniNumber, hashToCompare) => {
    const getInsuranceImages = new Promise((resolve, reject) => {
        const extraData = domain + insuranceNumber

        getFilesByHash(hashToCompare, dniNumber, extraData, folderDnrpaInsurance, insuranceKeys)
            .then((imagesRes) => {
                const { files, } = imagesRes
                resolve(files)
            })
            .catch((e) => {
                if (e.message === 'Invalid Hash for data provided') {
                    reject({
                        status: 400,
                        message: 'Bad Request',
                        devMessage: e.message,
                    })
                    return
                }

                getInsuranceData(domain, dniNumber, true)
                    .then(({ imagenes: images, }) => {
                        resolve(images)
                    })
                    .catch((e) => {
                        reject({
                            status: 404,
                            message: 'Not Found',
                            devMessage: e.message,
                        })
                    })
            })
    })

    return getInsuranceImages
}

export {
    getInsurance,
    getInsuranceImages,
    getInsuranceData,
}