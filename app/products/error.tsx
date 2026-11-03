"use client"; // Error boundaries must be Client Components; offers a retry that refetches on the server.
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-gray-600">We couldn't load this page.</p>
      <button
        disabled={pending}
        onClick={() =>
          start(() => {
            router.refresh();
            reset();
          })
        }
        className="mt-6 rounded bg-blue-600 px-4 py-1.5 text-white disabled:opacity-50"
      >
        {pending ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
}
