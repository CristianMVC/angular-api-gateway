import logger from '../../config/winston'

/**
 * Este Helper es un fix para cuando se intenta realizar un request a un servicio con certificado SSL no Autorizado
 */

function set() {
  try {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 // eslint-disable-line dot-notation
  } catch (e) {
    logger.error('TlsReject Set Fail: ', e)
  }
}

export default {
  set,
}