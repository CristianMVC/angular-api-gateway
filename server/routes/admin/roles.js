import express              from 'express'
import roleCtrl             from '../../controllers/admin/roles'

const router = express.Router() // eslint-disable-line new-cap


/** Route: /admin/roles */
router.route('/')
  .get(roleCtrl.list)

/** Route: /admin/roles/create */
router.route('/create')
  .get(roleCtrl.create)
  .post(roleCtrl.store)

/** Route: /admin/roles/edit */
router.route('/:role_id/edit')
  .get(roleCtrl.edit)
  .post(roleCtrl.update)

/** Route: /admin/roles/delete */
router.route('/:role_id/delete')
  .get(roleCtrl.destroy)


export default router
