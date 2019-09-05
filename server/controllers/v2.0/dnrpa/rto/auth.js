import request      from 'superagent'
import APIError     from '../../../../helpers/APIError'
import redis        from '../../../../helpers/Redis'
import config       from '../../../../../config/env'
import logger       from '../../../../../config/winston'

const auth = config.ws2.dnrpa.rto.auth
const { body: urlTokenBody, } = auth
const urlToken = `${auth.url}/token`

const tokenKey = 'Auth:Token:RTO:Token'
const tokenKeyExpire = '85400'

function getToken() {
	return new Promise((resolve, reject) => {
		logger.log('debug', 'se solicito el token')
		logger.log('debug', 'url', urlToken)
		request
			.post(urlToken)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json;charset=UTF-8')
			.set('Accept-Language', 'en-US,en,es,es-AR;q=0.5')
			.set('Accept-Encoding', 'gzip, deflate')
			.set('Cache-Control', 'no-cache')
			.set('User-Agent', 'Mozilla/5.0')
			.send(urlTokenBody)
			.then(({ body: securityToken, }) => {
				if (!securityToken) {
					const apiError = APIError({
						status: 503,
						message: 'Error Request Token',
					})
					return reject(apiError)
				}

				const security = `Bearer ${securityToken.access_token}`

				resolve(security)
			})
			.catch((e) => {
				const apiError = APIError({
					status: (e.status),
					message: (e.message),
					devMessage: (e.stack),
				})
				reject(apiError)
			})
  })
}


export default function () {
	return new Promise((resolve, reject) => {
		redis.exists(tokenKey)
			.then((exists) => {
				if (!exists) {
					getToken()
						.then((token) => {
							redis.setExp(tokenKey, token, tokenKeyExpire)
								.then(() => {})
								.catch(() => {})
								.finally(() => {
									resolve(token)
								})
						})
						.catch((e) => {
							reject(e)
						})
						return
				}

				redis
					.get(tokenKey)
					.then((reply) => {
						resolve(reply)
					})
					.catch((e) => {
						const apiError = {
							status: 500,
							message: (e.message),
							devMessage: (e.stack),
							isPublic: false,
						}
						reject(APIError(apiError))
					})
			})
			.catch((e) => {
				const apiError = {
					status: 500,
					message: (e.message),
					devMessage: (e.stack),
					isPublic: false,
				}
				reject(APIError(apiError))
			})
	})
}