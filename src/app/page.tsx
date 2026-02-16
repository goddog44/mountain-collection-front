import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { accommodations } from "@/data/accommodations";
import AccommodationGrid from "@/components/AccommodationGrid";

export default function Home() {
  const featured = accommodations.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-200 bg-[var(--ts-light-grey)] py-12">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--ts-mid-blue-dark)] md:text-4xl">
              Hébergements à la montagne
            </h1>
            <p className="mt-2 text-lg text-[var(--ts-mid-grey)]">
              Trouvez votre résidence de vacances dans les plus belles stations
              des Alpes. Studios, appartements et chalets pour tous les goûts.
            </p>
            <Link
              href="/search"
              className="mt-6 inline-block rounded-xl bg-[var(--ts-mid-blue)] px-6 py-3 font-medium text-white transition-colors hover:opacity-90"
            >
              Voir toutes les offres
            </Link>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-[1216px] px-4 md:px-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Une sélection d&apos;hébergements
            </h2>
            <AccommodationGrid accommodations={featured} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
