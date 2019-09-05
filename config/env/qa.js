export default {
  env: 'qa',
  db: 'mongodb://192.168.151.51/api-gateway',
  logger: {
    level: 'info',
    prettyPrint: true,
    file: '/var/log/api-gateway.log',
  },
  cookieParser: {
    secret: '4bff1e6a7d140693b609854a0bc2ccdc57bf9729',
  },
  jwt: {
    secret: 'DWWxSbZnCba9oQqdxWP7RBWsF5RfJLMLn5QN3GHXxDMywLsKHiUqwUcoz7EHqnPe',
    expire: 3600, //in Seconds ( 1Hs )
  },
  base64FileCipher: {
    algorithm: 'aes-256-ctr',
    password: '9g5v22q62lvd7wskq2np7nl2zonjfb3e',
    path: '/usr/local/api-gateway',
  },
  crons: {
    lots: 10,
  },
  pg: {
      user: 'postgres',
      host: '186.33.215.93',
      password: 'digitalmj15015',
      port: 5001,
      database: 'apigw_id',
      max: 30,
      mix: 10,
  },
  redis: {
    host: '192.168.151.51',
    port: 6379,
    password: undefined,
    ttl: 1800,
    secret: 'e7008fa1cabe3374cb7b9d28b376e97c61dca4cc',
    cookie: {
      secure: false,
      maxAge: 86400000,
    },
    saveUninitialized: false,
    resave: false,
  },
  cache: {
    prefix: 'cache',
    expire: {
      200: 3600,
      '4xx': 5,
      '5xx': 5,
      xxx: 5,
    },
  },
  locals: {
    baseURL: 'http://181.209.76.233',
  },
  ca: {
    dir: '/etc/api-gateway/ca/hml',
  },
  google: {
    sheets: {
      apiKey: 'AIzaSyDhyu5zjIfByMqLRJKtQBAty4B1SXs-wjk',
    },
  },
  ws: {
    seguridadVial: {
      url: 'https://sinalic.seguridadvial.gob.ar/servicios.modernizacion/Sinalic_Basic_WS.asmx',
      headers: {},
      query: {},
      body: {},
      licenciaDigital: {
        url: 'https://servicios.seguridadvial.gob.ar/saas/api/v1/licenciadigital',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNSUFSR0VOVElOQSIsIm9yZ2FuaXNtb0lEIjoiNSIsImV4cCI6NDEwMjQ1NTYwMCwiaWF0IjoxNTQyMTQxMzA5LCJlbWFpbCI6ImZydWl6QHNlZ3VyaWRhZHZpYWwuZ29iLmFyIiwicm9sZXMiOlsiTElDIiwiTElDLU5BQyJdLCJuYmYiOjE1NDIxNDEzMDl9.2c-SnwsOYbgXKjOBP8zWhtK5nVAzdFgC7R6n4D29ZhQ',
        },
        query: {},
        body: {},
      },
    },
    // Modificación QA->PRD
    // seguridadVial: {
    //   url: 'https://testqa09.seguridadvial.gov.ar/sinalic.services.modernizacion/Sinalic_Basic_WS.asmx',
    //   headers: {},
    //   query: {},
    //   body: {},
    //   licenciaDigital: {
    //     url: 'http://serviciostest.seguridadvial.gob.ar:5005/api/v1/licenciadigital',
    //     headers: {
    //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNSUFSR0VOVElOQSIsIm9yZ2FuaXNtb0lEIjoiNSIsImV4cCI6NDEwMjQ1NTYwMCwiaWF0IjoxNTQyMTQxMzA5LCJlbWFpbCI6ImZydWl6QHNlZ3VyaWRhZHZpYWwuZ29iLmFyIiwicm9sZXMiOlsiTElDIiwiTElDLU5BQyJdLCJuYmYiOjE1NDIxNDEzMDl9.2c-SnwsOYbgXKjOBP8zWhtK5nVAzdFgC7R6n4D29ZhQ',
    //     },
    //     query: {},
    //     body: {},
    //   },
    // },
    obsequios: {
      url: 'https://mule.gde.gob.ar/RLMServices/consultaRegistro?WDLS',
      headers: {},
      query: {},
      body: {},
    },
    dnrpa: {
      radicacionDominio: {
        url: 'https://www.ws1.dnrpa.gov.ar/WS-RadicacionPorDominio/index.php',
        headers: {},
        query: {},
        body: {},
      },
      radicacionDomiciolio: {
        url: 'https://www.ws1.dnrpa.gov.ar/WS-RadicacionPorDomicilio/index.php',
        headers: {},
        query: {},
        body: {},
      },
      cedulas: {
        url: 'https://www.ws1.dnrpa.gov.ar/WS-ConsultaCedulas/index.php',
        headers: {},
        query: {},
        body: {},
      },
    },
    minInterior: {
      url: 'https://tramitesweb.mininterior.gob.ar/rest/',
      headers: {},
      query: {},
      body: {},
      login: {
        url: 'https://tramitesweb.mininterior.gob.ar/rest/',
        headers: {},
        query: {
          user: 'd06078f29e0c6cf2b789985695abcd52',
          key: 'AAfhTTy-.gghN456455_*uu(12ju653',
        },
        body: {},
      },
    },
    minJusticia: {
      personasMenoresExtraviadas: {
        url: 'https://servicios.jus.gob.ar/personas-menores-extraviadas/api/v1.0',
        headers: {},
        query: {},
        body: {},
      },
    },
    defensaConsumidor: {
      url: 'http://186.33.221.248/mdp.crm',
      headers: {},
      query: {},
      body: {},
    },
    compreSocial: {
      login: {
        url: 'https://qa-interfaz.argentina.gob.ar/oauth/token',
        headers: {},
        query: {},
        body: {
          grant_type: 'client_credentials',
          client_id: '2',
          client_secret: 'SgoPAnQcYMcdvSPXEwMM2S4ylBQXKBL7xhzp1BDn',
        },
      },
      api: {
        url: 'https://qa-interfaz.argentina.gob.ar/api/v1',
        headers: {},
        query: {},
        body: {},
      },
    },
    bPopulares: {
      url: 'https://webservice-renabap.jgm.gob.ar/get.php',
      headers: {},
      query: {},
      body: {},
    },
    geoRef: {
      url: 'http://186.33.215.44/api/v1.0',
      headers: {},
      query: {},
      body: {},
    },
    interfaces: {
      login: {
        url: 'http://181.209.76.234/api/auth/login',
        headers: {},
        query: {},
        body: {
          username: 'admin',
          password: 'MyPass123',
        },
      },
      salud: {
        url: 'http://181.209.76.234/api/v1.0/salud',
        headers: {},
        query: {},
        body: {},
      },
    },
    bPopularesList: {
      url: 'http://181.209.76.234/api/v1.0/barrios-populares',
      headers: {},
      query: {},
      body: {},
    },
    bPopularesLocalidades: {
      url: 'http://181.209.76.234/api/v1.0/barrios-populares/localidades',
      headers: {},
      query: {},
      body: {},
    },
    mercados: {
      url: 'https://spreadsheets.google.com/feeds/list/1gDUaA7UVYxMNmY4Gww150S8yYBdVBfMvAGovHHQ5FfM/1/public/values?alt=json',
      headers: {},
      query: {},
      body: {},
    },
    argentinaGobAr: {
      login: {
        url: 'http://qa-back.argentina.gob.ar/oauth2/token',
        headers: {},
        query: {},
        body: {
          grant_type: 'client_credentials',
          client_id: 'test',
          client_secret: 'test',
        },
      },
      servicio: {
        url: 'http://qa-back.argentina.gob.ar/api/v1.0/servicio',
        headers: {},
        query: {},
        body: {},
      },
      servicioViejo: {
        url: 'http://qa-back.argentina.gob.ar/output/tramites',
        headers: {},
        query: {},
        body: {},
      },
    },
    msCrm: {
      login: {
        url: 'https://login.windows.net/mmsgd.onmicrosoft.com/oauth2/token',
        body: {
          grant_type: 'password',
          client_id: 'f813995d-67bd-4c36-a4ce-7db06f97a458',
          resource: 'https://mmsgd.crm2.dynamics.com',
          username: 'nps@mmsgd.onmicrosoft.com',
          password: '%f^L6Q4mXWcv913q',
        },
      },
      nps: {
        url: 'https://mmsgd.crm2.dynamics.com/api/data/v8.1/mcs_registrarrespuestavoc',
      },
    },
    feriadosList: {
      url: 'http://181.209.76.234/api/v1.0/feriados/list',
      headers: {},
      query: {},
      body: {},
    },
    feriadosTiposList: {
      url: 'http://181.209.76.234/api/v1.0/feriados/list/tipos',
      headers: {},
      query: {},
      body: {},
    },
    anses: {
      login: {
        url: 'https://soaservicios.anses.gob.ar/authexthomo/loginwsdl.asmx',
        headers: {},
        query: {},
        body: {},
      },
      constanciaDeCuilCodificada: {
        url: 'https://soaservicios.anses.gob.ar/DirectorSOAH/director.svc/soap11/ConstanciaDeCUILCodificada.asmx',
        headers: {},
        query: {},
        body: {},
      },
      traerBeneficiosAsociadosPorCUIL: {
        url: 'https://soaservicios.anses.gob.ar/DirectorSOAH/director.svc/soap11/ServicioPFZ2.asmx',
        headers: {},
        query: {},
        body: {},
      },
      dondeCobro: {
        url: 'https://soaservicios.anses.gob.ar/DirectorSOAH/director.svc/soap11/DondeCobro.asmx',
        headers: {},
        query: {},
        body: {},
      },
      obtenerDatosxDocumento: {
        url: 'https://soaservicios.anses.gob.ar/DirectorSOAH/director.svc/soap11/ADPLocalizacionDb2SP/wspw02.asmx',
        headers: {},
        query: {},
        body: {},
      },
    },
    categoriaServicios: {
      url: 'http://181.209.76.234/api/v1.0/mscrm-tramites/categoria-servicios',
      headers: {},
      query: {},
      body: {},
    },
    organismos: {
      url: 'http://181.209.76.234/api/v1.0/mscrm-tramites/organismos',
      headers: {},
      query: {},
      body: {},
    },
    fronteras: {
      gna: {
        url: 'https://serpegen.gna.gob.ar/fronteras/api/v1/pasos',
        headers: {},
        query: {},
        body: {},
      },
      pna: {
        list: {
          url: 'https://serviciosp.prefecturanaval.gob.ar/externo/Fronteras/Servicios/Puertos',
          headers: {},
          query: {},
          body: {},
        },
        detalle: {
          url: 'https://serviciosp.prefecturanaval.gob.ar/externo/Fronteras/Servicios/Detalle',
          headers: {},
          query: {},
          body: {},
        },
      },
    },
    beneficios: {
      url: 'http://mule.gde.gob.ar/LUEServices/consultaExternaLegajo',
      headers: {},
      query: {},
      body: {},
    },
    snr: {
      cud: {
        url: 'https://apps.snr.gob.ar:28086/modernizacion/cud/api/v1.0',
        headers: {},
        query: {},
        body: {},
      },
      cudValidezLegal: {
        url: 'http://186.33.230.201:9003/cud/document/',
        headers: {},
        query: {},
        body: {},
      },
    },
    g20: {
      login: {
        url: 'https://back-qa-g20.argentina.gob.ar/oauth2/token',
        headers: {},
        query: {},
        body: {
          grant_type: 'client_credentials',
          client_id: 'ldasdgaslga43yt34634g45g45g',
          client_secret: 'dsagsadgljasdlfj030302998dds',
        },
      },
      page: {
        url: 'https://back-qa-g20.argentina.gob.ar/en/api/rest/v1.0/pagina',
        headers: {},
        query: {},
        body: {},
      },
      page_es: {
        url: 'https://back-qa-g20.argentina.gob.ar/es/api/rest/v1.0/pagina',
        headers: {},
        query: {},
        body: {},
      },
      eventos: {
        url: 'https://back-qa-g20.argentina.gob.ar/en/api/rest/v1.0/reunion',
        headers: {},
        query: {},
        body: {},
      },
      eventos_es: {
        url: 'https://back-qa-g20.argentina.gob.ar/es/api/rest/v1.0/reunion',
        headers: {},
        query: {},
        body: {},
      },
      noticias: {
        url: 'https://back-qa-g20.argentina.gob.ar/en/api/rest/v1.0/noticia',
        headers: {},
        query: {},
        body: {},
      },
      noticias_es: {
        url: 'https://back-qa-g20.argentina.gob.ar/es/api/rest/v1.0/noticia',
        headers: {},
        query: {},
        body: {},
      },
      provincias: {
        url: 'https://back-qa-g20.argentina.gob.ar/en/api/rest/v1.0/provincia',
        headers: {},
        query: {},
        body: {},
      },
      provincias_es: {
        url: 'https://back-qa-g20.argentina.gob.ar/es/api/rest/v1.0/reunion',
        headers: {},
        query: {},
        body: {},
      },
      workstreams: {
        url: 'https://back-qa-g20.argentina.gob.ar/en/api/rest/v1.0/workstreams',
        headers: {},
        query: {},
        body: {},
      },
      workstreams_es: {
        url: 'https://back-qa-g20.argentina.gob.ar/es/api/rest/v1.0/workstreams',
        headers: {},
        query: {},
        body: {},
      },
    },
    infoleg: {
      index: {
        url: 'http://servicios.infoleg.gob.ar/infolegInternet/api',
        headers: {},
        query: {},
        body: {},
      },
      v0: {
        url: 'http://servicios.infoleg.gob.ar/infolegInternet/api/v1.0',
        headers: {},
        query: {},
        body: {},
      },
    },
    paisDigital: {
      wstoken: 'd7d7f41d0c45aa04082686e6e0ce0199',
      puntoDigitalCursos: {
        url: 'https://cursos-puntodigital.paisdigital.modernizacion.gob.ar/webservice/rest/server.php',
        headers: {},
        query: {},
        body: {},
      },
    },
    snt: {
      index: {
        url: 'http://pruebas-turnos-api.argentina.gob.ar/api/v1.0',
        headers: {},
        query: {},
        body: {},
      },
    },
    sintys: {
      index: {
        url: 'https://sapisews.sintys.gob.ar/api/2.1/server.php',
        headers: {},
        query: {},
        body: {
          organismo: 'NACSGD',
          usuarioOrganismo: 'DABADIE',
          password: '6S4OhrIkqWvOvyH',
          operacion: '',
          parametros: '',
        },
      },
    },
    incucai: {
      public: {
        url: 'https://ws-rest.incucai.gov.ar/publicIncucaiApi/',
        headers: {},
        query: {},
        body: {},
      },
      private: {
        url: 'http://10.10.4.76:8080/incucaiApi/',
        token: 'ABC',
        headers: {},
        query: {},
        body: {},
      },
    },
    minDesarrolloSocial: {
      login: {
        url: 'http://miargentina.mds.gob.ar/api/user/login',
        headers: {},
        query: {},
        body: {
          email: 'miargentina@mail.com',
          password: 'Demo1234',
        },
      },
      persons: {
        url: 'http://miargentina.mds.gob.ar/api/v1.0/persons',
        headers: {},
        query: {},
        body: {},
      },
      personsByCuil: {
        url: 'http://miargentina.mds.gob.ar/api/v1.0/persons/byCuil',
        headers: {},
        query: {},
        body: {},
      },
    },
    nomivac: {
      index: {
        url: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest/nomivac',
        headers: {},
        query: {},
        body: {
          username: 'bmonti14',
          password: 'facil1',
        },
      },
      calVacunas: {
        url: 'https://sisadev.msal.gov.ar/sisadev/services/rest/nomivac/calendarioVacunacion',
        headers: {},
        query: {},
        body: {
          username: 'bamonti',
          password: 'facil1',
        },
      },
    },
    gde: {
      security: {
        url: 'https://a.gde.gob.ar/security/auth',
        headers: {},
        query: {
          username: 'martgarcia',
          password: 'Mgarcia_12',
          application: 'R0VET19BUFBMSUNBVElPTg==',
          access_provider: 'CASSimple',
        },
        body: {},
      },
      tgt: {
        url: 'https://a-tst.gde.gob.ar/cas/',
        headers: {},
        query: {},
        body: 'username=martgarcia&password=Mgarcia12',
      },
      st: {
        url: 'https://a-tst.gde.gob.ar/cas/',
        headers: {},
        query: {},
        body: 'service=https://a-tst.gde.gob.ar/rlm-web/j_spring_cas_security_check',
      },
      cas: {
        url: 'https://a-tst.gde.gob.ar/gde-security/security/gde_token',
        headers: {},
        query: {
          application: 'R0VET19BUFBMSUNBVElPTg==',
          access_provider: 'CAS',
        },
        body: {},
        serviceURL: 'https://a-tst.gde.gob.ar/rlm-web/j_spring_cas_security_check',
      },
      rlm: {
        url: 'https://a.gde.gob.ar/rlm-web/RLMRestServices/CamposExternos',
        headers: {},
        query: {},
        body: {},
        security: {
          url: 'https://a.gde.gob.ar/security/gde_token',
          query: {
            application: 'R0VET19BUFBMSUNBVElPTg==',
            access_provider: 'CASSimple',
            username: 'TAD_DNPDP_DRNBDP',
            password: 'Aaip2019',
          },
        },
      },
      polizaAutomotor: {
        url: 'https://a-tst.gde.gob.ar/ssn-tablero-web/api/v1/consultas/publicas',
        headers: {},
        query: {},
        body: {},
      },
      tad: {
        url: 'https://a-tst.gde.gob.ar/tad2-rest/es',
        headers: {},
        query: {},
        body: {},
      },
    },
    andis: {
      simboloAutomotor: {
        url: 'http://186.33.231.50:3080/api/v1',
        headers: {},
        query: {},
        body: {},
      },
    },
    apostilla: {
      index: {
        url: 'https://mule.gde.gob.ar/GEDOServices/consultaDocumento/consultarDocumentoPdf',
        headers: {},
        query: {},
        body: {},
      },
    },
   turnos: {
      url: 'https://pruebas-turnos-api.argentina.gob.ar/api/v1.0',
   },
   filas: {
      url: 'https://pruebas-filas-api.argentina.gob.ar/api/v1.0',
   },
    cobertura: {
      login: {
        url: 'https://federador.msal.gob.ar/masterfile-federacion-service/api/usuarios/aplicacion/login',
        body: {
          nombre: 'HQgdGgMcFxMaCl4MHBcVGhwICQQTCBwdXgUbAAECFQ8HGh4J',
          clave: 'BicXKTNAQAdUU0RYB0MbOTg=',
          codDominio: 'DOMINIOSINAUTORIZACIONDEALTA',
        },
      },
      obtener: {
        headers: {
          codDominio: '2.16.840.1.113883.2.10.43',
        },
        url: 'https://federador.msal.gob.ar/masterfile-federacion-service/api/personas/cobertura',
      },
    },
    cultura: {
      convocatorias: {
        url: 'https://www.cultura.gob.ar/api/v2.0/convocatorias/',
        headers: {},
        query: {},
        body: {},
      },
    },
    puertosViasNavegables: {
      cabotaje: {
        credentials: {
            uuid: '322135b5-7855-4ae5-9996-5d02d287bdff',
            password: 'D04D62764B318693E2DA5F5177ABBA83',
        },
        getKey: {
          url: 'http://186.33.221.253:8000/keys',
        },
        getToken: {
          url: 'http://186.33.221.253:8000/login',
        },
        refreshToken: {
          url: 'http://186.33.221.253:8000/refresh',
        },
        listadoExcepciones: {
          url: 'http://186.33.221.253:8000/publicaciones',
        },
      },
    },
    rns: {
      auth: {
        username: 'user',
        password: 'user*123',
      },
      obtenerSociedades: {
        url: 'http://186.33.212.121:8000/rnstst/rns',
        headers: {},
        query: {},
        body: {},
      },
    },
    pami: {
      url: 'https://tramitesadistancia.gob.ar/tad2-rest/es/consultaExpedienteTAD/EX-2018-40585524-%20-APN-DNTEID%23MM/',
      headers: {},
      query: {},
      body: {},
    },
  },
  ws2: { //v2 endpoints
    nomivac: {
      index: {
        url: 'https://sisadev.msal.gov.ar/sisadev/services/rest/nomivac',
        headers: {},
        query: {},
        body: {
          username: 'bamonti',
          password: 'facil1',
        },
      },
    },
    dnrpa: {
      token: {
        url: 'https://www2.jus.gob.ar/sso/connect/token',
        headers: {},
        query: {},
        body: {
          scope: 'apiGateway',
          grant_type: 'client_credentials',
          client_id: 'e2717b9459d67916e4688a98c8c4628d',
          client_secret: 'acbeaab396394d70f573e04f7e138525',
        },
      },
      personas: {
        // url: 'https://miargentina-servicios.jus.gob.ar/mi-argentina/api/v1.0/personas/',
        url: 'https://miargentina-servicios.jus.gob.ar:9002/mi-argentina/api/v1.0/personas',
      },
      cedulas: {
        url: 'https://miargentina-servicios.jus.gob.ar/mi-argentina/api/v1.0/cedulas/activar',
      },
      seguroAutomotor: {
        url: 'https://a.gde.gob.ar/ssn-tablero-web/api/v1/consultas/automotor/tarjetaseguro',
        security: {
          url: 'https://a.gde.gob.ar/security/gde_token',
          query: {
            application: 'R0VET19BUFBMSUNBVElPTg==',
            access_provider: 'CASSimple',
            username: 'MIARGENTINA',
            password: 'TSD2019ssn',
          },
        },
      },
      rto: {
        url: 'https://api-test.cent.gov.ar/cent/v1.2/rto/obleas/',
        token: 'f90ac92e-4b2a-4576-849d-fc98abd8a33b',
        auth: {
          url: 'https://api-test.cent.gov.ar/auth',
          headers: {},
          query: {},
          body: {
            appName: 'miargdemo',
            apiKey: 'vieShaex4cau',
          },
        },
      },
    },
    incucai: {
      donantes: {
        url: 'http://10.10.4.76:8080/incucaiApi/v3.0/organos/donantes',
        headers: {},
        query: {
          token: 'ABC',
        },
        body: {},
      },
      donante: {
        url: 'http://10.10.4.76:8080/incucaiApi/v2.0/organos/donantes',
        headers: {},
        query: {
          token: 'ABC',
        },
        body: {},
      },
      consulta: {
        url: 'http://10.10.4.76:8080/incucaiApi/',
        headers: {},
        query: {
          token: 'ABC',
        },
        body: {},
      },
      trasplantados: {
        url: 'http://10.10.4.76:8080/incucaiApi',
        query: {
          token: 'ABC',
        },
      },
    },
    rlm: {
      url: 'https://a.gde.gob.ar/rlm-web/RLMRestServices/CamposExternos/listRegistrosExternos',
      headers: {},
      query: {},
      body: {},
      security: {
        url: 'https://a.gde.gob.ar/security/gde_token',
        query: {
          application: 'R0VET19BUFBMSUNBVElPTg==',
          access_provider: 'CASSimple',
          username: 'TAD_DNPDP_DRNBDP',
          password: 'Aaip2019',
        },
      },
    },
    renaper: {
      url: 'http://10.10.99.8/CHUTROFINAL/smartDNI/smart_dni_ws_v3_png.php',
        headers: {
          SOAPAction: 'urn:mininteriorwsdl#obtenerDNI',
        },
        query: {},
        body: {},
        dni: {
          url: 'https://renaperdatosc.idear.gov.ar:8446/DATOSC.php',
          headers: {
            'Content-Type': 'text/xml;charset=ISO-8859-1',
            SOAPAction: 'urn:mininteriorwsdl#obtenerUltimoEjemplar',
            host: 'renaperdatosc.idear.gov.ar:8446',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0',
          },
        },
    },
    mailgun: {
      mail: 'MiArgentinaSMTP@gmail.com',
      from: '"Mi Argentina" <contacto@mail.argentina.gob.ar>',
      auth: {
        auth: {
          api_key: 'key-6347fb8cf6bb806e91ff56e49f5be66c',
          domain: 'sandbox89fb965e03be4700b6579e474a59820c.mailgun.org',
        },
      },
    },
    srt: {
      credenciales: {
        url: 'https://apparg-apigw.srt.gob.ar/credenciales/',
        query: {
          apikey: '31300629cdb744c7b10e2e9f3f02c640',
        },
      },
    },
    idArgentina: {
      url: 'https://qa-id.argentina.gob.ar/api/',
    },
  },
}
