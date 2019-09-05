import express                  from 'express'
import npsCtrl        	        from '../../../controllers/v1.0/nps'
import APIError                 from '../../../helpers/APIError'

const router = express.Router()	// eslint-disable-line new-cap

/** -------------------------------------
 *    Service Routes
 ** ------------------------------------*/
/**
 * @api {POST} v1.0/ciudadano-digital/nps Encuesta de usuarios
 * @apiName postNPS
 * @apiGroup Ciudadano Digital - NPS
 * @apiVersion  1.0.0
 *
 * @apiDeprecated Ciudadano Digital - NPS by Microsoft CRM
 *
 * @apiUse AuthHeaders
 *
 * @apiParam  {Json} object
 *
 * @apiParamExample  {type} Request-Example:
 *  {
 *     "questionresponses":[
 *        {
 *           "answerId":"D6BFF86A-BF22-435F-B6F0-72578968138A",
 *           "questionId":"4204B465-2182-E711-8100-70106FA70181",
 *           "valueAsString":null
 *        },
 *        {
 *           "answerId":"6CCDDC6F-355F-4B1D-A6D5-7C5F1BC03B1E",
 *           "questionId":"F72DE9A6-2282-E711-8100-70106FA70181",
 *           "valueAsString":null
 *        },
 *        {
 *           "answerId":"E6EFB896-107B-4166-B03B-4D27077A668B",
 *           "questionId":"0267C72C-2682-E711-8100-70106FA70181",
 *           "valueAsString":null
 *        },
 *        {
 *           "answerId":"41BD956E-FBB5-4C37-8498-45322241EFDA",
 *           "questionId":"78F8EA7C-2682-E711-8100-70106FA70181",
 *           "valueAsString":null
 *        },
 *        {
 *           "answerId":"D80BAFA3-CDA5-44A0-B40E-C4C6190CE5B0",
 *           "questionId":"4F1CFF65-6B78-E711-80F1-E0071B6E8DC1",
 *           "valueAsString":null
 *        },
 *        {
 *           "answerId":null,
 *           "questionId":"A44643D2-2682-E711-8100-70106FA70181",
 *           "valueAsString":null
 *        }
 *     ],
 *     "surveyresponse":{
 *        "canal":1,
 *        "categoriaservicio":"162",
 *        "dni":"29479475",
 *        "localidad":"02000010",
 *        "name":"Test - Encuesta de Atencion - Aplicacion",
 *        "organismo":"AFIP",
 *        "provincia":"02",
 *        "respondent":""
 *     }
 *  }
 *
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *    "@odata.context": "https://snrsc.api.crm2.dynamics.com/api/data/v8.2/$metadata#Microsoft.Dynamics.CRM.mcs_registrarrespuestavocResponse",
 *    "operationresult": null
 *  }
 */
router.route('/nps')
	.post(npsCtrl.store)
  /** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


router.route('/')
/** 405 - Method Not Allowed */
  .get((req, res, next) => next(APIError({ status: 405, })))
  .post((req, res, next) => next(APIError({ status: 405, })))
  .put((req, res, next) => next(APIError({ status: 405, })))
  .delete((req, res, next) => next(APIError({ status: 405, })))


export default router
