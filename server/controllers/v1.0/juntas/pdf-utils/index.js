import { registerFont, createCanvas, loadImage, }                                       from 'canvas'
import { logoBase64Buffer, getPdfTemplatePageOneBuffer, getPdfTemplatePageTwoBuffer, }  from './templates'
import { assetsFolder, }                                                                from '../../../../helpers/basePath'

registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular', })
registerFont(assetsFolder + '/fonts/Roboto-Bold.ttf', { family: 'Roboto-Bold', })
registerFont(assetsFolder + '/fonts/Roboto-Regular.ttf', { family: 'Roboto', })

class PdfData {
    /**
     *
     * @param {Object} pageOneData
     * @param {Object} representativeData
     * @param {Object} tutorData
     */
    constructor(pageOneData, representativeData = {}, tutorData = {}) {
        this.data = {}

        const data = Object.assign({}, pageOneData, representativeData, tutorData)

        const dataKeys = Object.keys(data)
        for (const dataKey of dataKeys) {
            if (!this.valuesAllowed.includes(dataKey)) {
                const error = new Error('Value Not Allowed: ' + dataKey)
                throw error
            }
        }

        const requireds = this.valuesRequired

        const {
            tipo_residencia: tipoResidencia,
            vehiculo_ley: vehiculoLey,
            nacionalidad,
        } = data

        if (nacionalidad === 'Argentina') {
            delete requireds.fecha_vencimiento
            delete requireds.tipo_residencia
            data.tipo_residencia = 'N/A'
            data.fecha_vencimiento = 'N/A'
        } else {
            delete requireds.tipo
            data.tipo = 'N/A'

            if (tipoResidencia.toUpperCase() === 'PERMANENTE') {
                delete requireds.fecha_vencimiento
                data.fecha_vencimiento = 'N/A'
            }
        }

        if (vehiculoLey === false) {
            delete requireds.fecha_ley
            data.fecha_ley = 'N/A'
        }


        for (const valueRequired of requireds) {
            if (!data[valueRequired] && data[valueRequired] !== false) {
                const error = new Error('Value Required Missing: ' + valueRequired)
                error.field = valueRequired
                throw error
            }

            this.data[valueRequired] = data[valueRequired]
        }
    }
    get valuesRequired() {
        return [
                'nombres',
                'apellidos',
                'fecha_nacimiento',
                'genero',
                'tipo_doc',
                'pais',
                'nro_doc',
                'cuil',
                'nacionalidad',
                'tipo',
                'tipo_residencia',
                'fecha_vencimiento',
                'domicilio',
                'provincia',
                'departamento',
                'localidad',
                'cod_postal',
                'telefono',
                'email',
                'estado_civil',
                'vehiculo_ley',
                'fecha_ley',
                'simbolo_internacional',
                'percibir_asignacion',
                /* 'lugar',
                'fecha', */
            ]
    }
    get valuesAllowed() {
        return [
                'nombres',
                'apellidos',
                'fecha_nacimiento',
                'genero',
                'tipo_doc',
                'pais',
                'nro_doc',
                'cuil',
                'nacionalidad',
                'tipo',
                'tipo_residencia',
                'fecha_vencimiento',
                'domicilio',
                'provincia',
                'departamento',
                'localidad',
                'cod_postal',
                'telefono',
                'email',
                'estado_civil',
                'vehiculo_ley',
                'fecha_ley',
                'simbolo_internacional',
                'percibir_asignacion',
/*                 'lugar',
                'fecha', */
                'familiar',
                'nombre_familiar',
                'apellido_familiar',
                'tipo_doc_familiar',
                'pais_familiar',
                'nro_doc_familiar',
                'nacionalidad_familiar',
                'domicilio_familiar',
                'cod_postal_familiar',
                'localidad_familiar',
                'provincia_familiar',
                'telefono_familiar',
                'designacion',
                'fecha_designacion',
                'juzgado',
                'secretaria',
                'dpto_judicial',
                'fiscalia',
                'defensoria',
                'lugar_tutor',
                'fecha_tutor',
                'interesado',
            ]
    }
}

/**
 *
 * @param {Buffer} templateOneBuffer
 * @param {Buffer} templateTwoBuffer
 */
const getPdfBuffer = (templateOneBuffer, templateTwoBuffer) => {
    const getPdfBufferPromise = new Promise((resolve, reject) => {
        loadImage(logoBase64Buffer)
            .then((logoImage) => {
                const logoCanvas = createCanvas(193, 89, 'svg')
                const logoCtx = logoCanvas.getContext('2d')
                logoCtx.drawImage(logoImage, 0, 0)

                //const pdfCanvas = createCanvas(612, 1008, 'pdf')
                const pdfCanvas = createCanvas(612, 1008, 'pdf')
                const ctx = pdfCanvas.getContext('2d')
                //ctx.addPage(612, 1008)

                const templatePromises = [
                    loadImage(templateOneBuffer),
                    loadImage(templateTwoBuffer),
                ]


                Promise.all(templatePromises)
                    // eslint-disable-next-line comma-spacing
                    .then(([firstImage, secondImage,]) => {
                        ctx.drawImage(logoCanvas, 75, 20)
                        ctx.drawImage(firstImage, 0, 0)

                        ctx.addPage()
                        //ctx.drawImage(logoCanvas, 75, 20)
                        ctx.drawImage(secondImage, 0, 0)

                        const pdfBuffer = pdfCanvas.toBuffer('application/pdf')

                        resolve(pdfBuffer)
                    })
                    .catch(reject)
                })
                .catch(reject)
    })

    return getPdfBufferPromise
}

/**
 *
 * @param {Object} pageOneData
 * @param {Object} pageTwoData
 */
const getPdf = (pageOneData, representativeData, tutorData) => {
    try {
        new PdfData(pageOneData, representativeData, tutorData)
    } catch (e) {
        return Promise.reject(e)
    }

    const getPdfPromise = new Promise((resolve, reject) => {
        const templateOneBuffer = getPdfTemplatePageOneBuffer(pageOneData)

        const templateTwoBuffer = getPdfTemplatePageTwoBuffer(representativeData, tutorData)

        getPdfBuffer(templateOneBuffer, templateTwoBuffer)
            .then(resolve)
            .catch(reject)
    })

    return getPdfPromise
}

export {
    getPdf,
}