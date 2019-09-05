import moment   from 'moment'
import holidays from './feriados'

const getAllHolidays = () => {
  return holidays
}

const getHolidaysByMonth = (month) => {
  const holidaysByMonth = holidays.filter((holiday) => holiday.mes.toLowerCase() == month)

  return holidaysByMonth
}

const getAllHolidaysByRange = (from, to) => {
  moment.locale('es')

  from = moment(from)
  to = moment(to)

  const holidaysByRange = holidays.filter((holiday) => {
    const holidayMoment = moment(`${holiday.mes} ${holiday.dia}`, 'MMMM DD')

    if (holidayMoment.isBetween(from, to)) {
      return holiday
    }

    return false
  })

  return holidaysByRange
}

const getHolidaysByDay = (date) => {
  moment.locale('es')

  date = moment(date, 'YYYY-MM-DD')

  const holidaysByDay = holidays.filter((holiday) => {
    const holidayMoment = moment(`${holiday.mes} ${holiday.dia}`, 'MMMM DD')

    if (holidayMoment.isSame(date)) {
      return holiday
    }

    return false
  })

  return holidaysByDay
}

export {
  getAllHolidays,
  getHolidaysByDay,
  getHolidaysByMonth,
  getAllHolidaysByRange,
}