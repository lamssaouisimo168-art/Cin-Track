import { fetchItems } from "./api.js";
import { createCard, renderList, showError, openModal, closeModal } from "./cards.js";
import { searchItems, filterByType } from "./filter.js";

const grid = document.getElementById("grid");
let allItems = [];
let currentQuery = "";
let currentType = "all";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const filterButtons = document.querySelectorAll(".type-btn");

function update() {
  if (allItems.length === 0) return;

  const searched = searchItems(allItems, currentQuery);
  const filtered = filterByType(searched, currentType);

  if (filtered.length === 0) {
    showError(grid, "Aucun résultat trouvé.");
  } else {
    renderList(filtered, createCard, grid);
  }
}

function handleSearch() {
  currentQuery = searchInput.value;
  update();
}

function setActiveFilterButton() {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.type === currentType;
    btn.classList.toggle("bg-orange-500", isActive);
    btn.classList.toggle("bg-zinc-600", !isActive);
  });
}

function handleFilterClick(event) {
  currentType = event.currentTarget.dataset.type;
  setActiveFilterButton();
  update();
}

searchInput.addEventListener("input", handleSearch);
searchBtn.addEventListener("click", handleSearch);
filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));

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

async function init() {
  grid.innerHTML = `<p class="col-span-full text-center text-white/60 italic">Chargement du catalogue...</p>`;

  try {
    allItems = await fetchItems();
    update();
  } catch (error) {
    console.error(error);
    showError(grid, "Impossible de charger les données. Réessayez plus tard.");
  }
}

init();
