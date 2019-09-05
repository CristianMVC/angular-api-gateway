import express									from 'express'
import rolesCtrl								from '../../controllers/roles'
import permissionCtrl						from '../../controllers/permissions'
import validate							    from 'express-validation'
import paramValidation					from '../../../config/param-validation'
import ApiResponse   					  from '../../helpers/APIStandarResponses'

const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 * API Roles's CRUD
 * ----------------------------------- */
router.route('/')
	/** GET /api/roles - Get list of roles */
	.get(rolesCtrl.list)

	/** POST /api/roles - Create new role */
	.post(validate(paramValidation.roles.create), rolesCtrl.create)

  /** Method Not Allowed */
  .put((req, res) => { res.status(405).json(ApiResponse.error(405)) })
  .delete((req, res) => { res.status(405).json(ApiResponse.error(405)) })

router.route('/:role_id')
	/** GET /api/roles/:role_id - Get role */
	.get(rolesCtrl.get)

	/** PUT /api/roles/:role_id - Update role */
	.put(validate(paramValidation.roles.update), rolesCtrl.update)

	/** DELETE /api/roles/:role_id - Delete role */
	.delete(rolesCtrl.remove)

  /** Method Not Allowed */
  .post((req, res) => { res.status(405).json(ApiResponse.error(405)) })


/** -------------------------------------
 * API Roles-Permissions's CRUD
 * ----------------------------------- */
router.route('/:role_id/permissions')
  /** GET /api/roles/:role_id/permissions - Get list of permissions */
  .get(permissionCtrl.list)

  /** POST /api/roles/:role_id/permissions - Create new permission */
  .post(validate(paramValidation.permissions.create), permissionCtrl.create)

  /** Method Not Allowed */
  .put((req, res) => { res.status(405).json(ApiResponse.error(405)) })
  .delete((req, res) => { res.status(405).json(ApiResponse.error(405)) })

router.route('/:role_id/permissions/:permission_id')
  /** GET /api/roles/:role_id/permissions/:permission_id - Get permission */
  .get(permissionCtrl.get)

  /** PUT /api/roles/:role_id/permissions/:permission_id - Update permission */
  .put(validate(paramValidation.permissions.update), permissionCtrl.update)

  /** DELETE /api/roles/:role_id/permissions/:permission_id - Delete permission */
  .delete(permissionCtrl.remove)

  /** Method Not Allowed */
  .post((req, res) => { res.status(405).json(ApiResponse.error(405)) })


export default router
