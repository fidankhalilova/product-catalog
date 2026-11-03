// Server-only async data layer simulating a DB, with cached + tagged review reads.
import "server-only";
import { unstable_cache } from "next/cache";
import productsJson from "@/data/products.json";
import reviewsJson from "@/data/reviews.json";
import { getCatalogSecret } from "./secret";
import type { Product, Review } from "./types";

const products = productsJson as Product[];
const store = globalThis as unknown as { reviews?: Review[] };
const reviews = (store.reviews ??= structuredClone(reviewsJson) as Review[]);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function query<T>(run: () => T, ms = 100): Promise<T> {
  if (!getCatalogSecret()) throw new Error("CATALOG_API_SECRET is missing");
  await sleep(ms);
  return run();
}

export const getProducts = (category?: string) =>
  query(() => products.filter((p) => !category || p.category === category));

export const getProduct = (id: string) =>
  query(() => {
    if (id === "fail") throw new Error("Simulated catalog failure");
    return products.find((p) => p.id === id) ?? null;
  });

export const getRelated = (id: string, category: string) =>
  query(
    () =>
      products
        .filter((p) => p.category === category && p.id !== id)
        .slice(0, 3),
    2000,
  );

export const getReviews = unstable_cache(
  (productId: string) =>
    query(() => reviews.filter((r) => r.productId === productId), 1500),
  ["reviews"],
  { tags: ["reviews"] },
);

export const addReview = (r: Omit<Review, "id" | "createdAt">) =>
  query(
    () =>
      reviews.unshift({
        ...r,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    300,
  );

export const getCategories = () => [
  ...new Set(products.map((p) => p.category)),
];
export const getPopularIds = () =>
  products.filter((p) => p.popular).map((p) => p.id);
