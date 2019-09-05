import { google, } from 'googleapis'
import config from '../../../config/env'

const { apiKey, } = config.google.sheets

const sheets = () => {
    return google.sheets({
        version: 'v4',
        auth: apiKey,
    })
}


export default {
    sheets,
}

