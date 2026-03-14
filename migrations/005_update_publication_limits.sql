-- Migration 005: Update publication limits to match CRM plans
-- Propiedades listas only (proyectos will have a separate strategy)
--
-- Asesor independiente: 3 publicaciones (included with free CRM plan)
-- Inmobiliaria: 90 publicaciones (included with $99/mes CRM plan)

-- Asesor independiente base: 3 publicaciones (gratis, viene con el CRM)
UPDATE ubikala_plans
SET max_publications = 3, price = 0, updated_at = NOW()
WHERE role = 'asesor_independiente' AND name LIKE '%Básico%';

-- Inmobiliaria base: 90 publicaciones (viene con el plan $99)
UPDATE ubikala_plans
SET max_publications = 90, price = 0, updated_at = NOW()
WHERE role = 'inmobiliaria' AND name LIKE '%Básico%';
