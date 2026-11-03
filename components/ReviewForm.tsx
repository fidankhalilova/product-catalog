"use client"; // Client leaf: useOptimistic + transition around a Server Action passed in as a prop.
import { useOptimistic, useState, useTransition, type FormEvent } from "react";

type Draft = { author: string; rating: number; text: string };
type Props = { action: (formData: FormData) => Promise<{ error?: string }> };

export function ReviewForm({ action }: Props) {
  const [pending, addPending] = useOptimistic<Draft | null, Draft>(
    null,
    (_, draft) => draft,
  );
  const [error, setError] = useState<string>();
  const [, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // JS path only; without JS the browser posts to the action natively
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      addPending({
        author: String(data.get("author")),
        rating: Number(data.get("rating")),
        text: String(data.get("text")),
      });
      const result = await action(data);
      setError(result.error);
      if (!result.error) form.reset();
    });
  }

  return (
    <form
      action={action as unknown as (formData: FormData) => Promise<void>}
      onSubmit={onSubmit}
      className="space-y-3 rounded-lg border bg-white p-4"
    >
      <h3 className="font-semibold">Write a review</h3>
      {pending && (
        <p className="rounded bg-amber-50 p-3 text-sm opacity-70">
          {pending.author} · {"★".repeat(pending.rating)} · {pending.text}{" "}
          (posting…)
        </p>
      )}
      <input
        name="author"
        required
        placeholder="Your name"
        className="w-full rounded border px-3 py-1.5"
      />
      <select
        name="rating"
        defaultValue="5"
        className="rounded border px-3 py-1.5"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} ★
          </option>
        ))}
      </select>
      <textarea
        name="text"
        required
        minLength={5}
        placeholder="What did you think?"
        className="w-full rounded border px-3 py-1.5"
      />
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button className="rounded bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700">
        Post review
      </button>
    </form>
  );
}
