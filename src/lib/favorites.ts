// Favorites management - localStorage based with optional API sync

const FAVORITES_KEY = 'propiedadenrd_favorites';
const FAVORITES_SYNC_KEY = 'propiedadenrd_favorites_sync';

export interface FavoriteProperty {
  slug: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  location: string;
  addedAt: string;
}

// Get favorites from localStorage
export function getFavorites(): FavoriteProperty[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Add a property to favorites
export function addFavorite(property: FavoriteProperty): FavoriteProperty[] {
  const favorites = getFavorites();

  // Check if already exists
  if (favorites.some(f => f.slug === property.slug)) {
    return favorites;
  }

  const updated = [...favorites, { ...property, addedAt: new Date().toISOString() }];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

  // Dispatch event for UI updates
  window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));

  return updated;
}

// Remove a property from favorites
export function removeFavorite(slug: string): FavoriteProperty[] {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.slug !== slug);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

  // Dispatch event for UI updates
  window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));

  return updated;
}

// Toggle favorite status
export function toggleFavorite(property: FavoriteProperty): { isFavorite: boolean; favorites: FavoriteProperty[] } {
  const favorites = getFavorites();
  const isFavorite = favorites.some(f => f.slug === property.slug);

  if (isFavorite) {
    return { isFavorite: false, favorites: removeFavorite(property.slug) };
  } else {
    return { isFavorite: true, favorites: addFavorite(property) };
  }
}

// Check if a property is favorited
export function isFavorite(slug: string): boolean {
  return getFavorites().some(f => f.slug === slug);
}

// Get favorites count
export function getFavoritesCount(): number {
  return getFavorites().length;
}

// Clear all favorites
export function clearFavorites(): void {
  localStorage.removeItem(FAVORITES_KEY);
  window.dispatchEvent(new CustomEvent('favorites-updated', { detail: [] }));
}

// Export favorites as JSON (for sharing/backup)
export function exportFavorites(): string {
  return JSON.stringify(getFavorites(), null, 2);
}

// Import favorites from JSON
export function importFavorites(json: string): FavoriteProperty[] {
  try {
    const imported = JSON.parse(json) as FavoriteProperty[];
    const current = getFavorites();

    // Merge without duplicates
    const merged = [...current];
    for (const item of imported) {
      if (!merged.some(f => f.slug === item.slug)) {
        merged.push(item);
      }
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: merged }));

    return merged;
  } catch {
    return getFavorites();
  }
}
