/**
 *
 * @apiDefine AuthIDHeaders
 * @apiHeader {String} Authorization Token de autorización de API Gateway
 * @apiHeader {String} [id-token] Token generado por ID, contiene información del usuario
 * @apiHeader {string} [open-id-token] Token generado por ID, contiene información del usuario
 *
 * @apiHeaderExample {json} Ejemplo Headers:
 *
 *   {
 *     "Authorization": "Bearer Ey...",
 *     "id-token": "Ey...",
 *     "open-id-token": "Ey..."
 *   }
 */

 /**
  *
  * @apiDefine AuthHeaders
  * @apiHeader {String} Authorization Token de autorización de API Gateway
  *
  * @apiHeaderExample {json} Ejemplo Headers:
  *
  *   {
  *     "Authorization": "Bearer Ey..."
  *   }
  *
  */

/**
  *
  * @apiDefine metadata
  *
  * @apiSuccess (200) {Object} metadata
  * @apiSuccess (200) {Object} metadata.resultset
  * @apiSuccess (200) {String} metadata.resultset.count
  * @apiSuccess (200) {String} metadata.resultset.offset
  * @apiSuccess (200) {String} metadata.resultset.limit
  *
  */

  /**
   *
   * @apiDefine commonError
   *
   * @apiErrorExample {json} Success-Response:
   *
   * {
   *     property : value
   * }
   *
   */


   //FIXME: