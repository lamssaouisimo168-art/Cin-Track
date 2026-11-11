import { fetchItems } from "./api.js";
import { createCard, renderList, showError, openModal, closeModal } from "./cards.js";

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

function handleGridClick(event) {
  const card = event.target.closest("article");
  if (!card) return;

  const item = allItems.find((i) => String(i.id) === String(card.dataset.id));
  if (item) openModal(item);
}

grid.addEventListener("click", handleGridClick);

function handleEscape(event) {
  if (event.key === "Escape") closeModal();
}

document.addEventListener("keydown", handleEscape);
init();
