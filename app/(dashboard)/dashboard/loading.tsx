export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-sage/20 rounded-lg" />
          <div className="h-4 w-40 bg-sage/15 rounded mt-2" />
        </div>
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-sage/20 p-6">
            <div className="h-4 w-20 bg-sage/15 rounded mb-3" />
            <div className="h-7 w-28 bg-sage/20 rounded" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sage/20 p-6">
          <div className="h-5 w-36 bg-sage/15 rounded mb-4" />
          <div className="h-32 bg-sage/10 rounded-lg" />
        </div>
        <div className="bg-white rounded-2xl border border-sage/20 p-6">
          <div className="h-5 w-36 bg-sage/15 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-sage/10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
