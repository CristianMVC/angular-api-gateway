import { pgClient, } from '../../../config/postgres'

class pgUserCredentialsModel {
  static async getTransactionUsers(transactionFuntions, entitySlug) {
    const client = pgClient()

    try {
      await client.connect()
      await client.query('BEGIN')
      let rowsU = [] // rows de users
      let uuid = null

      if (transactionFuntions.start) {
      // eslint-disable-next-line comma-dangle
        const { rows: rowsT, } = await client.query(`SELECT apigw.${transactionFuntions.start}(apigw.get_credential_id($1)) as uuid`, [entitySlug])

        uuid = rowsT[0].uuid

        // eslint-disable-next-line comma-dangle
        const { rows, } = await client.query(`SELECT apigw.${transactionFuntions.get}($1) as data;`, [uuid])
        rowsU = rows
      } else {
        // eslint-disable-next-line comma-dangle
        const { rows, } = await client.query(`SELECT apigw.${transactionFuntions.get}() as data;`, [])
        rowsU = rows
      }

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

      if (e.message === 'No left users to insert' || e.message === 'No such user') {
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
  static async updateTransactionUsers(uuid, logs, transactionFuntions) {
    const client = pgClient()
    let argsObject
    try {
      await client.connect()
      await client.query('BEGIN')

      if (logs.length) {
        argsObject = pgUserCredentialsModel.createQueryValues(logs)
        await client.query(argsObject.sql)
      }

      if (transactionFuntions.finish) {
        // eslint-disable-next-line comma-dangle
        await client.query(`SELECT apigw.${transactionFuntions.finish}($1)`, [uuid])
      }

      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      await client.end()
    }

    return logs.length
  }

  /**
   * @param {Object[]} logs
   */
  static createQueryValues(logs) {
    const argsObject = {
      sql: '',
      args: [],
    }

    for (const i in logs) {
      const extraData = typeof logs[i].extraData == 'object' ? JSON.stringify(logs[i].extraData) : '{}'

      argsObject.sql += `SELECT apigw.insert_user_has_credential('${logs[i].idUser}', apigw.get_credential_id('${logs[i].credentialType}'), '${logs[i].expiration}', '${extraData}', '${logs[i].excluder}');`
    }

    argsObject.sql = argsObject.sql.slice(0, -1)
    return argsObject
  }
}

export default pgUserCredentialsModel