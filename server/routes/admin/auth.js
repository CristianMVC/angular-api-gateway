import express from 'express'
import authCtrl from '../../controllers/admin/auth'

const router = express.Router() // eslint-disable-line new-cap

/** Route: /admin */
router.route('/')
  .get((req, res) => {
    if (req.session.user) {
      res.redirect('/admin/cp/dashboard')
    } else {
      res.redirect('/admin/login')
    }
  })

/** Route: /admin/login */
router.route('/login')
  .get((req, res) => {
    if (req.session.user) {
      res.redirect('/admin/cp/dashboard')
    } else {
      res.render('login', {
        referer: req.query.referer,
      })
    }
  })
  .post(authCtrl.signIn)

/** Route: /admin/logout */
router.route('/logout')
  .get(authCtrl.signOut)

export default router
