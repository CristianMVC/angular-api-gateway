//import moment from 'moment'
import Promise from 'bluebird'
import { pgPool, } from '../../../config/postgres'

class pgBaseModel {
    constructor(tableName) {
        this._tableName = tableName
    }
    get data() {
        return this._data
    }
    get validUntil() {
        return this._validUntil
    }
    get createdAt() {
        return this._createdAt
    }
    get updatedAt() {
        return this._updatedAt
    }
    get identifier() {
        return this._identifier
    }
    /**
     *
     * @param {String} idUser
     * @param {Object} data
     * @param {String|null} expTime
     * @param {String} identifier
     */
    insert(idUser, data = {}, expTime, identifier) {
        const sql =
        `INSERT INTO apigw.vw_res_logs(cuil, data, entity, valid_until, excluder)
        VALUES ($1, $2, apigw.get_entity_id($3), $4, $5)`

        const args = [
            idUser,
            data,
            this._tableName,
            (expTime ? expTime : null),
            (identifier ? identifier : null),
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
    /**
     *
     * @param {String} idUser
     * @param {String} identifier
     */
    get(idUser, identifier) {
        const cuilArg = idUser || this.cuil

        /*const sql =
        `SELECT a.cuil, a.data, a.created_at, a.updated_at, a.deleted_at
        FROM apigw.vw_res_logs as a
        WHERE a.cuil = $1 AND a.entity = apigw.get_entity_id($2);`*/

        const sql = 'SELECT apigw.has_res_log($1, apigw.get_entity_id($2), $3) as data;'

        const args = [
            cuilArg,
            this._tableName,
            (identifier ? identifier : null),
        ]

        const getPromise = new Promise((resolve, reject) => {
            const poolPromise =  pgPool.query(sql, args)

            poolPromise
                .then((res) => {
                        const { rows, rowCount, } = res

                        if (!rowCount) {
                            const error = new Error('NoRows')
                            reject(error)
                            return
                        }

                        const row = rows[0]

                        const {
                            cuil,
                            data,
                            created_at,
                            updated_at,
                            deleted_at,
                            valid_until,
                            excluder: identifier,
                        } = row.data

                        this.load(cuil, data, created_at, updated_at, deleted_at, valid_until, identifier)

                        resolve(this)
                })
                .catch((e) =>{
                    reject(e)
                })
        })

        return getPromise
    }
    load(cuil = '', data = {}, createdAt = '', updatedAt = '', deletedAt = '', validUntil = '', identifier = '') {
        this._cuil = cuil
        this._data = data
        this._createdAt = createdAt
        this._updatedAt = updatedAt
        this._deletedAt = deletedAt
        this._validUntil = validUntil
        this._identifier = identifier
    }
    /**
     * @param {String} tablename
     * @param {Object[]} logs
     */
    static multiInsert(tablename, logs) {
        const argsObject = pgBaseModel.createQueryValues(tablename, logs)

        const sql =
        `INSERT INTO apigw.vw_res_logs(cuil, data, entity, valid_until, excluder)
        VALUES ${argsObject.sql}`

        const multiInsertPromise = new Promise((resolve, reject) => {
            const poolPromise =  pgPool.query(sql, argsObject.args)

            poolPromise
                .then((res) => {
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
        })

        return multiInsertPromise
    }

     /**
     * @param {String} tablename
     * @param {Object[]} logs
     */
    static createQueryValues(tablename, logs) {
        const argsObject = {
            sql: '',
            args: [],
        }

        let counter = 0
        let loops = 0
        for (const i in logs) {
            const rangeIndex = parseInt(i) + counter - loops
            argsObject.sql += `($${rangeIndex + 1}, $${rangeIndex + 2}, apigw.get_entity_id($${rangeIndex + 3}), $${rangeIndex + 4}), $${rangeIndex + 5}`

            argsObject.args.push(logs[i].idUser, logs[i].data, tablename, logs[i].validUntil, null)

            counter += 4
            loops++
        }
        argsObject.sql = argsObject.sql.slice(0, -1)
        return argsObject
    }
}

export default pgBaseModel