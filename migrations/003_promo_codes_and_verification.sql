-- Migration: Promo Codes and Verification System
-- Run this SQL in your Neon PostgreSQL database

-- 1. Promo Codes Table
CREATE TABLE IF NOT EXISTS ubikala_promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed', 'trial_days', 'free_months'
  discount_value DECIMAL(10,2) NOT NULL,
  max_uses INT DEFAULT NULL, -- NULL = unlimited
  used_count INT DEFAULT 0,
  valid_from TIMESTAMP DEFAULT NOW(),
  valid_until TIMESTAMP DEFAULT NULL, -- NULL = no expiration
  applicable_roles TEXT[] DEFAULT NULL, -- which roles can use this, NULL = all
  applicable_plans UUID[] DEFAULT NULL, -- which plans this applies to, NULL = all
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES ubikala_users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Promo Code Usage Tracking
CREATE TABLE IF NOT EXISTS ubikala_promo_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id UUID REFERENCES ubikala_promo_codes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES ubikala_users(id) ON DELETE CASCADE,
  used_at TIMESTAMP DEFAULT NOW(),
  discount_applied DECIMAL(10,2),
  UNIQUE(promo_code_id, user_id) -- Each user can only use a promo code once
);

-- 3. Verification Document Types (configurable by admin)
CREATE TABLE IF NOT EXISTS ubikala_verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  required_for_roles TEXT[] NOT NULL, -- ['inmobiliaria', 'asesor_independiente', 'propietario']
  is_required BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Verification Requests
CREATE TABLE IF NOT EXISTS ubikala_verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES ubikala_users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'under_review', 'approved', 'rejected'
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES ubikala_users(id),
  rejection_reason TEXT,
  admin_notes TEXT,
  UNIQUE(user_id) -- One active request per user
);

-- 5. User Submitted Documents
CREATE TABLE IF NOT EXISTS ubikala_user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES ubikala_users(id) ON DELETE CASCADE,
  verification_request_id UUID REFERENCES ubikala_verification_requests(id) ON DELETE CASCADE,
  document_type_id UUID REFERENCES ubikala_verification_documents(id),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  rejection_reason TEXT
);

-- 6. Add verification columns to users table
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES ubikala_users(id);
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS promo_code_used UUID REFERENCES ubikala_promo_codes(id);
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS rnc VARCHAR(20);

-- 7. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON ubikala_promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON ubikala_promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_usage_user ON ubikala_promo_code_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_docs_roles ON ubikala_verification_documents USING GIN(required_for_roles);
CREATE INDEX IF NOT EXISTS idx_verification_requests_user ON ubikala_verification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON ubikala_verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_user_documents_user ON ubikala_user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_users_verified ON ubikala_users(is_verified);

-- 8. Insert default verification documents
INSERT INTO ubikala_verification_documents (name, description, required_for_roles, is_required, sort_order) VALUES
  ('Cédula de Identidad', 'Cédula de identidad del titular o representante legal', ARRAY['inmobiliaria', 'asesor_independiente', 'propietario'], true, 1),
  ('RNC (Registro Nacional del Contribuyente)', 'Documento RNC de la empresa', ARRAY['inmobiliaria'], true, 2),
  ('Registro Mercantil', 'Certificado de registro mercantil de la empresa', ARRAY['inmobiliaria'], false, 3),
  ('Licencia de Corredor', 'Licencia de corredor de bienes raíces (si aplica)', ARRAY['asesor_independiente'], false, 4),
  ('Comprobante de Dirección', 'Factura de servicios o documento que valide la dirección', ARRAY['inmobiliaria', 'asesor_independiente'], false, 5)
ON CONFLICT DO NOTHING;

-- Done!
-- Note: After running this migration:
-- - Manage promo codes from /admin/promo-codes
-- - Manage verification documents from /admin/verification-documents
-- - Review verification requests from /admin/verifications
