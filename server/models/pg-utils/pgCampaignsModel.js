import moment from 'moment'
import { pgPool, } from '../../../config/postgres'

class pgCampaignTimeLapseExecuted {
    /*
     * @param {Number} total
     * @param {Number} pending
     * @param {Number} failed
     * @param {Number} accepted
     * @param {Number} delivered
     * @param {Number} opened
     */
    constructor(total, pending, failed, accepted, delivered, opened) {
        this._total = total
        this._pending = pending
        this._failed = failed
        this._accepted = accepted
        this._delivered = delivered
        this._opened = opened
    }

    get total() {
        return this._total
    }

    get pending() {
        return this._pending
    }

    get failed() {
        return this._failed
    }

    get accepted() {
        return this._accepted
    }

    get delivered() {
        return this._delivered
    }

    get opened() {
        return this._opened
    }
}


class pgCampaignHourExecuted extends pgCampaignTimeLapseExecuted {
    /**
     *
     * @param {String} date
     * @param {Number} total
     * @param {Number} pending
     * @param {Number} failed
     * @param {Number} accepted
     * @param {Number} delivered
     * @param {Number} opened
     */
    constructor(number, total, pending, failed, accepted, delivered, opened) {
        super(total, pending, failed, accepted, delivered, opened)

        this._number = number
    }

    get number() {
        return this._number
    }
}


class pgCampaignDayExecuted extends pgCampaignTimeLapseExecuted {
    /**
     *
     * @param {String} date
     * @param {Number} total
     * @param {Number} pending
     * @param {Number} failed
     * @param {Number} accepted
     * @param {Number} delivered
     * @param {Number} opened
     */
    constructor(number, total, pending, failed, accepted, delivered, opened) {
        super(total, pending, failed, accepted, delivered, opened)

        this._number = number
    }

    get number() {
        return this._number
    }
}

class pgCampaignMonthExecuted extends pgCampaignTimeLapseExecuted {
    /**
     *
     * @param {String} number
     * @param {Number} total
     * @param {Number} pending
     * @param {Number} failed
     * @param {Number} accepted
     * @param {Number} delivered
     * @param {Number} opened
     */
    constructor(number, total, pending, failed, accepted, delivered, opened) {
        super(total, pending, failed, accepted, delivered, opened)

        this._number = number
    }

    get number() {
        return this._number
    }
}


class pgCampaignYearExecuted extends pgCampaignTimeLapseExecuted {
    constructor(number, total, pending, failed, accepted, delivered, opened) {
        super(total, pending, failed, accepted, delivered, opened)

        this._number = number
    }

    get number() {
        return this._number
    }
}

class pgCampaignModel {
    constructor(id, name, description) {
        this._id = id

        if (arguments.length === 3) {
            this._name = name
            this._description = description
        }

        this._executedYears = []
        this._executedMonths = []
        this._executedDays = []
        this._executedHours = []
        this._executionTotal = 0
        this._lastExecutionTotal = 0
        this._lastExecutionDate = ''
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get lastExecutionDate() {
        return this._lastExecutionDate
    }

    get lastExecutionTotal() {
        return this._lastExecutionTotal
    }

    get executionTotal() {
        return this._executionTotal
    }
    get executedYears() {
        return this._executedYears
    }
    get executedMonths() {
        return this._executedMonths
    }
    get executedDays() {
        return this._executedDays
    }
    get executedHours() {
        return this._executedHours
    }

    async getExecutedRange(start, finish) {
        const sql = `SELECT count(*) as total, to_char(noti.create_at, 'YYYY-MM-DD HH') as date
                    FROM apigw.campaigns as camp 
                    INNER JOIN apigw.notifications as noti 
                    ON noti.id_campaigns = camp.id 
                    WHERE camp.id = $1
                    AND noti.create_at 
                    BETWEEN $2::DATE 
                    AND $3::DATE
                    GROUP BY date
                    ORDER BY date DESC`

        const args = [
            this._id,
            moment(start).format('YYYY-MM-DD HH:mm:ss'),
            moment(finish).format('YYYY-MM-DD HH:mm:ss'),
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        for (const { total, date, } of rows) {
            const monthExecuted = new pgCampaignDayExecuted(date, total)
            this._executedMonths.push(monthExecuted)
        }
    }

    async getExecutedHoursByDay(year, month, day) {
        const sql = `SELECT count(*) as total, to_char(noti.create_at, 'HH24:MI PM') as hour
                    FROM apigw.campaigns as camp 
                    INNER JOIN apigw.notifications as noti 
                    ON noti.id_campaigns = camp.id 
                    WHERE camp.id = $1
                    AND to_char(noti.create_at, 'YYYY')::integer = $2
                    AND to_char(noti.create_at, 'MM') = $3
                    AND to_char(noti.create_at, 'DD') = $4
                    GROUP BY hour
                    ORDER BY hour DESC`

        const args = [
            this._id,
            year,
            month,
            day,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        for (const { total, hour, } of rows) {
            const hourExecuted = new pgCampaignHourExecuted(hour, total)
            this._executedHours.push(hourExecuted)
        }
    }


    async getExecutedDaysByMoth(year, month) {
        const sql = `SELECT count(*) as total, to_char(noti.create_at, 'DD') as day
                    FROM apigw.campaigns as camp 
                    INNER JOIN apigw.notifications as noti 
                    ON noti.id_campaigns = camp.id 
                    WHERE camp.id = $1
                    AND to_char(noti.create_at, 'YYYY')::integer = $2
                    AND to_char(noti.create_at, 'MM') = $3
                    GROUP BY day
                    ORDER BY day DESC`

        const args = [
            this._id,
            year,
            month,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        for (const { total, day, } of rows) {
            const dayExecuted = new pgCampaignDayExecuted(day, total)
            this._executedDays.push(dayExecuted)
        }
    }

    /**
     *
     * @param {Number} year
     */
    async getExecutedMonthsByYear(year) {
        const sql = `SELECT count(*) AS total, to_char(noti.create_at, 'MM') AS month
                    FROM apigw.campaigns AS camp 
                    INNER JOIN apigw.notifications AS noti 
                    ON noti.id_campaigns = camp.id 
                    WHERE camp.id = $1
                    AND to_char(noti.create_at, 'YYYY')::integer = $2
                    GROUP BY camp.id, month
                    ORDER BY month DESC`

        const args = [
            this._id,
            year,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        for (const { total, month, } of rows) {
            const monthExecuted = new pgCampaignMonthExecuted(month, total)
            this._executedMonths.push(monthExecuted)
        }
    }

    async getExecutedYears() {
        const sql = `SELECT count(*) AS total, to_char(noti.create_at, 'YYYY')::integer AS year, camp.id
                    FROM apigw.campaigns AS camp 
                    INNER JOIN apigw.notifications AS noti 
                    ON noti.id_campaigns = camp.id 
                    AND camp.id = $1
                    GROUP BY camp.id, year
                    ORDER BY year DESC`

        const args = [
            this._id,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        for (const { total, year, } of rows) {
            const yearExecuted = new pgCampaignYearExecuted(year, total)
            this._executedYears.push(yearExecuted)
        }
    }

    async getLastExecution() {
        const sql = `SELECT count(*) as total, to_char(noti.create_at, 'YYYY-MM-DD')::timestamp as date, camp.id
                    FROM apigw.campaigns as camp 
                    INNER JOIN apigw.notifications as noti 
                    ON noti.id_campaigns = camp.id WHERE camp.id = $1
                    GROUP BY camp.id, tag, date
                    ORDER BY date DESC
                    LIMIT 1`

        const args = [
            this._id,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        const [
            { total, date, },
        ] = rows

        this._lastExecutionTotal = total
        this._lastExecutionDate = moment(date).format('YYYY-MM-DD')
    }

    async getTotalExecutions() {
        const sql = `SELECT count(*) as total
                    FROM apigw.campaigns as camp 
                    INNER JOIN apigw.notifications as noti 
                    ON noti.id_campaigns = camp.id WHERE camp.id = $1
                    GROUP BY camp.id, tag
                    LIMIT 1`

        const args = [
            this._id,
        ]

        const { rows, rowCount, } = await pgPool.query(sql, args)

        if (!rowCount) {
            return
        }

        const [
            { total, },
        ] = rows

        this._executionTotal = total
    }

    async getDataByID() {
        const sql = 'SELECT id, tag AS name, description FROM apigw.campaigns WHERE campaigns.id = $1'
        const args = [
            this._id,
        ]

        const { rows, } = await pgPool.query(sql, args)

        const campaigns = []

        for (const { id, name, description, } of rows) {
            try {
                const campaignModel = new pgCampaignModel(id, name, description)
                await campaignModel.getLastExecution()
                await campaignModel.getTotalExecutions()
                campaigns.push(campaignModel)
            } catch (e) {
                //
            }
        }

        return campaigns
    }


    static async getAll() {
        const { rows, } = await pgPool.query('SELECT id, tag AS name, description FROM apigw.campaigns ORDER BY name')

        const campaigns = []

        for (const { id, name, description, } of rows) {
            try {
                const campaignModel = new pgCampaignModel(id, name, description)
                await campaignModel.getLastExecution()
                await campaignModel.getTotalExecutions()
                campaigns.push(campaignModel)
            } catch (e) {
                //
            }
        }

        return campaigns
    }
}

export default pgCampaignModel
