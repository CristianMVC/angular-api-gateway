import { pgClient, pgPool, /* pgCursor, */ } from '../../../config/postgres'
import Promise from 'bluebird'

class pgUserModel {
    static async getTransactionUsers() {
        const client = pgClient()
        try {
            await client.connect()
            await client.query('BEGIN')
            const { rows: rowsT, } = await client.query('SELECT apigw.start_id_cards_transaction() as uuid') // TODO: transaction id funcion

            const { uuid, } = rowsT[0]

            // eslint-disable-next-line comma-dangle
            const { rows: rowsU, } = await client.query('SELECT apigw.get_json_expired_users_for_id_cards($1) as data;', [uuid]) //TODO: funcion para obtener usuarios

            const usersData = rowsU.map((userData) => {
                const {
                    id,
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    gender,
                    birthdate,
                    dni_number: dniNumber,
                    dni_type: dniType,
                } = userData.data

                return { id, username, firstName, lastName, gender, birthdate, dniNumber, dniType, }
            })

            await client.query('COMMIT')

            return { usersData, uuid, }
        } catch (e) {
            await client.query('ROLLBACK')

            if (e.message === 'No left users to insert') {
                throw new Error('noRows')
            }
            throw e
        } finally {
            await client.end()
        }
    }

    /**
     * @param {Number} uuid
     * @param {String} tablename
     * @param {Object[]} logs
     */
    static async updateTransactionUsers(uuid, tablename, logs) {
        const client = pgClient()
        let argsObject
        try {
            await client.connect()
            await client.query('BEGIN')

            if (logs.length) {
                argsObject = pgUserModel.createQueryValues(tablename, logs)
                await client.query(`INSERT INTO apigw.vw_res_logs(cuil, data, entity, valid_until, excluder)
                VALUES ${argsObject.sql}`, argsObject.args)
            }

            // eslint-disable-next-line comma-dangle
            await client.query('SELECT apigw.finish_id_cards_transaction($1)', [uuid])
            await client.query('COMMIT')
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(argsObject.sql)
            // eslint-disable-next-line no-console
            console.log(argsObject.args)
            // eslint-disable-next-line no-console
            console.log('/////////////////////////////////////')
            await client.query('ROLLBACK')
            throw e
        } finally {
            await client.end()
        }

        return true
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
            argsObject.sql += `($${rangeIndex + 1}, $${rangeIndex + 2}, apigw.get_entity_id($${rangeIndex + 3}), $${rangeIndex + 4}, $${rangeIndex + 5}),`
            // eslint-disable-next-line no-console
            argsObject.args.push(logs[i].idUser, logs[i].data, tablename, logs[i].validUntil, null)

            counter += 5
            loops++
        }
        argsObject.sql = argsObject.sql.slice(0, -1)
        return argsObject
    }

    /**
     * @param {Number} idUser
     * @param {String} term
     */
    static hasToC(idUser, term) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM apigw."get_TOC"($1, $2) as aceptedtoc'

            const args = [
                idUser,
                term,
            ]

            pgPool.query(sql, args)
                .then(({ rows, }) => {
                    const { aceptedtoc: aceptedToc, } = rows[0]

                    if (!aceptedToc) {
                        reject()
                        return
                    }
                    resolve()
                })
                .catch(reject)
        })
    }
}

class pgUserModelNew {
    static async getTransactionUsers(transactionFuntions, entitySlug) {
        const client = pgClient()
        try {
            await client.connect()
            await client.query('BEGIN')

            // eslint-disable-next-line comma-dangle
            const { rows: rowsT, } = await client.query(`SELECT apigw.${transactionFuntions.start}(apigw.get_entity_id($1)) as uuid`, [entitySlug]) // TODO: transaction id funcion

            const { uuid, } = rowsT[0]

            // eslint-disable-next-line comma-dangle
            const { rows: rowsU, } = await client.query(`SELECT apigw.${transactionFuntions.get}($1) as data;`, [uuid]) //TODO: funcion para obtener usuarios

            const usersData = rowsU.map((userData) => {
                const {
                    id,
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    gender,
                    birthdate,
                    dni_number: dniNumber,
                    dni_type: dniType,
                } = userData.data

                return { id, username, firstName, lastName, gender, birthdate, dniNumber, dniType, }
            })

            await client.query('COMMIT')

            return { usersData, uuid, }
        } catch (e) {
            await client.query('ROLLBACK')

            if (e.message === 'No left users to insert') {
                throw new Error('noRows')
            }
            throw e
        } finally {
            await client.end()
        }
    }

    /**
     * @param {Number} uuid
     * @param {String} tablename
     * @param {Object[]} logs
     */
    static async updateTransactionUsers(uuid, transactionFuntions, tablename, logs) {
        const client = pgClient()
        let argsObject
        try {
            await client.connect()
            await client.query('BEGIN')

            if (logs.length) {
                argsObject = pgUserModelNew.createQueryValues(tablename, logs)

                await client.query(`INSERT INTO apigw.vw_res_logs(cuil, data, entity, valid_until, excluder)
                VALUES ${argsObject.sql}`, argsObject.args)
            }

            // eslint-disable-next-line comma-dangle
            await client.query(`SELECT apigw.${transactionFuntions.finish}($1)`, [uuid])
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            await client.end()
        }

        return true
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
            argsObject.sql += `($${rangeIndex + 1}, $${rangeIndex + 2}, apigw.get_entity_id($${rangeIndex + 3}), $${rangeIndex + 4}, $${rangeIndex + 5}),`
            // eslint-disable-next-line no-console
            argsObject.args.push(logs[i].idUser, logs[i].data, tablename, logs[i].validUntil, null)

            counter += 5
            loops++
        }
        argsObject.sql = argsObject.sql.slice(0, -1)
        return argsObject
    }

    /**
     * @param {Number} idUser
     * @param {String} term
     */
    static hasToC(idUser, term) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM apigw."get_TOC"($1, $2) as aceptedtoc'

            const args = [
                idUser,
                term,
            ]

            pgPool.query(sql, args)
                .then(({ rows, }) => {
                    const { aceptedtoc: aceptedToc, } = rows[0]

                    if (!aceptedToc) {
                        reject()
                        return
                    }
                    resolve()
                })
                .catch(reject)
        })
    }
}

export default pgUserModel
export {
    pgUserModelNew,
}