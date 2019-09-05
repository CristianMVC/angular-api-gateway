import logger from '../../../config/winston'
import redis from '../../helpers/Redis'

function index(req, res) {
  logger.log('debug', 'Admin::CacheController::Index')
  res.render('cpanel/cache/index')
}


function refresh(req, res) {
  logger.log('debug', 'Admin::CacheController::Refresh')
  const keys = [
    'cache:*',
    'cache-double:*',
    'Auth:*',
  ]

  const key = keys[req.body.cache]

  if (key)
    redis.delAll(key)
      .then((value) => res.render('cpanel/cache/index', {
        msj: {
          type: 'success',
          msj: 'Cache Actualizado correctamente',
        },
      }))
      .catch((e) => res.render('cpanel/cache/index', {
        msj: {
          type: 'danger',
          msj: 'Error: El cache no pudo ser actualizado',
        },
      }))
  else
    res.render('cpanel/cache/index', {
      msj: {
        type: 'danger',
        msj: 'Error: El cache no pudo ser actualizado',
      },
    })
}


export default {
  index,
  refresh,
}