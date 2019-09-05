import express                    from 'express'
import expressJwt                 from 'express-jwt'
import config                     from '../../../config/env'

/** Import Routes for API */
import usersRoutes                from './user'
import authRoutes                 from './auth'
import testRoutes                 from './test'
import rolesRoutes                from './roles'
import acl                        from '../../middelwares/acl'

/** Import Routes for API v1.0 */
import v10Routes from '../api/v1.0'

/** Import Routes for API v2.0 */
import v20Routes from '../api/v2.0'


const router = express.Router()	// eslint-disable-line new-cap


router.use('/test', testRoutes)


/** API Auth Routes */
router.use('/auth', authRoutes)

/** API User's CRUD */
router.use('/users', expressJwt({ secret: config.jwt.secret, }), acl('apiUsers'), usersRoutes)

/** API Roles's CRUD */
router.use('/roles', expressJwt({ secret: config.jwt.secret, }), acl('apiUsers'), rolesRoutes)

/** Routes API v1.0 */
router.use('/v1.0', expressJwt({ secret: config.jwt.secret, }), v10Routes)

/** Routes API v1.0 */
router.use('/v2.0', expressJwt({ secret: config.jwt.secret, }), v20Routes)


router.get('/', (req, res) => {
  res.json({
    title: 'API-Gateway',
    description: 'API-Gateway es una plataforma de administración de API con el objetivo de exponer las API\'s ' +
    'de servicio web de diferentes Organismos y Ministerios de forma centralizada y segura. El objetivo ' +
    'básico de API-Gateway es facilitar el desarrollo de sistemas tanto para los desarrolladores ' +
    'como para los consumidores de API.',
    remote: {
      address: req.socket.remoteAddress,
      family: req.socket.remoteFamily,
      port: req.socket.remotePort,
    },
  })
})


export default router
