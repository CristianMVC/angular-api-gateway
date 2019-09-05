import APIError from '../server/helpers/APIError'
import bodyParser from 'body-parser'
import config from './env'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import expressFileUpload from 'express-fileupload'
import expressValidation from 'express-validation'
import expressWinston from 'express-winston'
import httpStatus from 'http-status'
import logger from 'morgan'
import methodOverride from 'method-override'
import newrelic from 'newrelic'
import path from 'path'
import RedisClient from './redis'
import RedisConnect from 'connect-redis'
import routes from '../server/routes'
import session from 'express-session'
import timeout from 'connect-timeout'
import winstonInstance from './winston'
import { assign, } from 'lodash'
import '../server/crons' // fire cronjobs
import './postgres'

const app = express()
const RedisStore = RedisConnect(session)

if (config.env === 'development') {
  app.use(logger('dev'))
}

RedisClient.on('error', (err) => {
  console.error('Redis Error ' + err)
})

// Set Local Vars
app.locals = assign(app.locals, config.locals)
if (config.env === 'production')
  app.locals = assign(app.locals, newrelic)


// Set Timeout
app.use(timeout('100000ms'))

function haltOnTimedout(req, res, next) {
  if (!req.timedout)
    return next()
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({ extended: true, }))
app.use(haltOnTimedout)

app.use(cookieParser(config.cookieParser.secret))
app.use(compress())
app.use(methodOverride())
app.use(haltOnTimedout)

// disable 'X-Powered-By' header in response
app.disable('x-powered-by')

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// Initialize Redis-Session for ADMIN
app.use(session({
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    client: RedisClient,
    ttl: config.redis.ttl,
  }),
  secret: config.redis.secret,
  cookie: {
    secure: config.redis.cookie.secure,
    maxAge: config.redis.cookie.maxAge,
  },
  saveUninitialized: config.redis.saveUninitialized,
  resave: config.redis.resave,
}))

// enable File Uploads
app.use(expressFileUpload({
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024,
  },
}))

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, 	// optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }))
}

// mount all routes on /api path
app.use('/', routes)

// set the view engine
app.set('views', path.join(__dirname, '../server/views'))
app.set('view engine', 'ejs')
// app.set('view options', { layout: 'index', })

// set public dir
app.use('/assets', express.static('assets'))

// serve docs dir
if (config.env !== 'production') {
  app.use('/docs', express.static('docs'))
}
// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const unifiedErrorMessage = err.errors.map((error) => error.messages.join('. ')).join(' and ')
    // validation error contains errors which is an array of error each containing message[]
    return next(APIError({
      status: err.status,
      message: unifiedErrorMessage,
      devMessage: err.devMessage,
      errorCode: err.errorCode,
      moreInfo: err.moreInfo,
      isPublic: true,
    }))
  } else if (err instanceof Error) {
    // validation error contains errors which is an array of error each containing message[]
    return next(APIError({
      status: (err.status),
      message: (err.message),
      devMessage: (err.devMessage),
      errorCode: (err.errorCode),
      moreInfo: (err.moreInfo),
      isPublic: (err.isPublic),
    }))
  } else next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  /** Validar el Tipo de Pagina de Error */
  const regex = /admin/i
  if ((regex.exec(req.url)) !== null)
    res.render('cpanel/error_pages/404')
  else
    next(APIError({ status: 404, }))
})

// log error in winston transports except when executing test suite
if (config.env !== 'test')
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }))

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  if (config.env === 'production') {
    /** Validar el Tipo de Pagina de Error */
    const regex = /admin/i
    if ((regex.exec(req.url)) !== null) {
      // Admin 500
      return res.render('cpanel/error_pages/500')
    } else {
      return res.status(err.status).json({
        status: err.status,
        userMessage: err.isPublic ? err.message : httpStatus[err.status],
        developerMessage: err.isPublic ? err.devMessage : httpStatus[err.status],
        errorCode: err.errorCode,
        moreInfo: err.moreInfo,
      })
    }
  } else {
    return res.status(err.status).json({
      status: err.status,
      userMessage: err.message,
      developerMessage: err.devMessage,
      errorCode: err.errorCode,
      moreInfo: err.moreInfo,
      isPublic: err.isPublic,
      stack: err.stack,
    })
  }
})


export default app
