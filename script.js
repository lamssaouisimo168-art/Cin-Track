import { fetchItems } from "./api.js";
import { createCard, renderList, showError, openModal, closeModal, renderFavorites, renderFavoritesCount } from "./cards.js";
import { searchItems, filterByType } from "./filter.js";
import { paginate, getTotalPages, renderPagination } from "./pagination.js";
import { addFavorite, removeFavorite, getFavorites, countByType } from "./favorites.js";

const grid = document.getElementById("grid");
let allItems = [];
let currentQuery = "";
let currentType = "all";
let currentPage = 1;

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const filterButtons = document.querySelectorAll(".type-btn");
const paginationBox = document.getElementById("pagination");

function update() {
  if (allItems.length === 0) return;

  const searched = searchItems(allItems, currentQuery);
  const filtered = filterByType(searched, currentType);
  const totalPages = getTotalPages(filtered.length);

  if (filtered.length === 0) {
    showError(grid, "Aucun résultat trouvé.");
  } else {
    renderList(paginate(filtered, currentPage), createCard, grid);
  }

  renderPagination(paginationBox, currentPage, totalPages, goToPage);
}

function goToPage(page) {
  currentPage = page;
  update();
}

function handleSearch() {
  currentQuery = searchInput.value;
  currentPage = 1;
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
  currentPage = 1;
  setActiveFilterButton();
  update();
}

searchInput.addEventListener("input", handleSearch);
searchBtn.addEventListener("click", handleSearch);
filterButtons.forEach((btn) => btn.addEventListener("click", handleFilterClick));

function handleGridClick(event) {
  const heartBtn = event.target.closest(".heart-btn");
  if (heartBtn) {
    const item = allItems.find((i) => String(i.id) === String(heartBtn.dataset.id));
    if (item) addFavorite(item);
    refreshFavorites();
    return;
  }

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

const favList = document.getElementById("favorites-list");
const favCount = document.getElementById("favorites-count");

function refreshFavorites() {
  const favs = getFavorites();
  renderFavorites(favList, favs);
  renderFavoritesCount(favCount, countByType(favs));
}

function handleFavListClick(event) {
  const removeBtn = event.target.closest(".remove-fav");
  if (!removeBtn) return;
  removeFavorite(removeBtn.dataset.id);
  refreshFavorites();
  update();
}

favList.addEventListener("click", handleFavListClick);
refreshFavorites();

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
