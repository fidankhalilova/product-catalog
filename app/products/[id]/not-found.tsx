// Product-specific 404, rendered when notFound() is called for an unknown id.
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-2 text-gray-600">
        This product doesn't exist or was removed.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block text-blue-600 underline"
      >
        Browse all products
      </Link>
    </div>
  );
}
