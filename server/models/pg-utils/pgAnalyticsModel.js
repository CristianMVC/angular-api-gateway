import Promise from 'bluebird'
import { pgPool, } from '../../../config/postgres'

class pgAnalyticsModel {
    constructor(tableName) {
        this._tableName = tableName
    }

    /**
     * @param {String} evento
     * @param {String} pagina
     * @param {String} user_name
     * @param {String} origen
     * @param {Object} metadata
     */
    insert(evento, pagina, user_name, origen, metadata) {
        const sql =
        `INSERT INTO apigw.page_events(evento, pagina, user_name, origen, metadata)
        VALUES ($1, $2, $3, $4, $5)`

        const args = [
            evento,
            pagina,
            user_name,
            origen,
            metadata,
        ]

        const insertPromise = new Promise((resolve, reject) => {
            const poolPromise =  pgPool.query(sql, args)
            poolPromise
                .then(() => {
                    resolve()
                })
                .catch((e) =>{
                    reject(e)
                })
        })

        return insertPromise
    }

    get() {
        const sql =
        `SELECT * 
        FROM apigw.page_events`

        const getPromise = new Promise((resolve, reject) => {
            const poolPromise =  pgPool.query(sql)

            poolPromise
                .then(() => {
                    resolve()
                })
                .catch((e) =>{
                    reject(e)
                })
        })
        return getPromise
    }
}

export default pgAnalyticsModel