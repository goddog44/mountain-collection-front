import { notFound } from "next/navigation";
import { DOMAINES, getDomaineBySlug } from "@/data/destinations";
import DestinationPageClient from "@/components/DestinationPageClient";
import { Suspense } from "react";

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static params for all known domaines
export function generateStaticParams() {
    return DOMAINES.map((d) => ({ slug: d.slug }));
}

// Generate SEO metadata
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const domaine = getDomaineBySlug(slug);
    if (!domaine) return {};
    return {
        title: `Location ${domaine.name} - Mountain Collection`,
        description: `Trouvez votre hébergement idéal dans le ${domaine.name}. Studios, appartements et chalets disponibles. ${domaine.description}`,
    };
}

export default async function DomainePage({ params }: Props) {
    const { slug } = await params;
    const domaine = getDomaineBySlug(slug);
    if (!domaine) notFound();

    return (
        <Suspense>
            <DestinationPageClient
                name={domaine.name}
                slug={domaine.slug}
                heroImage={domaine.heroImage}
                description={domaine.description}
                type="domaine"
                subStations={domaine.stations}
                subStationsLabel={`Les stations de ${domaine.name}`}
            />
        </Suspense>
    );
}
