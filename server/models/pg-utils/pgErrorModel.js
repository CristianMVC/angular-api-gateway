import Promise from 'bluebird'
import { pgPool, } from '../../../config/postgres'
import logger from '../../../config/winston'
class pgErrorModel {
    constructor() {

    }
    insert(cuil, pgKey, pgRequest, pgResponse) {
        const sql =
        `INSERT INTO apigw.errors (cuil, entity, method, endpoint, request_headers, request_query, request_body, response_headers, response_body, status)
        VALUES ($1, apigw.get_entity_id($2), $3, $4, $5, $6, $7, $8, $9, $10)`

        const args = [
            cuil,
            pgKey,
            pgRequest.method,
            pgRequest.endpoint,
            pgRequest.headers,
            pgRequest.query,
            pgRequest.body,
            pgResponse.headers,
            pgResponse.body,
            pgResponse.status,
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
}

export default pgErrorModel