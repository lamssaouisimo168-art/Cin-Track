// favorites.js
const STORAGE_KEY = "favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().some((fav) => String(fav.id) === String(id));
}

export function addFavorite(item) {
  const favs = getFavorites();
  if (favs.some((fav) => String(fav.id) === String(item.id))) return favs;
  const updated = [...favs, item];
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(id) {
  const updated = getFavorites().filter((fav) => String(fav.id) !== String(id));
  saveFavorites(updated);
  return updated;
}

// reduce : compter les favoris par type
export function countByType(favs) {
  return favs.reduce(
    (acc, fav) => {
      acc[fav.type] = (acc[fav.type] || 0) + 1;
      return acc;
    },
    { movie: 0, series: 0 }
  );
}
