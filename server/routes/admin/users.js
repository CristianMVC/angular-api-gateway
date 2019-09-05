import express from 'express'
import userCtrl from '../../controllers/admin/users'

const router = express.Router() // eslint-disable-line new-cap

/** Route: /admin/users */

router.route('/')
  .get(userCtrl.list)

/** Route: /admin/users/create */

router.route('/create')
  .get(userCtrl.create)
  .post(userCtrl.store)

/** Route: /admin/users/edit */

router.route('/:user_id/edit')
  .get(userCtrl.edit)
  .post(userCtrl.update)

/** Route: /admin/users/delete */

router.route('/:user_id/delete')
  .get(userCtrl.destroy)

export default router