import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DerniereMinutePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">
                {/* Hero */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <img
                        src="https://media.mountaincollection.com/images/derniere-minute-1.jpg?height=500&fit=cover&v=2"
                        alt="Offres dernière minute"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Dernière minute</h1>
                            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                                Partez sur un coup de tête ! Profitez de nos meilleures offres pour un départ immédiat.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-[1000px] px-4 py-12 md:px-8">
                    <div className="prose prose-blue max-w-none">
                        <h2 className="text-[#1B3D6B] flex items-center gap-3">
                            Jusqu'à -50% sur votre séjour
                            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                Offre limitée
                            </span>
                        </h2>
                        <p className="text-gray-600">
                            Il reste quelques disponibilités dans nos résidences premium. C'est le moment ou jamais de réserver vos vacances au ski
                            à prix réduit. Les offres "Dernière minute" concernent les séjours commençant dans les 15 prochains jours.
                        </p>

                        <div className="my-10 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi réserver en dernière minute ?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-700">Prix imbattables sur les dernières disponibilités</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-700">Météo plus fiable car connue à court terme</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-700">Mêmes standards de qualité et de services</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <Link
                                href="/search?promo=derniere-minute"
                                className="inline-flex items-center rounded-md bg-[#D32F2F] px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#B71C1C] transition-colors"
                            >
                                Voir les offres Dernière Minute
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
