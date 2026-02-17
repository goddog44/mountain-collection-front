"use client";

import { HelpCircle, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalView = "signup" | "login" | null;

// ─── Google Icon ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// ─── Facebook Icon ────────────────────────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────

function AuthModal({
  view,
  onClose,
  onSwitch,
}: {
  view: "signup" | "login";
  onClose: () => void;
  onSwitch: (v: "signup" | "login") => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = view === "signup";

  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#dce8f5]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={isSignup ? "Créer un compte" : "Se connecter"}
    >
      <div className="relative w-full max-w-[540px] rounded-2xl bg-white px-12 py-10 shadow-xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          {isSignup ? "Créez votre compte" : "Connexion"}
        </h2>

        {/* Subtitle */}
        <p className="mb-6 text-center text-sm leading-relaxed text-gray-500">
          {isSignup ? (
            <>
              En vous inscrivant, conservez vos favoris, suivez vos recherches
              <br />
              et construisez votre prochain séjour en toute simplicité.
              <br />
              <span className="text-gray-400">Ou connectez vous directement avec l'un de nos services partenaires</span>
            </>
          ) : (
            <>
              <strong className="text-gray-700">Accédez à votre espace voyageur.</strong>
              <br />
              En vous connectant, conservez vos favoris, suivez
              <br />
              vos recherches et construisez votre prochain séjour.
            </>
          )}
        </p>

        {/* Social buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
          >
            <FacebookIcon />
            Continuer avec Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Ou</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[var(--ts-mid-blue)] focus:ring-2 focus:ring-[var(--ts-mid-blue)]/20 transition-all"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[var(--ts-mid-blue)] focus:ring-2 focus:ring-[var(--ts-mid-blue)]/20 transition-all"
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-[var(--ts-mid-blue)] py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {isSignup ? "Inscription" : "Connexion"}
        </button>

        {/* Footer link */}
        {isSignup ? (
          <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
            En vous inscrivant, vous acceptez et reconnaissez avoir pris connaissance de notre{" "}
            <a href="#" className="underline hover:text-gray-600">
              politique de gestion des données personnelles
            </a>
            .
          </p>
        ) : (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm font-semibold underline text-gray-700 hover:text-gray-900"
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}

        {/* Switch view */}
        <p className="mt-5 text-center text-sm text-gray-500">
          {isSignup ? (
            <>
              Déjà un compte ?{" "}
              <button
                type="button"
                onClick={() => onSwitch("login")}
                className="font-semibold text-[var(--ts-mid-blue)] underline hover:opacity-80"
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={() => onSwitch("signup")}
                className="font-semibold text-[var(--ts-mid-blue)] underline hover:opacity-80"
              >
                Créer un compte
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// ─── User Dropdown Menu ───────────────────────────────────────────────────────

function UserDropdown({
  onOpenModal,
  onClose,
}: {
  onOpenModal: (v: "signup" | "login") => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute right-0 top-full z-[1500] mt-2 w-72 rounded-2xl bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.14)] overflow-hidden">
      {/* Account section */}
      <div className="bg-[#f0f4fa] px-5 py-5">
        <p className="mb-1 text-base font-bold text-gray-900">Mon compte</p>
        <p className="mb-4 text-sm leading-snug text-gray-500">
          En vous connectant, conservez vos favoris, suivez vos recherches et construisez votre prochain séjour.
        </p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => { onOpenModal("signup"); onClose(); }}
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Créez votre compte
          </button>
          <button
            type="button"
            onClick={() => { onOpenModal("login"); onClose(); }}
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Se connecter
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Preferences section */}
      <div className="px-5 py-4">
        <p className="mb-3 text-sm font-bold text-gray-900">Préférences</p>
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <span className="text-base leading-none">🇫🇷</span>
          Langues (FR)
        </button>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <HelpCircle className="h-4 w-4 text-gray-400" />
          Centre d'aide
        </a>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Other spaces */}
      <div className="px-5 py-4">
        <p className="mb-3 text-sm font-bold text-gray-900">Les autres espaces</p>
        <a
          href="https://resa.alpes-skiresa.com/mountaincollection/fr-FR/Account/Login?ReturnUrl=~%2Ffr-FR%2FOwner"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center rounded-lg px-1 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Espace propriétaire
        </a>
        <a
          href="https://mountaincollection.monespaceclient.immo/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center rounded-lg px-1 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Espace copropriétaire
        </a>
        <a
          href="https://resa.alpes-skiresa.com/mountaincollection/fr-FR/Account/Login?ReturnUrl=~%2Ffr-FR%2FTourOperator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center rounded-lg px-1 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          Espace TO
        </a>
      </div>
    </div>
  );
}

// ─── Main UserMenu ─────────────────────────────────────────────────────────────

export default function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors hover:opacity-90"
          aria-label="Mon compte"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <User className="h-5 w-5 text-black" />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <UserDropdown
            onOpenModal={(v) => setModalView(v)}
            onClose={() => setDropdownOpen(false)}
          />
        )}
      </div>

      {/* Auth modal */}
      {modalView && (
        <AuthModal
          view={modalView}
          onClose={() => setModalView(null)}
          onSwitch={(v) => setModalView(v)}
        />
      )}
    </>
  );
}
