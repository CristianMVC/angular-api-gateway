import path from 'path'
import _ from 'lodash'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`)

const defaults = {
	root: path.join(__dirname, '/..'),
  port: process.env.PORT || 3000,
}

_.assign(config, defaults)

export default config
