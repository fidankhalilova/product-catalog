"use client"; // Client leaf: needs an onChange handler to auto-submit the form.

export function CategoryFilter({
  categories,
  current,
}: {
  categories: string[];
  current?: string;
}) {
  return (
    <form
      action="/products"
      onChange={(e) => e.currentTarget.requestSubmit()}
      className="flex gap-2"
    >
      <select
        name="category"
        defaultValue={current ?? ""}
        className="rounded border bg-white px-3 py-1.5"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button className="rounded border bg-white px-3 py-1.5">Apply</button>
    </form>
  );
}
