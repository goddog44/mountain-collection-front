"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { accommodations } from "@/data/accommodations";
import SearchBar from "@/components/SearchBarHome";
import HomeContentSections from "../components/HomeSections";

export default function Home() {
  const featured = accommodations.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">

        {/* ── HERO SECTION ──
            KEY FIX: No more overflow-hidden on the section.
            Instead the video is clipped by its own absolute+inset-0,
            and we let the section overflow so SearchBar dropdowns
            can escape the hero and appear on top of content below.
        */}
        <section className="relative h-[70vh] min-h-[600px]">

          {/* Video background — clipped by the section's height naturally
              since it's absolute inset-0, no overflow-hidden needed */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/mountain-collection-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Hero content — z-10 so it sits above video+overlay
              overflow-visible (default) so dropdowns escape the section */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto w-full max-w-[1216px] px-4 md:px-8 text-center">

              <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
                Vivez l&apos;expérience montagne avec ceux qui la connaissent
              </h1>

              {/*
                SearchBar dropdowns use z-[9999] and position:absolute
                relative to the SearchBar container.
                Since the section no longer has overflow-hidden, they
                will render on top of everything below the hero.
              */}
              <SearchBar />

            </div>
          </div>
        </section>

        {/* ── PROMO ── */}
        <section className="bg-[var(--ts-white)] py-6 mt-4 mb-[-10]">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <div className="flex flex-col items-start justify-between gap-4 rounded-md bg-[#EDF0F5] px-8 py-4 shadow-sm md:flex-row md:items-center">
              <div>
                <h3 className="text-base font-bold text-[#1B3D6B]">
                  Vacances de Février
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Semaine du 28/02 dès 430€{" "}
                  <span className="line-through decoration-gray-400 text-gray-400">(au lieu de 670€)</span>
                </p>
              </div>
              <Link
                href="/search?promo=vacances-fevrier"
                className="rounded-md bg-[#1B3D6B] px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                J&apos;en profite
              </Link>
            </div>
          </div>
        </section>

        {/* ── HÉBERGEMENTS ── */}
        <section>
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">
            <HomeContentSections />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}