import Joi from 'joi'

export default {
  holidaysByMonth: {
    params: {
      month: Joi.string().required(),
    },
  },
  holidaysByDay: {
    params: {
      date: Joi.string().required().regex(/^(\d){4}-(\d){2}-(\d){2}$/),
    },
  },
  holidaysByRange: {
    params: {
      from: Joi.string().regex(/^(\d){4}-(\d){2}-(\d){2}$/),
      to: Joi.string().regex(/^(\d){4}-(\d){2}-(\d){2}$/),
    },
  },
}