import { fetchItems } from "./api.js";

const grid = document.getElementById("grid");
let allItems = [];

async function init() {
  grid.innerHTML = `<p class="col-span-full text-center text-white/60 italic">Chargement du catalogue...</p>`;

  try {
    allItems = await fetchItems();
    grid.innerHTML = `<p class="col-span-full text-center text-white/60 italic">${allItems.length} titres chargés.</p>`;
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<p class="col-span-full text-center text-red-500 font-bold text-xl">Impossible de charger les données. Réessayez plus tard.</p>`;
  }
}

init();
