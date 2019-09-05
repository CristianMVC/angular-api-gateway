import APIError                       from '../../../helpers/APIError'
import APIResponse                    from '../../../helpers/APIStandarResponses'
import _cursos                        from './cursos'
import _usuario                       from './usuario'
import _usuarioCursos                 from './usuario-cursos'
import logger                         from '../../../../config/winston'


/**
 * usuario
 * @param req - Request
 * @param res - Response
 * @param next - next
 */
function cursos(req, res, next) {
  _cursos()
    .then((l) => {
      res.json(APIResponse.list(0, 0, l))
    })
    .catch((e) => {
      logger.log('debug', 'Controller::PaisDigital::Index:Cursos')
      next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
        isPublic: (e.isPublic),
      }))
    })
}


/**
 * usuario
 * @param req - Request
 * @param res - Response
 * @param next - next
 */
function usuario(req, res, next) {
  const params = {
    cuil: req.query.cuil,
  }

  _usuario(params)
    .then((r) => {
      res.json(r)
    })
    .catch((e) => {
      logger.log('debug', 'Controller::PaisDigital::Index::UsuarioCursos')
      next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
        isPublic: (e.isPublic),
      }))
    })
}



/**
 * Usuario Cursos
 * @param req - Request
 * @param res - Response
 * @param next - next
 */
function usuarioCursos(req, res, next) {
  const params = {
    cuil: req.query.cuil,
  }

  _usuarioCursos(params)
    .then((r) => {
      logger.log('debug', 'Controller::PaisDigital::Index::UsuarioCursos:Then')
      try {
        res.json(APIResponse.list(0, 0, r))
      } catch (e) {
        next(APIError({
          status: (e.status),
          message: (e.message),
          devMessage: (e.devMessage),
          isPublic: (e.isPublic),
        }))
      }
    })
    .catch((e) => {
      logger.log('debug', 'Controller::PaisDigital::Index::UsuarioCursos:Catch')
      next(APIError({
        status: (e.status),
        message: (e.message),
        devMessage: (e.devMessage),
        isPublic: (e.isPublic),
      }))
    })
}



export default {
  cursos,
  usuario,
  usuarioCursos,
}