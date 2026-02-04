import type { Property } from './types';
import { agents } from './agents';

export const properties: Property[] = [
  // SANTO DOMINGO - VENTAS
  {
    id: 'prop-001',
    slug: 'apartamento-moderno-piantini-santo-domingo',
    title: 'Apartamento Moderno en Piantini',
    description: 'Espectacular apartamento de 3 habitaciones en el corazón de Piantini. Acabados de primera calidad, cocina moderna con electrodomésticos de acero inoxidable, baños en mármol. Torre con gimnasio, piscina, área social y seguridad 24/7. Ubicación privilegiada cerca de Agora Mall y Blue Mall.',
    type: 'apartment',
    transactionType: 'sale',
    status: 'active',
    price: 285000,
    currency: 'USD',
    pricePerSqm: 1900,
    location: {
      slug: 'piantini-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Piantini',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4655,
      longitude: -69.9312,
      address: 'Calle José Brea Peña',
    },
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    area: 150,
    yearBuilt: 2022,
    floor: 8,
    totalFloors: 12,
    features: ['pool', 'gym', 'security', 'elevator', 'airConditioning', 'balcony', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Sala principal', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Cocina moderna' },
      { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800', alt: 'Habitación principal' },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800', alt: 'Baño en mármol' },
    ],
    agent: agents[0],
    isFeatured: true,
    isExclusive: true,
    isNew: false,
    isPriceReduced: false,
    views: 1250,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'prop-002',
    slug: 'penthouse-con-terraza-naco',
    title: 'Penthouse con Terraza Privada en Naco',
    description: 'Lujoso penthouse de 4 habitaciones con impresionante terraza de 80m² con vista panorámica a la ciudad. Diseño contemporáneo, doble altura en sala, cocina gourmet, cuarto de servicio. Edificio exclusivo con solo 2 unidades por piso.',
    type: 'penthouse',
    transactionType: 'sale',
    status: 'active',
    price: 595000,
    currency: 'USD',
    pricePerSqm: 2125,
    location: {
      slug: 'naco-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Naco',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4678,
      longitude: -69.9285,
    },
    bedrooms: 4,
    bathrooms: 4,
    parkingSpaces: 3,
    area: 280,
    yearBuilt: 2021,
    floor: 15,
    totalFloors: 15,
    features: ['pool', 'gym', 'security', 'elevator', 'airConditioning', 'terrace', 'parking', 'mountainView'],
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', alt: 'Vista terraza', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', alt: 'Sala doble altura' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', alt: 'Cocina gourmet' },
    ],
    agent: agents[0],
    isFeatured: true,
    isExclusive: true,
    isNew: true,
    isPriceReduced: false,
    views: 890,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
  {
    id: 'prop-003',
    slug: 'casa-familiar-arroyo-hondo',
    title: 'Amplia Casa Familiar en Arroyo Hondo',
    description: 'Hermosa casa de 5 habitaciones en residencial cerrado de Arroyo Hondo. Jardín amplio, piscina privada, terraza techada para BBQ. Ideal para familias grandes. Cerca de colegios internacionales y supermercados.',
    type: 'house',
    transactionType: 'sale',
    status: 'active',
    price: 425000,
    currency: 'USD',
    location: {
      slug: 'arroyo-hondo-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Arroyo Hondo',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4901,
      longitude: -69.9456,
    },
    bedrooms: 5,
    bathrooms: 4,
    parkingSpaces: 4,
    area: 350,
    landArea: 600,
    yearBuilt: 2018,
    features: ['pool', 'garden', 'garage', 'security', 'terrace', 'airConditioning', 'petFriendly'],
    images: [
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', alt: 'Fachada principal', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', alt: 'Piscina y jardín' },
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800', alt: 'Sala de estar' },
    ],
    agent: agents[2],
    isFeatured: true,
    isExclusive: false,
    isNew: false,
    isPriceReduced: true,
    previousPrice: 450000,
    views: 2100,
    createdAt: '2023-11-10',
    updatedAt: '2024-01-15',
  },

  // PUNTA CANA
  {
    id: 'prop-004',
    slug: 'villa-lujo-cap-cana-punta-cana',
    title: 'Villa de Lujo en Cap Cana con Vista al Mar',
    description: 'Impresionante villa de 6 habitaciones en la exclusiva comunidad de Cap Cana. Vista directa al mar Caribe, piscina infinity, acceso privado a la playa. Diseño tropical contemporáneo con los más altos estándares de lujo.',
    type: 'villa',
    transactionType: 'sale',
    status: 'active',
    price: 2850000,
    currency: 'USD',
    location: {
      slug: 'cap-cana-punta-cana',
      city: 'Punta Cana',
      sector: 'Cap Cana',
      province: 'La Altagracia',
      country: 'República Dominicana',
      latitude: 18.4502,
      longitude: -68.3689,
    },
    bedrooms: 6,
    bathrooms: 7,
    parkingSpaces: 4,
    area: 650,
    landArea: 1200,
    yearBuilt: 2023,
    features: ['pool', 'garden', 'garage', 'security', 'oceanView', 'terrace', 'airConditioning', 'gym'],
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', alt: 'Villa vista mar', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', alt: 'Piscina infinity' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', alt: 'Interior de lujo' },
    ],
    agent: agents[3],
    isFeatured: true,
    isExclusive: true,
    isNew: true,
    isPriceReduced: false,
    views: 3400,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 'prop-005',
    slug: 'apartamento-playa-bavaro',
    title: 'Apartamento a Pasos de la Playa en Bávaro',
    description: 'Moderno apartamento de 2 habitaciones a solo 200 metros de la playa de Bávaro. Completamente amueblado, ideal para inversión con excelente retorno por alquiler turístico. Complejo con piscina, restaurante y seguridad.',
    type: 'apartment',
    transactionType: 'sale',
    status: 'active',
    price: 189000,
    currency: 'USD',
    location: {
      slug: 'bavaro-punta-cana',
      city: 'Bávaro',
      sector: 'El Cortecito',
      province: 'La Altagracia',
      country: 'República Dominicana',
      latitude: 18.6876,
      longitude: -68.4371,
    },
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    area: 95,
    yearBuilt: 2022,
    floor: 3,
    totalFloors: 5,
    features: ['pool', 'security', 'furnished', 'airConditioning', 'balcony', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Sala con vista', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800', alt: 'Habitación' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Área de piscina' },
    ],
    agent: agents[3],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 1800,
    createdAt: '2023-12-01',
    updatedAt: '2024-01-05',
  },
  {
    id: 'prop-006',
    slug: 'terreno-cocotal-punta-cana',
    title: 'Terreno Premium en Cocotal Golf & Country Club',
    description: 'Lote de 1,500 m² en la prestigiosa comunidad de Cocotal con vista al campo de golf. Ubicación perfecta para construir la villa de sus sueños. Servicios subterráneos, acceso a club house, playa y todas las amenidades.',
    type: 'land',
    transactionType: 'sale',
    status: 'active',
    price: 325000,
    currency: 'USD',
    location: {
      slug: 'cocotal-punta-cana',
      city: 'Punta Cana',
      sector: 'Cocotal',
      province: 'La Altagracia',
      country: 'República Dominicana',
      latitude: 18.5234,
      longitude: -68.3912,
    },
    area: 1500,
    landArea: 1500,
    features: ['security', 'garden'],
    images: [
      { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', alt: 'Vista del terreno', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1587260758562-d96f1a37c4e9?w=800', alt: 'Campo de golf' },
    ],
    agent: agents[3],
    isFeatured: true,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 950,
    createdAt: '2023-10-20',
    updatedAt: '2024-01-02',
  },

  // SANTIAGO
  {
    id: 'prop-007',
    slug: 'apartamento-centrico-santiago',
    title: 'Apartamento Céntrico en Santiago',
    description: 'Cómodo apartamento de 3 habitaciones en el centro de Santiago de los Caballeros. Cerca de todo: supermercados, bancos, restaurantes. Edificio con ascensor y seguridad. Ideal para ejecutivos o familias.',
    type: 'apartment',
    transactionType: 'sale',
    status: 'active',
    price: 125000,
    currency: 'USD',
    location: {
      slug: 'centro-santiago',
      city: 'Santiago',
      sector: 'Centro',
      province: 'Santiago',
      country: 'República Dominicana',
      latitude: 19.4517,
      longitude: -70.6970,
    },
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 1,
    area: 120,
    yearBuilt: 2019,
    floor: 5,
    totalFloors: 8,
    features: ['security', 'elevator', 'airConditioning', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', alt: 'Sala', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800', alt: 'Cocina' },
    ],
    agent: agents[5],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 620,
    createdAt: '2023-11-25',
    updatedAt: '2024-01-08',
  },
  {
    id: 'prop-008',
    slug: 'nave-industrial-santiago',
    title: 'Nave Industrial en Zona Franca Santiago',
    description: 'Amplia nave industrial de 2,500 m² en la zona franca de Santiago. Techos altos, muelles de carga, oficinas administrativas, estacionamiento amplio. Ideal para manufactura o distribución.',
    type: 'warehouse',
    transactionType: 'sale',
    status: 'active',
    price: 850000,
    currency: 'USD',
    location: {
      slug: 'zona-franca-santiago',
      city: 'Santiago',
      sector: 'Zona Franca',
      province: 'Santiago',
      country: 'República Dominicana',
      latitude: 19.4234,
      longitude: -70.6456,
    },
    area: 2500,
    landArea: 4000,
    yearBuilt: 2015,
    features: ['security', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', alt: 'Nave industrial', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Interior nave' },
    ],
    agent: agents[5],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 340,
    createdAt: '2023-09-15',
    updatedAt: '2023-12-20',
  },

  // LAS TERRENAS
  {
    id: 'prop-009',
    slug: 'villa-playa-las-terrenas',
    title: 'Villa Frente al Mar en Las Terrenas',
    description: 'Espectacular villa de 4 habitaciones con acceso directo a la playa. Arquitectura tropical, techos de madera, amplias terrazas. Piscina privada con vista al océano. El sueño caribeño hecho realidad.',
    type: 'villa',
    transactionType: 'sale',
    status: 'active',
    price: 895000,
    currency: 'USD',
    location: {
      slug: 'playa-bonita-las-terrenas',
      city: 'Las Terrenas',
      sector: 'Playa Bonita',
      province: 'Samaná',
      country: 'República Dominicana',
      latitude: 19.3089,
      longitude: -69.5234,
    },
    bedrooms: 4,
    bathrooms: 4,
    parkingSpaces: 2,
    area: 320,
    landArea: 800,
    yearBuilt: 2020,
    features: ['pool', 'garden', 'oceanView', 'terrace', 'airConditioning', 'furnished'],
    images: [
      { url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', alt: 'Villa frente al mar', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', alt: 'Piscina' },
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Terraza' },
    ],
    agent: agents[4],
    isFeatured: true,
    isExclusive: true,
    isNew: false,
    isPriceReduced: false,
    views: 2800,
    createdAt: '2023-08-20',
    updatedAt: '2024-01-12',
  },

  // PUERTO PLATA / SOSUA / CABARETE
  {
    id: 'prop-010',
    slug: 'condo-vista-mar-sosua',
    title: 'Condominio con Vista al Mar en Sosúa',
    description: 'Hermoso condominio de 2 habitaciones con impresionante vista al océano Atlántico. Complejo con piscina, seguridad 24/7, a minutos de la playa de Sosúa. Perfecto para vivir o como inversión de alquiler.',
    type: 'apartment',
    transactionType: 'sale',
    status: 'active',
    price: 165000,
    currency: 'USD',
    location: {
      slug: 'sosua-puerto-plata',
      city: 'Sosúa',
      sector: 'El Batey',
      province: 'Puerto Plata',
      country: 'República Dominicana',
      latitude: 19.7512,
      longitude: -70.5167,
    },
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    area: 110,
    yearBuilt: 2021,
    floor: 4,
    totalFloors: 6,
    features: ['pool', 'security', 'oceanView', 'balcony', 'airConditioning', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', alt: 'Vista al mar', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Sala' },
    ],
    agent: agents[1],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 980,
    createdAt: '2023-10-05',
    updatedAt: '2024-01-03',
  },
  {
    id: 'prop-011',
    slug: 'casa-playa-cabarete',
    title: 'Casa de Playa en Cabarete',
    description: 'Acogedora casa de 3 habitaciones a pasos de la famosa playa de Cabarete. Ideal para amantes del kitesurf y deportes acuáticos. Jardín tropical, terraza con BBQ, completamente amueblada.',
    type: 'house',
    transactionType: 'sale',
    status: 'active',
    price: 295000,
    currency: 'USD',
    location: {
      slug: 'cabarete-puerto-plata',
      city: 'Cabarete',
      sector: 'Kite Beach',
      province: 'Puerto Plata',
      country: 'República Dominicana',
      latitude: 19.7589,
      longitude: -70.4234,
    },
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    area: 180,
    landArea: 400,
    yearBuilt: 2018,
    features: ['garden', 'terrace', 'furnished', 'airConditioning', 'petFriendly'],
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', alt: 'Casa de playa', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', alt: 'Jardín' },
    ],
    agent: agents[1],
    isFeatured: true,
    isExclusive: false,
    isNew: false,
    isPriceReduced: true,
    previousPrice: 325000,
    views: 1450,
    createdAt: '2023-07-15',
    updatedAt: '2024-01-10',
  },

  // JARABACOA
  {
    id: 'prop-012',
    slug: 'finca-montana-jarabacoa',
    title: 'Finca con Casa de Campo en Jarabacoa',
    description: 'Encantadora finca de 15 tareas con casa de 4 habitaciones en las montañas de Jarabacoa. Clima fresco todo el año, río privado, árboles frutales, establo. El escape perfecto de la ciudad.',
    type: 'house',
    transactionType: 'sale',
    status: 'active',
    price: 380000,
    currency: 'USD',
    location: {
      slug: 'jarabacoa-la-vega',
      city: 'Jarabacoa',
      sector: 'La Confluencia',
      province: 'La Vega',
      country: 'República Dominicana',
      latitude: 19.1198,
      longitude: -70.6367,
    },
    bedrooms: 4,
    bathrooms: 3,
    parkingSpaces: 3,
    area: 280,
    landArea: 9420,
    yearBuilt: 2016,
    features: ['garden', 'mountainView', 'terrace', 'petFriendly'],
    images: [
      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', alt: 'Finca en montaña', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800', alt: 'Vista montañas' },
    ],
    agent: agents[2],
    isFeatured: true,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 1670,
    createdAt: '2023-06-20',
    updatedAt: '2024-01-08',
  },

  // ALQUILERES
  {
    id: 'prop-013',
    slug: 'apartamento-alquiler-piantini',
    title: 'Apartamento Amueblado en Alquiler - Piantini',
    description: 'Elegante apartamento de 2 habitaciones completamente amueblado para alquiler. Ubicación premium en Piantini, cerca de embajadas y centros comerciales. Incluye internet, cable, agua y mantenimiento.',
    type: 'apartment',
    transactionType: 'rent',
    status: 'active',
    price: 1800,
    currency: 'USD',
    location: {
      slug: 'piantini-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Piantini',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4655,
      longitude: -69.9312,
    },
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    area: 100,
    yearBuilt: 2020,
    floor: 6,
    totalFloors: 10,
    features: ['pool', 'gym', 'security', 'elevator', 'airConditioning', 'furnished', 'balcony', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Sala amueblada', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800', alt: 'Habitación' },
    ],
    agent: agents[0],
    isFeatured: true,
    isExclusive: false,
    isNew: true,
    isPriceReduced: false,
    views: 890,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 'prop-014',
    slug: 'oficina-alquiler-torre-empresarial',
    title: 'Oficina Ejecutiva en Torre Empresarial',
    description: 'Oficina de 150 m² en prestigiosa torre empresarial de Santo Domingo. Incluye recepción, 4 oficinas privadas, sala de reuniones, baños. Servicios incluidos: seguridad, limpieza áreas comunes, generador.',
    type: 'office',
    transactionType: 'rent',
    status: 'active',
    price: 3500,
    currency: 'USD',
    location: {
      slug: 'bella-vista-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Bella Vista',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4612,
      longitude: -69.9234,
    },
    area: 150,
    yearBuilt: 2019,
    floor: 12,
    totalFloors: 20,
    features: ['security', 'elevator', 'airConditioning', 'parking'],
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', alt: 'Oficina ejecutiva', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', alt: 'Sala de reuniones' },
    ],
    agent: agents[3],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 450,
    createdAt: '2023-12-10',
    updatedAt: '2024-01-05',
  },
  {
    id: 'prop-015',
    slug: 'villa-alquiler-vacacional-bavaro',
    title: 'Villa de Lujo para Alquiler Vacacional en Bávaro',
    description: 'Espectacular villa de 5 habitaciones disponible para alquileres vacacionales. Piscina privada, jacuzzi, chef opcional, servicio de limpieza diario. A 5 minutos de la playa. Capacidad hasta 12 personas.',
    type: 'villa',
    transactionType: 'rent',
    status: 'active',
    price: 850,
    currency: 'USD',
    location: {
      slug: 'bavaro-punta-cana',
      city: 'Bávaro',
      sector: 'Cocotal',
      province: 'La Altagracia',
      country: 'República Dominicana',
      latitude: 18.6876,
      longitude: -68.4371,
    },
    bedrooms: 5,
    bathrooms: 5,
    parkingSpaces: 3,
    area: 400,
    landArea: 1000,
    yearBuilt: 2022,
    features: ['pool', 'garden', 'security', 'terrace', 'airConditioning', 'furnished', 'petFriendly'],
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', alt: 'Villa de lujo', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Piscina' },
    ],
    agent: agents[3],
    isFeatured: true,
    isExclusive: true,
    isNew: false,
    isPriceReduced: false,
    views: 2100,
    createdAt: '2023-11-01',
    updatedAt: '2024-01-12',
  },
  {
    id: 'prop-016',
    slug: 'local-comercial-zona-colonial',
    title: 'Local Comercial en Zona Colonial',
    description: 'Excelente local comercial de 200 m² en el corazón de la Zona Colonial. Ideal para restaurante, tienda o galería. Alto tráfico peatonal, fachada histórica restaurada. Una oportunidad única.',
    type: 'commercial',
    transactionType: 'rent',
    status: 'active',
    price: 4500,
    currency: 'USD',
    location: {
      slug: 'zona-colonial-santo-domingo',
      city: 'Santo Domingo',
      sector: 'Zona Colonial',
      province: 'Distrito Nacional',
      country: 'República Dominicana',
      latitude: 18.4736,
      longitude: -69.8877,
    },
    area: 200,
    yearBuilt: 1920,
    features: ['security'],
    images: [
      { url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800', alt: 'Local comercial', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', alt: 'Interior' },
    ],
    agent: agents[3],
    isFeatured: false,
    isExclusive: false,
    isNew: false,
    isPriceReduced: false,
    views: 780,
    createdAt: '2023-10-15',
    updatedAt: '2024-01-02',
  },
];

// Funciones de utilidad
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export function getFeaturedProperties(limit: number = 6): Property[] {
  return properties
    .filter(p => p.isFeatured && p.status === 'active')
    .slice(0, limit);
}

export function getPropertiesByType(type: string): Property[] {
  if (type === 'all') return properties.filter(p => p.status === 'active');
  return properties.filter(p => p.type === type && p.status === 'active');
}

export function getPropertiesByTransaction(transactionType: 'sale' | 'rent'): Property[] {
  return properties.filter(p => p.transactionType === transactionType && p.status === 'active');
}

export function getPropertiesByLocation(locationSlug: string): Property[] {
  return properties.filter(p =>
    p.location.slug.includes(locationSlug) ||
    p.location.city.toLowerCase().replace(/\s+/g, '-') === locationSlug ||
    p.status === 'active'
  );
}

export function searchProperties(filters: {
  query?: string;
  transactionType?: 'sale' | 'rent' | 'all';
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}): Property[] {
  return properties.filter(p => {
    if (p.status !== 'active') return false;

    if (filters.transactionType && filters.transactionType !== 'all' && p.transactionType !== filters.transactionType) {
      return false;
    }

    if (filters.propertyType && filters.propertyType !== 'all' && p.type !== filters.propertyType) {
      return false;
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      if (!p.location.city.toLowerCase().includes(loc) &&
          !p.location.sector.toLowerCase().includes(loc) &&
          !p.location.province.toLowerCase().includes(loc)) {
        return false;
      }
    }

    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.bedrooms && p.bedrooms && p.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms && p.bathrooms && p.bathrooms < filters.bathrooms) return false;

    if (filters.query) {
      const q = filters.query.toLowerCase();
      return p.title.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             p.location.city.toLowerCase().includes(q) ||
             p.location.sector.toLowerCase().includes(q);
    }

    return true;
  });
}

export function getNewProperties(limit: number = 6): Property[] {
  return properties
    .filter(p => p.isNew && p.status === 'active')
    .slice(0, limit);
}

export function getReducedPriceProperties(limit: number = 6): Property[] {
  return properties
    .filter(p => p.isPriceReduced && p.status === 'active')
    .slice(0, limit);
}

export function getSimilarProperties(property: Property, limit: number = 4): Property[] {
  return properties
    .filter(p =>
      p.id !== property.id &&
      p.status === 'active' &&
      (p.type === property.type || p.location.city === property.location.city)
    )
    .slice(0, limit);
}
