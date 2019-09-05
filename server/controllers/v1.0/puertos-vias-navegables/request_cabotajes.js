import request                      from 'superagent'
import fs                           from 'fs'
import shelljs                      from 'shelljs'
import moment                       from 'moment'
import config                       from '../../../../config/env'

const {
    getKey,
    getToken,
    // refreshToken,
    listadoExcepciones,
    credentials,
} = config.ws.puertosViasNavegables.cabotaje

const tempBase = '/tmp/api' + moment().format('YYYYMMDDkkmmssSSSSSS')

const pubKeyPath = tempBase + 'pubkey.pem'

const accessData = JSON.stringify(credentials)

const accessDataBuffer = Buffer.from(accessData)

const accessDataFilePath = tempBase + 'msg.in'

fs.writeFileSync(accessDataFilePath, accessDataBuffer)

const selfTokenFilePath = tempBase + 'msg.enc'


const getExternalKey = () => {
    const externalKeyPromise = new Promise((resolve, reject) => {
        const response = request
            .get(getKey.url)
            .type('json')
            .send()

        response
            .then((res) => {
                const { key, } = res.body // key son multiples base64 concatenados

                const keyPartBuffers = key.split('=').map((keyPart) => Buffer.from(keyPart, 'base64'))

                const keyBuffer = Buffer.concat(keyPartBuffers)

                fs.writeFileSync(pubKeyPath, keyBuffer)

                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })

    return externalKeyPromise
}

const getSelfToken = () => {
    const resultExec = shelljs.exec(`cat ${accessDataFilePath} | openssl rsautl -encrypt -pubin -inkey ${pubKeyPath} -oaep -out ${selfTokenFilePath}`)

    if (resultExec.code !== 0) {
        return false
    }

    const bufferTokenFile = fs.readFileSync(selfTokenFilePath)

    const selfToken = bufferTokenFile.toString('base64')

    return selfToken //TODO: devolver token si ya existe y es de larga duracion
}

const getExternalToken = (selfToken) => {
    const externalTokenPromise = new Promise((resolve, reject) => {
            const response = request
                .post(getToken.url)
                .type('json')
                .send({ encrypt: selfToken, })

            response
                .then((res) => {
                    const { access_token: accessToken, /* refresh_token: refreshToken, */ } = res.body
                    resolve(accessToken)
                })
                .catch((e) => {
                    reject(e)
                })
        })

    return externalTokenPromise
}

const getListadoExcepciones = (accessToken) => {
    const listadoExcepcionesPromise = new Promise((resolve, reject) => {
        const response = request
            .get(listadoExcepciones.url)
            .type('json')
            .set({ Authorization: 'Bearer ' + accessToken, })
            .send()

        response
            .then((res) => {
                const { results: listado, } = res.body

                if (!listado) {
                    return []
                }

                resolve(listado)
            })
            .catch((e) => {
                reject(e)
            })
    })

    return listadoExcepcionesPromise
}

export {
    getExternalKey,
    getSelfToken,
    getExternalToken,
    getListadoExcepciones,
}