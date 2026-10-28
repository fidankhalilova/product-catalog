// Product detail (Server Component): shell renders first, slow sections stream in via Suspense.
// import { Suspense } from "react";

//testing
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPopularIds, getProduct } from "@/lib/data";
import { AddToCart } from "@/components/AddToCart";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ReviewForm } from "@/components/ReviewForm";
import { Reviews } from "@/components/Reviews";
// import { RelatedSkeleton, ReviewsSkeleton } from "@/components/Skeletons";
import { submitReview } from "./actions";

export const generateStaticParams = () => getPopularIds().map((id) => ({ id }));

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <article className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          priority
          className="w-full rounded-lg object-cover"
        />
        <div className="space-y-3">
          <p className="text-xs uppercase text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-medium">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <AddToCart name={product.name} />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {/* <Suspense fallback={<ReviewsSkeleton />}> */}
          <Reviews productId={id} />
        {/* </Suspense> */}
        <ReviewForm action={submitReview.bind(null, id)} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related products</h2>
        {/* <Suspense fallback={<RelatedSkeleton />}> */}
          <RelatedProducts id={id} category={product.category} />
        {/* </Suspense> */}
      </section>
    </article>
  );
}
