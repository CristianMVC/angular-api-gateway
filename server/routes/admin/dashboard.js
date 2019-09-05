import express from 'express'
// import logger from '../../../config/winston'

const router = express.Router()	// eslint-disable-line new-cap

/** GET /admin/cp/dashboard - Example Pages */
router.get('/blank', (req, res) =>	res.render('cpanel/dashboard/blank'))
router.get('/403', (req, res) =>	res.render('cpanel/error_pages/403'))
router.get('/404', (req, res) =>	res.render('cpanel/error_pages/404'))
router.get('/500', (req, res) =>	res.render('cpanel/error_pages/500'))

/** GET /admin/cp/dashboard - Home */
router.get('/', (req, res) =>	res.render('cpanel/dashboard/index'))

export default router
