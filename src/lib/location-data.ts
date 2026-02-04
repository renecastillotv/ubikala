// Datos jerárquicos de ubicaciones de República Dominicana
// Usado para dropdowns en cascada: Provincia -> Ciudad -> Sector

export interface Sector {
  name: string;
}

export interface City {
  name: string;
  sectors: string[];
}

export interface Province {
  name: string;
  cities: City[];
}

export interface LocationData {
  country: string;
  provinces: Province[];
}

export const locationData: LocationData = {
  country: "República Dominicana",
  provinces: [
    {
      name: "Distrito Nacional",
      cities: [
        {
          name: "Santo Domingo",
          sectors: [
            "Piantini", "Naco", "Evaristo Morales", "Serralles", "Bella Vista",
            "Gazcue", "Zona Colonial", "La Esperilla", "Paraiso", "El Vergel",
            "Los Cacicazgos", "Mirador Norte", "Mirador Sur", "Arroyo Hondo",
            "Los Prados", "Julieta Morales", "Renacimiento", "La Julia",
            "Miraflores", "San Geronimo", "Los Restauradores", "Ensanche Ozama",
            "Villa Consuelo", "Ciudad Nueva", "La Agustina", "Mejoramiento Social",
            "Ensanche Quisqueya", "Ensanche Luperon", "Cristo Rey", "Gualey",
            "Los Mameyes", "27 de Febrero", "Honduras", "San Carlos", "Villa Juana",
            "Villa Francisca", "San Miguel", "San Juan Bosco"
          ]
        }
      ]
    },
    {
      name: "Santo Domingo",
      cities: [
        {
          name: "Santo Domingo Este",
          sectors: [
            "Los Mina", "Alma Rosa", "Villa Faro", "Isabelita", "Los Trinitarios",
            "Los Tres Brazos", "Mendoza", "Charles de Gaulle", "Las Americas",
            "San Isidro", "Invivienda", "Los Frailes", "Villa Duarte", "La Barquita",
            "Cancino", "El Tamarindo", "Los Mameyes", "Ensanche Ozama"
          ]
        },
        {
          name: "Santo Domingo Norte",
          sectors: [
            "Villa Mella", "Sabana Perdida", "Los Guaricanos", "La Victoria",
            "Guaricano", "Charles de Gaulle", "Proyecto Nacional", "La Javilla",
            "Las Palomas", "San Felipe", "El Café", "Los Brazos"
          ]
        },
        {
          name: "Santo Domingo Oeste",
          sectors: [
            "Herrera", "Los Alcarrizos", "Manoguayabo", "Engombe", "Hato Nuevo",
            "La Guayiga", "El Higüero", "Pantoja", "Los Rios", "Cerros de Arroyo Hondo"
          ]
        },
        {
          name: "Boca Chica",
          sectors: [
            "Boca Chica Centro", "Andres", "La Caleta", "El Aeropuerto"
          ]
        }
      ]
    },
    {
      name: "Santiago",
      cities: [
        {
          name: "Santiago de los Caballeros",
          sectors: [
            "Cerros de Gurabo", "Los Jardines", "Jardines Metropolitanos",
            "Reparto del Este", "La Trinitaria", "Bella Terra", "Pontezuela",
            "Ciudad Satelite", "Los Salados", "Arroyo Hondo", "Pekín",
            "Ensanche Bermúdez", "Centro de la Ciudad", "La Joya", "Buenos Aires",
            "Pueblo Nuevo", "Gurabo", "Los Pepines", "La Back", "Cienfuegos",
            "Hoya del Caimito", "El Ejido", "Las Colinas"
          ]
        },
        {
          name: "Tamboril",
          sectors: ["Tamboril Centro", "Los Cocos", "Canca"]
        },
        {
          name: "Licey al Medio",
          sectors: ["Licey Centro", "Palmar Arriba"]
        },
        {
          name: "Villa Gonzalez",
          sectors: ["Villa Gonzalez Centro", "El Limonal"]
        }
      ]
    },
    {
      name: "La Altagracia",
      cities: [
        {
          name: "Punta Cana",
          sectors: [
            "Punta Cana Village", "Downtown Punta Cana", "Cap Cana",
            "Marina Cap Cana", "Juanillo", "Punta Palmera", "Vista Cana"
          ]
        },
        {
          name: "Bavaro",
          sectors: [
            "Bavaro Beach", "El Cortecito", "Los Corales", "Cocotal",
            "Hard Rock", "Arena Gorda", "Cabeza de Toro"
          ]
        },
        {
          name: "Higuey",
          sectors: [
            "Higuey Centro", "Verón", "La Otra Banda", "San Rafael del Yuma"
          ]
        },
        {
          name: "Uvero Alto",
          sectors: ["Uvero Alto Beach", "Arena Blanca"]
        }
      ]
    },
    {
      name: "Puerto Plata",
      cities: [
        {
          name: "Puerto Plata",
          sectors: [
            "Playa Dorada", "Costa Dorada", "Centro Historico", "Long Beach",
            "Costambar", "Maimón", "Cofresí", "El Cupey"
          ]
        },
        {
          name: "Sosua",
          sectors: [
            "Sosua Centro", "El Batey", "Los Charamicos", "Sosua Abajo",
            "La Mulata", "Cabarete Road"
          ]
        },
        {
          name: "Cabarete",
          sectors: [
            "Cabarete Centro", "Kite Beach", "Encuentro", "Perla Marina",
            "Ocean Village", "Callejon de la Loma"
          ]
        }
      ]
    },
    {
      name: "Samana",
      cities: [
        {
          name: "Samana",
          sectors: [
            "Samana Centro", "Cayo Levantado", "El Limon", "Arroyo Barril"
          ]
        },
        {
          name: "Las Terrenas",
          sectors: [
            "Playa Bonita", "El Portillo", "Coson", "Punta Popy", "Ballenas",
            "Las Terrenas Centro", "El Limon"
          ]
        },
        {
          name: "Las Galeras",
          sectors: ["Las Galeras Centro", "Rincón", "Frontón"]
        }
      ]
    },
    {
      name: "La Romana",
      cities: [
        {
          name: "La Romana",
          sectors: [
            "La Romana Centro", "Villa Verde", "Santa Rosa", "Quisqueya",
            "Caleta", "Cumayasa"
          ]
        },
        {
          name: "Casa de Campo",
          sectors: [
            "La Estancia", "Altos de Chavon", "Teeth of the Dog",
            "Minitas", "Dye Fore", "La Romana Country Club"
          ]
        },
        {
          name: "Bayahibe",
          sectors: ["Bayahibe Centro", "Dominicus", "Bayahibe Beach"]
        }
      ]
    },
    {
      name: "San Pedro de Macoris",
      cities: [
        {
          name: "San Pedro de Macoris",
          sectors: [
            "San Pedro Centro", "Miramar", "Barrio Mexico", "Restauración",
            "Villa Providencia"
          ]
        },
        {
          name: "Juan Dolio",
          sectors: [
            "Juan Dolio Centro", "Metro Country Club", "Guayacanes",
            "Villas del Mar", "Costa del Sol"
          ]
        }
      ]
    },
    {
      name: "La Vega",
      cities: [
        {
          name: "La Vega",
          sectors: [
            "La Vega Centro", "Ensanche Tavarez", "Villa Rosa", "Los Pomos"
          ]
        },
        {
          name: "Jarabacoa",
          sectors: [
            "Jarabacoa Centro", "Los Corralitos", "El Salto", "Manabao",
            "La Confluencia", "Pinar Quemado"
          ]
        },
        {
          name: "Constanza",
          sectors: [
            "Constanza Centro", "Tireo", "La Culata", "Valle Nuevo"
          ]
        }
      ]
    },
    {
      name: "Espaillat",
      cities: [
        {
          name: "Moca",
          sectors: [
            "Moca Centro", "José Contreras", "Ensanche Espaillat", "Juan Lopez"
          ]
        },
        {
          name: "Gaspar Hernandez",
          sectors: ["Gaspar Hernandez Centro", "Veragua"]
        }
      ]
    },
    {
      name: "Duarte",
      cities: [
        {
          name: "San Francisco de Macoris",
          sectors: [
            "San Francisco Centro", "Los Rieles", "Ensanche Espaillat",
            "La Barranquita", "Villa Olga", "El Conde"
          ]
        },
        {
          name: "Pimentel",
          sectors: ["Pimentel Centro"]
        }
      ]
    },
    {
      name: "San Cristobal",
      cities: [
        {
          name: "San Cristobal",
          sectors: [
            "San Cristobal Centro", "Madre Vieja Norte", "Madre Vieja Sur",
            "Hato Damas", "Bajos de Haina"
          ]
        },
        {
          name: "Bajos de Haina",
          sectors: ["Haina Centro", "El Carril", "Quita Sueno"]
        }
      ]
    },
    {
      name: "Peravia",
      cities: [
        {
          name: "Bani",
          sectors: [
            "Bani Centro", "El Carretin", "Arroyo Hondo", "Sabana Buey",
            "Las Calderas"
          ]
        }
      ]
    },
    {
      name: "Monsenor Nouel",
      cities: [
        {
          name: "Bonao",
          sectors: [
            "Bonao Centro", "Piedra Blanca", "Sonador", "La Salvia"
          ]
        }
      ]
    },
    {
      name: "Maria Trinidad Sanchez",
      cities: [
        {
          name: "Nagua",
          sectors: [
            "Nagua Centro", "San José de Matanzas", "Cabrera", "Rio San Juan"
          ]
        },
        {
          name: "Rio San Juan",
          sectors: ["Rio San Juan Centro", "Playa Grande", "Abreu"]
        }
      ]
    },
    {
      name: "Hato Mayor",
      cities: [
        {
          name: "Hato Mayor",
          sectors: ["Hato Mayor Centro", "El Valle", "Yerba Buena"]
        }
      ]
    },
    {
      name: "El Seibo",
      cities: [
        {
          name: "El Seibo",
          sectors: ["El Seibo Centro", "Miches", "Pedro Sanchez"]
        },
        {
          name: "Miches",
          sectors: ["Miches Centro", "Playa Esmeralda"]
        }
      ]
    },
    {
      name: "Monte Plata",
      cities: [
        {
          name: "Monte Plata",
          sectors: ["Monte Plata Centro", "Sabana Grande de Boya", "Yamasa"]
        }
      ]
    },
    {
      name: "Azua",
      cities: [
        {
          name: "Azua",
          sectors: ["Azua Centro", "Padre Las Casas", "Peralta"]
        }
      ]
    },
    {
      name: "Barahona",
      cities: [
        {
          name: "Barahona",
          sectors: [
            "Barahona Centro", "El Quemaito", "Los Patos", "Bahoruco"
          ]
        }
      ]
    },
    {
      name: "Valverde",
      cities: [
        {
          name: "Mao",
          sectors: ["Mao Centro", "Amina", "Jaibón"]
        }
      ]
    },
    {
      name: "Monte Cristi",
      cities: [
        {
          name: "Monte Cristi",
          sectors: ["Monte Cristi Centro", "Castanuelas", "Villa Vasquez"]
        }
      ]
    },
    {
      name: "Sanchez Ramirez",
      cities: [
        {
          name: "Cotui",
          sectors: ["Cotui Centro", "Fantino", "La Mata"]
        }
      ]
    },
    {
      name: "Hermanas Mirabal",
      cities: [
        {
          name: "Salcedo",
          sectors: ["Salcedo Centro", "Tenares", "Villa Tapia"]
        }
      ]
    }
  ]
};

// Helper functions
export function getProvinces(): string[] {
  return locationData.provinces.map(p => p.name);
}

export function getCitiesByProvince(provinceName: string): string[] {
  const province = locationData.provinces.find(
    p => p.name.toLowerCase() === provinceName.toLowerCase()
  );
  return province ? province.cities.map(c => c.name) : [];
}

export function getSectorsByCity(provinceName: string, cityName: string): string[] {
  const province = locationData.provinces.find(
    p => p.name.toLowerCase() === provinceName.toLowerCase()
  );
  if (!province) return [];

  const city = province.cities.find(
    c => c.name.toLowerCase() === cityName.toLowerCase()
  );
  return city ? city.sectors : [];
}
