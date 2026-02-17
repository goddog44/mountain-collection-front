"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Mountain,
} from "lucide-react";
import { useState, useRef, useEffect, JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Panel = "destination" | "dates" | "guests" | "formula" | null;

interface GuestCounts {
  adults: number;
  children: number;
  pets: boolean;
}

type Formula = "hebergement" | "hebergement+forfait" | "hebergement+forfait+materiel";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DESTINATIONS = [
  { name: "Toutes les destinations", subtitle: "Laissez-vous inspirer par nos offres", isAll: true },
  { name: "Flaine", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "La Plagne", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "La Rosière", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "La Toussuire", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Le Corbier", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Les 2 Alpes", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Les Arcs", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Les Menuires", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Méribel", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Morzine", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Val Thorens", subtitle: "Auvergne-Rhône-Alpes, France" },
];

const STATION_TYPES = [
  { label: "Station Village", icon: Mountain },
  { label: "Haute altitude", icon: Mountain },
  { label: "Station familiale", icon: Mountain },
  { label: "Station de charme", icon: Mountain },
];

const FORMULAS: { value: Formula; label: string; icons: string[] }[] = [
  { value: "hebergement", label: "Hébergement", icons: ["home"] },
  { value: "hebergement+forfait", label: "Hébergement + Forfait", icons: ["home", "skipback"] },
  { value: "hebergement+forfait+materiel", label: "Hébergement + Forfait + Matériel", icons: ["home", "skipback", "tools"] },
];

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(d: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return d > start && d < end;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Returns 0=Monday ... 6=Sunday (ISO week)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function countNights(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function formulaLabel(f: Formula): string {
  return FORMULAS.find((x) => x.value === f)?.label ?? "";
}

// ─── FormulaIcon component ─────────────────────────────────────────────────

function FormulaIcons({ formula }: { formula: Formula }) {
  const f = FORMULAS.find((x) => x.value === formula);
  if (!formula || !f) return <Home className="h-4 w-4 " />;

  return (
    <span className="flex items-center gap-1 text-[var(--ts-black)]">
      <Home className="h-4 w-4" />
      {f.icons.length >= 2 && (
        <>
          <span className="text-xs font-bold">+</span>
          <img src="/images/skipback.png" alt="Skip back" className="h-6 w-6" />

        </>
      )}
      {f.icons.length >= 3 && (
        <>
          <span className="text-xs font-bold">+</span>
          <img src="/images/tools.png" alt="Tools icon" className="h-6 w-6" />
        </>
      )}
    </span>
  );
}

// ─── Calendar component ────────────────────────────────────────────────────

function CalendarPanel({
  dateRange,
  onSave,
  onClear,
}: {
  dateRange: DateRange;
  onSave: (range: DateRange) => void;
  onClear: () => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // left month
  const [tempRange, setTempRange] = useState<DateRange>(dateRange);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (d: Date) => {
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: d, end: null });
    } else {
      if (d < tempRange.start) {
        setTempRange({ start: d, end: tempRange.start });
      } else {
        setTempRange({ start: tempRange.start, end: d });
      }
    }
  };

  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isStart = tempRange.start && isSameDay(d, tempRange.start);
      const isEnd = tempRange.end && isSameDay(d, tempRange.end);
      const inRange = isInRange(d, tempRange.start, tempRange.end);
      const isHoverRange = tempRange.start && !tempRange.end && hoveredDate &&
        isInRange(d, tempRange.start, hoveredDate);
      const isHoverEnd = tempRange.start && !tempRange.end && hoveredDate &&
        isSameDay(d, hoveredDate);

      cells.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => handleDayClick(d)}
          onMouseEnter={() => setHoveredDate(d)}
          onMouseLeave={() => setHoveredDate(null)}
          className={[
            "relative flex h-9 w-9 items-center justify-center text-sm transition-colors",
            isPast ? "cursor-not-allowed text-gray-300" : "cursor-pointer hover:font-medium",
            isStart || isEnd
              ? "z-10 rounded-full bg-[var(--ts-mid-blue)] font-semibold text-white"
              : "",
            inRange || isHoverRange
              ? "bg-[var(--ts-mid-blue)]/10 text-[var(--ts-mid-blue)]"
              : !isStart && !isEnd ? "text-gray-800" : "",
            isHoverEnd && !isEnd && !isStart
              ? "rounded-full bg-[var(--ts-mid-blue)]/20 text-[var(--ts-mid-blue)]"
              : "",
          ].filter(Boolean).join(" ")}
        >
          {day}
        </button>
      );
    }

    return cells;
  };

  const nightCount = tempRange.start && tempRange.end
    ? countNights(tempRange.start, tempRange.end)
    : null;

  const monthName = (y: number, m: number) =>
    new Date(y, m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
      <div className="flex gap-8">
        {/* Left month */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={prevMonth} className="rounded-full p-1 hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <span className="text-sm font-medium capitalize">{monthName(viewYear, viewMonth)}</span>
            <div className="w-6" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-medium text-gray-400">{d}</div>
            ))}
            {renderMonth(viewYear, viewMonth)}
          </div>
        </div>

        {/* Right month */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div className="w-6" />
            <span className="text-sm font-medium capitalize">{monthName(rightYear, rightMonth)}</span>
            <button type="button" onClick={nextMonth} className="rounded-full p-1 hover:bg-gray-100">
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-medium text-gray-400">{d}</div>
            ))}
            {renderMonth(rightYear, rightMonth)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="text-sm text-gray-600">
          {tempRange.start && tempRange.end ? (
            <span>
              <span className="font-semibold">{nightCount} nuit{nightCount !== 1 ? "s" : ""}</span>
              {" · "}
              {formatDate(tempRange.start)} – {formatDate(tempRange.end)}
            </span>
          ) : (
            <span className="text-gray-400">Sélectionnez vos dates</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setTempRange({ start: null, end: null }); onClear(); }}
            className="text-sm underline text-gray-500 hover:text-gray-800"
          >
            Effacer les dates
          </button>
          <button
            type="button"
            onClick={() => onSave(tempRange)}
            className="rounded-lg bg-[var(--ts-mid-blue)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GuestsPanel component ─────────────────────────────────────────────────

function GuestsPanel({
  guests,
  onSave,
}: {
  guests: GuestCounts;
  onSave: (g: GuestCounts) => void;
}) {
  const [temp, setTemp] = useState<GuestCounts>(guests);

  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
      {/* Adults */}
      <div className="flex items-center justify-between py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">Adulte</div>
          <div className="text-xs text-gray-400">18 ans et plus</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={temp.adults <= 1}
            onClick={() => setTemp(t => ({ ...t, adults: t.adults - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-4 text-center text-sm font-medium">{temp.adults}</span>
          <button
            type="button"
            onClick={() => setTemp(t => ({ ...t, adults: t.adults + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Children */}
      <div className="flex items-center justify-between py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">Enfants</div>
          <div className="text-xs text-gray-400">Moins de 18 ans</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={temp.children <= 0}
            onClick={() => setTemp(t => ({ ...t, children: t.children - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-4 text-center text-sm font-medium">{temp.children}</span>
          <button
            type="button"
            onClick={() => setTemp(t => ({ ...t, children: t.children + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Pets */}
      <div className="flex items-center justify-between py-3">
        <div className="text-sm font-medium text-gray-900">Animaux de compagnie</div>
        <input
          type="checkbox"
          checked={temp.pets}
          onChange={(e) => setTemp(t => ({ ...t, pets: e.target.checked }))}
          className="h-4 w-4 accent-[var(--ts-mid-blue)]"
        />
      </div>

      <button
        type="button"
        onClick={() => onSave(temp)}
        className="mt-2 w-full rounded-lg bg-[var(--ts-mid-blue)] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── FormulaPanel component ────────────────────────────────────────────────

function FormulaPanel({
  formula,
  onSelect,
}: {
  formula: Formula;
  onSelect: (f: Formula) => void;
}) {
  return (
    <div className="w-90 rounded-2xl bg-white p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
      {FORMULAS.map((f) => (
        <button
        key={f.value}
        type="button"
        onClick={() => onSelect(f.value)}
        className={[
          "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--ts-mid-blue)]/5",
          formula === f.value
            ? "bg-[var(--ts-mid-blue)]/7 font-medium"
            : "text-gray-800",
        ].join(" ")}
      >
        {/* Icons */}
        <span className="flex items-center gap-1 text-[var(--ts-black)] shrink-0">
          <Home className="h-4 w-4" />

          {f.icons.length >= 2 && (
            <>
              <span className="text-md text-[var(--ts-black)]">+</span>
              <img src="/images/skipback.png" alt="Skip back" className="h-6 w-6" />
            </>
          )}

          {f.icons.length >= 3 && (
            <>
              <span className="text-md text-[var(--ts-black)]">+</span>
              <img src="/images/tools.png" alt="Tools icon" className="h-6 w-6" />
            </>
          )}
        </span>

        {/* Label */}
        <span className="truncate">{f.label}</span>
      </button>
      ))}
    </div>
  );
}

// ─── DestinationPanel component ───────────────────────────────────────────

function DestinationPanel({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (dest: string) => void;
}) {
  return (
    <div className="w-[480px] rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
      {/* Station types */}
      <div className="mb-4">
        <p className="mb-3 text-sm font-semibold text-gray-800">Choisir un type de station</p>
        <div className="grid grid-cols-2 gap-2">
          {STATION_TYPES.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => onSelect(t.label)}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[var(--ts-mid-blue)] hover:text-[var(--ts-mid-blue)]"
            >
              <Mountain className="h-4 w-4 shrink-0 text-gray-400" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 mb-3" />

      <p className="mb-3 text-sm font-semibold text-gray-800">Ou une destination populaire</p>
      <div className="max-h-64 overflow-y-auto -mx-1 px-1">
        {DESTINATIONS.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => onSelect(d.isAll ? "" : d.name)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
              (d.isAll ? value === "" : value === d.name)
                ? "bg-[var(--ts-mid-blue)]/10"
                : "",
            ].join(" ")}
          >
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{d.name}</div>
              {d.subtitle && (
                <div className="text-xs text-gray-400">{d.subtitle}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main SearchBar ────────────────────────────────────────────────────────

export default function SearchBar() {
  const router = useRouter();

  // State
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [guests, setGuests] = useState<GuestCounts>({ adults: 3, children: 0, pets: false });
  const [formula, setFormula] = useState<Formula>("hebergement+forfait+materiel");

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = (panel: Panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (dateRange.start) params.set("start", dateRange.start.toISOString().split("T")[0]);
    if (dateRange.end) params.set("end", dateRange.end.toISOString().split("T")[0]);
    params.set("adults", String(guests.adults));
    params.set("children", String(guests.children));
    if (guests.pets) params.set("pets", "1");
    params.set("formula", formula);
    router.push(`/search?${params.toString()}`);
    setActivePanel(null);
  };

  // Display values
  const destLabel = destination || "Toutes les destinations";
  const destTruncated = destLabel.length > 18 ? destLabel.slice(0, 17) + "…" : destLabel;

  const dateLabel = dateRange.start && dateRange.end
    ? `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}`
    : "Sélectionner des dates";

  const guestLabel = `${guests.adults + guests.children} participant${(guests.adults + guests.children) > 1 ? "s" : ""}`;

  const isActive = (p: Panel) => activePanel === p;

  // Shared pill button styles
  const pillarBase =
    "relative flex flex-col justify-center cursor-pointer select-none px-4 py-1.5 transition-colors rounded-full hover:bg-[var(--ts-light-grey)]";
  const pillarActive = "bg-white shadow-sm";

  return (
    <div ref={containerRef} className="relative">
      {/* ── Compact bar (inline in header) ── */}
      <div
        role="search"
        aria-label="Recherche d'hébergement à la montagne"
        className="
        grid grid-cols-2 max-lg:gap-x-2 max-lg:gap-y-2 
        lg:flex lg:flex-row 
        mt-2
        rounded-xl lg:rounded-4xl 
        w-50 lg:w-[700px] 
        h-10 lg:h-10
        p-6
        lg:p-0 
        bg-white lg:bg-[var(--ts-light-grey)] 
        lg:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)] 
        mx-auto
        ">
                {/* Destination */}
        <button
          type="button"
          onClick={() => togglePanel("destination")}
          aria-expanded={isActive("destination")}
          className={[pillarBase, isActive("destination") ? pillarActive : "", "min-w-0 flex-1 text-center"].join(" ")}
        >
          <span className="text-[13px] font-semibold tracking-wide text-black-500">
            Nos Promotions
          </span>
          <span className={["truncate text-sm font-medium", !destination ? "text-gray-400" : "text-gray-900"].join(" ")}>
            {/* {destTruncated} */}
          </span>
          {destination && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setDestination(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
              aria-label="Effacer destination"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
          )}
        </button>

        <div className="h-6 mt-2 w-px shrink-0 bg-gray-300" />

        {/* Dates */}
        <button
          type="button"
          onClick={() => togglePanel("dates")}
          aria-expanded={isActive("dates")}
          className={[pillarBase, isActive("dates") ? pillarActive : "", "min-w-[160px] text-center"].join(" ")}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500"></span>
          <span className={["text-sm font-medium", !dateRange.start ? "text-black-400" : "text-blalc-900"].join(" ")}>
            {dateLabel}
          </span>
          {dateRange.start && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
              aria-label="Effacer les dates"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
          )}
        </button>

         <div className="h-6 mt-2 w-px shrink-0 bg-gray-300" />

        {/* Guests */}
        <button
          type="button"
          onClick={() => togglePanel("guests")}
          aria-expanded={isActive("guests")}
          className={[pillarBase, isActive("guests") ? pillarActive : "", "min-w-[130px] text-center"].join(" ")}
        >          <span className="text-sm font-medium text-gray-900">{guestLabel}</span>
        </button>

         <div className="h-6 mt-2 w-px shrink-0 bg-gray-300" />

        {/* Formula */}
        <button
          type="button"
          onClick={() => togglePanel("formula")}
          aria-expanded={isActive("formula")}
          className={[pillarBase, isActive("formula") ? pillarActive : "", "pr-14 text-left"].join(" ")}
        >
          <FormulaIcons formula={formula} />
        </button>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="mx-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ts-mid-blue)] text-white transition-colors hover:opacity-90"
          aria-label="Rechercher des hébergements"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* ── Dropdowns ── */}
      {activePanel && (
        <div className="absolute left-0 top-full z-50 mt-2">
          {/* Destination panel */}
          {activePanel === "destination" && (
            <DestinationPanel
              value={destination}
              onSelect={(d) => { setDestination(d); setActivePanel("dates"); }}
            />
          )}

          {/* Date panel — centered */}
          {activePanel === "dates" && (
            <div style={{ transform: "translateX(-25%)" }}>
              <CalendarPanel
                dateRange={dateRange}
                onSave={(r) => { setDateRange(r); setActivePanel(null); }}
                onClear={() => setDateRange({ start: null, end: null })}
              />
            </div>
          )}
        </div>
      )}

      {/* Guests panel — right-anchored */}
      {activePanel === "guests" && (
        <div className=" right-10  top-full z-50 mt-2">
          <GuestsPanel
            guests={guests}
            onSave={(g) => { setGuests(g); setActivePanel(null); }}
          />
        </div>
      )}

      {/* Formula panel — right-anchored */}
      {activePanel === "formula" && (
        <div className="absolute right-12 top-full z-50 mt-2">
          <FormulaPanel
            formula={formula}
            onSelect={(f) => { setFormula(f); setActivePanel(null); }}
          />
        </div>
      )}
    </div>
  );
}