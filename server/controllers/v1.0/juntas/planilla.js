import { getPdf, }          from './pdf-utils'
import APIError             from '../../../helpers/APIError'
import { sendMail, }                   from '../../../helpers/mailgun'


const pdfTemplate = (name) => {
    const template =
        `<html xmlns="http://www.w3.org/1999/xhtml">

            <head>
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Planilla Cud</title>
            <style type="text/css">
                #outlook a {
                padding: 0;
                }
                
                .ReadMsgBody {
                width: 100%;
                }
                
                .ExternalClass {
                width: 100%;
                }
                
                .ExternalClass * {
                line-height: 100%;
                }
                
                body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased !important;
                }
                
                table,
                td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                }
                
                img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
                }
                
                p {
                display: block;
                margin: 13px 0;
                }
            
            
            
                @media only screen and (max-width:480px) {
                @-ms-viewport {
                    width: 320px;
                }
                @viewport {
                    width: 320px;
                }
                }
            
                @media only screen and (min-width:480px) {
                .mj-column-per-100,
                * [aria-labelledby="mj-column-per-100"] {
                    width: 100%!important;
                }
                .mj-column-per-50,
                * [aria-labelledby="mj-column-per-50"] {
                    width: 50%!important;
                }
                .mj-column-per-33,
                * [aria-labelledby="mj-column-per-33"] {
                    width: 33%!important;
                }
                .mj-column-px-280,
                * [aria-labelledby="mj-column-px-280"] {
                    width: 280px!important;
                }
                }
            
                @media only screen and (max-width:600px) {
                .redes {
                    width: 250px !important;
                }
                
                }
            
                @media only screen and (max-width:480px) {
                .mj-hero-content {
                    width: 100% !important;
                }
                .td-imagen{
                    width: 500px!important;
                }
                .imagen{
                    width: 100%;
                    
                }
                }
            
            
            </style>
            </head>
            
            <body style="background: #ffffff;">
            <div style="background-color:#ffffff; ">
                <div style="margin:0 auto;max-width:600px;background:#ffffff;">
                <!--[if (gte mso 9)|(IE)]>
                    <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td>
                            <![endif]-->
                            <table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff; " align="left" border="0">
                                <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;">
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                        <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                        <tbody>
                                            <tr>
                                            <td height="30"></td>
                                            </tr>
                                            <tr>
                                            <td width="25"></td>
                                            <td align="left">
                                                <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="left" border="0">
                                                <tbody>
                                                    <tr>
                                                    <td style="width:200px; ">
                                                        <img alt="Mi Argentina" title="Mi Argentina" src="https://www.argentina.gob.ar/sites/default/files/miargentina_logo2018.png"
                                                        style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;" width="200">
                                                    </td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                            <td width="25"></td>
                                            </tr>
                                            <tr>
                                            <td height="30"></td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                                </td>
                            </
                                <![endif]-->
                            </div>
                            <div style="margin:0 auto;max-width:600px;background:#ffffff; padding-bottom: 40px;">
                            <table cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff; padding-bottom: 40px;" align="center" border="0">
                                <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;">
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
                                        <table style="background-color: #f5f5f5; padding: 20px 0px;" align="center">
                                        <tr>
                                            <td style="background-color: #f5f5f5;" align="center">
                                            <table cellpadding="0" cellspacing="0" width="100%" border="0" >
                                                <tbody>
                                                <tr>
                                                    <td style="width: 60px; padding: 15px 25px;" align="left">
                                                    <img alt="Accesibilidad" title="Accesibilidad" src="https://www.argentina.gob.ar/sites/default/files/accesibilidad.png"
                                                    style="border:none;display:block;outline:none;text-decoration:none;width:60px;height:auto;" width="60" align="left">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width:500px; padding: 0px 25px;">
                                                    <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:25px; line-height:1.4; margin:0px; font-weight: bolder;">Hola, ${name} </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height: 20px" height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width:500px; padding: 0px 25px;">
                                                    <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:17px; line-height:1.6; margin:0px;">Te enviamos adjunta la <b>planilla</b> que completaste en Mi Argentina para <b>solicitar el Certificado &Uacute;nico de Discapacidad.</b></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height: 15px" height="15"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width:500px; padding: 0px 25px;">
                                                    <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:17px; line-height:1.6; margin:0px;">Pod&eacute;s <b>imprimirla</b> y <b>presentarla</b> en la Junta que te corresponde.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height: 15px" height="15"></td>
                                                </tr>                                                
                                                <tr>
                                                    <td style="height: 30px" height="30"></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        </table>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                </tr>
                                </table>
                            <![endif]-->
                            </div>
                        </div>
            </body>
        
        
        </html>`

    return template
}

const sendPDF = (req, res, next) => {
    const  {
        body,
        //userData,
    } = req

  /*   const {
        email,
        first_name: firstName,
        last_name: lastName,

    } = userData */

    const {
        solicitante: firstPage,
        representante: representativeData = {},
        tutor: tutorData = {},
    } = body

    const {
        email,
        nombres: firstName,
        cuil,
    } = firstPage

    getPdf(firstPage, representativeData, tutorData)
        .then((pdfBuffer) => {
            const templateGenerated = pdfTemplate(firstName)
            const attachments = [
                {
                    content: pdfBuffer,
                    filename: `planilla_CUD-${cuil}.pdf`,
                    contentType: 'application/pdf',
                },
            ]
            sendMail(email, 'Planilla de solicitud de CUD', templateGenerated, attachments)
            res.json()
        })
        .catch((e) => {
            const apiError = APIError(e)
            next(apiError)
        })
}

export default {
    sendPDF,
}