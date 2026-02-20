export interface SubStation {
    name: string;
    image: string;
    href: string;
}

export interface Station {
    name: string;
    slug: string;
    heroImage: string;
    description: string;
    subStations?: SubStation[];
}

export interface Domaine {
    name: string;
    slug: string;
    heroImage: string;
    description: string;
    stations: SubStation[];
}

export const STATIONS: Station[] = [
    {
        name: "Flaine",
        slug: "flaine",
        heroImage: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=500&fit=cover&v=2",
        description: "Flaine est une station de ski familiale du Grand Massif, réputée pour son domaine skiable étendu et son architecture moderniste unique.",
        subStations: [
            { name: "Flaine Forêt", image: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=200&fit=cover", href: "/search?destination=Flaine+For%C3%AAt" },
            { name: "Flaine Forum", image: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=200&fit=cover", href: "/search?destination=Flaine+Forum" },
            { name: "Flaine Montsoleil", image: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=200&fit=cover", href: "/search?destination=Flaine+Montsoleil" },
            { name: "le Hameau de Flaine", image: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=200&fit=cover", href: "/search?destination=Hameau+de+Flaine" },
        ],
    },
    {
        name: "La Plagne",
        slug: "la-plagne",
        heroImage: "https://media.mountaincollection.com/zone/1571/la-plagne.jpeg?height=500&fit=cover&v=2",
        description: "La Plagne est l'une des plus grandes stations de ski au monde, avec un domaine skiable de 225 km de pistes ouvert de décembre à avril.",
        subStations: [
            { name: "Belle Plagne", image: "https://picsum.photos/seed/belle-plagne/200/150", href: "/search?destination=Belle+Plagne" },
            { name: "La Plagne Centre", image: "https://picsum.photos/seed/la-plagne-centre/200/150", href: "/search?destination=La+Plagne+Centre" },
            { name: "La Plagne Bellecôte", image: "https://picsum.photos/seed/la-plagne-bellecote/200/150", href: "/search?destination=La+Plagne+Bellec%C3%B4te" },
            { name: "La Plagne Montalbert", image: "https://picsum.photos/seed/montalbert/200/150", href: "/search?destination=La+Plagne+Montalbert" },
            { name: "La Plagne Montchavin", image: "https://picsum.photos/seed/montchavin/200/150", href: "/search?destination=La+Plagne+Montchavin" },
        ],
    },
    {
        name: "La Rosière",
        slug: "la-rosiere",
        heroImage: "https://media.mountaincollection.com/zone/1546/la-rosiere.jpeg?height=500&fit=cover&v=2",
        description: "La Rosière est une station savoyarde au cœur du domaine Espace San Bernardo, à la frontière franco-italienne.",
    },
    {
        name: "La Toussuire",
        slug: "la-toussuire",
        heroImage: "https://picsum.photos/seed/toussuire/1200/600",
        description: "La Toussuire est une station familiale des Sybelles offrant un beau domaine skiable à proximité de Saint-Jean-de-Maurienne.",
    },
    {
        name: "Le Corbier",
        slug: "le-corbier",
        heroImage: "https://media.mountaincollection.com/zone/1582/le-corbier-1.jpeg?height=500&fit=cover&v=2",
        description: "Le Corbier fait partie du domaine des Sybelles et propose un ski familial dans un cadre naturel préservé.",
    },
    {
        name: "Les 2 Alpes",
        slug: "les-2-alpes",
        heroImage: "https://picsum.photos/seed/les2alpes/1200/600",
        description: "Les 2 Alpes est une station emblématique de l'Isère avec un glacier skiable toute l'année et un domaine de 213 km de pistes.",
    },
    {
        name: "Les Arcs",
        slug: "les-arcs",
        heroImage: "https://picsum.photos/seed/les-arcs/1200/600",
        description: "Les Arcs est un ensemble de stations intégrées dans le domaine Paradiski, offrant 425 km de pistes reliées à La Plagne.",
        subStations: [
            { name: "Arc 1800", image: "https://picsum.photos/seed/arc1800/200/150", href: "/search?destination=Arc+1800" },
            { name: "Arc 2000", image: "https://picsum.photos/seed/arc2000/200/150", href: "/search?destination=Arc+2000" },
            { name: "Les Arcs Le Charvet", image: "https://picsum.photos/seed/le-charvet/200/150", href: "/search?destination=Les+Arcs+Le+Charvet" },
            { name: "Les Arcs Les Villards", image: "https://picsum.photos/seed/les-villards/200/150", href: "/search?destination=Les+Arcs+Les+Villards" },
        ],
    },
    {
        name: "Les Menuires",
        slug: "les-menuires",
        heroImage: "https://media.mountaincollection.com/zone/1569/les-menuires.jpeg?height=500&fit=cover&v=2",
        description: "Les Menuires est une station au cœur des 3 Vallées, offrant un accès direct à un domaine skiable de 600 km.",
        subStations: [
            { name: "Grand Reberty", image: "https://picsum.photos/seed/reberty/200/150", href: "/search?destination=Reberty+2000" },
            { name: "La Croisette", image: "https://picsum.photos/seed/croisette/200/150", href: "/search?destination=La+Croisette" },
            { name: "Les Bruyères", image: "https://picsum.photos/seed/bruyeres/200/150", href: "/search?destination=Les+Bruy%C3%A8res" },
            { name: "Les Fontanettes", image: "https://picsum.photos/seed/fontanettes/200/150", href: "/search?destination=Les+Fontanettes" },
            { name: "Preyerand", image: "https://picsum.photos/seed/preyerand/200/150", href: "/search?destination=Preyerand" },
        ],
    },
    {
        name: "Méribel",
        slug: "meribel",
        heroImage: "https://picsum.photos/seed/meribel/1200/600",
        description: "Méribel est au cœur des 3 Vallées, le plus grand domaine skiable du monde avec plus de 600 km de pistes.",
    },
    {
        name: "Saint-Martin-de-Belleville",
        slug: "saint-martin-de-belleville",
        heroImage: "https://picsum.photos/seed/saint-martin/1200/600",
        description: "Saint-Martin-de-Belleville est un village savoyard authentique qui permet d'accéder au domaine des 3 Vallées.",
    },
    {
        name: "Serre Chevalier",
        slug: "serre-chevalier",
        heroImage: "https://media.mountaincollection.com/zone/1584/serre-chevalier.jpeg?height=500&fit=cover&v=2",
        description: "Serre Chevalier est la plus grande station des Hautes-Alpes, réputée pour ses forêts de mélèzes et son enneigement exceptionnel.",
        subStations: [
            { name: "La Salle-les-Alpes", image: "https://picsum.photos/seed/la-salle/200/150", href: "/search?destination=La+Salle-les-Alpes" },
            { name: "Le Monêtier", image: "https://picsum.photos/seed/monetier/200/150", href: "/search?destination=Le+Mon%C3%AAtier" },
            { name: "Villeneuve", image: "https://picsum.photos/seed/villeneuve/200/150", href: "/search?destination=Villeneuve" },
        ],
    },
    {
        name: "Tignes",
        slug: "tignes",
        heroImage: "https://media.mountaincollection.com/zone/1545/tignes.jpeg?height=500&fit=cover&v=2",
        description: "Tignes est une station d'altitude qui partage avec Val d'Isère le domaine Espace Killy et son glacier du Grand Motte.",
        subStations: [
            { name: "Tignes Le Lac", image: "https://picsum.photos/seed/tignes-le-lac/200/150", href: "/search?destination=Tignes+Le+Lac" },
            { name: "Tignes Val Claret", image: "https://picsum.photos/seed/val-claret/200/150", href: "/search?destination=Tignes+Val+Claret" },
            { name: "Tignes 1800", image: "https://picsum.photos/seed/tignes-1800/200/150", href: "/search?destination=Tignes+1800" },
        ],
    },
    {
        name: "Val d'Isère",
        slug: "val-d-isere",
        heroImage: "https://media.mountaincollection.com/zone/1544/val-d-isere.jpeg?height=500&fit=cover&v=2",
        description: "Val d'Isère est l'une des stations les plus prestigieuses des Alpes, avec le domaine Espace Killy et des pistes pour tous niveaux.",
    },
    {
        name: "Val Thorens",
        slug: "val-thorens",
        heroImage: "https://media.mountaincollection.com/zone/1575/val-thorens.jpeg?height=500&fit=cover&v=2",
        description: "Val Thorens est la plus haute station de ski d'Europe à 2300 m d'altitude, garantissant un enneigement optimal jusqu'en mai.",
    },
];

export const DOMAINES: Domaine[] = [
    {
        name: "Domaine de La Plagne",
        slug: "domaine-de-la-plagne",
        heroImage: "https://media.mountaincollection.com/zone/1571/la-plagne.jpeg?height=500&fit=cover&v=2",
        description: "Le domaine de La Plagne rassemble 12 stations et 225 km de pistes sur le massif de Bellecôte.",
        stations: [
            { name: "La Plagne", image: "https://picsum.photos/seed/la-plagne/200/150", href: "/stations/la-plagne" },
            { name: "Belle Plagne", image: "https://picsum.photos/seed/belle-plagne/200/150", href: "/search?destination=Belle+Plagne" },
            { name: "Plagne 1800", image: "https://picsum.photos/seed/plagne-1800/200/150", href: "/search?destination=Plagne+1800" },
            { name: "Plagne Centre", image: "https://picsum.photos/seed/plagne-centre/200/150", href: "/search?destination=Plagne+Centre" },
        ],
    },
    {
        name: "Domaine de Méribel",
        slug: "domaine-de-meribel",
        heroImage: "https://picsum.photos/seed/meribel/1200/600",
        description: "Méribel se situe au cœur des 3 Vallées, le plus grand domaine skiable du monde.",
        stations: [
            { name: "Méribel", image: "https://picsum.photos/seed/meribel/200/150", href: "/stations/meribel" },
            { name: "Méribel Village", image: "https://picsum.photos/seed/meribel-village/200/150", href: "/search?destination=M%C3%A9ribel+Village" },
        ],
    },
    {
        name: "Domaine de Serre Chevalier",
        slug: "domaine-de-serre-chevalier",
        heroImage: "https://media.mountaincollection.com/zone/1584/serre-chevalier.jpeg?height=500&fit=cover&v=2",
        description: "Serre Chevalier est un domaine skiable de 250 km de pistes dans les Hautes-Alpes.",
        stations: [
            { name: "Serre Chevalier", image: "https://picsum.photos/seed/serre-chev/200/150", href: "/stations/serre-chevalier" },
            { name: "La Salle-les-Alpes", image: "https://picsum.photos/seed/la-salle/200/150", href: "/search?destination=La+Salle-les-Alpes" },
            { name: "Le Monêtier", image: "https://picsum.photos/seed/monetier/200/150", href: "/search?destination=Le+Mon%C3%AAtier" },
        ],
    },
    {
        name: "Domaine de Tignes",
        slug: "domaine-de-tignes",
        heroImage: "https://media.mountaincollection.com/zone/1545/tignes.jpeg?height=500&fit=cover&v=2",
        description: "Tignes et Val d'Isère forment l'Espace Killy, un domaine de 300 km de pistes avec un glacier skiable toute l'année.",
        stations: [
            { name: "Tignes", image: "https://picsum.photos/seed/tignes/200/150", href: "/stations/tignes" },
            { name: "Tignes 1800", image: "https://picsum.photos/seed/tignes-1800/200/150", href: "/search?destination=Tignes+1800" },
            { name: "Tignes 2100", image: "https://picsum.photos/seed/tignes-2100/200/150", href: "/search?destination=Tignes+2100" },
        ],
    },
    {
        name: "Domaine Espace San Bernardo",
        slug: "domaine-espace-san-bernardo",
        heroImage: "https://media.mountaincollection.com/zone/1546/la-rosiere.jpeg?height=500&fit=cover&v=2",
        description: "L'Espace San Bernardo relie La Rosière en France à La Thuile en Italie pour 160 km de pistes internationales.",
        stations: [
            { name: "La Rosière", image: "https://picsum.photos/seed/la-rosiere/200/150", href: "/stations/la-rosiere" },
        ],
    },
    {
        name: "Domaine Grand Massif",
        slug: "domaine-grand-massif",
        heroImage: "https://media.mountaincollection.com/zone/1576/flaine.jpeg?height=500&fit=cover&v=2",
        description: "Le Grand Massif offre 265 km de pistes réparties entre Flaine, Samoëns, Morillon, Les Carroz et Sixt-Fer-à-Cheval.",
        stations: [
            { name: "Flaine", image: "https://picsum.photos/seed/flaine/200/150", href: "/stations/flaine" },
            { name: "Les Carroz", image: "https://picsum.photos/seed/les-carroz/200/150", href: "/search?destination=Les+Carroz" },
            { name: "Samoëns", image: "https://picsum.photos/seed/samoens/200/150", href: "/search?destination=Samo%C3%ABns" },
        ],
    },
    {
        name: "Domaine Les 2 Alpes",
        slug: "domaine-les-2-alpes",
        heroImage: "https://picsum.photos/seed/les2alpes/1200/600",
        description: "Les 2 Alpes est une station incontournable de l'Isère avec un glacier permanent et 213 km de pistes.",
        stations: [
            { name: "Les 2 Alpes", image: "https://picsum.photos/seed/les2alpes/200/150", href: "/stations/les-2-alpes" },
        ],
    },
    {
        name: "Domaine Les 3 Vallées",
        slug: "domaine-les-3-vallees",
        heroImage: "https://media.mountaincollection.com/zone/1575/val-thorens.jpeg?height=500&fit=cover&v=2",
        description: "Les 3 Vallées est le plus grand domaine skiable du monde avec 600 km de pistes et 8 stations.",
        stations: [
            { name: "Val Thorens", image: "https://picsum.photos/seed/val-thorens/200/150", href: "/stations/val-thorens" },
            { name: "Les Menuires", image: "https://picsum.photos/seed/les-menuires/200/150", href: "/stations/les-menuires" },
            { name: "Méribel", image: "https://picsum.photos/seed/meribel/200/150", href: "/stations/meribel" },
            { name: "Saint-Martin-de-Belleville", image: "https://picsum.photos/seed/saint-martin/200/150", href: "/stations/saint-martin-de-belleville" },
        ],
    },
    {
        name: "Domaine Les Arcs - Peisey-Vallandry",
        slug: "domaine-les-arcs-peisey-vallandry",
        heroImage: "https://picsum.photos/seed/les-arcs/1200/600",
        description: "Les Arcs et Peisey-Vallandry constituent le domaine Paradiski, relié à La Plagne pour 425 km de pistes.",
        stations: [
            { name: "Les Arcs", image: "https://picsum.photos/seed/les-arcs/200/150", href: "/stations/les-arcs" },
            { name: "Arc 1800", image: "https://picsum.photos/seed/arc1800/200/150", href: "/search?destination=Arc+1800" },
            { name: "Arc 2000", image: "https://picsum.photos/seed/arc2000/200/150", href: "/search?destination=Arc+2000" },
        ],
    },
    {
        name: "Domaine Les Menuires",
        slug: "domaine-les-menuires",
        heroImage: "https://media.mountaincollection.com/zone/1569/les-menuires.jpeg?height=500&fit=cover&v=2",
        description: "Les Menuires se situe au cœur des 3 Vallées et offre un accès privilégié à 600 km de pistes.",
        stations: [
            { name: "Les Menuires", image: "https://picsum.photos/seed/les-menuires/200/150", href: "/stations/les-menuires" },
            { name: "Grand Reberty", image: "https://picsum.photos/seed/reberty/200/150", href: "/search?destination=Reberty" },
        ],
    },
    {
        name: "Domaine Les Sybelles",
        slug: "domaine-les-sybelles",
        heroImage: "https://media.mountaincollection.com/zone/1582/le-corbier-1.jpeg?height=500&fit=cover&v=2",
        description: "Les Sybelles est le 4ème domaine skiable de France avec 310 km de pistes réparties sur 6 stations.",
        stations: [
            { name: "Le Corbier", image: "https://picsum.photos/seed/le-corbier/200/150", href: "/stations/le-corbier" },
            { name: "La Toussuire", image: "https://picsum.photos/seed/la-toussuire/200/150", href: "/stations/la-toussuire" },
        ],
    },
    {
        name: "Domaine Paradiski",
        slug: "domaine-paradiski",
        heroImage: "https://picsum.photos/seed/paradiski/1200/600",
        description: "Paradiski relie Les Arcs à La Plagne via la télécabine Vanoise Express pour 425 km de pistes skiables.",
        stations: [
            { name: "Domaine de La Plagne", image: "https://picsum.photos/seed/la-plagne/200/150", href: "/domaines/domaine-de-la-plagne" },
            { name: "Domaine Les Arcs - Peisey-Vallandry", image: "https://picsum.photos/seed/les-arcs/200/150", href: "/domaines/domaine-les-arcs-peisey-vallandry" },
            { name: "La Plagne", image: "https://picsum.photos/seed/la-plagne2/200/150", href: "/stations/la-plagne" },
            { name: "Les Arcs", image: "https://picsum.photos/seed/les-arcs2/200/150", href: "/stations/les-arcs" },
            { name: "Arc 1800", image: "https://picsum.photos/seed/arc1800/200/150", href: "/search?destination=Arc+1800" },
            { name: "Arc 2000", image: "https://picsum.photos/seed/arc2000/200/150", href: "/search?destination=Arc+2000" },
            { name: "Belle Plagne", image: "https://picsum.photos/seed/belle-plagne/200/150", href: "/search?destination=Belle+Plagne" },
            { name: "Montalbert", image: "https://picsum.photos/seed/montalbert/200/150", href: "/search?destination=Montalbert" },
            { name: "Montchavin Les Coches", image: "https://picsum.photos/seed/montchavin/200/150", href: "/search?destination=Montchavin" },
            { name: "Plagne 1800", image: "https://picsum.photos/seed/plagne1800/200/150", href: "/search?destination=Plagne+1800" },
            { name: "Plagne Aime 2000", image: "https://picsum.photos/seed/aime2000/200/150", href: "/search?destination=Aime+2000" },
            { name: "Plagne Bellecôte", image: "https://picsum.photos/seed/plagne-bellecote/200/150", href: "/search?destination=Plagne+Bellec%C3%B4te" },
            { name: "Plagne Centre", image: "https://picsum.photos/seed/plagne-centre/200/150", href: "/search?destination=Plagne+Centre" },
            { name: "Plagne Soleil", image: "https://picsum.photos/seed/plagne-soleil/200/150", href: "/search?destination=Plagne+Soleil" },
            { name: "Plagne Villages", image: "https://picsum.photos/seed/plagne-villages/200/150", href: "/search?destination=Plagne+Villages" },
        ],
    },
];

export function getStationBySlug(slug: string): Station | undefined {
    return STATIONS.find((s) => s.slug === slug);
}

export function getDomaineBySlug(slug: string): Domaine | undefined {
    return DOMAINES.find((d) => d.slug === slug);
}
