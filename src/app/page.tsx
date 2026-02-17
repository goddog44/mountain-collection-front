"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { accommodations } from "@/data/accommodations";
import AccommodationGrid from "@/components/AccommodationGrid";
import SearchBar from "@/components/SearchBarHome";
import SearchBarMode, { ViewMode } from "../components/ui/searchBarMode";
import HomeContentSections from "../components/HomeSections";



export default function Home() {
  const featured = accommodations.slice(0, 6);

  const [viewMode, setViewMode] = useState<ViewMode>("Séjourner");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          
          {/* Vidéo background */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/videos/mountain-collection-bg.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto w-full max-w-[1216px] px-4 md:px-8 text-center">

              <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
                Vivez l'expérience montagne avec ceux qui la connaissent
              </h1>

              {/* 🔥 View Toggle */}
              {/* <div className="mb-6 flex justify-center">
                <SearchBarMode
                  defaultMode={viewMode}
                  onChange={setViewMode}
                />
              </div> */}

              <SearchBar />

            </div>
          </div>
        </section>

        {/* PROMO */}
        <section className="bg-[var(--ts-white)] py-6 mt-4 mb-[-10]">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <div className="text-primary flex flex-col items-start justify-between gap-4 rounded-md  bg-[var(--bg-water-blue)]  p-6 shadow-sm md:flex-row md:items-center">
              <div>
                <h3 className="text-[var(--ts-water-blue)] font-semibold">
                  Vacances de Février
                </h3>
                <p className="text-sm text-[var(--ts-water-blue)] text-gray-600">
                  Semaine du 28/02 dès 430€{" "}
                  <span className="line-through">(au lieu de 670€)</span>
                </p>
              </div>

              <Link
                href="/search"
                className="rounded-md bg-[var(--ts-mid-blue)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                J'en profite
              </Link>
            </div>
          </div>
        </section>

        {/* HÉBERGEMENTS */}
        <section className="">
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">

            {/* 🔥 On passe le viewMode ici */}
            <HomeContentSections
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
