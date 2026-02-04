-- Migration: Plans and User Hierarchy
-- Run this SQL in your Neon PostgreSQL database

-- 1. Create plans table
CREATE TABLE IF NOT EXISTS ubikala_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  max_publications INT NOT NULL DEFAULT 10,
  publication_duration_days INT NOT NULL DEFAULT 30,
  max_team_members INT DEFAULT NULL,
  max_leads_per_month INT DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  features JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Add new columns to ubikala_users table
-- (Run these one by one if some already exist)

-- Add bio column for user profile
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add plan_id to link users to their subscription plan
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS plan_id UUID REFERENCES ubikala_plans(id);

-- Add parent_user_id for inmobiliaria hierarchy
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS parent_user_id UUID REFERENCES ubikala_users(id);

-- Add custom publication limit for team members
ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS custom_publication_limit INT DEFAULT NULL;

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_plan_id ON ubikala_users(plan_id);
CREATE INDEX IF NOT EXISTS idx_users_parent_user_id ON ubikala_users(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_plans_role ON ubikala_plans(role);
CREATE INDEX IF NOT EXISTS idx_plans_is_active ON ubikala_plans(is_active);

-- 4. Insert some default plans (optional - you can create them from the admin panel)
INSERT INTO ubikala_plans (name, role, max_publications, publication_duration_days, max_team_members, price) VALUES
  ('Plan Básico Propietario', 'propietario', 3, 30, NULL, 0),
  ('Plan Premium Propietario', 'propietario', 10, 60, NULL, 29.99),
  ('Plan Básico Asesor', 'asesor_independiente', 20, 30, NULL, 49.99),
  ('Plan Premium Asesor', 'asesor_independiente', 50, 60, NULL, 99.99),
  ('Plan Básico Inmobiliaria', 'inmobiliaria', 100, 30, 5, 199.99),
  ('Plan Premium Inmobiliaria', 'inmobiliaria', 500, 60, 20, 499.99),
  ('Plan Enterprise Inmobiliaria', 'inmobiliaria', 1000, 90, 50, 999.99)
ON CONFLICT DO NOTHING;

-- Done!
-- Note: After running this migration, you can manage plans from /admin/plans
