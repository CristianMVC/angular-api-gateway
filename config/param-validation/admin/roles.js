import Joi from 'joi'

export default {
  update: {
		name: Joi.string()
			.min(2)
			.required(),
		description: Joi.string()
      .empty('')
      .default(''),
		access_to_admin: Joi.boolean()
			.required(),
    access_to_api: Joi.boolean()
			.required(),
  },
	create: {
    name: Joi.string()
      .min(2)
      .required(),
    description: Joi.string()
      .empty('')
      .default(''),
    access_to_admin: Joi.boolean()
      .required(),
    access_to_api: Joi.boolean()
      .required(),
  },
}