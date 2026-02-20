"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/Filters/FilterSidebar";
import AccommodationGrid from "@/components/AccommodationGrid";
import { accommodations } from "@/data/accommodations";
import { useFilters } from "@/store/useFilters";
import { SlidersHorizontal, X, Search } from "lucide-react";
import type { SubStation } from "@/data/destinations";

interface DestinationPageClientProps {
    name: string;
    slug: string;
    heroImage: string;
    description: string;
    type: "station" | "domaine";
    subStations?: SubStation[];
    subStationsLabel?: string;
}

export default function DestinationPageClient({
    name,
    heroImage,
    description,
    type,
    subStations,
    subStationsLabel,
}: DestinationPageClientProps) {
    const setFilters = useFilters((s) => s.setFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Pre-filter by this destination on mount
    useEffect(() => {
        setFilters({ destination: name });
    }, [name, setFilters]);

    const pageTitle =
        type === "station" ? `Location ${name}` : `Location ${name}`;

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            {/* ── HERO ── */}
            <section className="relative h-[420px] w-full overflow-hidden">
                <img
                    src={heroImage}
                    alt={name}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
                    <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl">
                        {pageTitle}
                    </h1>

                    {/* Inline mini search bar */}
                    <Link
                        href={`/search?destination=${encodeURIComponent(name)}&mode=stay`}
                        className="flex w-full max-w-xl items-center gap-3 rounded-full bg-white px-6 py-3.5 shadow-lg transition hover:shadow-xl"
                    >
                        <div className="flex flex-1 items-center gap-6 text-left text-sm">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Où partir ?</p>
                                <p className="font-semibold text-gray-900">{name}</p>
                            </div>
                            <div className="h-6 w-px bg-gray-200" />
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Quand ?</p>
                                <p className="text-gray-400">Sélectionner des dates</p>
                            </div>
                            <div className="h-6 w-px bg-gray-200" />
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Qui ?</p>
                                <p className="text-gray-900">2 participants</p>
                            </div>
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B3D6B]">
                            <Search className="h-4 w-4 text-white" />
                        </div>
                    </Link>
                </div>
            </section>

            <main className="flex-1 bg-gray-50">
                <div className="mx-auto w-full max-w-[1216px] px-4 py-8 md:px-8">
                    <div className="flex flex-row gap-8">
                        {/* Sidebar */}
                        <div className="hidden md:block">
                            <FilterSidebar />
                        </div>

                        {/* Mobile filter drawer */}
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

                        {/* Main content */}
                        <div className="min-w-0 flex-1">
                            {/* Mobile filter button */}
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

                            {/* Accommodation grid */}
                            <AccommodationGrid accommodations={accommodations} />

                            {/* Sub-stations section */}
                            {subStations && subStations.length > 0 && (
                                <div className="mt-12 border-t border-gray-200 pt-10">
                                    <h2 className="mb-5 text-base font-bold text-gray-900">
                                        {subStationsLabel ?? `Les stations de ${name}`}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {subStations.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="flex items-center gap-3 rounded-lg bg-white p-2 shadow-sm transition hover:shadow-md"
                                            >
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                                                />
                                                <span className="text-sm font-medium text-gray-800">
                                                    {sub.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            {description && (
                                <div className="mt-10 border-t border-gray-200 pt-8">
                                    <h2 className="mb-3 text-lg font-bold text-[#1B3D6B]">
                                        {type === "station"
                                            ? `Tout savoir sur ${name}`
                                            : `À propos du domaine ${name}`}
                                    </h2>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
