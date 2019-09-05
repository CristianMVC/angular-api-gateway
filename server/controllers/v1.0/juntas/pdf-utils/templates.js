
const logoBase64 = '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'

const logoBase64Buffer = Buffer.from(logoBase64, 'base64')

const getPdfTemplatePageOneBuffer = ({ nombres, apellidos, fecha_nacimiento: fechaNacimiento, genero, tipo_doc: tipoDoc, pais, nro_doc: nroDoc, dni, cuil, nacionalidad, tipo, tipo_residencia: tipoResidencia, fecha_vencimiento: fechaVencimiento, domicilio, provincia, departamento, localidad, cod_postal: codPostal, telefono, email, estado_civil: estadoCivil, vehiculo_ley: vehiculoLey, fecha_ley: fechaLey, simbolo_internacional: simboloInternacional, percibir_asignacion: percibirAsignacion, /* lugar, fecha,  */}) => {
    if (provincia === 'Ciudad Autónoma de Buenos Aires') {
        provincia = 'CABA'
    }
    const imageSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="612" height="1008" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 612 1008" style="enable-background:new 0 0 612 1008;" xml:space="preserve">

        <style type="text/css">
            .st0{fill:#CCCBCB;}
            .st1{clip-path:url(#SVGID_2_);}
            .st2{font-family:'Roboto-Regular, Roboto';}
            .st3{font-size:8.2574px;}
            .st4{font-family:'Roboto-Bold, Roboto';}
            .st5{font-size:12.0108px;}
            .st6{fill:#EAEAEA;}
        </style>
        <g>
            <rect x="73" y="192.7" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="239.2" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="285.7" class="st0" width="117.1" height="19.5"/>
            <rect x="307.3" y="285.7" class="st0" width="106.6" height="19.5"/>
            <rect x="413.8" y="285.7" width="126.1" height="0.8"/>
            <rect x="413.8" y="305.3" width="126.1" height="0.8"/>
            <rect x="539.2" y="285.7" width="0.8" height="20.3"/>
            <rect x="307.3" y="285.7" width="107.3" height="0.8"/>
            <rect x="307.3" y="305.3" width="107.3" height="0.8"/>
            <rect x="413.8" y="285.7" width="0.8" height="20.3"/>
            <rect x="190.1" y="285.7" width="117.9" height="0.8"/>
            <rect x="190.1" y="305.3" width="117.9" height="0.8"/>
            <rect x="307.3" y="285.7" width="0.8" height="20.3"/>
            <rect x="73" y="285.7" width="117.9" height="0.8"/>
            <rect x="73" y="305.3" width="117.9" height="0.8"/>
            <rect x="73" y="285.7" width="0.8" height="20.3"/>
            <rect x="190.1" y="285.7" width="0.8" height="20.3"/>
            <rect x="73.8" y="314.3" class="st0" width="117.1" height="39.8"/>
            <rect x="308" y="333" width="2.3" height="2.3"/>
            <rect x="312.5" y="333" width="2.3" height="2.3"/>
            <rect x="317" y="333" width="2.3" height="2.3"/>
            <rect x="321.5" y="333" width="2.3" height="2.3"/>
            <rect x="326" y="333" width="2.3" height="2.3"/>
            <rect x="330.5" y="333" width="2.3" height="2.3"/>
            <rect x="335" y="333" width="2.3" height="2.3"/>
            <rect x="339.5" y="333" width="2.3" height="2.3"/>
            <rect x="344" y="333" width="2.3" height="2.3"/>
            <rect x="348.5" y="333" width="2.3" height="2.3"/>
            <rect x="353" y="333" width="2.3" height="2.3"/>
            <rect x="357.5" y="333" width="2.3" height="2.3"/>
            <rect x="362" y="333" width="2.3" height="2.3"/>
            <rect x="366.6" y="333" width="2.3" height="2.3"/>
            <rect x="371.1" y="333" width="2.3" height="2.3"/>
            <rect x="375.6" y="333" width="2.3" height="2.3"/>
            <rect x="380.1" y="333" width="2.3" height="2.3"/>
            <rect x="384.6" y="333" width="2.3" height="2.3"/>
            <rect x="389.1" y="333" width="2.3" height="2.3"/>
            <rect x="393.6" y="333" width="2.3" height="2.3"/>
            <rect x="398.1" y="333" width="2.3" height="2.3"/>
            <rect x="402.6" y="333" width="2.3" height="2.3"/>
            <rect x="407.1" y="333" width="2.3" height="2.3"/>
            <rect x="411.6" y="333" width="2.3" height="2.3"/>
            <rect x="416.1" y="333" width="2.3" height="2.3"/>
            <rect x="420.6" y="333" width="2.3" height="2.3"/>
            <rect x="425.1" y="333" width="2.3" height="2.3"/>
            <rect x="429.6" y="333" width="2.3" height="2.3"/>
            <rect x="434.1" y="333" width="2.3" height="2.3"/>
            <rect x="438.6" y="333" width="2.3" height="2.3"/>
            <rect x="443.1" y="333" width="2.3" height="2.3"/>
            <rect x="447.6" y="333" width="2.3" height="2.3"/>
            <rect x="452.1" y="333" width="2.3" height="2.3"/>
            <rect x="456.6" y="333" width="2.3" height="2.3"/>
            <rect x="461.1" y="333" width="2.3" height="2.3"/>
            <rect x="465.6" y="333" width="2.3" height="2.3"/>
            <rect x="470.1" y="333" width="2.3" height="2.3"/>
            <rect x="474.7" y="333" width="2.3" height="2.3"/>
            <rect x="479.2" y="333" width="2.3" height="2.3"/>
            <rect x="483.7" y="333" width="2.3" height="2.3"/>
            <rect x="488.2" y="333" width="2.3" height="2.3"/>
            <rect x="492.7" y="333" width="2.3" height="2.3"/>
            <rect x="497.2" y="333" width="2.3" height="2.3"/>
            <rect x="501.7" y="333" width="2.3" height="2.3"/>
            <rect x="506.2" y="333" width="2.3" height="2.3"/>
            <rect x="510.7" y="333" width="2.3" height="2.3"/>
            <rect x="515.2" y="333" width="2.3" height="2.3"/>
            <rect x="519.7" y="333" width="2.3" height="2.3"/>
            <rect x="524.2" y="333" width="2.3" height="2.3"/>
            <rect x="528.7" y="333" width="2.3" height="2.3"/>
            <rect x="533.2" y="333" width="2.3" height="2.3"/>
            <rect x="537.7" y="333" width="2.3" height="2.3"/>
            <rect x="307.3" y="314.3" width="0.8" height="39.8"/>
            <rect x="190.9" y="314.3" width="0.8" height="39.8"/>
            <rect x="73" y="361.6" class="st0" width="117.1" height="19.5"/>
            <rect x="307.3" y="361.6" class="st0" width="106.6" height="19.5"/>
            <rect x="413.8" y="361.6" width="126.1" height="0.8"/>
            <rect x="413.8" y="381.1" width="126.1" height="0.8"/>
            <rect x="539.2" y="361.6" width="0.8" height="20.3"/>
            <rect x="307.3" y="361.6" width="107.3" height="0.8"/>
            <rect x="307.3" y="381.1" width="107.3" height="0.8"/>
            <rect x="413.8" y="361.6" width="0.8" height="20.3"/>
            <rect x="190.1" y="361.6" width="117.9" height="0.8"/>
            <rect x="190.1" y="381.1" width="117.9" height="0.8"/>
            <rect x="307.3" y="361.6" width="0.8" height="20.3"/>
            <rect x="73" y="361.6" width="117.9" height="0.8"/>
            <rect x="73" y="381.1" width="117.9" height="0.8"/>
            <rect x="73" y="361.6" width="0.8" height="20.3"/>
            <rect x="190.1" y="361.6" width="0.8" height="20.3"/>
            <rect x="73" y="389.3" class="st0" width="117.1" height="19.5"/>
            <rect x="307.3" y="389.3" class="st0" width="106.6" height="19.5"/>
            <rect x="413.8" y="389.3" width="126.1" height="0.8"/>
            <rect x="413.8" y="408.9" width="126.1" height="0.8"/>
            <rect x="539.2" y="389.3" width="0.8" height="20.3"/>
            <rect x="307.3" y="389.3" width="107.3" height="0.8"/>
            <rect x="307.3" y="408.9" width="107.3" height="0.8"/>
            <rect x="413.8" y="389.3" width="0.8" height="20.3"/>
            <rect x="190.1" y="389.3" width="117.9" height="0.8"/>
            <rect x="190.1" y="408.9" width="117.9" height="0.8"/>
            <rect x="307.3" y="389.3" width="0.8" height="20.3"/>
            <rect x="73" y="389.3" width="117.9" height="0.8"/>
            <rect x="73" y="408.9" width="117.9" height="0.8"/>
            <rect x="73" y="389.3" width="0.8" height="20.3"/>
            <rect x="190.1" y="389.3" width="0.8" height="20.3"/>
            <rect x="73" y="417.1" class="st0" width="117.1" height="30.8"/>
            <rect x="307.3" y="417.1" class="st0" width="106.6" height="30.8"/>
            <rect x="413.8" y="417.1" width="126.1" height="0.8"/>
            <rect x="413.8" y="447.9" width="126.1" height="0.8"/>
            <rect x="539.2" y="417.1" width="0.8" height="31.5"/>
            <rect x="307.3" y="417.1" width="107.3" height="0.8"/>
            <rect x="307.3" y="447.9" width="107.3" height="0.8"/>
            <rect x="413.8" y="417.1" width="0.8" height="31.5"/>
            <rect x="190.1" y="417.1" width="117.9" height="0.8"/>
            <rect x="190.1" y="447.9" width="117.9" height="0.8"/>
            <rect x="307.3" y="417.1" width="0.8" height="31.5"/>
            <rect x="73" y="417.1" width="117.9" height="0.8"/>
            <rect x="73" y="447.9" width="117.9" height="0.8"/>
            <rect x="73" y="417.1" width="0.8" height="31.5"/>
            <rect x="190.1" y="417.1" width="0.8" height="31.5"/>
            <rect x="73" y="456.2" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="502.7" class="st0" width="117.1" height="30.8"/>
            <rect x="307.3" y="502.7" class="st0" width="106.6" height="30.8"/>
            <rect x="413.8" y="502.7" width="126.1" height="0.8"/>
            <rect x="413.8" y="533.5" width="126.1" height="0.8"/>
            <rect x="539.2" y="502.7" width="0.8" height="31.5"/>
            <rect x="307.3" y="502.7" width="107.3" height="0.8"/>
            <rect x="307.3" y="533.5" width="107.3" height="0.8"/>
            <rect x="413.8" y="502.7" width="0.8" height="31.5"/>
            <rect x="190.1" y="502.7" width="117.9" height="0.8"/>
            <rect x="190.1" y="533.5" width="117.9" height="0.8"/>
            <rect x="307.3" y="502.7" width="0.8" height="31.5"/>
            <rect x="73" y="502.7" width="117.9" height="0.8"/>
            <rect x="73" y="533.5" width="117.9" height="0.8"/>
            <rect x="73" y="502.7" width="0.8" height="31.5"/>
            <rect x="190.1" y="502.7" width="0.8" height="31.5"/>
            <rect x="73" y="541.7" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="588.3" class="st0" width="117.1" height="19.5"/>
            <rect x="307.3" y="588.3" class="st0" width="106.6" height="19.5"/>
            <rect x="413.8" y="588.3" width="126.1" height="0.8"/>
            <rect x="413.8" y="607.8" width="126.1" height="0.8"/>
            <rect x="539.2" y="588.3" width="0.8" height="20.3"/>
            <rect x="307.3" y="588.3" width="107.3" height="0.8"/>
            <rect x="307.3" y="607.8" width="107.3" height="0.8"/>
            <rect x="413.8" y="588.3" width="0.8" height="20.3"/>
            <rect x="190.1" y="588.3" width="117.9" height="0.8"/>
            <rect x="190.1" y="607.8" width="117.9" height="0.8"/>
            <rect x="307.3" y="588.3" width="0.8" height="20.3"/>
            <rect x="73" y="588.3" width="117.9" height="0.8"/>
            <rect x="73" y="607.8" width="117.9" height="0.8"/>
            <rect x="73" y="588.3" width="0.8" height="20.3"/>
            <rect x="190.1" y="588.3" width="0.8" height="20.3"/>
            <rect x="73" y="616" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="662.6" class="st0" width="466.9" height="19.5"/>
            <rect x="73" y="709.1" class="st0" width="233.5" height="19.5"/>
            <rect x="376.3" y="709.1" class="st0" width="69.8" height="19.5"/>
            <rect x="446.1" y="709.1" width="93.8" height="0.8"/>
            <rect x="446.1" y="728.6" width="93.8" height="0.8"/>
            <rect x="539.2" y="709.1" width="0.8" height="20.3"/>
            <rect x="376.3" y="709.1" width="70.6" height="0.8"/>
            <rect x="376.3" y="728.6" width="70.6" height="0.8"/>
            <rect x="446.1" y="709.1" width="0.8" height="20.3"/>
            <rect x="306.5" y="709.1" width="70.6" height="0.8"/>
            <rect x="306.5" y="728.6" width="70.6" height="0.8"/>
            <rect x="376.3" y="709.1" width="0.8" height="20.3"/>
            <rect x="73" y="709.1" width="234.2" height="0.8"/>
            <rect x="73" y="728.6" width="234.2" height="0.8"/>
            <rect x="73" y="709.1" width="0.8" height="20.3"/>
            <rect x="306.5" y="709.1" width="0.8" height="20.3"/>
            <rect x="73" y="736.9" class="st0" width="373.1" height="19.5"/>
            <rect x="446.1" y="736.9" width="93.8" height="0.8"/>
            <rect x="446.1" y="756.4" width="93.8" height="0.8"/>
            <rect x="539.2" y="736.9" width="0.8" height="20.3"/>
            <rect x="73" y="736.9" width="373.8" height="0.8"/>
            <rect x="73" y="756.4" width="373.8" height="0.8"/>
            <rect x="73" y="736.9" width="0.8" height="20.3"/>
            <rect x="446.1" y="736.9" width="0.8" height="20.3"/>
            <rect x="493.4" y="765.4" width="0.8" height="41.3"/>
            <rect x="73" y="814.2" class="st0" width="70.6" height="19.5"/>
            <rect x="329.8" y="814.2" class="st0" width="93.1" height="19.5"/>
            <rect x="422.9" y="814.2" width="117.1" height="0.8"/>
            <rect x="422.9" y="833.7" width="117.1" height="0.8"/>
            <rect x="539.2" y="814.2" width="0.8" height="20.3"/>
            <rect x="329.8" y="814.2" width="93.8" height="0.8"/>
            <rect x="329.8" y="833.7" width="93.8" height="0.8"/>
            <rect x="422.9" y="814.2" width="0.8" height="20.3"/>
            <rect x="143.6" y="814.2" width="186.9" height="0.8"/>
            <rect x="143.6" y="833.7" width="186.9" height="0.8"/>
            <rect x="329.8" y="814.2" width="0.8" height="20.3"/>
            <rect x="73" y="814.2" width="71.3" height="0.8"/>
            <rect x="73" y="833.7" width="71.3" height="0.8"/>
            <rect x="73" y="814.2" width="0.8" height="20.3"/>
            <rect x="143.6" y="814.2" width="0.8" height="20.3"/>
            <rect x="307.3" y="834.5" width="0.8" height="67.6"/>
            <rect x="73" y="902.1" class="st0" width="466.9" height="30.8"/>
            <rect x="307.3" y="902.8" width="0.8" height="30"/>
            <rect x="73" y="932.8" width="467.7" height="0.8"/>
            <rect x="73" y="902.1" width="0.8" height="31.5"/>
            <rect x="540" y="902.1" width="0.8" height="31.5"/>
            <rect x="73" y="902.1" width="467.7" height="0.8"/>
            <rect x="73" y="834.5" width="0.8" height="68.3"/>
            <rect x="540" y="834.5" width="0.8" height="68.3"/>
            <rect x="73" y="806.7" width="467.7" height="0.8"/>
            <rect x="73" y="764.7" width="0.8" height="42.8"/>
            <rect x="540" y="764.7" width="0.8" height="42.8"/>
            <rect x="73" y="764.7" width="467.7" height="0.8"/>
            <rect x="73" y="701.6" width="467.7" height="0.8"/>
            <rect x="73" y="682.1" width="0.8" height="20.3"/>
            <rect x="540" y="682.1" width="0.8" height="20.3"/>
            <rect x="73" y="682.1" width="467.7" height="0.8"/>
            <rect x="73" y="662.6" width="0.8" height="20.3"/>
            <rect x="540" y="662.6" width="0.8" height="20.3"/>
            <rect x="73" y="662.6" width="467.7" height="0.8"/>
            <rect x="73" y="655.1" width="467.7" height="0.8"/>
            <rect x="73" y="635.6" width="0.8" height="20.3"/>
            <rect x="540" y="635.6" width="0.8" height="20.3"/>
            <rect x="73" y="635.6" width="467.7" height="0.8"/>
            <rect x="73" y="616" width="0.8" height="20.3"/>
            <rect x="540" y="616" width="0.8" height="20.3"/>
            <rect x="73" y="616" width="467.7" height="0.8"/>
            <rect x="73" y="580.8" width="467.7" height="0.8"/>
            <rect x="73" y="561.2" width="0.8" height="20.3"/>
            <rect x="540" y="561.2" width="0.8" height="20.3"/>
            <rect x="73" y="561.2" width="467.7" height="0.8"/>
            <rect x="73" y="541.7" width="0.8" height="20.3"/>
            <rect x="540" y="541.7" width="0.8" height="20.3"/>
            <rect x="73" y="541.7" width="467.7" height="0.8"/>
            <rect x="73" y="495.2" width="467.7" height="0.8"/>
            <rect x="73" y="475.7" width="0.8" height="20.3"/>
            <rect x="540" y="475.7" width="0.8" height="20.3"/>
            <rect x="73" y="475.7" width="467.7" height="0.8"/>
            <rect x="73" y="456.2" width="0.8" height="20.3"/>
            <rect x="540" y="456.2" width="0.8" height="20.3"/>
            <rect x="73" y="456.2" width="467.7" height="0.8"/>
            <rect x="73" y="354.1" width="467.7" height="0.8"/>
            <rect x="73" y="313.5" width="0.8" height="41.3"/>
            <rect x="540" y="313.5" width="0.8" height="41.3"/>
            <rect x="73" y="313.5" width="467.7" height="0.8"/>
            <rect x="73" y="278.2" width="467.7" height="0.8"/>
            <rect x="73" y="258.7" width="0.8" height="20.3"/>
            <rect x="540" y="258.7" width="0.8" height="20.3"/>
            <rect x="73" y="258.7" width="467.7" height="0.8"/>
            <rect x="73" y="239.2" width="0.8" height="20.3"/>
            <rect x="540" y="239.2" width="0.8" height="20.3"/>
            <rect x="73" y="239.2" width="467.7" height="0.8"/>
            <rect x="73" y="231.7" width="467.7" height="0.8"/>
            <rect x="73" y="212.2" width="0.8" height="20.3"/>
            <rect x="540" y="212.2" width="0.8" height="20.3"/>
            <rect x="73" y="212.2" width="467.7" height="0.8"/>
            <rect x="73" y="192.7" width="0.8" height="20.3"/>
            <rect x="540" y="192.7" width="0.8" height="20.3"/>
            <rect x="73" y="192.7" width="467.7" height="0.8"/>
            <rect x="73" y="143.1" width="467.7" height="0.8"/>
            <rect x="73" y="113.1" width="0.8" height="30.8"/>
            <rect x="540" y="113.1" width="0.8" height="30.8"/>
            <rect x="73" y="113.1" width="467.7" height="0.8"/>
        </g>
        <g>
            <g>
                <g>
                    <defs>
                        <path id="SVGID_1_" d="M73,110.1V35c0-0.8,0.3-1.5,0.9-2.1S75.2,32,76,32h170.4c0.8,0,1.5,0.3,2.1,0.9s0.9,1.3,0.9,2.1v75.1      c0,0.8-0.3,1.5-0.9,2.1s-1.3,0.9-2.1,0.9H76c-0.8,0-1.5-0.3-2.1-0.9S73,110.9,73,110.1z"/>
                    </defs>
                    <clipPath id="SVGID_2_">
                        <use xlink:href="#SVGID_1_" style="overflow:visible;"/>
                    </clipPath>
                    <g class="st1">
                        <defs>
                            <rect id="SVGID_3_" x="73" y="32" width="176.4" height="81.1"/>
                        </defs>
                        <clipPath id="SVGID_4_">
                            <use xlink:href="#SVGID_3_" style="overflow:visible;"/>
                        </clipPath>
                        <g style="clip-path:url(#SVGID_4_);">
                            
                        </g>
                    </g>
                </g>
            </g>
        </g>
        <g>
            <text transform="matrix(1 0 0 1 374.0605 54.542)" class="st2 st3">TURNO .................................</text>
            <text transform="matrix(1 0 0 1 374.0605 65.8018)" class="st2 st3">......./......./.......</text>
            <text transform="matrix(1 0 0 1 374.0605 84.5684)" class="st2 st3">HORA</text>
            <text transform="matrix(1 0 0 1 374.0605 95.8291)" class="st2 st3">............................................................</text>
            <text transform="matrix(1 0 0 1 108.9673 132.6118)" class="st4 st5">S</text>
            <text transform="matrix(1 0 0 1 118.4795 132.6118)" class="st4 st5">O</text>
            <text transform="matrix(1 0 0 1 129.3232 132.6118)" class="st4 st5">L</text>
            <text transform="matrix(1 0 0 1 138.1611 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 142.9995 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 153.1748 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 158.0132 132.6118)" class="st4 st5">T</text>
            <text transform="matrix(1 0 0 1 166.8511 132.6118)" class="st4 st5">U</text>
            <text transform="matrix(1 0 0 1 177.0264 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 187.2012 132.6118)" class="st4 st5"> </text>
            <text transform="matrix(1 0 0 1 192.0396 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 202.2148 132.6118)" class="st4 st5">E</text>
            <text transform="matrix(1 0 0 1 211.7271 132.6118)" class="st4 st5"> </text>
            <text transform="matrix(1 0 0 1 216.5654 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 226.7407 132.6118)" class="st4 st5">E</text>
            <text transform="matrix(1 0 0 1 236.2534 132.6118)" class="st4 st5">R</text>
            <text transform="matrix(1 0 0 1 246.4282 132.6118)" class="st4 st5">T</text>
            <text transform="matrix(1 0 0 1 255.2666 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 260.1045 132.6118)" class="st4 st5">F</text>
            <text transform="matrix(1 0 0 1 268.9429 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 273.7812 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 283.9561 132.6118)" class="st4 st5">A</text>
            <text transform="matrix(1 0 0 1 294.1313 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 304.3066 132.6118)" class="st4 st5">O</text>
            <text transform="matrix(1 0 0 1 315.1504 132.6118)" class="st4 st5"> </text>
            <text transform="matrix(1 0 0 1 319.9883 132.6118)" class="st4 st5">Ú</text>
            <text transform="matrix(1 0 0 1 330.1641 132.6118)" class="st4 st5">N</text>
            <text transform="matrix(1 0 0 1 340.3389 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 345.1777 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 355.3525 132.6118)" class="st4 st5">O</text>
            <text transform="matrix(1 0 0 1 366.1963 132.6118)" class="st4 st5"> </text>
            <text transform="matrix(1 0 0 1 371.0342 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 381.21 132.6118)" class="st4 st5">E</text>
            <text transform="matrix(1 0 0 1 390.7227 132.6118)" class="st4 st5"> </text>
            <text transform="matrix(1 0 0 1 395.5605 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 405.7354 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 410.5742 132.6118)" class="st4 st5">S</text>
            <text transform="matrix(1 0 0 1 420.0869 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 430.2617 132.6118)" class="st4 st5">A</text>
            <text transform="matrix(1 0 0 1 440.4365 132.6118)" class="st4 st5">P</text>
            <text transform="matrix(1 0 0 1 449.0576 132.6118)" class="st4 st5">A</text>
            <text transform="matrix(1 0 0 1 459.2324 132.6118)" class="st4 st5">C</text>
            <text transform="matrix(1 0 0 1 469.4082 132.6118)" class="st4 st5">I</text>
            <text transform="matrix(1 0 0 1 474.2461 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 484.4219 132.6118)" class="st4 st5">A</text>
            <text transform="matrix(1 0 0 1 494.5967 132.6118)" class="st4 st5">D</text>
            <text transform="matrix(1 0 0 1 80.5469 155.8828)" class="st2 st3">L</text>
            <text transform="matrix(1 0 0 1 85.1333 155.8828)" class="st2 st3">a evaluación por parte de la junta evaluadora interdisciplinaria es presencial.</text>
            <text transform="matrix(1 0 0 1 80.5469 170.8965)" class="st2 st3">L</text>
            <text transform="matrix(1 0 0 1 85.1333 170.8965)" class="st2 st3">a presente reviste carácter de declaración jurada</text>
            <text transform="matrix(1 0 0 1 80.5469 185.9097)" class="st4 st3">C</text>
            <text transform="matrix(1 0 0 1 86.5054 185.9097)" class="st4 st3">ompletar según corresponda</text>
            <text transform="matrix(1 0 0 1 81.2979 205.4272)" class="st2 st3">APELLIDO/S</text>
            <text transform="matrix(1 0 0 1 81.2979 224.9443)" class="st2 st3">${apellidos}</text>
            <text transform="matrix(1 0 0 1 81.2979 251.9692)" class="st2 st3">NOMBRE/S</text>
            <text transform="matrix(1 0 0 1 81.2979 271.4863)" class="st2 st3">${nombres}</text>
            <text transform="matrix(1 0 0 1 81.2979 298.5107)" class="st2 st3">FECHA DE NACIMIENTO</text>
            <text transform="matrix(1 0 0 1 198.4028 298.5107)" class="st2 st3">${fechaNacimiento}</text>
            <text transform="matrix(1 0 0 1 315.5078 298.5107)" class="st2 st3">GÉNERO</text>
            <text transform="matrix(1 0 0 1 422.1035 298.5107)" class="st2 st3">${genero}</text>
            <text transform="matrix(1 0 0 1 81.2979 330.79)" class="st2 st3">DOCUMENTO</text>
            <text transform="matrix(1 0 0 1 136.8545 330.79)" class="st2 st3">DE</text>
            <text transform="matrix(1 0 0 1 81.2979 342.0498)" class="st2 st3">IDENTIDAD</text>
            <text transform="matrix(1 0 0 1 199.1533 336.7954)" class="st2 st3">${tipoDoc}</text>
            <text transform="matrix(1 0 0 1 315.5078 326.2856)" class="st2 st3">${pais}</text>
            <text transform="matrix(1 0 0 1 315.5078 347.3042)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 320.4033 347.3042)" class="st2 st3">PAIS</text>
            <text transform="matrix(1 0 0 1 81.2979 374.3291)" class="st2 st3">NRO. DOCUMENTO</text>
            <text transform="matrix(1 0 0 1 198.4028 374.3291)" class="st2 st3">${nroDoc}</text>
            <text transform="matrix(1 0 0 1 315.5078 374.3291)" class="st2 st3">CUIL</text>
            <text transform="matrix(1 0 0 1 422.1035 374.3291)" class="st2 st3">${cuil}</text>
            <text transform="matrix(1 0 0 1 81.2979 402.104)" class="st2 st3">NACIONALIDAD</text>
            <text transform="matrix(1 0 0 1 198.4028 402.104)" class="st2 st3">${nacionalidad}</text>
            <text transform="matrix(1 0 0 1 315.5078 402.104)" class="st2 st3">TIPO</text>
            <text transform="matrix(1 0 0 1 422.1035 402.104)" class="st2 st3">${tipo}</text>
            <text transform="matrix(1 0 0 1 432.9619 402.104)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 81.2979 435.1333)" class="st2 st3">TIPO DE RESIDENCIA</text>
            <text transform="matrix(1 0 0 1 198.4028 435.1333)" class="st2 st3">${tipoResidencia}</text>
            <text transform="matrix(1 0 0 1 233.5776 435.1333)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 315.5078 429.8789)" class="st2 st3">FECHA DE</text>
            <text transform="matrix(1 0 0 1 315.5078 441.1387)" class="st2 st3">VENCIMIENTO</text>
            <text transform="matrix(1 0 0 1 422.1035 435.1333)" class="st2 st3">${fechaVencimiento}</text>
            <text transform="matrix(1 0 0 1 81.2979 468.9141)" class="st2 st3">DOMICILIO</text>
            <text transform="matrix(1 0 0 1 81.2979 488.4316)" class="st2 st3">${domicilio}</text>
            <text transform="matrix(1 0 0 1 81.2979 520.7109)" class="st2 st3">PROVINCIA</text>
            <text transform="matrix(1 0 0 1 198.4028 520.7109)" class="st2 st3">${provincia}</text>
            <text transform="matrix(1 0 0 1 198.4028 526.7158)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 315.5078 520.7109)" class="st2 st3">DEPARTAMENTO</text>
            <text transform="matrix(1 0 0 1 422.1035 520.7109)" class="st2 st3">${departamento}</text>
            <text transform="matrix(1 0 0 1 81.2979 554.4902)" class="st2 st3">LOCALIDAD</text>
            <text transform="matrix(1 0 0 1 81.2979 574.0078)" class="st2 st3">${localidad}</text>
            <text transform="matrix(1 0 0 1 81.2979 601.0322)" class="st2 st3">COD. POSTAL</text>
            <text transform="matrix(1 0 0 1 198.4028 601.0322)" class="st2 st3">${codPostal}</text>
            <text transform="matrix(1 0 0 1 315.5078 601.0322)" class="st2 st3">TELÉFONO</text>
            <text transform="matrix(1 0 0 1 422.1035 601.0322)" class="st2 st3">${telefono} </text>
            <text transform="matrix(1 0 0 1 438.1729 601.0322)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 81.2979 628.8076)" class="st2 st3">EMAIL</text>
            <text transform="matrix(1 0 0 1 81.2979 648.3242)" class="st2 st3">${email}</text>
            <text transform="matrix(1 0 0 1 81.2979 675.3486)" class="st2 st3">EST</text>
            <text transform="matrix(1 0 0 1 96.7441 675.3486)" class="st2 st3">ADO CIVIL</text>
            <text transform="matrix(1 0 0 1 81.2979 694.8662)" class="st2 st3">${estadoCivil}</text>
            <text transform="matrix(1 0 0 1 97.2075 694.8662)" class="st2 st3"></text>
            <text transform="matrix(1 0 0 1 81.2979 721.8906)" class="st2 st3">ADQUIRIÓ VEHÍCULO A TRAVÉS</text>
            <text transform="matrix(1 0 0 1 210.6357 721.8906)" class="st2 st3">DE LEY 19.279</text>
            <text transform="matrix(1 0 0 1 314.7578 721.8906)" class="st2 st3">${vehiculoLey ? 'SI' : 'NO'}</text>
            <text transform="matrix(1 0 0 1 384.5703 721.8906)" class="st2 st3">FECHA</text>
            <text transform="matrix(1 0 0 1 454.3828 721.8906)" class="st2 st3">${fechaLey}</text>
            <text transform="matrix(1 0 0 1 81.2979 749.666)" class="st2 st3">POSEE SÍMBOLO INTERNACIONAL DE ACCESO</text>
            <text transform="matrix(1 0 0 1 454.3828 749.666)" class="st2 st3">${simboloInternacional ? 'SI' : 'NO' }</text>
            <text transform="matrix(1 0 0 1 81.2979 777.4414)" class="st2 st3">E</text>
            <text transform="matrix(1 0 0 1 86.7988 777.4414)" class="st2 st3">n caso de cumplir con todos los requisitos exigidos por el ordenamiento legal de asignaciones familiares: ¿la</text>
            <text transform="matrix(1 0 0 1 81.2979 788.7012)" class="st2 st3">persona con discapacidad estaría interesada en percibir las asignaciones familiares vinculadas a la</text>
            <text transform="matrix(1 0 0 1 81.2979 799.9609)" class="st2 st3">discapacidad a las que pudiese tener derecho?</text>
            <text transform="matrix(1 0 0 1 501.6758 788.7012)" class="st2 st3">${percibirAsignacion ? 'SI' : 'NO'}</text>
            <text transform="matrix(1 0 0 1 81.2979 826.9854)" class="st2 st3">LUGAR</text>
            <text transform="matrix(1 0 0 1 338.0283 826.9854)" class="st2 st3">FECHA</text>
            <text transform="matrix(1 0 0 1 82.6348 914.8145)" class="st2 st3">FIRMA DEL INTERESADO/A MADRE -</text>
            <text transform="matrix(1 0 0 1 228.8042 914.8145)" class="st2 st3">PADRE - TUTOR -</text>
            <text transform="matrix(1 0 0 1 112.9902 926.0742)" class="st2 st3">GUARDADOR/A - CURADOR/A - APOYO</text>
            <text transform="matrix(1 0 0 1 376.2656 920.0684)" class="st2 st3">ACLARACIÓN DE FIRMA</text>
        </g>
    </svg>`

    return Buffer.from(imageSVG)
}

const getPdfTemplatePageTwoBuffer = (representativeData, tutorData) => {
    const {
        interesado = '',
        familiar = '',
        nombre_familiar: nombreFamiliar = '',
        apellido_familiar: apellidoFamiliar = '',
        tipo_doc_familiar: tipoDocFamiliar = '',
        pais_familiar: paisFamiliar = '',
        nro_doc_familiar: nroDocFamiliar = '',
        nacionalidad_familiar: nacionalidadFamiliar = '',
        domicilio_familiar: domicilioFamiliar = '',
        cod_postal_familiar: codPostalFamiliar = '',
        localidad_familiar: localidadFamiliar = '',
        // provincia_familiar: provinciaFamiliar = '',
        telefono_familiar: telefonoFamiliar = '',
    } = representativeData

    let {
        provincia_familiar: provinciaFamiliar = '',
    } = representativeData

    if (provinciaFamiliar === 'Ciudad Autónoma de Buenos Aires') {
        provinciaFamiliar = 'CABA'
    }

    const {
        designacion = '',
        fecha_designacion: fechaDesignacion = '',
        juzgado = '',
        secretaria = '',
        dpto_judicial: dptoJudicial = '',
        fiscalia = '',
        defensoria = '', /*
        lugar_tutor: lugarTutor,
        fecha_tutor: fechaTutor, */
    } = tutorData

    const imageSVG =
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 612 1008" style="enable-background:new 0 0 612 1008;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:#CCCBCB;}
                .st1{clip-path:url(#SVGID_2_);}
                .st2{fill:#EAEAEA;}
                .st3{fill:#FFFFFF;}
                .st4{font-family:'Roboto-Bold, Roboto';}
                .st5{font-size:12.0108px;}
                .st6{font-family:'Roboto-Regular, Roboto';}
                .st7{font-size:10.5094px;}
                .st8{font-size:8.2574px;}
            </style>
            <g>
                <rect x="73" y="106.9" class="st2" width="466.9" height="23.3"/>
                <rect x="73" y="164.7" class="st2" width="466.9" height="23.3"/>
                <rect x="73" y="31.8" width="466.9" height="75.1"/>
                <rect x="73" y="203" class="st0" width="466.9" height="19.5"/>
                <rect x="73" y="257" class="st0" width="466.9" height="19.5"/>
                <rect x="73" y="311.1" class="st0" width="466.9" height="19.5"/>
                <rect x="73.8" y="365.9" class="st0" width="117.1" height="39.8"/>
                <rect x="308" y="384.6" width="2.3" height="2.3"/>
                <rect x="312.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="317" y="384.6" width="2.3" height="2.3"/>
                <rect x="321.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="326" y="384.6" width="2.3" height="2.3"/>
                <rect x="330.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="335" y="384.6" width="2.3" height="2.3"/>
                <rect x="339.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="344" y="384.6" width="2.3" height="2.3"/>
                <rect x="348.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="353" y="384.6" width="2.3" height="2.3"/>
                <rect x="357.5" y="384.6" width="2.3" height="2.3"/>
                <rect x="362" y="384.6" width="2.3" height="2.3"/>
                <rect x="366.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="371.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="375.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="380.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="384.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="389.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="393.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="398.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="402.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="407.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="411.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="416.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="420.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="425.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="429.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="434.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="438.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="443.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="447.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="452.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="456.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="461.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="465.6" y="384.6" width="2.3" height="2.3"/>
                <rect x="470.1" y="384.6" width="2.3" height="2.3"/>
                <rect x="474.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="479.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="483.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="488.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="492.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="497.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="501.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="506.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="510.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="515.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="519.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="524.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="528.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="533.2" y="384.6" width="2.3" height="2.3"/>
                <rect x="537.7" y="384.6" width="2.3" height="2.3"/>
                <rect x="307.3" y="365.9" width="0.8" height="39.8"/>
                <rect x="190.9" y="365.9" width="0.8" height="39.8"/>
                <rect x="73.8" y="421.4" class="st0" width="117.1" height="18.8"/>
                <rect x="308" y="421.4" class="st0" width="106.6" height="18.8"/>
                <rect x="414.6" y="421.4" width="0.8" height="18.8"/>
                <rect x="308" y="421.4" width="0.8" height="18.8"/>
                <rect x="190.9" y="421.4" width="0.8" height="18.8"/>
                <rect x="73" y="455.2" class="st0" width="466.9" height="19.5"/>
                <rect x="73.8" y="510" class="st0" width="117.1" height="18.8"/>
                <rect x="308" y="510" class="st0" width="106.6" height="18.8"/>
                <rect x="414.6" y="510" width="0.8" height="18.8"/>
                <rect x="308" y="510" width="0.8" height="18.8"/>
                <rect x="190.9" y="510" width="0.8" height="18.8"/>
                <rect x="73.8" y="544.5" class="st0" width="117.1" height="30"/>
                <rect x="308" y="544.5" class="st0" width="106.6" height="30"/>
                <rect x="414.6" y="544.5" width="0.8" height="30"/>
                <rect x="308" y="544.5" width="0.8" height="30"/>
                <rect x="190.9" y="544.5" width="0.8" height="30"/>
                <rect x="73" y="589.6" width="466.9" height="20.3"/>
                <rect x="73.8" y="625.6" class="st0" width="233.5" height="18.8"/>
                <rect x="307.3" y="625.6" class="st0" width="232.7" height="18.8"/>
                <rect x="307.3" y="644.4" width="0.8" height="19.5"/>
                <rect x="307.3" y="644.4" width="232.7" height="0.8"/>
                <rect x="73.8" y="644.4" width="234.2" height="0.8"/>
                <rect x="307.3" y="625.6" width="0.8" height="19.5"/>
                <rect x="73.8" y="679.6" class="st0" width="117.1" height="18.8"/>
                <rect x="190.9" y="679.6" width="0.8" height="18.8"/>
                <rect x="73.8" y="714.2" class="st0" width="93.8" height="18.8"/>
                <rect x="307.3" y="714.2" class="st0" width="93.1" height="18.8"/>
                <rect x="400.3" y="714.2" width="0.8" height="18.8"/>
                <rect x="307.3" y="714.2" width="0.8" height="18.8"/>
                <rect x="167.6" y="714.2" width="0.8" height="18.8"/>
                <rect x="73.8" y="748.7" class="st0" width="117.1" height="18.8"/>
                <rect x="190.9" y="748.7" width="0.8" height="18.8"/>
                <rect x="73.8" y="783.2" class="st0" width="117.1" height="18.8"/>
                <rect x="190.9" y="783.2" width="0.8" height="18.8"/>
                <rect x="73.8" y="817.8" class="st0" width="70.6" height="18.8"/>
                <rect x="330.5" y="817.8" class="st0" width="93.1" height="18.8"/>
                <rect x="423.6" y="817.8" width="0.8" height="18.8"/>
                <rect x="330.5" y="817.8" width="0.8" height="18.8"/>
                <rect x="144.4" y="817.8" width="0.8" height="18.8"/>
                <rect x="73" y="836.5" width="467.7" height="0.8"/>
                <rect x="73" y="817" width="0.8" height="20.3"/>
                <rect x="540" y="817" width="0.8" height="20.3"/>
                <rect x="73" y="817" width="467.7" height="0.8"/>
                <rect x="73" y="802" width="467.7" height="0.8"/>
                <rect x="73" y="782.5" width="0.8" height="20.3"/>
                <rect x="540" y="782.5" width="0.8" height="20.3"/>
                <rect x="73" y="782.5" width="467.7" height="0.8"/>
                <rect x="73" y="767.5" width="467.7" height="0.8"/>
                <rect x="73" y="748" width="0.8" height="20.3"/>
                <rect x="540" y="748" width="0.8" height="20.3"/>
                <rect x="73" y="748" width="467.7" height="0.8"/>
                <rect x="73" y="732.9" width="467.7" height="0.8"/>
                <rect x="73" y="713.4" width="0.8" height="20.3"/>
                <rect x="540" y="713.4" width="0.8" height="20.3"/>
                <rect x="73" y="713.4" width="467.7" height="0.8"/>
                <rect x="73" y="698.4" width="467.7" height="0.8"/>
                <rect x="73" y="678.9" width="0.8" height="20.3"/>
                <rect x="540" y="678.9" width="0.8" height="20.3"/>
                <rect x="73" y="678.9" width="467.7" height="0.8"/>
                <rect x="73" y="663.9" width="467.7" height="0.8"/>
                <rect x="73" y="624.8" width="0.8" height="39.8"/>
                <rect x="540" y="624.8" width="0.8" height="39.8"/>
                <rect x="73" y="624.8" width="467.7" height="0.8"/>
                <rect x="73" y="574.5" width="467.7" height="0.8"/>
                <rect x="73" y="543.8" width="0.8" height="31.5"/>
                <rect x="540" y="543.8" width="0.8" height="31.5"/>
                <rect x="73" y="543.8" width="467.7" height="0.8"/>
                <rect x="73" y="528.8" width="467.7" height="0.8"/>
                <rect x="73" y="509.2" width="0.8" height="20.3"/>
                <rect x="540" y="509.2" width="0.8" height="20.3"/>
                <rect x="73" y="509.2" width="467.7" height="0.8"/>
                <rect x="73" y="494.2" width="467.7" height="0.8"/>
                <rect x="73" y="474.7" width="0.8" height="20.3"/>
                <rect x="540" y="474.7" width="0.8" height="20.3"/>
                <rect x="73" y="474.7" width="467.7" height="0.8"/>
                <rect x="73" y="455.2" width="0.8" height="20.3"/>
                <rect x="540" y="455.2" width="0.8" height="20.3"/>
                <rect x="73" y="455.2" width="467.7" height="0.8"/>
                <rect x="73" y="440.2" width="467.7" height="0.8"/>
                <rect x="73" y="420.7" width="0.8" height="20.3"/>
                <rect x="540" y="420.7" width="0.8" height="20.3"/>
                <rect x="73" y="420.7" width="467.7" height="0.8"/>
                <rect x="73" y="405.6" width="467.7" height="0.8"/>
                <rect x="73" y="365.1" width="0.8" height="41.3"/>
                <rect x="540" y="365.1" width="0.8" height="41.3"/>
                <rect x="73" y="365.1" width="467.7" height="0.8"/>
                <rect x="73" y="350.1" width="467.7" height="0.8"/>
                <rect x="73" y="330.6" width="0.8" height="20.3"/>
                <rect x="540" y="330.6" width="0.8" height="20.3"/>
                <rect x="73" y="330.6" width="467.7" height="0.8"/>
                <rect x="73" y="311.1" width="0.8" height="20.3"/>
                <rect x="540" y="311.1" width="0.8" height="20.3"/>
                <rect x="73" y="311.1" width="467.7" height="0.8"/>
                <rect x="73" y="296" width="467.7" height="0.8"/>
                <rect x="73" y="276.5" width="0.8" height="20.3"/>
                <rect x="540" y="276.5" width="0.8" height="20.3"/>
                <rect x="73" y="276.5" width="467.7" height="0.8"/>
                <rect x="73" y="257" width="0.8" height="20.3"/>
                <rect x="540" y="257" width="0.8" height="20.3"/>
                <rect x="73" y="257" width="467.7" height="0.8"/>
                <rect x="73" y="242" width="467.7" height="0.8"/>
                <rect x="73" y="222.5" width="0.8" height="20.3"/>
                <rect x="540" y="222.5" width="0.8" height="20.3"/>
                <rect x="73" y="222.5" width="467.7" height="0.8"/>
                <rect x="73" y="203" width="0.8" height="20.3"/>
                <rect x="540" y="203" width="0.8" height="20.3"/>
                <rect x="73" y="203" width="467.7" height="0.8"/>
                <rect x="73" y="187.9" width="467.7" height="0.8"/>
                <rect x="73" y="164.7" width="0.8" height="24"/>
                <rect x="540" y="164.7" width="0.8" height="24"/>
                <rect x="73" y="164.7" width="467.7" height="0.8"/>
                <rect x="73" y="149.7" width="467.7" height="0.8"/>
                <rect x="73" y="130.1" width="0.8" height="20.3"/>
                <rect x="540" y="130.1" width="0.8" height="20.3"/>
                <rect x="73" y="130.1" width="467.7" height="0.8"/>
                <rect x="73" y="106.9" width="0.8" height="24"/>
                <rect x="540" y="106.9" width="0.8" height="24"/>
                <rect x="73" y="106.9" width="467.7" height="0.8"/>
                <text transform="matrix(1 0 0 1 82.9282 67.0889)" class="st3 st4 st5">C</text>
                <text transform="matrix(1 0 0 1 93.103 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 103.9468 67.0889)" class="st3 st4 st5">M</text>
                <text transform="matrix(1 0 0 1 115.4531 67.0889)" class="st3 st4 st5">P</text>
                <text transform="matrix(1 0 0 1 124.9658 67.0889)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 133.8037 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 143.3164 67.0889)" class="st3 st4 st5">T</text>
                <text transform="matrix(1 0 0 1 151.2627 67.0889)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 161.438 67.0889)" class="st3 st4 st5">R</text>
                <text transform="matrix(1 0 0 1 171.6133 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 176.4517 67.0889)" class="st3 st4 st5">S</text>
                <text transform="matrix(1 0 0 1 185.9639 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 196.8076 67.0889)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 205.6455 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 216.4893 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 221.3276 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 230.8403 67.0889)" class="st3 st4 st5">N</text>
                <text transform="matrix(1 0 0 1 241.0151 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 245.8535 67.0889)" class="st3 st4 st5">C</text>
                <text transform="matrix(1 0 0 1 256.0288 67.0889)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 266.2041 67.0889)" class="st3 st4 st5">S</text>
                <text transform="matrix(1 0 0 1 275.7163 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 286.5601 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 291.3984 67.0889)" class="st3 st4 st5">D</text>
                <text transform="matrix(1 0 0 1 301.5737 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 311.0859 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 315.9248 67.0889)" class="st3 st4 st5">Q</text>
                <text transform="matrix(1 0 0 1 326.7686 67.0889)" class="st3 st4 st5">U</text>
                <text transform="matrix(1 0 0 1 336.9434 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 346.4561 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 351.2939 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 360.8066 67.0889)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 369.6445 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 374.4834 67.0889)" class="st3 st4 st5">S</text>
                <text transform="matrix(1 0 0 1 383.9951 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 394.8389 67.0889)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 403.6768 67.0889)" class="st3 st4 st5">I</text>
                <text transform="matrix(1 0 0 1 408.5156 67.0889)" class="st3 st4 st5">C</text>
                <text transform="matrix(1 0 0 1 418.6904 67.0889)" class="st3 st4 st5">I</text>
                <text transform="matrix(1 0 0 1 423.5293 67.0889)" class="st3 st4 st5">T</text>
                <text transform="matrix(1 0 0 1 431.4756 67.0889)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 441.6504 67.0889)" class="st3 st4 st5">N</text>
                <text transform="matrix(1 0 0 1 451.8262 67.0889)" class="st3 st4 st5">T</text>
                <text transform="matrix(1 0 0 1 460.6641 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 470.1768 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 475.0146 67.0889)" class="st3 st4 st5">N</text>
                <text transform="matrix(1 0 0 1 485.1895 67.0889)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 496.0332 67.0889)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 500.8721 67.0889)" class="st3 st4 st5">S</text>
                <text transform="matrix(1 0 0 1 510.3848 67.0889)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 519.8965 67.0889)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 215.856 79.8501)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 224.6938 79.8501)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 234.8691 79.8501)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 239.7075 79.8501)" class="st3 st4 st5">P</text>
                <text transform="matrix(1 0 0 1 249.2197 79.8501)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 258.7324 79.8501)" class="st3 st4 st5">R</text>
                <text transform="matrix(1 0 0 1 268.9077 79.8501)" class="st3 st4 st5">S</text>
                <text transform="matrix(1 0 0 1 278.4199 79.8501)" class="st3 st4 st5">O</text>
                <text transform="matrix(1 0 0 1 289.2637 79.8501)" class="st3 st4 st5">N</text>
                <text transform="matrix(1 0 0 1 299.439 79.8501)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 309.6143 79.8501)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 314.4521 79.8501)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 324.6279 79.8501)" class="st3 st4 st5"> </text>
                <text transform="matrix(1 0 0 1 329.4658 79.8501)" class="st3 st4 st5">E</text>
                <text transform="matrix(1 0 0 1 338.9785 79.8501)" class="st3 st4 st5">V</text>
                <text transform="matrix(1 0 0 1 347.5996 79.8501)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 357.7744 79.8501)" class="st3 st4 st5">L</text>
                <text transform="matrix(1 0 0 1 366.6123 79.8501)" class="st3 st4 st5">U</text>
                <text transform="matrix(1 0 0 1 376.7881 79.8501)" class="st3 st4 st5">A</text>
                <text transform="matrix(1 0 0 1 386.9629 79.8501)" class="st3 st4 st5">R</text>
                <text transform="matrix(1 0 0 1 146.5596 122.6387)" class="st6 st7">P</text>
                <text transform="matrix(1 0 0 1 152.7891 122.6387)" class="st6 st7">ARA EL CASO DE PERSONAS A EVALUAR</text>
                <text transform="matrix(1 0 0 1 359.7539 122.6387)" class="st6 st7">MAYORES DE EDAD</text>
                <text transform="matrix(1 0 0 1 81.2979 142.9067)" class="st6 st8">${interesado}</text>
                <text transform="matrix(1 0 0 1 145.8789 180.4404)" class="st6 st7">P</text>
                <text transform="matrix(1 0 0 1 152.1089 180.4404)" class="st6 st7">ARA EL CASO DE PERSONAS A EVALUAR</text>
                <text transform="matrix(1 0 0 1 358.126 180.4404)" class="st6 st7">MENORES DE EDAD</text>
                <text transform="matrix(1 0 0 1 81.2979 215.7227)" class="st6 st8">MADRE,</text>
                <text transform="matrix(1 0 0 1 115.6011 215.7227)" class="st6 st8">PADRE O TUTOR</text>
                <text transform="matrix(1 0 0 1 81.2979 235.2402)" class="st6 st8">${familiar}</text>
                <text transform="matrix(1 0 0 1 81.2979 269.7705)" class="st6 st8">APELLIDO/S</text>
                <text transform="matrix(1 0 0 1 81.2979 289.2881)" class="st6 st8">${apellidoFamiliar}</text>
                <text transform="matrix(1 0 0 1 81.2979 323.8193)" class="st6 st8">NOMBRE/S</text>
                <text transform="matrix(1 0 0 1 81.2979 343.3369)" class="st6 st8">${nombreFamiliar}</text>
                <text transform="matrix(1 0 0 1 81.2979 382.3721)" class="st6 st8">DOCUMENTO</text>
                <text transform="matrix(1 0 0 1 137.8545 382.3721)" class="st6 st8">DE</text>
                <text transform="matrix(1 0 0 1 81.2979 393.6318)" class="st6 st8">IDENTIDAD</text>
                <text transform="matrix(1 0 0 1 199.1533 388.377)" class="st6 st8">${tipoDocFamiliar}</text>
                <text transform="matrix(1 0 0 1 315.5078 377.8677)" class="st6 st8">${paisFamiliar}</text>
                <text transform="matrix(1 0 0 1 315.5078 398.8867)" class="st6 st8">P</text>
                <text transform="matrix(1 0 0 1 320.4033 398.8867)" class="st6 st8">AÍS</text>
                <text transform="matrix(1 0 0 1 81.2979 433.4175)" class="st6 st8">NRO. DOCUMENTO</text>
                <text transform="matrix(1 0 0 1 199.1533 433.4175)" class="st6 st8">${nroDocFamiliar}</text>
                <text transform="matrix(1 0 0 1 316.2588 433.4175)" class="st6 st8">NACIONALIDAD</text>
                <text transform="matrix(1 0 0 1 422.8545 433.4175)" class="st6 st8">${nacionalidadFamiliar}</text>
                <text transform="matrix(1 0 0 1 81.2979 467.9492)" class="st6 st8">DOMICILIO</text>
                <text transform="matrix(1 0 0 1 81.2979 487.4668)" class="st6 st8">${domicilioFamiliar}</text>
                <text transform="matrix(1 0 0 1 81.2979 521.9971)" class="st6 st8">COD. POSTAL</text>
                <text transform="matrix(1 0 0 1 199.1533 521.9971)" class="st6 st8">${codPostalFamiliar}</text>
                <text transform="matrix(1 0 0 1 316.2588 521.9971)" class="st6 st8">LOCALIDAD</text>
                <text transform="matrix(1 0 0 1 422.8545 521.9971)" class="st6 st8">${localidadFamiliar}</text>
                <text transform="matrix(1 0 0 1 81.2979 561.7832)" class="st6 st8">PROVINCIA</text>
                <text transform="matrix(1 0 0 1 199.1533 561.7832)" class="st6 st8">${provinciaFamiliar}</text>
                <text transform="matrix(1 0 0 1 199.1533 567.7881)" class="st6 st8"></text>
                <text transform="matrix(1 0 0 1 316.2588 561.7832)" class="st6 st8">NRO. DE TELÉFONO</text>
                <text transform="matrix(1 0 0 1 422.8545 561.7832)" class="st6 st8">${telefonoFamiliar}</text>
                <text transform="matrix(1 0 0 1 89.438 602.3193)" class="st3 st4 st8">EN CASO DE TUTOR/A,</text>
                <text transform="matrix(1 0 0 1 180.1021 602.3193)" class="st3 st4 st8">GUARDADOR/A, CURADOR/A, O APOYO COMPLETAR</text>
                <text transform="matrix(1 0 0 1 389.3262 602.3193)" class="st3 st4 st8">LA SIGUIENTE INFORMACIÓN:</text>
                <text transform="matrix(1 0 0 1 81.2979 637.6016)" class="st6 st8">DESIGNACIÓN</text>
                <text transform="matrix(1 0 0 1 315.5078 637.6016)" class="st6 st8">FECHA</text>
                <text transform="matrix(1 0 0 1 81.2979 657.1182)" class="st6 st8">${designacion}</text>
                <text transform="matrix(1 0 0 1 315.5078 657.1182)" class="st6 st8">${fechaDesignacion}</text>
                <text transform="matrix(1 0 0 1 81.2979 691.6494)" class="st6 st8">JUZGADO</text>
                <text transform="matrix(1 0 0 1 199.1533 691.6494)" class="st6 st8">${juzgado}</text>
                <text transform="matrix(1 0 0 1 81.2979 726.1807)" class="st6 st8">SECRETARÍA</text>
                <text transform="matrix(1 0 0 1 175.8828 726.1807)" class="st6 st8">${secretaria}</text>
                <text transform="matrix(1 0 0 1 315.5078 726.1807)" class="st6 st8">DPT</text>
                <text transform="matrix(1 0 0 1 331.873 726.1807)" class="st6 st8">O. JUDICIAL</text>
                <text transform="matrix(1 0 0 1 408.5918 726.1807)" class="st6 st8">${dptoJudicial}</text>
                <text transform="matrix(1 0 0 1 81.2979 760.7119)" class="st6 st8">FISCALÍA</text>
                <text transform="matrix(1 0 0 1 199.1533 760.7119)" class="st6 st8">${fiscalia}</text>
                <text transform="matrix(1 0 0 1 81.2979 795.2422)" class="st6 st8">DEFENSORÍA</text>
                <text transform="matrix(1 0 0 1 199.1533 795.2422)" class="st6 st8">${defensoria}</text>
                <text transform="matrix(1 0 0 1 81.2979 829.7734)" class="st6 st8">LUGAR</text>
                <text transform="matrix(1 0 0 1 338.7793 829.7734)" class="st6 st8">FECHA</text>
            </g>
            <g>
                <rect x="307.3" y="838" width="0.8" height="97.6"/>
                <rect x="73" y="935.6" class="st0" width="466.9" height="30.8"/>
                <rect x="73" y="936.4" width="0.8" height="30"/>
                <rect x="307.3" y="936.4" width="0.8" height="30"/>
                <rect x="73" y="966.4" width="466.9" height="0.8"/>
                <rect x="73" y="837.3" width="467.7" height="0.8"/>
                <rect x="73" y="935.6" width="467.7" height="0.8"/>
                <rect x="73" y="837.3" width="0.8" height="99.1"/>
                <rect x="540" y="837.3" width="0.8" height="99.1"/>
                <text transform="matrix(1 0 0 1 82.2593 948.38)" class="st6 st8">FIRMA DEL INTERESADO/A MADRE -</text>
                <text transform="matrix(1 0 0 1 228.4287 948.38)" class="st6 st8">PADRE - TUTOR -</text>
                <text transform="matrix(1 0 0 1 112.6147 959.6407)" class="st6 st8">GUARDADOR/A - CURADOR/A - APOYO</text>
                <text transform="matrix(1 0 0 1 375.8906 953.6349)" class="st6 st8">ACLARACIÓN DE FIRMA</text>
                <rect xmlns="http://www.w3.org/2000/svg" x="540" y="936.4" width="0.8" height="30"/>
            </g>
        </svg>`

    return Buffer.from(imageSVG)
}

export {
    logoBase64Buffer,
    getPdfTemplatePageOneBuffer,
    getPdfTemplatePageTwoBuffer,
}