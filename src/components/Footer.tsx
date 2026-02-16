import Link from "next/link";
import { Mountain, Facebook, Instagram, Twitter } from 'lucide-react';


export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-gray-200">
      <div className="mx-auto max-w-[1216px] px-4 py-8 md:px-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold">
              Recevez nos actus et nos bons plans ski
            </h2>
            <p className="text-sm text-[var(--ts-mid-grey)]">
              Offres, actus et bons plans ski, directement dans votre boîte mail.
            </p>
          </div>
          <div>
            <form className="flex flex-col gap-2 md:flex-row">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="min-h-[46px] flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ts-mid-blue)]"
              />
              <button
                type="submit"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-50"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-6 text-sm md:grid-cols-3 lg:grid-cols-5">
          <div>
            <div className="mb-2 font-bold">Suivez-nous</div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <div className="mb-2 font-bold">Nos espaces</div>
            <div className="flex flex-col gap-1 text-[var(--ts-mid-grey)]">
              <Link href="#" className="hover:text-[var(--ts-mid-blue)]">
                Espace propriétaire
              </Link>
              <Link href="#" className="hover:text-[var(--ts-mid-blue)]">
                Espace Syndic
              </Link>
              <Link href="#" className="hover:text-[var(--ts-mid-blue)]">
                Espace TO
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-2 font-bold">Groupe Compagnie des Alpes</div>
            <div className="flex flex-col gap-1 text-[var(--ts-mid-grey)]">
              <a href="#" className="hover:text-[var(--ts-mid-blue)]">
                Recrutement CDI
              </a>
              <a href="#" className="hover:text-[var(--ts-mid-blue)]">
                Recrutement Saisonniers
              </a>
              <a href="#" className="hover:text-[var(--ts-mid-blue)]">
                Travelski
              </a>
              <a href="#" className="hover:text-[var(--ts-mid-blue)]">
                MMV
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-gray-200 pt-6">
          <Link
            href="#"
            className="text-xs font-medium text-[var(--ts-mid-grey)] hover:text-[var(--ts-mid-blue)]"
          >
            Mentions légales
          </Link>
          <Link
            href="#"
            className="text-xs font-medium text-[var(--ts-mid-grey)] hover:text-[var(--ts-mid-blue)]"
          >
            Conditions générales de vente
          </Link>
          <Link
            href="#"
            className="text-xs font-medium text-[var(--ts-mid-grey)] hover:text-[var(--ts-mid-blue)]"
          >
            Confidentialité
          </Link>
          <Link
            href="#"
            className="text-xs font-medium text-[var(--ts-mid-grey)] hover:text-[var(--ts-mid-blue)]"
          >
            Gestion des cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
