import Joi from 'joi'

export default {
  updateUser: {
		name: Joi.string()
			.min(2)
			.regex(/^([^0-9]*)$/)
			.required(),
		surname: Joi.string()
			.min(2)
			//.regex(/^([^0-9]*)$/) /* Comento porque el password esta salvado */
			.required(),
		email: Joi.string()
			.email()
			.required(),
		username: Joi.string()
			.min(5)
			.required(),
		password: Joi.string()
			.regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
		su: Joi.boolean()
			.required(),
    role_id: Joi.string()
      .hex()
			.required(),
  },
	createUser: {
		name: Joi.string()
			.min(2)
			.regex(/^([^0-9]*)$/)
			.required(),
		surname: Joi.string()
			.min(2)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		username: Joi.string()
			.min(5)
			.required(),
		password: Joi.string()
      .regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
			.required(),
    su: Joi.boolean()
      .required(),
    role_id: Joi.string()
      .hex()
      .required(),
  },
}