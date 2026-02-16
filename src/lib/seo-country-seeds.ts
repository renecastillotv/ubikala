export interface SeedItem {
  lang: string;
  section: string;
  page: string | null;
  content: any;
}

export const countrySeedData: Record<string, SeedItem[]> = {

  // =====================================================================
  // BR - Brasil (Portuguese)
  // =====================================================================
  BR: [
    // --- Buy page ---
    { lang: 'pt', section: 'hero', page: 'buy', content: { title: 'Imóveis à Venda em {pais}', description: 'Explore nossa seleção de apartamentos, casas, coberturas, terrenos e imóveis comerciais disponíveis para compra em todo o país.' } },
    { lang: 'pt', section: 'guide_header', page: 'buy', content: { title: 'Seu Guia para Comprar Imóveis em {pais}', subtitle: 'Tudo o que você precisa saber para investir no mercado imobiliário' } },
    { lang: 'pt', section: 'popular_zones', page: 'buy', content: [
      { name: 'São Paulo', description: 'Jardins, Vila Mariana, Pinheiros — o maior mercado imobiliário da América Latina', link: '/propiedades/sao-paulo', emoji: '🏙️', color: 'primary' },
      { name: 'Rio de Janeiro', description: 'Leblon, Ipanema, Barra da Tijuca — imóveis com vista para o mar', link: '/propiedades/rio-de-janeiro', emoji: '🏖️', color: 'emerald' },
      { name: 'Florianópolis', description: 'Jurerê, Campeche, Lagoa da Conceição — qualidade de vida e natureza', link: '/propiedades/florianopolis', emoji: '🌴', color: 'amber' },
      { name: 'Brasília', description: 'Asa Sul, Lago Sul, Noroeste — planejamento urbano e valorização constante', link: '/propiedades/brasilia', emoji: '🏛️', color: 'purple' }
    ] },
    { lang: 'pt', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'De studios compactos a apartamentos de alto padrão', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Residências em condomínios fechados com segurança 24h', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Coberturas', description: 'Penthouses com terraço, piscina e vista panorâmica', link: '/comprar/coberturas', letter: 'B', color: 'purple' },
      { name: 'Terrenos', description: 'Lotes para construção residencial ou comercial', link: '/comprar/terrenos', letter: 'T', color: 'amber' }
    ] },
    { lang: 'pt', section: 'info_box', page: 'buy', content: { title: 'Estrangeiros Podem Comprar Imóveis no {pais}', text: 'Estrangeiros podem adquirir imóveis urbanos em {pais} sem restrições. A Lei 5.709/71 limita apenas a compra de imóveis rurais por estrangeiros. Para imóveis urbanos, basta ter CPF ou passaporte. Nossos assessores verificados guiarão você em cada etapa.' } },
    { lang: 'pt', section: 'faqs', page: 'buy', content: [
      { question: 'O que é o ITBI e quanto custa?', answer: 'O ITBI (Imposto sobre Transmissão de Bens Imóveis) é um imposto municipal cobrado na transferência de propriedade. A alíquota varia de 2% a 3% do valor venal do imóvel, dependendo do município. Em São Paulo é 3%, no Rio de Janeiro é 3%. Deve ser pago antes do registro da escritura.' },
      { question: 'Como funciona a escritura pública de compra e venda?', answer: 'A escritura pública é o documento lavrado em cartório de notas que formaliza a transferência do imóvel. Após assinada, deve ser registrada no Cartório de Registro de Imóveis competente para que a propriedade seja efetivamente transferida. Os custos de escritura variam por estado, geralmente entre 2% e 4% do valor do imóvel.' },
      { question: 'Estrangeiros podem financiar imóveis no Brasil?', answer: 'Sim, embora com mais restrições. Alguns bancos como Bradesco e Itaú oferecem financiamento para estrangeiros com visto permanente ou que possuam CPF. As condições incluem entrada mínima de 30-50% e prazo de até 30 anos. Sem residência permanente, a compra geralmente é à vista.' },
      { question: 'O que é a Lei 5.709 sobre compra por estrangeiros?', answer: 'A Lei 5.709/71 regulamenta a aquisição de imóveis rurais por estrangeiros e empresas estrangeiras. Limita a área que pode ser adquirida e exige autorização do INCRA. Para imóveis urbanos, não há restrição — estrangeiros têm os mesmos direitos que brasileiros.' },
      { question: 'Quanto custa a corretagem imobiliária?', answer: 'A comissão padrão de corretagem no Brasil é regulamentada pelo CRECI e varia conforme o tipo de imóvel: 6% para imóveis urbanos e 8% para imóveis rurais. Em lançamentos, a comissão geralmente é paga pela incorporadora. Em imóveis usados, é negociada entre vendedor e corretor.' },
      { question: 'O que é o FGTS e como usar para comprar imóvel?', answer: 'O FGTS (Fundo de Garantia do Tempo de Serviço) pode ser utilizado por trabalhadores brasileiros com carteira assinada para compra do primeiro imóvel residencial de até R$1.500.000. É necessário ter pelo menos 3 anos de trabalho com FGTS. Não se aplica a estrangeiros sem vínculo empregatício formal no Brasil.' }
    ] },
    { lang: 'pt', section: 'educational_cards', page: 'buy', content: [
      { title: 'FGTS para Moradia', description: 'Trabalhador com carteira assinada? Saiba como usar seu FGTS para dar entrada no imóvel próprio.', link: '/guias/fgts-moradia', icon: 'money' },
      { title: 'Financiamento pela Caixa', description: 'A Caixa Econômica Federal oferece as menores taxas do mercado. Entenda os programas Minha Casa Minha Vida e SBPE.', link: '/guias/financiamento-caixa', icon: 'shield' },
      { title: 'Guia para Estrangeiros', description: 'Documentação, CPF, impostos e tudo que um estrangeiro precisa saber para comprar imóvel no Brasil.', link: '/guias/estrangeiros-comprando-brasil', icon: 'globe' }
    ] },
    { lang: 'pt', section: 'cta', page: 'buy', content: { title: 'Pronto para encontrar seu imóvel ideal?', description: 'Nossos assessores verificados vão ajudar você a encontrar a propriedade perfeita em {pais}.' } },

    // --- Rent page ---
    { lang: 'pt', section: 'hero', page: 'rent', content: { title: 'Imóveis para Alugar em {pais}', description: 'Encontre apartamentos mobiliados, casas, salas comerciais e espaços de coworking disponíveis para locação.' } },
    { lang: 'pt', section: 'guide_header', page: 'rent', content: { title: 'Guia para Alugar em {pais}', subtitle: 'Encontre o espaço perfeito para morar ou trabalhar' } },
    { lang: 'pt', section: 'popular_zones', page: 'rent', content: [
      { name: 'São Paulo', description: 'Vila Madalena, Pinheiros, Itaim Bibi, Moema', link: '/propiedades/sao-paulo', emoji: '🏙️', color: 'secondary' },
      { name: 'Rio de Janeiro', description: 'Botafogo, Flamengo, Tijuca, Recreio', link: '/propiedades/rio-de-janeiro', emoji: '🏖️', color: 'emerald' },
      { name: 'Florianópolis', description: 'Centro, Trindade, Ingleses, Campeche', link: '/propiedades/florianopolis', emoji: '🌴', color: 'amber' },
      { name: 'Brasília', description: 'Asa Norte, Sudoeste, Águas Claras', link: '/propiedades/brasilia', emoji: '🏛️', color: 'purple' }
    ] },
    { lang: 'pt', section: 'rental_requirements', page: 'rent', content: [
      { title: 'CPF ou Passaporte', description: 'Documento de identificação válido — brasileiros precisam de CPF, estrangeiros podem usar passaporte' },
      { title: 'Comprovante de Renda', description: 'Contracheque, declaração de imposto de renda ou extrato bancário (renda mínima de 3x o aluguel)' },
      { title: 'Fiador ou Seguro Fiança', description: 'Um fiador com imóvel próprio na mesma cidade, ou contratação de seguro fiança (custo de 1 a 2 aluguéis/ano)' },
      { title: 'Caução', description: 'Alternativa ao fiador: depósito caução de até 3 meses de aluguel, devolvido ao final do contrato' }
    ] },
    { lang: 'pt', section: 'info_box', page: 'rent', content: { title: 'Estrangeiros Podem Alugar Sem Restrições', text: 'Não é necessário ter residência permanente para alugar em {pais}. Com passaporte válido e comprovante de renda, você pode alugar normalmente. A Lei do Inquilinato (Lei 8.245/91) protege igualmente locatários brasileiros e estrangeiros.' } },
    { lang: 'pt', section: 'faqs', page: 'rent', content: [
      { question: 'Quais documentos preciso para alugar um imóvel?', answer: 'Geralmente são necessários: CPF ou passaporte, comprovante de renda (mínimo 3x o valor do aluguel), e uma garantia locatícia — fiador com imóvel, seguro fiança, caução ou título de capitalização.' },
      { question: 'Quanto é o depósito típico para alugar?', answer: 'O caução (depósito) é de até 3 meses de aluguel, conforme a Lei do Inquilinato. Se optar por seguro fiança, o custo anual é de aproximadamente 1 a 2 aluguéis. Muitas imobiliárias também aceitam título de capitalização.' },
      { question: 'O IPTU e condomínio estão incluídos no aluguel?', answer: 'Normalmente não. O inquilino paga o aluguel, IPTU e condomínio separadamente. Em alguns contratos de temporada ou imóveis mobiliados, esses custos podem estar incluídos. Sempre confira o contrato.' },
      { question: 'Posso alugar como estrangeiro sem CPF?', answer: 'Sim, é possível com passaporte. No entanto, ter CPF facilita muito o processo. Estrangeiros podem obter o CPF gratuitamente pela Receita Federal ou em consulados brasileiros no exterior.' }
    ] },
    { lang: 'pt', section: 'cta', page: 'rent', content: { title: 'Procurando um imóvel para alugar?', description: 'Nossos assessores vão ajudar você a encontrar o espaço ideal para morar ou trabalhar em {pais}.' } },

    // --- Home page ---
    { lang: 'pt', section: 'hero', page: 'home', content: { title: 'Imóveis em {pais}', description: 'Bem-vindo à Ubíkala — sua porta de entrada para o mercado imobiliário. De apartamentos na Avenida Paulista a casas de praia em Florianópolis, descubra milhares de imóveis verificados nos destinos mais desejados de {pais}.' } },
    { lang: 'pt', section: 'benefits', page: null, content: [
      { title: 'Maior Mercado da América Latina', description: 'O Brasil possui o mercado imobiliário mais robusto e diversificado da região, com oportunidades em todas as faixas de preço.', icon: 'globe' },
      { title: 'Diversidade Cultural e Geográfica', description: 'De metrópoles cosmopolitas a praias paradisíacas, encontre o estilo de vida que combina com você.', icon: 'chart' },
      { title: 'Praia e Cidade no Mesmo País', description: 'Invista em capitais pulsantes ou em destinos litorâneos com alta demanda turística e de aluguel por temporada.', icon: 'money' },
      { title: 'Economia em Crescimento', description: 'PIB entre os 10 maiores do mundo, mercado de crédito imobiliário em expansão e programas habitacionais do governo.', icon: 'sun' }
    ] },
    { lang: 'pt', section: 'destinations_header', page: null, content: { title: 'Onde Será Seu Próximo Lar?', subtitle: 'Cada região de {pais} tem uma personalidade única. Descubra a que combina com você.' } },
    { lang: 'pt', section: 'destinations', page: null, content: [
      { name: 'São Paulo', description: 'A capital financeira da América Latina. Apartamentos de alto padrão em Jardins, studios em Vila Madalena e oportunidades em bairros em ascensão.', link: '/propiedades/sao-paulo', emoji: '🏙️' },
      { name: 'Rio de Janeiro', description: 'A Cidade Maravilhosa. Imóveis com vista para o mar em Leblon e Ipanema, casas em Santa Teresa e apartamentos na Barra da Tijuca.', link: '/propiedades/rio-de-janeiro', emoji: '🏖️' },
      { name: 'Florianópolis', description: 'A Ilha da Magia. Qualidade de vida excepcional, praias deslumbrantes e um mercado imobiliário em constante valorização.', link: '/propiedades/florianopolis', emoji: '🌴' },
      { name: 'Salvador', description: 'Capital da cultura afro-brasileira. Imóveis no Pelourinho histórico, apartamentos na Barra e casas de praia em Itapuã.', link: '/propiedades/salvador', emoji: '🎭' }
    ] },
  ],

  // =====================================================================
  // CL - Chile (Spanish)
  // =====================================================================
  CL: [
    // --- Buy page ---
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora nuestra selección de departamentos, casas, parcelas y locales comerciales disponibles para compra en todo el país.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Santiago — Las Condes', description: 'El barrio financiero con departamentos de alto estándar y excelente conectividad', link: '/propiedades/las-condes', emoji: '🏙️', color: 'primary' },
      { name: 'Viña del Mar', description: 'La Ciudad Jardín: departamentos frente al mar y casas en cerros con vista al Pacífico', link: '/propiedades/vina-del-mar', emoji: '🌊', color: 'emerald' },
      { name: 'Providencia', description: 'Vida urbana con parques, gastronomía y acceso directo al Metro', link: '/propiedades/providencia', emoji: '🌳', color: 'amber' },
      { name: 'La Serena', description: 'Clima privilegiado, playas extensas y precios accesibles en el norte chico', link: '/propiedades/la-serena', emoji: '☀️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Departamentos', description: 'Desde studios hasta penthouses con vista a la cordillera', link: '/comprar/departamentos', letter: 'D', color: 'primary' },
      { name: 'Casas', description: 'Residencias en condominios y barrios consolidados', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Parcelas', description: 'Terrenos de media hectárea en zonas rurales con potencial', link: '/comprar/parcelas', letter: 'P', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas y locales en zonas de alto tráfico', link: '/comprar/locales-comerciales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Compra Sin Restricciones para Extranjeros', text: 'Los extranjeros pueden comprar propiedades en {pais} con los mismos derechos que los chilenos. No necesitas residencia ni visa especial. Solo tu pasaporte y un RUT (número tributario) que se obtiene en el Servicio de Impuestos Internos.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es el beneficio tributario DFL-2?', answer: 'El DFL-2 es un beneficio tributario que aplica a viviendas de hasta 140 m² construidos. Permite rebajar del impuesto a la renta los intereses del crédito hipotecario, exime del impuesto de herencia y donaciones, y reduce las contribuciones. Es uno de los incentivos más importantes para compradores de primera vivienda en Chile.' },
      { question: '¿Cómo funciona el subsidio habitacional en Chile?', answer: 'El Ministerio de Vivienda ofrece varios subsidios: DS1 para clase media (hasta UF 2.200 de precio), DS49 para sectores vulnerables, y el subsidio para arriendo. El DS1 permite comprar viviendas nuevas o usadas con un monto de subsidio de hasta 500 UF (aprox. US$17.000) según tramo de precio.' },
      { question: '¿Pueden los extranjeros comprar propiedades en Chile?', answer: 'Sí, sin restricciones. Solo necesitas obtener un RUT en el Servicio de Impuestos Internos (SII), que se tramita presencialmente o en línea. Con RUT y pasaporte vigente puedes comprar cualquier tipo de propiedad. El proceso legal es idéntico al de un chileno.' },
      { question: '¿Cuáles son los gastos de notaría y conservador?', answer: 'Los gastos incluyen: estudio de títulos (UF 5-10), escritura pública en notaría (0.1-0.5% del precio), inscripción en el Conservador de Bienes Raíces (0.2% del precio), e impuesto de timbres y estampillas (0.2% si hay crédito hipotecario). En total, presupuesta entre 1.5% y 3% adicional al precio.' },
      { question: '¿Qué son las contribuciones de bienes raíces?', answer: 'Las contribuciones son el impuesto territorial que se paga trimestralmente al municipio. La tasa es de 1.0% a 1.4% del avalúo fiscal anual. Viviendas con avalúo bajo cierto umbral (aprox. UF 800) están exentas. Las viviendas DFL-2 tienen un 50% de rebaja por los primeros 10-15 años según superficie.' },
      { question: '¿Cómo funciona el crédito hipotecario en Chile?', answer: 'Los bancos financian hasta el 80-90% del valor de la propiedad a plazos de 20 a 30 años. Las tasas de interés están en UF (reajustables por inflación) y varían entre 3.5% y 5.5% anual. Se requiere un pie (enganche) mínimo del 10-20% y una relación cuota/ingreso no mayor al 25%.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Subsidio DS1 Clase Media', description: 'Subsidio de hasta 500 UF para compra de vivienda nueva o usada. Conoce los requisitos y cómo postular.', link: '/guias/subsidio-ds1-chile', icon: 'money' },
      { title: 'Beneficio Tributario DFL-2', description: 'Rebaja de impuestos, exención de herencia y menor contribución para viviendas de hasta 140 m².', link: '/guias/dfl2-beneficio-tributario', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Cómo obtener RUT, abrir cuenta bancaria y comprar propiedad en Chile como extranjero.', link: '/guias/extranjeros-comprando-chile', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' } },

    // --- Rent page ---
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Arriendo en {pais}', description: 'Encuentra departamentos amoblados, casas familiares, oficinas y locales comerciales disponibles para arriendo.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Arrendar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Providencia', description: 'Vida urbana, parques, restaurantes y conectividad Metro', link: '/propiedades/providencia', emoji: '🌳', color: 'secondary' },
      { name: 'Ñuñoa', description: 'Barrio residencial con vida de barrio y arriendos accesibles', link: '/propiedades/nunoa', emoji: '🏘️', color: 'emerald' },
      { name: 'Las Condes', description: 'Zona financiera, departamentos modernos y servicios premium', link: '/propiedades/las-condes', emoji: '🏙️', color: 'amber' },
      { name: 'Valparaíso', description: 'Cerros coloridos, bohemia y arriendos con vista al puerto', link: '/propiedades/valparaiso', emoji: '🎨', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Cédula de identidad o pasaporte', description: 'RUT chileno para nacionales, pasaporte vigente para extranjeros' },
      { title: 'Comprobante de renta', description: 'Últimas 3 liquidaciones de sueldo o declaración de impuestos (renta mínima de 3x el arriendo)' },
      { title: 'Aval o mes de garantía', description: 'Un aval con propiedad en la misma región, o pago de un mes de garantía adicional' },
      { title: 'Contrato notarial', description: 'El contrato de arriendo puede firmarse ante notario para mayor seguridad jurídica de ambas partes' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Arrendar Sin Restricciones', text: 'No necesitas residencia ni visa especial para arrendar en {pais}. Con tu pasaporte y comprobante de ingresos puedes firmar un contrato de arriendo. La ley chilena protege por igual a arrendatarios nacionales y extranjeros.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para arrendar?', answer: 'Generalmente necesitas: cédula de identidad o pasaporte, últimas 3 liquidaciones de sueldo o comprobante de ingresos (mínimo 3 veces el arriendo), y un aval con propiedad o un mes de garantía. Algunos arrendadores también solicitan certificado de antecedentes comerciales (DICOM).' },
      { question: '¿Cuánto es el mes de garantía típico?', answer: 'Lo estándar es un mes de garantía más el primer mes de arriendo por adelantado. En departamentos amoblados o de mayor valor puede ser de 2 meses de garantía. La garantía se devuelve al término del contrato si no hay daños.' },
      { question: '¿Los gastos comunes están incluidos en el arriendo?', answer: 'Generalmente no. El arrendatario paga el arriendo y los gastos comunes por separado. Los gastos comunes en edificios incluyen conserje, áreas comunes, mantención y fondo de reserva. Siempre revisa el contrato para confirmar qué incluye.' },
      { question: '¿Puedo arrendar como extranjero sin RUT?', answer: 'Sí, es posible con pasaporte. Sin embargo, tener RUT facilita la verificación y permite domiciliar pagos. El RUT se obtiene gratuitamente en el SII con pasaporte vigente y una dirección en Chile.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para arrendar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // --- Home page ---
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario. Desde departamentos con vista a los Andes hasta casas frente al Pacífico, descubre propiedades verificadas en los mejores destinos de {pais}.' } },
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Economía Más Estable de la Región', description: 'Chile lidera los rankings de estabilidad económica, institucional y crediticia en América Latina.', icon: 'globe' },
      { title: 'Alta Calidad de Vida', description: 'Infraestructura de primer nivel, sistema de salud robusto y los mejores índices educativos de la región.', icon: 'chart' },
      { title: 'Instituciones Sólidas', description: 'Marco legal transparente, protección al inversionista y Conservador de Bienes Raíces confiable.', icon: 'money' },
      { title: 'Naturaleza y Ciudad', description: 'Esquía en la cordillera, surfea en el Pacífico y vive en una capital cosmopolita — todo en un solo país.', icon: 'sun' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar?', subtitle: 'Cada rincón de {pais} tiene algo especial. Encuentra el destino que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Santiago', description: 'La capital moderna y cosmopolita. Departamentos en Las Condes y Providencia, casas en La Reina y Peñalolén, y oportunidades en comunas emergentes.', link: '/propiedades/santiago', emoji: '🏙️' },
      { name: 'Viña del Mar', description: 'La Ciudad Jardín de Chile. Departamentos frente al mar, casas en Reñaca y una calidad de vida excepcional a una hora de Santiago.', link: '/propiedades/vina-del-mar', emoji: '🌊' },
      { name: 'Valparaíso', description: 'Patrimonio de la Humanidad. Cerros coloridos, vida bohemia, universidades y un mercado inmobiliario accesible con carácter único.', link: '/propiedades/valparaiso', emoji: '🎨' },
      { name: 'Puerto Varas', description: 'La puerta al sur de Chile. Casas con vista al lago Llanquihue y al volcán Osorno, naturaleza prístina y turismo creciente.', link: '/propiedades/puerto-varas', emoji: '🏔️' }
    ] },
  ],

  // =====================================================================
  // PE - Perú (Spanish)
  // =====================================================================
  PE: [
    // --- Buy page ---
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora nuestra selección de departamentos, casas, terrenos y locales comerciales disponibles para compra en todo el país.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Miraflores', description: 'El distrito más exclusivo de Lima: departamentos frente al malecón y vida cosmopolita', link: '/propiedades/miraflores', emoji: '🌊', color: 'primary' },
      { name: 'San Isidro', description: 'Centro financiero con parques, embajadas y departamentos de lujo', link: '/propiedades/san-isidro', emoji: '🏙️', color: 'emerald' },
      { name: 'Barranco', description: 'Bohemio y artístico: galerías, restaurantes y propiedades con carácter', link: '/propiedades/barranco', emoji: '🎨', color: 'amber' },
      { name: 'Cusco', description: 'Capital histórica del Imperio Inca con alta demanda turística y de alquiler vacacional', link: '/propiedades/cusco', emoji: '🏛️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Departamentos', description: 'Desde flats compactos hasta dúplex de lujo en zonas residenciales', link: '/comprar/departamentos', letter: 'D', color: 'primary' },
      { name: 'Casas', description: 'Residencias en urbanizaciones con seguridad las 24 horas', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Terrenos', description: 'Lotes en zonas de expansión urbana y playas del sur', link: '/comprar/terrenos', letter: 'T', color: 'purple' },
      { name: 'Locales Comerciales', description: 'Oficinas y tiendas en centros empresariales y comerciales', link: '/comprar/locales-comerciales', letter: 'L', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Extranjeros Pueden Comprar Propiedades en {pais}', text: 'Los extranjeros pueden comprar propiedades en {pais} con los mismos derechos que los peruanos, con una única restricción: no pueden adquirir inmuebles dentro de los 50 km de las fronteras del país, salvo autorización especial. Para zonas urbanas como Lima, Cusco o Arequipa, no hay restricción alguna.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Qué es la alcabala y cuánto se paga?', answer: 'La alcabala es el impuesto de transferencia de propiedad en Perú. Se paga el 3% del valor de venta menos las primeras 10 UIT (Unidad Impositiva Tributaria, aproximadamente S/51.500 en 2024). Es decir, si compras un departamento de US$100,000, solo pagas alcabala sobre la diferencia. Lo paga el comprador.' },
      { question: '¿Cómo funciona la minuta de compraventa?', answer: 'La minuta es el contrato de compraventa redactado por un abogado, que contiene los términos del acuerdo entre comprador y vendedor. Una vez firmada, debe elevarse a escritura pública ante un notario. Luego se inscribe en SUNARP (Registros Públicos) para que la transferencia tenga efecto legal frente a terceros.' },
      { question: '¿Qué es SUNARP y por qué es importante?', answer: 'SUNARP (Superintendencia Nacional de los Registros Públicos) es la entidad donde se registran todas las propiedades del Perú. Es fundamental verificar en SUNARP que el vendedor sea el verdadero propietario, que no existan cargas, hipotecas o embargos sobre el inmueble. La inscripción registral otorga oponibilidad frente a terceros.' },
      { question: '¿Pueden los extranjeros comprar cerca de las fronteras?', answer: 'La Constitución peruana prohíbe que extranjeros adquieran propiedades dentro de los 50 km de las fronteras, salvo autorización por decreto supremo en caso de necesidad pública. Esta restricción no aplica a zonas urbanas como Lima, Cusco, Arequipa o la costa sur. En la práctica, la mayoría de compradores extranjeros no se ven afectados.' },
      { question: '¿Qué es el crédito Mivivienda?', answer: 'El Nuevo Crédito Mivivienda es un programa del Estado peruano que ofrece créditos hipotecarios con tasas preferenciales para viviendas de S/65.200 a S/464.200. Incluye el Bono del Buen Pagador (BBP) de hasta S/23.400 que se descuenta del capital. Está disponible para peruanos y residentes, no para extranjeros sin residencia.' },
      { question: '¿Cuáles son los costos totales de cierre?', answer: 'Los costos aproximados incluyen: alcabala (3% sobre valor menos 10 UIT), gastos notariales (0.5-1%), gastos registrales en SUNARP (0.3-0.5%), honorarios del abogado (0.5-1%), y gastos bancarios si hay crédito. Presupuesta entre 3% y 5% adicional al precio de compra.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Bono Mivivienda', description: 'Crédito hipotecario con tasa preferencial y hasta S/23,400 de bono para vivienda nueva. Conoce los requisitos.', link: '/guias/bono-mivivienda-peru', icon: 'money' },
      { title: 'Programa Techo Propio', description: 'Subsidio del Estado para familias de bajos ingresos: bono de hasta S/42,200 para vivienda nueva.', link: '/guias/techo-propio-peru', icon: 'shield' },
      { title: 'Guía para Extranjeros', description: 'Documentación, restricciones fronterizas, SUNARP y todo lo que un extranjero necesita para comprar en Perú.', link: '/guias/extranjeros-comprando-peru', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' } },

    // --- Rent page ---
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra departamentos amoblados, casas familiares, oficinas y locales comerciales disponibles para alquiler.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Miraflores', description: 'Malecón, parques, restaurantes y vida nocturna', link: '/propiedades/miraflores', emoji: '🌊', color: 'secondary' },
      { name: 'San Borja', description: 'Residencial, familiar, cerca del Museo de la Nación', link: '/propiedades/san-borja', emoji: '🏘️', color: 'emerald' },
      { name: 'Barranco', description: 'Artístico, bohemio, ideal para nómadas digitales', link: '/propiedades/barranco', emoji: '🎨', color: 'amber' },
      { name: 'Arequipa', description: 'La Ciudad Blanca: clima excepcional y costos accesibles', link: '/propiedades/arequipa', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'DNI o pasaporte', description: 'Documento de identidad vigente — peruanos con DNI, extranjeros con pasaporte o carné de extranjería' },
      { title: 'Comprobante de ingresos', description: 'Boletas de pago, recibos por honorarios o estados de cuenta bancarios (ingresos mínimos de 3x el alquiler)' },
      { title: 'Garantía o aval', description: 'Un garante con propiedad inscrita en SUNARP, o adelanto de meses como garantía' },
      { title: 'Depósito de seguridad', description: 'Generalmente 1-2 meses de alquiler, devueltos al finalizar el contrato si no hay daños' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Con tu pasaporte vigente y un comprobante de ingresos puedes firmar un contrato de alquiler. La restricción fronteriza de los 50 km aplica solo a la compra, no al alquiler.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿Qué documentos necesito para alquilar?', answer: 'Generalmente necesitas: DNI o pasaporte vigente, comprobante de ingresos (mínimo 3 veces el alquiler), y un garante o depósito de seguridad de 1-2 meses. Algunos propietarios también solicitan referencias personales o laborales.' },
      { question: '¿Cuánto es el depósito estándar?', answer: 'El depósito estándar es de 1 a 2 meses de alquiler, más el primer mes adelantado. En departamentos amoblados o en distritos premium como Miraflores o San Isidro, puede ser de 2-3 meses. Se devuelve al término del contrato descontando eventuales daños.' },
      { question: '¿Los servicios están incluidos en el alquiler?', answer: 'Generalmente no. El inquilino paga el alquiler y aparte los servicios: agua, luz, gas, internet y mantenimiento del edificio. En algunos departamentos amoblados de corta estadía los servicios pueden estar incluidos. Siempre revisa el contrato.' },
      { question: '¿Puedo alquilar como extranjero sin carné de extranjería?', answer: 'Sí, con pasaporte vigente es suficiente. El carné de extranjería facilita trámites adicionales como abrir cuenta bancaria, pero no es requisito para firmar un contrato de alquiler. Muchos nómadas digitales alquilan en Miraflores y Barranco solo con pasaporte.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // --- Home page ---
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario. Desde departamentos con vista al Pacífico en Miraflores hasta casas coloniales en Cusco, descubre propiedades verificadas en los mejores destinos de {pais}.' } },
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Mercado Digital en Crecimiento', description: 'Perú lidera la transformación digital inmobiliaria en la región andina, con plataformas modernas y procesos cada vez más ágiles.', icon: 'globe' },
      { title: 'Precios Accesibles', description: 'El costo por m² en Lima es significativamente menor que en Santiago o Ciudad de México, con excelente relación calidad-precio.', icon: 'chart' },
      { title: 'Cultura Rica e Histórica', description: 'Desde Machu Picchu hasta la gastronomía reconocida mundialmente, vivir en Perú es una experiencia cultural única.', icon: 'money' },
      { title: 'Estilo de Vida en el Pacífico', description: 'Más de 3,000 km de costa, surf de clase mundial, y clima soleado en Lima durante la mayor parte del año.', icon: 'sun' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar?', subtitle: 'Cada región de {pais} ofrece una experiencia diferente. Encuentra la que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Lima', description: 'La capital gastronómica de América. Departamentos frente al mar en Miraflores, propiedades con carácter en Barranco y oportunidades en distritos emergentes.', link: '/propiedades/lima', emoji: '🏙️' },
      { name: 'Cusco', description: 'Capital histórica del Imperio Inca. Propiedades coloniales en el centro, casas en el Valle Sagrado y un mercado de alquiler turístico en auge.', link: '/propiedades/cusco', emoji: '🏛️' },
      { name: 'Arequipa', description: 'La Ciudad Blanca con su arquitectura de sillar. Clima excepcional 300 días al año, costos accesibles y una calidad de vida envidiable.', link: '/propiedades/arequipa', emoji: '🏔️' },
      { name: 'Piura y Máncora', description: 'Playas del norte peruano con sol eterno. Casas de playa, terrenos frente al mar y el punto de surf más famoso del país.', link: '/propiedades/piura', emoji: '🏖️' }
    ] },
  ],

  // =====================================================================
  // VE - Venezuela (Spanish)
  // =====================================================================
  VE: [
    // --- Buy page ---
    { lang: 'es', section: 'hero', page: 'buy', content: { title: 'Propiedades en Venta en {pais}', description: 'Explora nuestra selección de apartamentos, casas, townhouses, terrenos y locales comerciales disponibles para compra en todo el país.' } },
    { lang: 'es', section: 'guide_header', page: 'buy', content: { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces' } },
    { lang: 'es', section: 'popular_zones', page: 'buy', content: [
      { name: 'Las Mercedes', description: 'Zona gastronómica y de entretenimiento con apartamentos modernos en Caracas', link: '/propiedades/las-mercedes', emoji: '🍽️', color: 'primary' },
      { name: 'Altamira', description: 'Embajadas, centros comerciales y residencias de alto nivel en el este de Caracas', link: '/propiedades/altamira', emoji: '🏙️', color: 'emerald' },
      { name: 'Margarita', description: 'Isla paradisíaca: casas de playa, apartamentos vacacionales y condominios con vista al Caribe', link: '/propiedades/margarita', emoji: '🏖️', color: 'amber' },
      { name: 'El Hatillo', description: 'Pueblo colonial en las montañas de Caracas con quintas, townhouses y ambiente familiar', link: '/propiedades/el-hatillo', emoji: '🏔️', color: 'purple' }
    ] },
    { lang: 'es', section: 'property_types', page: 'buy', content: [
      { name: 'Apartamentos', description: 'Desde estudios hasta penthouses con vista al Ávila', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
      { name: 'Casas', description: 'Quintas y townhouses en urbanizaciones con vigilancia', link: '/comprar/casas', letter: 'C', color: 'emerald' },
      { name: 'Townhouses', description: 'Conjuntos residenciales cerrados con áreas comunes', link: '/comprar/townhouses', letter: 'T', color: 'purple' },
      { name: 'Terrenos', description: 'Parcelas en zonas de desarrollo y playas del litoral', link: '/comprar/terrenos', letter: 'R', color: 'amber' }
    ] },
    { lang: 'es', section: 'info_box', page: 'buy', content: { title: 'Compra de Inmuebles en {pais}', text: 'Los extranjeros pueden comprar propiedades en {pais} sin restricciones. Las transacciones se realizan frecuentemente en dólares estadounidenses. El proceso incluye la redacción del documento de compraventa, su protocolización ante un Registro Inmobiliario y el pago de impuestos correspondientes.' } },
    { lang: 'es', section: 'faqs', page: 'buy', content: [
      { question: '¿Cómo funciona el Registro Inmobiliario en Venezuela?', answer: 'El Registro Inmobiliario (antes Registro Subalterno) es la oficina pública donde se protocolizan los documentos de compraventa. Para que la transferencia sea legal, el documento debe ser redactado por un abogado, revisado por el registrador y protocolizado. Los aranceles registrales varían según el valor del inmueble.' },
      { question: '¿En qué moneda se pagan las propiedades?', answer: 'Aunque la moneda oficial es el bolívar, la mayoría de las transacciones inmobiliarias se realizan en dólares estadounidenses. Los precios se publican en USD y los pagos se hacen mediante transferencia bancaria en divisas, efectivo en dólares o combinaciones. Algunas operaciones también aceptan criptomonedas.' },
      { question: '¿Pueden los extranjeros comprar propiedades?', answer: 'Sí, los extranjeros pueden comprar propiedades en {pais} sin restricciones. Necesitan pasaporte vigente y un RIF (Registro de Información Fiscal) que se obtiene en el SENIAT. El proceso legal es el mismo que para los nacionales. Se recomienda contar con un abogado local de confianza.' },
      { question: '¿Qué impuestos se pagan al comprar?', answer: 'Los principales costos son: aranceles de registro (entre 0.5% y 2% según el estado), honorarios del abogado redactor (1-2%), impuesto municipal (varía por municipio) y estampillas. No existe un impuesto de transferencia inmobiliaria nacional como en otros países, pero cada estado tiene sus aranceles.' },
      { question: '¿Cómo funcionan los condominios en Venezuela?', answer: 'La Ley de Propiedad Horizontal regula los condominios. Los propietarios pagan una cuota de condominio mensual que cubre vigilancia, mantenimiento de áreas comunes, ascensores, piscina y administración. La cuota se calcula según la alícuota (porcentaje de propiedad sobre las áreas comunes) de cada unidad.' },
      { question: '¿Es seguro invertir en bienes raíces en Venezuela?', answer: 'Los bienes raíces representan una de las inversiones más seguras en el contexto venezolano, ya que los precios se manejan en dólares y la propiedad mantiene su valor. El mercado ofrece oportunidades con precios significativamente por debajo de otros países del Caribe. Es fundamental verificar la cadena titulativa y trabajar con profesionales de confianza.' }
    ] },
    { lang: 'es', section: 'educational_cards', page: 'buy', content: [
      { title: 'Inversión en Divisas', description: 'Los precios en dólares y la baja competencia crean oportunidades únicas de inversión inmobiliaria en {pais}.', link: '/guias/inversion-divisas-venezuela', icon: 'money' },
      { title: 'Seguridad Jurídica', description: 'Cómo verificar la cadena titulativa, el registro inmobiliario y proteger tu inversión legalmente.', link: '/guias/seguridad-juridica-venezuela', icon: 'shield' },
      { title: 'Guía para Venezolanos en el Exterior', description: 'Compra desde el extranjero: poder notariado, apostilla, cuentas en divisas y proceso paso a paso.', link: '/guias/venezolanos-exterior-comprando', icon: 'globe' }
    ] },
    { lang: 'es', section: 'cta', page: 'buy', content: { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' } },

    // --- Rent page ---
    { lang: 'es', section: 'hero', page: 'rent', content: { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amoblados, casas, oficinas y locales comerciales disponibles para alquiler en las principales ciudades.' } },
    { lang: 'es', section: 'guide_header', page: 'rent', content: { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar' } },
    { lang: 'es', section: 'popular_zones', page: 'rent', content: [
      { name: 'Altamira', description: 'Centro de Caracas Este: embajadas, restaurantes y transporte Metro', link: '/propiedades/altamira', emoji: '🏙️', color: 'secondary' },
      { name: 'Las Mercedes', description: 'Vida nocturna, gastronomía y apartamentos modernos', link: '/propiedades/las-mercedes', emoji: '🍽️', color: 'emerald' },
      { name: 'Valencia', description: 'Segunda ciudad industrial: alquileres accesibles y zona empresarial', link: '/propiedades/valencia', emoji: '🏭', color: 'amber' },
      { name: 'Margarita', description: 'Alquileres vacacionales y de temporada frente al Caribe', link: '/propiedades/margarita', emoji: '🏖️', color: 'purple' }
    ] },
    { lang: 'es', section: 'rental_requirements', page: 'rent', content: [
      { title: 'Cédula de identidad o pasaporte', description: 'Venezolanos con cédula, extranjeros con pasaporte vigente' },
      { title: 'Comprobante de ingresos', description: 'Constancia de trabajo, estados de cuenta o referencias bancarias en divisas' },
      { title: 'Depósito de seguridad', description: 'Generalmente 1-3 meses de alquiler como garantía, pagadero en dólares' },
      { title: 'Referencias personales', description: 'Carta de referencia de empleador, arrendador anterior o referencia bancaria' }
    ] },
    { lang: 'es', section: 'info_box', page: 'rent', content: { title: 'Alquiler para Extranjeros y Venezolanos en el Exterior', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Los contratos se firman frecuentemente en dólares. Un familiar o contacto local puede actuar como representante. Los alquileres en zonas premium de Caracas y Margarita son significativamente más accesibles que en otros países del Caribe.' } },
    { lang: 'es', section: 'faqs', page: 'rent', content: [
      { question: '¿En qué moneda se pagan los alquileres?', answer: 'La mayoría de los alquileres en zonas premium se pactan y pagan en dólares estadounidenses. Algunos propietarios aceptan transferencias en bolívares al tipo de cambio del día, Zelle, o transferencias bancarias internacionales. Es importante acordar la forma de pago antes de firmar el contrato.' },
      { question: '¿Cuánto es el depósito típico?', answer: 'El depósito estándar es de 1 a 3 meses de alquiler, más el primer mes por adelantado. En apartamentos amoblados de lujo puede ser mayor. El depósito se paga generalmente en dólares y se devuelve al término del contrato si el inmueble está en buenas condiciones.' },
      { question: '¿Los servicios están incluidos en el alquiler?', answer: 'Generalmente no. El inquilino paga el condominio, agua, electricidad, gas e internet por separado. En algunos apartamentos amoblados de alquiler temporal los servicios pueden estar incluidos. Los costos de servicios básicos en Venezuela son relativamente bajos.' },
      { question: '¿Puedo alquilar desde el exterior?', answer: 'Sí, muchos venezolanos en el exterior alquilan propiedades a través de familiares o representantes con poder notariado. También es posible coordinar todo virtualmente con un asesor inmobiliario de confianza que realice las visitas y gestione el contrato en tu nombre.' }
    ] },
    { lang: 'es', section: 'cta', page: 'rent', content: { title: '¿Buscas un lugar para alquilar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti en {pais}.' } },

    // --- Home page ---
    { lang: 'es', section: 'hero', page: 'home', content: { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada al mercado inmobiliario. Desde apartamentos con vista al Ávila hasta casas de playa en Margarita, descubre propiedades verificadas en los mejores destinos de {pais}.' } },
    { lang: 'es', section: 'benefits', page: null, content: [
      { title: 'Baja Competencia, Gran Oportunidad', description: 'Los precios actuales están muy por debajo de su valor histórico, generando oportunidades únicas para inversionistas con visión a largo plazo.', icon: 'globe' },
      { title: 'Potencial de Crecimiento', description: 'A medida que la economía se estabiliza, los bienes raíces son los primeros activos en recuperar valor. Comprar hoy puede significar alta plusvalía mañana.', icon: 'chart' },
      { title: 'Operaciones en Dólares', description: 'El mercado inmobiliario opera en USD, brindando seguridad y transparencia en cada transacción.', icon: 'money' },
      { title: 'Geografía Privilegiada', description: 'Playas caribeñas, montañas andinas, llanos y selva tropical — una diversidad geográfica inigualable en un solo país.', icon: 'sun' }
    ] },
    { lang: 'es', section: 'destinations_header', page: null, content: { title: '¿Dónde Será tu Próximo Hogar?', subtitle: 'Cada rincón de {pais} ofrece una experiencia única. Encuentra el destino que va contigo.' } },
    { lang: 'es', section: 'destinations', page: null, content: [
      { name: 'Caracas', description: 'La capital cosmopolita al pie del Ávila. Apartamentos en Altamira y Las Mercedes, quintas en El Hatillo y un mercado en recuperación.', link: '/propiedades/caracas', emoji: '🏙️' },
      { name: 'Margarita', description: 'La Perla del Caribe. Casas de playa en Pampatar, apartamentos en Porlamar y una isla libre de impuestos con potencial turístico.', link: '/propiedades/margarita', emoji: '🏖️' },
      { name: 'Valencia', description: 'Capital industrial del país. Urbanizaciones familiares, centros comerciales modernos y la mejor relación precio-calidad fuera de Caracas.', link: '/propiedades/valencia', emoji: '🏭' },
      { name: 'Mérida', description: 'La ciudad universitaria en los Andes venezolanos. Clima fresco, montañas imponentes y propiedades accesibles en un entorno natural único.', link: '/propiedades/merida', emoji: '🏔️' }
    ] },
  ],

};
