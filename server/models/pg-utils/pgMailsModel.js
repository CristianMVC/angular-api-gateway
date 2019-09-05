import path from 'path'
import edge from 'edge.js'

import { pgPool, } from '../../../config/postgres'
import { sendMailPromise, } from '../../helpers/mailgun'
// eslint-disable-next-line no-unused-vars
import logger from './../../../config/winston'

edge.registerViews(path.join(__dirname, '../../crons/mails/templates'))

class pgMailsModel {
  /**
   *
   * @param {String} mailName
   * @param {[String|Function]} templateOrFilter
   * @param {String} dbFunction
   * @description Generate a new instance, setting the mailName
   */
  constructor(mailName, templateOrFilter, dbFunction) {
    this._mailName = mailName
    this._template = templateOrFilter
    this._dbFunction = dbFunction
    this._options = {}
    this._aditionalData = null
    this._filter = null
    this._chunkBy = null
    this._mailLogs = []
    this._totalUsers = 0
    this._batchs = 1
  }

  /**
   *
   * @param {Object} options
   * @description This function add the options to the email, right now only the subject
   * @returns this instance
   */
  setOptions({ subject, }) {
    this._options = {
      subject,
    }

    return this
  }

  get _templateIsFunction() {
    return this._template instanceof Function
  }

  setFilter(fnFilter) {
    if (fnFilter instanceof Function) {
      this._filter = fnFilter
    }

    return this
  }

  async beforeExecute(objectOrCalback) {
    if (!(objectOrCalback instanceof Function)) {
      return this
    }

    try {
      this._aditionalData = await objectOrCalback()
      return this
    } catch (e) {
      throw e
    }
  }

  setChunk(chunk) {
    this._chunkBy = chunk

    return this
  }

  /**
   * @description Execute the get data, aply filters if there is and send the email
   * @returns Promise
   */
  async execute() {
    let rows = []

    try {
      const data = await this._getData()

      if (Array.isArray(data)) {
        rows = data
      } else {
        rows = [
          data,
        ]
      }

      if (this._filter instanceof Function) {
        this._oldData = rows

        rows = rows.map(this._filter).filter((data) => data)
      }

      this._totalUsers = rows.length

      logger.info(`::::CRON: ${this._mailName} - TOTAL A INSERTAR: ${this._totalUsers}`)

      await this._sendRecursive(rows)

      return true
    } catch (e) {
      throw e
    }
  }

  _execSendMail(rows) {
    logger.info(`::::CRON: ${this._mailName} - ENVIANDO ${rows.length} EMAILS`)

    for (const row of rows) {
      if (this._aditionalData) {
        Object.assign(row.results, this._aditionalData)
      }

      if (this._templateIsFunction) {
        this._template = this._template(row.results)
      }

      this._mailLogs.push(this._sendMail(row.results))
    }
  }

  async _getData() {
    try {
      const sql = `SELECT * FROM apigw.${this._dbFunction} as results`

      const data = await pgPool.query(sql)
      return data.rows
    } catch (e) {
      logger.info('error en el get data')
      throw e
    }
  }

  _parseTemplate(data) {
    return edge.render(this._template, data)
  }

  _sendMail(row) {
    const { subject, } = this._options
    const template = this._parseTemplate(row)

    return new Promise((resolve) => {
      const logData = {
        idUser: row.username,
        tag: this._mailName,
        state: 'failed',
        messageId: null,
      }

      sendMailPromise(row.email, subject, template, [], this._mailName)
        .then((info) => {
          logData.state = 'pending'
          logData.messageId = info.messageId

          resolve(logData)
        })
        .catch((e) => {
          logger.info(`::::CRON: ${this._mailName} - ERROR DE ENVÍO DE CORREO - CUIL: ${row.username} EMAIL: ${row.email}`)
          logData.state = 'reject'
          resolve(logData)
        })
    })
  }

  async _insertLogs() {
    const logsToInsert = await this._prepareLogs()

    return pgPool.query(logsToInsert.sql)
  }

  async _prepareLogs() {
    const argsObject = {
      sql: '',
    }

    const logs = await Promise.all(this._mailLogs)

    const { rows, } = await pgPool.query(`SELECT apigw.get_campaigns_id('${this._mailName}') as "campaignId"`)
    // eslint-disable-next-line array-bracket-spacing
    const [{ campaignId, }, ] = rows

    for (const i in logs) {
      argsObject.sql += `SELECT apigw.insert_user_notifications('${logs[i].idUser}', ${campaignId}, '${logs[i].state}', '${logs[i].messageId}');`
    }

    argsObject.sql = argsObject.sql.slice(0, -1)
    return argsObject
  }

  async _sendRecursive(users) {
    const splitUsers = users.splice(0, this._chunkBy)
    this._mailLogs = []

    if (splitUsers.length == 0) {
      return
    }

    logger.info(`::::CRON: ${this._mailName} - LOTE: ${this._batchs}`)

    try {
      this._execSendMail(splitUsers)

      await this._insertLogs()

      logger.info(`::::CRON: ${this._mailName} - LOGS INSERTADOS: ${this._mailLogs.length}`)

      this._totalUsers -= splitUsers.length

      if (this._totalUsers > 0) {
        logger.info(`::::CRON: ${this._mailName} - QUEDAN POR ENVIAR: ${this._totalUsers}`)
      }

      await this._delay()

      this._batchs += 1

      await this._sendRecursive(users)
    } catch (e) {
      logger.info(`::::CRON: ${this._mailName} - LOTE FALLIDO: ${this._batchs}`)

      logger.error(e)

      this._batchs += 1
      await this._sendRecursive(users)
    }
  }

  _delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }
}

export default pgMailsModel
