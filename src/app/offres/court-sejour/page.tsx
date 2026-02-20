import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CourtSejourPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">
                {/* Hero */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <img
                        src="https://media.mountaincollection.com/images/haute-altitude-2.jpg?height=500&fit=cover&v=2"
                        alt="Courts séjours au ski"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Nos courts séjours</h1>
                            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                                Envie d'un break ? Profitez de nos offres pour un week-end ou quelques jours à la montagne.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-[1000px] px-4 py-12 md:px-8">
                    <div className="prose prose-blue max-w-none">
                        <h2 className="text-[#1B3D6B]">Pourquoi choisir un court séjour ?</h2>
                        <p>
                            Le temps d'un week-end ou pour quelques jours en semaine, la montagne vous offre une parenthèse enchantée.
                            Que vous cherchiez à dévaler les pistes, à vous détendre au spa ou simplement à changer d'air,
                            nos formules courts séjours s'adaptent à vos envies.
                        </p>

                        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#1B3D6B] mb-2">Flexibilité</h3>
                                <p className="text-gray-600 text-sm">Arrivez quand vous voulez. Nos équipes vous accueillent pour des séjours de 2 à 5 nuits.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#1B3D6B] mb-2">Tout compris</h3>
                                <p className="text-gray-600 text-sm">Possibilité d'ajouter forfaits et matériel à votre réservation pour un gain de temps optimal.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#1B3D6B] mb-2">Meilleur tarif</h3>
                                <p className="text-gray-600 text-sm">Des prix attractifs sur les périodes hors vacances scolaires pour profiter de la montagne au calme.</p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-12">
                            <Link
                                href="/search?duration=court"
                                className="inline-flex items-center rounded-md bg-[#1B3D6B] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#152C4F] transition-colors"
                            >
                                Voir les offres Court Séjour
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
