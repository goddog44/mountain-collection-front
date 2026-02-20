"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { name: "Belle Plagne", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-belle-plagne" },
  { name: "Bourg Saint Maurice", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-bourg-saint-maurice" },
  { name: "Chalet Time Immobilier", url: "https://www.mountaincollection.com/fr/agence/chalet-time-immobilier" },
  { name: "Flaine Forum", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-flaine-forum" },
  { name: "La Plagne Bellecôte", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-plagne-bellecote" },
  { name: "La Plagne Centre", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-plagne-centre" },
  { name: "La Plagne Montalbert", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-plagne-montalbert" },
  { name: "La Plagne Montchavin", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-plagne-montchavin" },
  { name: "La Rosière", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-rosiere" },
  { name: "La Toussuire", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-la-toussuire" },
  { name: "Le Corbier", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-le-corbier" },
  { name: "Les 2 Alpes", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-2-alpes" },
  { name: "Les Arcs 2000", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-arcs-2000" },
  { name: "Les Arcs Le Charvet", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-arcs-le-charvet" },
  { name: "Les Arcs Les Villards", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-arcs-les-villards" },
  { name: "Les Menuires La Croisette", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-menuires-la-croisette" },
  { name: "Les Menuires Les Bruyères", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-menuires-les-bruyeres" },
  { name: "Les Menuires Reberty 2000", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-les-menuires-reberty-2000" },
  { name: "Monetier", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-monetier" },
  { name: "Saint Martin de Belleville", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-saint-martin-de-belleville" },
  { name: "Serre Chevalier La Salle-les-Alpes", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-serre-chevalier-la-salle-les-alpes" },
  { name: "Tignes Le Lac", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-tignes-le-lac" },
  { name: "Tignes Val Claret", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-tignes-val-claret" },
  { name: "Val d'Isère", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-val-d-isere" },
  { name: "Val Thorens", url: "https://www.mountaincollection.com/fr/agence/mountain-collection-val-thorens" },
];

const OFFRES = [
  { label: "Court séjour", href: "/offres/court-sejour" },
  { label: "Dernière minute", href: "/offres/derniere-minute" },
  { label: "Nos Promotions", href: "/search?promo=vacances-fevrier" },
];

type NavKey = "destinations" | "agences" | "offres" | null;
type DestTab = "stations" | "domaines";

// ─── Chunk helpers ────────────────────────────────────────────────────────────

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
      <div className="w-52 shrink-0 border-r border-gray-100 py-4 pr-2">
        {(["stations", "domaines"] as DestTab[]).map((t) => (
          <button
            key={t}
            type="button"
            onMouseEnter={() => setTab(t)}
            onClick={() => setTab(t)}
            className={[
              "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              tab === t
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            {t === "stations" ? "Stations" : "Domaines skiables"}
            <ChevronRight className="h-5 w-3.5 shrink-0 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="flex-1 px-5 py-5">
        <p className="mb-2 text-sm font-bold text-gray-90">
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
                  className="border-b border-gray-100 py-2.5 text-sm text-gray-900 transition-colors last:border-0 hover:text-gray-90"
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
              className="inline-flex items-center rounded-lg bg-[#1B3D6B] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
    <div className="px-4 py-5">
      <div className="grid grid-cols-2 gap-y-0">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col items-left pl-8">
            {col.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-sm text-gray-900 transition-colors last:border-0 hover:text-[#1B3D6B]"
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Offres mega ──────────────────────────────────────────────────────────────

function OffresMega() {
  const cols = chunkBy2(OFFRES);
  return (
    <div className="px-8 py-5">
      <div className="grid grid-cols-2 gap-x-16 gap-y-0">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-gray-100 py-2.5 text-sm text-gray-900 transition-colors last:border-0 hover:text-[#1B3D6B]"
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
  const pathname = usePathname();

  // Replicate exactly the same scroll logic as Header.tsx
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => setIsScrolled(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // On homepage before scroll → links are white (on dark hero bg)
  // On homepage after scroll, or on any other page → links are dark
  const isTransparent = isHomePage && !isScrolled;

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

  // ── Nav item button ──
  // Matches screenshots exactly:
  //   - Active: underlined
  //   - Inactive: slightly muted, hover → full color
  //   - Color: white on transparent hero, dark on white header
  const navItem = (key: NavKey, label: string) => {
    const isOpen = open === key;
    const baseText = isTransparent
      ? isOpen ? "text-white underline underline-offset-4" : "text-white/90 hover:text-white"
      : isOpen ? "text-gray-900 underline underline-offset-4" : "text-gray-300 hover:text-gray-900";

    return (
      <button
        key={key}
        type="button"
        onClick={() => toggle(key)}
        aria-expanded={isOpen}
        className={[
          "flex items-center gap-1 rounded-md px-1 py-1 text-sm font-medium transition-colors",
          baseText,
        ].join(" ")}
      >
        {label}
        {isOpen
          ? <ChevronUp className="h-4 w-4 shrink-0" />
          : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>
    );
  };

  return (
    <nav
      ref={navRef}
      className="relative flex items-center justify-start gap-4"
      aria-label="Navigation principale"
    >
      {navItem("destinations", "Nos destinations")}
      {navItem("agences", "Nos agences")}
      {navItem("offres", "Nos offres")}

      {/* Mega panel + overlay */}
      {open && (
        <>
          {/*
            Overlay — same blueish tint as in the original code.
            fixed so it covers the full page below the header.
            onClick closes the panel.
          */}
          <div
            className="fixed inset-0 top-[64px] z-[999]"
            onClick={() => setOpen(null)}
          />

          {/*
            Mega panel — positioned absolute relative to the nav element,
            just below it. z-[1000] so it's above the overlay.
            min-w ensures it doesn't collapse on small content (Offres).
          */}
          <div
            className={[
              "absolute left-0 top-[calc(100%+12px)] z-[1000] rounded-md bg-white shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)]",
              // Adapt width per panel
              open === "offres" || open === "agences" ? "min-w-[450px]" : "min-w-[820px]",
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