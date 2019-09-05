import Joi  from 'joi'

export default {
	chatbot: {
		query: {
			latitud: Joi.number().required(),
			longitud: Joi.number().required(),
		},
	},
}