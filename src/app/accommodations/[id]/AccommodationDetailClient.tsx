"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Accommodation } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  Heart,
  Camera,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  MapPin,
  Shield,
  Building2,
  Trees,
  ArrowLeft,
} from "lucide-react";

// ─── Calendar Modal ────────────────────────────────────────────────────────────

function CalendarModal({ onClose }: { onClose: () => void }) {
  const startDate = new Date(2026, 3, 11);
  const endDate = new Date(2026, 3, 18);

  const months = [
    { name: "avril 2026", year: 2026, month: 3 },
    { name: "mai 2026", year: 2026, month: 4 },
  ];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

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
            const cells = Array(firstDay)
              .fill(null)
              .concat(Array.from({ length: days }, (_, i) => i + 1));

            return (
              <div key={m.name}>
                <p className="mb-3 text-center text-sm font-semibold text-gray-600">{m.name}</p>
                <div className="grid grid-cols-7 gap-y-1">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                    <div key={i} className="py-1 text-center text-xs font-medium text-gray-400">{d}</div>
                  ))}
                  {cells.map((day, i) => {
                    if (!day) return <div key={`e-${i}`} />;
                    const date = new Date(m.year, m.month, day);
                    const start = isStart(date);
                    const end = isEnd(date);
                    const inRange = isInRange(date);
                    return (
                      <div
                        key={day}
                        className={[
                          "flex h-9 w-9 items-center justify-center text-sm font-medium cursor-pointer",
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
            className="rounded-xl bg-[#1a2e4a] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
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
          {[
            { label: "Adulte", sub: "18 ans et plus", value: adults, set: setAdults, min: 1 },
            { label: "Enfants", sub: "Moins de 18 ans", value: children, set: setChildren, min: 0 },
          ].map(({ label, sub, value, set, min }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => set(Math.max(min, value - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
                >
                  <span className="text-xl leading-none text-gray-600">−</span>
                </button>
                <span className="w-4 text-center font-semibold">{value}</span>
                <button
                  onClick={() => set(value + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition"
                >
                  <span className="text-xl leading-none text-gray-600">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#1a2e4a] py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

// ─── Main Client Component ─────────────────────────────────────────────────────

export default function AccommodationDetailClient({
  accommodation,
}: {
  accommodation: Accommodation;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isFavorite, setIsFavorite] = useState(accommodation.isFavorite);

  const {
    id,
    name,
    images,
    capacity,
    bedrooms,
    bathrooms,
    surface,
    amenities,
    price,
    badges,
    description,
    location,
    distanceToSlopes,
  } = accommodation;

  const pieces = bedrooms === 0 ? 1 : bedrooms + 1;
  const discountValue = badges.find((b) => b.type === "discount" && b.value);
  const descLines = (description ?? "").split("\n");
  const shortDesc = descLines.slice(0, 6).join("\n");

  const typeLabel =
    accommodation.type === "studio"
      ? "Studio"
      : accommodation.type === "chalet"
      ? "Chalet"
      : "Appartement";

  return (
    <>
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      {showParticipants && <ParticipantsModal onClose={() => setShowParticipants(false)} />}

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-white">
          <div className="mx-auto max-w-[1216px] px-4 py-8 md:px-8">

            {/* Retour */}
            <Link
              href="/search"
              className="mb-5 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux résultats
            </Link>

            {/* Titre */}
            <div className="mb-5 flex items-start justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <button
                onClick={() => setIsFavorite((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                <span className="underline underline-offset-2">Ajouter</span>
              </button>
            </div>

            {/* Galerie */}
            <div className="mb-8 grid h-[340px] grid-cols-3 gap-2 overflow-hidden rounded-2xl">
              <div className="col-span-1 row-span-2 overflow-hidden bg-gray-200">
                {images[0] ? (
                  <img src={images[0]} alt={name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden bg-gray-200">
                  {images[i] ? (
                    <img src={images[i]} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  {i === 4 && (
                    <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-800 shadow hover:bg-gray-50 transition">
                      <Camera className="h-4 w-4" />
                      Voir toutes les photos
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Contenu principal */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

              {/* Colonne gauche */}
              <div className="space-y-8">

                {/* Sous-titre */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {typeLabel} · {location.station}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {capacity.total} voyageurs · {surface} m² · {pieces} pièce{pieces > 1 ? "s" : ""} · {bathrooms} salle{bathrooms > 1 ? "s" : ""} de bain
                  </p>
                  <hr className="mt-4 border-gray-200" />
                </div>

                {/* Description */}
                <div>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
                    {showFullDesc ? description : shortDesc + (descLines.length > 6 ? "..." : "")}
                  </pre>
                  {descLines.length > 6 && (
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
                    {amenities.slice(0, 6).map((eq) => (
                      <div key={eq.id} className="flex items-center gap-3 text-sm text-gray-700">
                        <Trees className="h-5 w-5 text-gray-400 shrink-0" />
                        {eq.name ?? eq.id}
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 rounded-xl border border-gray-900 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
                    Afficher tous les équipements
                  </button>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Services disponibles */}
                <div>
                  <h3 className="mb-5 text-lg font-bold text-gray-900">Services disponibles</h3>
                  <div className="space-y-3">
                    {[
                      { category: "Parking", items: [{ label: "Emplacement parking couvert", price: "95 €" }, { label: "Garage-Box-Parking", price: "95 €" }] },
                      { category: "Entretien et propreté", items: [{ label: "Ménage fin de séjour", price: "56 €" }] },
                      { category: "Linge de maison", items: [{ label: "Kit linge de lit 1 personne", price: "17 €" }, { label: "Kit linge de lit 2 personnes", price: "20 €" }, { label: "Kit toilette (drap de bain+serviette)", price: "9 €" }] },
                      { category: "Équipements supplémentaires", items: [{ label: "Chaise haute bébé", price: "22 €" }, { label: "Lit parapluie pour bébé", price: "22 €" }] },
                      { category: "Autres services", items: [{ label: "Supplément animal", price: "36 €" }] },
                    ].map((group) => (
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
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">⛷ Choisissez votre formule</p>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-[#1a2e4a] bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Formule hébergement</p>
                          <div className="mt-1.5 space-y-0.5">
                            {["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"].map((d, i) => (
                              <div key={d} className="flex items-center gap-2 text-xs">
                                {i === 0 ? <CheckCircle className="h-3.5 w-3.5 text-gray-500" /> : <XCircle className="h-3.5 w-3.5 text-gray-300" />}
                                <span className={i === 0 ? "text-gray-600" : "text-gray-400 line-through"}>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          {price.originalAmount && (
                            <div className="flex items-baseline gap-1.5 justify-end">
                              <span className="text-sm text-gray-400 line-through">{formatPrice(price.originalAmount)}</span>
                              <span className="text-lg font-bold text-gray-900">{formatPrice(price.amount)}</span>
                            </div>
                          )}
                          {discountValue?.value && (
                            <p className="text-xs font-semibold text-green-600">Vous économisez {discountValue.value}</p>
                          )}
                          <button className="mt-2 rounded-lg bg-[#1a2e4a] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition">
                            Sélectionné
                          </button>
                        </div>
                      </div>
                    </div>
                    {["Formule ski", "Formule tout compris"].map((label) => (
                      <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-400">{label}</p>
                            <div className="mt-1.5 space-y-0.5">
                              {["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"].map((d) => (
                                <div key={d} className="flex items-center gap-2 text-xs">
                                  <XCircle className="h-3.5 w-3.5 text-gray-300" />
                                  <span className="text-gray-400 line-through">{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-red-500">non disponible</p>
                            <p className="text-xs text-red-500">pour ces dates</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Gamme */}
                <div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900">Gamme</h3>
                  <p className="font-semibold text-gray-900">Essentielle</p>
                  <p className="mt-1 text-sm text-gray-600">Des logements fonctionnels, centrés sur l'essentiel, pour des vacances à prix doux.</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">Services inclus :</p>
                  <p className="mt-1 text-sm text-gray-600">✓ Kit entretien</p>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Informations complémentaires */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Informations complémentaires</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-5 w-5 text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Caution</p>
                        <p className="text-sm text-gray-600">300 €</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="mt-0.5 h-5 w-5 text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">N° d'enregistrement</p>
                        <p className="text-sm text-gray-600">n°</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Localisation */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Localisation</h3>
                  <div className="relative mb-5 h-[300px] overflow-hidden rounded-xl bg-gray-200">
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      Carte OpenStreetMap — {location.station}
                    </div>
                    <label className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow cursor-pointer hover:bg-gray-50 transition">
                      <input type="checkbox" className="h-3 w-3" />
                      Afficher les pistes
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-900">Distances</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <p className="text-sm text-gray-700">Distance des commerces : <strong>50 m</strong></p>
                    <p className="text-sm text-gray-700">Distance ESF : <strong>350 m</strong></p>
                    <p className="text-sm text-gray-700">Distance des pistes : <strong>{distanceToSlopes} m</strong></p>
                    <p className="text-sm text-gray-700">Distance du centre ville : <strong>600 m</strong></p>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* Résidence */}
                <div className="grid grid-cols-2 gap-8 items-center">
                  <div className="overflow-hidden rounded-xl bg-gray-200 aspect-[4/3]">
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Résidence</p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      Résidence située dans le quartier de {location.station} à environ 250 mètres du départ des pistes et des rassemblements d'écoles de ski et à proximité immédiate des commerces.
                    </p>
                  </div>
                </div>
                <hr className="mt-6 border-gray-200" />

                {/* Notre agence locale */}
                <div>
                  <h3 className="mb-5 text-lg font-bold text-gray-900">Notre agence locale</h3>
                  <div className="grid grid-cols-2 gap-8 items-start">
                    <div className="rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center">
                      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 mb-3">
                        <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800">Mountain Collection - {location.station}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Une question ? Besoin d'un conseil ?</p>
                      <p className="text-sm text-gray-600 mb-3">
                        Notre agence est à votre écoute pour vous fournir toutes les informations nécessaires sur cet hébergement et vous accompagner dans la création de vacances.
                      </p>
                      <p className="text-sm font-bold text-gray-800">Référence produit : {id.toUpperCase()}</p>
                      <p className="mt-1 text-sm font-bold text-gray-800">0450904670</p>
                    </div>
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>

                {/* À propos de la station */}
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">À propos de la station - {location.station}</h3>
                  <h4 className="mb-3 font-semibold text-gray-800">Le domaine skiable</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <p className="text-sm leading-relaxed text-gray-600">
                      Le domaine skiable se situe au cœur des Alpes françaises. Avec plus de 260 kilomètres de pistes culminant à 2 500 mètres d'altitude, il offre un terrain de glisse varié adapté à tous les niveaux. Les panoramas y sont spectaculaires et les paysages alternent entre forêts, alpages et combes naturelles.
                    </p>
                    <div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-700"><span>⛷</span> 265 km de pistes</div>
                        <div className="flex items-center gap-3 text-sm text-gray-700"><span>△</span> 148 pistes skiables</div>
                        <div className="flex items-center gap-3 text-sm text-gray-700"><span>⇅</span> 62 remontées mécaniques</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-gray-500 text-right">
                          <div className="font-semibold text-gray-700 mb-1">Dénivelé</div>
                          <div>1800 mètres</div>
                        </div>
                        <svg viewBox="0 0 80 60" className="h-14 w-14" fill="none">
                          <polyline points="5,55 35,5 65,55" stroke="#1a2e4a" strokeWidth="1.5" fill="none" />
                          <line x1="65" y1="55" x2="75" y2="35" stroke="#1a2e4a" strokeWidth="1.5" />
                          <circle cx="35" cy="5" r="2" fill="#d97706" />
                          <circle cx="65" cy="55" r="2" fill="#d97706" />
                        </svg>
                        <div className="text-xs space-y-3">
                          <div>
                            <p className="text-gray-400">──── Altitude max</p>
                            <p className="font-semibold text-gray-700">2500 mètres</p>
                          </div>
                          <div>
                            <p className="text-gray-400">──── Altitude station</p>
                            <p className="font-semibold text-gray-700">{location.altitude} mètres</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-6 flex-wrap">
                    {[
                      { count: 20, label: "pistes vertes", color: "border-green-500 text-green-600" },
                      { count: 64, label: "pistes bleues", color: "border-blue-500 text-blue-600" },
                      { count: 50, label: "pistes rouges", color: "border-red-500 text-red-600" },
                      { count: 14, label: "pistes noires", color: "border-gray-900 text-gray-900" },
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

              {/* Colonne droite — sticky sidebar */}
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

                  {/* Formules */}
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">⛷ Choisissez votre formule</p>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-[#1a2e4a] bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Formule hébergement</p>
                          <p className="text-xs text-gray-500 mt-0.5">Hébergement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{formatPrice(price.amount)}</p>
                          {price.originalAmount && (
                            <p className="text-xs text-gray-400 line-through">{formatPrice(price.originalAmount)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {["Formule ski", "Formule tout compris"].map((label) => (
                      <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-gray-400">{label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Hébergement</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-red-500">non disponible</p>
                            <p className="text-xs text-red-500">pour ces dates</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Réserver */}
                  <button className="mt-5 w-full rounded-xl bg-[#1a2e4a] py-3.5 text-sm font-bold text-white hover:opacity-90 transition">
                    Réserver
                  </button>

                  {/* Total */}
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Frais de dossier</span>
                      <span className="font-medium text-gray-800">24 €</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">Total</span>
                      <div className="flex items-center gap-2">
                        {price.originalAmount && (
                          <span className="text-sm text-gray-400 line-through">{formatPrice(price.originalAmount)}</span>
                        )}
                        {discountValue?.value && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                            {discountValue.value}
                          </span>
                        )}
                        <span className="text-xl font-bold text-gray-900">{formatPrice(price.amount)}</span>
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
