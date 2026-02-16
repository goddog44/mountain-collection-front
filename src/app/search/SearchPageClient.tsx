"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/Filters/FilterSidebar";
import AccommodationGrid from "@/components/AccommodationGrid";
import { accommodations } from "@/data/accommodations";
import { useFilters } from "@/store/useFilters";
import { SlidersHorizontal, X } from "lucide-react";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const setFilters = useFilters((s) => s.setFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const destination = searchParams.get("destination");
    const pax = searchParams.get("pax");
    if (destination) setFilters({ destination });
    if (pax)
      setFilters({ guests: { adults: Number(pax) || 2, children: 0 } });
  }, [searchParams, setFilters]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1216px] px-4 py-4 md:px-8 lg:px-8 lg:py-8">
          <div className="flex flex-row gap-8">
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-xl bg-white p-4 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filtres</h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100"
                      aria-label="Fermer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="mb-4 md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </button>
              </div>
              <AccommodationGrid accommodations={accommodations} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
