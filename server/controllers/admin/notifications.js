//import moment               from 'moment'
import pgCampaignsModel from '../../models/pg-utils/pgCampaignsModel'


const list = (req, res, next) => {
    pgCampaignsModel.getAll()
        .then((campaigns) => {
              res.render('cpanel/notifications/index', {
                campaigns,
            })
        })
        .catch(() => {

        })
}

const byDate = (req, res, next) => {
    const { params, } = req

    const { id, date, } = params

    //const momentDate = moment(date, 'YYYY-MM-DD')


    const notifications = [
        {
            id: 1,
            username: 'CUIL:23958763549',
            firstName: 'Xavier',
            lastName: 'Arias',
            state: 'pending',
        },
        {
            id: 2,
            username: 'CUIL:23958763549',
            firstName: 'Angel',
            lastName: 'Arias',
            state: 'success',
        },
        {
            id: 3,
            username: 'CUIL:23958763549',
            firstName: 'Joaquin',
            lastName: 'Arias',
            state: 'failed',
        },
    ]

    const sends = {
        date,
        total: 3,
        failed: 1,
        success: 2,
        pending: 1,
    }

    const historyData = {
        id,
        name: 'vencimiento-licencia-90-dias',
        total: 9000,
        firstSend: '1980-10-12',
        lastSend: '2019-06-07',
        active: true,
    }

    res.render('cpanel/notifications/date', {
        historyData,
        sends,
        notifications,
    })
}

const byID = (req, res, next) => {
    const { params, } = req
    const { id, } = params

    const pgCampaign = new pgCampaignsModel(id)

    pgCampaign.getExecutedYears()
        .then(() => {
            const { executedYears, } = pgCampaign

            res.render('cpanel/notifications/detail', {
                executedYears,
                id,
            })
        })
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
        })

/*
    pgCampaignsModel.getAll()
        .then((campaigns) => {
              res.render('cpanel/notifications/index', {
                campaigns,
            })
        })
        .catch(() => {

        })
 */
}

const byYear = (req, res, next) => {
    const { params, } = req
    const { id, year, } = params

    const pgCampaign = new pgCampaignsModel(id)

    pgCampaign.getExecutedMonthsByYear(year)
        .then(() => {
            const { executedMonths, } = pgCampaign

            res.render('cpanel/notifications/year', {
                executedMonths,
                year,
                id,
            })
        })
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
        })
}

const byMonth = (req, res, next) => {
    const { params, } = req
    const { id, year, month, } = params

    const pgCampaign = new pgCampaignsModel(id)

    pgCampaign.getExecutedDaysByMoth(year, month)
        .then(() => {
            const { executedDays, } = pgCampaign

            res.render('cpanel/notifications/month', {
                executedDays,
                month,
                year,
                id,
            })
        })
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
        })
}

const byDay = (req, res, next) => {
    const { params, } = req
    const { id, year, month, day, } = params

    const pgCampaign = new pgCampaignsModel(id)

    pgCampaign.getExecutedHoursByDay(year, month, day)
        .then(() => {
            const { executedHours, } = pgCampaign

            res.render('cpanel/notifications/day', {
                executedHours,
                month,
                year,
                day,
                id,
            })
        })
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
        })
}

export default {
    list,
    byID,
    byYear,
    byMonth,
    byDay,
    byDate,
}
