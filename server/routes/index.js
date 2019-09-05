import express                  from 'express'
import apiRoutes                from './api/index'
import adminRoutes              from './admin/index'
import adminAuthRoutes          from './admin/auth'
import session_middleware       from '../middelwares/session'


const router = express.Router() 	// eslint-disable-line new-cap

/** Mount API routes at /api/*  */
router.use('/api', apiRoutes)

/** Mount Authentication routes at /admin  */
router.use('/admin', adminAuthRoutes)

/** Mount ControlPanel routes at /admin  */
router.use('/admin/cp', session_middleware, adminRoutes)

/** GET - Root Dir */
router.get('/', (req, res) => {
  let html = '<!DOCTYPE html>'
  html += '<html lang="es"><head><meta charset="utf-8"></head><body>'
  html += '<h2>API-Gateway</h2>'
  html += '<h3>ARSAT</h3>'
  html += '<p>API-Gateway es una plataforma de administración con el objetivo de exponer las API\'s de servicio web de diferentes Organismos y Ministerios de forma centralizada y segura. El objetivo básico de API-Gateway es facilitar el desarrollo de sistemas tanto para los desarrolladores como para los consumidores de API.</p>'
  html += '</body></html>'

  res.send(html)
})


export default router
