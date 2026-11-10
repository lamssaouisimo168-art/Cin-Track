const API_URL =
  "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";

export async function fetchItems() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Erreur API : " + res.status);
  }
  const data = await res.json();
  return data;
}
