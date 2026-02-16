"use client";

import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Home } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    params.set("pax", String(guests));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div
      role="search"
      aria-label="Recherche d'hébergement à la montagne"
      className="grid grid-cols-2 gap-2 rounded-xl bg-white lg:flex lg:flex-row lg:items-center lg:gap-0 lg:rounded-[2rem] lg:bg-[var(--ts-light-grey)] lg:p-0 lg:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="col-span-2 lg:flex lg:min-w-0 lg:flex-1">
        <div className="flex min-h-[40px] items-center rounded-lg px-4 py-2 lg:rounded-sm lg:pl-4">
          <MapPin className="mr-2 hidden h-4 w-4 text-[var(--ts-mid-grey)] lg:block" />
          <input
            type="text"
            placeholder="Station, région..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--ts-mid-grey)] lg:min-w-[7rem]"
            aria-label="Destination"
          />
        </div>
      </div>

      <div className="hidden h-5 w-px bg-[var(--ts-mid-grey)]/30 lg:block" />

      <div className="col-span-2 flex min-h-[40px] items-center rounded-lg px-4 py-2 lg:min-w-[170px] lg:rounded-sm">
        <Calendar className="mr-2 hidden h-4 w-4 text-[var(--ts-mid-grey)] lg:block" />
        <span className="truncate text-sm text-[var(--ts-mid-grey)]">
          Sélectionner des dates
        </span>
      </div>

      <div className="hidden h-5 w-px bg-[var(--ts-mid-grey)]/30 lg:block" />

      <div className="col-span-2 flex min-h-[40px] items-center rounded-lg px-4 py-2 lg:min-w-[130px] lg:rounded-sm">
        <Users className="mr-2 hidden h-4 w-4 text-[var(--ts-mid-grey)] lg:block" />
        <span className="text-sm">{guests} participants</span>
      </div>

      <div className="hidden h-5 w-px bg-[var(--ts-mid-grey)]/30 lg:block" />

      <div className="col-span-2 flex min-h-[40px] items-center rounded-lg px-4 py-2 lg:min-w-[5.5rem] lg:rounded-sm">
        <Home className="mr-2 hidden h-4 w-4 text-[var(--ts-mid-grey)] lg:block" />
        <span className="text-sm">Hébergement</span>
      </div>

      <div className="col-span-2 lg:mx-2">
        <button
          type="button"
          onClick={handleSearch}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ts-mid-blue)] px-4 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 lg:w-auto lg:rounded-full lg:p-2"
          aria-label="Rechercher des hébergements"
        >
          <Search className="h-4 w-4" />
          <span className="lg:hidden">Rechercher</span>
        </button>
      </div>
    </div>
  );
}
