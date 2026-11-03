"use server"; // Server Action: validates input on the server, saves the review, revalidates caches.
import { revalidatePath, revalidateTag } from "next/cache";
import { addReview, getProduct } from "@/lib/data";

export type ReviewResult = { error?: string };

export async function submitReview(
  productId: string,
  formData: FormData,
): Promise<ReviewResult> {
  const author = String(formData.get("author") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const rating = Number(formData.get("rating"));

  if (
    !author ||
    text.length < 5 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  )
    return {
      error:
        "Enter a name, a rating (1-5) and a review of at least 5 characters.",
    };
  if (!(await getProduct(productId))) return { error: "Unknown product." };

  await addReview({ productId, author, text, rating });
  revalidateTag("reviews", "max"); // clears the unstable_cache entry
  revalidatePath(`/products/${productId}`); // refreshes the (possibly prerendered) page
  return {};
}
