import { notFound } from "next/navigation";
import { STATIONS, getStationBySlug } from "@/data/destinations";
import DestinationPageClient from "@/components/DestinationPageClient";
import { Suspense } from "react";

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static params for all known stations
export function generateStaticParams() {
    return STATIONS.map((s) => ({ slug: s.slug }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const station = getStationBySlug(slug);
    if (!station) return {};
    return {
        title: `Location ${station.name} - Mountain Collection`,
        description: `Trouvez votre hébergement idéal à ${station.name}. Studios, appartements et chalets disponibles. ${station.description}`,
    };
}

export default async function StationPage({ params }: Props) {
    const { slug } = await params;
    const station = getStationBySlug(slug);
    if (!station) notFound();

    return (
        <Suspense>
            <DestinationPageClient
                name={station.name}
                slug={station.slug}
                heroImage={station.heroImage}
                description={station.description}
                type="station"
                subStations={station.subStations}
                subStationsLabel={`Les stations de ${station.name}`}
            />
        </Suspense>
    );
}
