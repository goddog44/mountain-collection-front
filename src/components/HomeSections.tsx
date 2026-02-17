"use client";

import Link from "next/link";
import { useState } from "react";
import {
  KeyRound,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { WhyUsSection } from "../components/ui/WhyUsSection";


// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Trouvez vos vacances idéales
// ─────────────────────────────────────────────────────────────────────────────

const VACATION_CARDS = [
  {
    label: "Dernières Minutes,\njusqu'à -50%",
    // Tall card (spans 2 rows)
    tall: true,
    image: "https://media.mountaincollection.com/images/derniere-minute-1.jpg?height=500&fit=cover&v=2",
    href: "/search?promo=derniere-minute",
  },
  {
    label: "Au pied des pistes",
    tall: true,
    image: "https://media.mountaincollection.com/images/pied-des-pistes-2.png?height=500&fit=cover&v=2",
    href: "/search?locationFilters=depart-ski",
  },
  {
    label: "Nos courts séjours",
    tall: false,
    image: "https://media.mountaincollection.com/images/haute-altitude-2.jpg?height=500&fit=cover&v=2",
    href: "/search?duration=court",
  },
  {
    label: "Piscines",
    tall: true,
    image: "https://media.mountaincollection.com/images/bien-etre-2.png?height=500&fit=cover&v=2",
    href: "/search?amenities=piscine-ext",
  },
  {
    label: "Bien-être",
    tall: true,
    image: "https://media.mountaincollection.com/images/piscine-2.png?height=500&fit=cover&v=2",
    href: "/search?amenities=espace-bien-etre",
  },
];

export function VacationCategoriesSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <h2 className="mb-6 mt-4 text-xl font-bold text-gray-900">
          Trouvez vos vacances idéales
        </h2>

        {/*
          Layout matches the screenshot:
          Col 1: 1 tall card (row 1-2)
          Col 2: 1 tall card (row 1-2)
          Col 3: 2 small cards stacked (row 1 + row 2)
          Col 4: 1 tall card (row 1-2)
        */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[515px]">

          {/* Card 1 — Dernières Minutes (col 1, rows 1-2) */}
          <Link
            href={VACATION_CARDS[0].href}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              src={VACATION_CARDS[0].image}
              alt={VACATION_CARDS[0].label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-bold text-base leading-tight whitespace-pre-line drop-shadow-sm">
              {VACATION_CARDS[0].label}
            </span>
          </Link>

          {/* Card 2 — Au pied des pistes (col 2, rows 1-2) */}
          <Link
            href={VACATION_CARDS[1].href}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              src={VACATION_CARDS[1].image}
              alt={VACATION_CARDS[1].label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-bold text-base leading-tight drop-shadow-sm">
              {VACATION_CARDS[1].label}
            </span>
          </Link>

          {/* Col 3 — two small cards stacked */}
          {/* Card 3 — Nos courts séjours (row 1) */}
          <Link
            href={VACATION_CARDS[2].href}
            className="relative col-span-1 row-span-1 overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              src={VACATION_CARDS[2].image}
              alt={VACATION_CARDS[2].label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white font-bold text-sm drop-shadow-sm">
              {VACATION_CARDS[2].label}
            </span>
          </Link>

          {/* Card 4 — Piscines (row 2) */}
           <Link
            href={VACATION_CARDS[3].href}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              src={VACATION_CARDS[3].image}
              alt={VACATION_CARDS[3].label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-bold text-base leading-tight drop-shadow-sm">
              {VACATION_CARDS[3].label}
            </span>
          </Link>

          {/* Card 5 — Bien-être (col 4, rows 1-2) */}
          <Link
            href={VACATION_CARDS[4].href}
            className="relative col-span-1 row-span-2 overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              src={VACATION_CARDS[4].image}
              alt={VACATION_CARDS[4].label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-bold text-base leading-tight drop-shadow-sm">
              {VACATION_CARDS[4].label}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Quel type de séjour recherchez-vous ?
// ─────────────────────────────────────────────────────────────────────────────

const FAMILLES_STATIONS = [
  {
    name: "Flaine",
    image: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Flaine",
  },
  {
    name: "Serre Chevalier",
    image: "https://media.mountaincollection.com/zone/1584/serre-chevalier.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Serre+Chevalier",
  },
  {
    name: "La Rosière",
    image: "https://media.mountaincollection.com/zone/1546/la-rosiere.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=La+Rosi%C3%A8re",
  },
  {
    name: "Le Corbier",
    image: "https://media.mountaincollection.com/zone/1582/le-corbier-1.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Le+Corbier",
  },
];

const HAUTE_ALTITUDE_STATIONS = [
  {
    name: "Les Menuires",
    image: "https://media.mountaincollection.com/zone/1569/les-menuires.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Les+Menuires",
  },
  {
    name: "Val Thorens",
    image: "https://media.mountaincollection.com/zone/1575/val-thorens.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Val+Thorens",
  },
  {
    name: "Tignes",
    image: "https://media.mountaincollection.com/zone/1545/tignes.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Tignes",
  },
  {
    name: "Val d'Isère",
    image: "https://media.mountaincollection.com/zone/1544/val-d-isere.jpeg?height=500&fit=cover&v=2",
    href: "/search?destination=Val+d%27Is%C3%A8re",
  },
];

type StayTab = "familiales" | "altitude";

export function StayTypeSection() {
  const [activeTab, setActiveTab] = useState<StayTab>("familiales");
  const stations = activeTab === "familiales" ? FAMILLES_STATIONS : HAUTE_ALTITUDE_STATIONS;

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Quel type de séjour recherchez-vous ?
        </h2>

        {/* Tabs */}
        <div className="mb-6 flex gap-8 border-md border-gray-200">
          {(
            [
              { id: "familiales" as StayTab, label: "Stations familiales" },
              { id: "altitude" as StayTab, label: "Stations de haute altitude" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                "pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Station cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 auto-rows-fr">
          {stations.map((station) => (
            <Link
              key={station.name}
              href={station.href}
              className="group relative overflow-hidden rounded-md aspect-[2/4] cursor-pointer"
            >
              <img
                src={station.image}
                alt={station.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-base drop-shadow-sm">
                {station.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Premier réseau + Pourquoi nous choisir
// ─────────────────────────────────────────────────────────────────────────────

export function NetworkSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8 flex items-center gap-8">

        <Image
          src="/images/sectionImmo.png"
          alt="Carte des stations Mountain Collection dans les Alpes"
          width={2500}
          height={300 }
          className="shrink-0 object-contain"
        />

        {/* <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Premier réseau d'agences en station
          </h2>
          <p className="text-gray-600 text-sm">
            Mountain Collection est présent dans les plus grandes stations des Alpes.
          </p>
        </div> */}

      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — Nous soutenons vos projets
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5l9-7.5 9 7.5V20a1 1 0 01-1 1h-5v-5h-6v5H4a1 1 0 01-1-1V10.5z" />
      </svg>
    ),
    title: "Séjour à la montagne hiver et été",
    desc: "Des séjours à la montagne pour toute la famille, qu'il s'agisse de ski, de randonnée ou de détente.",
    href: "/search",
  },
  {
    icon: <KeyRound className="h-6 w-6" />,
    title: "Gestion locative",
    desc: "Des solutions pour gérer votre bien locatif, qu'il s'agisse de louer, de vendre ou de faire gérer.",
    href: "/gestion-locative",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25M12 3.75h.008v.008H12V3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75V3m0 0h-3m3 0h3" />
      </svg>
    ),
    title: "Vente de biens immobiliers",
    desc: "Estimation, mise en valeur et diffusion de votre annonce",
    href: "/vente",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Syndic de copropriété",
    desc: "Entretien et gestion financière complète de copropriété",
    href: "/syndic",
  },
];

export function ProjectsSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <h2 className="mb-8 text-base font-bold text-gray-900">
          Nous soutenons vos projets
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="flex flex-col gap-2">
              {/* Divider between cols */}
              {i > 0 && <div className="hidden md:block absolute top-0 left-0 h-full w-px bg-gray-200" />}
              <div className="text-gray-700">{project.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 leading-snug">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{project.desc}</p>
            </div>
          ))}
        </div>

        {/* Vertical dividers */}
        <div className="hidden md:grid md:grid-cols-4 mt-0 pointer-events-none absolute inset-0">
          {[1, 2, 3].map((i) => (
            <div key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Composite export — drop this after the promo banner in your page
// ─────────────────────────────────────────────────────────────────────────────

export default function HomeContentSections() {
  return (
    <>
      <VacationCategoriesSection />
      <StayTypeSection />
      <NetworkSection />
      <WhyUsSection />
      <ProjectsSection />
    </>
  );
}
