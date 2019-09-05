import express                  from 'express'
import permissionsCtrl          from '../../controllers/admin/permissions'

const router = express.Router() // eslint-disable-line new-cap


/** Route: /admin/permissions */
router.route('/')
  .get(permissionsCtrl.list)

router.route('/:role_id')
  .get(permissionsCtrl.edit)
  .post(permissionsCtrl.update)


export default router
