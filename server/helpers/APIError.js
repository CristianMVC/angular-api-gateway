import httpStatus             from 'http-status'
import logger                 from '../../config/winston'
import config                 from '../../config/env'


/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(status, message, devMessage, errorCode, moreInfo, isPublic) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.devMessage = devMessage
    this.errorCode = errorCode
    this.moreInfo = moreInfo
    this.status = status
    this.isPublic = isPublic
    this.isOperational = true  	// This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name)
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {number} status - HTTP status code of error.
   * @param {null|string} message - Error message.
   * @param {null|string} devMessage - Developer Error Message
   * @param {null|number} errorCode - Error Code
   * @param {null|string} moreInfo - Developer Error Message
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(status, message, devMessage, errorCode, moreInfo, isPublic) {
    super(status, message, devMessage, errorCode, moreInfo, isPublic)
  }
}

/**
 * Default Function, Parser Error
 * @param {null|number} status - Status Code
 * @param {null|string} message - Error Message
 * @param {null|string} devMessage - Developer Error Message
 * @param {null|number} errorCode - Error Code
 * @param {null|string} moreInfo - Developer Error Message
 * @param {boolean} isPublic - Public Error
 * @return {APIError}
 */
export default function ({ status = httpStatus.INTERNAL_SERVER_ERROR, message = null, devMessage = null, errorCode = null, moreInfo = null, isPublic = true, } = {}) {
  // todo: Validar si los mensajes son Strings o JSON

  // Loggers
  if (config.env !== 'production') {
    if (status)     logger.error('APIError::Status:%j', status)
    if (message)    logger.error('APIError::Message:%j', message)
    if (devMessage) logger.error('APIError::devMessage:%j', devMessage)
    if (errorCode)  logger.error('APIError::errorCode:%j', errorCode)
    if (moreInfo)   logger.error('APIError::moreInfo:%j', moreInfo)
  }

  // Parser
  const _e = {}
  try {
    if (config.env === 'production') {
      if (Array.isArray(devMessage)) {
        const _devMsg = devMessage
        devMessage = ''
        _devMsg.map((err) => {
          devMessage += err.messages + ', '
        })
      }
    }
    _e.status = status
    _e.message = (message) ? message : httpStatus[status]
    _e.devMessage = (devMessage) ? devMessage : httpStatus[status]
    _e.errorCode = (errorCode) ? errorCode : ''
    _e.moreInfo = (moreInfo) ? moreInfo : ''
  } catch (e) {
    logger.error('APIError::CatchError', e)
    _e.status = 500
    _e.message = ''
    _e.devMessage = httpStatus[500]
    _e.errorCode = ''
    _e.moreInfo = ''
  }

  return new APIError(_e.status, _e.message, _e.devMessage, _e.errorCode, _e.moreInfo, isPublic)
}
