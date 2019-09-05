import path       from 'path'

const baseFolder = path.dirname(require.main.filename || process.mainModule.filename).replace('dist', '')

const assetsFolder = baseFolder + 'assets'

export { baseFolder, assetsFolder, }