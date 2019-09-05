import express                  from 'express'
import sntCtrl        	        from '../../../controllers/v1.0/sistema-nacional-turnos'

const router = express.Router()	// eslint-disable-line new-cap


/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/

/**
 * @api {GET|POST|PUT|DELETE} v1.0/snt/* Proxy
 * @apiName apiSNTProxy
 * @apiGroup SNT
 * @apiVersion  1.0.0
 *
 * @apiDescription Este EndPoint se encuentra proxy-ficado. Por favor remitirse a la documentacion
 * del servicio de origen.<br>
 * Para acceder a los EndPoint's, indicar el path con el path relativo a partir del numero de version.<br>
 * El servicio soporta los cuatro metodos basicos: GET, POST, PUT, DELETE.
 *
 * @apiUse AuthHeaders
 *
 * @apiParam {path} Path Path del Endpont Externo. Ejemplo ~v1.0/snt/turnos
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "metadata": {
 *           "resultset": {
 *               "count": 72421,
 *               "offset": 0,
 *               "limit": 10
 *           }
 *       },
 *       "result": [
 *           {
 *               "fecha": "2019-07-23",
 *               "hora": "08:30",
 *               "id": 586180,
 *               "punto_atencion": {
 *                   "id": 6,
 *                   "nombre": "Departamento Automotores"
 *               },
 *               "tramite": {
 *                   "id": 4,
 *                   "nombre": "Obtener símbolo internacional de acceso",
 *                   "excepcional": 0
 *               },
 *               "campos": {
 *                   "cuil": "23442080119",
 *                   "nombre": "Agustin",
 *                   "apellido": "Bayssette",
 *                   "email": "cecycapu@hotmail.com",
 *                   "telefono": "1544013297"
 *               },
 *               "codigo": "fef99353-e8e6-4ac3-95ab-9643264cf87f",
 *               "estado": 1,
 *               "alerta": 2,
 *               "user": null,
 *               "origen": null
 *           },
 *       ]
 *   }
 */
router.route('/*')
  .get(sntCtrl.get)
  .post(sntCtrl.post)
  .put(sntCtrl.put)
  .delete(sntCtrl.remove)


export default router
