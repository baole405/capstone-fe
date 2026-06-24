import type { Product } from "../types";
import { MOCK_PRODUCTS } from "../mock";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function fetchProducts(): Promise<Product[]> {
  await delay(900);
  return MOCK_PRODUCTS;
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  await delay(700);
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}
