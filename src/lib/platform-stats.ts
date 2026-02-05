// Unified platform statistics from both CLIC and Ubikala databases
// Cached for 10 minutes to avoid hitting DBs on every page load

import { getPortalStats } from './db';
import { ubikalaDb } from './ubikala-db';

export interface PlatformStats {
  properties: number;       // CLIC portal properties
  agents: number;           // CLIC agents with properties
  cities: number;           // CLIC distinct cities
  ubikalaUsers: number;     // Ubikala verified users
  ubikalaProperties: number; // Ubikala active properties
  totalProperties: number;  // CLIC + Ubikala
  totalAgents: number;      // CLIC agents + Ubikala users
}

let cache: { stats: PlatformStats; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function getUbikalaStats(): Promise<{ users: number; properties: number }> {
  if (!ubikalaDb) return { users: 0, properties: 0 };

  try {
    const [userRows, propRows] = await Promise.all([
      ubikalaDb`SELECT COUNT(*) as count FROM ubikala_users WHERE is_verified = true AND is_active = true`,
      ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`,
    ]);
    return {
      users: Number(userRows[0]?.count || 0),
      properties: Number(propRows[0]?.count || 0),
    };
  } catch (error) {
    console.error('[getUbikalaStats] Error:', error);
    return { users: 0, properties: 0 };
  }
}

export async function getPlatformStats(): Promise<PlatformStats> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.stats;
  }

  const [clicStats, ubikalaStats] = await Promise.all([
    getPortalStats(),
    getUbikalaStats(),
  ]);

  const stats: PlatformStats = {
    properties: clicStats.properties,
    agents: clicStats.agents,
    cities: clicStats.cities,
    ubikalaUsers: ubikalaStats.users,
    ubikalaProperties: ubikalaStats.properties,
    totalProperties: clicStats.properties + ubikalaStats.properties,
    totalAgents: clicStats.agents + ubikalaStats.users,
  };

  cache = { stats, timestamp: Date.now() };
  return stats;
}

/** Format number for display: 1234 → "1,234" */
export function formatStatNumber(n: number): string {
  return n.toLocaleString('es-DO');
}
