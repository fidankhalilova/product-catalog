// Server Component: one product tile linking to its detail page.
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="overflow-hidden rounded-lg border bg-white transition hover:shadow-md"
    >
      <Image
        src={p.image}
        alt={p.name}
        width={600}
        height={400}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{p.category}</p>
        <h2 className="font-semibold">{p.name}</h2>
        <p className="mt-1 font-medium">${p.price}</p>
      </div>
    </Link>
  );
}
