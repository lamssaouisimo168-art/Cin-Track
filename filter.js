// filter.js
export function searchItems(items, query) {
  const q = query.trim().toLowerCase();
  return items.filter((item) => item.title.toLowerCase().includes(q));
}

export function filterByType(items, type) {
  if (type === "all") return items;
  return items.filter((item) => item.type === type);
}
