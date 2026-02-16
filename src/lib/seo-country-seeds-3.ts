import type { SeedItem } from './seo-country-seeds';

export const countrySeedData3: Record<string, SeedItem[]> = {

  // =============================================
  // AR — Argentina (Spanish)
  // =============================================
  AR: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora nuestra selección de departamentos, casas, terrenos y locales comerciales en venta en {pais}. Precios competitivos en dólares, cultura vibrante y oportunidades de inversión en una de las economías más grandes de Sudamérica.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces en la tierra del tango, el vino y la Patagonia' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Buenos Aires — Palermo', description: 'Palermo Soho, Palermo Hollywood, Palermo Chico — gastronomía, diseño y la zona más codiciada de la capital', link: '/propiedades/palermo', emoji: '🌳', color: 'primary' },
      { name: 'Buenos Aires — Recoleta', description: 'Barrio elegante con arquitectura francesa, museos, embajadas y departamentos de alto nivel', link: '/propiedades/recoleta', emoji: '🏛️', color: 'emerald' },
      { name: 'Mendoza', description: 'La capital del vino argentino: fincas, casas con vista a los Andes y enoturismo en auge', link: '/propiedades/mendoza', emoji: '🍷', color: 'amber' },
      { name: 'Bariloche', description: 'San Carlos de Bariloche y Villa La Angostura — propiedades de montaña con lagos y bosques patagónicos', link: '/propiedades/bariloche', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Departamentos', description: 'Desde monoambientes hasta penthouses con terraza en Buenos Aires', link: '/comprar/departamentos', letter: 'D', color: 'primary' },
      { name: 'Casas', description: 'Residencias en barrios cerrados y countries con seguridad y amenities', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en countries, zonas de montaña y desarrollos urbanísticos', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas premium y locales en zonas comerciales de alto tráfico', link: '/comprar/locales-comerciales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Precios Históricos en Dólares para Compradores Extranjeros', text: 'Las operaciones inmobiliarias en {pais} se realizan en dólares estadounidenses. Los extranjeros pueden comprar propiedades con los mismos derechos que los argentinos, sin necesidad de residencia. Solo se requiere un CDI (Clave de Identificación) de la AFIP. Los precios actuales en USD representan una oportunidad histórica de inversión.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona la escritura pública en Argentina?', answer: 'La compraventa se formaliza mediante escritura pública ante un escribano público (notario). El escribano verifica la titularidad del inmueble, los certificados de dominio e inhibición, la situación fiscal y catastral, y otorga la escritura traslativa de dominio. Luego la inscribe en el Registro de la Propiedad Inmueble para que surta efectos frente a terceros.' },
      { question: '¿Qué es el boleto de compraventa?', answer: 'El boleto de compraventa es un contrato preliminar donde comprador y vendedor acuerdan las condiciones de la operación: precio, forma de pago, plazos y fecha de escrituración. Generalmente se paga una seña del 20-30% del valor al firmarlo. Tiene validez legal pero la transferencia definitiva se perfecciona con la escritura pública.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Argentina?', answer: 'Sí, los extranjeros pueden comprar propiedades urbanas en {pais} sin restricciones. Solo necesitan obtener un CDI (Clave de Identificación) ante la AFIP, que se tramita con el pasaporte. Para tierras rurales existe la Ley 26.737 que limita la compra por extranjeros al 15% de las tierras rurales a nivel nacional y provincial.' },
      { question: '¿Qué impuestos se pagan al comprar una propiedad?', answer: 'El comprador paga el Impuesto de Sellos (entre 1.5% y 3.6% según la provincia), honorarios del escribano (entre 1% y 2% más IVA), y gastos de escrituración. El vendedor paga el Impuesto a la Transferencia de Inmuebles (ITI) del 1.5% sobre el precio de venta, o Impuesto a las Ganancias si es habitualista. Presupuesta entre 5% y 8% adicional al precio.' },
      { question: '¿Qué son los créditos hipotecarios UVA?', answer: 'Los créditos UVA (Unidad de Valor Adquisitivo) son préstamos hipotecarios cuyo capital se ajusta por inflación mediante el índice CER. Fueron relanzados en 2024 con plazos hasta 30 años y financiamiento de hasta el 75% del valor de la propiedad. La cuota es baja al inicio pero se actualiza mensualmente. Disponibles en bancos públicos y privados.' },
      { question: '¿Qué es el CEDIN y las operaciones en dólares?', answer: 'El mercado inmobiliario argentino opera históricamente en dólares estadounidenses. Los precios se publican y negocian en USD. Los pagos se realizan mediante transferencia bancaria en dólares, cheques de pago diferido o billetes físicos verificados. Es fundamental que el escribano certifique el origen de los fondos ante la AFIP y la UIF.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Créditos Hipotecarios UVA', description: 'Financiamiento hasta el 75% del valor con cuotas ajustadas por inflación. Conoce los requisitos y bancos que los ofrecen.', link: '/guias/creditos-uva-argentina', icon: 'money' },
      { title: 'Guía de Escrituración', description: 'Boleto de compraventa, escribano público, Registro de la Propiedad: todo el proceso paso a paso para comprar en {pais}.', link: '/guias/escrituracion-argentina', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Cómo obtener el CDI, abrir cuenta bancaria, traer dólares y comprar tu propiedad en Argentina como extranjero.', link: '/guias/extranjeros-comprando-argentina', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra departamentos amueblados, casas, oficinas y locales comerciales en alquiler en las principales ciudades de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar en la capital cultural de Sudamérica' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Palermo', description: 'Palermo Soho, Palermo Hollywood, Palermo Chico — la zona más buscada para alquileres temporarios y permanentes', link: '/propiedades/palermo', emoji: '🌳', color: 'secondary' },
      { name: 'Belgrano', description: 'Barrio residencial, familiar, con parques y excelente transporte público', link: '/propiedades/belgrano', emoji: '🏘️', color: 'emerald' },
      { name: 'Córdoba', description: 'Nueva Córdoba, Cerro de las Rosas, General Paz — la segunda ciudad del país con vida universitaria', link: '/propiedades/cordoba', emoji: '🎓', color: 'amber' },
      { name: 'Puerto Madero', description: 'El barrio más moderno de Buenos Aires: torres de lujo frente al río con amenities premium', link: '/propiedades/puerto-madero', emoji: '🏙️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'DNI o pasaporte', description: 'Documento nacional de identidad para argentinos, pasaporte vigente para extranjeros' },
      { title: 'Garantía propietaria', description: 'Garantía de un propietario en la misma jurisdicción, seguro de caución o garantía bancaria' },
      { title: 'Recibo de sueldo', description: 'Últimos 3 recibos de sueldo o comprobante de ingresos (mínimo 3 veces el valor del alquiler)' },
      { title: 'Depósito inicial', description: 'Un mes de alquiler como depósito de garantía, más el primer mes adelantado' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Alquiler Temporario para Extranjeros y Nómadas Digitales', text: 'Los extranjeros pueden alquilar en {pais} sin restricciones. Buenos Aires es uno de los destinos favoritos de nómadas digitales por su relación calidad-precio. Los alquileres temporarios (menos de 3 meses) se publican en dólares, mientras que los contratos de alquiler tradicional se rigen por la ley de alquileres vigente con actualizaciones semestrales.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Argentina?', answer: 'Necesitas DNI o pasaporte vigente, comprobante de ingresos (mínimo 3 veces el alquiler), y una garantía. La garantía puede ser propietaria (un garante con inmueble en la misma jurisdicción), seguro de caución, aval bancario o fianza. Algunos propietarios también aceptan depósito ampliado para extranjeros.' },
      { question: '¿Cómo funciona la ley de alquileres actual?', answer: 'La normativa vigente establece contratos mínimos de 3 años para vivienda, con ajustes semestrales por el índice ICL (Índice de Contratos de Locación) publicado por el Banco Central. El depósito máximo es de un mes de alquiler y las comisiones inmobiliarias las paga el propietario.' },
      { question: '¿Los alquileres se pagan en pesos o dólares?', answer: 'Los contratos de alquiler tradicional son en pesos argentinos con ajustes semestrales. Los alquileres temporarios (turísticos o de corta estadía) se publican y pagan frecuentemente en dólares. En algunas zonas premium y para expatriados se negocian condiciones mixtas.' },
      { question: '¿Puedo alquilar como extranjero sin DNI argentino?', answer: 'Sí, con pasaporte vigente es suficiente para alquiler temporario. Para contratos a largo plazo, tener DNI de extranjero facilita los trámites pero no es obligatorio. Muchos propietarios aceptan extranjeros con depósito adicional o pago adelantado de varios meses.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde departamentos con vista al Río de la Plata en Puerto Madero hasta cabañas con vista a los lagos en Bariloche, descubre propiedades verificadas en los mejores destinos de {pais}.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Capital Cultural de Sudamérica', description: 'Buenos Aires es cuna del tango, teatros de clase mundial, gastronomía premiada y una vida cultural que rivaliza con las grandes capitales europeas.', icon: 'globe' },
      { title: 'País del Vino y la Patagonia', description: 'Desde los viñedos de Mendoza hasta los glaciares de la Patagonia, {pais} ofrece paisajes únicos y oportunidades de inversión turística.', icon: 'sun' },
      { title: 'Precios Competitivos en USD', description: 'Los precios inmobiliarios en dólares están en niveles históricamente bajos, generando oportunidades únicas para compradores con visión de largo plazo.', icon: 'money' },
      { title: 'Diversidad Geográfica', description: 'De la cosmopolita Buenos Aires a las sierras de Córdoba, la Patagonia andina y las cataratas de Iguazú: un país con todo.', icon: 'chart' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Cada región de {pais} tiene una personalidad única. Encuentra el destino que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Buenos Aires', description: 'La París de Sudamérica. Departamentos en Palermo y Recoleta, torres de lujo en Puerto Madero y barrios con identidad propia como San Telmo y Belgrano.', link: '/propiedades/buenos-aires', emoji: '🏙️' },
      { name: 'Córdoba', description: 'La Docta: segunda ciudad del país, vida universitaria vibrante, sierras a minutos y un mercado inmobiliario en crecimiento sostenido.', link: '/propiedades/cordoba', emoji: '🎓' },
      { name: 'Mendoza', description: 'La tierra del Malbec al pie de los Andes. Fincas, bodegas, propiedades con vistas a la cordillera y un boom del enoturismo que impulsa la plusvalía.', link: '/propiedades/mendoza', emoji: '🍷' },
      { name: 'Bariloche', description: 'La Suiza argentina en el corazón de la Patagonia. Lagos, bosques, esquí en invierno y propiedades de montaña con demanda turística todo el año.', link: '/propiedades/bariloche', emoji: '🏔️' }
    ] }
  ],

  // =============================================
  // MX — México (Spanish)
  // =============================================
  MX: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora departamentos, casas, terrenos y locales comerciales en venta en {pais}. El mercado inmobiliario más grande del mundo hispanohablante, con oportunidades desde la Riviera Maya hasta la Ciudad de México.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en el mayor mercado inmobiliario de habla hispana' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Ciudad de México', description: 'Polanco, Condesa, Roma, Santa Fe — la megaciudad cosmopolita con alta plusvalía y vida cultural intensa', link: '/propiedades/ciudad-de-mexico', emoji: '🏙️', color: 'primary' },
      { name: 'Riviera Maya', description: 'Cancún, Playa del Carmen, Tulum — propiedades frente al Caribe mexicano con altísima demanda turística', link: '/propiedades/riviera-maya', emoji: '🏖️', color: 'emerald' },
      { name: 'Guadalajara', description: 'Zapopan, Providencia, Chapultepec — la Perla Tapatía con boom tecnológico y calidad de vida', link: '/propiedades/guadalajara', emoji: '🌮', color: 'amber' },
      { name: 'Mérida', description: 'Centro Histórico, Montebello, Temozón — la ciudad más segura de México con encanto colonial', link: '/propiedades/merida', emoji: '🏛️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Departamentos', description: 'Desde estudios hasta penthouses en las colonias más exclusivas', link: '/comprar/departamentos', letter: 'D', color: 'primary' },
      { name: 'Casas', description: 'Residencias en fraccionamientos cerrados con seguridad y amenidades', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes residenciales, comerciales y en desarrollos de playa', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas y espacios comerciales en plazas y corredores de alto tráfico', link: '/comprar/locales-comerciales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Fideicomiso Bancario para Extranjeros en Zona Restringida', text: 'Los extranjeros pueden comprar propiedades en todo {pais}. En la zona restringida (50 km de costas y 100 km de fronteras), la compra se realiza a través de un fideicomiso bancario que otorga todos los derechos de uso, goce y disposición. Fuera de la zona restringida, los extranjeros compran directamente ante notario público. El fideicomiso se renueva cada 50 años y es completamente legal y seguro.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es el fideicomiso bancario y cómo funciona?', answer: 'El fideicomiso bancario es el mecanismo legal que permite a extranjeros adquirir propiedades en la zona restringida de {pais} (50 km de costas, 100 km de fronteras). Un banco mexicano actúa como fiduciario y el extranjero es el fideicomisario con plenos derechos de uso, renta, venta y herencia. El fideicomiso tiene una duración de 50 años renovables y cuesta aproximadamente US$500-1,000 anuales de mantenimiento.' },
      { question: '¿Cómo funciona la escrituración ante notario público?', answer: 'En {pais}, toda compraventa de inmuebles debe formalizarse ante notario público, quien es un fedatario investido por el Estado. El notario verifica la titularidad en el Registro Público de la Propiedad, calcula y retiene impuestos (ISR, ISAI), redacta la escritura y gestiona su inscripción registral. Los honorarios notariales rondan entre el 3% y 6% del valor de la operación.' },
      { question: '¿Qué impuestos se pagan al comprar una propiedad en México?', answer: 'El comprador paga el ISAI (Impuesto Sobre Adquisición de Inmuebles) que varía del 2% al 4.5% según el estado. El vendedor paga ISR (Impuesto Sobre la Renta) sobre la ganancia de capital. Adicionalmente están los honorarios notariales (3-6%), gastos registrales y avalúo. Presupuesta entre 6% y 10% adicional al precio.' },
      { question: '¿Pueden los extranjeros obtener crédito hipotecario en México?', answer: 'Sí, varios bancos mexicanos y financieras internacionales ofrecen hipotecas para extranjeros, especialmente los que tienen residencia temporal o permanente. Las tasas rondan entre el 9% y 12% anual en pesos, con plazos de hasta 20 años. También hay opciones de financiamiento directo del desarrollador, especialmente en proyectos de preventa en la Riviera Maya.' },
      { question: '¿Qué es la zona restringida y qué implica?', answer: 'La zona restringida comprende una franja de 50 km desde las costas y 100 km desde las fronteras internacionales de {pais}. Los extranjeros no pueden poseer propiedades directamente en esta zona, pero sí a través de un fideicomiso bancario que les otorga todos los derechos. Destinos como Cancún, Puerto Vallarta, Los Cabos y Playa del Carmen están en zona restringida.' },
      { question: '¿Qué es el Registro Público de la Propiedad?', answer: 'El Registro Público de la Propiedad (RPP) es la institución donde se inscriben los derechos sobre inmuebles en cada estado. Antes de comprar, el notario solicita un certificado de libertad de gravámenes que confirma la titularidad y la ausencia de hipotecas, embargos o litigios. La inscripción en el RPP da seguridad jurídica y publicidad a tu propiedad.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Fideicomiso para Extranjeros', description: 'Entiende cómo funciona el fideicomiso bancario: tu herramienta legal para comprar en costas y fronteras de {pais}.', link: '/guias/fideicomiso-mexico', icon: 'shield' },
      { title: 'INFONAVIT y FOVISSSTE', description: 'Créditos hipotecarios gubernamentales para trabajadores formales. Requisitos, montos y cómo utilizarlos.', link: '/guias/infonavit-fovissste', icon: 'money' },
      { title: 'Guía para Extranjeros', description: 'Proceso completo de compra, fideicomiso, notario, impuestos y residencia para compradores internacionales en {pais}.', link: '/guias/extranjeros-comprando-mexico', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Renta en {pais}', description: 'Encuentra departamentos amueblados, casas, oficinas y locales comerciales en renta en las principales ciudades de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Rentar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar en la economía más dinámica de América Latina' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Ciudad de México', description: 'Roma, Condesa, Polanco, Del Valle, Narvarte — las colonias más buscadas para rentar', link: '/propiedades/ciudad-de-mexico', emoji: '🏙️', color: 'secondary' },
      { name: 'Playa del Carmen', description: 'Playacar, Centro, Quinta Avenida — renta vacacional y residencial en el Caribe', link: '/propiedades/playa-del-carmen', emoji: '🏖️', color: 'emerald' },
      { name: 'Guadalajara', description: 'Providencia, Americana, Chapultepec, Zapopan', link: '/propiedades/guadalajara', emoji: '🌮', color: 'amber' },
      { name: 'San Miguel de Allende', description: 'Centro Histórico, Atascadero, San Antonio — encanto colonial y comunidad de expatriados', link: '/propiedades/san-miguel-de-allende', emoji: '🎨', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación oficial', description: 'INE para mexicanos, pasaporte vigente para extranjeros' },
      { title: 'Comprobante de ingresos', description: 'Recibos de nómina, declaración de impuestos SAT o estados de cuenta (ingresos mínimos de 3x la renta)' },
      { title: 'Aval o fiador', description: 'Un aval con propiedad en la misma entidad federativa, o póliza jurídica de arrendamiento' },
      { title: 'Depósito de seguridad', description: 'Generalmente un mes de renta como depósito, más el primer mes adelantado' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Rentar Sin Restricciones', text: 'No necesitas residencia ni visa especial para rentar en {pais}. Con tu pasaporte vigente y comprobante de ingresos puedes firmar un contrato de arrendamiento. La Ciudad de México y la Riviera Maya son destinos favoritos de nómadas digitales y expatriados por su excelente relación calidad-precio.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para rentar en México?', answer: 'Necesitas identificación oficial (INE o pasaporte), comprobante de ingresos (mínimo 3 veces la renta), y un aval con propiedad escriturada en la misma entidad federativa o una póliza jurídica de arrendamiento. Algunos arrendadores aceptan depósito mayor en lugar de aval para extranjeros.' },
      { question: '¿Qué es la póliza jurídica de arrendamiento?', answer: 'La póliza jurídica es un seguro que sustituye al aval y protege al propietario ante incumplimiento de pago. La empresa aseguradora verifica los ingresos del inquilino y, en caso de impago, cubre las rentas y el proceso legal de desalojo. Cuesta entre 1 y 1.5 meses de renta anuales.' },
      { question: '¿Los gastos de mantenimiento están incluidos en la renta?', answer: 'Generalmente no. El inquilino paga la renta y aparte las cuotas de mantenimiento del condominio, agua, gas, luz e internet. En departamentos amueblados de renta temporal pueden incluirse algunos servicios. Siempre verifica qué incluye el contrato.' },
      { question: '¿Puedo rentar como extranjero en México?', answer: 'Sí, los extranjeros pueden rentar sin restricciones en todo el territorio con su pasaporte vigente. No se requiere visa ni residencia. Muchos arrendadores en zonas de expatriados están familiarizados con inquilinos extranjeros y ofrecen contratos adaptados.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para rentar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde departamentos en Polanco hasta villas frente al Caribe en Tulum, descubre propiedades verificadas en el mayor mercado de habla hispana.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Mayor Mercado Hispano del Mundo', description: '{pais} es el mercado inmobiliario más grande del mundo hispanohablante, con más de 130 millones de habitantes y una clase media en expansión.', icon: 'globe' },
      { title: 'Boom del Nearshoring', description: 'La relocalización de cadenas productivas impulsa zonas como Monterrey, Querétaro y Bajío, generando alta demanda inmobiliaria residencial y comercial.', icon: 'chart' },
      { title: 'Potencia Turística Mundial', description: 'Top 10 global en turismo: la Riviera Maya, Los Cabos, Puerto Vallarta y San Miguel de Allende generan retornos de inversión atractivos en renta vacacional.', icon: 'sun' },
      { title: 'Salud y Costo de Vida Accesibles', description: 'Atención médica de calidad a precios competitivos, gastronomía excepcional y un estilo de vida que atrae a jubilados y nómadas digitales de todo el mundo.', icon: 'money' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Cada rincón de {pais} ofrece una experiencia única. Encuentra el destino que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Ciudad de México', description: 'La megalópolis cosmopolita. Departamentos en Polanco y Condesa, lofts en Roma, penthouses en Santa Fe y una vida cultural que nunca se detiene.', link: '/propiedades/ciudad-de-mexico', emoji: '🏙️' },
      { name: 'Riviera Maya', description: 'Cancún, Playa del Carmen y Tulum. Propiedades frente al Caribe con altísima demanda turística y retornos de inversión en renta vacacional.', link: '/propiedades/riviera-maya', emoji: '🏖️' },
      { name: 'Guadalajara', description: 'La Perla Tapatía y capital tecnológica de {pais}. Providencia, Chapultepec y Zapopan lideran con calidad de vida, gastronomía y un mercado en auge.', link: '/propiedades/guadalajara', emoji: '🌮' },
      { name: 'Mérida', description: 'La ciudad más segura de {pais} con encanto colonial yucateco. Montebello, Temozón y el Centro Histórico ofrecen calidad de vida excepcional y precios competitivos.', link: '/propiedades/merida', emoji: '🏛️' }
    ] }
  ],

  // =============================================
  // CO — Colombia (Spanish)
  // =============================================
  CO: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Descubre apartamentos, casas, lotes y locales comerciales en venta en {pais}. Economía en crecimiento, visa de nómada digital y ciudades con clima primaveral todo el año.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en una de las economías más dinámicas de América Latina' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Bogotá', description: 'Chicó, Usaquén, Chapinero, Rosales — la capital con apartamentos de lujo, zona financiera y vida cultural intensa', link: '/propiedades/bogota', emoji: '🏙️', color: 'primary' },
      { name: 'Medellín', description: 'El Poblado, Laureles, Envigado — la ciudad de la eterna primavera con el mejor clima del mundo', link: '/propiedades/medellin', emoji: '🌺', color: 'emerald' },
      { name: 'Cartagena', description: 'Centro Amurallado, Bocagrande, Castillogrande — la joya colonial frente al mar Caribe', link: '/propiedades/cartagena', emoji: '🏖️', color: 'amber' },
      { name: 'Santa Marta', description: 'El Rodadero, Bello Horizonte, Taganga — donde la Sierra Nevada se encuentra con el Caribe', link: '/propiedades/santa-marta', emoji: '🌴', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses en estratos altos de las principales ciudades', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias en conjuntos cerrados con vigilancia privada y zonas verdes', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Lotes', description: 'Terrenos en zonas de desarrollo urbano, rural y costero', link: '/comprar/lotes', letter: 'L', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas y espacios comerciales en centros empresariales y zonas de alto flujo', link: '/comprar/locales-comerciales', letter: 'O', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Extranjeros Compran con Igualdad de Derechos', text: 'Los extranjeros pueden comprar propiedades en {pais} con los mismos derechos que los colombianos, sin restricciones ni necesidad de residencia. El proceso requiere otorgar escritura pública ante notaría, registrarla en la Oficina de Registro de Instrumentos Públicos y obtener la matrícula inmobiliaria. Es fundamental solicitar el certificado de tradición y libertad antes de comprar.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es el certificado de tradición y libertad?', answer: 'El certificado de tradición y libertad es el documento expedido por la Oficina de Registro de Instrumentos Públicos que contiene el historial completo del inmueble: propietarios anteriores, hipotecas, embargos, afectaciones y limitaciones. Es indispensable revisarlo antes de comprar para verificar que el inmueble esté libre de gravámenes y que el vendedor sea el legítimo propietario.' },
      { question: '¿Cómo funciona la escrituración en Colombia?', answer: 'La compraventa se formaliza mediante escritura pública otorgada ante una notaría. El notario verifica la identidad de las partes, los documentos del inmueble y los pagos de impuestos. Una vez firmada la escritura, se registra en la Oficina de Registro de Instrumentos Públicos (ORIP) y se actualiza la matrícula inmobiliaria a nombre del comprador.' },
      { question: '¿Qué impuestos se pagan al comprar una propiedad?', answer: 'Los principales impuestos son: retención en la fuente (1% del valor de venta, la paga el vendedor), gastos notariales (0.54% para cada parte), registro (1.67% del valor de la escritura), y la contribución al fondo de notariado. Presupuesta entre 3% y 5% adicional al precio de compra para gastos de cierre.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Colombia?', answer: 'Sí, los extranjeros gozan de los mismos derechos que los nacionales para adquirir inmuebles en {pais}. Solo necesitas pasaporte vigente y NIT (Número de Identificación Tributaria) que se obtiene ante la DIAN. No hay restricciones de ningún tipo, ni siquiera en zonas fronterizas o costeras.' },
      { question: '¿Qué es el estrato socioeconómico y cómo afecta la compra?', answer: 'Colombia clasifica las viviendas en estratos del 1 al 6, siendo 6 el más alto. El estrato determina el costo de los servicios públicos (luz, agua, gas): estratos 1-3 tienen subsidio, estrato 4 paga tarifa plena, y estratos 5-6 pagan sobreprecio. Al comprar, el estrato influye directamente en los costos mensuales de servicios.' },
      { question: '¿Cómo funciona el crédito hipotecario para extranjeros?', answer: 'Algunos bancos colombianos como Bancolombia y Davivienda ofrecen créditos hipotecarios a extranjeros con residencia o visa de trabajo. Financian hasta el 70% del valor con plazos de hasta 20 años. Los créditos pueden ser en pesos o en UVR (Unidad de Valor Real, ajustada por inflación). Sin residencia, la compra generalmente es de contado.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Visa de Nómada Digital', description: '{pais} ofrece una visa especial para nómadas digitales con ingresos desde US$3,000 mensuales. Vive y trabaja legalmente hasta 2 años.', link: '/guias/visa-nomada-digital-colombia', icon: 'globe' },
      { title: 'Subsidio Mi Casa Ya', description: 'Programa gubernamental que ofrece subsidio y cobertura de tasa de interés para vivienda de interés social y prioritario.', link: '/guias/mi-casa-ya-colombia', icon: 'money' },
      { title: 'Guía para Extranjeros', description: 'Escrituración, matrícula inmobiliaria, NIT, impuestos y todo lo que necesitas para comprar propiedad en {pais}.', link: '/guias/extranjeros-comprando-colombia', icon: 'shield' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que te guiarán en cada paso del proceso de compra en {pais}.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Arriendo en {pais}', description: 'Encuentra apartamentos amoblados, casas, oficinas y locales comerciales en arriendo en las principales ciudades de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Arrendar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar en la tierra del café y la eterna primavera' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Medellín', description: 'El Poblado, Laureles, Envigado, Sabaneta — clima perfecto y vida de barrio', link: '/propiedades/medellin', emoji: '🌺', color: 'secondary' },
      { name: 'Bogotá', description: 'Chicó, Usaquén, Chapinero Alto, Parque 93', link: '/propiedades/bogota', emoji: '🏙️', color: 'emerald' },
      { name: 'Cartagena', description: 'Centro Amurallado, Getsemaní, Bocagrande', link: '/propiedades/cartagena', emoji: '🏖️', color: 'amber' },
      { name: 'Barranquilla', description: 'Alto Prado, Villa Country, Riomar — la Puerta de Oro de Colombia', link: '/propiedades/barranquilla', emoji: '🎭', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Cédula o pasaporte', description: 'Cédula de ciudadanía colombiana o pasaporte vigente para extranjeros' },
      { title: 'Comprobante de ingresos', description: 'Certificación laboral, extractos bancarios o declaración de renta (ingresos mínimos de 3x el canon)' },
      { title: 'Codeudor o póliza', description: 'Un codeudor con propiedad en la misma ciudad, o póliza de arrendamiento que lo sustituya' },
      { title: 'Depósito anticipado', description: 'Generalmente un mes de canon como depósito, más el primer mes adelantado' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Arriendos Accesibles para Nómadas Digitales', text: 'Los extranjeros pueden arrendar en {pais} sin restricciones con su pasaporte vigente. Medellín y Bogotá son hubs de nómadas digitales con arriendos amoblados desde US$500 mensuales en zonas premium. Los contratos de arrendamiento se rigen por la Ley 820 de 2003 que protege tanto a arrendadores como arrendatarios.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para arrendar en Colombia?', answer: 'Necesitas cédula o pasaporte vigente, comprobante de ingresos (mínimo 3 veces el canon de arrendamiento), y un codeudor con propiedad o una póliza de arrendamiento. Muchas inmobiliarias en zonas de expatriados aceptan extranjeros con depósito adicional o pago adelantado.' },
      { question: '¿Qué es la administración y está incluida en el arriendo?', answer: 'La administración es la cuota mensual del conjunto residencial que cubre vigilancia, aseo de zonas comunes, piscina, gimnasio y mantenimiento. Generalmente NO está incluida en el canon de arriendo. En El Poblado (Medellín) puede oscilar entre COP 200,000 y COP 800,000 mensuales dependiendo del edificio.' },
      { question: '¿Cómo se ajusta el canon de arrendamiento anualmente?', answer: 'Por ley, el canon de arrendamiento de vivienda se puede incrementar máximo el IPC (Índice de Precios al Consumidor) del año anterior. El propietario debe notificar el incremento con al menos 3 meses de anticipación al vencimiento del contrato. Para locales comerciales, el ajuste se pacta libremente.' },
      { question: '¿Puedo arrendar como extranjero sin cédula de extranjería?', answer: 'Sí, con pasaporte vigente es suficiente. La cédula de extranjería facilita algunos trámites pero no es requisito para firmar un contrato de arrendamiento. En ciudades como Medellín, Bogotá y Cartagena hay amplia oferta de arriendos amoblados orientados a extranjeros.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para arrendar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde apartamentos en El Poblado con vista a las montañas hasta propiedades coloniales frente al Caribe en Cartagena, descubre oportunidades en un país con eterna primavera.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Visa de Nómada Digital', description: '{pais} fue pionera en ofrecer visa para nómadas digitales, atrayendo miles de trabajadores remotos a ciudades como Medellín y Bogotá.', icon: 'globe' },
      { title: 'Economía en Crecimiento', description: 'Una de las economías más estables de la región, con inversión extranjera creciente, infraestructura moderna y un sector tecnológico en expansión.', icon: 'chart' },
      { title: 'Eterna Primavera en Medellín', description: 'Clima perfecto todo el año en Medellín (22°C promedio), calidad de vida excepcional y costos accesibles en una ciudad transformada.', icon: 'sun' },
      { title: 'Diversidad que Enamora', description: 'Caribe, Andes, Pacífico, Amazonía y llanos: {pais} ofrece todos los climas y paisajes en un solo país, con cultura rica en cada región.', icon: 'money' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Cada región de {pais} ofrece una experiencia única. Encuentra el destino que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Medellín', description: 'La ciudad de la eterna primavera. El Poblado y Laureles lideran con apartamentos modernos, vida de barrio, coworkings y la mejor comunidad de nómadas digitales.', link: '/propiedades/medellin', emoji: '🌺' },
      { name: 'Bogotá', description: 'La capital cosmopolita a 2,600 metros de altura. Chicó, Usaquén y Chapinero ofrecen desde apartamentos de lujo hasta lofts creativos en la capital cultural de {pais}.', link: '/propiedades/bogota', emoji: '🏙️' },
      { name: 'Cartagena', description: 'La Heroica frente al mar Caribe. Propiedades coloniales en el Centro Amurallado, apartamentos en Bocagrande y un mercado de renta vacacional en auge permanente.', link: '/propiedades/cartagena', emoji: '🏖️' },
      { name: 'Santa Marta', description: 'Donde la Sierra Nevada se encuentra con el Caribe. Playas de ensueño, Parque Tayrona a minutos y un mercado inmobiliario costero con gran potencial de valorización.', link: '/propiedades/santa-marta', emoji: '🌴' }
    ] }
  ],

  // =============================================
  // PA — Panamá (Spanish)
  // =============================================
  PA: [
    // === BUY PAGE ===
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora apartamentos, casas, terrenos y locales comerciales en venta en {pais}. Economía dolarizada, exoneración de impuestos de inmueble hasta por 20 años y sin restricciones para compradores extranjeros.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en el hub financiero y logístico de las Américas' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Ciudad de Panamá — Punta Pacífica', description: 'El Manhattan centroamericano: rascacielos frente al Pacífico, centros financieros y vida de lujo', link: '/propiedades/punta-pacifica', emoji: '🏙️', color: 'primary' },
      { name: 'Ciudad de Panamá — Costa del Este', description: 'Zona residencial premium con centros comerciales, colegios internacionales y parques', link: '/propiedades/costa-del-este', emoji: '🌴', color: 'emerald' },
      { name: 'Bocas del Toro', description: 'Archipiélago caribeño con propiedades sobre el agua, surf y naturaleza tropical intacta', link: '/propiedades/bocas-del-toro', emoji: '🏖️', color: 'amber' },
      { name: 'Boquete', description: 'Tierras altas de Chiriquí: clima fresco, café de clase mundial y comunidad de jubilados expatriados', link: '/propiedades/boquete', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses con vista al skyline y al Canal de Panamá', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residencias en barriadas cerradas con seguridad y áreas verdes', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas de desarrollo, playas y tierras altas', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas en torres corporativas y locales en centros comerciales modernos', link: '/comprar/locales-comerciales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Exoneración de Impuestos de Inmueble hasta por 20 Años', text: 'En {pais}, las propiedades nuevas gozan de exoneración del impuesto de inmueble por períodos de hasta 10 a 20 años dependiendo de la ley vigente al momento de la construcción. Los extranjeros compran con los mismos derechos que los nacionales, sin restricciones. La economía dolarizada elimina riesgo cambiario y las transacciones se registran en el Registro Público de Panamá.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona la exoneración del impuesto de inmueble?', answer: 'Las propiedades nuevas en {pais} pueden beneficiarse de exoneración total del impuesto de inmueble por períodos de 10 a 20 años, según la ley vigente al momento de obtener el permiso de ocupación. Durante este período no se paga impuesto de propiedad. Al vencer, se aplican tasas progresivas del 0.5% al 1% sobre el valor catastral. Este beneficio aplica tanto a nacionales como extranjeros.' },
      { question: '¿Cómo es el proceso de compraventa en Panamá?', answer: 'La compraventa se formaliza mediante escritura pública ante notario. El comprador debe verificar la titulación en el Registro Público de Panamá, confirmar que la propiedad está libre de gravámenes y obtener un certificado de no poseer deudas de servicios públicos. La escritura se inscribe en el Registro Público para perfeccionar la transferencia. Es recomendable contratar un title insurance (seguro de título) para mayor protección.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Panamá?', answer: 'Sí, los extranjeros pueden comprar propiedades en {pais} con exactamente los mismos derechos que los panameños. No hay restricciones de ningún tipo: pueden comprar en la ciudad, la playa, islas o montaña. Solo se necesita el pasaporte vigente. Panamá es uno de los países más amigables del continente para inversión extranjera en bienes raíces.' },
      { question: '¿Cuáles son los costos de cierre al comprar?', answer: 'Los costos incluyen: impuesto de transferencia (2% del valor registrado o de venta, el que sea mayor), honorarios notariales (1-2%), gastos de inscripción en el Registro Público, title insurance opcional, y honorarios legales. Presupuesta entre 4% y 7% adicional al precio de compra.' },
      { question: '¿Cómo funciona el crédito hipotecario para extranjeros?', answer: 'Los bancos panameños ofrecen hipotecas tanto a residentes como a no residentes. Los extranjeros pueden obtener financiamiento de hasta el 70% del valor de la propiedad con plazos de hasta 25-30 años. Las tasas de interés preferenciales aplican a vivienda principal. Al operar en dólares, no hay riesgo cambiario en los pagos del crédito.' },
      { question: '¿Qué es la ley de intereses preferenciales?', answer: 'La Ley de Intereses Preferenciales otorga una reducción en la tasa de interés hipotecario para viviendas con valor de hasta US$180,000. El Estado subsidia parte de la tasa durante los primeros 5 a 10 años del préstamo, reduciendo significativamente la cuota mensual. Este beneficio aplica tanto a panameños como a residentes permanentes.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Exoneración Fiscal', description: 'Entiende las leyes de exoneración del impuesto de inmueble y cómo benefician tu inversión a largo plazo en {pais}.', link: '/guias/exoneracion-fiscal-panama', icon: 'money' },
      { title: 'Visa de Pensionado', description: 'La visa de Pensionado Jubilado ofrece descuentos en servicios, transporte, restaurantes y entretenimiento para jubilados extranjeros.', link: '/guias/visa-pensionado-panama', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Registro Público, title insurance, financiamiento bancario y todo lo que necesitas para comprar propiedad en {pais}.', link: '/guias/extranjeros-comprando-panama', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para invertir en {pais}?', description: 'Conecta con asesores inmobiliarios verificados que conocen el mercado panameño y te guiarán en cada paso.' } },

    // === RENT PAGE ===
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas, oficinas y locales comerciales en alquiler en las principales zonas de {pais}.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar en la economía dolarizada del Canal' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Ciudad de Panamá', description: 'Punta Pacífica, Costa del Este, El Cangrejo, San Francisco', link: '/propiedades/ciudad-de-panama', emoji: '🏙️', color: 'secondary' },
      { name: 'Casco Viejo', description: 'El barrio histórico restaurado con lofts, restaurantes y vida cultural', link: '/propiedades/casco-viejo', emoji: '🏛️', color: 'emerald' },
      { name: 'Clayton', description: 'Antigua base militar convertida en zona residencial arbolada con colegios internacionales', link: '/propiedades/clayton', emoji: '🌳', color: 'amber' },
      { name: 'Coronado', description: 'Playa a 1 hora de la ciudad: comunidades residenciales con campos de golf y club de playa', link: '/propiedades/coronado', emoji: '🏖️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Identificación', description: 'Cédula panameña o pasaporte vigente para extranjeros' },
      { title: 'Comprobante de ingresos', description: 'Carta laboral, estados de cuenta bancarios o declaración de renta' },
      { title: 'Depósito de seguridad', description: 'Generalmente 1-2 meses de alquiler como depósito, más el primer mes adelantado' },
      { title: 'Referencias', description: 'Referencias laborales, personales o del arrendador anterior' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Alquileres en Dólares Sin Riesgo Cambiario', text: 'Todos los alquileres en {pais} se pagan en dólares estadounidenses (USD), la moneda oficial del país. No necesitas residencia ni visa especial para alquilar. La amplia oferta de apartamentos amueblados en zonas como Punta Pacífica y El Cangrejo hace de {pais} un destino ideal para expatriados y nómadas digitales.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar en Panamá?', answer: 'Necesitas cédula panameña o pasaporte vigente, comprobante de ingresos, depósito de seguridad (1-2 meses) y referencias. Para extranjeros sin residencia, algunos arrendadores solicitan depósito adicional o pago de varios meses por adelantado como garantía.' },
      { question: '¿Cuánto cuesta alquilar en Ciudad de Panamá?', answer: 'Los precios varían por zona: Punta Pacífica y Costa del Este desde US$1,200 a US$3,500 para 2 habitaciones. El Cangrejo y San Francisco desde US$800 a US$1,500. Clayton y Albrook desde US$1,000 a US$2,500. Todos los precios en dólares y sin riesgo cambiario.' },
      { question: '¿Los gastos comunes están incluidos en el alquiler?', answer: 'Generalmente no. El inquilino paga el alquiler y por separado los gastos de mantenimiento del edificio, agua, electricidad e internet. En apartamentos amueblados de corta estadía pueden incluirse algunos servicios. Siempre confirma qué cubre el contrato.' },
      { question: '¿Puedo alquilar como extranjero en Panamá?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones con su pasaporte vigente. Panamá es un país altamente cosmopolita donde un gran porcentaje de residentes son extranjeros. Hay amplia oferta de apartamentos amueblados en las principales zonas orientados a expatriados.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar en {pais}?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para vivir o trabajar en dólares y sin complicaciones.' } },

    // === HOME PAGE ===
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario de {pais}. Desde rascacielos frente al Canal hasta casas de playa en Bocas del Toro, descubre propiedades en la economía dolarizada más dinámica de Centroamérica.' } },

    // === GLOBAL (page=null) ===
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Economía Dolarizada', description: '{pais} usa el dólar estadounidense como moneda oficial, eliminando todo riesgo cambiario para inversores extranjeros.', icon: 'money' },
      { title: 'Hub del Canal de Panamá', description: 'El Canal conecta dos océanos y genera una economía de servicios logísticos, financieros y comerciales única en la región.', icon: 'globe' },
      { title: 'Visa de Pensionado', description: 'El programa de visa de Pensionado Jubilado ofrece descuentos del 25-50% en servicios de salud, transporte, entretenimiento, restaurantes y hoteles.', icon: 'sun' },
      { title: 'Ventajas Fiscales', description: 'Exoneración de impuesto de inmueble hasta 20 años, no se gravan ingresos de fuente extranjera y régimen territorial favorable para inversores internacionales.', icon: 'chart' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar en {pais}?', subtitle: 'Desde la moderna Ciudad de Panamá hasta las montañas de Boquete y las islas del Caribe, cada destino ofrece un estilo de vida único.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Ciudad de Panamá', description: 'El skyline más impresionante de Centroamérica. Punta Pacífica, Costa del Este y Casco Viejo ofrecen desde rascacielos modernos hasta lofts coloniales restaurados.', link: '/propiedades/ciudad-de-panama', emoji: '🏙️' },
      { name: 'Bocas del Toro', description: 'Archipiélago paradisíaco en el Caribe panameño. Casas sobre el agua, surf, naturaleza virgen y una comunidad internacional creciente.', link: '/propiedades/bocas-del-toro', emoji: '🏖️' },
      { name: 'Boquete', description: 'Las tierras altas de Chiriquí a 1,200 metros de altura. Clima primaveral eterno, café gourmet, ríos y la comunidad de expatriados jubilados más grande de {pais}.', link: '/propiedades/boquete', emoji: '🏔️' },
      { name: 'Coronado', description: 'La playa favorita de los capitalinos a solo 1 hora de la ciudad. Comunidades residenciales con golf, club de playa y servicios completos para vivir todo el año.', link: '/propiedades/coronado', emoji: '🌊' }
    ] }
  ],

};
