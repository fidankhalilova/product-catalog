// Async Server Component: slow (2s) related-products section streamed after the shell.
import { getRelated } from "@/lib/data";
import { ProductCard } from "./ProductCard";

export async function RelatedProducts({
  id,
  category,
}: {
  id: string;
  category: string;
}) {
  const related = await getRelated(id, category);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {related.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
