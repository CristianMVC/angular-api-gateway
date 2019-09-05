import express               from 'express'
import cache                 from '../../../../config/cache'
import turnosCtrl            from '../../../controllers/v1.0/turnos'


const router = express.Router()

/** -------------------------------------
 * Caché
 ** ------------------------------------*/
// router.route('/*').get(cache.route())


/** -------------------------------------
 * Routes
 ** ------------------------------------*/

/**
 * @api {GET|POST|PUT|DELETE} v1.0/filas/{path} Filas Proxy
 * @apiName methodFilasProxy
 * @apiGroup Filas-Turnos
 * @apiVersion  1.0.0
 *
 * @apiDescription Este EndPoint se encuentra proxy-ficado. Por favor remitirse a la documentacion
 * del servicio de origen.<br>
 * Para acceder a los EndPoint's, indicar el path con el path relativo a partir del numero de version.<br>
 * El servicio soporta los cuatro metodos basicos: GET, POST, PUT, DELETE.
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~/api/v1.0/filas
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "metadata": null,
 *      "result": []
 *  }
 */
router.route('/*')
  .get(turnosCtrl.genericGet)
  .post(turnosCtrl.genericPost)
  .put(turnosCtrl.genericPut)
  .delete(turnosCtrl.genericDelete)

export default router
