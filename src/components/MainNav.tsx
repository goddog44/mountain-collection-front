"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATIONS = [
  "Flaine", "La Plagne", "La Rosière",
  "La Toussuire", "Le Corbier", "Les 2 Alpes",
  "Les Arcs", "Les Menuires", "Méribel",
  "Saint-Martin-de-Belleville", "Serre Chevalier", "Tignes",
  "Val d'Isère", "Val Thorens",
];

const DOMAINES = [
  "Domaine de La Plagne", "Domaine de Méribel", "Domaine de Serre Chevalier",
  "Domaine de Tignes", "Domaine Espace San Bernardo", "Domaine Grand Massif",
  "Domaine Les 2 Alpes", "Domaine Les 3 Vallées", "Domaine Les Arcs - Peisey-Vallandry",
  "Domaine Les Menuires", "Domaine Les Sybelles", "Domaine Paradiski",
];

const AGENCES = [
  "Belle Plagne", "Bourg Saint Maurice",
  "Chalet Time Immobilier", "Flaine Forum",
  "La Plagne Bellecôte", "La Plagne Centre",
  "La Plagne Montalbert", "La Plagne Montchavin",
  "La Rosière", "La Toussuire",
  "Le Corbier", "Les 2 Alpes",
  "Les Arcs 2000", "Les Arcs Le Charvet",
  "Les Arcs Les Villards", "Les Menuires La Croisette",
  "Les Menuires Les Bruyères", "Les Menuires Reberty 2000",
  "Monetier", "Méribel",
  "Saint Martin de Belleville", "Serre Chevalier La Salle-les-Alpes",
  "Tignes Le Lac", "Tignes Val Claret",
  "Val d'Isère", "Val Thorens",
];

const OFFRES = [
  { label: "Court séjour", href: "/offres/court-sejour" },
  { label: "Dernière minute", href: "/offres/derniere-minute" },
  { label: "Nos Promotions", href: "/offres/promotions" },
];

type NavKey = "destinations" | "agences" | "offres" | null;
type DestTab = "stations" | "domaines";

// ─── Chunk helper ─────────────────────────────────────────────────────────────

function chunkBy3<T>(arr: T[]): T[][] {
  const cols: T[][] = [[], [], []];
  arr.forEach((item, i) => cols[i % 3].push(item));
  return cols;
}

function chunkBy2<T>(arr: T[]): T[][] {
  const cols: T[][] = [[], []];
  arr.forEach((item, i) => cols[i % 2].push(item));
  return cols;
}

// ─── Destinations mega ────────────────────────────────────────────────────────

function DestinationsMega() {
  const [tab, setTab] = useState<DestTab>("stations");
  const items = tab === "stations" ? STATIONS : DOMAINES;
  const cols = chunkBy3(items);

  return (
    <div className="flex min-h-[300px]">
      {/* Left sidebar */}
      <div className="w-48 shrink-0 border-r border-gray-100 py-4 pr-2">
        {(["stations", "domaines"] as DestTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onMouseEnter={() => setTab(t)}
            onClick={() => setTab(t)}
            className={[
              "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              tab === t
                ? "bg-[var(--ts-light-grey)] text-gray-900 font-semibold"
                : "text-gray-700 hover:bg-gray-50",
            ].join(" ")}
          >
            {t === "stations" ? "Stations" : "Domaines skiables"}
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="flex-1 px-8 py-5">
        <p className="mb-5 text-sm font-bold text-[var(--ts-mid-blue)]">
          {tab === "stations"
            ? "Découvrez nos destinations de ski"
            : "Découvrez nos domaines skiables"}
        </p>
        <div className="grid grid-cols-3 gap-x-8 gap-y-0">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col">
              {col.map((item) => (
                <Link
                  key={item}
                  href={`/${tab === "stations" ? "stations" : "domaines"}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-2.5 text-sm text-gray-700 hover:text-[var(--ts-mid-blue)] transition-colors border-b border-gray-100 last:border-0"
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {tab === "domaines" && (
          <div className="mt-6">
            <Link
              href="/domaines-skiables"
              className="inline-flex items-center rounded-lg bg-[var(--ts-mid-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Tous les domaines skiables
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Agences mega ─────────────────────────────────────────────────────────────

function AgencesMega() {
  const cols = chunkBy2(AGENCES);

  return (
    <div className="px-8 py-5">
      <div className="grid grid-cols-2 gap-x-16 gap-y-0">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((item) => (
              <Link
                key={item}
                href={`/agences/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-2.5 text-sm text-gray-700 hover:text-[var(--ts-mid-blue)] transition-colors border-b border-gray-100 last:border-0"
              >
                {item}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Offres mega ──────────────────────────────────────────────────────────────

function OffresMega() {
  const rows = chunkBy2(OFFRES);

  return (
    <div className="px-8 py-5">
      <div className="grid grid-cols-2 gap-x-16 gap-y-0">
        {rows.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2.5 text-sm text-gray-700 hover:text-[var(--ts-mid-blue)] transition-colors border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Nav ─────────────────────────────────────────────────────────────────

export default function MainNav() {
  const [open, setOpen] = useState<NavKey>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggle = (key: NavKey) => setOpen((prev) => (prev === key ? null : key));

  const navItem = (key: NavKey, label: string) => {
    const isOpen = open === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => toggle(key)}
        aria-expanded={isOpen}
        className={[
          "flex items-center gap-1 rounded-md px-1 py-1 text-sm font-medium transition-colors",
          isOpen
            ? "text-gray-900 underline underline-offset-4"
            : "text-gray-600 hover:text-gray-900",
        ].join(" ")}
      >
        {label}
        {isOpen
          ? <ChevronUp className="h-4 w-4 shrink-0" />
          : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>
    );
  };

  // Mega panel position — destinations aligns left of nav, agences & offres too
  const megaPositions: Record<string, string> = {
    destinations: "left-0",
    agences: "left-0",
    offres: "left-0",
  };

  return (
    <nav ref={navRef} className="relative flex items-center gap-1" aria-label="Navigation principale">
      {navItem("destinations", "Nos destinations")}
      {navItem("agences", "Nos agences")}
      {navItem("offres", "Nos offres")}

      {/* Mega panel */}
      {open && (
        <>
          {/* Overlay to blur background */}
          <div
            className="fixed inset-0 top-[var(--header-height,64px)] z-[999] bg-[#dce8f5]/40 backdrop-blur-[2px]"
            onClick={() => setOpen(null)}
          />

          <div
            className={[
              "absolute top-[calc(100%+12px)] z-[1000] min-w-[820px] rounded-2xl bg-white shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)]",
              megaPositions[open ?? "destinations"],
            ].join(" ")}
          >
            {open === "destinations" && <DestinationsMega />}
            {open === "agences" && <AgencesMega />}
            {open === "offres" && <OffresMega />}
          </div>
        </>
      )}
    </nav>
  );
}
