// Server Components: pulse placeholders used by loading.tsx and Suspense fallbacks.
const Bar = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

export const CatalogSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }, (_, i) => (
      <Bar key={i} className="h-72" />
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="grid gap-8 md:grid-cols-2">
    <Bar className="h-80" />
    <div className="space-y-4">
      <Bar className="h-8 w-2/3" />
      <Bar className="h-5 w-1/3" />
      <Bar className="h-24" />
    </div>
  </div>
);

export const ReviewsSkeleton = () => (
  <div className="space-y-3">
    {[0, 1].map((i) => (
      <Bar key={i} className="h-20" />
    ))}
  </div>
);

export const RelatedSkeleton = () => (
  <div className="grid grid-cols-3 gap-4">
    {[0, 1, 2].map((i) => (
      <Bar key={i} className="h-48" />
    ))}
  </div>
);
