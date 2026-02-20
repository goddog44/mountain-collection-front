"use client";

import { useState } from "react";
import { X, CreditCard, Lock, ChevronRight, Copy, Check, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = "card" | "paypal" | "virement";
type CardBrand = "visa" | "mastercard" | "amex" | "unknown";

interface PaymentModalProps {
  finalTotalPrice: number;
  price: { amount: number };
  selectedPackage: string;
  calculateServicesTotal: () => number;
  isBooking: boolean;
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectCardBrand(number: string): CardBrand {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  return "unknown";
}

function formatCardNumber(value: string, brand: CardBrand): string {
  const digits = value.replace(/\D/g, "");
  if (brand === "amex") {
    // AMEX: 4-6-5
    return digits
      .slice(0, 15)
      .replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(" ")
      );
  }
  // Default: 4-4-4-4
  return digits
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

// ─── Card Brand SVG logos ─────────────────────────────────────────────────────

function VisaLogo() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto" fill="none">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto">
      <circle cx="15" cy="12" r="10" fill="#EB001B" />
      <circle cx="23" cy="12" r="10" fill="#F79E1B" />
      <path d="M19 5.27A10 10 0 0 1 23 12a10 10 0 0 1-4 6.73A10 10 0 0 1 15 12a10 10 0 0 1 4-6.73z" fill="#FF5F00" />
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto" fill="none">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="#2E77BC">AMEX</text>
    </svg>
  );
}

function CardLogo({ brand }: { brand: CardBrand }) {
  if (brand === "visa") return <VisaLogo />;
  if (brand === "mastercard") return <MastercardLogo />;
  if (brand === "amex") return <AmexLogo />;
  return <CreditCard className="h-5 w-5 text-gray-300" />;
}

// ─── PayPal Logo ──────────────────────────────────────────────────────────────

function PayPalLogo() {
  return (
    <svg viewBox="0 0 100 24" className="h-6 w-auto">
      <text x="0" y="18" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="#003087">Pay</text>
      <text x="34" y="18" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="#009cde">Pal</text>
    </svg>
  );
}

// ─── Revolut Logo ─────────────────────────────────────────────────────────────

function RevolutLogo() {
  return (
    <svg viewBox="0 0 100 24" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="#0a0a0a">Revolut</text>
    </svg>
  );
}

// ─── Copy button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="ml-2 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
    >
      {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copié" : "Copier"}
    </button>
  );
}

// ─── Main PaymentModal ────────────────────────────────────────────────────────

export default function PaymentModal({
  finalTotalPrice,
  price,
  selectedPackage,
  calculateServicesTotal,
  isBooking,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");

  // Card state
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardBrand, setCardBrand] = useState<CardBrand>("unknown");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brand = detectCardBrand(e.target.value);
    setCardBrand(brand);
    setCardNumber(formatCardNumber(e.target.value, brand));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };

  const maxCvcLength = cardBrand === "amex" ? 4 : 3;
  const maxCardLength = cardBrand === "amex" ? 17 : 19; // with spaces

  // ── RIB data ──
  const RIB = {
    titulaire: "RAYNA MAELLE TALOM MEFO",
    banque: "28233",
    agence: "00001",
    compte: "94622509845",
    cleRib: "67",
    iban: "FR7628233300019462250984567",
    bic: "REVOFRP2",
    domiciliation: "Revolut France, succursale de Revolut Bank UAB",
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-1/3 max-w-md rounded-2xl bg-white shadow-2xl flex flex-col max-h-[80vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#1B3D6B]" />
            <h2 className="text-lg font-bold text-gray-900">Paiement sécurisé</h2>
          </div>
          <button type="button" onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">

          {/* ── Order summary ── */}
          <div className="mb-5 rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm">
            <div className="flex justify-between text-gray-600 mb-1.5">
              <span>Hébergement</span>
              <span className="font-medium text-gray-900">{formatPrice(price.amount)}</span>
            </div>
            {selectedPackage !== "hebergement" && (
              <div className="flex justify-between text-gray-600 mb-1.5">
                <span>Package {selectedPackage}</span>
                <span className="font-medium text-gray-900">inclus</span>
              </div>
            )}
            {calculateServicesTotal() > 0 && (
              <div className="flex justify-between text-gray-600 mb-1.5">
                <span>Services optionnels</span>
                <span className="font-medium text-gray-900">+{calculateServicesTotal()} €</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 mb-1.5">
              <span>Frais de dossier</span>
              <span className="font-medium text-gray-900">+24 €</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#1B3D6B] text-base">{formatPrice(finalTotalPrice)}</span>
            </div>
          </div>

          {/* ── Payment method selector ── */}
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Mode de paiement</p>
            <div className="grid grid-cols-3 gap-2">
              {(["card", "paypal", "virement"] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={[
                    "flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-3 px-2 text-xs font-medium transition-all",
                    method === m
                      ? "border-[#1B3D6B] bg-[#1B3D6B]/5 text-[#1B3D6B]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white",
                  ].join(" ")}
                >
                  {m === "card" && <CreditCard className="h-5 w-5" />}
                  {m === "paypal" && <PayPalLogo />}
                  {m === "virement" && <RevolutLogo />}
                  <span className="text-[11px]">
                    {m === "card" ? "Carte" : m === "paypal" ? "PayPal" : "Virement"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════
              CARD FORM
          ════════════════════════════════════ */}
          {method === "card" && (
            <form onSubmit={onConfirm} className="space-y-4">

              {/* Card holder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Titulaire de la carte
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1B3D6B] focus:ring-2 focus:ring-[#1B3D6B]/20 transition-all"
                />
              </div>

              {/* Card number with brand detection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Numéro de carte
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={maxCardLength}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-14 text-sm outline-none focus:border-[#1B3D6B] focus:ring-2 focus:ring-[#1B3D6B]/20 transition-all tracking-wider font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <CardLogo brand={cardBrand} />
                  </div>
                </div>
                {/* Brand detected label */}
                {cardBrand !== "unknown" && (
                  <p className="mt-1 text-xs text-[#1B3D6B] font-medium flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Carte {cardBrand === "visa" ? "Visa" : cardBrand === "mastercard" ? "Mastercard" : "American Express"} détectée
                  </p>
                )}
              </div>

              {/* Expiry + CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Expiration
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/AA"
                    maxLength={5}
                    inputMode="numeric"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1B3D6B] focus:ring-2 focus:ring-[#1B3D6B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    CVC {cardBrand === "amex" && <span className="text-gray-400 font-normal">(4 chiffres)</span>}
                  </label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, maxCvcLength))}
                    placeholder={cardBrand === "amex" ? "0000" : "000"}
                    maxLength={maxCvcLength}
                    inputMode="numeric"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1B3D6B] focus:ring-2 focus:ring-[#1B3D6B]/20 transition-all"
                  />
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2.5 text-xs text-blue-700">
                <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>Vos données sont chiffrées SSL 256-bit. Nous ne stockons jamais vos informations de carte.</span>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1B3D6B] py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isBooking ? (
                  <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Payer {formatPrice(finalTotalPrice)}
                  </>
                )}
              </button>
            </form>
          )}

          {/* ════════════════════════════════════
              PAYPAL
          ════════════════════════════════════ */}
          {method === "paypal" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-medium text-gray-900 mb-1">Adresse PayPal du bénéficiaire</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 flex-1">
                    Kemskevin20@gmail.com
                  </span>
                  <CopyButton text="Kemskevin20@gmail.com" />
                </div>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm">
                <div className="flex items-start gap-2 text-amber-800">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold mb-1">Instructions importantes</p>
                    <ol className="space-y-1 text-amber-700 list-decimal list-inside">
                      <li>Connectez-vous à votre compte PayPal</li>
                      <li>Envoyez exactement <strong>{formatPrice(finalTotalPrice)}</strong></li>
                      <li>Mentionnez votre nom dans le message</li>
                      <li>Envoyez-nous la confirmation par email</li>
                    </ol>
                  </div>
                </div>
              </div>

              <a
                href={`https://www.paypal.com/paypalme/Kemskevin20`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0070BA] py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all"
              >
                <PayPalLogo />
                <span className="text-white ml-1">Payer {formatPrice(finalTotalPrice)} via PayPal</span>
              </a>

              <p className="text-center text-xs text-gray-400">
                Vous serez redirigé vers PayPal pour finaliser le paiement
              </p>
            </div>
          )}

          {/* ════════════════════════════════════
              VIREMENT REVOLUT
          ════════════════════════════════════ */}
          {method === "virement" && (
            <div className="space-y-4">
              {/* Revolut header */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Revolut</p>
                  <p className="text-xs text-gray-500">Virement bancaire sécurisé</p>
                </div>
              </div>

              {/* Titulaire */}
              <div className="rounded-xl border border-gray-100 p-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Titulaire du compte</p>
                  <p className="font-semibold text-gray-900">{RIB.titulaire}</p>
                </div>

                {/* IBAN */}
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">IBAN</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-900 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100 flex-1 break-all">
                      {RIB.iban}
                    </span>
                    <CopyButton text={RIB.iban} />
                  </div>
                </div>

                {/* BIC */}
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">BIC / SWIFT</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-900 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100">
                      {RIB.bic}
                    </span>
                    <CopyButton text={RIB.bic} />
                  </div>
                </div>

                {/* RIB details */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
                  {[
                    { label: "Code banque", value: RIB.banque },
                    { label: "Code agence", value: RIB.agence },
                    { label: "N° compte", value: RIB.compte },
                    { label: "Clé RIB", value: RIB.cleRib },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-gray-400 font-medium">{item.label}</p>
                      <p className="font-mono text-xs text-gray-800 font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 border-t border-gray-100 pt-2">
                  {RIB.domiciliation}
                </p>
              </div>

              {/* Amount to transfer */}
              <div className="rounded-xl border-2 border-[#1B3D6B]/20 bg-[#1B3D6B]/5 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Montant exact à virer</p>
                  <p className="text-xl font-bold text-[#1B3D6B]">{formatPrice(finalTotalPrice)}</p>
                </div>
                <CopyButton text={String(finalTotalPrice)} />
              </div>

              <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 text-xs text-amber-800">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600" />
                <span>Indiquez votre nom et numéro de réservation en référence. Votre réservation sera confirmée sous 24h après réception du virement.</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all"
              >
                <Check className="h-4 w-4" />
                J&apos;ai effectué le virement
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-center gap-4 flex-shrink-0">
          {["visa", "mastercard", "amex"].map((brand) => (
            <div key={brand} className="h-6">
              <CardLogo brand={brand as CardBrand} />
            </div>
          ))}
          <span className="text-gray-300">|</span>
          <PayPalLogo />
          <span className="text-gray-300">|</span>
          <RevolutLogo />
        </div>
      </div>
    </div>
  );
}
