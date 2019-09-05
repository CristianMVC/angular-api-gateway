import express from 'express'
import cacheCtrl from '../../controllers/admin/cache'

const router = express.Router() // eslint-disable-line new-cap

/** Route: /admin/cache */
router.route('/')
  .get(cacheCtrl.index)
  .post(cacheCtrl.refresh)


export default router