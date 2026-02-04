// Coordenadas de ubicaciones principales de República Dominicana
// Usado para mostrar mapas cuando la propiedad no tiene coordenadas específicas

export interface LocationCoordinates {
  lat: number;
  lng: number;
  zoom?: number; // Zoom level for the map (higher = more zoomed in)
}

// Provincias
export const provinces: Record<string, LocationCoordinates> = {
  'distrito nacional': { lat: 18.4861, lng: -69.9312, zoom: 12 },
  'santo domingo': { lat: 18.4801, lng: -69.8923, zoom: 11 },
  'santiago': { lat: 19.4517, lng: -70.6970, zoom: 12 },
  'la altagracia': { lat: 18.6167, lng: -68.7000, zoom: 10 },
  'puerto plata': { lat: 19.7934, lng: -70.6884, zoom: 11 },
  'la romana': { lat: 18.4273, lng: -68.9728, zoom: 12 },
  'san pedro de macoris': { lat: 18.4539, lng: -69.3086, zoom: 12 },
  'la vega': { lat: 19.2220, lng: -70.5296, zoom: 12 },
  'samana': { lat: 19.2056, lng: -69.3364, zoom: 11 },
  'espaillat': { lat: 19.6333, lng: -70.2667, zoom: 11 },
  'duarte': { lat: 19.3833, lng: -70.0333, zoom: 11 },
  'monte plata': { lat: 18.8167, lng: -69.7833, zoom: 11 },
  'san cristobal': { lat: 18.4167, lng: -70.1000, zoom: 11 },
  'peravia': { lat: 18.2833, lng: -70.3333, zoom: 11 },
  'azua': { lat: 18.4533, lng: -70.7289, zoom: 11 },
  'barahona': { lat: 18.2000, lng: -71.1000, zoom: 11 },
  'monsenor nouel': { lat: 18.8167, lng: -70.4000, zoom: 11 },
  'maria trinidad sanchez': { lat: 19.3833, lng: -69.8500, zoom: 11 },
  'hato mayor': { lat: 18.7667, lng: -69.2500, zoom: 11 },
  'el seibo': { lat: 18.7667, lng: -69.0333, zoom: 11 },
  'monte cristi': { lat: 19.8500, lng: -71.6500, zoom: 11 },
  'valverde': { lat: 19.5833, lng: -70.9833, zoom: 11 },
  'sanchez ramirez': { lat: 19.0500, lng: -70.1500, zoom: 11 },
  'hermanas mirabal': { lat: 19.3833, lng: -70.3667, zoom: 11 },
};

// Ciudades principales
export const cities: Record<string, LocationCoordinates> = {
  // Distrito Nacional y Gran Santo Domingo
  'santo domingo': { lat: 18.4861, lng: -69.9312, zoom: 13 },
  'santo domingo este': { lat: 18.4879, lng: -69.8568, zoom: 13 },
  'santo domingo norte': { lat: 18.5500, lng: -69.9167, zoom: 13 },
  'santo domingo oeste': { lat: 18.5000, lng: -70.0000, zoom: 13 },
  'los alcarrizos': { lat: 18.5167, lng: -70.0167, zoom: 13 },
  'boca chica': { lat: 18.4500, lng: -69.6167, zoom: 14 },

  // Santiago
  'santiago de los caballeros': { lat: 19.4517, lng: -70.6970, zoom: 13 },
  'santiago': { lat: 19.4517, lng: -70.6970, zoom: 13 },

  // Punta Cana / La Altagracia
  'punta cana': { lat: 18.5601, lng: -68.3725, zoom: 13 },
  'bavaro': { lat: 18.6896, lng: -68.4545, zoom: 14 },
  'higuey': { lat: 18.6167, lng: -68.7000, zoom: 13 },
  'cap cana': { lat: 18.4667, lng: -68.4000, zoom: 14 },
  'uvero alto': { lat: 18.7500, lng: -68.5500, zoom: 14 },

  // Puerto Plata
  'puerto plata': { lat: 19.7934, lng: -70.6884, zoom: 13 },
  'sosua': { lat: 19.7500, lng: -70.5167, zoom: 14 },
  'cabarete': { lat: 19.7500, lng: -70.4167, zoom: 14 },

  // Samaná
  'samana': { lat: 19.2056, lng: -69.3364, zoom: 14 },
  'las terrenas': { lat: 19.3167, lng: -69.5333, zoom: 14 },
  'las galeras': { lat: 19.2833, lng: -69.2500, zoom: 14 },

  // La Romana
  'la romana': { lat: 18.4273, lng: -68.9728, zoom: 13 },
  'casa de campo': { lat: 18.4167, lng: -68.9333, zoom: 14 },
  'bayahibe': { lat: 18.3667, lng: -68.8333, zoom: 14 },

  // San Pedro de Macorís
  'san pedro de macoris': { lat: 18.4539, lng: -69.3086, zoom: 13 },
  'juan dolio': { lat: 18.4333, lng: -69.4333, zoom: 14 },
  'guayacanes': { lat: 18.4500, lng: -69.4833, zoom: 14 },

  // La Vega
  'la vega': { lat: 19.2220, lng: -70.5296, zoom: 13 },
  'jarabacoa': { lat: 19.1167, lng: -70.6333, zoom: 14 },
  'constanza': { lat: 18.9167, lng: -70.7500, zoom: 14 },

  // Otras ciudades importantes
  'san francisco de macoris': { lat: 19.3000, lng: -70.2500, zoom: 13 },
  'moca': { lat: 19.3833, lng: -70.5167, zoom: 13 },
  'bonao': { lat: 18.9333, lng: -70.4000, zoom: 13 },
  'nagua': { lat: 19.3833, lng: -69.8500, zoom: 13 },
  'san cristobal': { lat: 18.4167, lng: -70.1000, zoom: 13 },
  'bani': { lat: 18.2833, lng: -70.3333, zoom: 13 },
  'azua': { lat: 18.4533, lng: -70.7289, zoom: 13 },
  'barahona': { lat: 18.2000, lng: -71.1000, zoom: 13 },
  'hato mayor': { lat: 18.7667, lng: -69.2500, zoom: 13 },
  'el seibo': { lat: 18.7667, lng: -69.0333, zoom: 13 },
  'cotui': { lat: 19.0500, lng: -70.1500, zoom: 13 },
  'salcedo': { lat: 19.3833, lng: -70.4167, zoom: 13 },
};

// Sectores populares (principalmente Santo Domingo y Santiago)
export const sectors: Record<string, LocationCoordinates> = {
  // Santo Domingo - Distrito Nacional
  'piantini': { lat: 18.4700, lng: -69.9350, zoom: 16 },
  'naco': { lat: 18.4650, lng: -69.9280, zoom: 16 },
  'evaristo morales': { lat: 18.4750, lng: -69.9200, zoom: 16 },
  'serralles': { lat: 18.4600, lng: -69.9400, zoom: 16 },
  'bella vista': { lat: 18.4550, lng: -69.9300, zoom: 16 },
  'gazcue': { lat: 18.4650, lng: -69.9100, zoom: 16 },
  'zona colonial': { lat: 18.4722, lng: -69.8850, zoom: 16 },
  'ciudad colonial': { lat: 18.4722, lng: -69.8850, zoom: 16 },
  'la esperilla': { lat: 18.4700, lng: -69.9250, zoom: 16 },
  'paraiso': { lat: 18.4600, lng: -69.9450, zoom: 16 },
  'el vergel': { lat: 18.4600, lng: -69.9500, zoom: 16 },
  'los cacicazgos': { lat: 18.4650, lng: -69.9500, zoom: 16 },
  'mirador norte': { lat: 18.4900, lng: -69.9450, zoom: 16 },
  'mirador sur': { lat: 18.4550, lng: -69.9600, zoom: 16 },
  'arroyo hondo': { lat: 18.4950, lng: -69.9600, zoom: 16 },
  'viejo arroyo hondo': { lat: 18.4950, lng: -69.9550, zoom: 16 },
  'arroyo hondo viejo': { lat: 18.4950, lng: -69.9550, zoom: 16 },
  'los prados': { lat: 18.4750, lng: -69.9400, zoom: 16 },
  'julieta morales': { lat: 18.4800, lng: -69.9200, zoom: 16 },
  'renacimiento': { lat: 18.4800, lng: -69.9300, zoom: 16 },
  'la julia': { lat: 18.4650, lng: -69.9350, zoom: 16 },
  'ensanche naco': { lat: 18.4650, lng: -69.9280, zoom: 16 },
  'ensanche piantini': { lat: 18.4700, lng: -69.9350, zoom: 16 },
  'miraflores': { lat: 18.4500, lng: -69.9200, zoom: 16 },
  'san geronimo': { lat: 18.4600, lng: -69.9150, zoom: 16 },
  'los restauradores': { lat: 18.4750, lng: -69.9100, zoom: 16 },
  'ensanche ozama': { lat: 18.4800, lng: -69.8700, zoom: 16 },
  'villa consuelo': { lat: 18.4900, lng: -69.8850, zoom: 16 },
  'los mina': { lat: 18.4850, lng: -69.8550, zoom: 16 },
  'alma rosa': { lat: 18.5000, lng: -69.8400, zoom: 16 },
  'los tres ojos': { lat: 18.4700, lng: -69.8600, zoom: 16 },

  // Santiago sectores
  'cerros de gurabo': { lat: 19.4600, lng: -70.6800, zoom: 16 },
  'los jardines': { lat: 19.4450, lng: -70.6850, zoom: 16 },
  'jardines metropolitanos': { lat: 19.4550, lng: -70.6900, zoom: 16 },
  'reparto del este': { lat: 19.4400, lng: -70.6750, zoom: 16 },
  'los cerros de gurabo': { lat: 19.4600, lng: -70.6800, zoom: 16 },
  'la trinitaria': { lat: 19.4500, lng: -70.7000, zoom: 16 },
  'bella terra': { lat: 19.4300, lng: -70.6650, zoom: 16 },
  'pontezuela': { lat: 19.4750, lng: -70.6850, zoom: 16 },
  'ciudad satelite': { lat: 19.4350, lng: -70.6550, zoom: 16 },

  // Punta Cana sectores
  'punta cana village': { lat: 18.5601, lng: -68.3725, zoom: 15 },
  'downtown punta cana': { lat: 18.5650, lng: -68.3680, zoom: 15 },
  'bavaro beach': { lat: 18.6850, lng: -68.4450, zoom: 15 },
  'el cortecito': { lat: 18.6750, lng: -68.4300, zoom: 16 },
  'los corales': { lat: 18.6700, lng: -68.4350, zoom: 16 },
  'cocotal': { lat: 18.6600, lng: -68.4100, zoom: 15 },
  'hard rock': { lat: 18.6550, lng: -68.3900, zoom: 15 },
  'vista cana': { lat: 18.5950, lng: -68.4050, zoom: 15 },
  'punta palmera': { lat: 18.5750, lng: -68.3600, zoom: 15 },
  'marina cap cana': { lat: 18.4550, lng: -68.3900, zoom: 15 },
  'juanillo': { lat: 18.4600, lng: -68.3750, zoom: 15 },

  // Puerto Plata sectores
  'playa dorada': { lat: 19.7700, lng: -70.6200, zoom: 15 },
  'costa dorada': { lat: 19.7650, lng: -70.6100, zoom: 15 },
  'centro historico': { lat: 19.7900, lng: -70.6900, zoom: 16 },
  'long beach': { lat: 19.7550, lng: -70.6000, zoom: 15 },

  // Las Terrenas sectores
  'playa bonita': { lat: 19.3100, lng: -69.5200, zoom: 15 },
  'el portillo': { lat: 19.3300, lng: -69.4800, zoom: 15 },
  'coson': { lat: 19.2950, lng: -69.5600, zoom: 15 },
  'punta popy': { lat: 19.3150, lng: -69.5400, zoom: 15 },

  // La Romana / Casa de Campo
  'la estancia': { lat: 18.4200, lng: -68.9400, zoom: 15 },
  'altos de chavon': { lat: 18.4100, lng: -68.9550, zoom: 15 },
  'teeth of the dog': { lat: 18.4050, lng: -68.9250, zoom: 15 },
  'minitas': { lat: 18.4150, lng: -68.9200, zoom: 15 },
};

// Coordenadas por defecto para República Dominicana
export const defaultCoordinates: LocationCoordinates = {
  lat: 18.7357,
  lng: -70.1627,
  zoom: 8
};

/**
 * Obtiene las coordenadas para una ubicación dada
 * Busca primero en sectores, luego ciudades, luego provincias
 */
export function getLocationCoordinates(
  sector?: string | null,
  city?: string | null,
  province?: string | null
): LocationCoordinates {
  // Normalizar strings para búsqueda
  const normalize = (str: string | null | undefined): string =>
    (str || '').toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
      .replace(/['']/g, ''); // Quitar apóstrofes

  // Buscar por sector
  if (sector) {
    const normalizedSector = normalize(sector);
    if (sectors[normalizedSector]) {
      return sectors[normalizedSector];
    }
    // Buscar coincidencia parcial en sectores
    const sectorMatch = Object.keys(sectors).find(key =>
      normalizedSector.includes(key) || key.includes(normalizedSector)
    );
    if (sectorMatch) {
      return sectors[sectorMatch];
    }
  }

  // Buscar por ciudad
  if (city) {
    const normalizedCity = normalize(city);
    if (cities[normalizedCity]) {
      return cities[normalizedCity];
    }
    // Buscar coincidencia parcial en ciudades
    const cityMatch = Object.keys(cities).find(key =>
      normalizedCity.includes(key) || key.includes(normalizedCity)
    );
    if (cityMatch) {
      return cities[cityMatch];
    }
  }

  // Buscar por provincia
  if (province) {
    const normalizedProvince = normalize(province);
    if (provinces[normalizedProvince]) {
      return provinces[normalizedProvince];
    }
    // Buscar coincidencia parcial en provincias
    const provinceMatch = Object.keys(provinces).find(key =>
      normalizedProvince.includes(key) || key.includes(normalizedProvince)
    );
    if (provinceMatch) {
      return provinces[provinceMatch];
    }
  }

  // Retornar coordenadas por defecto de RD
  return defaultCoordinates;
}

/**
 * Verifica si las coordenadas son válidas (no son 0,0 o están vacías)
 */
export function hasValidCoordinates(lat?: number | null, lng?: number | null): boolean {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    return false;
  }
  // Verificar que no sean 0,0 (coordenadas por defecto inválidas)
  if (lat === 0 && lng === 0) {
    return false;
  }
  // Verificar que estén dentro del rango de RD aproximadamente
  // RD está entre lat 17.5 - 20 y lng -72.5 - -68
  return lat >= 17.5 && lat <= 20 && lng >= -72.5 && lng <= -68;
}
