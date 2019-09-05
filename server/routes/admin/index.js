import express                              from 'express'
import adminDashBoardRoutes                 from './dashboard'
import adminCacheRoutes                     from './cache'
import adminUsersRoutes                     from './users'
import adminRolesRoutes                     from './roles'
import adminNotificationsRoutes             from './notifications'
import adminPermissionsRoutes               from './permissions'
import acl                                  from '../../middelwares/acl'

const router = express.Router()	// eslint-disable-line new-cap


/** mount routes: /admin/cp/dashboard/~ */
router.use('/dashboard', adminDashBoardRoutes)

/** mount routes: /admin/cp/users/~ */
router.use('/users', acl('adminUsers', '/admin/cp/dashboard'), adminUsersRoutes)

/** mount routes: /admin/cp/roles/~ */
router.use('/roles', acl('adminUsers', '/admin/cp/dashboard'), adminRolesRoutes)

/** mount routes: /admin/cp/permissions/~ */
router.use('/permissions', acl('adminUsers', '/admin/cp/dashboard'), adminPermissionsRoutes)

/** mount routes: /admin/cp/cache/~ */
router.use('/cache', acl('adminUsers', '/admin/cp/dashboard'), adminCacheRoutes)

/** mount routes: /admin/cp/cache/~ */
router.use('/notifications', acl('adminUsers', '/admin/cp/dashboard'), adminNotificationsRoutes)

/** GET /admin/cp - Home */
router.get('/', (req, res) =>	{
  if (req.session.user) {
    res.redirect('/admin/cp/dashboard')
  } else {
    const referer = ((req.query.referer === undefined) ? '' : '?referer=' + req.query.referer)
    res.redirect('/admin/login' + referer)
  }
})


export default router
