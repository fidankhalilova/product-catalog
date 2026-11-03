// Global 404 page, also shown for unknown routes.
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-600">
        We couldn't find what you were looking for.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block text-blue-600 underline"
      >
        Back to catalog
      </Link>
    </div>
  );
}
