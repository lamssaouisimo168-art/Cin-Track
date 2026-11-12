// pagination.js
export const PAGE_SIZE = 8;

export function getTotalPages(total) {
  return Math.ceil(total / PAGE_SIZE);
}

export function paginate(items, page) {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

function createPageButton(label, onClick, isActive, isDisabled) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.disabled = isDisabled;
  btn.className = isActive
    ? "px-4 py-2 rounded-lg bg-orange-500 text-white font-bold"
    : "px-4 py-2 rounded-lg bg-zinc-200 hover:bg-orange-300 font-semibold disabled:opacity-40";
  btn.addEventListener("click", onClick);
  return btn;
}

export function renderPagination(container, currentPage, totalPages, onPageChange) {
  container.innerHTML = "";
  if (totalPages <= 1) return;

  container.appendChild(
    createPageButton("«", () => onPageChange(currentPage - 1), false, currentPage === 1)
  );

  for (let page = 1; page <= totalPages; page++) {
    container.appendChild(
      createPageButton(String(page), () => onPageChange(page), page === currentPage, false)
    );
  }

  container.appendChild(
    createPageButton("»", () => onPageChange(currentPage + 1), false, currentPage === totalPages)
  );
}
