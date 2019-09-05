/**
 * Session Middleware. This middleware validate session status
 * @param req - Request Object
 * @param res - Response Object
 * @param next - Next Middleware
 */
import logger from './../../config/winston'

export default function (req, res, next) {
  const referer = ((typeof req.originalUrl === 'undefined') ? '' : '?referer=' + req.originalUrl)
  try {
    if (!req.session.user) {
      logger.log('debug', 'Middelware::Session::SessionUser:Not Exist')
      logger.log('debug', 'Referer:', referer)
      res.redirect('/admin/login' + referer)
    } else {
      res.locals.sessionUser = req.session.user
      next()
    }
  } catch (e) {
    logger.error('Middelware::Session:Error')
    res.redirect('/admin/login' + referer)
  }
}