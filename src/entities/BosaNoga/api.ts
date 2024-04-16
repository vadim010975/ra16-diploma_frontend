const _URL = "http://localhost:7070/api/";

export async function fetchTopSales() {
  const r = await fetch(_URL + "top-sales");
  const response = await r.json();
  return response;
}

export async function fetchCategories() {
  const r = await fetch(_URL + "categories");
  const response = await r.json();
  return response;
}

export async function fetchCatalog(
  q: string,
  categoryId: number | null = null,
  offset: number | null = null
) {
  const req = _URL +
  "items" +
  (categoryId || offset || q
    ? "?" +
      (q ? "q=" + encodeURIComponent(q) : "") +
      (q && categoryId ? "&" : "") +
      (categoryId ? "categoryId=" + categoryId : "") +
      ((categoryId && offset) || (q && offset) ? "&" : "") +
      (offset ? "offset=" + offset : "")
    : "")
  const r = await fetch(req);
  const response = await r.json();
  return response;
}

export async function fetchProduct(id: string) {
  const r = await fetch(_URL + "items/" + id);
  const response = await r.json();
  return response;
}
