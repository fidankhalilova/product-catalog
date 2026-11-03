// Async Server Component: loads reviews and computes the average rating on the server.
import { getReviews } from "@/lib/data";
import { Stars } from "./Stars";

export async function Reviews({ productId }: { productId: string }) {
  const reviews = await getReviews(productId);
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2">
        <Stars value={average} />
        <span className="font-medium">
          {reviews.length ? average.toFixed(1) : "No ratings yet"}
        </span>
        <span className="text-sm text-gray-500">
          ({reviews.length} reviews)
        </span>
      </p>
      <ul className="space-y-3">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-lg border bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.author}</span>
              <Stars value={r.rating} />
            </div>
            <p className="mt-1 text-gray-700">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
