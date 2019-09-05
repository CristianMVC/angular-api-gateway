import { getExternalFiles, }          from './request'
//import parseData        from './utils/parse-data'
import APIResponses     from '../../../helpers/APIStandarResponses'
//import logger from '../../../../../config/winston'
//import config           from '../../../../config/env'

/**
 * demoGetList
 * @param req
 * @param res
 * @param next
 */
function listRegistroExternos(req, res, next) {

  const { query, params, } = req
  const { filtro, pagina, } = query
  const { codigo, } = params

  const limit = 200

  const offset = pagina ? parseInt(pagina) * limit : 0

  //TODO:
    getExternalFiles(codigo, filtro, pagina)
      .then((externalFiles) => {
          res.json(APIResponses.list(offset, limit, externalFiles, { codigo, }))
      })
      .catch((e) => {
        next(e)
      })
}


export default {
  listRegistroExternos,
}

