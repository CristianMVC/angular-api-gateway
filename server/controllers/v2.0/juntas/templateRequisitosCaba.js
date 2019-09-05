const template = (nombre, juntas, requisitos) => {
  juntas = juntas.map((item) => {
    return  `<tr>
              <td style="width: 500px; padding: 0px 25px;">
                <table>
                  <tr>
                    <td style="width: 25px;">
                      <img src="https://www.argentina.gob.ar/sites/default/files/junta.png" alt="Junta" title="Junta" />
                    </td>
                    <td>
                      <p style="font-family:Helvetica, arial, sans-serif; color:#333333; font-size:20px; line-height:1; padding-left: 10px;font-weight: bolder;">
                        Esta es la Junta:
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="width: 500px;  padding: 0px 25px 10px 25px;">
                <p style="font-family:Helvetica, arial, sans-serif; color:#333333; font-size:16px; margin-top: 0;">${item.nombre}</p>
              </td>
            </tr>

            <tr>
              <td style="width: 500px;  padding: 0px 25px;">
                <p style="font-family:Helvetica, arial, sans-serif; color:#333333; font-size:18px; line-height:1.6;font-weight: bolder;">
                  Sac&aacute; turno en el Servicio Social Zonal m&aacute;s cercano a tu domicilio.
                </p>
              </td>
            </tr>

            <tr>
              <td style="width: 500px;  padding: 0px 25px;">
                <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                  <tr>
                    <td style="word-break:break-word;font-size:0px;padding-right:15px;"
                      align="left">
                      <table cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="left"
                        border="0">
                        <tr>
                          <td
                            style="border:none;border-radius:5px;color:#FFFFFF;cursor:auto;padding:15px;"
                            align="center" valign="middle" bgcolor="#2E7D33">
                            <a href="${item.botonConsulta}"
                              style="width:100%;text-decoration:none;line-height:100%;background:#2E7D33;color:#FFFFFF;font-family:Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:16px;font-weight:bolder;text-transform:none;margin:0px; text-transform: uppercase;"
                              target="_blank">Consult&aacute; el servicio m&aacute;s cercano</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td style="height: 10px;"></td>
                  </tr>
                </table>
              </td>
            </tr>
        
            <tr>
              <td style="width:500px; padding: 0px 25px;">
                <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:16px; font-weight: bolder;">Datos de contacto</p>
                <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:16px; "><a href="tel:08009992727" style="color:#0072bb;">0-800-999-2727</a> o al <a href="147" style="color:#0072bb;">147</a></p>
              </td>
            </tr>
            <tr>
              <td style="height: 10px;"></td>
            </tr>
            <tr>
              <td style="width:500px; padding: 0px 25px 0px 25px;">
                <hr />
              </td>
            </tr>
    `
  })

  requisitos = requisitos.map((item) => {
    return '<li>' + item + '</li>'
  })

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
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
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:30px; line-height:1.4; margin:0px; font-weight: bolder;">Hola, ${nombre} </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 20px" height="20"></td>
                              </tr>
                              <tr>
                                <td style="width:500px; padding: 0px 25px;">
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:17px; line-height:1.6; margin:0px;">Estos son los documentos y el lugar donde ten&eacute;s que concurrir para hacer el tr&aacute;mite de tu Certificado &Uacute;nico de Discapacidad.</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 15px" height="15"></td>
                              </tr>

                              ${juntas.join('')}
                              
                              <tr>
                                <td style="height: 10px;"></td>
                              </tr>
                              <tr>
                                <td style="width:500px; padding: 0px 25px;">
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:14px; line-height:1.6; margin:0px;">Cualquier persona que lleve la documentaci&oacute;n puede solicitar el turno. La direcci&oacute;n mencionada es la del centro de atenci&oacute;n que te corresponde. Pod&eacute;s ir o llamar si ten&eacute;s alguna duda.</p>
                                  
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 10px;"></td>
                              </tr>

                              <tr>
                                <td style="width:500px; padding: 0px 25px;">
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:14px; line-height:1.6; margin:0px;">Record&aacute; que a la Evaluaci&oacute;n por la Junta deber&aacute; asistir la persona para la que se solicita el certificado.</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="height: 15px" height="15"></td>
                              </tr>
                              <tr>
                                <td style="width: 500px;  padding: 0px 25px;">
                                  <table>
                                    <tr>
                                      <td style="width: 25px;">
                                        <img src="https://www.argentina.gob.ar/sites/default/files/documento.png" alt="localización" />
                                      </td>
                                      <td>
                                        <p style="font-family:Helvetica, arial, sans-serif; color:#333333; font-size:20px; line-height:1.6; padding-left: 10px; font-weight: bolder;">
                                          Qu&eacute; llevar para que te den un turno
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="width: 500px;  padding: 0px 25px;"> 
                                  <ol style="text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:16px; line-height:1.6;">
                                    ${requisitos.join('')}
                                  </ol>
                                </td>
                              </tr>
                              <tr>
                                <td style="width:500px; padding: 0px 25px 0px 25px;">
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td style="width:500px;" height="10">
                                  
                                </td>
                              </tr>
                              <tr>
                                <td style="width:500px; padding: 0px 25px;">
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:14px; line-height:1.6; margin:0px;"><b>NOTA:</b> Ten&eacute; en cuenta que la Junta Evaluadora podr&aacute; solicitar nuevos estudios o informes para ampliar la documentaci&oacute;n presentada, en los casos que la misma no sea concluyente.</p>
                                </td>
                              </tr>
                                <tr>
                                <td style="width:500px;" height="10">
                                  
                                </td>
                              </tr>
                              <tr>
                                <td style="width:500px; padding: 0px 25px;">
                                  <p style="width:100%; text-align:left;font-family:Helvetica, arial, sans-serif; color:#333333; font-size:14px; line-height:1.6; margin:0px;">En caso de dudas respecto a los estudios que deb&eacute;s presentar, consult&aacute; con el equipo de salud/m&eacute;dico tratante.</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="width:500px;" height="40">
                                  
                                </td>
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
        </div>
      </div>
    </body>
    </html>
  `
}

export { template, }