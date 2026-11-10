import { fetchItems } from "./api.js";
import { createCard, renderList, showError } from "./cards.js";

const grid = document.getElementById("grid");
let allItems = [];

async function init() {
  grid.innerHTML = `<p class="col-span-full text-center text-white/60 italic">Chargement du catalogue...</p>`;

  try {
    allItems = await fetchItems();
    renderList(allItems, createCard, grid);
  } catch (error) {
    console.error(error);
    showError(grid, "Impossible de charger les données. Réessayez plus tard.");
  }
}

init();
