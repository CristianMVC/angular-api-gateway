import traerBeneficiosAsociadosPorCuil from '../../controllers/v1.0/anses/traerBeneficiosAsociadosPorCuil.js'
import dondeCobroPorBeneficio from '../../controllers/v1.0/anses/dondeCobroPorBeneficio.js'
import { pgClient, } from '../../../config/postgres'
import Promise from 'bluebird'
import references from '../../controllers/v1.0/anses/reference.js'
import moment from 'moment'

const getBenefitRealName = (number, payments) => {
  let actualPayment, benefitName

  for (const payment of payments) {
    if (moment(payment.pagoDesde).month == moment().month) {
      actualPayment = payment
    }
  }

  if (actualPayment.cSistema == '9') {
    if (parseInt(number[2]) <= 4) {
      benefitName = 'Jubilación'
    } else if (parseInt(number.slice(0, 2)) == 40) {
      benefitName = 'Pensión No Contributiva'
    } else if (parseInt(number.slice(0, 2)) == 71) {
      benefitName = 'Subsidios de Contención Familiar'
    } else {
      benefitName = 'Pensión'
    }
  } else {
    for (const ref of references) {
      if (ref.CodSistema == parseInt(actualPayment.cSistema)) {
        benefitName = ref.DescripcionAmigable
      }
    }
  }

  return benefitName
}

class pgUserBenefitsModel {
  static async getTransactionUsers() {
    const client = pgClient()
    try {
      await client.connect()
      await client.query('BEGIN')
      // eslint-disable-next-line comma-dangle
      const { rows: rowsT, } = await client.query('SELECT apigw.start_id_benef_transaction() as uuid;')

      const { uuid, } = rowsT[0]

      // eslint-disable-next-line comma-dangle
      const { rows: rowsU, } = await client.query('SELECT apigw.get_json_expired_users_for_id_benef($1) as data;', [uuid])

      const usersData = rowsU.filter((user) => user.data.dni_number).map((userData) => {
        const {
          id,
          username,
          first_name: firstName,
          last_name: lastName,
        } = userData.data

        return { id, username, firstName, lastName, }
      })

      await client.query('COMMIT')

      return { usersData, uuid, }
    } catch (e) {
      await client.query('ROLLBACK')

      if (e.message === 'No left benefits users to insert') {
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
  static async updateTransactionUsers(uuid, logs) {
    const client = pgClient()

    try {
      await client.connect()
      await client.query('BEGIN')

      // const logPromises = []

      if (logs.length) {
        for (const log of logs) {
          //const logPromise = new Promise((logResolve) => {
            // const benefitPromises = []

            for (const benefit of log.benefits.filter((b) => b.realName)) {
              //const benefitPromise = new Promise((benefitResolve) => {
              // eslint-disable-next-line array-bracket-spacing
              const { rows: [id, ], } =  await client.query(
                  `INSERT INTO apigw.users_has_benefits(id_user_id, id_benefit)
                    SELECT $1, apigw.get_benefits_id($2)
                  WHERE NOT EXISTS (
                    SELECT 1 FROM apigw.users_has_benefits WHERE id_user_id = $3
                  ) RETURNING id`,
                  // eslint-disable-next-line comma-dangle
                  [log.id, benefit.realName, log.id])
                  // eslint-disable-next-line comma-dangle
                  // .then(({ rows: [id], }) => {
                  //   const paymentsPromises = []

                    // for (const pay of benefit.payments) {
                    //   const payPromise = new Promise((payResolve) => {
                    //     client.query(
                    //       ``,
                    //       // eslint-disable-next-line comma-dangle
                    //       [pay, id])
                    //       // eslint-disable-next-line comma-dangle
                    //       .then(({ rows: [id], }) => {
                    //         payResolve(true)
                    //       })
                    //       .catch((_) => payResolve(new Error('error')))
                    //   })

                    //   paymentsPromises.push(payPromise)
                    // }

                    // Promise.all(paymentsPromises).then(() => {
                    //   benefitResolve(true)
                    // })
                  // })
                  // .catch((_) => benefitResolve(new Error('error')))
              // })

              // benefitPromises.push(benefitPromise)
            }

          //   Promise.all(benefitPromises).then(() => {
          //     logResolve(true)
          //   })
          // })

          // logPromises.push(logPromise)
        }

        // await Promise.all(logPromises)
      }

      // eslint-disable-next-line comma-dangle
      await client.query('SELECT apigw.generic_finish_cred_transaction($1)', [uuid])
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      await client.end()
    }

    return logs.length
  }

  // /**
  //  * @param {Object[]} logs
  //  */
  // static createQuery(logs) {
  //   let query = ''

  //   for (const i in logs) {
  //     query += `SELECT apigw.insert_user_has_credential('${logs[i].idUser}', apigw.get_credential_id('${logs[i].credentialType}'), '${logs[i].expiration}', '{}', null);`
  //   }

  //   query = query.slice(0, -1)
  //   return query
  // }

  /**
   * @param {Object[]} users
   */
  static proccessUsers(users) {
    const promises = []

    for (const user of users) {
      const userData = user

      const userPromise = new Promise((userResolve) => {
        traerBeneficiosAsociadosPorCuil({ cuil: user.id.split(':')[1], })
          .then((benefits) => {
            const benefitsPromises = []

            for (const { BeneficioNro: number, Sistema: name, } of benefits) {
              const benefitPromise = new Promise((benefitResolve) => {
                dondeCobroPorBeneficio({ beneficio: number, })
                  .then(({ fechaPago: payments, }) => {
                    benefitResolve({
                      realName: getBenefitRealName(number, payments),
                      name,
                      number,
                      payments: payments.map((payment) => {
                        const { //TODO: Campo cargo de CBU, Lugar de pago, Partido de pago
                          pagoDesde: paidFrom,
                          proxPagoDesde: nextPaidFrom,
                          bcoCalle: paidAddress,
                          localidad: location,
                          cBco: bank,
                          cAge: branch,
                          postal,
                        } = payment
                        return { paidFrom, nextPaidFrom, paidAddress, location, bank, branch, postal, }
                      }),
                    })
                  })
                  .catch((_) => {
                    benefitResolve({
                      realName: getBenefitRealName(number, name),
                      name,
                      number,
                      payments: [],
                    })
                  })
              })

              benefitsPromises.push(benefitPromise)
            }

            Promise.all(benefitsPromises)
              .then((benefitsData) => {
                userData.benefits = benefitsData
                userResolve(userData)
              })
              .catch((_) => userResolve(userData))
          })
          .catch((e) => {
            userResolve(userData)
          })
      })

      promises.push(userPromise)
    }

    return Promise.all(promises).then((logs) => {
      return logs.filter((log) => {
        return !!log.benefits.length
      })
    })
  }
}

export default pgUserBenefitsModel