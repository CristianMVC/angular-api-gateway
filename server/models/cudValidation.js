import mongoose             from 'mongoose'
import Promise              from 'bluebird'

const Schema = mongoose.Schema

mongoose.Promise = Promise

const CudValidationSchema = new Schema({
  validation: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  markdown: {
    type: Object,
    required: true,
  },
  html: {
    type: Object,
    required: true,
  },
})

/**
 * Statics
 */
CudValidationSchema.statics = {
  /**
   * Get requirements by validation
   * @param validation
   * @returns {Promise<CudValidation, APIError>}
   */
  get(validation) {
    const requirement = new Promise((resolve, reject) => {
      this.findOne({ validation: validation, })
      .then((requirement) => {
          resolve(requirement)
      })
      .catch((e) => {
        reject(e)
      })
    })
    return requirement
  },
}


export default mongoose.model('CudValidation', CudValidationSchema)
