import express                    from 'express'
import testCtrl                   from '../../controllers/test'

const router = express.Router()	// eslint-disable-line new-cap


router.route('/')
  .get(testCtrl.list)
  .post(testCtrl.create)

router.route('/:test_id')
  .get(testCtrl.get)
  .put(testCtrl.update)
  .delete(testCtrl.remove)

export default router
