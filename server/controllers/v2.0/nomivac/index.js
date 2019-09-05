import { getVacunasCiudadano, }     from './request'
import APIError                     from '../../../helpers/APIError'

/**
 * getList
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function getList(req, res, next) {
    const { dni_number: dniNumber, username: idUser, gender: sexo, } = req.userData

    getVacunasCiudadano(dniNumber, idUser, sexo)
        .then((vacunas) => {
            res.json(vacunas)
        })
        .catch((e) => {
            const apiError = APIError(e)
            res.sendPgLog(apiError)
        })
}


export default {
  getList,
}
