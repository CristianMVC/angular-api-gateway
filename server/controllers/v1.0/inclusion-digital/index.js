import logger                   from '../../../../config/winston'
import APIResponse              from '../../../helpers/APIStandarResponses'
import APIError                 from '../../../helpers/APIError'
import { verifyToken, }         from '../../../helpers/token'
import { sheets, }              from '../../../helpers/google/sheets'
import { assetsFolder, }        from '../../../helpers/basePath'
import img                      from './certificado'
import {
  createCanvas,
  loadImage,
  registerFont,
}                               from 'canvas'

registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular', })
registerFont(assetsFolder + '/fonts/Roboto-Bold.ttf', { family: 'Roboto-Bold', })
registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto', })

const methods = {
    getBase64({ nombre, apellido, dni, tipo, duracion, localidad, provincia, mes, ano, }) {
      let text
      let dir = localidad

      if (provincia) {
        dir = localidad + ' - ' + provincia
      }

      if (duracion == 3) {
        text = ' (tres)'
      }

      if (duracion == 11) {
        text = ' (once)'
      }

      if (duracion == 12) {
        text = ' (doce)'
      }

      if (duracion == 24) {
        text = ' (veinticuatro)'
      }

      const prep = img.certificadoString
      const prepParse = prep.replace('{nombre_completo}', nombre + ' ' + apellido)
                            .replace('{dni}', dni)
                            .replace('{tipo}', '"' + tipo + '"')
                            .replace('{duracion}', duracion + text + ' horas.')
                            .replace('{dir}', dir)
                            .replace('{mes}', mes)
                            .replace('{ano}', ano)
      const result = new Promise((resolve, reject) => {
        const canvas = createCanvas(3500, 2400)
        const ctx = canvas.getContext('2d')

        loadImage(Buffer.from(prepParse))
          .then((image) => {
            ctx.drawImage(image, 0, 0)

            const toString = canvas.toDataURL()

            resolve(toString)
          })
          .catch((e) => {
            reject(e)
          })

        .catch((e) => {
          reject(e)
        })
      })
      return result
    },
    getCertificados(dniNumber) {
      const sheetsPromise = new Promise(async (resolve, reject) => {
        let  googleSheets

        try {
          googleSheets = await sheets()
        } catch (e) {
          reject(e)
          return
        }

        googleSheets.spreadsheets.values.get({
          spreadsheetId: '1XaRlb1KXiWDS9K8LBzI1DXyshaPoW-kgjtAhM2a1f98',
          range: 'A2:K',
          }, (err, res) => {
            if (err) {
              reject(err)
              return
            }

            try {
              const rows = res.data.values

              if (!rows || !rows.length) {
                resolve([])
                return
              }

              const response = rows.map((row) => {
                const val = row[2]
                const rowDni = val.replace(/[.]/g, '')

                if (rowDni != dniNumber) {
                  return
                }
                const rowParsed = row.map((col) => {
                  if (!col) {
                    return ''
                  }
                  return col
                })

                const response = {
                  apellido: rowParsed[0],
                  nombre: rowParsed[1],
                  dni: rowDni,
                  cuil: rowParsed[3].toLowerCase() === 'no' ? false : rowParsed[3],
                  tipo: rowParsed[4],
                  duracion: rowParsed[5],
                  localidad: rowParsed[6],
                  provincia: rowParsed[7],
                  alfabetizador: rowParsed[8],
                  mes: rowParsed[9],
                  ano: rowParsed[10],
                  convenio: rowParsed[11],
                }

                return response
              }).filter((row) => row)
              resolve(response)
            } catch (e) {
              reject(e)
            }
          })
      })

      return sheetsPromise
    },
}


const getCertificados = async (req, res, next) => {
  let IDtoken

  try {
    IDtoken = await verifyToken(req.headers)
  } catch (e) {
    const apiError = APIError({
      status: 401,
      message: e.message,
    })

    throw apiError
  }

  const { dni_number: dniNumber, } = IDtoken

  let certificados = []

  try {
    certificados = await methods.getCertificados(dniNumber)
  } catch (e) {
    logger.error('Controller::InclusionDigital::methods::getCertificados')
    const apiError = APIError({
      status: 500,
      message: e.message,
    })
    throw apiError
  }

  if (!certificados || !certificados.length) {
    const apiError = APIError({
      status: 404,
      message: 'Not Found',
    })
    throw apiError
  }

  for (const certi in certificados) {
    try {
      const certificado = await methods.getBase64(certificados[certi])
      certificados[certi].certificado = certificado.replace('data:image/png;base64,', '')
    } catch (e) {
      const apiError = APIError({
        status: 500,
        message: e.message,
      })
      throw apiError
    }
  }

  const response = APIResponse.list(0, 0, certificados)

  res.json(response)
}

export default {
  getCertificados,
}
