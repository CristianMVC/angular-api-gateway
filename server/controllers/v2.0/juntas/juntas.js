import APIResponses                           from '../../../helpers/APIStandarResponses'
import APIError                               from '../../../helpers/APIError'
import config                                 from '../../../../config/env'
import { sheets, }                            from '../../../helpers/google/sheets'
import { template as msjTemplateCaba, }       from './templateRequisitosCaba'
import { template as msjTemplateTurnos, }     from './templateRequisitosTurnos'
import { template as msjTemplateSinTurnos, }  from './templateRequisitosSinTurno'
import { sendMailPromise, }                   from '../../../helpers/mailgun'
import CudValidation                          from '../../../models/cudValidation'
import { pgPool, }                            from '../../../../config/postgres'
import pgMailsList                            from '../../../models/pg-utils/pgMailsList'
import logger                                 from '../../../../config/winston'

const { mail: correo, } = config.ws2.mailgun

const methods = {
  getElement(opt) {
    const sheetsPromise = new Promise((resolve, reject) => {
      const googleSheets = sheets()

      googleSheets.spreadsheets.values.get({
        spreadsheetId: '1pvcQRLcLr8_gvJfb5rij-QhqUHcs5mS3lkJnBnfqyCw',
        range: 'Sheet1!A3:H',
        }, (err, res) => {
          if (err) {
            reject(err)
            return
          }

          try {
            const rows = res.data.values

            if (!rows.length) {
              resolve([])
              return
            }

            const response = rows.map((row) => {
              const rowProvincia = row[1] ? row[1].trim() : row[1]
              const rowLocalidad = row[2] ? row[2].trim() : row[2]

              if ((opt.provincia && rowProvincia != opt.provincia)) {
                return
              }

              if ((opt.localidad && rowLocalidad != opt.localidad)) {
                return
              }

              return {
                provincia: row[1] ? row[1] : '',
                localidad: row[2] ? row[2] : '',
                nombre: row[0] ? row[0] : '',
                direccion: row[3] ? row[3] : '',
                contacto: row[4] ? row[4] : '',
                botonTurno: row[5] ? row[5].replace(/\n/g, '') : '',
                botonAsesoramiento: row[6] ? row[6].replace(/\n/g, '') : '',
                botonConsulta: row[7] ? row[7].replace(/\n/g, '') : '',
              }
            }).filter((row) => row)

            resolve(response)
          } catch (e) {
              reject(e)
          }
      })
    })

    return sheetsPromise
  },
  getRequisitos(opts) {
    const requisitosPromise = new Promise((resolve, reject) => {
      const array = []

      if (opts.tramiteSolicitud && opts.tramiteSolicitud === 'true') {
        let orden
        const solicitudPromise = new Promise((resolve, reject) => {
          CudValidation.get(1)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(solicitudPromise)
      }

      if (opts.tramiteRenovacion && opts.tramiteRenovacion === 'true') {
        let orden
        const renovacionPromise = new Promise((resolve, reject) => {
          CudValidation.get(2)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(renovacionPromise)
      }

      if (opts.tramitePerdidaCerti && opts.tramitePerdidaCerti === 'true') {
        let orden
        const perdidaCertiPromise = new Promise((resolve, reject) => {
          CudValidation.get(3)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(perdidaCertiPromise)
      }

      if (opts.tramiteAgravamiento && opts.tramiteAgravamiento === 'true') {
        let orden
        const agravamientoPromise = new Promise((resolve, reject) => {
          CudValidation.get(4)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(agravamientoPromise)
      }

      if (opts.tramiteFallecimiento && opts.tramiteFallecimiento === 'true') {
        let orden
        const fallecimientoPromise = new Promise((resolve, reject) => {
          CudValidation.get(5)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(fallecimientoPromise)
      }

      if (opts.tramiteVoluntaria && opts.tramiteVoluntaria === 'true') {
        let orden
        const voluntariaPromise = new Promise((resolve, reject) => {
          CudValidation.get(6)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(voluntariaPromise)
      }

      if (opts.tramiteCambioAdopcion && opts.tramiteCambioAdopcion === 'true') {
        let orden
        const adopcionPromise = new Promise((resolve, reject) => {
          CudValidation.get(7)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(adopcionPromise)
      }

      if (opts.tramiteCambioGenero && opts.tramiteCambioGenero === 'true') {
        let orden
        const generoPromise = new Promise((resolve, reject) => {
          CudValidation.get(8)
          .then((requirement) => {
            orden = requirement._doc.html
          })
          .catch(() => {})
          .finally(() => {
            resolve(orden)
          })
        })
        array.push(generoPromise)
      }

      if (opts.tramiteFallecimiento === 'false' && opts.tramiteVoluntaria === 'false') {
        if (opts.edad && opts.edad === 'false') {
          let orden, orden2
          const menorPromise = new Promise((resolve, reject) => {
            CudValidation.get(13)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(menorPromise)

          if (opts.intelectualMental && opts.intelectualMental === 'true') {
            const menor2Promise = new Promise((resolve, reject) => {
              CudValidation.get(14)
                .then((requirement) => {
                  orden2 = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden2)
                })
            })
            array.push(menor2Promise)
          }
        } else {
          let orden
          if (opts.mayorCuratela && opts.mayorCuratela === 'true') {
            const curatelaPromise = new Promise((resolve, reject) => {
              CudValidation.get(12)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(curatelaPromise)
          }
          if (opts.mayorApoyo && opts.mayorApoyo === 'true') {
            const apoyoPromise = new Promise((resolve, reject) => {
              CudValidation.get(11)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(apoyoPromise)
          }
        }

        if (opts.edad && opts.tutor && opts.edad === 'false') {
          if (opts.tutor === 'true') {
            let orden
            const tutorPromise = new Promise((resolve, reject) => {
              CudValidation.get(15)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(tutorPromise)
          } else {
            let orden
            const tutorNoPromise = new Promise((resolve, reject) => {
              CudValidation.get(9)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(tutorNoPromise)
          }
        }

        if (opts.obraSocial && opts.obraSocial === 'true') {
          let orden
          const obraSocialPromise = new Promise((resolve, reject) => {
            CudValidation.get(16)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(obraSocialPromise)

          if (opts.edad && opts.edad === 'true') {
            let orden
            const socialTutorMayorPromise = new Promise((resolve, reject) => {
              CudValidation.get(20)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(socialTutorMayorPromise)
          } else {
            let orden
            if (opts.tutor && opts.tutor === 'true') {
              const socialTutorPromise = new Promise((resolve, reject) => {
                CudValidation.get(22)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(socialTutorPromise)
            } else {
              const socialTutorNoPromise = new Promise((resolve, reject) => {
                CudValidation.get(21)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(socialTutorNoPromise)
            }
          }
        }

        if (opts.prepaga && opts.prepaga === 'true') {
          let orden
          const prepagaPromise = new Promise((resolve, reject) => {
            CudValidation.get(19)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(prepagaPromise)
        }

        if (opts.pami && opts.pami === 'true') {
          let orden, orden2
          const pamiPromise = new Promise((resolve, reject) => {
            CudValidation.get(17)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(pamiPromise)
          if (opts.edad === 'false') {
            if (opts.tutor && opts.tutor === 'true') {
              const prepagaTutorPromise = new Promise((resolve, reject) => {
                CudValidation.get(22)
                  .then((requirement) => {
                    orden2 = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden2)
                  })
              })
              array.push(prepagaTutorPromise)
            } else {
              const prepagaTutorNoPromise = new Promise((resolve, reject) => {
                CudValidation.get(21)
                  .then((requirement) => {
                    orden2 = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden2)
                  })
              })
              array.push(prepagaTutorNoPromise)
            }
          }
        }

        if (opts.salud && opts.salud === 'true') {
          if (opts.edad === 'true') {
            let orden
            const saludMayorPromise = new Promise((resolve, reject) => {
              CudValidation.get(18)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(saludMayorPromise)
          } else {
            if (opts.tutor === 'true') {
              let orden
              const saludTutorPromise = new Promise((resolve, reject) => {
                CudValidation.get(22)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(saludTutorPromise)
            } else {
              let orden
              const saludTutorNoPromise = new Promise((resolve, reject) => {
                CudValidation.get(21)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(saludTutorNoPromise)
            }
          }
        }

        if (opts.atencion && opts.atencion === 'true') {
          if (opts.edad === 'false') {
            if (opts.tutor === 'true') {
              let orden
              const atencionTutorPromise = new Promise((resolve, reject) => {
                CudValidation.get(22)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(atencionTutorPromise)
            } else {
              let orden
              const atencionTutorNoPromise = new Promise((resolve, reject) => {
                CudValidation.get(21)
                  .then((requirement) => {
                    orden = requirement._doc.html
                  })
                  .catch(() => {})
                  .finally(() => {
                    resolve(orden)
                  })
              })
              array.push(atencionTutorNoPromise)
            }
          }
        }

        if (opts.intelectualMental === 'true' || opts.motor === 'true' || opts.respiratorio === 'true' || opts.digestivoHepatico === 'true') {
          let orden
          const certificadoPromise = new Promise((resolve, reject) => {
            CudValidation.get(23)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(certificadoPromise)
        }

        if (opts.intelectualMental && opts.intelectualMental === 'true') {
          let orden, orden2
          const trastornoMentalPromise = new Promise((resolve, reject) => {
            CudValidation.get(38)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(trastornoMentalPromise)

          const epilepsiaPromise = new Promise((resolve, reject) => {
            CudValidation.get(39)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(epilepsiaPromise)

          if (opts.edad === 'true') {
            let orden
            const intelectualMayorPromise = new Promise((resolve, reject) => {
              CudValidation.get(30)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(intelectualMayorPromise)
          } else {
            let orden
            const intelectualMenorPromise = new Promise((resolve, reject) => {
              CudValidation.get(31)
                .then((requirement) => {
                  orden = requirement._doc.html
                })
                .catch(() => {})
                .finally(() => {
                  resolve(orden)
                })
            })
            array.push(intelectualMenorPromise)
          }
        }

        if (opts.visual && opts.visual === 'true') {
          let orden, orden2
          const visualPromise = new Promise((resolve, reject) => {
            CudValidation.get(36)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(visualPromise)

          const visualPlanillaPromise = new Promise((resolve, reject) => {
            CudValidation.get(40)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(visualPlanillaPromise)
        }

        if (opts.motor && opts.motor === 'true') {
          let orden, orden2
          const motorPromise = new Promise((resolve, reject) => {
            CudValidation.get(37)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(motorPromise)

          const motorPlanillaPromise = new Promise((resolve, reject) => {
            CudValidation.get(41)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(motorPlanillaPromise)
        }

        if (opts.auditivo && opts.auditivo === 'true') {
          let orden, orden2
          const auditivoCertiPromise = new Promise((resolve, reject) => {
            CudValidation.get(24)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(auditivoCertiPromise)

          const auditivoEstudiosPromise = new Promise((resolve, reject) => {
            CudValidation.get(29)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(auditivoEstudiosPromise)
        }

        if (opts.respiratorio && opts.respiratorio === 'true') {
          let orden, orden2, orden3
          const espirometriaPromise = new Promise((resolve, reject) => {
            CudValidation.get(32)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(espirometriaPromise)

          const polisomnograficoPromise = new Promise((resolve, reject) => {
            CudValidation.get(34)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(polisomnograficoPromise)

          const estudiosPromise = new Promise((resolve, reject) => {
            CudValidation.get(35)
              .then((requirement) => {
                orden3 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden3)
              })
          })
          array.push(estudiosPromise)
        }

        if (opts.cardiovascular && opts.cardiovascular === 'true') {
          let orden, orden2, orden3, orden4
          const cardioCertiPromise = new Promise((resolve, reject) => {
            CudValidation.get(25)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(cardioCertiPromise)

          const cardioComplementariosPromise = new Promise((resolve, reject) => {
            CudValidation.get(27)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(cardioComplementariosPromise)

          const cardioEstudiosPromise = new Promise((resolve, reject) => {
            CudValidation.get(28)
              .then((requirement) => {
                orden3 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden3)
              })
          })
          array.push(cardioEstudiosPromise)

          const cardioPlanillaPromise = new Promise((resolve, reject) => {
            CudValidation.get(42)
              .then((requirement) => {
                orden4 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden4)
              })
          })
          array.push(cardioPlanillaPromise)
        }

        if (opts.renal && opts.renal === 'true') {
          let orden, orden2, orden3
          const renalCertiPromise = new Promise((resolve, reject) => {
            CudValidation.get(26)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(renalCertiPromise)

          const renalEstudiosPromise = new Promise((resolve, reject) => {
            CudValidation.get(45)
              .then((requirement) => {
                orden2 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden2)
              })
          })
          array.push(renalEstudiosPromise)

          const renalPlanillaPromise = new Promise((resolve, reject) => {
            CudValidation.get(43)
              .then((requirement) => {
                orden3 = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden3)
              })
          })
          array.push(renalPlanillaPromise)
        }

        if (opts.digestivoHepatico && opts.digestivoHepatico === 'true') {
          let orden
          const digestivoPromise = new Promise((resolve, reject) => {
            CudValidation.get(33)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(digestivoPromise)
        }

        if (opts.intelectualMental === 'true' || opts.visual === 'true' || opts.motor === 'true' || opts.auditivo === 'true' || opts.respiratorio === 'true' || opts.cardiovascular === 'true' || opts.renal === 'true' || opts.digestivoHepatico === 'true' || opts.tramiteCambioAdopcion === 'true' || opts.tramiteCambioGenero === 'true') {
          let orden
          const discapacidadPromise = new Promise((resolve, reject) => {
            CudValidation.get(44)
              .then((requirement) => {
                orden = requirement._doc.html
              })
              .catch(() => {})
              .finally(() => {
                resolve(orden)
              })
          })
          array.push(discapacidadPromise)
        }
      }

      Promise.all(array)
        .then((val) => {
          const requirementArray = []

          val.filter((item) => item)
             .forEach((v) => { requirementArray.push(...v) })

          resolve(requirementArray)
        })
        .catch((e) => {
          reject(e)
        })
    })

    return requisitosPromise
  },
}


const getElement = (req, res, next) => {
  logger.log('debug', 'Controller::JuntasRequisitos::Methods::getElement')

  const { userData, } = req

  const opt = {
    provincia: req.query.provincia,
    localidad: req.query.localidad,
  }

  const opts = {
    tramiteSolicitud: (req.query.tramite_solicitud === 'true') ? 'true' : 'false',
    tramiteRenovacion: (req.query.tramite_renovacion === 'true') ? 'true' : 'false',
    tramitePerdidaCerti: (req.query.tramite_perdida_certi === 'true') ? 'true' : 'false',
    tramiteAgravamiento: (req.query.tramite_agravamiento === 'true') ? 'true' : 'false',
    tramiteFallecimiento: (req.query.tramite_fallecimiento === 'true') ? 'true' : 'false',
    tramiteVoluntaria: (req.query.tramite_voluntaria === 'true') ? 'true' : 'false',
    tramiteCambioAdopcion: (req.query.tramite_cambio_adopcion === 'true') ? 'true' : 'false',
    tramiteCambioGenero: (req.query.tramite_cambio_genero === 'true') ? 'true' : 'false',
    edad: (req.query.edad === 'true') ? 'true' : 'false',
    mayorFirma: (req.query.mayor_firma === 'true') ? 'true' : 'false',
    mayorApoyo: (req.query.mayor_apoyo === 'true') ? 'true' : 'false',
    mayorCuratela: (req.query.mayor_curatela === 'true') ? 'true' : 'false',
    tutor: (req.query.tutor === 'true') ? 'true' : 'false',
    obraSocial: (req.query.obra_social === 'true') ? 'true' : 'false',
    prepaga: (req.query.prepaga === 'true') ? 'true' : 'false',
    atencion: (req.query.atencion === 'true') ? 'true' : 'false',
    pami: (req.query.pami === 'true') ? 'true' : 'false',
    salud: (req.query.salud === 'true') ? 'true' : 'false',
    intelectualMental: (req.query.intelectual_mental === 'true') ? 'true' : 'false',
    visual: (req.query.visual === 'true') ? 'true' : 'false',
    motor: (req.query.motor === 'true') ? 'true' : 'false',
    auditivo: (req.query.auditivo === 'true') ? 'true' : 'false',
    respiratorio: (req.query.respiratorio === 'true') ? 'true' : 'false',
    cardiovascular: (req.query.cardiovascular === 'true') ? 'true' : 'false',
    renal: (req.query.renal === 'true') ? 'true' : 'false',
    digestivoHepatico: (req.query.digestivo_hepatico === 'true') ? 'true' : 'false',
  }

  if (opt.localidad && !opt.provincia) {
    const apiError = APIError({
      status: 400,
      message: 'Error: se envío localidad, el campo provincia es requerido.',
    })

    next(apiError)

    return
  }

  methods.getElement(opt)
  .then((v) => {
    if (!v || !v.length) {
      const apiError = APIError({
        status: 404,
        message: 'Not Found',
      })
      next(apiError)
    }

    methods.getRequisitos(opts)

    .then((r) => {
      let tramite, cobertura
      const discapacidad = []

      if (req.query.tramite_solicitud === 'true') {
        tramite = 'Solicitud por primera vez'
      } else if (req.query.tramite_renovacion === 'true') {
        tramite = 'Renovación'
      } else if (req.query.tramite_perdida_certi === 'true') {
        tramite = 'Pérdida del certificado'
      } else if (req.query.tramite_agravamiento === 'true') {
        tramite = 'Agravamiento'
      } else if (req.query.tramite_fallecimiento === 'true') {
        tramite = 'Baja por fallecimiento'
      } else if (req.query.tramite_voluntaria === 'true') {
        tramite = 'Baja voluntaria'
      } else if (req.query.tramite_cambio_adopcion === 'true') {
        tramite = 'Cambio de identidad por adopción'
      } else if (req.query.tramite_cambio_genero === 'true') {
        tramite = 'Cambio de identidad de género'
      }

      if (req.query.obra_social === 'true') {
        cobertura = 'Obra Social'
      } else if (req.query.prepaga === 'true') {
        cobertura = 'Medicina prepaga'
      } else if (req.query.atencion === 'true') {
        cobertura = 'Atención en hospital o centro de salud pública'
      } else if (req.query.pami === 'true') {
        cobertura = 'PAMI'
      } else if (req.query.salud === 'true') {
        cobertura = 'Programa Incluir Salud'
      }

      if (req.query.intelectual_mental === 'true') {
        discapacidad.push('Intelectual y Mental')
      }
      if (req.query.visual === 'true') {
        discapacidad.push('Visual')
      }
      if (req.query.motor === 'true') {
        discapacidad.push('Motor')
      }
      if (req.query.auditivo === 'true') {
        discapacidad.push('Auditivo')
      }
      if (req.query.respiratorio === 'true') {
        discapacidad.push('Respiratorio')
      }
      if (req.query.cardiovascular === 'true') {
        discapacidad.push('Cardiovascular')
      }
      if (req.query.renal === 'true') {
        discapacidad.push('Renal urológico')
      }
      if (req.query.digestivo_hepatico === 'true') {
        discapacidad.push('Digestivo / Hepático')
      }

      let mensaje = '<p>Según el trámite a realizar <strong>(' + tramite + ')</strong>'

      if (req.query.tramite_fallecimiento === 'true' || req.query.tramite_voluntaria === 'true') {
        mensaje = mensaje + ' tenés que presentar esta documentación:</p>'
      } else {
        if (discapacidad.length) {
          mensaje = mensaje + ', el origen del problema de salud por el cual se solicita el certificado <strong>(' + discapacidad.join(', ') + ')</strong>'
        }

        if (req.query.edad === 'true' || req.query.edad === 'false') {
          if (req.query.edad === 'true') {
            mensaje = mensaje + ', la edad <strong>(mayor de 16 años)</strong>'
          } else {
            mensaje = mensaje + ', la edad <strong>(menor de 16 años)</strong>'
          }
        }

        if (cobertura) {
          mensaje = mensaje + ' y el tipo de cobertura <strong>(' + cobertura + ')</strong>'
        }
        mensaje = mensaje + ' tenés que presentar esta documentación:</p>'
      }

      const data = {
        juntas: v,
        requisitos: r,
        mensaje,
      }

      const nombre = userData.first_name
      const juntas = v
      const requisitos = data.requisitos
      const mail = correo ? correo : userData.email
      const linkJunta = v[0].botonTurno
      const linkAsesoramiento = v[0].botonAsesoramiento
      const subject = 'Requisitos para tramitar tu CUD'

      let msjTemplate
      if (opt.localidad === 'Ciudad Autónoma de Buenos Aires') {
        msjTemplate = msjTemplateCaba(nombre, juntas, requisitos)
      } else if (linkJunta || linkAsesoramiento) {
        msjTemplate = msjTemplateTurnos(nombre, juntas, requisitos)
      } else {
        msjTemplate = msjTemplateSinTurnos(nombre, juntas, requisitos)
      }

      const logData = {
        idUser: userData.username,
        tag: pgMailsList.formWizardCud.value,
        state: 'failed',
        messageId: null,
      }

      sendMailPromise(mail, subject, msjTemplate, [], 'wizard-cud')
        .then((info) => {
          logData.state = 'pending'
          logData.messageId = info.messageId

          pgPool.query(`SELECT apigw.insert_user_notifications('${logData.idUser}', apigw.get_campaigns_id('${logData.tag}'), '${logData.state}', '${logData.messageId}')`)
          .catch(() => {})
        })
        .catch(() => {
          logData.state = 'reject'
          pgPool.query(`SELECT apigw.insert_user_notifications('${logData.idUser}', apigw.get_campaigns_id('${logData.tag}'), '${logData.state}', '${logData.messageId}')`)
          .catch(() => {})
        })

      res.json(APIResponses.list(0, 0, data))
    })
    .catch((er) => {
      const apiError = APIError({
        status: (er.status) ? er.status : 503,
        message: `Error: extWS, ${er.message}`,
      })

      next(apiError)
    })
  })
  .catch((e) => {
    const apiError = APIError({
      status: (e.status) ? e.status : 503,
      message: `Error: extWS, ${e.message}`,
    })

    next(apiError)
  })
}

export default {
  getElement,
}
