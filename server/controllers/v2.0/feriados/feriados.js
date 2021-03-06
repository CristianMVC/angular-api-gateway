const holidays = [
  {
    categoria: 'No laborable',
    mes: 'Marzo',
    dia: 4,
    feriado: 'Carnaval',
    titulo: 'El 4 y 5 de marzo son los festejos del ¡Carnaval 2019!',
    bajada: 'Esas fechas son feriados nacionales inamovibles.',
  },
  {
    categoria: 'No laborable',
    mes: 'Marzo',
    dia: 24,
    feriado: 'Día Nacional de la Memoria por la Verdad y la Justicia',
    titulo: 'El 24 de marzo conmemoramos el Día Nacional de la Memoria por la Verdad y la Justicia.',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Abril',
    dia: 2,
    feriado: 'Día del Veterano y de los Caídos en la Guerra de Malvinas',
    titulo: 'El 2 de abril conmemoramos el Día del Veterano y de los Caídos en la Guerra de Malvinas.',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Abril',
    dia: 18,
    feriado: 'Jueves y Viernes Santo',
    titulo: 'El 18 y 19 de abril se celebran el Jueves y Viernes Santo. ¡Te deseamos Felices Pascuas!',
    bajada: 'Esas fechas son feriados nacionales inamovibles.',
  },
  {
    categoria: 'Religión judía',
    mes: 'Abril',
    dia: 19,
    feriado: 'Pascuas Judías',
    titulo: 'El 19, 20, 21, 25, 26 y 27 de abril se celebra Pésaj. ¡Jag Sameaj! ',
    bajada: 'Esas fechas son días no laborables para habitantes que profesen la religión judía.',
  },
  {
    categoria: 'Pueblo armenio',
    mes: 'Abril',
    dia: 24,
    feriado: 'Día de Acción por la tolerancia y el respeto entre los pueblos',
    titulo: 'El 24 de abril es el "Día de Acción por la tolerancia y el respeto entre los pueblos" recordando el genocidio sufrido por el pueblo armenio. ',
    bajada: 'Esa fecha es un día no laborable para empleados y funcionarios públicos, y alumnos de origen armenio.',
  },
  {
    categoria: 'No laborable',
    mes: 'Mayo',
    dia: 1,
    feriado: 'Día del trabajador',
    titulo: 'El 1 de mayo celebramos el Día del trabajador. ¡Felíz día para todos!',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Mayo',
    dia: 25,
    feriado: 'Día de la Revolución de Mayo',
    titulo: 'El 25 de mayo celebramos el Día de la Revolución de Mayo.',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'Religión islámica',
    mes: 'Junio',
    dia: 4,
    feriado: 'Fiesta de la Ruptura del Ayuno del Sagrado Mes de Ramadán',
    titulo: 'El 4 de junio se celebra en 2019 la Fiesta de la Ruptura del Ayuno del Sagrado Mes de Ramadán.',
    bajada: 'Esa fecha es un día no laborable para habitantes que profesen la religión islámica.',
  },
  {
    categoria: 'No laborable',
    mes: 'Junio',
    dia: 17,
    feriado: 'Día Paso a la Inmortalidad del General Martín Miguel de Güemes',
    titulo: 'El 17 de junio se celebra el Paso a la Inmortalidad del General Martín Miguel de Güemes.',
    bajada: 'Esa fecha es un feriado nacional trasladable.',
  },
  {
    categoria: 'No laborable',
    mes: 'Junio',
    dia: 20,
    feriado: 'Día Paso a la Inmortalidad del General Manuel Belgrano',
    titulo: 'El 20 de junio se celebra el Paso a la Inmortalidad del General Manuel Belgrano.',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Julio',
    dia: 8,
    feriado: 'Día de la Independencia',
    titulo: 'Próximos feriados: El 8 y  9 de julio. ',
    bajada: 'El 9 de julio celebramos el Día de la Independencia. El 8 de julio es un día no laboral con fines turísticos.',
  },
  {
    categoria: 'Religión islámica',
    mes: 'Agosto',
    dia: 11,
    feriado: 'Fiesta del Sacrificio',
    titulo: 'El 11 de agosto se celebra en 2019 la Fiesta del Sacrificio.',
    bajada: 'Esa fecha es un día no laborable para habitantes que profesen la religión islámica.',
  },
  {
    categoria: 'No laborable',
    mes: 'Agosto',
    dia: 17,
    feriado: 'Paso a la Inmortalidad del General José de San Martín',
    titulo: 'Próximos feriados: 17 y 19 de agosto',
    bajada: 'El sábado 17 de agosto se conmemora el paso a la Inmortalidad del Gral. José de San Martín. El lunes 19 de agosto es un día no laboral con fines turísticos.',
  },
  {
    categoria: 'Religión islámica',
    mes: 'Agosto',
    dia: 31,
    feriado: 'Año Nuevo Islámico',
    titulo: 'El 31 de agosto se celebra en 2019 el Año Nuevo Islámico.',
    bajada: 'Esa fecha es un día no laborable para habitantes que profesen la religión islámica.',
  },
  {
    categoria: 'Religión judía',
    mes: 'Septiembre',
    dia: 29,
    feriado: 'Año Nuevo Judío',
    titulo: 'Del 29 de septiembre al 1 de octubre se celebra el Año Nuevo Judío.',
    bajada: 'Esas fechas son días no laborables para habitantes que profesen la religión judía.',
  },
  {
    categoria: 'Religión judía',
    mes: 'Octubre',
    dia: 8,
    feriado: 'Día del Perdón',
    titulo: 'El 8 y 9 de octubre se celebra el Día del Perdón.',
    bajada: 'Esas fechas son días no laborable para habitantes que profesen la religión judía.',
  },
  {
    categoria: 'No laborable',
    mes: 'Octubre',
    dia: 12,
    feriado: 'Día del Respeto a la Diversidad Cultural',
    titulo: 'Próximos feriados: 12 y 14  de octubre.',
    bajada: 'El sábado 12 de octubre celebramos el Día del Respeto a la Diversidad Cultural. El lunes 14 de octubre es un día no laboral con fines turísticos.',
  },
  {
    categoria: 'No laborable',
    mes: 'Noviembre',
    dia: 20,
    feriado: 'Día de la Soberanía Nacional',
    titulo: 'Próximo feriado: 18 de noviembre',
    bajada: 'El 20 de noviembre se celebra el Día de la Soberanía Nacional. El feriado se traslada al lunes 18 de noviembre.',
  },
  {
    categoria: 'No laborable',
    mes: 'Diciembre',
    dia: 8,
    feriado: 'Inmaculada Concepción de María',
    titulo: 'El 8 de diciembre se celebra el Día de la Inmaculada Concepción de María.',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Diciembre',
    dia: 24,
    feriado: 'Navidad',
    titulo: 'El 25 de diciembre se celebra en todo el mundo la Navidad. ¡Te deseamos felices fiestas!',
    bajada: 'Esas fechas son feriado nacional inamovible.',
  },
  {
    categoria: 'No laborable',
    mes: 'Diciembre',
    dia: 31,
    feriado: 'Año nuevo',
    titulo: 'El 1 de enero celebramos el Año nuevo. ¡Te deseamos un buen 2019!',
    bajada: 'Esa fecha es un feriado nacional inamovible.',
  },
]

export default holidays