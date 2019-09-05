import { Pool, Client, }    from 'pg'
//import Cursor       from 'pg-cursor'
import logger       from './winston'
import config       from './env'

const { pg, } = config

const pool = new Pool(pg)

const client = () => new Client(pg)

pool.on('error', (e) => {
    logger.err(e)
})

export {
    pool as pgPool,
    client as pgClient,
    /*Cursor as pgCursor, */
}