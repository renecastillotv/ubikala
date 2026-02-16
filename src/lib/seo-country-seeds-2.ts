import type { SeedItem } from './seo-country-seeds';

export const countrySeedData2: Record<string, SeedItem[]> = {

  // =============================================
  // EC — Ecuador (Spanish)
  // =============================================
  EC: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Descubre casas, apartamentos, terrenos y locales comerciales en venta en las principales ciudades y costas de {pais}. Economía dolarizada, precios accesibles y sin restricciones para extranjeros.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces en un país dolarizado y con alta calidad de vida' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Quito', description: 'La Carolina, Cumbayá, González Suárez — apartamentos modernos y casas con vistas a los volcanes', link: '/propiedades/quito', emoji: '🏔️', color: 'primary' },
      { name: 'Guayaquil', description: 'Samborondón, Puerto Santa Ana, Urdesa — la capital económica con desarrollo urbano acelerado', link: '/propiedades/guayaquil', emoji: '🏙️', color: 'emerald' },
      { name: 'Cuenca', description: 'Centro Histórico, El Vergel, Misicata — la joya colonial preferida por jubilados extranjeros', link: '/propiedades/cuenca', emoji: '🏛️', color: 'amber' },
      { name: 'Salinas', description: 'El Malecón, Chipipe, Mar Bravo — propiedades frente al mar a precios competitivos', link: '/propiedades/salinas', emoji: '🏖️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde suites en Quito hasta condominios frente al mar en Salinas', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias familiares en urbanizaciones cerradas con seguridad', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas de expansión urbana y costeras', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Espacios para negocio en centros comerciales y zonas de alto tráfico', link: '/comprar/locales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Extranjeros Compran con los Mismos Derechos', text: 'En {pais}, los extranjeros pueden adquirir propiedades con exactamente los mismos derechos que los nacionales. No necesitas residencia ni visa especial. La economía dolarizada elimina el riesgo cambiario, y el proceso de escrituración es transparente ante notaría pública.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es la alcabala y cuánto se paga al comprar un inmueble?', answer: 'La alcabala es el impuesto municipal de transferencia de dominio. Se paga el 1% sobre el valor del inmueble (sobre el excedente de 25 remuneraciones básicas unificadas). Se cancela en el municipio correspondiente al momento de la escrituración.' },
      { question: '¿Qué es el impuesto de plusvalía en Ecuador?', answer: 'El impuesto de plusvalía grava la ganancia obtenida por el incremento de valor del inmueble al momento de la venta. Lo paga el vendedor y se calcula sobre la diferencia entre el precio de venta y el valor de adquisición actualizado. La tarifa la fija cada municipio.' },
      { question: '¿Cuáles son las ventajas de la economía dolarizada para comprar propiedad?', answer: 'Ecuador usa el dólar estadounidense como moneda oficial desde el año 2000. Esto elimina el riesgo de devaluación cambiaria, facilita las transferencias internacionales y brinda estabilidad de precios. Los compradores extranjeros no enfrentan costos de conversión de moneda.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Ecuador?', answer: 'Sí, los extranjeros tienen exactamente los mismos derechos de propiedad que los ecuatorianos. No hay restricciones ni se requiere residencia. Solo necesitas tu pasaporte vigente y un número de RUC o cédula de identidad para extranjeros, que se tramita fácilmente.' },
      { question: '¿Cómo funciona la escrituración ante notaría?', answer: 'La compraventa se formaliza mediante escritura pública ante un notario. El notario verifica los documentos, el pago de impuestos (alcabala, plusvalía) y registra la operación. Luego se inscribe en el Registro de la Propiedad del cantón correspondiente para completar la transferencia legal.' },
      { question: '¿Qué es el crédito BIESS y quién puede acceder?', answer: 'El BIESS (Banco del Instituto Ecuatoriano de Seguridad Social) ofrece créditos hipotecarios a afiliados y jubilados del IESS con tasas preferenciales (desde 5.99% anual). Financia hasta el 100% del valor del inmueble para primera vivienda, con plazos de hasta 25 años. Se requieren al menos 36 aportaciones al IESS.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Bono de Vivienda MIDUVI', description: 'El Ministerio de Desarrollo Urbano y Vivienda otorga subsidios de hasta US$6,000 para primera vivienda en sectores de ingreso medio y bajo.', link: '/guias/bono-vivienda-miduvi', icon: 'money' },
      { title: 'Crédito Hipotecario BIESS', description: 'Financiamiento hasta el 100% del inmueble con tasas desde 5.99% para afiliados al IESS. Plazos hasta 25 años.', link: '/guias/credito-biess', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Proceso completo de compra, impuestos, escrituración y residencia para compradores internacionales en {pais}.', link: '/guias/extranjeros-comprando-ecuador', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que te guiarán en cada paso del proceso de compra en {pais}.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas familiares, oficinas y locales comerciales en alquiler en las principales ciudades de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Todo lo que necesitas saber para encontrar el espacio ideal para vivir o trabajar' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Quito', description: 'La Carolina, Cumbayá, República del Salvador, La Floresta', link: '/propiedades/quito', emoji: '🏔️', color: 'secondary' },
      { name: 'Guayaquil', description: 'Samborondón, Urdesa, Ceibos, Puerto Santa Ana', link: '/propiedades/guayaquil', emoji: '🏙️', color: 'emerald' },
      { name: 'Cuenca', description: 'Centro Histórico, El Vergel, Yanuncay', link: '/propiedades/cuenca', emoji: '🏛️', color: 'amber' },
      { name: 'Salinas', description: 'Malecón, Chipipe, San Lorenzo', link: '/propiedades/salinas', emoji: '🏖️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Cédula ecuatoriana o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Roles de pago, declaración de impuestos o estados de cuenta bancarios' },
      { title: 'Garantía o depósito', description: 'Generalmente un mes de arriendo como garantía, más el primer mes adelantado' },
      { title: 'Garante o referencias', description: 'Algunas arrendadoras solicitan un garante con propiedad o referencias personales' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Arrendar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Con tu pasaporte vigente y comprobante de ingresos puedes acceder a cualquier propiedad en arriendo. Al pagar en dólares, no hay sorpresas cambiarias.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para arrendar en Ecuador?', answer: 'Generalmente necesitas cédula o pasaporte vigente, comprobante de ingresos (roles de pago o estados de cuenta), referencias personales o laborales, y el depósito de garantía (normalmente un mes de arriendo).' },
      { question: '¿Cuánto es el depósito típico de arriendo?', answer: 'El depósito estándar es de un mes de arriendo como garantía, más el primer mes por adelantado. En propiedades amuebladas de lujo puede ser de dos meses. El depósito se devuelve al finalizar el contrato descontando daños si los hubiere.' },
      { question: '¿Los arriendos incluyen servicios básicos?', answer: 'Normalmente no. El inquilino paga luz, agua, internet y gas por separado. En algunos departamentos amueblados pueden incluir condominio y a veces internet. Siempre confirma qué incluye antes de firmar.' },
      { question: '¿Puedo arrendar como extranjero en Ecuador?', answer: 'Sí, los extranjeros pueden arrendar sin restricciones con su pasaporte vigente. Algunos arrendadores pueden solicitar un garante local o un depósito mayor como respaldo.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti y tu familia, en dólares y sin complicaciones.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde apartamentos en Quito y Guayaquil hasta propiedades frente al mar en la Costa, descubre oportunidades en un país dolarizado con precios accesibles.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Economía Dolarizada', description: 'Sin riesgo cambiario: {pais} usa el dólar estadounidense como moneda oficial, protegiendo tu inversión.', icon: 'money' },
      { title: 'Precios Accesibles', description: 'Propiedades de calidad a precios significativamente menores que en otros mercados latinoamericanos.', icon: 'chart' },
      { title: 'Biodiversidad Única', description: 'Desde los Andes hasta las Galápagos, cuatro regiones naturales con climas para todos los gustos.', icon: 'sun' },
      { title: 'Paraíso para Jubilados', description: '{pais} es consistentemente rankeado entre los mejores países del mundo para retirarse, con descuentos especiales para la tercera edad.', icon: 'globe' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde la Sierra hasta la Costa, cada región ofrece un estilo de vida único. Encuentra el tuyo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Quito', description: 'La capital a 2,800 metros de altura. Modernos apartamentos en La Carolina y Cumbayá, con clima primaveral todo el año y vistas a los volcanes.', link: '/propiedades/quito', emoji: '🏔️' },
      { name: 'Guayaquil', description: 'La capital económica y puerto principal. Desarrollo inmobiliario acelerado en Samborondón y Puerto Santa Ana con estilo de vida cosmopolita.', link: '/propiedades/guayaquil', emoji: '🏙️' },
      { name: 'Cuenca', description: 'Patrimonio de la Humanidad, destino favorito de expatriados. Costo de vida bajo, arquitectura colonial y el mejor clima de {pais}.', link: '/propiedades/cuenca', emoji: '🏛️' },
      { name: 'Santa Elena', description: 'Salinas, Montañita y la Ruta del Sol. Propiedades frente al mar con precios accesibles y creciente comunidad de surf y turismo.', link: '/propiedades/santa-elena', emoji: '🏖️' }
    ] }
  ],

  // =============================================
  // UY — Uruguay (Spanish)
  // =============================================
  UY: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora apartamentos, casas, terrenos y locales comerciales en venta en {pais}. El país más estable de Sudamérica, con plenos derechos para compradores extranjeros.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en el mercado inmobiliario más seguro de la región' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Montevideo', description: 'Pocitos, Punta Carretas, Carrasco — apartamentos modernos en los barrios más cotizados de la capital', link: '/propiedades/montevideo', emoji: '🏙️', color: 'primary' },
      { name: 'Punta del Este', description: 'La Barra, José Ignacio, Playa Mansa — el balneario más exclusivo de Sudamérica', link: '/propiedades/punta-del-este', emoji: '🏖️', color: 'emerald' },
      { name: 'Colonia del Sacramento', description: 'Barrio Histórico, Rambla Costanera — encanto colonial a minutos de Buenos Aires', link: '/propiedades/colonia', emoji: '🏛️', color: 'amber' },
      { name: 'Maldonado', description: 'Zona céntrica, Pinares, Solanas — crecimiento sostenido y excelente infraestructura', link: '/propiedades/maldonado', emoji: '🌊', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde monoambientes hasta penthouses con vista al mar en Punta del Este', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias familiares en barrios seguros con jardín', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas costeras y barrios en expansión', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Chacras', description: 'Propiedades rurales y chacras con hectáreas cerca de la costa', link: '/comprar/chacras', letter: 'Ch', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Mismos Derechos para Extranjeros', text: 'En {pais}, los extranjeros pueden comprar propiedades con exactamente los mismos derechos que los nacionales. No se requiere residencia ni autorización especial. La escritura se realiza ante escribano público y se inscribe en el Registro de la Propiedad.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es el ITP y cuánto se paga al comprar un inmueble?', answer: 'El Impuesto a las Transmisiones Patrimoniales (ITP) grava la compraventa de inmuebles en Uruguay. La tasa es del 2% sobre el valor real del inmueble para el comprador y 2% para el vendedor (4% total). Se paga al momento de la inscripción en el Registro de la Propiedad.' },
      { question: '¿Cómo funciona la escritura de compraventa en Uruguay?', answer: 'La compraventa se formaliza mediante escritura pública ante un escribano (notario). El escribano verifica la titulación, realiza los estudios de títulos, gestiona los certificados necesarios y otorga la escritura. Luego inscribe la transferencia en el Registro de la Propiedad, completando la operación.' },
      { question: '¿Qué es el BHU y qué financiamiento ofrece?', answer: 'El Banco Hipotecario del Uruguay (BHU) es la entidad estatal especializada en crédito para vivienda. Ofrece préstamos hipotecarios en Unidades Indexadas (UI) con plazos de hasta 25 años. Financia hasta el 80% del valor del inmueble para primera vivienda, con tasas competitivas.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Uruguay?', answer: 'Sí, los extranjeros gozan de los mismos derechos que los uruguayos para adquirir propiedades. No hay restricciones de ningún tipo. Solo necesitas tu pasaporte vigente. Uruguay es reconocido internacionalmente por la seguridad jurídica de sus transacciones inmobiliarias.' },
      { question: '¿Cuáles son los gastos de escribanía al comprar?', answer: 'Los honorarios del escribano rondan entre el 3% y 3.5% del valor del inmueble (más IVA). Esto incluye el estudio de títulos, redacción de la escritura, gestión de certificados registrales y fiscales, e inscripción en el Registro. Además se pagan timbres y aportes notariales.' },
      { question: '¿Qué impuestos recurrentes tiene una propiedad?', answer: 'Los propietarios pagan la Contribución Inmobiliaria (impuesto anual municipal sobre el valor catastral) y el Impuesto de Primaria (destinado a educación). Ambos se calculan sobre el valor catastral y se pagan en cuotas. Las tasas varían según el departamento y el valor de la propiedad.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'ANV Vivienda', description: 'La Agencia Nacional de Vivienda administra programas de acceso a vivienda con subsidios y créditos blandos para familias uruguayas.', link: '/guias/anv-vivienda-uruguay', icon: 'money' },
      { title: 'BHU Financiamiento', description: 'El Banco Hipotecario ofrece créditos en UI con plazos hasta 25 años y financiamiento de hasta el 80% del valor.', link: '/guias/bhu-credito-hipotecario', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Todo sobre el proceso de compra, impuestos, escribanía y residencia para inversores internacionales en {pais}.', link: '/guias/extranjeros-comprando-uruguay', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que te acompañarán en cada paso del proceso de compra.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos, casas, oficinas y locales comerciales en alquiler en las principales ciudades de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar en el país más estable de Sudamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Montevideo', description: 'Pocitos, Punta Carretas, Cordón, Ciudad Vieja', link: '/propiedades/montevideo', emoji: '🏙️', color: 'secondary' },
      { name: 'Punta del Este', description: 'Península, Playa Brava, La Barra', link: '/propiedades/punta-del-este', emoji: '🏖️', color: 'emerald' },
      { name: 'Colonia', description: 'Barrio Histórico, zona céntrica', link: '/propiedades/colonia', emoji: '🏛️', color: 'amber' },
      { name: 'Maldonado', description: 'Centro, Pinares, San Carlos', link: '/propiedades/maldonado', emoji: '🌊', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Cédula de identidad uruguaya o pasaporte vigente' },
      { title: 'Garantía de alquiler', description: 'Garantía de alquiler (CGN, ANDA, Porto Seguro o depósito bancario)' },
      { title: 'Comprobante de ingresos', description: 'Recibos de sueldo o declaración jurada con ingresos mínimos de 3 veces el alquiler' },
      { title: 'Contrato formal', description: 'Contrato por escrito registrado ante la Contaduría General de la Nación' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia para alquilar en {pais}. Con tu pasaporte vigente y una garantía de alquiler (depósito o garantía bancaria) puedes acceder a cualquier propiedad. Los contratos se rigen por la Ley de Arrendamientos.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué es la garantía de alquiler en Uruguay?', answer: 'Es una garantía que el inquilino debe presentar para respaldar el contrato. Las opciones incluyen: garantía de la Contaduría General de la Nación (CGN), garantía de ANDA, garantía de Porto Seguro, depósito bancario o propiedad como garantía. La más común es la garantía de CGN o ANDA.' },
      { question: '¿Cuánto cuesta alquilar en Montevideo?', answer: 'Los precios varían por barrio: Pocitos y Punta Carretas desde US$600-1,200 para 2 dormitorios. Cordón y Parque Rodó desde US$400-700. Carrasco desde US$800-2,000. Los gastos comunes se pagan aparte y varían según el edificio.' },
      { question: '¿Los alquileres se pagan en pesos o dólares?', answer: 'La ley permite contratos en pesos uruguayos o dólares americanos. En zonas turísticas como Punta del Este es común en dólares. En Montevideo hay de ambos. Los ajustes anuales se hacen según el índice de referencia de alquileres (IRA) para contratos en pesos.' },
      { question: '¿Puedo alquilar como extranjero en Uruguay?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones. Necesitas pasaporte vigente y una garantía de alquiler aceptada por el propietario. Algunos optan por un depósito bancario equivalente a varios meses de alquiler como alternativa a la garantía formal.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio ideal, con la seguridad jurídica que caracteriza a {pais}.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde apartamentos en la rambla de Montevideo hasta propiedades frente al mar en Punta del Este, descubre oportunidades en el país más estable de la región.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'País Más Conectado', description: '{pais} lidera en conectividad digital, gobierno electrónico y transparencia en América Latina.', icon: 'globe' },
      { title: 'Estabilidad Política', description: 'Democracia sólida, estado de derecho fuerte y la mayor seguridad jurídica de la región para tu inversión.', icon: 'chart' },
      { title: 'Igualdad de Derechos', description: 'Los extranjeros compran propiedades con exactamente los mismos derechos que los nacionales, sin restricciones.', icon: 'money' },
      { title: 'Calidad de Vida', description: 'Primer lugar en calidad de vida en Sudamérica: salud, educación, seguridad y libertades civiles.', icon: 'sun' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde la capital cosmopolita hasta las playas del este, cada destino ofrece un estilo de vida único.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Montevideo', description: 'La capital sobre el Río de la Plata. Rambla, gastronomía, cultura y barrios con personalidad propia como Pocitos, Carrasco y Ciudad Vieja.', link: '/propiedades/montevideo', emoji: '🏙️' },
      { name: 'Punta del Este', description: 'El balneario más exclusivo de Sudamérica. Playas icónicas, vida nocturna, gastronomía de primer nivel y propiedades de alta gama.', link: '/propiedades/punta-del-este', emoji: '🏖️' },
      { name: 'Colonia del Sacramento', description: 'Patrimonio de la Humanidad a orillas del Río de la Plata. Encanto colonial, tranquilidad y a solo una hora en ferry de Buenos Aires.', link: '/propiedades/colonia', emoji: '🏛️' },
      { name: 'José Ignacio', description: 'El refugio boutique de Sudamérica. Playas vírgenes, restaurantes exclusivos y propiedades de diseño para quienes buscan privacidad y sofisticación.', link: '/propiedades/jose-ignacio', emoji: '🌅' }
    ] }
  ],

  // =============================================
  // CR — Costa Rica (Spanish)
  // =============================================
  CR: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora casas, apartamentos, fincas y locales comerciales en venta en {pais}. Pura vida, democracia estable y sin restricciones para compradores extranjeros.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces en el país más verde de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'San José', description: 'Escazú, Santa Ana, Rohrmoser — zona metropolitana con alta plusvalía y servicios de primer nivel', link: '/propiedades/san-jose', emoji: '🏙️', color: 'primary' },
      { name: 'Guanacaste', description: 'Tamarindo, Playas del Coco, Flamingo — costa del Pacífico norte con playas paradisíacas', link: '/propiedades/guanacaste', emoji: '🏖️', color: 'emerald' },
      { name: 'Manuel Antonio', description: 'Quepos, Dominical — biodiversidad, playas y propiedades rodeadas de naturaleza tropical', link: '/propiedades/manuel-antonio', emoji: '🌴', color: 'amber' },
      { name: 'Heredia', description: 'San Joaquín, Barva, Santo Domingo — clima fresco, cercanía a San José y vida de montaña', link: '/propiedades/heredia', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Casas', description: 'Residencias en condominio con seguridad 24/7 y áreas verdes', link: '/comprar/casas', letter: 'C', color: 'primary' },
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses en torres modernas', link: '/comprar/apartamentos', letter: 'A', color: 'emerald' },
      { name: 'Fincas', description: 'Propiedades rurales con hectáreas para agricultura o retiro', link: '/comprar/fincas', letter: 'F', color: 'purple' },
      { name: 'Terrenos', description: 'Lotes en montaña, playa y zonas de desarrollo urbano', link: '/comprar/terrenos', letter: 'T', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Extranjeros Compran con los Mismos Derechos', text: 'En {pais}, los extranjeros pueden adquirir propiedades con los mismos derechos que los nacionales (excepto en la Zona Marítimo Terrestre, que tiene regulaciones especiales). No necesitas residencia para comprar. El proceso se realiza ante notario público con inscripción en el Registro Nacional.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cuánto es el impuesto de traspaso al comprar un inmueble?', answer: 'El impuesto de traspaso en Costa Rica es del 1.5% sobre el valor registrado o el valor fiscal (el que sea mayor). Lo paga el comprador al momento de la inscripción en el Registro Nacional. Adicionalmente hay timbres fiscales y honorarios notariales que rondan entre 1% y 1.5% del valor.' },
      { question: '¿Qué es la Ley de Propiedad Horizontal?', answer: 'La Ley Reguladora de la Propiedad en Condominio (Ley 7933) regula la propiedad horizontal en Costa Rica. Establece derechos y obligaciones de copropietarios, administración del condominio, áreas comunes, cuotas de mantenimiento y resolución de conflictos. Es esencial entenderla al comprar en condominio.' },
      { question: '¿Qué es la Zona Marítimo Terrestre y cómo afecta la compra?', answer: 'La Zona Marítimo Terrestre (ZMT) son los primeros 200 metros desde la pleamar. Los primeros 50 metros son zona pública (no se puede construir). Los siguientes 150 metros son zona restringida donde solo se otorgan concesiones municipales, no títulos de propiedad plena. Los extranjeros necesitan 5 años de residencia para obtener concesión en ZMT.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Costa Rica?', answer: 'Sí, los extranjeros pueden comprar propiedades tituladas con los mismos derechos que los costarricenses. No se requiere residencia ni visa. La excepción es la Zona Marítimo Terrestre, donde se necesitan 5 años de residencia. Una alternativa popular es comprar a través de una sociedad anónima costarricense.' },
      { question: '¿Qué es la SUGEF y cómo afecta los créditos hipotecarios?', answer: 'La SUGEF (Superintendencia General de Entidades Financieras) regula el sistema bancario costarricense. Los bancos nacionales (Banco Nacional, Banco de Costa Rica) y privados ofrecen hipotecas. Las tasas rondan el 7-12% anual en colones y 6-9% en dólares. Se financia hasta el 80% del valor con plazos hasta 30 años.' },
      { question: '¿Cuáles son los impuestos anuales sobre la propiedad?', answer: 'El Impuesto sobre Bienes Inmuebles es del 0.25% anual sobre el valor registrado. Se paga al municipio correspondiente. Adicionalmente existe el Impuesto Solidario para propiedades de lujo (valor superior a ₡133 millones) con tasas progresivas del 0.25% al 0.55%.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Zona Marítimo Terrestre', description: 'Entiende las reglas de concesión vs. título pleno en propiedades costeras. Clave antes de comprar cerca del mar.', link: '/guias/zona-maritimo-terrestre', icon: 'shield' },
      { title: 'Fideicomiso Costarricense', description: 'Compra segura en proyectos en desarrollo mediante fideicomiso bancario que protege tu inversión.', link: '/guias/fideicomiso-costarricense', icon: 'money' },
      { title: 'Guía de Compra Segura', description: 'Proceso completo: due diligence, notario, Registro Nacional e impuestos para compradores nacionales y extranjeros.', link: '/guias/guia-compra-segura-cr', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado costarricense y te guiarán en todo el proceso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas en condominio, oficinas y locales comerciales en alquiler en {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Todo lo que necesitas saber para encontrar el lugar perfecto en el país de la pura vida' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'San José', description: 'Escazú, Santa Ana, Rohrmoser, Sabana', link: '/propiedades/san-jose', emoji: '🏙️', color: 'secondary' },
      { name: 'Guanacaste', description: 'Tamarindo, Playas del Coco, Flamingo', link: '/propiedades/guanacaste', emoji: '🏖️', color: 'emerald' },
      { name: 'Heredia', description: 'San Joaquín, Barva, Ulloa', link: '/propiedades/heredia', emoji: '🏔️', color: 'amber' },
      { name: 'Manuel Antonio', description: 'Quepos, Dominical, Uvita', link: '/propiedades/manuel-antonio', emoji: '🌴', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Cédula costarricense, DIMEX o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia salarial, estados de cuenta o declaración de renta' },
      { title: 'Depósito de garantía', description: 'Un mes de alquiler como depósito, más el primer mes adelantado' },
      { title: 'Fiador o referencias', description: 'Fiador con propiedad inscrita o referencias verificables' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia para alquilar en {pais}. Con tu pasaporte vigente y los requisitos del arrendador puedes acceder a cualquier propiedad. Los contratos de alquiler se rigen por la Ley General de Arrendamientos.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Costa Rica?', answer: 'Necesitas cédula, DIMEX o pasaporte vigente, comprobante de ingresos (al menos 3 veces el alquiler), depósito de garantía (un mes) y un fiador con propiedad o referencias. Algunos arrendadores aceptan depósito adicional en lugar de fiador para extranjeros.' },
      { question: '¿Cuánto es el depósito típico de alquiler?', answer: 'El depósito estándar es de un mes de alquiler, más el primer mes por adelantado. La Ley de Arrendamientos establece que el depósito no puede exceder un mes de renta. Se devuelve al finalizar el contrato descontando daños comprobados.' },
      { question: '¿Los alquileres se pagan en colones o dólares?', answer: 'Ambos son comunes. En zonas turísticas y para expatriados es frecuente en dólares. En el Valle Central muchos contratos son en colones. La ley permite acordar la moneda libremente. Los ajustes anuales suelen vincularse a la inflación o tipo de cambio.' },
      { question: '¿Puedo alquilar como extranjero en Costa Rica?', answer: 'Sí, sin restricciones. Los extranjeros pueden alquilar con pasaporte vigente. Algunos arrendadores solicitan un depósito mayor o referencias adicionales. Es recomendable tener una cuenta bancaria local para facilitar los pagos mensuales.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para disfrutar la pura vida.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde condominios en Escazú hasta villas frente al Pacífico, descubre propiedades en el país más verde y estable de Centroamérica.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Pura Vida', description: 'Un estilo de vida relajado, amigable y conectado con la naturaleza que atrae a personas de todo el mundo.', icon: 'sun' },
      { title: 'Sin Ejército', description: '{pais} abolió su ejército en 1948, invirtiendo esos recursos en educación y salud. Democracia estable desde entonces.', icon: 'globe' },
      { title: 'Líder en Ecoturismo', description: 'El 25% del territorio es área protegida. Destino #1 mundial en turismo ecológico y sostenible.', icon: 'chart' },
      { title: 'Democracia Sólida', description: 'La democracia más antigua y estable de Centroamérica, con seguridad jurídica para tu inversión inmobiliaria.', icon: 'money' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde el Valle Central hasta las costas del Pacífico y el Caribe, cada zona ofrece una experiencia pura vida.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'San José', description: 'La capital y su Gran Área Metropolitana. Escazú y Santa Ana lideran con condominios de lujo, centros comerciales y la mejor infraestructura del país.', link: '/propiedades/san-jose', emoji: '🏙️' },
      { name: 'Guanacaste', description: 'El Pacífico norte con sus playas doradas. Tamarindo, Flamingo y Papagayo ofrecen propiedades frente al mar y un creciente mercado de alquiler vacacional.', link: '/propiedades/guanacaste', emoji: '🏖️' },
      { name: 'Manuel Antonio', description: 'Donde la selva tropical se encuentra con el océano. Propiedades con vistas espectaculares, biodiversidad incomparable y alta demanda turística.', link: '/propiedades/manuel-antonio', emoji: '🌴' },
      { name: 'Puerto Viejo', description: 'El Caribe costarricense en su máxima expresión. Ambiente bohemio, playas de arena blanca, cultura afrocaribeña y propiedades con encanto tropical.', link: '/propiedades/puerto-viejo', emoji: '🌊' }
    ] }
  ],

  // =============================================
  // GT — Guatemala (Spanish)
  // =============================================
  GT: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Descubre casas, apartamentos, terrenos y locales comerciales en venta en {pais}. La economía más grande de Centroamérica con un mercado inmobiliario en crecimiento.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en la mayor economía de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Ciudad de Guatemala', description: 'Zona 10, Zona 14, Zona 15 — las zonas premium con alta plusvalía y servicios completos', link: '/propiedades/ciudad-de-guatemala', emoji: '🏙️', color: 'primary' },
      { name: 'Antigua Guatemala', description: 'Centro Histórico, San Pedro, Jocotenango — encanto colonial Patrimonio de la Humanidad', link: '/propiedades/antigua', emoji: '🏛️', color: 'emerald' },
      { name: 'Lago Atitlán', description: 'Panajachel, San Marcos, Santa Catarina — propiedades con vistas al lago más bello del mundo', link: '/propiedades/lago-atitlan', emoji: '🌋', color: 'amber' },
      { name: 'Quetzaltenango', description: 'Xela centro, zona residencial — la segunda ciudad con precios accesibles y clima fresco', link: '/propiedades/quetzaltenango', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses en zonas exclusivas de la capital', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias en condominios cerrados con seguridad 24/7', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas residenciales, comerciales y turísticas', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Espacios para negocio en centros comerciales y zonas de alto tráfico', link: '/comprar/locales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Información para Compradores Extranjeros', text: 'Los extranjeros pueden adquirir propiedades en {pais} con los mismos derechos que los nacionales en la mayoría del territorio. Existe restricción en zonas fronterizas (franja de 15 km desde las fronteras) donde extranjeros no pueden poseer inmuebles directamente. El proceso requiere escritura pública ante notario e inscripción en el Registro General de la Propiedad.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona el ISR en la venta de inmuebles en Guatemala?', answer: 'Al vender un inmueble, el vendedor paga Impuesto Sobre la Renta (ISR) sobre la ganancia de capital. Se puede optar por el régimen del 10% sobre la ganancia neta (precio de venta menos costo de adquisición actualizado) o el 5% sobre el precio de venta total. El comprador actúa como agente de retención.' },
      { question: '¿Qué es el Registro General de la Propiedad y por qué es importante?', answer: 'El Registro General de la Propiedad (RGP) es la institución donde se inscriben todos los derechos sobre inmuebles en Guatemala. La inscripción registral da seguridad jurídica y publicidad a la propiedad. Antes de comprar, es esencial solicitar una certificación registral para verificar que el inmueble esté libre de gravámenes, hipotecas o litigios.' },
      { question: '¿Cómo funciona la escritura pública de compraventa?', answer: 'La compraventa se formaliza mediante escritura pública autorizada por un notario. El notario verifica la identidad de las partes, la titulación del inmueble, redacta la escritura, cobra los impuestos correspondientes y la presenta al Registro General de la Propiedad para su inscripción. Los honorarios notariales rondan entre el 1% y 2% del valor.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Guatemala?', answer: 'Sí, los extranjeros pueden comprar propiedades con los mismos derechos que los guatemaltecos, excepto en la franja fronteriza de 15 km (artículo 123 de la Constitución). Una alternativa para estas zonas es constituir una sociedad mercantil guatemalteca. En el resto del país no hay restricciones.' },
      { question: '¿Se paga IVA al comprar inmuebles?', answer: 'La primera venta de un inmueble nuevo por parte del constructor o promotor está gravada con IVA (12%). Las ventas posteriores entre particulares no generan IVA sino solo el impuesto de timbres fiscales (3% del valor) y el ISR correspondiente. Es importante verificar si la compra está sujeta a IVA o no.' },
      { question: '¿Cuáles son los costos de cierre al comprar?', answer: 'Los costos incluyen: honorarios notariales (1-2%), timbres fiscales (3% para ventas entre particulares) o IVA (12% para primera venta), ISR retenido al vendedor, gastos de inscripción registral, y tasación si hay financiamiento. Presupuesta entre 5-8% adicional al precio de compra.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'FHA Financiamiento', description: 'El FHA (Instituto de Fomento de Hipotecas Aseguradas) facilita créditos hipotecarios con seguros que reducen el riesgo y mejoran las condiciones de financiamiento.', link: '/guias/fha-guatemala', icon: 'money' },
      { title: 'Subsidio FOPAVI', description: 'El Fondo para la Vivienda (FOPAVI) otorga subsidios directos de hasta Q40,000 para familias de bajos ingresos que desean adquirir su primera vivienda.', link: '/guias/fopavi-subsidio', icon: 'shield' },
      { title: 'Guía Inversión Inmobiliaria', description: 'Proceso de compra paso a paso: due diligence registral, notario, impuestos y financiamiento en {pais}.', link: '/guias/inversion-inmobiliaria-gt', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado guatemalteco y te guiarán en cada paso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas en condominio, oficinas y locales comerciales en alquiler en {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio ideal para vivir o trabajar en la mayor economía centroamericana' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Ciudad de Guatemala', description: 'Zona 10 (Zona Viva), Zona 14, Zona 15 (Vista Hermosa)', link: '/propiedades/ciudad-de-guatemala', emoji: '🏙️', color: 'secondary' },
      { name: 'Antigua Guatemala', description: 'Centro, San Pedro, Ciudad Vieja', link: '/propiedades/antigua', emoji: '🏛️', color: 'emerald' },
      { name: 'Quetzaltenango', description: 'Centro, zonas residenciales', link: '/propiedades/quetzaltenango', emoji: '🏔️', color: 'amber' },
      { name: 'Lago Atitlán', description: 'Panajachel, San Marcos La Laguna', link: '/propiedades/lago-atitlan', emoji: '🌋', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'DPI (Documento Personal de Identificación) o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia laboral, estados de cuenta o declaración de ISR' },
      { title: 'Depósito de garantía', description: 'Generalmente 1-2 meses de alquiler como garantía' },
      { title: 'Fiador o referencias', description: 'Fiador con propiedad inmueble o referencias comerciales verificables' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Con tu pasaporte vigente y los requisitos del arrendador puedes acceder a cualquier propiedad. Los contratos de alquiler se rigen por el Código Civil guatemalteco.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Guatemala?', answer: 'Necesitas DPI o pasaporte vigente, comprobante de ingresos, depósito de garantía (1-2 meses) y generalmente un fiador con propiedad inscrita en el Registro. Para extranjeros, algunos arrendadores aceptan depósito adicional en lugar de fiador.' },
      { question: '¿Cuánto cuesta alquilar en zonas premium de Ciudad de Guatemala?', answer: 'En Zona 10 y Zona 14: apartamentos de 2 habitaciones desde Q5,000 a Q15,000 mensuales (US$650-1,950). En Zona 15 (Vista Hermosa): desde Q4,000 a Q12,000. En Antigua Guatemala, alquileres desde Q3,000 a Q10,000 dependiendo de la ubicación y estado.' },
      { question: '¿Los alquileres se pagan en quetzales o dólares?', answer: 'La mayoría de los contratos son en quetzales (GTQ). En zonas de expatriados como Antigua y algunas áreas de Zona 10 pueden encontrarse en dólares. La moneda del contrato se acuerda libremente entre las partes.' },
      { question: '¿Puedo alquilar como extranjero en Guatemala?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones. Solo necesitas pasaporte vigente y cumplir los requisitos del arrendador. Es común que soliciten depósito adicional o pago por adelantado de varios meses en lugar de fiador.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto en la ciudad o destino que prefieras.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde apartamentos modernos en la capital hasta propiedades coloniales en Antigua, descubre oportunidades en la mayor economía de Centroamérica.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Mayor Economía Centroamericana', description: '{pais} tiene el PIB más grande de la región, con un sector inmobiliario en constante crecimiento y desarrollo.', icon: 'chart' },
      { title: 'Mercado Digital en Crecimiento', description: 'Centro tecnológico emergente con inversión creciente en infraestructura digital y hub de startups.', icon: 'globe' },
      { title: 'Riqueza Cultural', description: 'Herencia maya viva, ciudades coloniales Patrimonio de la Humanidad y una de las gastronomías más ricas de la región.', icon: 'sun' },
      { title: 'Ubicación Estratégica', description: 'Conectividad aérea con toda América. Hub natural entre Norteamérica y Sudamérica con acceso a mercados clave.', icon: 'money' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde la vibrante capital hasta los lagos y volcanes del altiplano, cada destino cuenta su propia historia.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Ciudad de Guatemala', description: 'La capital y centro económico. Zonas 10, 14 y 15 con edificios modernos, centros comerciales, vida nocturna y la mayor oferta inmobiliaria del país.', link: '/propiedades/ciudad-de-guatemala', emoji: '🏙️' },
      { name: 'Antigua Guatemala', description: 'Patrimonio de la Humanidad con encanto colonial inigualable. Restaurantes de clase mundial, cultura vibrante y una creciente comunidad de expatriados.', link: '/propiedades/antigua', emoji: '🏛️' },
      { name: 'Lago Atitlán', description: 'Considerado el lago más bello del mundo. Rodeado de volcanes y pueblos mayas, ofrece propiedades únicas con vistas espectaculares y tranquilidad.', link: '/propiedades/lago-atitlan', emoji: '🌋' },
      { name: 'Quetzaltenango', description: 'La segunda ciudad del país, conocida como Xela. Clima fresco, cultura indígena viva, precios accesibles y excelente calidad de vida.', link: '/propiedades/quetzaltenango', emoji: '🏔️' }
    ] }
  ],

  // =============================================
  // HN — Honduras (Spanish)
  // =============================================
  HN: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Descubre casas, apartamentos, terrenos y propiedades comerciales en venta en {pais}. Desde las Islas de la Bahía hasta las principales ciudades, con precios altamente competitivos.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces en el corazón de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Tegucigalpa', description: 'Lomas del Guijarro, Los Castaños, Lomas del Mayab — zona residencial premium de la capital', link: '/propiedades/tegucigalpa', emoji: '🏙️', color: 'primary' },
      { name: 'San Pedro Sula', description: 'Col. Trejo, Los Alpes, Res. El Barrial — la capital industrial con alta actividad inmobiliaria', link: '/propiedades/san-pedro-sula', emoji: '🏢', color: 'emerald' },
      { name: 'Roatán', description: 'West Bay, Sandy Bay, French Harbour — paraíso caribeño con barrera de coral', link: '/propiedades/roatan', emoji: '🏖️', color: 'amber' },
      { name: 'La Ceiba', description: 'Zona Mazapán, El Naranjal, costeras — puerta de entrada a las Islas de la Bahía', link: '/propiedades/la-ceiba', emoji: '🌴', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Casas', description: 'Residencias en colonias cerradas con seguridad y áreas verdes', link: '/comprar/casas', letter: 'C', color: 'primary' },
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses en torres modernas', link: '/comprar/apartamentos', letter: 'A', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes residenciales, costeros y comerciales a precios accesibles', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Propiedades en Isla', description: 'Casas y condominios frente al mar en Roatán, Útila y Guanaja', link: '/comprar/islas', letter: 'I', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Reglas Especiales para las Islas de la Bahía', text: 'Los extranjeros pueden comprar propiedades en {pais}, incluyendo las Islas de la Bahía, bajo el régimen del Decreto 90-90 que permite a extranjeros poseer hasta 3,000 m² en zonas costeras e insulares. En el resto del país se aplica la Ley de Propiedad con restricciones en zonas fronterizas. La inscripción se realiza en el Instituto de la Propiedad (IP).' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona el Impuesto de Propiedad (IP) en Honduras?', answer: 'El Impuesto sobre Bienes Inmuebles lo cobran las municipalidades anualmente. La tasa varía según el municipio, generalmente entre 0.3% y 0.5% del valor catastral del inmueble. En las Islas de la Bahía las tasas pueden variar. Se paga en las oficinas municipales correspondientes.' },
      { question: '¿Cómo funciona el Registro de la Propiedad?', answer: 'El Instituto de la Propiedad (IP) es la entidad encargada de registrar los derechos sobre inmuebles en Honduras a través del Sistema Unificado de Registros (SURE). Antes de comprar, es esencial obtener una certificación de dominio pleno que confirme la titularidad y que no existan gravámenes, hipotecas o anotaciones preventivas.' },
      { question: '¿Pueden los extranjeros comprar en las Islas de la Bahía?', answer: 'Sí, bajo el Decreto 90-90, los extranjeros pueden adquirir hasta 3,000 m² en áreas costeras e insulares incluyendo Roatán, Útila y Guanaja. Para superficies mayores se requiere autorización especial. Muchos extranjeros también compran a través de sociedades mercantiles hondureñas. El proceso es relativamente sencillo con escritura ante notario.' },
      { question: '¿Cómo es el proceso de escrituración?', answer: 'La compraventa se formaliza mediante escritura pública ante notario. El notario verifica la titulación, documenta la operación y la presenta ante el Instituto de la Propiedad para inscripción. Los honorarios notariales rondan entre el 1% y 2.5% del valor. El proceso de inscripción toma entre 15 y 45 días.' },
      { question: '¿Qué es BANHPROVI y qué créditos ofrece?', answer: 'BANHPROVI (Banco Hondureño para la Producción y la Vivienda) es el banco estatal de segundo piso que canaliza recursos para vivienda a través de bancos comerciales. Ofrece créditos hipotecarios con tasas preferenciales para vivienda social y de clase media, con plazos hasta 20 años y financiamiento hasta el 90% del valor.' },
      { question: '¿Cuáles son los impuestos al comprar una propiedad?', answer: 'Los costos incluyen: Impuesto de Tradición (1.5% del valor), timbres y derechos registrales, honorarios notariales (1-2.5%), y tasación si hay financiamiento. Los vendedores pagan ganancia de capital (10% sobre la utilidad). Presupuesta entre 4-6% adicional al precio de compra.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'BANHPROVI Vivienda', description: 'Créditos hipotecarios canalizados por el Estado con tasas preferenciales y plazos hasta 20 años para vivienda social y de clase media.', link: '/guias/banhprovi-vivienda', icon: 'money' },
      { title: 'Régimen de la Propiedad', description: 'Entiende el sistema registral hondureño, el Instituto de la Propiedad y cómo verificar la titulación antes de comprar.', link: '/guias/regimen-propiedad-hn', icon: 'shield' },
      { title: 'Guía Islas de la Bahía', description: 'Todo sobre el Decreto 90-90, límites de superficie, proceso de compra y oportunidades en Roatán, Útila y Guanaja.', link: '/guias/islas-bahia-honduras', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado hondureño y te guiarán en cada paso del proceso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas en residenciales, oficinas y locales comerciales en alquiler en {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio ideal para vivir o trabajar en el corazón de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Tegucigalpa', description: 'Lomas del Guijarro, Col. Palmira, Los Castaños', link: '/propiedades/tegucigalpa', emoji: '🏙️', color: 'secondary' },
      { name: 'San Pedro Sula', description: 'Col. Trejo, Los Alpes, Res. Las Colinas', link: '/propiedades/san-pedro-sula', emoji: '🏢', color: 'emerald' },
      { name: 'Roatán', description: 'West Bay, Sandy Bay, Coxen Hole', link: '/propiedades/roatan', emoji: '🏖️', color: 'amber' },
      { name: 'La Ceiba', description: 'Zona Mazapán, centro, costeras', link: '/propiedades/la-ceiba', emoji: '🌴', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Tarjeta de identidad hondureña o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia de trabajo, estados de cuenta o declaración de ISR' },
      { title: 'Depósito de seguridad', description: 'Generalmente 1-2 meses de alquiler como garantía' },
      { title: 'Fiador o referencias', description: 'Fiador con propiedad o referencias laborales y personales' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Con tu pasaporte vigente y los requisitos del arrendador puedes acceder a cualquier propiedad en alquiler, incluyendo las Islas de la Bahía.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Honduras?', answer: 'Necesitas identidad o pasaporte vigente, comprobante de ingresos, depósito de garantía (1-2 meses) y un fiador con propiedad inmueble. Para extranjeros, algunos arrendadores aceptan depósito adicional o pago adelantado en lugar de fiador.' },
      { question: '¿Cuánto cuesta alquilar en zonas premium?', answer: 'En Tegucigalpa (Lomas del Guijarro): apartamentos desde L15,000 a L35,000 mensuales. En San Pedro Sula: desde L10,000 a L25,000. En Roatán los precios varían mucho: desde US$500 a US$2,500+ dependiendo de la ubicación y cercanía a la playa.' },
      { question: '¿Los alquileres en Roatán son en dólares?', answer: 'En las Islas de la Bahía es común que los alquileres se coticen en dólares americanos. En Tegucigalpa y San Pedro Sula predominan los contratos en lempiras. La moneda se acuerda entre las partes.' },
      { question: '¿Puedo alquilar como extranjero en Honduras?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones en todo el territorio, incluyendo las islas. Solo necesitas pasaporte vigente y cumplir los requisitos del arrendador. En Roatán hay una amplia oferta orientada a expatriados.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto, desde la capital hasta las islas del Caribe.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde condominios en Tegucigalpa hasta propiedades frente al mar en Roatán, descubre oportunidades a precios competitivos en el Caribe centroamericano.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Paraíso en las Islas de la Bahía', description: 'Roatán, Útila y Guanaja ofrecen la segunda barrera de coral más grande del mundo y precios aún accesibles.', icon: 'sun' },
      { title: 'Precios Altamente Competitivos', description: 'Propiedades significativamente más económicas que en países vecinos, con potencial de apreciación.', icon: 'money' },
      { title: 'Estilo de Vida Caribeño', description: 'Playas de arena blanca, buceo de clase mundial y una comunidad creciente de expatriados en las islas.', icon: 'globe' },
      { title: 'Mercado en Crecimiento', description: 'Inversión en infraestructura, turismo y zonas económicas especiales impulsan el desarrollo inmobiliario.', icon: 'chart' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde las montañas de la capital hasta las playas del Caribe, cada destino ofrece una experiencia diferente.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Tegucigalpa', description: 'La capital entre montañas. Colonias residenciales premium como Lomas del Guijarro, centros comerciales modernos y la sede del gobierno y los negocios.', link: '/propiedades/tegucigalpa', emoji: '🏙️' },
      { name: 'San Pedro Sula', description: 'La capital industrial y económica del norte. Mayor actividad comercial, precios accesibles y conexión directa con las costas del Caribe.', link: '/propiedades/san-pedro-sula', emoji: '🏢' },
      { name: 'Roatán', description: 'Isla paradisíaca con la segunda barrera de coral del mundo. Condominios frente al mar, comunidad de expatriados y el destino turístico más codiciado de {pais}.', link: '/propiedades/roatan', emoji: '🏖️' },
      { name: 'Tela', description: 'Playas vírgenes en la costa atlántica con proyectos de desarrollo turístico como Indura Beach Resort. Naturaleza intacta y precios de oportunidad.', link: '/propiedades/tela', emoji: '🌴' }
    ] }
  ],

  // =============================================
  // SV — El Salvador (Spanish)
  // =============================================
  SV: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora casas, apartamentos, terrenos y locales comerciales en venta en {pais}. Economía dolarizada, Bitcoin como moneda de curso legal y un mercado inmobiliario en plena transformación.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en el país más innovador de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'San Salvador', description: 'Escalón, Santa Elena, San Benito — las colonias premium de la capital con alta plusvalía', link: '/propiedades/san-salvador', emoji: '🏙️', color: 'primary' },
      { name: 'Santa Tecla', description: 'Ciudad inteligente, Jardines de la Libertad — moderna, organizada y con excelente calidad de vida', link: '/propiedades/santa-tecla', emoji: '🏔️', color: 'emerald' },
      { name: 'Playa El Tunco', description: 'La Libertad, El Zonte — la meca del surf con propiedades frente al Pacífico', link: '/propiedades/el-tunco', emoji: '🏖️', color: 'amber' },
      { name: 'La Libertad', description: 'Costa del Bálsamo, playas del Pacífico — desarrollo turístico y propiedades costeras', link: '/propiedades/la-libertad', emoji: '🌊', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses en torres modernas de la capital', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias en colonias cerradas y urbanizaciones con seguridad', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas costeras, residenciales y de desarrollo', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Espacios en centros comerciales y zonas de alto tráfico comercial', link: '/comprar/locales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Compra con los Mismos Derechos que los Nacionales', text: 'En {pais}, los extranjeros pueden adquirir propiedades con los mismos derechos que los salvadoreños. La economía es dolarizada y Bitcoin es moneda de curso legal. El proceso de compra se formaliza ante notario con inscripción en el Centro Nacional de Registros (CNR).' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cuánto es el impuesto de transferencia de inmuebles?', answer: 'La transferencia de inmuebles está gravada con el 3% sobre el excedente de US$28,571.43. Es decir, si compras una propiedad de US$100,000, se paga 3% sobre US$71,428.57 (la diferencia). Este impuesto lo paga el comprador al momento de la inscripción en el Centro Nacional de Registros (CNR).' },
      { question: '¿Cómo funciona el registro de propiedades en el CNR?', answer: 'El Centro Nacional de Registros (CNR) es la institución donde se inscriben todos los derechos de propiedad inmueble en El Salvador. La compraventa se formaliza en escritura pública ante notario, quien luego la presenta al CNR para inscripción. Es esencial solicitar una certificación de gravámenes antes de comprar para verificar que la propiedad esté libre de hipotecas o embargos.' },
      { question: '¿Cómo ha impactado la adopción de Bitcoin en el mercado inmobiliario?', answer: 'Desde 2021, Bitcoin es moneda de curso legal en El Salvador. Algunas transacciones inmobiliarias se pueden realizar en Bitcoin, y hay desarrollos orientados a la comunidad cripto, especialmente en la playa. Sin embargo, la mayoría de las transacciones siguen siendo en dólares. La adopción ha atraído inversión y nómadas digitales al mercado inmobiliario.' },
      { question: '¿Pueden los extranjeros comprar propiedades en El Salvador?', answer: 'Sí, los extranjeros tienen los mismos derechos que los salvadoreños para adquirir propiedades. No hay restricciones ni se requiere residencia. La economía dolarizada facilita las transacciones internacionales. Solo necesitas pasaporte vigente y un NIT (Número de Identificación Tributaria) que se tramita rápidamente.' },
      { question: '¿Qué es el FSV y qué créditos hipotecarios ofrece?', answer: 'El Fondo Social para la Vivienda (FSV) es la institución pública que otorga créditos hipotecarios a trabajadores cotizantes. Ofrece tasas preferenciales (desde 4.35% anual), plazos hasta 25 años y financia hasta el 95% del valor para vivienda de interés social. Se requieren al menos 12 cotizaciones para aplicar.' },
      { question: '¿Cuáles son los costos de cierre al comprar?', answer: 'Los costos incluyen: impuesto de transferencia (3% sobre el excedente), honorarios notariales (1-2%), derechos de registro en el CNR, tasación si hay financiamiento, y gastos bancarios. Presupuesta entre 4-7% adicional al precio de compra.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'FSV Financiamiento', description: 'El Fondo Social para la Vivienda ofrece créditos con tasas desde 4.35%, plazos hasta 25 años y financiamiento hasta el 95% para cotizantes.', link: '/guias/fsv-credito-vivienda', icon: 'money' },
      { title: 'Bitcoin y Real Estate', description: 'El Salvador es pionero en la adopción de Bitcoin. Entiende cómo impacta el mercado inmobiliario y las nuevas oportunidades de inversión.', link: '/guias/bitcoin-inmobiliario-sv', icon: 'shield' },
      { title: 'Guía de Compra Segura', description: 'Proceso completo: CNR, notario, impuestos y due diligence para comprar con seguridad en {pais}.', link: '/guias/guia-compra-segura-sv', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado salvadoreño y te guiarán en todo el proceso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas en residenciales, oficinas y locales comerciales en alquiler en {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio ideal para vivir o trabajar en el país más innovador de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'San Salvador', description: 'Escalón, Santa Elena, San Benito, Colonia San Francisco', link: '/propiedades/san-salvador', emoji: '🏙️', color: 'secondary' },
      { name: 'Santa Tecla', description: 'Jardines de la Libertad, El Pedregal, centro', link: '/propiedades/santa-tecla', emoji: '🏔️', color: 'emerald' },
      { name: 'Antiguo Cuscatlán', description: 'La Gran Vía, zona de embajadas', link: '/propiedades/antiguo-cuscatlan', emoji: '🏢', color: 'amber' },
      { name: 'La Libertad', description: 'El Tunco, El Zonte, Costa del Bálsamo', link: '/propiedades/la-libertad', emoji: '🏖️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'DUI (Documento Único de Identidad) o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia salarial, estados de cuenta o declaración de renta' },
      { title: 'Depósito de garantía', description: 'Generalmente 1-2 meses de alquiler como depósito' },
      { title: 'Fiador o referencias', description: 'Fiador con propiedad inmueble o referencias verificables' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Con tu pasaporte vigente y los requisitos del arrendador puedes acceder a cualquier propiedad. Los pagos se realizan en dólares estadounidenses, sin complicaciones cambiarias.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en El Salvador?', answer: 'Necesitas DUI o pasaporte vigente, comprobante de ingresos, depósito de garantía (1-2 meses) y generalmente un fiador con propiedad. Para extranjeros, es común que se acepte depósito adicional o pago adelantado como alternativa al fiador.' },
      { question: '¿Cuánto cuesta alquilar en zonas premium de San Salvador?', answer: 'En Escalón y Santa Elena: apartamentos de 2 habitaciones desde US$500 a US$1,200 mensuales. En San Benito: desde US$600 a US$1,500. En zonas de playa como El Tunco, alquileres desde US$400 a US$1,500 dependiendo de la temporada y cercanía al mar.' },
      { question: '¿Puedo pagar alquiler con Bitcoin?', answer: 'Técnicamente sí, ya que Bitcoin es moneda de curso legal en El Salvador. Sin embargo, la mayoría de los arrendadores aún prefieren pagos en dólares. Algunos propietarios orientados al mercado cripto y de nómadas digitales, especialmente en zonas de playa, aceptan Bitcoin.' },
      { question: '¿Puedo alquilar como extranjero en El Salvador?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones. Solo necesitas pasaporte vigente y cumplir los requisitos del arrendador. La economía dolarizada facilita los pagos para compradores internacionales.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio ideal, ya sea en la capital o frente al Pacífico.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Economía dolarizada, Bitcoin como moneda legal y un mercado en transformación. Desde apartamentos en San Salvador hasta propiedades frente al Pacífico.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Economía Bitcoin-Friendly', description: '{pais} es el primer país en adoptar Bitcoin como moneda de curso legal, atrayendo inversión tecnológica y nómadas digitales.', icon: 'globe' },
      { title: 'Hub Tecnológico Emergente', description: 'Creciente ecosistema tech, coworkings y comunidad de startups que impulsan la demanda inmobiliaria moderna.', icon: 'chart' },
      { title: 'Playas del Pacífico', description: 'Surf de clase mundial en El Tunco y El Zonte, con desarrollo turístico costero en constante crecimiento.', icon: 'sun' },
      { title: 'Vida Asequible en Dólares', description: 'Costo de vida competitivo en una economía dolarizada, ideal para expatriados y trabajadores remotos.', icon: 'money' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde la capital cosmopolita hasta las playas del Pacífico, cada destino ofrece algo único.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'San Salvador', description: 'La capital vibrante. Colonias como Escalón y Santa Elena ofrecen vida urbana moderna, restaurantes, centros comerciales y la mejor infraestructura del país.', link: '/propiedades/san-salvador', emoji: '🏙️' },
      { name: 'Santa Tecla', description: 'La ciudad inteligente de El Salvador. Paseo El Carmen, gastronomía, cultura y una planificación urbana que la convierte en la ciudad más organizada del país.', link: '/propiedades/santa-tecla', emoji: '🏔️' },
      { name: 'Playa El Tunco', description: 'La meca del surf centroamericano. Comunidad internacional creciente, Bitcoin Beach cercano, restaurantes y propiedades con vistas al Pacífico.', link: '/propiedades/el-tunco', emoji: '🏖️' },
      { name: 'Suchitoto', description: 'El pueblo mágico de El Salvador. Arte, cultura, lago Suchitlán y casas coloniales restauradas en un entorno de paz y naturaleza.', link: '/propiedades/suchitoto', emoji: '🏛️' }
    ] }
  ],

  // =============================================
  // NI — Nicaragua (Spanish)
  // =============================================
  NI: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Descubre casas, apartamentos, terrenos y propiedades comerciales en venta en {pais}. Los precios más accesibles de la región con costa Pacífica y Caribeña.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en el mercado inmobiliario más asequible de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Managua', description: 'Carretera a Masaya, Los Robles, Santo Domingo — la capital con el mayor desarrollo inmobiliario', link: '/propiedades/managua', emoji: '🏙️', color: 'primary' },
      { name: 'Granada', description: 'Centro Histórico, isletas, zona residencial — la joya colonial más bella de Centroamérica', link: '/propiedades/granada', emoji: '🏛️', color: 'emerald' },
      { name: 'San Juan del Sur', description: 'Playas, Maderas, Marsella — el destino de surf y playa más popular del Pacífico nicaragüense', link: '/propiedades/san-juan-del-sur', emoji: '🏖️', color: 'amber' },
      { name: 'León', description: 'Centro Histórico, zona universitaria — la capital cultural con arquitectura colonial y volcanes', link: '/propiedades/leon', emoji: '🌋', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Casas', description: 'Residencias coloniales restauradas y casas modernas en residenciales', link: '/comprar/casas', letter: 'C', color: 'primary' },
      { name: 'Apartamentos', description: 'Desde suites hasta apartamentos en torres de Managua', link: '/comprar/apartamentos', letter: 'A', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes costeros, urbanos y fincas a los mejores precios de la región', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Fincas', description: 'Propiedades rurales con hectáreas para agricultura, ganadería o ecoturismo', link: '/comprar/fincas', letter: 'F', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Extranjeros Pueden Comprar Propiedades', text: 'En {pais}, los extranjeros pueden adquirir propiedades con los mismos derechos que los nacionales. El proceso se formaliza mediante escritura pública ante notario e inscripción en el Registro Público de la Propiedad. Es fundamental realizar un estudio de títulos exhaustivo y trabajar con un abogado local de confianza.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona el IR sobre la venta de propiedades?', answer: 'El Impuesto sobre la Renta (IR) grava la ganancia de capital en la venta de inmuebles. Se aplica una tasa del 10% sobre la ganancia neta (diferencia entre precio de venta y precio de adquisición). El vendedor es responsable del pago. En algunos casos se puede aplicar retención definitiva del 1-3% sobre el valor de venta.' },
      { question: '¿Cómo funciona el Registro Público de la Propiedad?', answer: 'El Registro Público de la Propiedad Inmueble inscribe todos los derechos sobre bienes inmuebles en Nicaragua. Antes de comprar, es esencial obtener una certificación registral (libertad de gravamen) que confirme la titularidad y que no existan hipotecas, embargos o anotaciones preventivas. El estudio de títulos debe cubrir al menos los últimos 30 años.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Nicaragua?', answer: 'Sí, los extranjeros tienen los mismos derechos de propiedad que los nicaragüenses. No hay restricciones ni se requiere residencia. Sin embargo, es altamente recomendable trabajar con un abogado local que realice un estudio de títulos completo, ya que existen propiedades con situaciones registrales complejas.' },
      { question: '¿Cómo es el proceso de compraventa ante notario?', answer: 'La compraventa se formaliza mediante escritura pública ante notario. El notario verifica la identidad de las partes, la titulación del inmueble, el pago de impuestos municipales al día (IBI) y registra la operación. Los honorarios notariales rondan entre el 1% y 2% del valor. Luego se inscribe en el Registro Público.' },
      { question: '¿Qué es el IBI y cuánto se paga?', answer: 'El Impuesto de Bienes Inmuebles (IBI) es el impuesto municipal anual sobre la propiedad. La tasa es del 1% sobre el valor catastral del inmueble. Se paga en la alcaldía correspondiente. Las propiedades con valor catastral menor a C$100,000 están exentas. Es obligatorio estar al día con el IBI para poder vender.' },
      { question: '¿Cuáles son los costos totales de la compra?', answer: 'Los costos incluyen: honorarios notariales (1-2%), derechos de registro, IR del vendedor (que puede negociarse), solvencia municipal, y estudio de títulos. Presupuesta entre 3-6% adicional al precio de compra. Es más bajo que en países vecinos.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'INVUR Vivienda', description: 'El Instituto de la Vivienda Urbana y Rural administra programas de vivienda de interés social con subsidios para familias nicaragüenses de bajos ingresos.', link: '/guias/invur-vivienda', icon: 'money' },
      { title: 'Registro Público Guía', description: 'Entiende el sistema registral nicaragüense, cómo verificar títulos y proteger tu inversión inmobiliaria.', link: '/guias/registro-publico-ni', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Proceso completo de compra, estudio de títulos, notario e impuestos para inversores internacionales en {pais}.', link: '/guias/extranjeros-comprando-nicaragua', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado nicaragüense y te guiarán en cada paso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra casas coloniales, apartamentos amueblados, oficinas y locales comerciales en alquiler en {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio ideal para vivir o trabajar al precio más accesible de Centroamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Managua', description: 'Los Robles, Carretera a Masaya, Altamira, Santo Domingo', link: '/propiedades/managua', emoji: '🏙️', color: 'secondary' },
      { name: 'Granada', description: 'Centro Histórico, Calle La Calzada, zona residencial', link: '/propiedades/granada', emoji: '🏛️', color: 'emerald' },
      { name: 'San Juan del Sur', description: 'Centro, playas cercanas, zona turística', link: '/propiedades/san-juan-del-sur', emoji: '🏖️', color: 'amber' },
      { name: 'León', description: 'Centro Histórico, barrios universitarios', link: '/propiedades/leon', emoji: '🌋', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Cédula nicaragüense o pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia salarial, colilla del INSS o estados de cuenta' },
      { title: 'Depósito de garantía', description: 'Generalmente 1-2 meses de alquiler como depósito' },
      { title: 'Fiador o referencias', description: 'Fiador con propiedad o referencias verificables, especialmente para extranjeros' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia para alquilar en {pais}. Con tu pasaporte vigente y los requisitos del arrendador puedes acceder a cualquier propiedad. Los precios de alquiler son de los más bajos en toda Centroamérica.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Nicaragua?', answer: 'Necesitas cédula o pasaporte vigente, comprobante de ingresos, depósito de garantía (1-2 meses) y un fiador o referencias. Para extranjeros, es común que se acepte un depósito mayor (2-3 meses) como alternativa al fiador local.' },
      { question: '¿Cuánto cuesta alquilar en zonas de expatriados?', answer: 'En Managua (Los Robles, Carretera a Masaya): desde US$300 a US$1,200 mensuales para apartamentos. En Granada (Centro Histórico): desde US$300 a US$800. En San Juan del Sur: desde US$400 a US$1,500 dependiendo de temporada y cercanía a la playa.' },
      { question: '¿Los alquileres se pagan en córdobas o dólares?', answer: 'En zonas de expatriados y turísticas (Granada, San Juan del Sur) es común en dólares. En Managua hay de ambos. La ley permite acordar la moneda libremente. Los contratos en córdobas se ajustan según la inflación acordada entre las partes.' },
      { question: '¿Puedo alquilar como extranjero en Nicaragua?', answer: 'Sí, sin restricciones. Los extranjeros pueden alquilar con pasaporte vigente. En zonas turísticas como Granada y San Juan del Sur hay amplia oferta orientada a expatriados con contratos flexibles y en dólares.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto al mejor precio de la región.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde casas coloniales en Granada hasta propiedades frente al Pacífico en San Juan del Sur, descubre los precios más accesibles de Centroamérica.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Los Más Accesibles de la Región', description: '{pais} ofrece los precios inmobiliarios más bajos de Centroamérica, con excelente potencial de apreciación.', icon: 'money' },
      { title: 'Naturaleza Espectacular', description: 'Volcanes activos, lagos enormes, islas tropicales y una biodiversidad que rivaliza con países mucho más grandes.', icon: 'sun' },
      { title: 'Pacífico + Caribe', description: 'Dos costas con personalidad propia: el surf del Pacífico y las aguas cristalinas del Caribe, todo en un solo país.', icon: 'globe' },
      { title: 'Turismo en Crecimiento', description: 'El sector turístico crece sostenidamente, impulsando la demanda de propiedades vacacionales y de inversión.', icon: 'chart' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde ciudades coloniales hasta playas vírgenes, cada rincón de {pais} ofrece una experiencia única.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Managua', description: 'La capital y centro económico. Desarrollo inmobiliario moderno en Carretera a Masaya y Los Robles, con la mejor infraestructura y servicios del país.', link: '/propiedades/managua', emoji: '🏙️' },
      { name: 'Granada', description: 'La ciudad colonial más bella de Centroamérica, a orillas del Lago Nicaragua. Casas coloniales restauradas, isletas paradisíacas y una vibrante comunidad de expatriados.', link: '/propiedades/granada', emoji: '🏛️' },
      { name: 'San Juan del Sur', description: 'El destino de playa y surf del Pacífico. Propiedades con vistas al océano, vida nocturna, comunidad internacional y los atardeceres más espectaculares de {pais}.', link: '/propiedades/san-juan-del-sur', emoji: '🏖️' },
      { name: 'León', description: 'Capital cultural e intelectual. Catedral Patrimonio de la Humanidad, volcanes para sandboarding, universidades históricas y propiedades coloniales a precios de oportunidad.', link: '/propiedades/leon', emoji: '🌋' }
    ] }
  ],

};
