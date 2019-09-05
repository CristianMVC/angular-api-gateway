import pgAnalyticsModel   from '../../../models/pg-utils/pgAnalyticsModel'

const postRegistro = (evento, pagina, user, origen, metadata) => {
    const instance = new pgAnalyticsModel()
    const postPromise = new Promise((resolve, reject) => {
        instance.insert(evento, pagina, user, origen, metadata)
        .then(() => {
            resolve()
        })
        .catch((e) => {
            reject(e)
        })
    })

    return postPromise
}

export {
    postRegistro,
}