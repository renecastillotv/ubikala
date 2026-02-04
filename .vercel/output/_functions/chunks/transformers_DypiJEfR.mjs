const typeMap = {
  "casa": "house",
  "apartamento": "apartment",
  "penthouse": "penthouse",
  "villa": "villa",
  "terreno": "land",
  "local": "commercial",
  "comercial": "commercial",
  "oficina": "office",
  "nave": "warehouse",
  "edificio": "building",
  "solar": "land"
};
const transactionMap = {
  "venta": "sale",
  "alquiler": "rent",
  "renta": "rent"
};
function transformProperty(dbProp, forceRental = false) {
  const hasJoinedAgent = dbProp.captador_nombre || dbProp.captador_slug;
  const legacyAgent = dbProp.caracteristicas?.agents?.[0];
  const operacionLower = dbProp.operacion?.toLowerCase() || "";
  const isRentalContext = forceRental || operacionLower === "alquiler" || operacionLower === "renta" || operacionLower === "rent";
  const effectivePrice = isRentalContext && dbProp.precio_alquiler ? parseFloat(dbProp.precio_alquiler) : parseFloat(dbProp.precio);
  const effectiveCurrency = isRentalContext && dbProp.moneda_alquiler ? dbProp.moneda_alquiler : dbProp.moneda;
  const isProject = dbProp.es_proyecto || dbProp.precio_min !== null && dbProp.precio_max !== null;
  const images = [];
  if (dbProp.imagen_principal) {
    images.push({
      url: dbProp.imagen_principal,
      alt: dbProp.titulo,
      isPrimary: true
    });
  }
  let imagenesArray = [];
  if (dbProp.imagenes) {
    if (Array.isArray(dbProp.imagenes)) {
      imagenesArray = dbProp.imagenes;
    } else if (typeof dbProp.imagenes === "string") {
      try {
        imagenesArray = JSON.parse(dbProp.imagenes);
      } catch (e) {
      }
    }
  }
  imagenesArray.forEach((url, index) => {
    if (url && url !== dbProp.imagen_principal) {
      images.push({
        url,
        alt: `${dbProp.titulo} - Imagen ${index + 1}`,
        isPrimary: false
      });
    }
  });
  if (images.length === 0) {
    images.push({
      url: "/images/property-placeholder.svg",
      alt: dbProp.titulo,
      isPrimary: true
    });
  }
  const createdDate = new Date(dbProp.created_at);
  const thirtyDaysAgo = /* @__PURE__ */ new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isNew = createdDate > thirtyDaysAgo;
  const isPriceReduced = dbProp.precio_anterior !== null && parseFloat(dbProp.precio_anterior) > parseFloat(dbProp.precio);
  const transactionType = isRentalContext ? "rent" : transactionMap[operacionLower] || "sale";
  return {
    id: dbProp.id,
    slug: dbProp.slug,
    title: dbProp.titulo,
    description: dbProp.descripcion,
    type: typeMap[dbProp.tipo?.toLowerCase()] || "house",
    transactionType,
    status: dbProp.estado_propiedad === "disponible" ? "active" : dbProp.estado_propiedad === "vendida" ? "sold" : dbProp.estado_propiedad === "alquilada" ? "rented" : "pending",
    price: effectivePrice,
    currency: effectiveCurrency?.toUpperCase() === "DOP" ? "DOP" : "USD",
    pricePerSqm: dbProp.m2_construccion ? Math.round(effectivePrice / parseFloat(dbProp.m2_construccion)) : void 0,
    // Rental price (when property has both sale and rent options)
    rentalPrice: dbProp.precio_alquiler ? parseFloat(dbProp.precio_alquiler) : void 0,
    rentalCurrency: dbProp.moneda_alquiler ? dbProp.moneda_alquiler.toUpperCase() === "DOP" ? "DOP" : "USD" : void 0,
    // Project fields
    isProject,
    priceMin: dbProp.precio_min ? parseFloat(dbProp.precio_min) : void 0,
    priceMax: dbProp.precio_max ? parseFloat(dbProp.precio_max) : void 0,
    areaMin: dbProp.m2_min ? parseFloat(dbProp.m2_min) : void 0,
    areaMax: dbProp.m2_max ? parseFloat(dbProp.m2_max) : void 0,
    bedroomsMin: dbProp.habitaciones_min ?? void 0,
    bedroomsMax: dbProp.habitaciones_max ?? void 0,
    bathroomsMin: dbProp.banos_min ?? void 0,
    bathroomsMax: dbProp.banos_max ?? void 0,
    parkingMin: dbProp.parqueos_min ?? void 0,
    parkingMax: dbProp.parqueos_max ?? void 0,
    location: {
      slug: `${dbProp.ciudad?.toLowerCase().replace(/\s+/g, "-")}-${dbProp.sector?.toLowerCase().replace(/\s+/g, "-")}`,
      city: dbProp.ciudad || "",
      sector: dbProp.sector || "",
      province: dbProp.provincia || "",
      country: dbProp.pais || "República Dominicana",
      latitude: dbProp.latitud || 0,
      longitude: dbProp.longitud || 0,
      address: dbProp.direccion || void 0
    },
    bedrooms: dbProp.habitaciones,
    bathrooms: dbProp.banos,
    parkingSpaces: dbProp.estacionamientos,
    area: parseFloat(dbProp.m2_construccion) || 0,
    landArea: dbProp.m2_terreno ? parseFloat(dbProp.m2_terreno) : void 0,
    yearBuilt: void 0,
    floor: void 0,
    totalFloors: dbProp.pisos || void 0,
    features: dbProp.amenidades || [],
    images,
    videoUrl: dbProp.video_url || void 0,
    virtualTourUrl: dbProp.tour_virtual_url || void 0,
    agent: hasJoinedAgent ? {
      // Use data from JOINs (new method)
      id: dbProp.captador_id || "0",
      slug: dbProp.captador_slug || "agente",
      name: [dbProp.captador_nombre, dbProp.captador_apellido].filter(Boolean).join(" ") || "Agente",
      email: dbProp.captador_email || "",
      phone: dbProp.captador_telefono || "",
      whatsapp: dbProp.captador_whatsapp || dbProp.captador_telefono || "",
      photo: dbProp.captador_foto || dbProp.captador_avatar || "/images/agent-placeholder.svg",
      company: dbProp.empresa_nombre || dbProp.captador_titulo || void 0,
      userType: "agent",
      // Verified = tiene empresa asociada Y está visible en la web
      verified: Boolean(dbProp.empresa_nombre) && dbProp.captador_visible !== false,
      rating: dbProp.captador_stats?.calificacion_promedio || 5,
      reviewCount: dbProp.captador_stats?.total_resenas || 0,
      experienceYears: dbProp.captador_experiencia || 5,
      languages: dbProp.captador_idiomas || ["es"],
      bio: dbProp.captador_bio || "",
      propertiesCount: dbProp.captador_stats?.propiedades_activas || 0,
      responseTime: "Responde en menos de 1 hora",
      specializations: (dbProp.captador_especialidades || []).map((e) => {
        const map = {
          "casas": "house",
          "casa": "house",
          "residencial": "house",
          "apartamentos": "apartment",
          "apartamento": "apartment",
          "villas": "villa",
          "villa": "villa",
          "lujo": "villa",
          "terrenos": "land",
          "terreno": "land",
          "comercial": "commercial",
          "inversión": "commercial",
          "inversion": "commercial"
        };
        return map[e.toLowerCase()] || "house";
      }),
      locations: []
    } : legacyAgent ? {
      // Fallback to caracteristicas.agents (legacy method)
      id: String(legacyAgent.id),
      slug: legacyAgent.slug || "agente",
      name: legacyAgent.full_name || "Agente",
      email: legacyAgent.email || "",
      phone: legacyAgent.phone || "",
      whatsapp: legacyAgent.phone || "",
      photo: legacyAgent.avatar || "/images/agent-placeholder.svg",
      company: void 0,
      userType: "agent",
      verified: true,
      rating: 5,
      reviewCount: 0,
      experienceYears: 5,
      languages: ["es"],
      bio: legacyAgent.bio || "",
      propertiesCount: 0,
      responseTime: "Responde en menos de 1 hora",
      specializations: [],
      locations: []
    } : {
      // Default fallback
      id: "0",
      slug: "ubikala",
      name: "Ubikala",
      email: "info@ubikala.com",
      phone: "",
      whatsapp: "",
      photo: "/images/logo.png",
      userType: "agent",
      verified: true,
      rating: 5,
      reviewCount: 0,
      experienceYears: 10,
      languages: ["es", "en"],
      bio: "",
      propertiesCount: 0,
      responseTime: "Responde en menos de 1 hora",
      specializations: [],
      locations: []
    },
    isFeatured: dbProp.destacada,
    isExclusive: dbProp.exclusiva,
    isNew,
    isPriceReduced,
    previousPrice: dbProp.precio_anterior ? parseFloat(dbProp.precio_anterior) : void 0,
    views: 0,
    createdAt: dbProp.created_at,
    updatedAt: dbProp.updated_at
  };
}
function transformProperties(dbProps, forceRental = false) {
  return dbProps.map((prop) => transformProperty(prop, forceRental));
}
function transformAgent(dbAgent) {
  const fullName = [dbAgent.nombre, dbAgent.apellido].filter(Boolean).join(" ") || "Agente";
  const languageMap = {
    "es": "Español",
    "en": "English",
    "fr": "Français",
    "de": "Deutsch",
    "pt": "Português"
  };
  const propertyCount = dbAgent.real_property_count !== void 0 ? Number(dbAgent.real_property_count) : dbAgent.stats?.propiedades_activas || 0;
  const company = dbAgent.company_name || dbAgent.titulo_profesional || void 0;
  return {
    id: String(dbAgent.id),
    slug: dbAgent.slug,
    name: fullName,
    email: dbAgent.email || "",
    phone: dbAgent.telefono_directo || dbAgent.telefono || "",
    whatsapp: dbAgent.whatsapp || dbAgent.telefono_directo || dbAgent.telefono || "",
    photo: dbAgent.foto_url || dbAgent.avatar_url || "/images/agent-placeholder.svg",
    company,
    userType: "agent",
    verified: true,
    rating: dbAgent.stats?.calificacion_promedio || 5,
    reviewCount: dbAgent.stats?.total_resenas || 0,
    experienceYears: dbAgent.experiencia_anos || 5,
    languages: (dbAgent.idiomas || ["es"]).map((code) => languageMap[code] || code),
    bio: dbAgent.biografia || "",
    propertiesCount: propertyCount,
    responseTime: "menos de 1 hora",
    specializations: (dbAgent.especialidades || []).map((e) => {
      const map = {
        "casas": "house",
        "casa": "house",
        "residencial": "house",
        "apartamentos": "apartment",
        "apartamento": "apartment",
        "villas": "villa",
        "villa": "villa",
        "lujo": "villa",
        "terrenos": "land",
        "terreno": "land",
        "comercial": "commercial",
        "inversión": "commercial",
        "inversion": "commercial"
      };
      return map[e.toLowerCase()] || "house";
    }),
    locations: dbAgent.zonas || [],
    socialMedia: dbAgent.redes_sociales ? {
      instagram: dbAgent.redes_sociales.instagram,
      facebook: dbAgent.redes_sociales.facebook,
      linkedin: dbAgent.redes_sociales.linkedin
    } : void 0
  };
}
function transformAgents(dbAgents) {
  return dbAgents.map(transformAgent);
}

export { transformAgent as a, transformAgents as b, transformProperty as c, transformProperties as t };
