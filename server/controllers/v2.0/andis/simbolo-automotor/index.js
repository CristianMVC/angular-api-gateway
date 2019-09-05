import { getBeneficiary as getBeneficiaryRequest, }    from './request'
import APIError               from '../../../../helpers/APIError'


const documentTypes =  [
  { id: 1, name: 'DNI', gender: 'F', },
  { id: 2, name: 'DNI', gender: 'M', },
  { id: 3, name: 'LC', },
  { id: 4, name: 'LE', },
  { id: 75, name: 'CIE', },
  { id: 99, name: 'PASS', },
]

const getDocumentIdByType = (idType, userGender) => {
  const documentType = idType ? documentTypes.find(({ name, gender, }) => name === idType && (!gender || gender === userGender)) : documentTypes.find(({ name, gender, }) => name === 'DNI' && gender === userGender)

  if (!documentType) {
    throw new Error('failedDocument')
  }

  return documentType.id
}

/**
 * getBeneficiario
 * @param req
 * @param res
 * @param next
 */
const getBeneficiary = (req, res, next) => {
  const { userData, } = req
  const { dni_number: dniNumber, dni_type: dniType, gender, id_type: idType, id_number: idNumber,  } = userData


  const documentType = idType === 'PASS' ? idType : dniType
  const documentNumber = idType === 'PASS' ? idNumber : dniNumber

  let documentTypeId
  try {
    documentTypeId = getDocumentIdByType(documentType, gender)
  } catch (e) {
    const apiError = APIError({
      status: 400,
      message: 'Bad Request',
      devMessage: 'Informacion del documento incompatible',
    })
    next(apiError)
  }

  getBeneficiaryRequest(documentTypeId, documentNumber, 1)
    .then((beneficiary) => {
      res.json(beneficiary)
    })
    .catch((e) => {
      const apiError = APIError(e)
      next(apiError)
    })
}

export default {
  getBeneficiary,
}
