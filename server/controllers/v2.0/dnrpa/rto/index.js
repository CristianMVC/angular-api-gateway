import config            from '../../../../../config/env'
import moment            from 'moment'
import { clientHttp, }   from './request'

const { url: rto, token: postmanToken, auth, } = config.ws2.dnrpa.rto
const clavesPublicasV1 = `${auth.url}/jwks.json`
const clavesPublicasV2 = `${auth.url}/.well-known/certs`

/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getObleasDominio(req, res, next) {
	const { params, } = req
	const url = `${rto}${params.dominio}`

	clientHttp(url, postmanToken)
		.then((data) => {
			const obleas = data.revisiones
			obleas.forEach((item) => {
        item.fechaRevision = moment(item.fechaRevision).toISOString()
        item.fechaVencimiento = moment(item.fechaVencimiento).toISOString()
        const { credencialFrente: frente, credencialDorso: dorso, credencialQR: qr, } = item

        delete item.credencialFrente
        delete item.credencialDorso
        delete item.credencialQR

        item.imagenes = { frente, dorso, qr, }
			})

			return res.json(obleas[0])
		})
		.catch((e) => next(e))
}

function getClavesPublicasV1(req, res, next) {
	const url = clavesPublicasV1

	clientHttp(url, postmanToken)
		.then((data) => {
			const keys = data.keys[0]

			return res.json(keys)
		})
		.catch((e) => next(e))
}

function getClavesPublicasV2(req, res, next) {
	const url = clavesPublicasV2

	clientHttp(url, postmanToken)
		.then((data) => {
			const keys = data.keys[0]

			return res.json(keys)
		})
		.catch((e) => next(e))
}

export default {
	getObleasDominio,
	getClavesPublicasV1,
	getClavesPublicasV2,
}