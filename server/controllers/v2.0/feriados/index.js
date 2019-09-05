import APIResponse                                           from '../../../helpers/APIStandarResponses'
import APIError                                              from '../../../helpers/APIError'
import {
  getHolidaysByDay as getHolidaysByDayRequest,
  getAllHolidays as getAllHolidaysRequest,
  getHolidaysByMonth as getAllHolidaysByMonthRequest,
  getAllHolidaysByRange as getAllHolidaysByRangeRequest,  }  from './request'

const getAllHolidays = (req, res, next) => {
  const holidays = getAllHolidaysRequest()

  res.json(APIResponse.list(0, 0, holidays))
}

const getAllHolidaysByMonth = (req, res, next) => {
  const { month, } = req.params
  const monthLower = month.toLowerCase()
  const holidays = getAllHolidaysByMonthRequest(monthLower)

  if (holidays.length > 0) {
    res.json(APIResponse.list(0, 0, holidays))

    return
  }

  const apiError = APIError({
    status: 404,
    message: 'Not found',
  })

  next(apiError)
}

const getAllHolidaysByRange = (req, res, next) => {
  const { from, to, } = req.params
  const holidays = getAllHolidaysByRangeRequest(from, to)

  if (holidays.length > 0) {
    res.json(APIResponse.list(0, 0, holidays))

    return
  }

  const apiError = APIError({
    status: 404,
    message: 'Not found',
  })

  next(apiError)
}

const getHolidaysByDay = (req, res, next) => {
  const { date, } = req.params
  const holidays = getHolidaysByDayRequest(date)

  if (holidays.length > 0) {
    res.json(APIResponse.list(0, 0, holidays))

    return
  }

  const apiError = APIError({
    status: 404,
    message: 'Not found',
  })

  next(apiError)
}

export default {
  getAllHolidays,
  getAllHolidaysByMonth,
  getAllHolidaysByRange,
  getHolidaysByDay,
}