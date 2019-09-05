import Joi from 'joi'

export default {
    registro: {
        body: {
            dona: Joi.array().items(Joi.string()),
        },
    },
}