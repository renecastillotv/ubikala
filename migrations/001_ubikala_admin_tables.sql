-- Ubikala Admin Panel - Database Migration
-- Run this against the Ubikala database (ep-polished-moon)

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ubikala_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'agent' CHECK (role IN ('admin', 'agent')),
  avatar_url TEXT,
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ubikala_users_email ON ubikala_users(email);
CREATE INDEX IF NOT EXISTS idx_ubikala_users_role ON ubikala_users(role);
CREATE INDEX IF NOT EXISTS idx_ubikala_users_active ON ubikala_users(is_active);

-- ============================================
-- SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ubikala_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES ubikala_users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ubikala_sessions_user_id ON ubikala_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ubikala_sessions_token ON ubikala_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_ubikala_sessions_expires ON ubikala_sessions(expires_at);

-- ============================================
-- PROPERTIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ubikala_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES ubikala_users(id) ON DELETE SET NULL,

  -- Basic info
  titulo VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  codigo VARCHAR(50),
  descripcion TEXT,

  -- Classification
  tipo VARCHAR(50) NOT NULL, -- casa, apartamento, villa, terreno, local, oficina
  operacion VARCHAR(50) NOT NULL, -- venta, alquiler
  estado VARCHAR(50) DEFAULT 'disponible', -- disponible, vendida, alquilada, reservada

  -- Pricing
  precio NUMERIC(15,2) NOT NULL,
  moneda VARCHAR(10) DEFAULT 'USD',
  precio_alquiler NUMERIC(15,2),
  moneda_alquiler VARCHAR(10),

  -- Location
  pais VARCHAR(100) DEFAULT 'República Dominicana',
  provincia VARCHAR(100),
  ciudad VARCHAR(100),
  sector VARCHAR(100),
  direccion TEXT,
  latitud NUMERIC(10,7),
  longitud NUMERIC(10,7),

  -- Features
  habitaciones INTEGER,
  banos INTEGER,
  medios_banos INTEGER,
  estacionamientos INTEGER,
  m2_construccion NUMERIC(10,2),
  m2_terreno NUMERIC(10,2),
  pisos INTEGER,
  ano_construccion INTEGER,

  -- Amenities (array of slugs)
  amenidades TEXT[] DEFAULT '{}',

  -- Media
  imagen_principal TEXT,
  imagenes TEXT[] DEFAULT '{}',
  video_url TEXT,
  tour_virtual_url TEXT,

  -- Contact (optional override)
  contacto_nombre VARCHAR(255),
  contacto_telefono VARCHAR(50),
  contacto_email VARCHAR(255),
  contacto_whatsapp VARCHAR(50),

  -- Flags
  activo BOOLEAN DEFAULT true,
  destacada BOOLEAN DEFAULT false,
  exclusiva BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ubikala_properties_slug ON ubikala_properties(slug);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_created_by ON ubikala_properties(created_by);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_activo ON ubikala_properties(activo);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_tipo ON ubikala_properties(tipo);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_operacion ON ubikala_properties(operacion);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_ciudad ON ubikala_properties(ciudad);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_destacada ON ubikala_properties(destacada);
CREATE INDEX IF NOT EXISTS idx_ubikala_properties_created ON ubikala_properties(created_at DESC);

-- ============================================
-- ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ubikala_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES ubikala_users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- user, property, session
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ubikala_activity_user ON ubikala_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_ubikala_activity_action ON ubikala_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_ubikala_activity_entity ON ubikala_activity_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_ubikala_activity_created ON ubikala_activity_log(created_at DESC);

-- ============================================
-- UPDATE TRIGGER FOR updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_ubikala_users_updated_at ON ubikala_users;
CREATE TRIGGER update_ubikala_users_updated_at
  BEFORE UPDATE ON ubikala_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ubikala_properties_updated_at ON ubikala_properties;
CREATE TRIGGER update_ubikala_properties_updated_at
  BEFORE UPDATE ON ubikala_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL ADMIN USER
-- Password: Admin123! (you should change this immediately)
-- Hash generated with bcrypt cost 12
-- ============================================
INSERT INTO ubikala_users (email, password_hash, name, role)
VALUES (
  'admin@ubikala.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.gQ4rK5yQK9KWJW',
  'Administrador',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- CLEANUP OLD SESSIONS (can be run periodically)
-- ============================================
-- DELETE FROM ubikala_sessions WHERE expires_at < NOW();
