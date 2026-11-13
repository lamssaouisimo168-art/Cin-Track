import { isFavorite } from "./favorites.js";

function getTypeLabel(type) {
  return type === "movie" ? "Film" : "Série";
}

// callback personnalisé : createCardFn est passé en paramètre
export function renderList(items, createCardFn, container) {
  container.innerHTML = items.map(createCardFn).join("");
}

export function showError(container, message) {
  container.innerHTML = `
    <p class="col-span-full text-center text-red-500 font-bold text-xl">${message}</p>
  `;
}

function getDetailsLine(item) {
  if (item.type === "movie") {
    return `Durée : ${item.duration} min`;
  }
  return `Saisons : ${item.seasons.length}`;
}

export function createCard(item) {
  const typeColor = item.type === "movie" ? "bg-orange-500" : "bg-sky-500";
  const favColor = isFavorite(item.id) ? "text-red-600" : "text-gray-400";

  return `
    <article class="group relative bg-[#1a2347] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-105" />
      <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${typeColor}">${getTypeLabel(item.type)}</span>

      <div class="p-3">
        <h3 class="font-bold text-lg text-white truncate">${item.title}</h3>
        <p class="text-sm text-white/60 italic">${item.releaseYear} • ${getTypeLabel(item.type)}</p>
      </div>

      <button class="heart-btn absolute top-2 right-2 z-10 bg-white rounded-full w-9 h-9 ${favColor}" data-id="${item.id}">
        <i class="fa-solid fa-heart"></i>
      </button>
    </article>
  `;
}

function createModalContent(item) {
  return `
    <div class="relative bg-white text-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
      <button id="modal-close" class="absolute top-3 right-3 bg-red-600 text-white rounded-full w-9 h-9 hover:bg-red-800">
        <i class="fa-solid fa-x"></i>
      </button>
      <img src="${item.image}" alt="${item.title}" class="w-full md:w-1/2 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
      <div class="p-6 flex flex-col gap-2">
        <h2 class="text-3xl font-black italic">${item.title}</h2>
        <p class="text-orange-500 font-semibold">${getTypeLabel(item.type)} • ${item.releaseYear}</p>
        <p><span class="font-bold">${getDetailsLine(item)}</span></p>
        <p><span class="font-bold">Genres :</span> ${item.genres.join(", ")}</p>
        <p><span class="font-bold">Réalisateurs :</span> ${item.directors.join(", ")}</p>
        <p><span class="font-bold">Pays :</span> ${item.productionCountries.join(", ")}</p>
        <p class="text-gray-600 mt-2">${item.description}</p>
      </div>
    </div>
  `;
}

export function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.remove();
}

export function openModal(item) {
  closeModal();
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.className = "fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4";
  overlay.innerHTML = createModalContent(item);
  document.body.appendChild(overlay);

  overlay.querySelector("#modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
}

function createFavoriteItem(item) {
  return `
    <div class="flex items-center justify-between rounded-lg p-3 hover:bg-gray-100" data-id="${item.id}">
      <span class="truncate">${item.title}</span>
      <button class="remove-fav text-gray-500 hover:text-red-600" data-id="${item.id}">
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  `;
}

export function renderFavorites(container, favs) {
  if (favs.length === 0) {
    container.innerHTML = `<p class="text-gray-400 italic p-3">Aucun favori pour le moment.</p>`;
    return;
  }
  container.innerHTML = favs.map(createFavoriteItem).join("");
}

export function renderFavoritesCount(container, counts) {
  container.textContent = `${counts.movie} film(s) • ${counts.series} série(s)`;
}
