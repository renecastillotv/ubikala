// Dominican Republic guide seeds
// Each guide has metadata + body_html with the article content

const checkSvg = `<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
const warnSvg = `<svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`;

// Helper builders
function docItem(title: string, desc: string, color = 'green') {
  const icon = color === 'green' ? checkSvg : `<svg class="w-4 h-4 text-${color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`;
  return `<div class="bg-white border rounded-lg p-5"><div class="flex items-start gap-4"><div class="w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0">${icon}</div><div><h3 class="font-semibold text-gray-900">${title}</h3><p class="text-gray-600 text-sm mt-1">${desc}</p></div></div></div>`;
}

function step(n: number, title: string, desc: string) {
  return `<li class="flex gap-4"><span class="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">${n}</span><div><h4 class="font-semibold text-gray-900">${title}</h4><p class="text-gray-600">${desc}</p></div></li>`;
}

function alert(title: string, text: string) {
  return `<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4"><h4 class="font-semibold text-yellow-800 mb-2">${title}</h4><p class="text-yellow-700">${text}</p></div>`;
}

function callout(title: string, text: string, color = 'primary') {
  return `<div class="bg-${color}-50 border-l-4 border-${color}-500 p-4"><p class="text-${color}-800"><strong>${title}:</strong> ${text}</p></div>`;
}

function section(id: string, title: string, content: string) {
  return `<section id="${id}" class="mb-12"><h2 class="text-2xl font-bold text-gray-900 mb-4">${title}</h2>${content}</section>`;
}

// ─── Guide 1: Bono Primera Vivienda ────────────────────────────────
const bonoBody = [
  section('que-es', '¿Que es el Bono de Primera Vivienda?', `
    <p class="text-gray-700 mb-4">El Bono de Primera Vivienda es un <strong>subsidio habitacional</strong> otorgado por el gobierno dominicano a traves del Ministerio de la Vivienda y Edificaciones (MIVED). Esta disenado para ayudar a familias de bajos y medianos ingresos a adquirir su primera propiedad.</p>
    <p class="text-gray-700 mb-4">El programa esta amparado por la <strong>Ley 189-11</strong> sobre el Desarrollo del Mercado Hipotecario y el Fideicomiso en Republica Dominicana.</p>
    ${callout('Dato clave', 'El bono no es un prestamo, es un subsidio directo que no tienes que devolver. Se aplica como pago inicial o complemento para reducir el monto de tu hipoteca.', 'primary')}
  `),
  section('montos', 'Montos del Subsidio', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Tipo de Vivienda</th><th class="border p-3 font-semibold">Valor Maximo</th><th class="border p-3 font-semibold">Subsidio Aproximado</th></tr></thead><tbody>
    <tr><td class="border p-3">Vivienda de bajo costo</td><td class="border p-3">Hasta RD$2,500,000</td><td class="border p-3 font-semibold text-green-700">Hasta RD$1,500,000</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Vivienda de costo moderado</td><td class="border p-3">RD$2,500,000 - RD$4,500,000</td><td class="border p-3 font-semibold text-green-700">Hasta RD$750,000</td></tr>
    <tr><td class="border p-3">Vivienda de costo medio</td><td class="border p-3">RD$4,500,000 - RD$6,500,000</td><td class="border p-3 font-semibold text-green-700">Hasta RD$400,000</td></tr>
    </tbody></table></div>
    <div class="mt-6">${callout('Beneficio adicional', 'Las viviendas adquiridas bajo fideicomiso (Ley 189-11) pueden estar exentas del 3% de impuesto de transferencia inmobiliaria.', 'green')}</div>
  `),
  section('requisitos', 'Requisitos para Aplicar', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Requisitos Personales</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Ser dominicano o residente legal</li><li>• Mayor de 18 anos</li><li>• No poseer ninguna propiedad inmobiliaria</li><li>• No haber recibido subsidio habitacional previo</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Requisitos Economicos</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Ingresos familiares dentro de los limites del programa</li><li>• Capacidad de pago demostrable</li><li>• Historial crediticio favorable (no indispensable)</li><li>• Cuenta de ahorro activa</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Requisitos de la Vivienda</h3><ul class="text-sm text-gray-600 space-y-2"><li>• Proyecto registrado bajo fideicomiso (Ley 189-11)</li><li>• Valor dentro de los limites del programa</li><li>• Vivienda nueva (no aplica para usadas)</li><li>• Proyecto aprobado por el MIVED</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Condiciones</h3><ul class="text-sm text-gray-600 space-y-2"><li>• No vender la vivienda por al menos 5 anos</li><li>• Usar como residencia principal</li><li>• No alquilar durante el periodo de restriccion</li><li>• Mantener el inmueble en buen estado</li></ul></div>
    </div>
  `),
  section('documentos', 'Documentos Necesarios', `
    <div class="bg-white border rounded-lg divide-y">
      ${['Cedula de identidad y electoral - Original y copia del solicitante y conyugue', 'Carta de trabajo - Indicando cargo, salario y tiempo laborando', 'Estados de cuenta bancarios - Ultimos 3 a 6 meses', 'Certificacion de no propiedad - Emitida por la Jurisdiccion Inmobiliaria', 'Certificacion de la DGII - Indicando que no posees bienes inmuebles', 'Acta de matrimonio o declaracion jurada de solteria', 'Formulario de solicitud del MIVED'].map((item, i) => {
        const [title, desc] = item.split(' - ');
        return `<div class="p-4 flex items-start gap-3"><span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">${i+1}</span><div><p class="font-medium text-gray-900">${title}</p>${desc ? `<p class="text-sm text-gray-600">${desc}</p>` : ''}</div></div>`;
      }).join('')}
    </div>
  `),
  section('proceso', 'Proceso de Solicitud', `
    <ol class="space-y-6">
      ${step(1, 'Elige un Proyecto Elegible', 'Busca un proyecto habitacional registrado bajo fideicomiso y aprobado por el MIVED.')}
      ${step(2, 'Reune los Documentos', 'Prepara todos los documentos requeridos. La certificacion de no propiedad la solicitas en la Jurisdiccion Inmobiliaria.')}
      ${step(3, 'Presenta la Solicitud', 'Entrega tu solicitud y documentos en la oficina de ventas del proyecto o directamente en el MIVED.')}
      ${step(4, 'Evaluacion y Aprobacion', 'El MIVED evalua tu solicitud y verifica que cumplas los requisitos. Proceso de 2 a 8 semanas.')}
      ${step(5, 'Desembolso del Bono', 'Una vez aprobado, el bono se deposita en la cuenta del fideicomiso del proyecto.')}
      ${step(6, 'Cierre y Entrega', 'Completa el financiamiento restante y al finalizar la construccion recibes tu vivienda.')}
    </ol>
  `),
  section('tipos-vivienda', 'Tipos de Vivienda Elegibles', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Bajo Costo</div><p class="text-sm text-gray-600 mb-3">Hasta RD$2,500,000</p><div class="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Mayor subsidio</div><p class="text-sm text-gray-600 mt-3">Apartamentos y casas en proyectos de interes social.</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Costo Moderado</div><p class="text-sm text-gray-600 mb-3">RD$2.5M - RD$4.5M</p><div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Subsidio parcial</div><p class="text-sm text-gray-600 mt-3">Apartamentos en torres y casas en urbanizaciones.</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><div class="text-3xl font-bold text-primary-600 mb-2">Costo Medio</div><p class="text-sm text-gray-600 mb-3">RD$4.5M - RD$6.5M</p><div class="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-medium inline-block">Subsidio menor</div><p class="text-sm text-gray-600 mt-3">Apartamentos en zonas de mayor demanda.</p></div>
    </div>
  `),
  section('consideraciones', 'Consideraciones Importantes', `
    <div class="space-y-4">
      ${alert('Solo Viviendas Nuevas', 'El bono aplica exclusivamente para viviendas nuevas en proyectos bajo fideicomiso. No se puede usar para propiedades usadas.')}
      ${alert('Restriccion de Venta', 'No puedes vender, alquilar o transferir la vivienda durante los primeros 5 anos. Si lo haces, debes devolver el subsidio.')}
      ${alert('Una Sola Vez', 'El bono es un beneficio unico. Solo puedes solicitarlo una vez en la vida.')}
      ${alert('Disponibilidad de Fondos', 'Los fondos estan sujetos a la disponibilidad presupuestaria del gobierno. Los tiempos pueden variar.')}
    </div>
  `),
].join('\n');

// ─── Guide 2: Fideicomiso Inmobiliario ─────────────────────────────
const fideicomisoBody = [
  section('que-es', '¿Que es un Fideicomiso Inmobiliario?', `
    <p class="text-gray-700 mb-4">Un fideicomiso inmobiliario es una figura juridica regulada por la <strong>Ley 189-11</strong> de Republica Dominicana, que permite la transferencia de bienes inmuebles a una entidad fiduciaria para su administracion y eventual traspaso a los beneficiarios.</p>
    <p class="text-gray-700 mb-4">En el contexto de compra de propiedades, especialmente en proyectos en construccion, el fideicomiso actua como un mecanismo de proteccion tanto para el comprador como para el desarrollador.</p>
    ${callout('Importante', 'El fideicomiso inmobiliario esta regulado por la Superintendencia de Bancos de la Republica Dominicana, lo que garantiza supervision y transparencia.', 'primary')}
  `),
  section('beneficios', 'Beneficios del Fideicomiso', `
    <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Para el Comprador:</h3>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li><strong>Proteccion de la inversion:</strong> Los fondos estan protegidos en caso de quiebra del desarrollador</li><li><strong>Transparencia:</strong> La fiduciaria supervisa el uso correcto de los fondos</li><li><strong>Seguridad juridica:</strong> El proceso esta regulado por ley</li><li><strong>Beneficios fiscales:</strong> Exencion de algunos impuestos de transferencia</li></ul>
    <h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Para el Desarrollador:</h3>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li><strong>Mayor confianza:</strong> Los compradores se sienten mas seguros</li><li><strong>Acceso a financiamiento:</strong> Facilita la obtencion de prestamos bancarios</li><li><strong>Administracion profesional:</strong> La fiduciaria maneja los aspectos financieros</li></ul>
  `),
  section('partes', 'Partes Involucradas', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Fideicomitente</h3><p class="text-sm text-gray-600">El desarrollador o propietario que transfiere los bienes al fideicomiso.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Fiduciaria</h3><p class="text-sm text-gray-600">Entidad financiera autorizada que administra el fideicomiso y los fondos.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Fideicomisario</h3><p class="text-sm text-gray-600">El comprador o beneficiario que recibira la propiedad al completarse el proceso.</p></div>
    </div>
  `),
  section('proceso', 'Proceso de Compra', `
    <ol class="space-y-6">
      ${step(1, 'Seleccion del Proyecto', 'Elige un proyecto inmobiliario que opere bajo fideicomiso. Verifica que la fiduciaria este autorizada.')}
      ${step(2, 'Reservacion', 'Firma el contrato de reservacion y realiza el pago inicial (generalmente 10-20%).')}
      ${step(3, 'Incorporacion al Fideicomiso', 'Te registras como fideicomisario en el contrato de fideicomiso.')}
      ${step(4, 'Pagos Programados', 'Realiza los pagos segun el calendario. Los fondos van directamente a la cuenta del fideicomiso.')}
      ${step(5, 'Entrega y Transferencia', 'Al completarse la construccion y tus pagos, la fiduciaria transfiere la propiedad a tu nombre.')}
    </ol>
  `),
  section('costos', 'Costos Asociados', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Concepto</th><th class="border p-3 font-semibold">Costo Aproximado</th></tr></thead><tbody>
    <tr><td class="border p-3">Comision de administracion fiduciaria</td><td class="border p-3">0.5% - 1% anual</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Gastos legales</td><td class="border p-3">1% - 2% del valor</td></tr>
    <tr><td class="border p-3">Impuesto de transferencia</td><td class="border p-3">3% del valor (puede estar exento)</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Registro de titulo</td><td class="border p-3">Variable segun jurisdiccion</td></tr>
    </tbody></table></div>
    <div class="mt-6">${callout('Beneficio fiscal', 'Bajo la Ley 189-11, las transferencias desde un fideicomiso pueden estar exentas del 3% de impuesto de transferencia.', 'green')}</div>
  `),
  section('consideraciones', 'Consideraciones Importantes', `<div class="space-y-4">
    ${alert('Verifica la Fiduciaria', 'Asegurate de que la entidad fiduciaria este autorizada y supervisada por la Superintendencia de Bancos.')}
    ${alert('Lee el Contrato', 'Revisa cuidadosamente el contrato de fideicomiso. Consulta con un abogado especializado.')}
    ${alert('Conoce tus Derechos', 'Como fideicomisario tienes derecho a recibir informes periodicos sobre el estado del proyecto.')}
    ${alert('Plazos de Entrega', 'Verifica las clausulas sobre plazos de entrega y penalidades por retrasos.')}
  </div>`),
].join('\n');

// ─── Guide 3: Proceso de Compra ────────────────────────────────────
const procesoBody = [
  section('pasos', 'Pasos del Proceso de Compra', `
    <div class="space-y-8">
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">1</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Definir tus Necesidades y Presupuesto</h3><p class="text-gray-700 mb-4">Antes de comenzar la busqueda, define claramente:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Tipo de propiedad (casa, apartamento, terreno)</li><li>Ubicacion preferida</li><li>Numero de habitaciones y banos</li><li>Presupuesto maximo (incluyendo gastos adicionales)</li><li>Si es para vivir, invertir o alquilar</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">2</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Busqueda de Propiedades</h3><p class="text-gray-700 mb-4">Utiliza diferentes canales:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Portales inmobiliarios como Ubikala</li><li>Agentes inmobiliarios verificados</li><li>Desarrolladores de proyectos nuevos</li></ul>${callout('Consejo', 'Visita varias propiedades antes de decidir. No te apresures.', 'primary')}</div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">3</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Verificacion Legal (Due Diligence)</h3><p class="text-gray-700 mb-4">Paso mas importante. Verifica:</p><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li><strong>Certificacion del titulo:</strong> Solicita certificacion de estado juridico</li><li><strong>Deslinde:</strong> Confirma deslinde aprobado</li><li><strong>Impuestos al dia:</strong> Verifica que no haya deudas de IPI</li><li><strong>Gravamenes:</strong> Sin hipotecas o embargos</li></ul>${alert('Importante', 'Contrata un abogado inmobiliario para esta verificacion.')}</div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">4</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Negociacion y Oferta</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Presenta oferta formal por escrito</li><li>Negocia precio y condiciones</li><li>Acuerda quien paga cada gasto</li><li>Define plazo para cerrar</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">5</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Contrato de Promesa de Venta</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Descripcion completa de la propiedad</li><li>Precio acordado y forma de pago</li><li>Deposito (generalmente 10%)</li><li>Plazo para contrato definitivo</li><li>Penalidades por incumplimiento</li></ul></div>
      <div class="relative pl-8 pb-8 border-l-2 border-primary-200"><div class="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">6</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3">Pago y Contrato de Venta</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Pago del saldo restante</li><li>Firma ante notario</li><li>Pago impuesto de transferencia (3%)</li><li>Legalizacion de firmas</li></ul></div>
      <div class="relative pl-8"><div class="absolute -left-3 top-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">${checkSvg.replace('text-green-600', 'text-white')}</div><h3 class="text-xl font-semibold text-gray-900 mb-3">Registro de la Propiedad</h3><ul class="list-disc list-inside text-gray-600 space-y-2 ml-4"><li>Presentacion al Registro de Titulos</li><li>Pago de tasas de registro</li><li>Emision del nuevo certificado de titulo</li></ul>${callout('¡Felicidades!', 'Una vez registrada, la propiedad es oficialmente tuya.', 'green')}</div>
    </div>
  `),
  section('costos', 'Costos Adicionales a Considerar', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Concepto</th><th class="border p-3 font-semibold">Costo</th><th class="border p-3 font-semibold">Quien Paga</th></tr></thead><tbody>
    <tr><td class="border p-3">Impuesto de Transferencia</td><td class="border p-3">3%</td><td class="border p-3">Comprador</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Honorarios del Abogado</td><td class="border p-3">1% - 2%</td><td class="border p-3">Comprador</td></tr>
    <tr><td class="border p-3">Honorarios del Notario</td><td class="border p-3">RD$5,000 - RD$15,000</td><td class="border p-3">Comprador</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Registro de Titulos</td><td class="border p-3">Variable</td><td class="border p-3">Comprador</td></tr>
    <tr><td class="border p-3">Comision del Agente</td><td class="border p-3">3% - 5%</td><td class="border p-3">Vendedor</td></tr>
    </tbody></table></div>
  `),
  section('consejos', 'Consejos Utiles', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Trabaja con Profesionales</h3><p class="text-primary-800 text-sm">Contrata un abogado inmobiliario y trabaja con agentes verificados.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">No Te Apresures</h3><p class="text-primary-800 text-sm">Toma tu tiempo para verificar todo. Una decision apresurada puede costar mucho.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Presupuesta Gastos Extra</h3><p class="text-primary-800 text-sm">Considera un 5-8% adicional sobre el precio para gastos de cierre.</p></div>
      <div class="bg-primary-50 p-6 rounded-lg"><h3 class="font-semibold text-primary-900 mb-2">Documenta Todo</h3><p class="text-primary-800 text-sm">Guarda copias de todos los documentos y recibos de pago.</p></div>
    </div>
  `),
].join('\n');

// ─── Guide 4: Documentos ───────────────────────────────────────────
const documentosBody = [
  section('comprador', 'Documentos del Comprador', `<div class="space-y-4">
    ${docItem('Cedula de Identidad o Pasaporte', 'Original y copia. Para extranjeros: pasaporte vigente.')}
    ${docItem('Acta de Matrimonio (si aplica)', 'Si esta casado y la propiedad sera de ambos conyuges.')}
    ${docItem('RNC o Registro Mercantil', 'Si la compra es a nombre de una empresa.')}
    ${docItem('Comprobante de Fondos', 'Estado de cuenta bancaria o carta del banco.')}
  </div>`),
  section('vendedor', 'Documentos del Vendedor', `<div class="space-y-4">
    ${docItem('Cedula de Identidad o Pasaporte', 'Original y copia del propietario registrado.')}
    ${docItem('Certificado de Titulo Original', 'El documento que acredita la propiedad del inmueble.')}
    ${docItem('Certificacion de Estado Juridico', 'Emitida por el Registro de Titulos. Vigencia: 30 dias.')}
    ${docItem('Plano de Deslinde Aprobado', 'Plano catastral con las medidas exactas de la propiedad.')}
    ${docItem('Certificacion de Impuestos al Dia', 'Constancia de pago del IPI y otros impuestos municipales.')}
    ${docItem('Acta de Matrimonio o Divorcio', 'Para verificar regimen matrimonial y si el conyuge debe firmar.')}
  </div>`),
  section('transferencia', 'Documentos para la Transferencia', `<div class="space-y-4">
    ${docItem('Contrato de Venta Notarizado', 'Acto de venta firmado ante notario publico con firmas legalizadas.', 'primary')}
    ${docItem('Recibo de Pago del 3% de Transferencia', 'Comprobante de pago del impuesto de transferencia a la DGII.', 'primary')}
    ${docItem('Formulario de Solicitud de Transferencia', 'Formulario oficial del Registro de Titulos correspondiente.', 'primary')}
    ${docItem('Recibo de Pago de Tasas de Registro', 'Pago de los servicios del Registro de Titulos.', 'primary')}
  </div>`),
  section('notas', 'Notas Importantes', `<div class="space-y-4">
    ${alert('Vigencia de Documentos', 'La certificacion de estado juridico tiene vigencia de 30 dias. Solicitala cerca de la fecha de cierre.')}
    ${alert('Documentos Originales', 'El Registro de Titulos requiere documentos originales. Guarda copias certificadas.')}
    ${alert('Poder de Representacion', 'Si no puedes estar presente, necesitaras un poder notarial especifico.')}
    ${alert('Extranjeros', 'Los extranjeros pueden comprar con su pasaporte. No se requiere residencia.')}
  </div>`),
  section('checklist', 'Checklist de Verificacion', `
    <div class="bg-gray-50 rounded-lg p-6"><p class="text-gray-700 mb-4">Antes de cerrar la compra, verifica:</p><ul class="space-y-3">
    ${['Certificado de titulo original verificado', 'Certificacion de estado juridico vigente', 'Sin gravamenes ni hipotecas pendientes', 'Impuestos IPI al dia', 'Plano de deslinde aprobado', 'Identidad del vendedor verificada'].map(item => `<li class="flex items-center gap-3"><input type="checkbox" class="w-5 h-5 rounded border-gray-300" /><span class="text-gray-700">${item}</span></li>`).join('')}
    </ul></div>
  `),
].join('\n');

// ─── Guide 5: Impuestos ────────────────────────────────────────────
const impuestosBody = [
  section('transferencia', 'Impuesto de Transferencia Inmobiliaria', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Tasa</h3><p class="text-3xl font-bold text-primary-600">3%</p><p class="text-gray-600 text-sm mt-1">del valor de venta o tasacion (el mayor)</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Quien Paga</h3><p class="text-gray-700">El comprador (generalmente)</p></div></div></div>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"><li>Se paga una sola vez al momento de la transferencia</li><li>Debe pagarse antes de registrar la propiedad</li><li>Se calcula sobre el valor mayor entre precio de venta y tasacion</li><li>Se paga en la DGII</li></ul>
    ${callout('Exenciones', 'Propiedades mediante fideicomiso (Ley 189-11), primera vivienda de bajo costo, y transferencias por herencia.', 'green')}
  `),
  section('ipi', 'IPI - Impuesto al Patrimonio Inmobiliario', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Tasa Anual</h3><p class="text-3xl font-bold text-primary-600">1%</p><p class="text-gray-600 text-sm mt-1">del valor que exceda el monto exento</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Monto Exento (2024)</h3><p class="text-2xl font-bold text-gray-700">RD$9,860,649</p><p class="text-gray-600 text-sm mt-1">Ajustado anualmente por inflacion</p></div></div></div>
    <p class="text-gray-700 mb-4">El IPI es un impuesto anual que se aplica al patrimonio inmobiliario total de una persona.</p>
    <div class="bg-gray-50 rounded-lg p-6 mb-6"><h4 class="font-semibold text-gray-900 mb-3">Ejemplo de Calculo:</h4><table class="w-full text-sm"><tbody>
    <tr><td class="py-2">Valor total de propiedades:</td><td class="py-2 text-right font-semibold">RD$15,000,000</td></tr>
    <tr><td class="py-2">Menos: Monto exento:</td><td class="py-2 text-right font-semibold">- RD$9,860,649</td></tr>
    <tr class="border-t"><td class="py-2">Base imponible:</td><td class="py-2 text-right font-semibold">RD$5,139,351</td></tr>
    <tr class="border-t bg-primary-50"><td class="py-2 font-semibold">IPI a pagar (1%):</td><td class="py-2 text-right font-bold text-primary-600">RD$51,394</td></tr>
    </tbody></table></div>
    <h3 class="text-lg font-semibold text-gray-900 mb-3">Fechas de Pago:</h3>
    <div class="grid md:grid-cols-2 gap-4 mb-6"><div class="bg-white border rounded-lg p-4"><p class="font-semibold text-gray-900">Primera Cuota</p><p class="text-gray-600 text-sm">11 de marzo</p></div><div class="bg-white border rounded-lg p-4"><p class="font-semibold text-gray-900">Segunda Cuota</p><p class="text-gray-600 text-sm">11 de septiembre</p></div></div>
    ${callout('Exentos del IPI', 'Vivienda principal con valor menor al monto exento, propiedades agricolas, terrenos de viviendas de bajo costo, propiedades de zonas francas.', 'primary')}
  `),
  section('ganancia-capital', 'Impuesto sobre Ganancia de Capital', `
    <div class="bg-white border rounded-lg p-6 mb-6"><div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-semibold text-gray-900 mb-2">Tasa</h3><p class="text-3xl font-bold text-primary-600">27%</p><p class="text-gray-600 text-sm mt-1">sobre la ganancia obtenida</p></div><div><h3 class="font-semibold text-gray-900 mb-2">Quien Paga</h3><p class="text-gray-700">El vendedor</p></div></div></div>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"><li>Venta de propiedades por empresas o sociedades</li><li>Venta de propiedades que no son vivienda principal</li><li>Venta dentro de los primeros 5 anos (actividad habitual)</li></ul>
    ${callout('Exencion', 'La venta de la vivienda principal por una persona fisica generalmente esta exenta, siempre que no sea actividad habitual.', 'green')}
  `),
  section('otros', 'Otros Costos e Impuestos', `<div class="space-y-4">
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Impuestos Municipales</h3><p class="text-gray-600 text-sm">Arbitrios por servicios de recogida de basura, ornato publico, etc.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Gastos de Registro</h3><p class="text-gray-600 text-sm">Tasas del Registro de Titulos. Varia segun la jurisdiccion.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Gastos Notariales</h3><p class="text-gray-600 text-sm">Honorarios del notario por legalizacion y preparacion del acto de venta.</p></div>
    <div class="bg-white border rounded-lg p-5"><h3 class="font-semibold text-gray-900 mb-2">Honorarios Legales</h3><p class="text-gray-600 text-sm">Generalmente entre 1% y 2% del valor de la propiedad.</p></div>
  </div>`),
  section('resumen', 'Resumen de Costos al Comprar', `
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Concepto</th><th class="border p-3 font-semibold">Porcentaje/Monto</th><th class="border p-3 font-semibold">Momento</th></tr></thead><tbody>
    <tr><td class="border p-3">Impuesto de Transferencia</td><td class="border p-3">3%</td><td class="border p-3">Al comprar</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">Gastos Legales y Notariales</td><td class="border p-3">1% - 2%</td><td class="border p-3">Al comprar</td></tr>
    <tr><td class="border p-3">Registro de Titulos</td><td class="border p-3">Variable</td><td class="border p-3">Al comprar</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">IPI (si aplica)</td><td class="border p-3">1% anual</td><td class="border p-3">Cada ano</td></tr>
    </tbody></table></div>
    <div class="mt-6">${alert('Consejo', 'Presupuesta entre un 5% y 8% adicional sobre el precio de compra para cubrir todos los gastos.')}</div>
  `),
].join('\n');

// ─── Guide 6: Extranjeros ──────────────────────────────────────────
const extranjerosBody = [
  section('pueden', '¿Pueden los Extranjeros Comprar?', `
    <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-8"><h2 class="text-xl font-bold text-green-800 mb-3">¡Buenas Noticias!</h2><p class="text-green-700">Republica Dominicana es uno de los paises mas amigables para la inversion extranjera. Los extranjeros tienen los <strong>mismos derechos que los dominicanos</strong> para comprar y poseer propiedades, sin restricciones.</p></div>
    <p class="text-gray-700 mb-4"><strong>Si, absolutamente.</strong> La Constitucion dominicana garantiza el derecho a la propiedad para todos. No necesitas:</p>
    <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4"><li>Residencia permanente o temporal</li><li>Visa especial de inversionista</li><li>Socio dominicano</li><li>Autorizacion gubernamental especial</li></ul>
  `),
  section('requisitos', 'Requisitos para Extranjeros', `<div class="space-y-4">
    ${docItem('Pasaporte Vigente', 'Es el unico documento de identificacion requerido.')}
    ${docItem('Fondos para la Compra', 'Puedes traer fondos del exterior o usar cuentas bancarias dominicanas.')}
    ${docItem('RNC (Opcional pero Recomendado)', 'El Registro Nacional de Contribuyentes facilita tramites fiscales.')}
  </div>`),
  section('proceso', 'Proceso de Compra para Extranjeros', `
    <p class="text-gray-700 mb-6">El proceso es esencialmente el mismo que para dominicanos:</p>
    <ol class="space-y-6">
      ${step(1, 'Busqueda y Seleccion', 'Encuentra la propiedad ideal. Puedes hacerlo remotamente o visitando el pais.')}
      ${step(2, 'Due Diligence Legal', 'Contrata un abogado local para verificar el estado legal.')}
      ${step(3, 'Contrato y Deposito', 'Firma el contrato de promesa de venta y realiza el deposito inicial.')}
      ${step(4, 'Transferencia de Fondos', 'Transfiere el pago mediante transferencia bancaria internacional.')}
      ${step(5, 'Cierre y Registro', 'Firma del contrato final y registro a tu nombre.')}
    </ol>
  `),
  section('poder', 'Comprar sin Estar Presente', `
    <p class="text-gray-700 mb-4">Si no puedes viajar, puedes otorgar un <strong>Poder de Representacion</strong> a un abogado local.</p>
    <div class="bg-primary-50 border rounded-lg p-6 mb-6"><h3 class="font-semibold text-primary-900 mb-3">Tipos de Poder:</h3><ul class="space-y-3">
    <li class="flex items-start gap-3"><span class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center text-sm">1</span><div><strong class="text-primary-900">Poder Especial:</strong> <span class="text-primary-700">Para una transaccion especifica. El mas recomendado.</span></div></li>
    <li class="flex items-start gap-3"><span class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center text-sm">2</span><div><strong class="text-primary-900">Poder General:</strong> <span class="text-primary-700">Para multiples transacciones. Usar con precaucion.</span></div></li>
    </ul></div>
    ${alert('Requisitos del Poder', 'Debe ser notarizado en tu pais, requiere Apostilla de La Haya, y debe ser traducido al espanol por traductor certificado.')}
  `),
  section('fondos', 'Transferencia de Fondos', `
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-3">Opciones de Pago</h3><ul class="text-gray-600 text-sm space-y-2"><li>• Transferencia bancaria internacional (SWIFT)</li><li>• Cheque de gerencia de banco local</li><li>• Cuenta bancaria dominicana</li><li>• Servicios como Wise</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-3">Consideraciones</h3><ul class="text-gray-600 text-sm space-y-2"><li>• Documenta el origen de los fondos</li><li>• Considera tasas de cambio USD/DOP</li><li>• Pagos grandes requieren declaracion</li><li>• Guarda todos los comprobantes</li></ul></div>
    </div>
    ${callout('Abrir Cuenta Bancaria', 'Los extranjeros pueden abrir cuentas en RD con pasaporte, comprobante de direccion y referencias bancarias.', 'green')}
  `),
  section('impuestos', 'Impuestos para Extranjeros', `
    <p class="text-gray-700 mb-4">Los extranjeros pagan los mismos impuestos que los dominicanos:</p>
    <div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-gray-100"><th class="border p-3 font-semibold">Impuesto</th><th class="border p-3 font-semibold">Tasa</th><th class="border p-3 font-semibold">Cuando</th></tr></thead><tbody>
    <tr><td class="border p-3">Transferencia</td><td class="border p-3">3%</td><td class="border p-3">Al comprar</td></tr>
    <tr class="bg-gray-50"><td class="border p-3">IPI</td><td class="border p-3">1% anual</td><td class="border p-3">Si excede monto exento</td></tr>
    <tr><td class="border p-3">Ganancia de Capital</td><td class="border p-3">27%</td><td class="border p-3">Al vender</td></tr>
    </tbody></table></div>
  `),
  section('residencia', 'Residencia por Inversion', `
    <div class="bg-white border rounded-lg p-6 mb-6"><h3 class="font-semibold text-gray-900 mb-3">Residencia de Inversionista</h3><p class="text-gray-600 mb-4">Con una inversion de <strong>US$200,000 o mas</strong>, puedes solicitar residencia temporal.</p><ul class="text-gray-600 text-sm space-y-1"><li>• Duracion inicial: 1 ano, renovable</li><li>• Despues de 5 anos: residencia permanente</li><li>• Despues: opcion a naturalizacion</li></ul></div>
    ${callout('Beneficios de la Residencia', 'Estancias mas largas, facilidad para cuentas bancarias, posibilidad de trabajar legalmente, acceso a servicios locales.', 'primary')}
  `),
  section('consejos', 'Consejos para Extranjeros', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Contrata un Abogado Local</h3><p class="text-gray-600 text-sm">Es esencial tener representacion legal que conozca el sistema dominicano.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Visita la Propiedad</h3><p class="text-gray-600 text-sm">Si es posible, visita personalmente antes de comprar.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Investiga al Desarrollador</h3><p class="text-gray-600 text-sm">Verifica reputacion y proyectos anteriores.</p></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 mb-2">Considera Administracion</h3><p class="text-gray-600 text-sm">Si no viviras permanentemente, contrata administracion de propiedad.</p></div>
    </div>
  `),
].join('\n');

// ─── Guide 7: Invertir en Punta Cana ───────────────────────────────
const invertirBody = [
  section('por-que', '¿Por que Invertir en Punta Cana?', `
    <p class="text-gray-700 mb-6">Punta Cana es el destino turistico mas visitado del Caribe, con millones de turistas anualmente.</p>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">7M+</p><p class="text-gray-600 text-sm">Turistas anuales a RD</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">85%</p><p class="text-gray-600 text-sm">Ocupacion hotelera promedio</p></div>
      <div class="bg-white border rounded-lg p-6 text-center"><p class="text-3xl font-bold text-primary-600 mb-2">8-12%</p><p class="text-gray-600 text-sm">Retorno anual promedio</p></div>
    </div>
    <div class="bg-green-50 border-l-4 border-green-500 p-6"><h3 class="font-semibold text-green-800 mb-3">Ventajas</h3><ul class="text-green-700 space-y-2"><li>• Turismo estable todo el ano</li><li>• Alta demanda de alquileres vacacionales</li><li>• Apreciacion constante de propiedades</li><li>• Infraestructura de primer nivel</li><li>• Aeropuerto internacional con vuelos directos</li><li>• Estabilidad politica y economica</li></ul></div>
  `),
  section('zonas', 'Zonas de Inversion', `<div class="space-y-6">
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Bavaro</h3><p class="text-gray-600 mt-2">La zona mas desarrollada y turistica. Ideal para alquileres de corto plazo.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Rentabilidad: Alta</span><span class="text-primary-600">Precio: $$$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Cap Cana</h3><p class="text-gray-600 mt-2">Desarrollo de lujo exclusivo. Propiedades premium, golf, marina privada.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Rentabilidad: Media-Alta</span><span class="text-primary-600">Precio: $$$$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Punta Cana Village</h3><p class="text-gray-600 mt-2">Zona en crecimiento cerca del aeropuerto. Buenas oportunidades de apreciacion.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Rentabilidad: Media</span><span class="text-primary-600">Precio: $$$</span></div></div>
    <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg">Los Corales / El Cortecito</h3><p class="text-gray-600 mt-2">Zona mas accesible y popular. Excelente para Airbnb.</p><div class="mt-3 flex gap-4 text-sm"><span class="text-green-600">Rentabilidad: Alta</span><span class="text-primary-600">Precio: $$</span></div></div>
  </div>`),
  section('tipos', 'Tipos de Inversion', `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Apartamentos Vacacionales</h3><p class="text-gray-600 text-sm mb-4">Studios y apartamentos 1-2 hab. Alta demanda en Airbnb.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Inversion: US$80,000 - US$250,000</li><li>• Retorno: 8-12% anual</li><li>• Ocupacion: 60-80%</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Condohoteles</h3><p class="text-gray-600 text-sm mb-4">Unidades en hoteles operados profesionalmente.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Inversion: US$150,000 - US$400,000</li><li>• Retorno: 6-8% garantizado</li><li>• Gestion: Incluida</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Villas de Lujo</h3><p class="text-gray-600 text-sm mb-4">Alquileres semanales a grupos con alto poder adquisitivo.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Inversion: US$500,000+</li><li>• Retorno: 6-10% anual</li><li>• Tarifa: $500-$2,000/noche</li></ul></div>
      <div class="bg-white border rounded-lg p-6"><h3 class="font-semibold text-gray-900 text-lg mb-3">Terrenos</h3><p class="text-gray-600 text-sm mb-4">Inversion a largo plazo para apreciacion.</p><ul class="text-sm text-gray-600 space-y-1"><li>• Inversion: Desde US$30,000</li><li>• Retorno: Apreciacion 5-15% anual</li><li>• Liquidez: Baja</li></ul></div>
    </div>
  `),
  section('rentabilidad', 'Analisis de Rentabilidad', `
    <div class="bg-gray-50 rounded-lg p-6 mb-6"><h3 class="font-semibold text-gray-900 mb-4">Ejemplo: Apartamento 1 Hab en Bavaro</h3><table class="w-full text-sm"><tbody>
    <tr class="border-b"><td class="py-3 text-gray-600">Precio de compra:</td><td class="py-3 text-right font-semibold">US$150,000</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Tarifa promedio/noche:</td><td class="py-3 text-right font-semibold">US$120</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Ocupacion anual:</td><td class="py-3 text-right font-semibold">70% (255 noches)</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Ingreso bruto anual:</td><td class="py-3 text-right font-semibold">US$30,600</td></tr>
    <tr class="border-b"><td class="py-3 text-gray-600">Gastos operativos (30%):</td><td class="py-3 text-right font-semibold">- US$9,180</td></tr>
    <tr class="bg-primary-50"><td class="py-3 font-semibold">Ingreso neto anual:</td><td class="py-3 text-right font-bold text-primary-600">US$21,420</td></tr>
    <tr class="bg-primary-50"><td class="py-3 font-semibold">Retorno sobre inversion:</td><td class="py-3 text-right font-bold text-primary-600">14.3%</td></tr>
    </tbody></table></div>
    ${alert('Gastos a Considerar', 'Administracion 15-25%, mantenimiento areas comunes (HOA), servicios, limpieza, impuestos IPI, seguro.')}
  `),
  section('temporadas', 'Temporadas Turisticas', `
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-green-50 border border-green-200 rounded-lg p-6"><h3 class="font-semibold text-green-800 mb-2">Temporada Alta</h3><p class="text-sm text-green-700 mb-3">Diciembre - Abril</p><ul class="text-sm text-green-600 space-y-1"><li>• Ocupacion: 80-95%</li><li>• Tarifas: +40-60%</li></ul></div>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6"><h3 class="font-semibold text-yellow-800 mb-2">Temporada Media</h3><p class="text-sm text-yellow-700 mb-3">Mayo - Julio, Noviembre</p><ul class="text-sm text-yellow-600 space-y-1"><li>• Ocupacion: 60-75%</li><li>• Tarifas: Estandar</li></ul></div>
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6"><h3 class="font-semibold text-orange-800 mb-2">Temporada Baja</h3><p class="text-sm text-orange-700 mb-3">Agosto - Octubre</p><ul class="text-sm text-orange-600 space-y-1"><li>• Ocupacion: 40-55%</li><li>• Tarifas: -20-30%</li></ul></div>
    </div>
  `),
  section('consejos', 'Consejos de Inversion', `<div class="space-y-4">
    ${callout('Ubicacion es Clave', 'Prefiere propiedades a poca distancia de la playa. Los turistas valoran la cercania al mar.', 'primary')}
    ${callout('Verifica el Desarrollador', 'Investiga historial. Visita proyectos anteriores y habla con propietarios.', 'primary')}
    ${callout('Considera la Administracion', 'Si no vives en RD, necesitaras administracion profesional. Incluye el costo.', 'primary')}
    ${callout('No Sobrepagues', 'Compara precios. Trabaja con un agente local de confianza.', 'primary')}
  </div>`),
  section('riesgos', 'Riesgos a Considerar', `
    <div class="bg-red-50 border border-red-200 rounded-lg p-6"><ul class="space-y-3">
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Huracanes:</strong> <span class="text-red-700">Temporada junio-noviembre. Contrata buen seguro.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Sobreoferta:</strong> <span class="text-red-700">Desarrollo continuo puede crear competencia excesiva.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Dependencia del turismo:</strong> <span class="text-red-700">Eventos globales pueden afectar la demanda.</span></div></li>
      <li class="flex items-start gap-3">${warnSvg}<div><strong class="text-red-800">Administracion deficiente:</strong> <span class="text-red-700">Una mala administracion puede arruinar la rentabilidad.</span></div></li>
    </ul></div>
  `),
].join('\n');

// ─── Export all seeds ──────────────────────────────────────────────
export const guideSeedsDO = [
  {
    country_code: 'DO', lang: 'es', slug: 'bono-primera-vivienda', sort_order: 0,
    title: 'Bono de Primera Vivienda en Republica Dominicana',
    description: 'Guia completa sobre el Bono de Primera Vivienda en RD. Requisitos, montos de hasta RD$1,500,000, proceso y documentos.',
    keywords: 'bono primera vivienda, subsidio vivienda republica dominicana, bono vivienda rd',
    category: 'Comprar', icon: 'money', tag: 'Subsidio Gubernamental',
    hero_description: 'Recibe hasta RD$1,500,000 de subsidio del gobierno para comprar tu primera casa. Conoce los requisitos, el proceso y como aplicar.',
    toc: [{id:'que-es',label:'¿Que es el Bono?'},{id:'montos',label:'Montos del Subsidio'},{id:'requisitos',label:'Requisitos'},{id:'documentos',label:'Documentos'},{id:'proceso',label:'Proceso'},{id:'tipos-vivienda',label:'Tipos de Vivienda'},{id:'consideraciones',label:'Consideraciones'}],
    body_html: bonoBody,
    faqs: [{question:'¿Que es el Bono de Primera Vivienda?',answer:'Es un subsidio del gobierno dominicano que otorga hasta RD$1,500,000 a familias para la compra de su primera vivienda, regulado por la Ley 189-11.'},{question:'¿Cuanto dinero puedo recibir?',answer:'Para viviendas de bajo costo (hasta RD$2,500,000), el bono puede cubrir hasta RD$1,500,000. Para costo moderado hasta RD$750,000.'},{question:'¿Cuales son los requisitos?',answer:'Ser dominicano o residente legal, mayor de edad, no poseer propiedad, ingresos dentro de limites, vivienda en proyecto bajo fideicomiso.'},{question:'¿Como solicito el bono?',answer:'Elige un proyecto bajo fideicomiso, reune documentos y solicita a traves de la fiduciaria o el MIVED.'}],
    related_guides: [{slug:'fideicomiso-inmobiliario',title:'Fideicomiso Inmobiliario',description:'Como funciona la compra mediante fideicomiso.'},{slug:'proceso-compra-propiedad',title:'Proceso de Compra',description:'Guia paso a paso para comprar.'},{slug:'documentos-compra-venta',title:'Documentos para Compra-Venta',description:'Lista completa de documentos.'}],
    cta_title: '¿Listo para Comprar tu Primera Vivienda?', cta_description: 'Explora propiedades en proyectos elegibles para el bono de primera vivienda.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades Disponibles',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'fideicomiso-inmobiliario', sort_order: 1,
    title: 'Fideicomiso Inmobiliario en Republica Dominicana',
    description: 'Guia completa sobre fideicomisos inmobiliarios en RD. Beneficios, proceso, costos y consideraciones legales.',
    keywords: 'fideicomiso inmobiliario, fideicomiso republica dominicana, ley fideicomiso rd',
    category: 'Legal', icon: 'shield', tag: 'Legal',
    hero_description: 'Todo lo que necesitas saber sobre comprar propiedades mediante fideicomiso: beneficios, proceso, costos y consideraciones legales.',
    toc: [{id:'que-es',label:'¿Que es?'},{id:'beneficios',label:'Beneficios'},{id:'partes',label:'Partes Involucradas'},{id:'proceso',label:'Proceso'},{id:'costos',label:'Costos'},{id:'consideraciones',label:'Consideraciones'}],
    body_html: fideicomisoBody,
    faqs: [{question:'¿Que es un fideicomiso inmobiliario?',answer:'Figura juridica regulada por la Ley 189-11 que permite la transferencia de bienes a una fiduciaria para su administracion y traspaso.'},{question:'¿Cuales son los beneficios?',answer:'Proteccion de inversion, transparencia, seguridad juridica, y posible exencion del 3% de transferencia.'},{question:'¿Cuanto cuesta?',answer:'Comision fiduciaria 0.5%-1% anual, gastos legales 1%-2%, posible exencion del 3%.'},{question:'¿Quien regula los fideicomisos?',answer:'La Superintendencia de Bancos de la Republica Dominicana.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Proceso de Compra',description:'Guia paso a paso.'},{slug:'documentos-compra-venta',title:'Documentos Compra-Venta',description:'Documentos necesarios.'},{slug:'impuestos-inmobiliarios',title:'Impuestos Inmobiliarios',description:'Todo sobre impuestos.'}],
    cta_title: '¿Buscas Propiedades en Fideicomiso?', cta_description: 'Encuentra proyectos con fideicomiso en Republica Dominicana.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades Disponibles',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'proceso-compra-propiedad', sort_order: 2,
    title: 'Proceso de Compra de Propiedad en RD',
    description: 'Guia paso a paso para comprar una propiedad en Republica Dominicana.',
    keywords: 'comprar propiedad rd, proceso compra casa, guia compra inmueble',
    category: 'Comprar', icon: 'house', tag: 'Comprar',
    hero_description: 'Guia completa paso a paso para comprar tu casa, apartamento o terreno en Republica Dominicana.',
    toc: [{id:'pasos',label:'Pasos del Proceso'},{id:'costos',label:'Costos Adicionales'},{id:'consejos',label:'Consejos'}],
    body_html: procesoBody,
    faqs: [{question:'¿Cuales son los pasos?',answer:'1) Definir necesidades, 2) Busqueda, 3) Due diligence, 4) Negociacion, 5) Contrato promesa, 6) Pago y contrato, 7) Registro.'},{question:'¿Cuanto cuesta ademas del precio?',answer:'5-8% adicional: transferencia 3%, abogado 1-2%, notario RD$5-15K.'},{question:'¿Necesito abogado?',answer:'Si, altamente recomendado para due diligence y verificacion legal.'},{question:'¿Cuanto tiempo toma?',answer:'30-90 dias: verificacion 1-2 semanas, contratos 1-2 semanas, registro 2-4 semanas.'}],
    related_guides: [{slug:'documentos-compra-venta',title:'Documentos Compra-Venta',description:'Documentos necesarios.'},{slug:'fideicomiso-inmobiliario',title:'Fideicomiso Inmobiliario',description:'Compra mediante fideicomiso.'},{slug:'impuestos-inmobiliarios',title:'Impuestos Inmobiliarios',description:'Todo sobre impuestos.'}],
    cta_title: '¿Listo para Buscar tu Propiedad?', cta_description: 'Explora miles de propiedades en venta en Republica Dominicana.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades en Venta',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'documentos-compra-venta', sort_order: 3,
    title: 'Documentos para Compra-Venta de Propiedades',
    description: 'Lista completa de documentos necesarios para comprar o vender una propiedad en RD.',
    keywords: 'documentos compra propiedad rd, requisitos venta inmueble, certificado titulo',
    category: 'Legal', icon: 'document', tag: 'Legal',
    hero_description: 'Lista completa de todos los documentos que necesitas para comprar o vender una propiedad en Republica Dominicana.',
    toc: [{id:'comprador',label:'Documentos del Comprador'},{id:'vendedor',label:'Documentos del Vendedor'},{id:'transferencia',label:'Para la Transferencia'},{id:'notas',label:'Notas Importantes'},{id:'checklist',label:'Checklist'}],
    body_html: documentosBody,
    faqs: [{question:'¿Que necesita el comprador?',answer:'Cedula o pasaporte, acta matrimonio si aplica, RNC si empresa, comprobante de fondos.'},{question:'¿Que presenta el vendedor?',answer:'Cedula, certificado titulo, certificacion estado juridico (30 dias), plano deslinde, impuestos al dia.'},{question:'¿Que es la certificacion de estado juridico?',answer:'Documento del Registro de Titulos que confirma estado legal, gravamenes, hipotecas. Vigencia 30 dias.'},{question:'¿Extranjeros compran con pasaporte?',answer:'Si, solo pasaporte vigente. No se requiere residencia.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Proceso de Compra',description:'Guia paso a paso.'},{slug:'impuestos-inmobiliarios',title:'Impuestos Inmobiliarios',description:'Todo sobre impuestos.'},{slug:'extranjeros-comprando-rd',title:'Extranjeros Comprando en RD',description:'Requisitos para extranjeros.'}],
    cta_title: '¿Necesitas Ayuda con los Documentos?', cta_description: 'Explora propiedades disponibles en Republica Dominicana.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'impuestos-inmobiliarios', sort_order: 4,
    title: 'Impuestos Inmobiliarios en Republica Dominicana',
    description: 'Guia sobre impuestos inmobiliarios en RD: IPI, transferencia, plusvalia y mas.',
    keywords: 'impuestos inmobiliarios rd, ipi, impuesto transferencia 3%',
    category: 'Legal', icon: 'calculator', tag: 'Legal',
    hero_description: 'Todo lo que necesitas saber sobre los impuestos al comprar, poseer y vender propiedades en RD.',
    toc: [{id:'transferencia',label:'Impuesto de Transferencia'},{id:'ipi',label:'IPI'},{id:'ganancia-capital',label:'Ganancia de Capital'},{id:'otros',label:'Otros Costos'},{id:'resumen',label:'Resumen'}],
    body_html: impuestosBody,
    faqs: [{question:'¿Cuanto es el impuesto de transferencia?',answer:'3% del valor de venta o tasacion. Se paga una vez al comprar.'},{question:'¿Que es el IPI?',answer:'Impuesto anual del 1% sobre valor que exceda RD$9,860,649. Pagos: 11 marzo y 11 septiembre.'},{question:'¿Hay exenciones?',answer:'Si, fideicomiso Ley 189-11, primera vivienda bajo costo, herencia.'},{question:'¿Extranjeros pagan lo mismo?',answer:'Si, mismos impuestos: 3% transferencia, IPI si aplica, 27% ganancia capital.'}],
    related_guides: [{slug:'fideicomiso-inmobiliario',title:'Fideicomiso Inmobiliario',description:'Beneficios fiscales.'},{slug:'proceso-compra-propiedad',title:'Proceso de Compra',description:'Guia paso a paso.'},{slug:'invertir-punta-cana',title:'Invertir en Punta Cana',description:'Guia de inversion.'}],
    cta_title: '¿Tienes Dudas sobre Impuestos?', cta_description: 'Explora propiedades disponibles en Republica Dominicana.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'extranjeros-comprando-rd', sort_order: 5,
    title: 'Guia para Extranjeros Comprando en RD',
    description: 'Guia completa para extranjeros que desean comprar propiedades en Republica Dominicana.',
    keywords: 'extranjeros comprar propiedad rd, foreigners buying property dominican republic',
    category: 'Comprar', icon: 'globe', tag: 'Comprar',
    hero_description: 'Todo lo que necesitas saber como extranjero para comprar propiedades en Republica Dominicana.',
    toc: [{id:'pueden',label:'¿Pueden Comprar?'},{id:'requisitos',label:'Requisitos'},{id:'proceso',label:'Proceso'},{id:'poder',label:'Comprar sin Estar Presente'},{id:'fondos',label:'Transferencia de Fondos'},{id:'impuestos',label:'Impuestos'},{id:'residencia',label:'Residencia por Inversion'},{id:'consejos',label:'Consejos'}],
    body_html: extranjerosBody,
    faqs: [{question:'¿Pueden los extranjeros comprar?',answer:'Si, mismos derechos que dominicanos. No se necesita residencia, visa ni socio.'},{question:'¿Que documentos necesita un extranjero?',answer:'Solo pasaporte vigente. Opcionalmente RNC.'},{question:'¿Puedo comprar sin estar presente?',answer:'Si, con Poder de Representacion notarizado, apostillado y traducido.'},{question:'¿Puedo obtener residencia?',answer:'Si, con inversion de US$200,000+ puedes solicitar residencia temporal como inversionista.'}],
    related_guides: [{slug:'proceso-compra-propiedad',title:'Proceso de Compra',description:'Guia paso a paso.'},{slug:'invertir-punta-cana',title:'Invertir en Punta Cana',description:'Zona popular para extranjeros.'},{slug:'impuestos-inmobiliarios',title:'Impuestos Inmobiliarios',description:'Impuestos en RD.'}],
    cta_title: '¿Listo para Invertir en RD?', cta_description: 'Explora propiedades disponibles en Republica Dominicana.', cta_link: '/comprar', cta_link_text: 'Ver Propiedades',
  },
  {
    country_code: 'DO', lang: 'es', slug: 'invertir-punta-cana', sort_order: 6,
    title: 'Guia de Inversion Inmobiliaria en Punta Cana',
    description: 'Guia completa para invertir en bienes raices en Punta Cana. Zonas, rentabilidad y consejos.',
    keywords: 'invertir punta cana, bienes raices punta cana, rentabilidad inversion rd',
    category: 'Inversion', icon: 'trending', tag: 'Inversion',
    hero_description: 'Todo lo que necesitas saber para invertir exitosamente en el destino turistico mas importante del Caribe.',
    toc: [{id:'por-que',label:'¿Por que Punta Cana?'},{id:'zonas',label:'Zonas de Inversion'},{id:'tipos',label:'Tipos de Inversion'},{id:'rentabilidad',label:'Rentabilidad'},{id:'temporadas',label:'Temporadas'},{id:'consejos',label:'Consejos'},{id:'riesgos',label:'Riesgos'}],
    body_html: invertirBody,
    faqs: [{question:'¿Es rentable?',answer:'Si, retornos del 8-12% anual. Ocupacion hotelera 85%, 7M+ turistas anuales.'},{question:'¿Mejores zonas?',answer:'Bavaro (turistico), Cap Cana (lujo), Punta Cana Village (crecimiento), Los Corales (accesible).'},{question:'¿Cuanto cuesta un apartamento?',answer:'US$80K-250K. Villas desde US$500K. Terrenos desde US$30K.'},{question:'¿Riesgos?',answer:'Huracanes, sobreoferta, dependencia turismo, mala administracion.'}],
    related_guides: [{slug:'extranjeros-comprando-rd',title:'Extranjeros Comprando en RD',description:'Requisitos para extranjeros.'},{slug:'fideicomiso-inmobiliario',title:'Fideicomiso Inmobiliario',description:'Proteccion para tu inversion.'},{slug:'impuestos-inmobiliarios',title:'Impuestos Inmobiliarios',description:'Impuestos en RD.'}],
    cta_title: '¿Listo para Invertir en Punta Cana?', cta_description: 'Explora propiedades disponibles en Punta Cana.', cta_link: '/propiedades/la-altagracia', cta_link_text: 'Ver Propiedades en Punta Cana',
  },
];
