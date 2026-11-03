"use client"; // Client leaf: quantity stepper and button need state and click handlers.
import { useState } from "react";

export function AddToCart({ name }: { name: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(0);

  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded border bg-white">
          <button
            type="button"
            aria-label="Decrease"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5"
          >
            −
          </button>
          <span className="w-8 text-center">{qty}</span>
          <button
            type="button"
            aria-label="Increase"
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-1.5"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => setAdded((a) => a + qty)}
          className="rounded bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
      {added > 0 && (
        <p className="text-sm text-green-700">
          {added} × {name} in your cart
        </p>
      )}
    </div>
  );
}
