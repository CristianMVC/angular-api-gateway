import express  from 'express'
//import moment   from 'moment'
import notificationsCtrl from '../../controllers/admin/notifications'

const router = express.Router()	// eslint-disable-line new-cap

/** GET /admin/cp/dashboard - Example Pages */
router.get('/blank', (req, res) =>	res.render('cpanel/dashboard/blank'))
router.get('/403', (req, res) =>	res.render('cpanel/error_pages/403'))
router.get('/404', (req, res) =>	res.render('cpanel/error_pages/404'))
router.get('/500', (req, res) =>	res.render('cpanel/error_pages/500'))


router.get('/', notificationsCtrl.list)
router.get('/:id', notificationsCtrl.byID)
router.get('/:id/:year', notificationsCtrl.byYear)
router.get('/:id/:year/:month', notificationsCtrl.byMonth)
router.get('/:id/:year/:month/:day', notificationsCtrl.byDay)

//router.get('/:id/date/:date', notificationsCtrl.byDate)

export default router
