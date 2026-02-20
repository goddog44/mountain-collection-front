"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Accommodation } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchApi } from "@/lib/api";
import PaymentModal from "@/components/PaymentModal";
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
  X,
  CreditCard,
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
  const [showAlbum, setShowAlbum] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<"hebergement" | "ski" | "all">("hebergement");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle");
  const [bookingErrorMessage, setBookingErrorMessage] = useState("");

  const { isAuthenticated } = useAuthStore();

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

  const PACKAGE_PRICES = {
    hebergement: 0,
    ski: 160,
    all: 290
  };

  const AVAILABLE_SERVICES = [
    { id: "cat1", category: "Parking", items: [{ id: "srv1", label: "Emplacement parking couvert", price: 95 }] },
    { id: "cat2", category: "Entretien et propreté", items: [{ id: "srv2", label: "Ménage fin de séjour", price: 56 }] },
    { id: "cat3", category: "Linge de maison", items: [{ id: "srv3", label: "Kit linge de lit 1 pers", price: 17 }, { id: "srv4", label: "Kit linge de lit 2 pers", price: 20 }, { id: "srv5", label: "Kit toilette", price: 9 }] },
    { id: "cat4", category: "Équipements supplémentaires", items: [{ id: "srv6", label: "Chaise haute bébé", price: 22 }, { id: "srv7", label: "Lit parapluie pour bébé", price: 22 }] },
    { id: "cat5", category: "Autres services", items: [{ id: "srv8", label: "Supplément animal", price: 36 }] },
  ];

  const calculateServicesTotal = () => {
    let total = 0;
    AVAILABLE_SERVICES.forEach(cat => {
      cat.items.forEach(item => {
        if (selectedServices.includes(item.id)) total += item.price;
      });
    });
    return total;
  };

  const finalTotalPrice = price.amount + 24 + calculateServicesTotal() + PACKAGE_PRICES[selectedPackage];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(prev => prev.filter(s => s !== id));
    } else {
      setSelectedServices(prev => [...prev, id]);
    }
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter via le menu en haut à droite pour réserver.");
      return;
    }
    setShowPayment(true);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    setBookingStatus("idle");
    setBookingErrorMessage("");

    try {
      await fetchApi("/bookings/", {
        method: "POST",
        requireAuth: true,
        body: JSON.stringify({
          accommodation_id: id,
          check_in: "2026-04-11",
          check_out: "2026-04-18",
          adults: 2,
          children: 0,
          total_price: finalTotalPrice,
        })
      });

      setBookingStatus("success");
    } catch (e: any) {
      setBookingStatus("error");
      setBookingErrorMessage(e.message || "Une erreur est survenue lors de la réservation.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      {showParticipants && <ParticipantsModal onClose={() => setShowParticipants(false)} />}

      {/* Success/Error Booking Modals */}
      {bookingStatus === "success" && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#dce8f5]/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h2 className="mb-2 text-xl font-bold text-gray-900">Réservation confirmée !</h2>
            <p className="mb-6 text-sm text-gray-600">
              Votre séjour au ski est bien enregistré. Retrouvez toutes les informations dans votre espace compte.
            </p>
            <button
              onClick={() => setBookingStatus("idle")}
              className="w-full rounded-xl bg-[#1a2e4a] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Voir ma réservation
            </button>
          </div>
        </div>
      )}

      {bookingStatus === "error" && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-1/2 max-w-sm rounded-md bg-white p-8 shadow-xl text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h2 className="mb-2 text-xl font-bold text-gray-900">Oops !</h2>
            <p className="mb-6 text-sm text-gray-600">
              {bookingErrorMessage}
            </p>
            <button
              onClick={() => setBookingStatus("idle")}
              className="w-full rounded-xl border border-gray-300 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Album Modal */}
      {showAlbum && (
        <div className="fixed inset-0 z-[2000] flex flex-col bg-black/95 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 flex-shrink-0">
            <span className="text-white font-medium pl-2">{name} - Galerie Photos</span>
            <button onClick={() => setShowAlbum(false)} className="rounded-full p-2 text-white hover:bg-white/20 transition">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-6 pb-20">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt={`${name} ${idx + 1}`} className="max-w-[900px] w-full rounded-lg shadow-xl" />
            ))}
          </div>
        </div>
      )}

      {showPayment && !["success", "error"].includes(bookingStatus) && (
        <PaymentModal
          finalTotalPrice={finalTotalPrice}
          price={price}
          selectedPackage={selectedPackage}
          calculateServicesTotal={calculateServicesTotal}
          isBooking={isBooking}
          onClose={() => setShowPayment(false)}
          onConfirm={handleConfirmPayment}
        />
      )}

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
                  <img src={images[0]} onClick={() => setShowAlbum(true)} alt={name} className="h-full w-full object-cover cursor-pointer hover:opacity-90 transition" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden bg-gray-200">
                  {images[i] ? (
                    <img src={images[i]} onClick={() => setShowAlbum(true)} alt={`${name} ${i + 1}`} className="h-full w-full object-cover cursor-pointer hover:opacity-90 transition" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  {i === 4 && (
                    <button onClick={() => setShowAlbum(true)} className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-800 shadow hover:bg-gray-50 transition">
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
                    {AVAILABLE_SERVICES.map((group) => (
                      <div key={group.category} className="rounded-xl border border-gray-200 p-4">
                        <p className="mb-2 text-sm font-bold text-gray-900">{group.category}</p>
                        {group.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-1.5 text-sm text-gray-600">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(item.id)}
                                onChange={() => toggleService(item.id)}
                                className="h-4 w-4 rounded border-gray-300 text-[#1a2e4a] focus:ring-[#1a2e4a]"
                              />
                              <span className="select-none">{item.label}</span>
                            </label>
                            <span className="font-medium text-gray-800">{item.price} €</span>
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
                    {[
                      { id: "hebergement", title: "Formule hébergement", desc: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"], activeChecks: [0], price: 0 },
                      { id: "ski", title: "Formule ski", desc: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"], activeChecks: [0, 1], price: PACKAGE_PRICES.ski },
                      { id: "all", title: "Formule tout compris", desc: ["Hébergement 7 nuits", "Forfait 6 jours", "Matériel de ski 6 jours"], activeChecks: [0, 1, 2], price: PACKAGE_PRICES.all },
                    ].map((pkg) => {
                      const isActive = selectedPackage === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id as any)}
                          className={`cursor-pointer rounded-xl border relative p-4 transition ${isActive ? "border-[#1a2e4a] bg-blue-50/50" : "border-gray-200 bg-gray-50 hover:border-[#1a2e4a] hover:bg-white"}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-bold text-gray-900">{pkg.title}</p>
                              <div className="mt-1.5 space-y-0.5">
                                {pkg.desc.map((d, i) => (
                                  <div key={d} className="flex items-center gap-2 text-xs">
                                    {pkg.activeChecks.includes(i) ? <CheckCircle className="h-3.5 w-3.5 text-blue-600" /> : <XCircle className="h-3.5 w-3.5 text-gray-300" />}
                                    <span className={pkg.activeChecks.includes(i) ? "text-gray-700 font-medium" : "text-gray-400 line-through"}>{d}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              {pkg.price > 0 && (
                                <p className="text-sm font-bold text-gray-900">+{pkg.price} €</p>
                              )}
                              {isActive && (
                                <button className="mt-2 rounded-lg bg-[#1a2e4a] px-4 py-1.5 text-xs font-semibold text-white transition pointer-events-none">
                                  Sélectionné
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                  <div className="relative mb-5 h-[300px] overflow-hidden rounded-xl bg-gray-200 group">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(location.station + " , France")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                    <div className="absolute inset-0 bg-transparent group-hover:pointer-events-none transition" />
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
                <div className="top-6 rounded-md border border-gray-200 bg-white p-6 shadow-lg">

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
                    {[
                      { id: "hebergement", title: "Formule hébergement" },
                      { id: "ski", title: "Formule ski", price: PACKAGE_PRICES.ski },
                      { id: "all", title: "Formule tout compris", price: PACKAGE_PRICES.all },
                    ].map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id as any)}
                        className={`cursor-pointer rounded-xl border p-4 transition ${selectedPackage === pkg.id ? "border-[#1a2e4a] bg-blue-50/50" : "border-gray-200 bg-gray-50 hover:bg-white"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{pkg.title}</p>
                            {pkg.price && <p className="text-xs text-gray-500 mt-0.5">+{pkg.price} €</p>}
                          </div>
                          <div className="text-right">
                            {selectedPackage === pkg.id ? (
                              <CheckCircle className="h-5 w-5 text-[#1a2e4a] inline" />
                            ) : (
                              <span className="text-sm text-gray-500 font-medium hover:text-[#1a2e4a]">Sélectionner</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Réserver */}
                  <button
                    onClick={handleBookingClick}
                    className="mt-5 w-full flex items-center justify-center rounded-xl bg-[#1a2e4a] py-3.5 text-sm font-bold text-white hover:opacity-90 transition"
                  >
                    Réserver
                  </button>

                  {/* Total */}
                  <div className="mt-4 space-y-2 border-t pt-4">
                    {calculateServicesTotal() > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Services</span>
                        <span className="font-medium text-gray-800">+{calculateServicesTotal()} €</span>
                      </div>
                    )}
                    {selectedPackage !== "hebergement" && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Package</span>
                        <span className="font-medium text-gray-800">+{PACKAGE_PRICES[selectedPackage]} €</span>
                      </div>
                    )}
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
                        <span className="text-xl font-bold text-gray-900">{formatPrice(finalTotalPrice)}</span>
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
