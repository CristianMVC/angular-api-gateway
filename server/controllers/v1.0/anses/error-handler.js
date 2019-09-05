import logger                       from '../../../../config/winston'

export default function errorHandler({ status = null, message = null, stack = null, method = null, } = {}) {
  try {
    // if (status) logger.error('%s::Status:%j', method, status)
    // if (message) logger.error('%s::Message:%j', method, message)
    // if (stack) logger.error('%s::Stack:%j', method, stack)

    return {
      status: status,
      message: message,
      stack: stack,
      method: method,
    }
  } catch (e) {
    // if (status) logger.error('%s::Status:%j', method, status)
    // if (message) logger.error('%s::Message:%j', method, message)
    // if (stack) logger.error('%s::Stack:%j', method, stack)
    // logger.error('%s::Catch:%j', method, e.message)

    return {
      status: 500,
      message: 'Error Exception errorHandler',
      stack: e,
      method: 'errorHandler',
    }
  }
}
