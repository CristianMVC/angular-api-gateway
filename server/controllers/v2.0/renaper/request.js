import request                      from 'superagent'
import { parseString, }             from 'xml2js'
import { readFileSync, }            from 'fs'
import Promise                      from 'bluebird'
import moment                       from 'moment'
import TlsReject                    from '../../../helpers/TlsReject'
import config                       from '../../../../config/env'

const key = readFileSync(`${config.ca.dir}/renaper-privateKey.pem`)
const cert = readFileSync(`${config.ca.dir}/renaper-publicCert.pem`)

const {
    url: urlGetImagesDNI,
    headers: headersGetImagesDNI,
    dni,
} = config.ws2.renaper

const {
    headers: headersGetDNI,
    url: urlGetDNI,
} = dni


const parseXmlDni = (xmlToParse) => {
    const parseXmlDniPromise = new Promise((resolve, reject) => {
        parseString(xmlToParse, { explicitArray: false, ignoreAttrs: true, normalize: true, }, (e, xmlParsed) => {
            if (e) {
                const { message, } = e

                reject({
                    status: 503,
                    message,
                })
                return
            }

            let response

            try {
                const xmlResponse = xmlParsed['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:obtenerUltimoEjemplarResponse']['DatosSalida']

                const {
                    codigoError: codigo_error,
                    nroError: nro_error,
                    descripcionError: descripcion_error,
                } = xmlResponse

                let error

                switch (parseInt(nro_error)) {
                    case 0:
                    case 99:
                        break
                    case 2:
                    case 4:
                        error = {
                            status: 404,
                            message: descripcion_error,
                            errorCode: nro_error,
                        }
                        break
                    default:
                        error = {
                            status: 500,
                            message: descripcion_error,
                            errorCode: nro_error,
                        }
                        break
                }

                if (error) {
                    reject(error)
                    return
                }

                const {
                    ID_TRAMITE_PRINCIPAL: id_tramite_princial,
                    ID_TRAMITE_TARJETA_REIMPRESA: id_tramite_tarjeta_reimpresa,
                    EJEMPLAR: ejemplar,
                    VENCIMIENTO: vencimiento,
                    EMISION: emision,
                    codigof: codigo_fallecimiento,
                    fechaf: fecha_fallecimiento,
                    mensaf: mensaje_fallecimiento,
                    idciudadano: id_ciudadano,
                    fechaNacimiento: fecha_nacimiento,
                    cpostal: codigo_postal,
                    cuil,
                    calle,
                    numero,
                    piso,
                    nombres,
                    pais,
                    municipio,
                    provincia,
                    monoblock,
                    barrio,
                    ciudad,
                    apellido,
                } = xmlResponse

            response = {
                id_tramite_princial,
                id_tramite_tarjeta_reimpresa,
                ejemplar,
                vencimiento: moment(vencimiento, 'DD/MM/YYYY').toISOString(),
                emision: moment(emision, 'DD/MM/YYYY').toISOString(),
                codigo_error,
                codigo_fallecimiento,
                fecha_fallecimiento,
                mensaje_fallecimiento,
                id_ciudadano,
                nro_error,
                descripcion_error,
                fecha_nacimiento: moment(fecha_nacimiento, 'YYYY-MM-DD').toISOString(),
                codigo_postal,
                cuil,
                calle,
                numero,
                piso,
                nombres,
                apellido,
                pais,
                municipio,
                provincia,
                monoblock,
                barrio,
                ciudad,
            }

            } catch ({ message, }) {
                reject({
                    status: 503,
                    message,
                })
                return
            }

            resolve(response)
        })
    })
    return parseXmlDniPromise
}

const parseXmlDniImages = (xmlToParse) => {
    const parseXmlDniPromise = new Promise((resolve, reject) => {
        parseString(xmlToParse, { explicitArray: false, ignoreAttrs: true, normalize: true, }, (e, xmlParsed) => {
            if (e) {
                const { message, } = e

                reject({
                    status: 503,
                    message,
                })
                return
            }

            let xmlResponse

            try {
                xmlResponse = xmlParsed['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:obtenerDNIResponse']['DatosSalida']
            } catch ({ message, }) {
                reject({
                    status: 503,
                    message,
                })
                return
            }

            const {
                codigo: code,
                mensaje: message,
            } = xmlResponse

            let error

            switch (parseInt(code)) {
                case 2:
                case 3:
                    error = {
                        status: 400,
                        message,
                    }
                    break
                case 4:
                    error = {
                        status: 404,
                        message,
                        devMessage: 'Not Found',
                    }
                    break
                default:
                    break
            }

            if (error) {
                reject(error)
                return
            }

            const {
                qr,
                frente,
                dorso,
            } = xmlResponse

            resolve({ qr, frente, dorso, })
        })
    })
    return parseXmlDniPromise
}



/**
 *
 * @param {String} dniNumber
 * @param {String} gender
 */
const getDNI = (dniNumber, gender) => {
    return new Promise((resolve, reject) => {
      const requestBody =
        `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:miniteriorwsdl">
            <soapenv:Header/>
            <soapenv:Body>
                <urn:obtenerUltimoEjemplar soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <DatosEntrada xsi:type="urn:DatosEntrada" xmlns:urn="urn:mininteriorwsdl">
                        <dni xsi:type="xsd:int">${dniNumber}</dni>
                        <sexo xsi:type="xsd:string">${gender}</sexo>
                    </DatosEntrada>
                </urn:obtenerUltimoEjemplar>
            </soapenv:Body>
        </soapenv:Envelope>`

        TlsReject.set()

      request
        .post(urlGetDNI)
        .set(headersGetDNI)
        .key(key)
        .cert(cert)
        .timeout(20000)
        .send(requestBody)
        .then(({ text, }) => {
            parseXmlDni(text)
                .then(resolve)
                .catch(reject)
        })
        .catch((e) => {
            const { message, } = e

            const error = {
                status: 503,
                message,
            }
            reject(error)
        })
    })
  }



/**
 *
 * @param {String} dniNumber
 * @param {String} gender
 */
const getDNIimages = (dniNumber, gender) => {
    const getDNIimagesPromise = new Promise((resolve, reject) => {
        const requestBody =
        `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:miniteriorwsdl">
            <soapenv:Header/>
            <soapenv:Body>
            <urn:obtenerPDF soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                <DatosEntrada xsi:type="urn:DatosEntrada" xmlns:urn="urn:mininteriorwsdl">
                    <!--You may enter the following 2 items in any order-->
                    <dni xsi:type="xsd:int">${dniNumber}</dni>
                    <sexo xsi:type="xsd:string">${gender}</sexo>
                </DatosEntrada>
            </urn:obtenerPDF>
            </soapenv:Body>
        </soapenv:Envelope>`

        request.post(urlGetImagesDNI)
                .set(headersGetImagesDNI)
                .send(requestBody)
                .type('text/xml')
                .timeout(20000)
                .then(({ text: data, }) => {
                    if (!data) {
                        reject({
                            status: 503,
                            message: 'Empty body',
                        })
                        return
                    }

                    parseXmlDniImages(data)
                        .then(resolve)
                        .catch(reject)
                })
                .catch(({ message, }) => {
                    reject({
                        status: 503,
                        message,
                    })
                })
    })

    return getDNIimagesPromise
}

const getDNIData = (dniNumber, gender) => {
    const getDNIDataPromise = new Promise((resolve, reject) => {
        const getDNIPromise = getDNI(dniNumber, gender)

        getDNIPromise
            .then((dniData) => {
                dniData.sexo = gender
                dniData.nro_dni = dniNumber
                const getDNIimagesPromise = getDNIimages(dniNumber, gender)

                getDNIimagesPromise
                    .then((dniImagesRes) => {
                        dniData.imagenes = dniImagesRes
                    })
                    .catch((e) => {
                        dniData.imagenes = null
                    })
                    .finally(() => {
                        resolve(dniData)
                    })
            })
            .catch(reject)

        // eslint-disable-next-line comma-dangle
        /* Promise.all([getDNIPromise, getDNIimagesPromise])
            // eslint-disable-next-line comma-dangle
            .then(([dniData, dniImages]) => {
                dniData.imagenes = {}//dniImages

                resolve(dniData)
            })
            .catch(reject) */
    })
    return getDNIDataPromise
}

export {
    getDNIimages,
    getDNIData,
}