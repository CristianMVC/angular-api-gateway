import config       from '../../config/env'
import nodemailer   from 'nodemailer'
import mg           from 'nodemailer-mailgun-transport'

const { auth, from, mail: defaultMail, } = config.ws2.mailgun
const transporter = nodemailer.createTransport(mg(auth))


/**
 *
 * @param {String} mail         Destinatario
 * @param {String} subject      Asunto
 * @param {String} msjParse     Cuerpo del mensaje (html)
 * @param {Object[]} attachments Array de attachments
 */

const sendMail = (mail, subject, msjParse, attachments = []) => {
    const mailOptions = {
      from,
      to: process.env.NODE_ENV === 'production' ? mail : defaultMail,
      subject,
      html: msjParse,
    }

    if (attachments.length) { //si hay adjunto, se agrega a las opciones
      mailOptions.attachments = attachments
    }

    transporter.sendMail(mailOptions)
      .then(() => {})
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
}

const sendMailPromise = (mail, subject, msjParse, attachments = [], tag = null) => {
  const mailOptions = {
    from,
    to: process.env.NODE_ENV === 'production' ? mail : defaultMail,
    subject,
    html: msjParse,
  }

  if (attachments.length) {
    mailOptions.attachments = attachments
  }

  if (tag !== null && tag.toString().trim().length > 0) {
    mailOptions['o:tag'] = [
      tag,
    ]
  }

  return transporter.sendMail(mailOptions)
}


export { sendMail, sendMailPromise, }
