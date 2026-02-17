"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Heart,
  Camera,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  XCircle,
  MapPin,
  Shield,
  Building2,
  Home,
  Tv,
  PawPrint,
  Trees,
  Phone,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const accommodation = {
  title: "Studio confortable avec balcon · Centre station",
  type: "Studio",
  station: "Flaine",
  voyageurs: 4,
  surface: 25,
  sallesDeBain: 1,
  images: [
    "/images/studio-1.jpg",
    "/images/studio-2.jpg",
    "/images/studio-3.jpg",
    "/images/studio-4.jpg",
    "/images/studio-5.jpg",
  ],
  description: `Studio cabine Sud 25 m2 en rez-de-jardin avec balcon
- Equipé pour 4 personnes
- Cabine : 1 lit double
- Entrée: 1 jeu de lits superposés
- Télévision écran plat
- Salle de bain avec baignoire
- Toilettes séparées
- Kitchenette avec 2 plaques électriques, micro-onde et four
- Literie : couettes
- Non fumeur
- Balcon Sud
- Casier à ski
- Le couchage en hauteur ne convient pas aux enfants de moins de 6 ans
- Linge de lit et serviettes de toilette non fournis.

-Inclus en saison d'été (pour tout séjour de 6 nuits et plus): le "Pass Flaine été" comprenant de nombreuses activités`,
  equipements: [
    { icon: "balcon", label: "Balcon / Terrasse" },
    { icon: "tv", label: "Télévision" },
    { icon: "pets", label: "Animaux acceptés" },
  ],
  services: [
    {
      category: "Parking",
      items: [
        { label: "Emplacement parking couvert", price: "95 €" },
        { label: "Garage-Box-Parking (214 m)", price: "95 €" },
      ],
    },
    {
      category: "Entretien et propreté",
      items: [{ label: "Ménage fin de séjour studio", price: "56 €" }],
    },
    {
      category: "Linge de maison",
      items: [
        { label: "Kit linge de lit 1 personne", price: "17 €" },
        { label: "Kit linge de lit 2 personnes", price: "20 €" },
        { label: "Kit toilette (drap de bain+serviette)", price: "9 €" },
      ],
    },
    {
      category: "Équipements supplémentaires",
      items: [
        { label: "Chaise haute bébé les pléiades", price: "22 €" },
        { label: "Lit parapluie pour bébé", price: "22 €" },
      ],
    },
    {
      category: "Autres services",
      items: [{ label: "Supplément animal", price: "36 €" }],
    },
  ],
  formules: [
    {
      id: "hebergement",
      label: "Formule hébergement",
      details: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"],
      available: true,
      prix: 482,
      prixBarré: 528,
      economie: 46,
    },
    {
      id: "ski",
      label: "Formule ski",
      details: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"],
      available: false,
    },
    {
      id: "toutcompris",
      label: "Formule tout compris",
      details: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"],
      available: false,
    },
  ],
  gamme: {
    niveau: "Essentielle",
    description: "Des logements fonctionnels, centrés sur l'essentiel, pour des vacances à prix doux.",
    services: ["Kit entretien"],
  },
  infosComplementaires: {
    caution: "300 €",
    numeroEnregistrement: "n°",
  },
  localisation: {
    distances: [
      { label: "Distance des commerces", value: "50 m" },
      { label: "Distance des pistes", value: "350 m" },
      { label: "Distance ESF", value: "350 m" },
      { label: "Distance du centre ville", value: "600 m" },
    ],
    lat: 74.019,
    lng: 6.679,
  },
  residence: {
    nom: "SAGITTAIRE",
    description:
      "Résidence située dans le quartier de Flaine Forêt à environ 250 mètres du départ des pistes et des rassemblements d'écoles de ski et à proximité immédiate des commerces. Arrêt de bus à 20m. Casiers à ski.",
    image: "/images/sagittaire.jpg",
  },
  agence: {
    nom: "Mountain Collection - Flaine Forum",
    image: "/images/agence-flaine.jpg",
    question: "Une question ? Besoin d'un conseil ?",
    description:
      "Notre agence est à votre écoute pour vous fournir toutes les informations nécessaires sur cet hébergement et vous accompagner dans la création de vacances.",
    reference: "FL-SGT009",
    telephone: "0450904670",
  },
  station: {
    nom: "Domaine Grand Massif",
    domaine: {
      description:
        "Le domaine skiable du Grand Massif se situe au cœur de la Haute-Savoie et relie les stations de Flaine, Les Carroz, Morillon, Samoëns et Sixt-Fer-à-Cheval. Avec plus de 260 kilomètres de pistes culminant à 2 500 mètres d'altitude, il offre un terrain de glisse varié adapté à tous les niveaux. Les panoramas sur le Mont Blanc y sont spectaculaires et les paysages alternent entre forêts, alpages et combes naturelles. Le Grand Massif séduit par son authenticité, la richesse de son environnement et l'équilibre qu'il offre entre nature préservée et ski plaisir.",
      km: 265,
      pistes: 148,
      remontees: 62,
      pistesVertes: 20,
      pistesBleues: 64,
      pistesRouges: 50,
      pistesNoires: 14,
      altitudeMax: 2500,
      altitudeStation: 700,
      denivele: 1800,
    },
  },
};

// ─── Calendar Modal ────────────────────────────────────────────────────────────

function CalendarModal({ onClose }: { onClose: () => void }) {
  const [startDate] = useState(new Date(2026, 3, 11));
  const [endDate] = useState(new Date(2026, 3, 18));

  const months = [
    { name: "avril 2026", year: 2026, month: 3 },
    { name: "mai 2026", year: 2026, month: 4 },
  ];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay() === 0
      ? 6
      : new Date(year, month, 1).getDay() - 1;

  const isInRange = (d: Date) => d >= startDate && d <= endDate;
  const isStart = (d: Date) => d.toDateString() === startDate.toDateString();
  const isEnd = (d: Date) => d.toDateString() === endDate.toDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[680px] rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button className="rounded-full p-1 hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-base font-semibold text-gray-800">
            {months[0].name} - {months[1].name}
          </h3>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {months.map((m) => {
            const days = getDaysInMonth(m.year, m.month);
            const firstDay = getFirstDayOfMonth(m.year, m.month);
            const cells = Array(firstDay).fill(null).concat(
              Array.from({ length: days }, (_, i) => i + 1)
            );

            return (
              <div key={m.name}>
                <p className="mb-3 text-center text-sm font-semibold text-gray-600">
                  {m.name}
                </p>
                <div className="grid grid-cols-7 gap-y-1">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                    <div key={i} className="py-1 text-center text-xs font-medium text-gray-400">
                      {d}
                    </div>
                  ))}
                  {cells.map((day, i) => {
                    if (!day)
                      return <div key={`e-${i}`} />;
                    const date = new Date(m.year, m.month, day);
                    const inRange = isInRange(date);
                    const start = isStart(date);
                    const end = isEnd(date);
                    return (
                      <div
                        key={day}
                        className={[
                          "flex h-9 w-9 items-center justify-center text-sm font-medium transition-all",
                          start || end
                            ? "rounded-full bg-[#1a2e4a] text-white"
                            : inRange
                            ? "bg-[#1a2e4a]/15 text-gray-800"
                            : "rounded-full text-gray-700 hover:bg-gray-100",
                        ].join(" ")}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="text-sm">
            <span className="font-bold">7 nuits</span>
            <span className="ml-2 text-gray-500">11 avr. - 18 avr.</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#1a2e4a] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Participants Modal ────────────────────────────────────────────────────────

function ParticipantsModal({ onClose }: { onClose: () => void }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-80 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Adulte</p>
              <p className="text-sm text-gray-500">18 ans et plus</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
              >
                <span className="text-xl leading-none text-gray-600">−</span>
              </button>
              <span className="w-4 text-center font-semibold">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
              >
                <span className="text-xl leading-none text-gray-600">+</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Enfants</p>
              <p className="text-sm text-gray-500">Moins de 18 ans</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
              >
                <span className="text-xl leading-none text-gray-600">−</span>
              </button>
              <span className="w-4 text-center font-semibold">{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
              >
                <span className="text-xl leading-none text-gray-600">+</span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#1a2e4a] py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AccommodationDetailPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedFormule, setSelectedFormule] = useState("hebergement");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllEquipements, setShowAllEquipements] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const descLines = accommodation.description.split("\n");
  const shortDesc = descLines.slice(0, 8).join("\n");

  const EquipIcon = ({ type }: { type: string }) => {
    if (type === "balcon") return <Trees className="h-5 w-5" />;
    if (type === "tv") return <Tv className="h-5 w-5" />;
    if (type === "pets") return <PawPrint className="h-5 w-5" />;
    return <CheckCircle className="h-5 w-5" />;
  };

  return (
    <>
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      {showParticipants && <ParticipantsModal onClose={() => setShowParticipants(false)} />}

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-white">
          <div className="mx-auto max-w-[1216px] px-4 py-8 md:px-8">

            {/* ── TITRE ─────────────────────────────────── */}
            <div className="mb-5 flex items-start justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {accommodation.title}
              </h1>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition">
                <Heart className="h-5 w-5" />
                <span className="underline underline-offset-2">Ajouter</span>
              </button>
            </div>

            {/* ── GALERIE ───────────────────────────────── */}
            <div className="mb-8 grid h-[340px] grid-cols-3 gap-2 overflow-hidden rounded-2xl">
              {/* Grande image */}
              <div className="col-span-1 row-span-2 bg-gray-200">
                <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              {/* 4 petites images */}
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative overflow-hidden bg-gray-200">
                  <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  {i === 3 && (
                    <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-800 shadow hover:bg-gray-50 transition">
                      <Camera className="h-4 w-4" />
                      Voir toutes les photos
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ── CONTENU PRINCIPAL ─────────────────────── */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

              {/* COLONNE GAUCHE */}
              <div className="space-y-8">

                {/* Sous-titre */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {accommodation.type} · {accommodation.station}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {accommodation.voyageurs} voyageurs · {accommodation.surface} m² · {accommodation.sallesDeBain} salle de bain
                  </p>
                  <hr className="mt-4 border-gray-200" />
                </div>

                {/* Description */}
                <div>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
                    {showFullDesc ? accommodation.description : shortDesc + (descLines.length > 8 ? "..." : "")}
                  </pre>
                  {descLines.length > 8 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="mt-3 flex items-center gap-1 text-sm font-medium underline underline-offset-2 text-gray-700 hover:text-gray-900 transition"
                    >
                      {showFullDesc ? "Lire moins ↑" : "Lire plus ↓"}
                    </button>
                  )}
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Équipements */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Les plus du logement</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {accommodation.equipements.map((eq) => (
                      <div key={eq.label} className="flex items-center gap-3 text-sm text-gray-700">
                        <EquipIcon type={eq.icon} />
                        {eq.label}
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 rounded-xl border border-gray-900 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
                    Afficher les 14 équipements
                  </button>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Services disponibles */}
                <div>
                  <h3 className="mb-5 text-lg font-bold text-gray-900">Services disponibles</h3>
                  <div className="space-y-3">
                    {accommodation.services.map((group) => (
                      <div key={group.category} className="rounded-xl border border-gray-200 p-4">
                        <p className="mb-2 text-sm font-bold text-gray-900">{group.category}</p>
                        {group.items.map((item) => (
                          <div key={item.label} className="flex justify-between py-1.5 text-sm text-gray-600">
                            <span>{item.label}</span>
                            <span className="font-medium text-gray-800">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-end">
                    <button className="rounded-xl border border-gray-900 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
                      Voir le détail des services
                    </button>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* L'offre packagée */}
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">L'offre packagée</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Choisissez votre formule ski et économisez par rapport aux tarifs en station. Tout est réservé à l'avance pour des vacances sereines et sans stress.
                  </p>

                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <span>⛷</span> Choisissez votre formule
                  </div>

                  <div className="space-y-3">
                    {accommodation.formules.map((f) => (
                      <div
                        key={f.id}
                        className={[
                          "rounded-xl border p-4 transition",
                          f.available
                            ? selectedFormule === f.id
                              ? "border-[#1a2e4a] bg-gray-50"
                              : "border-gray-200 hover:border-gray-300 cursor-pointer"
                            : "border-gray-200 bg-gray-50 opacity-75",
                        ].join(" ")}
                        onClick={() => f.available && setSelectedFormule(f.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={["font-semibold text-sm", f.available ? "text-gray-900" : "text-gray-400"].join(" ")}>
                              {f.label}
                            </p>
                            <div className="mt-1.5 space-y-0.5">
                              {f.details.map((d, i) => (
                                <div key={d} className="flex items-center gap-2 text-xs">
                                  {f.available ? (
                                    i === 0 ? (
                                      <CheckCircle className="h-3.5 w-3.5 text-gray-500" />
                                    ) : (
                                      <XCircle className="h-3.5 w-3.5 text-gray-300" />
                                    )
                                  ) : (
                                    <XCircle className="h-3.5 w-3.5 text-gray-300" />
                                  )}
                                  <span className={f.available && i === 0 ? "text-gray-600" : "text-gray-400 line-through"}>
                                    {d}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {f.available && f.prix ? (
                            <div className="text-right">
                              <div className="flex items-baseline gap-1.5 justify-end">
                                <span className="text-sm text-gray-400 line-through">{f.prixBarré} €</span>
                                <span className="text-lg font-bold text-gray-900">{f.prix} €</span>
                              </div>
                              <p className="text-xs font-semibold text-green-600">Vous économisez {f.economie} €</p>
                              <button className="mt-2 rounded-lg bg-[#1a2e4a] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition">
                                Sélectionné
                              </button>
                            </div>
                          ) : (
                            <div className="text-right">
                              <p className="text-xs font-semibold text-red-500">non disponible</p>
                              <p className="text-xs text-red-500">pour ces dates</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Gamme */}
                <div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">Gamme</h3>
                  <p className="font-semibold text-gray-900">{accommodation.gamme.niveau}</p>
                  <p className="mt-1 text-sm text-gray-600">{accommodation.gamme.description}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">Services inclus :</p>
                  {accommodation.gamme.services.map((s) => (
                    <p key={s} className="mt-1 text-sm text-gray-600">✓ {s}</p>
                  ))}
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Infos complémentaires */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Informations complémentaires</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-5 w-5 text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Caution</p>
                        <p className="text-sm text-gray-600">{accommodation.infosComplementaires.caution}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="mt-0.5 h-5 w-5 text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">N° d'enregistrement</p>
                        <p className="text-sm text-gray-600">{accommodation.infosComplementaires.numeroEnregistrement}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Localisation */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Localisation</h3>

                  {/* Carte placeholder */}
                  <div className="relative mb-5 h-[300px] overflow-hidden rounded-xl bg-gray-200">
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      Carte OpenStreetMap
                    </div>
                    <button className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow hover:bg-gray-50 transition">
                      <input type="checkbox" className="h-3 w-3" />
                      Afficher les pistes
                    </button>
                  </div>

                  {/* Distances */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-900">Distances</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {accommodation.localisation.distances.map((d) => (
                      <p key={d.label} className="text-sm text-gray-700">
                        {d.label} : <strong>{d.value}</strong>
                      </p>
                    ))}
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Résidence */}
                <div className="grid grid-cols-[1fr_1fr] gap-8 items-center">
                  <div className="overflow-hidden rounded-xl bg-gray-200 aspect-[4/3]">
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {accommodation.residence.nom}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {accommodation.residence.description}
                    </p>
                  </div>
                </div>
                <hr className="mt-6 border-gray-200" />

                {/* Notre agence locale */}
                <div>
                  <h3 className="mb-5 text-lg font-bold text-gray-900">Notre agence locale</h3>
                  <div className="grid grid-cols-[1fr_1fr] gap-8 items-start">
                    {/* Carte agence */}
                    <div className="rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center">
                      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 mb-3">
                        <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{accommodation.agence.nom}</p>
                    </div>

                    {/* Infos agence */}
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{accommodation.agence.question}</p>
                      <p className="text-sm text-gray-600 mb-3">{accommodation.agence.description}</p>
                      <p className="text-sm font-bold text-gray-800">
                        Référence produit : {accommodation.agence.reference}
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-800">{accommodation.agence.telephone}</p>
                    </div>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* À propos de la station */}
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    À propos de la station - {accommodation.station.nom}
                  </h3>
                  <h4 className="mb-3 font-semibold text-gray-800">Le domaine skiable</h4>

                  <div className="grid grid-cols-2 gap-8">
                    {/* Description */}
                    <p className="text-sm leading-relaxed text-gray-600">
                      {accommodation.station.domaine.description}
                    </p>

                    {/* Stats */}
                    <div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <span>⛷</span> {accommodation.station.domaine.km} de km de pistes
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <span>△</span> {accommodation.station.domaine.pistes} pistes skiables
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <span>⇅</span> {accommodation.station.domaine.remontees} remontées mécaniques
                        </div>
                      </div>

                      {/* Altitudes */}
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-gray-500 text-right">
                          <div className="font-semibold text-gray-700 mb-1">Dénivelé</div>
                          <div>{accommodation.station.domaine.denivele} mètres</div>
                        </div>
                        {/* Montagne stylisée */}
                        <svg viewBox="0 0 80 60" className="h-14 w-14" fill="none">
                          <polyline
                            points="5,55 35,5 65,55"
                            stroke="#1a2e4a"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <line x1="65" y1="55" x2="75" y2="35" stroke="#1a2e4a" strokeWidth="1.5" />
                          <circle cx="35" cy="5" r="2" fill="#d97706" />
                          <circle cx="65" cy="55" r="2" fill="#d97706" />
                        </svg>
                        <div className="text-xs space-y-3">
                          <div>
                            <p className="text-gray-400">──── Altitude max</p>
                            <p className="font-semibold text-gray-700">{accommodation.station.domaine.altitudeMax} mètres</p>
                          </div>
                          <div>
                            <p className="text-gray-400">──── Altitude station</p>
                            <p className="font-semibold text-gray-700">{accommodation.station.domaine.altitudeStation} mètres</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Couleurs de pistes */}
                  <div className="mt-4 flex items-center gap-6 flex-wrap">
                    {[
                      { count: accommodation.station.domaine.pistesVertes, label: "pistes vertes", color: "border-green-500 text-green-600" },
                      { count: accommodation.station.domaine.pistesBleues, label: "pistes bleues", color: "border-blue-500 text-blue-600" },
                      { count: accommodation.station.domaine.pistesRouges, label: "pistes rouges", color: "border-red-500 text-red-600" },
                      { count: accommodation.station.domaine.pistesNoires, label: "pistes noires", color: "border-gray-900 text-gray-900" },
                    ].map((p) => (
                      <div key={p.label} className="flex items-center gap-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${p.color}`}>
                          {p.count}
                        </span>
                        <span className="text-xs text-gray-600">{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* COLONNE DROITE — Sticky sidebar ─────────── */}
              <div className="hidden lg:block">
                <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">

                  {/* Dates */}
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-bold text-gray-900">Dates</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">11 avr. 2026 - 18 avr. 2026</p>
                    </div>
                    <button
                      onClick={() => setShowCalendar(true)}
                      className="rounded-lg border border-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition"
                    >
                      Modifier
                    </button>
                  </div>

                  {/* Participants */}
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-bold text-gray-900">Participants</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">2 Adultes</p>
                    </div>
                    <button
                      onClick={() => setShowParticipants(true)}
                      className="rounded-lg border border-gray-900 px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50 transition"
                    >
                      Modifier
                    </button>
                  </div>

                  {/* Choisissez votre formule */}
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span>⛷</span> Choisissez votre formule
                  </p>

                  <div className="space-y-2">
                    {/* Formule hébergement (disponible) */}
                    <div className="rounded-xl border border-[#1a2e4a] bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Formule hébergement</p>
                          <p className="text-xs text-gray-500 mt-0.5">Hébergement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">482 €</p>
                          <p className="text-xs text-gray-400 line-through">528 €</p>
                        </div>
                      </div>
                    </div>

                    {/* Formule ski (indisponible) */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Formule ski</p>
                          <p className="text-xs text-gray-400 mt-0.5">Hébergement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-red-500">non disponible</p>
                          <p className="text-xs text-red-500">pour ces dates</p>
                        </div>
                      </div>
                    </div>

                    {/* Formule tout compris (indisponible) */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-400">Formule tout compris</p>
                          <p className="text-xs text-gray-400 mt-0.5">Hébergement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-red-500">non disponible</p>
                          <p className="text-xs text-red-500">pour ces dates</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Réserver */}
                  <button className="mt-5 w-full rounded-xl bg-[#1a2e4a] py-3.5 text-sm font-bold text-white transition hover:opacity-90">
                    Réserver
                  </button>

                  {/* Frais / Total */}
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Frais de dossier</span>
                      <span className="font-medium text-gray-800">24 €</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">Total</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">528 €</span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">-9%</span>
                        <span className="text-xl font-bold text-gray-900">482 €</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500">
                      <Shield className="h-3.5 w-3.5" />
                      Paiement 100% sécurisé
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
