import APIError            from '../../../helpers/APIError'
import { postRegistro, }   from './request'

const registro = (req, res, next) => {
  const {
    userData,
  } = req

  const {
    evento,
    pagina,
    origen,
    metadata,
  } = req.body

  const user = userData ? userData.username : ''

  postRegistro(evento, pagina, user, origen, metadata)
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}

export default {
  registro,
}