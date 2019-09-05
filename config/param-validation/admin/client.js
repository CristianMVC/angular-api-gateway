import Joi from 'joi'

export default {
  updateClient: {
		client_id: Joi.string()
			.min(5)
			.required(),
		client_secret: Joi.string()
			.min(5)
			.required(),
		redirect_uri: Joi.string()
			.regex(/^(http|https):\/\//)
			.required(),
		User: Joi.string()
			.hex().length(24)
			.required(),
  },
	createClient: {
		client_id: Joi.string()
			.min(5)
			.required(),
		client_secret: Joi.string()
			.min(5)
			.required(),
		redirect_uri: Joi.string()
			.regex(/^(http|https):\/\//)
			.required(),
		User: Joi.string()
			.hex().length(24)
			.required(),
  },
}