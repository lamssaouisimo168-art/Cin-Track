import { fetchItems } from "./api.js";

async function init() {
  const items = await fetchItems();
  console.log(items);
}

init();
