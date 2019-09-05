import moment                           from 'moment'
import APIError                         from '../../../helpers/APIError'
import {
    getDonor as getDonorRequest,
    newDonor as newDonorRequest,
    updateDonor as updateDonorRequest,
}                                       from './request'

const getDonor = (req, res, next) => {
    const { userData, } = req
    const { dni_number: dniNumber, birthdate, } = userData
    const birthdateParsed = moment(birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')

    getDonorRequest(dniNumber, birthdateParsed)
        .then((donorData) => {
            res.json(donorData)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

const newDonor = (req, res, next) => {
    const { userData, } = req

    let confirmado = true

    const {
        dni_type: docType, //id
        first_name: firstName,
        last_name: lastName,
        gender,
        email: mail,
        dni_number: dniNumber,
        cuil,
    } = userData

    const {
        calle,
        numero,
        id_provincia: idProvincia,
        id_partido: idPartido,
        id_localidad: idLocalidad,
        telefono,
        piso, //opcional
        vinculo, //opcional
        departamento, //opcional
        mail_familiar: mailFamiliar, //opcional
        id_estado_civil: estadoCivil, //opcional
        url_validacion: urlValidacion, //opcional
        telefono_familiar: telefonoFamiliar, //opcional
        nombre_apellido_familiar: nombreApellidoFamiliar, //opcional
    } = req.body

    let {
        dona, //organos
        id_proposito: idProposito,
    } = req.body

    if (urlValidacion) {
        confirmado = false
    }

    const donante =  req.body.donante ? 'SI' : 'NO'
    const birthdate =  moment(userData.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')

    confirmado =  confirmado ? 'SI' : 'NO'

    if (!req.body.donante) {
        dona = []
        idProposito = ''
    }

    newDonorRequest({ docType, dniNumber, cuil, firstName, lastName, gender, mail, birthdate, estadoCivil, telefono, calle, numero, piso, departamento,
        idProvincia, idPartido, idLocalidad, nombreApellidoFamiliar, vinculo, mailFamiliar, telefonoFamiliar, idProposito, donante, dona,
        urlValidacion, confirmado,
    })
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

const updateDonor = (req, res, next) => {
    const { userData, } = req

    let confirmado = true

    const {
        dni_type: docType, //id
        first_name: firstName,
        last_name: lastName,
        gender,
        email: mail,
        dni_number: dniNumber,
        cuil,
    } = userData

    const {
        calle,
        numero,
        id_provincia: idProvincia,
        id_partido: idPartido,
        id_localidad: idLocalidad,
        telefono,
        piso, //opcional
        vinculo, //opcional
        departamento, //opcional
        mail_familiar: mailFamiliar, //opcional
        id_estado_civil: estadoCivil, //opcional
        url_validacion: urlValidacion, //opcional
        telefono_familiar: telefonoFamiliar, //opcional
        nombre_apellido_familiar: nombreApellidoFamiliar, //opcional
    } = req.body

    let {
        dona, //organos
        id_proposito: idProposito,
    } = req.body

    if (urlValidacion) {
        confirmado = false
    }

    const donante =  req.body.donante ? 'SI' : 'NO'
    const birthdate =  moment(userData.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    confirmado =  confirmado ? 'SI' : 'NO'

    if (!req.body.donante) {
        dona = []
        idProposito = ''
    }

    updateDonorRequest({ docType, dniNumber, cuil, firstName, lastName, gender, mail, birthdate, estadoCivil, telefono, calle, numero, piso, departamento,
        idProvincia, idPartido, idLocalidad, nombreApellidoFamiliar, vinculo, mailFamiliar, telefonoFamiliar, idProposito, donante, dona,
        urlValidacion, confirmado,
    })
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}


export default {
    getDonor,
    newDonor,
    updateDonor,
}