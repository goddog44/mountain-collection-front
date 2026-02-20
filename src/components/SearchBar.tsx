"use client";

import { useRouter } from "next/navigation";
import {
  Search, MapPin, Home, X, ChevronLeft, ChevronRight,
  Minus, Plus, Mountain, Wrench, TicketCheck, ChevronDown, Info,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// ─── Types / Constants ────────────────────────────────────────────────────────

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Guests {
  adults: number;
  children: number;
  childrenAges: number[];
  pets: boolean;
}

type Formula = "hebergement" | "hebergement+forfait" | "hebergement+forfait+materiel";

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
  { label: "Station Village" },
  { label: "Haute altitude" },
  { label: "Station familiale" },
  { label: "Station de charme" },
];

const FORMULAS: { value: Formula; label: string; level: number }[] = [
  { value: "hebergement", label: "Hébergement", level: 1 },
  { value: "hebergement+forfait", label: "Hébergement + Forfait", level: 2 },
  { value: "hebergement+forfait+materiel", label: "Hébergement + Forfait + Matériel", level: 3 },
];

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const CHILD_AGES = Array.from({ length: 18 }, (_, i) => i);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(d: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  return d > start && d < end;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function countNights(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── FormulaIcons ─────────────────────────────────────────────────────────────

function FormulaIcons({ formula }: { formula: Formula }) {
  const f = FORMULAS.find((x) => x.value === formula);
  const level = f?.level ?? 1;
  return (
    <span className="flex items-center gap-1 text-sm font-semibold search-cell ml-8">
      <Home size={14} />
      {level >= 2 && (
        <><span className="text-xs">+</span>
          <Image src="/images/alpine.png" alt="ski" width={16} height={16} /></>
      )}
      {level >= 3 && (
        <><span className="text-xs">+</span>
          <Image src="/images/tools.png" alt="tools" width={16} height={16} /></>
      )}
    </span>
  );
}

// ─── CalendarPanel ────────────────────────────────────────────────────────────

function CalendarPanel({
  dateRange, onSave, onClear,
}: {
  dateRange: DateRange;
  onSave: (range: DateRange) => void;
  onClear: () => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [tempRange, setTempRange] = useState<DateRange>(dateRange);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (d: Date) => {
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: d, end: null });
    } else {
      if (d < tempRange.start) setTempRange({ start: d, end: tempRange.start });
      else setTempRange({ start: tempRange.start, end: d });
    }
  };

  const renderMonth = (year: number, month: number): React.ReactNode[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: React.ReactNode[] = [];
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < todayMidnight;
      const isStart = tempRange.start ? isSameDay(d, tempRange.start) : false;
      const isEnd = tempRange.end ? isSameDay(d, tempRange.end) : false;
      const inRange = isInRange(d, tempRange.start, tempRange.end);
      const isHoverRange = tempRange.start && !tempRange.end && hoveredDate
        ? isInRange(d, tempRange.start, hoveredDate) : false;
      const isHoverEnd = tempRange.start && !tempRange.end && hoveredDate
        ? isSameDay(d, hoveredDate) : false;
      const isSelected = isStart || isEnd || inRange;

      cells.push(
        <div key={day}
          onClick={() => !isPast && handleDayClick(d)}
          onMouseEnter={() => setHoveredDate(d)}
          onMouseLeave={() => setHoveredDate(null)}
          className={[
            "relative flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors select-none",
            isPast ? "cursor-not-allowed text-gray-300" : "cursor-pointer",
            isSelected ? "bg-[#1B3D6B] font-semibold text-white" : "",
            !isSelected && (isHoverRange || isHoverEnd) ? "bg-[#1B3D6B]/15 text-[#1B3D6B]" : "",
            !isSelected && !isHoverRange && !isHoverEnd && !isPast ? "text-gray-800 hover:bg-gray-100" : "",
          ].filter(Boolean).join(" ")}>
          {day}
        </div>
      );
    }
    return cells;
  };

  const nightCount = tempRange.start && tempRange.end
    ? countNights(tempRange.start, tempRange.end) : null;

  const leftName = new Date(viewYear, viewMonth, 1).toLocaleDateString("fr-FR", { month: "long" });
  const rightName = new Date(rightYear, rightMonth, 1).toLocaleDateString("fr-FR", { month: "long" });
  const headerLabel = `${leftName} - ${rightName} ${rightYear}`;

  return (
    <div className="p-6 min-w-[680px]">
      <div className="mb-1 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <span className="text-base font-semibold text-gray-900 capitalize">{headerLabel}</span>
        <button onClick={nextMonth} className="rounded-full p-2 hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex gap-10">
        {[{ year: viewYear, month: viewMonth }, { year: rightYear, month: rightMonth }].map((m, mi) => (
          <div key={mi} className="flex-1">
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map((d, i) => (
                <div key={i} className="flex h-9 items-center justify-center text-xs font-semibold text-[#1B3D6B]">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {renderMonth(m.year, m.month)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        {tempRange.start && tempRange.end ? (
          <span className="text-sm font-semibold text-gray-800">
            {nightCount} nuit{nightCount !== 1 ? "s" : ""}
            <span className="font-normal text-gray-500 ml-2">
              {formatDate(tempRange.start)} - {formatDate(tempRange.end)}
            </span>
          </span>
        ) : <span className="text-sm text-gray-400" />}
        <div className="flex items-center gap-4">
          <button onClick={() => { setTempRange({ start: null, end: null }); onClear(); }}
            className="text-sm underline text-gray-600 hover:text-gray-900">
            Effacer les dates
          </button>
          <button onClick={() => onSave(tempRange)}
            className="rounded-xl bg-[#1B3D6B] px-8 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GuestsPanel ──────────────────────────────────────────────────────────────

function GuestsPanel({ guests, onSave }: { guests: Guests; onSave: (g: Guests) => void }) {
  const [temp, setTemp] = useState<Guests>(guests);

  const updateChildCount = (count: number) => {
    const newAges = Array.from({ length: count }, (_, i) => temp.childrenAges[i] ?? 8);
    setTemp((t) => ({ ...t, children: count, childrenAges: newAges }));
  };

  return (
    <div className="flex flex-col gap-4 p-6 w-[380px] border border-gray-200 rounded-md ">
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">Adulte</div>
          <div className="text-xs text-gray-900">18 ans et plus</div>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={temp.adults <= 1}
            onClick={() => setTemp((t) => ({ ...t, adults: t.adults - 1 }))}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-900 text-gray-900 disabled:opacity-30 hover:border-gray-500 transition-colors">
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm font-semibold">{temp.adults}</span>
          <button onClick={() => setTemp((t) => ({ ...t, adults: t.adults + 1 }))}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-900 text-gray-900 hover:border-gray-500 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>
      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">Enfants</div>
          <div className="text-xs text-gray-900">Moins de 18 ans</div>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={temp.children <= 0}
            onClick={() => updateChildCount(temp.children - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-900 text-gray-900 disabled:opacity-30 hover:border-gray-500 transition-colors">
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm font-semibold">{temp.children}</span>
          <button onClick={() => updateChildCount(temp.children + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-900 text-gray-900 hover:border-gray-500 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>
      {/* Child ages */}
      {temp.children > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: temp.children }, (_, i) => (
            <div key={i} className="relative">
              <select
                value={temp.childrenAges[i] ?? 8}
                onChange={(e) => {
                  const ages = [...temp.childrenAges];
                  ages[i] = Number(e.target.value);
                  setTemp((t) => ({ ...t, childrenAges: ages }));
                }}
                className="w-[160px] appearance-none rounded-lg border border-black px-4 pt-5 pb-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#1B3D6B]/30 bg-white">
                {CHILD_AGES.map((age) => (
                  <option key={age} value={age}>{age} an{age !== 1 ? "s" : ""}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown size={14} className="text-gray-500" />
              </div>
              <label className="absolute left-4 top-1.5 text-[10px] font-medium text-gray-400">
                Age de l&apos;enfant {i + 1}
              </label>
            </div>
          ))}
          <div className="col-span-2 flex items-start gap-2 text-xs text-gray-700 mt-2">
            <Info size={13} className="shrink-0 mt-0.5 text-gray-400" />
            <span>Renseigner l&apos;âge des enfants au début du séjour vous permet de bénéficier du tarif exact des séjours</span>
          </div>
        </div>
      )}
      {/* Pets */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-900">Animaux de compagnie</div>
        <input type="checkbox" checked={temp.pets}
          onChange={(e) => setTemp((t) => ({ ...t, pets: e.target.checked }))}
          className="h-5 w-5 rounded border border-gray-300 accent-[#1B3D6B] cursor-pointer" />
      </div>
      <button onClick={() => onSave(temp)}
        className="w-full rounded-md bg-[#1B3D6B] py-3 text-sm font-semibold text-white hover:opacity-90">
        Enregistrer
      </button>
    </div>
  );
}

// ─── FormulaPanel ─────────────────────────────────────────────────────────────

function FormulaPanel({ formula, onSelect }: { formula: Formula; onSelect: (f: Formula) => void }) {
  return (
    <div className="flex flex-col gap-1 p-3 min-w-[320px]">
      {FORMULAS.map((f) => (
        <button key={f.value} onClick={() => onSelect(f.value)}
          className={["flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[#1B3D6B]/5",
            formula === f.value ? "bg-[#1B3D6B]/10 font-semibold text-[#1B3D6B]" : "text-gray-800"].join(" ")}>
          <Home size={14} />
          {f.level >= 2 && (
            <><span className="text-gray-400">+</span>
              <Image src="/images/alpine.png" alt="ski" width={20} height={20} className="shrink-0" /></>
          )}
          {f.level >= 3 && (
            <><span className="text-gray-400">+</span>
              <Image src="/images/tools.png" alt="tools" width={20} height={20} className="shrink-0" /></>
          )}
          <span className="ml-1">{f.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── DestinationPanel ─────────────────────────────────────────────────────────

function DestinationPanel({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <div className="mb-3 text-sm font-bold text-gray-900">Choisir un type de station</div>
        <div className="flex flex-wrap gap-2">
          {STATION_TYPES.map((t) => (
            <button key={t.label} onClick={() => onSelect(t.label)}
              className={[
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                value === t.label
                  ? "border-[#1B3D6B] bg-[#1B3D6B]/5 text-[#1B3D6B]"
                  : "border-gray-300 text-gray-700 hover:border-[#1B3D6B] hover:text-[#1B3D6B]"
              ].join(" ")}>
              <Mountain size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-bold text-gray-900">Ou une destination populaire</div>
        <div className="flex flex-col">
          {DESTINATIONS.map((d) => (
            <button key={d.name} onClick={() => onSelect(d.isAll ? "" : d.name)}
              className={["flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
                (d.isAll ? value === "" : value === d.name) ? "bg-[#1B3D6B]/10" : ""].join(" ")}>
              <Image src="/images/mountain.png" alt={d.name} width={20} height={20} className="shrink-0" />
              <div>
                <div className="text-sm font-medium text-gray-900">{d.name}</div>
                {d.subtitle && <div className="text-xs text-gray-400">{d.subtitle}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main SearchBar (Header version) ─────────────────────────────────────────
// Same design as SearchBarHome but:
// - No Séjourner/Acheter toggle
// - Compact pill bar (bg-white, shadow-lg, rounded-full)
// - Same dropdowns with same z-index behavior

export default function SearchBar() {
  const router = useRouter();

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, childrenAges: [], pets: false });
  const [formula, setFormula] = useState<Formula>("hebergement");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = (panel: string) =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  // Display labels — same as SearchBarHome
  const destLabel = destination || "Station, région...";
  const dateLabel = dateRange.start && dateRange.end
    ? `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
    : "Sélectionner des dates";
  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} participant${totalGuests > 1 ? "s" : ""}`;

  const isActive = (p: string) => activePanel === p;

  // Same pillar style as SearchBarHome
  const pillarBase = "relative flex flex-col justify-center cursor-pointer select-none px-5 py-2 transition-colors rounded-full hover:bg-gray-100";
  const pillarActive = "bg-gray-100";

  return (
    <div ref={containerRef} className="relative flex items-center w-full max-w-2xl">

      {/* ── Compact Search Bar — same white pill as SearchBarHome ── */}
      <div className="flex w-full items-center rounded-full bg-white shadow-md px-2 py-1 gap-0">

        {/* Destination */}
        <div onClick={() => togglePanel("destination")}
          className={[pillarBase, isActive("destination") ? pillarActive : "", "flex-1 min-w-0 text-left"].join(" ")}>
          <p className="truncate text-sm text-gray-500">{destLabel}</p>
          {destination && (
            <button onClick={(e) => { e.stopPropagation(); setDestination(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200">
              <X size={12} />
            </button>
          )}
        </div>

        <div className="h-7 w-px bg-gray-300 shrink-0" />

        {/* Dates */}
        <div onClick={() => togglePanel("dates")}
          className={[pillarBase, isActive("dates") ? pillarActive : "", "min-w-[170px] text-center"].join(" ")}>
          <p className={["text-sm font-semibold search-cell ml-8", dateRange.start ? "text-gray-900" : "text-gray-500"].join(" ")}>
            {dateLabel}
          </p>
          {dateRange.start && (
            <button onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200">
              <X size={12} />
            </button>
          )}
        </div>

        <div className="h-7 w-px bg-gray-300 shrink-0" />

        {/* Guests */}
        <div onClick={() => togglePanel("guests")}
          className={[pillarBase, isActive("guests") ? pillarActive : "", "min-w-[130px] text-center"].join(" ")}>
          <p className="text-sm font-semibold text-gray-900 search-cell ml-8">{guestLabel}</p>
        </div>

        <div className="h-7 w-px bg-gray-300 shrink-0" />

        {/* Formula */}
        <div onClick={() => togglePanel("formula")}
          className={[pillarBase, isActive("formula") ? pillarActive : "", "px-4 text-center"].join(" ")}>
          <FormulaIcons formula={formula} />
        </div>

        {/* Search button */}
        <button
          onClick={() => {
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
          }}
          className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B3D6B] text-white hover:opacity-90"
          aria-label="Rechercher">
          <Search size={16} />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          DROPDOWNS — same z-[9999] absolute behavior as SearchBarHome
          so they appear above all page content
      ══════════════════════════════════════════════════════ */}

      {/* Destination panel */}
      {isActive("destination") && (
        <div className="absolute left-0 top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-2xl overflow-auto max-h-[80vh]">
            <DestinationPanel value={destination}
              onSelect={(d) => { setDestination(d); setActivePanel("dates"); }} />
          </div>
        </div>
      )}

      {/* Dates panel */}
      {isActive("dates") && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">
            <CalendarPanel dateRange={dateRange}
              onSave={(r) => { setDateRange(r); setActivePanel("guests"); }}
              onClear={() => setDateRange({ start: null, end: null })} />
          </div>
        </div>
      )}

      {/* Guests panel */}
      {isActive("guests") && (
        <div className="absolute right-16 top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">
            <GuestsPanel guests={guests}
              onSave={(g) => { setGuests(g); setActivePanel("formula"); }} />
          </div>
        </div>
      )}

      {/* Formula panel */}
      {isActive("formula") && (
        <div className="absolute right-10 top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">
            <FormulaPanel formula={formula}
              onSelect={(f) => { setFormula(f); setActivePanel(null); }} />
          </div>
        </div>
      )}
    </div>
  );
}