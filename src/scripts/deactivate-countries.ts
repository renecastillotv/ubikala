/**
 * Set all countries except DO to is_active = false.
 * Run with: npx tsx src/scripts/deactivate-countries.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.UBIKALA_DATABASE_URL || 'postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function main() {
  // Deactivate all countries except Dominican Republic
  const result = await sql`
    UPDATE ubikala_paises
    SET is_active = false, updated_at = NOW()
    WHERE code != 'DO'
    RETURNING code, name, flag, is_active
  `;

  console.log('Deactivated countries:');
  for (const r of result) {
    console.log(`  ${r.flag} ${r.code} — ${r.name} (is_active: ${r.is_active})`);
  }

  // Confirm DO is still active
  const active = await sql`
    SELECT code, name, flag, is_active FROM ubikala_paises WHERE is_active = true
  `;
  console.log('\nActive countries:');
  for (const r of active) {
    console.log(`  ${r.flag} ${r.code} — ${r.name}`);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
