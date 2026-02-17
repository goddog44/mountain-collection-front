import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { accommodations } from "@/data/accommodations";
import AccommodationGrid from "@/components/AccommodationGrid";
import SearchBar from "@/components/SearchBarHome";

export default function Home() {
  const featured = accommodations.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
          {/* Vidéo background */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/videos/mountain-collection-bg.mp4"
              type="video/mp4"
            />
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>

          {/* Overlay sombre */}
          <div className="absolute  inset-0 bg-black/45" />

          {/* Contenu */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto w-full max-w-[1216px] px-4 md:px-8 text-center">
              <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
                Vivez l'expérience montagne avec ceux qui la connaissent
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                Trouvez votre résidence de vacances dans les plus belles
                stations des Alpes. Studios, appartements et chalets
                d'exception.
              </p>
              
          <div className="px-0.5 py-0.5 rounded-md bg-[#C5D5E4] border border-gray-300 overflow-hidden radio-slider rounded-xl">
            <button
            className="px-8 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Liste
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors border-l border-gray-300"
            >
              Mosaïque
            </button>
          </div>
                <SearchBar />
            </div>
          </div>
        </section>

        {/* PROMO */}
        <section className="bg-[var(--ts-light-grey)] py-6">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  Vacances de Février
                </h3>
                <p className="text-sm text-gray-600">
                  Semaine du 28/02 dès 430€{" "}
                  <span className="line-through">(au lieu de 670€)</span>
                </p>
              </div>

              <Link
                href="/search"
                className="rounded-md bg-[var(--ts-mid-blue)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                J'en profite
              </Link>
            </div>
          </div>
        </section>

        {/* HÉBERGEMENTS */}
        <section className="py-12">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Une sélection d'hébergements
            </h2>

            <AccommodationGrid accommodations={featured} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}