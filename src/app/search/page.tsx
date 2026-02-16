import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageClient />
    </Suspense>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-24 animate-pulse bg-gray-100" />
      <main className="flex-1">
        <div className="mx-auto max-w-[1216px] px-4 py-8">
          <div className="flex gap-8">
            <div className="h-96 w-64 animate-pulse rounded-lg bg-gray-100" />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="h-64 bg-gray-50" />
    </div>
  );
}
