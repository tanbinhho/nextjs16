export async function getProduct(id: string, revalidate?: number) {
  const fetchOptions = revalidate ? { next: { revalidate } } : undefined;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
const PAGE_SIZE = 9;

export async function fetchProducts({ pageParam = 0, revalidate = undefined } = {}) {
  const fetchOptions = revalidate ? { next: { revalidate } } : undefined;
  const res = await fetch('https://fakestoreapi.com/products', fetchOptions);
  if (!res.ok) throw new Error('Failed to fetch products');
  const allProducts = await res.json();
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const products = allProducts.slice(start, end);
  return {
    products,
    nextPage: end < allProducts.length ? pageParam + 1 : undefined,
    total: allProducts.length,
  };
}
