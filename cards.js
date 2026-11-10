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

export function createCard(item) {
  const typeColor = item.type === "movie" ? "bg-orange-500" : "bg-sky-500";

  return `
    <article class="group relative bg-[#1a2347] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-105" />
      <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${typeColor}">${getTypeLabel(item.type)}</span>

      <div class="p-3">
        <h3 class="font-bold text-lg text-white truncate">${item.title}</h3>
        <p class="text-sm text-white/60 italic">${item.releaseYear} • ${getTypeLabel(item.type)}</p>
      </div>
    </article>
  `;
}
