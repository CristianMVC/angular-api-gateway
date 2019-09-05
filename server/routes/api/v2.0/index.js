import express                    from 'express'

/** Imports Routes */

import rlmRoutes                  from './rlm'
import analiticasRoutes           from './analiticas'
import defensaconsumidorRoutes    from './defensa-consumidor'
import dnrpaRoutes                from './dnrpa'
import incucaiRoutes              from './incucai'
import nomivacRoutes              from './nomivac'
import seguridadVialRoutes        from './seguridad-vial'
import renaperRoutes              from './renaper'
import juntasRoutes               from './juntas'
import srtRoutes                  from './srt'
import andisRoutes                from './andis'
import saludRoutes                from './salud'
import provinciasRoutes           from './provincias'
import feriadosRoutes             from './feriados'

const router = express.Router()	// eslint-disable-line new-cap

/** ANALITICAS */
router.use('/analiticas', analiticasRoutes)

/** DNRPA */
router.use('/dnrpa', dnrpaRoutes)

/** DEFENSA CONSUMIDOR */
router.use('/defensa-consumidor', defensaconsumidorRoutes)

/** INCUCAI */
router.use('/incucai', incucaiRoutes)

/** NOMIVAC */
router.use('/nomivac', nomivacRoutes)

/** SEGURIDAD VIAL */
router.use('/seguridad-vial', seguridadVialRoutes)

/** RLM */
router.use('/rlm', rlmRoutes)

/** RENAPER */
router.use('/renaper', renaperRoutes)

/** JUNTAS */
router.use('/juntas', juntasRoutes)

/** SRT */
router.use('/srt', srtRoutes)

/** ANDIS */
router.use('/andis', andisRoutes)

/** Salud */
router.use('/salud', saludRoutes)

/** Provincias */
router.use('/provincias', provinciasRoutes)

/** FERIADOS */
router.use('/feriados', feriadosRoutes)

router.get('/', (req, res) => res.json({
    title: 'Welcome to API v2.0',
    user: req.user,
    remote: {
      address: req.socket.remoteAddress,
      family: req.socket.remoteFamily,
      port: req.socket.remotePort,
    },
}))


export default router