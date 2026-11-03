// Server Component: renders a 0-5 rating as text stars with an accessible label.
export const Stars = ({ value }: { value: number }) => (
  <span aria-label={`${value.toFixed(1)} out of 5`} className="text-amber-500">
    {"★".repeat(Math.round(value)).padEnd(5, "☆")}
  </span>
);
