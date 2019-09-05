import mongoose             from 'mongoose'
import Promise              from 'bluebird'

const Schema = mongoose.Schema

mongoose.Promise = Promise

const HealthCenterSchema = new Schema({
  tipologia_descripcion: {
    type: String,
    required: true,
  },
  vih: {
    type: Boolean,
    required: true,
  },
  cp: {
    type: String,
    required: true,
  },
  id_ref: {
    type: Number,
    required: true,
  },
  domicilio: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: true,
    default: null,
  },
  provincia: {
    type: String,
    required: true,
  },
  coordenadas: {
    // eslint-disable-next-line comma-dangle
    type: [Number],
    index: '2dsphere',
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  tipo_telefono: {
    type: String,
    required: true,
  },
  tipologia_categoria: {
    type: String,
    required: true,
  },
  zoom: {
    type: Number,
    required: true,
  },
  localidad: {
    type: String,
    required: true,
  },
  tipologia: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  financiamiento: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  sangre: {
    type: Boolean,
    required: true,
  },
  dependencia: {
    type: String,
    required: true,
  },
})


export default mongoose.model('HealthCenter', HealthCenterSchema)
