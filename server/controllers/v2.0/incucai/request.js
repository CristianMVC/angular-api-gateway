import request           from 'superagent'
import config            from '../../../../config/env'
import moment            from 'moment'
import { sendMail, }     from '../../../helpers/mailgun'
import messageTemplate   from './template'


const { url: donorUrl, query: donorQuery, } = config.ws2.incucai.donantes

const { mail: correo, } = config.ws2.mailgun

const { url: consultaUrl, } = config.ws2.incucai.consulta

const { url: donanteUrl, query: donanteToken, } = config.ws2.incucai.donante

const getDonor = (dniNumber, birthdate) => {
    const queryParams = {
        fecha_nacimiento: birthdate,
    }
    const donorQueryFinal = Object.assign(donorQuery, queryParams)
    const donorUrlFinal = `${donorUrl}/${dniNumber}`
    const getDonorPromise = new Promise((resolve, reject) => {
        request
        .get(donorUrlFinal)
        .query(donorQueryFinal)
        .timeout(20000)
        .then(({ body: data, }) => {
            data.fecha_nacimiento = moment(data.fecha_nacimiento).toISOString()
            data.fecha_registro = moment(data.fecha_registro).toISOString()
            data.fecha_modificacion = data.fecha_modificacion ? moment(data.fecha_modificacion).toISOString() : data.fecha_modificacion
            data.donante = data.donante === 'SI'

            resolve(data)
        })
        .catch((e) => {
            if (e.status === 404) {
                reject({
                    message: e.message,
                    status: 404,
                    devMessage: e.response ? e.response.text : e.message,
                })
                return
            }

            reject({
                status: 503,
                message: e.message,
                devMessage: e.response ? e.response.text : e.message,
            })
        })
    })

    return getDonorPromise
}

const consultaRequest = (path, opt) => {
    const urlFinal = consultaUrl + path
    const getConsultaPromise = new Promise((resolve, reject) => {
        request
        .get(urlFinal)
        .query(opt)
        .then(({ body: data, }) => {
            resolve(data)
        })
        .catch((e) => {
            if (e.status === 404) {
                reject({
                    message: e.message,
                    status: 404,
                    devMessage: e.response ? e.response.text : e.message,
                })
                return
            }

            reject({
                status: 503,
                message: e.message,
                devMessage: e.response ? e.response.text : e.message,
            })
        })
    })

    return getConsultaPromise
}

const getEstadosCiviles = () => {
    const path = 'v1.0/estados_civiles'

    return consultaRequest(path)
}

const getProvincias = () => {
    const path = 'v1.0/provincias'

    return consultaRequest(path)
}

const getPartidos = (idPartido) => {
    const opt = {
        id_partido: idPartido,
    }

    const path = 'v2.0/partidos/'

    return consultaRequest(path, opt)
}

const getLocalidades = (idLocalidad) => {
    const opt = {
        id_localidad: idLocalidad,
    }

    const path = 'v2.0/localidades/'

    return consultaRequest(path, opt)
}

const getPropositos = () => {
    const path = 'v1.0/dona_proposito'

    return consultaRequest(path)
}

const getOrganos = () => {
    const path = 'v1.0/dona'

    return consultaRequest(path)
}

const getTiposDocumentos = () => {
    const path = '/v1.0/tiposdedocumento'

    return consultaRequest(path)
}

const newDonor = ({ docType, dniNumber, cuil, firstName, lastName, gender, mail, birthdate, estadoCivil, telefono, calle, numero, piso, departamento,
    idProvincia, idPartido, idLocalidad, nombreApellidoFamiliar, vinculo, mailFamiliar, telefonoFamiliar, idProposito, donante, dona,
    urlValidacion, confirmado,
}) => {
    docType = docType ? docType : 'PAS'
    const newDonorPromise = new Promise((resolve, reject) => {
        getTiposDocumentos()
        .then((v) => {
            const tipoDescrip = v.find((element) => element.descripcion == docType)

            if (!tipoDescrip) {
                reject({
                    message: 'El tipo de documento no se encuentra en el listado',
                    status: 400,
                    devMessage: 'El tipo de documento no se encuentra en el listado',
                })
                return
            }

            const requisitos = {
                id_tipo_documento: tipoDescrip.id_tipo_documento.toString(),
                nro_documento: dniNumber,
                apellido: lastName,
                nombre: firstName,
                sexo: gender,
                mail,
                fecha_nacimiento: birthdate,
                calle,
                numero,
                telefono,
                id_provincia: idProvincia,
                id_partido: idPartido,
                id_localidad: idLocalidad,
                donante,
                dona,
                id_proposito: idProposito,
                nombre_apellido_familiar: nombreApellidoFamiliar,
                vinculo,
                telefono_familiar: telefonoFamiliar,
                mail_familiar: mailFamiliar,
                piso,
                departamento,
                id_estado_civil: estadoCivil,
                url_validacion: urlValidacion,
            }

            const q = {
                token: donanteToken.token,
                confirmado,
            }

            const include = dona.includes('1')

            request
            .post(donanteUrl)
            .query(q)
            .send(requisitos)
            .then(({ body: data, }) => {
                data.fecha_nacimiento = moment(data.fecha_nacimiento).toISOString()
                data.fecha_registro = data.fecha_registro ? moment(data.fecha_registro).toISOString() : data.fecha_registro
                data.fecha_modificacion = data.fecha_modificacion ? moment(data.fecha_modificacion).toISOString() : data.fecha_modificacion
                data.donante = data.donante === 'SI'
                let text = 'Femenino'
                let doc = dniNumber
                let manifest = 'Quiero ser donante'
                let manifestDetalle = 'Manifestación afirmativa a la donación de órganos y tejidos.'
                const msj = messageTemplate.message
                const subject = 'Expresión de voluntad de donar órganos y tejidos'

                if (gender != 'F') {
                    text = 'Masculino'
                }

                if (docType != 'DNI') {
                    doc = cuil
                }

                if (donante != 'SI') {
                    manifest = 'No quiero ser donante'
                    manifestDetalle = 'Manifestación de oposición a la donación de órganos y tejidos.'
                }

                resolve(data)

                const mailPromise = new Promise((resolve, reject)=>{
                    const array = []
                    let prop = ''
                    let organosList = ''
                    const orgPush = []
                    array.push(getEstadosCiviles())
                    array.push(getProvincias())
                    array.push(getPartidos(idPartido))
                    array.push(getLocalidades(idLocalidad))
                    array.push(getPropositos())
                    array.push(getOrganos())

                    Promise.all(array)
                        // eslint-disable-next-line comma-spacing
                        .then(([estadosCivil, provincias, partidos, localidades, propositos, organos,]) => {
                            const estado = estadosCivil.find((element) => element.id == estadoCivil)

                            const provincia = provincias.find((element) => element.id == idProvincia)

                            const partido = partidos.descripcion

                            const localidad = localidades.descripcion

                            if (idProposito) {
                                prop = propositos.find((element) => element.id == idProposito)
                                prop = prop.descripcion
                            } else {
                                prop = 'Ninguno'
                                organosList = 'Ninguno'
                            }

                            if (include) {
                                organosList = 'Todos los organos'
                            } else {
                                dona.map((organo) => {
                                    const item = organos.find((element) => element.id == organo)
                                    orgPush.push(' ' + item.descripcion)
                                    organosList = orgPush
                                })
                            }

                            piso = piso ? piso : '-'
                            departamento = departamento ? departamento : '-'
                            vinculo = vinculo ? vinculo : '-'
                            mailFamiliar = mailFamiliar ? mailFamiliar : '-'
                            telefonoFamiliar = telefonoFamiliar ? telefonoFamiliar : '-'
                            nombreApellidoFamiliar = nombreApellidoFamiliar ? nombreApellidoFamiliar : '-'
                            mail = correo ? correo : mail

                            const msjParse = msj.replace('%manifestacion%', manifest)
                                                .replace('%manifestacionDetalle%', manifestDetalle)
                                                .replace('%dona%', organosList)
                                                .replace('%id_proposito%', prop)
                                                .replace('%id_tipo_documento%', docType)
                                                .replace('%nro_documento%', doc)
                                                .replace(/%nombre%/g, firstName)
                                                .replace('%apellido%', lastName)
                                                .replace('%sexo%', text)
                                                .replace('%mail%', mail)
                                                .replace('%fecha_nacimiento%', birthdate)
                                                .replace('%id_estado_civil%', estado.descripcion)
                                                .replace('%telefono%', telefono)
                                                .replace('%calle%', calle)
                                                .replace('%numero%', numero)
                                                .replace('%piso%', piso)
                                                .replace('%departamento%', departamento)
                                                .replace('%id_provincia%', provincia.descripcion)
                                                .replace('%id_partido%', partido)
                                                .replace('%id_localidad%', localidad)
                                                .replace('%nombre_apellido_familiar%', nombreApellidoFamiliar)
                                                .replace('%vinculo%', vinculo)
                                                .replace('%mail_familiar%', mailFamiliar)
                                                .replace('%telefono_familiar%', telefonoFamiliar)

                            sendMail(mail, subject, msjParse)

                            resolve()
                        })
                        .catch((e) => {
                            reject(e)
                        })
                })

                return mailPromise
            })
            .catch((e) => {
                if (e.status === 404) {
                    reject({
                        message: e.message,
                        status: 404,
                        devMessage: e.response ? e.response.text : e.message,
                    })
                    return
                }

                if (e.status === 409) {
                    reject({
                        message: e.message,
                        status: 409,
                        devMessage: e.response ? e.response.text : e.message,
                    })
                    return
                }

                reject({
                    status: 503,
                    message: e.message,
                    devMessage: e.response ? e.response.text : e.message,
                })
            })
        })
        .catch((e) => {
            reject({
                message: 'Falló en el servicio externo, error en el listado de documentos',
                status: 503,
                devMessage: 'Falló en el servicio externo, error en el listado de documentos',
            })
        })
    })

    return newDonorPromise
}

const updateDonor = ({ docType, dniNumber, cuil, firstName, lastName, gender, mail, birthdate, estadoCivil, telefono, calle, numero, piso, departamento,
    idProvincia, idPartido, idLocalidad, nombreApellidoFamiliar, vinculo, mailFamiliar, telefonoFamiliar, idProposito, donante, dona,
    urlValidacion, confirmado,
}) => {
    docType = docType ? docType : 'PAS'
    const putDonorPromise = new Promise((resolve, reject) => {
        getTiposDocumentos()
        .then((v) => {
            const tipoDescrip = v.find((element) => element.descripcion == docType)

            if (!tipoDescrip) {
                reject({
                    message: 'El tipo de documento no se encuentra en el listado',
                    status: 400,
                    devMessage: 'El tipo de documento no se encuentra en el listado',
                })
                return
            }

            const requisitos = {
                id_tipo_documento: tipoDescrip.id_tipo_documento.toString(),
                nro_documento: dniNumber,
                apellido: lastName,
                nombre: firstName,
                sexo: gender,
                mail,
                fecha_nacimiento: birthdate,
                calle,
                numero,
                telefono,
                id_provincia: idProvincia,
                id_partido: idPartido,
                id_localidad: idLocalidad,
                donante,
                dona,
                id_proposito: idProposito,
                nombre_apellido_familiar: nombreApellidoFamiliar,
                vinculo,
                telefono_familiar: telefonoFamiliar,
                mail_familiar: mailFamiliar,
                piso,
                departamento,
                id_estado_civil: estadoCivil,
                url_validacion: urlValidacion,
            }

            const q = {
                token: donanteToken.token,
                confirmado,
            }

            const include = dona.includes('1')

            request
            .put(donanteUrl)
            .query(q)
            .send(requisitos)
            .then(({ body: data, }) => {
                data.fecha_nacimiento = moment(data.fecha_nacimiento).toISOString()
                data.fecha_registro = data.fecha_registro ? moment(data.fecha_registro).toISOString() : data.fecha_registro
                data.fecha_modificacion = data.fecha_modificacion ? moment(data.fecha_modificacion).toISOString() : data.fecha_modificacion
                data.donante = data.donante === 'SI'
                let text = 'Femenino'
                let doc = dniNumber
                let manifest = 'Quiero ser donante'
                let manifestDetalle = 'Manifestación afirmativa a la donación de órganos y tejidos.'
                const msj = messageTemplate.message
                const subject = 'Modificaste tu expresión de voluntad de donar órganos y tejidos'

                if (gender != 'F') {
                    text = 'Masculino'
                }

                if (docType != 'DNI') {
                    doc = cuil
                }

                if (donante != 'SI') {
                    manifest = 'No quiero ser donante'
                    manifestDetalle = 'Manifestación de oposición a la donación de órganos y tejidos.'
                }

                resolve(data)

                const mailPromise = new Promise((resolve, reject)=>{
                    const array = []
                    let prop = ''
                    let organosList = ''
                    const orgPush = []
                    array.push(getEstadosCiviles())
                    array.push(getProvincias())
                    array.push(getPartidos(idPartido))
                    array.push(getLocalidades(idLocalidad))
                    array.push(getPropositos())
                    array.push(getOrganos())

                    Promise.all(array)
                        // eslint-disable-next-line comma-spacing
                        .then(([estadosCivil, provincias, partidos, localidades, propositos, organos,]) => {
                            const estado = estadosCivil.find((element) => element.id == estadoCivil)

                            const provincia = provincias.find((element) => element.id == idProvincia)

                            const partido = partidos.descripcion

                            const localidad = localidades.descripcion

                            if (idProposito) {
                                prop = propositos.find((element) => element.id == idProposito)
                                prop = prop.descripcion
                            } else {
                                prop = 'Ninguno'
                                organosList = 'Ninguno'
                            }

                            if (include) {
                                organosList = 'Todos los organos'
                            } else {
                                dona.map((organo) => {
                                    const item = organos.find((element) => element.id == organo)
                                    orgPush.push(' ' + item.descripcion)
                                    organosList = orgPush
                                })
                            }

                            piso = piso ? piso : '-'
                            departamento = departamento ? departamento : '-'
                            vinculo = vinculo ? vinculo : '-'
                            mailFamiliar = mailFamiliar ? mailFamiliar : '-'
                            telefonoFamiliar = telefonoFamiliar ? telefonoFamiliar : '-'
                            nombreApellidoFamiliar = nombreApellidoFamiliar ? nombreApellidoFamiliar : '-'
                            mail = correo ? correo : mail

                            const msjParse = msj.replace('%manifestacion%', manifest)
                                                .replace('%manifestacionDetalle%', manifestDetalle)
                                                .replace('%dona%', organosList)
                                                .replace('%id_proposito%', prop)
                                                .replace('%id_tipo_documento%', docType)
                                                .replace('%nro_documento%', doc)
                                                .replace(/%nombre%/g, firstName)
                                                .replace('%apellido%', lastName)
                                                .replace('%sexo%', text)
                                                .replace('%mail%', mail)
                                                .replace('%fecha_nacimiento%', birthdate)
                                                .replace('%id_estado_civil%', estado.descripcion)
                                                .replace('%telefono%', telefono)
                                                .replace('%calle%', calle)
                                                .replace('%numero%', numero)
                                                .replace('%piso%', piso)
                                                .replace('%departamento%', departamento)
                                                .replace('%id_provincia%', provincia.descripcion)
                                                .replace('%id_partido%', partido)
                                                .replace('%id_localidad%', localidad)
                                                .replace('%nombre_apellido_familiar%', nombreApellidoFamiliar)
                                                .replace('%vinculo%', vinculo)
                                                .replace('%mail_familiar%', mailFamiliar)
                                                .replace('%telefono_familiar%', telefonoFamiliar)

                            sendMail(mail, subject, msjParse)

                            resolve()
                        })
                        .catch((e) => {
                            reject(e)
                        })
                })

                return mailPromise
            })
            .catch((e) => {
                if (e.status === 404) {
                    reject({
                        message: e.message,
                        status: 404,
                        devMessage: e.response ? e.response.text : e.message,
                    })
                    return
                }

                if (e.status === 409) {
                    reject({
                        message: e.message,
                        status: 409,
                        devMessage: e.response ? e.response.text : e.message,
                    })
                    return
                }

                reject({
                    status: 503,
                    message: e.message,
                    devMessage: e.response ? e.response.text : e.message,
                })
            })
        })
        .catch((e) => {
            reject({
                message: 'Falló en el servicio externo, error en el listado de documentos',
                status: 503,
                devMessage: 'Falló en el servicio externo, error en el listado de documentos',
            })
        })
    })

    return putDonorPromise
}

export {
    getDonor,
    newDonor,
    updateDonor,
}