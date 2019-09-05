import Joi from 'joi'

export default {
    registro: {
        body: {
            evento: Joi.string(),
            origen: Joi.string(),
            pagina: Joi.string(),
            metadata: Joi.object(),
        },
    },
}