import config from '../../../../config/env'
import request from './request'
import { assign, } from 'lodash'
import logger from '../../../../config/winston'

/**
 * Get Element
 * @param req
 * @param res
 * @param next
 */
function getList(req, res, next) {
    logger.log('debug', 'Controller::CalendarioVacunas::getElement')

		const url = `${config.ws.nomivac.calVacunas.url}`

		const body = assign(config.ws.nomivac.calVacunas.body, req.body)

		request
			.post({ url, body, })
			.then((v) => res.json(v))
			.catch((e) => next(e))
}

export default {
	getList,
}