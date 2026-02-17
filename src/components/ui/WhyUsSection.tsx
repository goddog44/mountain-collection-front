// Drop this anywhere in your page.tsx — no external imports needed beyond lucide-react

import { CheckCircle2, MapPin, Layers, Home } from "lucide-react";

const WHY_US = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Locations de vacances vérifiées",
    desc: "Nos équipes visitent et sélectionnent chaque location de vacances pour garantir la qualité et la sécurité de vos séjours.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Agences locales",
    desc: "Des experts présents sur place, pour un accompagnement personnalisé.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Premier réseau immobilier des Alpes",
    desc: "31 agences implantées dans 12 stations renommées",
  },
  {
    icon: <Home className="h-5 w-5 text-gray-700" strokeWidth={1.5} />,
    title: "Un large choix de biens",
    desc: "Plus de 2 550 hébergements du studio cosy au chalet d'exception",
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-[#EEF3F8] py-12">
      <div className="mx-auto max-w-[1216px] px-4 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center">

          {/* Left — title */}
          <div className="shrink-0 md:w-64">
            <h2 className="text-2xl font-bold leading-snug text-gray-900">
              Pourquoi<br />nous choisir&nbsp;?
            </h2>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block self-stretch w-px bg-gray-300 shrink-0" />

          {/* Right — 2×2 grid */}
          <div className="flex-1 grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2">
            {WHY_US.map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                {item.icon}
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
