"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search, MapPin, Home, X, ChevronLeft, ChevronRight,
  Minus, Plus, Mountain, Wrench, TicketCheck
} from "lucide-react";

// ─── Types / Constants ──────────────────────────────────────────────────────────

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Guests {
  adults: number;
  children: number;
  pets: boolean;
}

const DESTINATIONS_SEJOURNER = [
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

const DESTINATIONS_ACHETER = [
  { name: "Val d'Isere", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "La Toussuire", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Méribel", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Courchevel", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Les Arcs", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Tignes", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Chamonix", subtitle: "Auvergne-Rhône-Alpes, France" },
  { name: "Flaine", subtitle: "Auvergne-Rhône-Alpes, France" },
];

const STATION_TYPES = ["Station Village", "Haute altitude", "Station familiale", "Station de charme"];
const PROPERTY_TYPES = ["Appartement", "Chalet", "Local commercial"];

const FORMULAS = [
  { value: "hebergement", label: "Hébergement", level: 1 },
  { value: "hebergement+forfait", label: "Hébergement + Forfait", level: 2 },
  { value: "hebergement+forfait+materiel", label: "Hébergement + Forfait + Matériel", level: 3 },
];

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

// ─── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

// ─── FormulaIcons ───────────────────────────────────────────────────────────────

interface FormulaIconsProps {
  formula: string;
}

const FormulaIcons = ({ formula }: FormulaIconsProps) => {
  const f = FORMULAS.find((x) => x.value === formula);
  const level = f?.level ?? 1;
  return (
    <>
      <Home size={14} />
      {level >= 2 && (
        <>
          <span>+</span>
          <TicketCheck size={14} />
        </>
      )}
      {level >= 3 && (
        <>
          <span>+</span>
          <Wrench size={14} />
        </>
      )}
    </>
  );
};

// ─── ViewModeToggle ─────────────────────────────────────────────────────────────

type ViewMode = "Séjourner" | "Acheter";

interface ViewModeToggleProps {
  readonly viewMode: ViewMode;
  readonly onChange: (mode: ViewMode) => void;
}

const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  const isSejourner = viewMode === "Séjourner";
  const isAcheter = viewMode === "Acheter";
  return (
    <div className="relative inline-flex rounded-full bg-gray-100 p-1">
      <div
        className={`absolute inset-y-1 rounded-full bg-white shadow transition-all duration-200 ${
          isSejourner ? "left-1 right-1/2" : "left-1/2 right-1"
        }`}
      />
      <button
        onClick={() => onChange("Séjourner")}
        className={`relative z-10 px-9 py-1 text-sm font-medium transition-colors duration-200 ${
          isSejourner ? "text-gray-800" : "text-gray-600"
        }`}
      >
        Séjourner
      </button>
      <button
        onClick={() => onChange("Acheter")}
        className={`relative z-10 px-9 py-1 text-sm font-medium transition-colors duration-200 ${
          isAcheter ? "text-gray-800" : "text-gray-600"
        }`}
      >
        Acheter
      </button>
    </div>
  );
};

// ─── CalendarPanel ──────────────────────────────────────────────────────────────

interface CalendarPanelProps {
  dateRange: DateRange;
  onSave: (range: DateRange) => void;
  onClear: () => void;
}

function CalendarPanel({ dateRange, onSave, onClear }: CalendarPanelProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [tempRange, setTempRange] = useState<DateRange>(dateRange);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
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
    const cells: React.ReactNode[] = [];
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < todayMidnight;
      const isStart = tempRange.start ? isSameDay(d, tempRange.start) : false;
      const isEnd = tempRange.end ? isSameDay(d, tempRange.end) : false;
      const inRange = isInRange(d, tempRange.start, tempRange.end);
      const isHoverRange =
        tempRange.start && !tempRange.end && hoveredDate
          ? isInRange(d, tempRange.start, hoveredDate)
          : false;
      const isHoverEnd =
        tempRange.start && !tempRange.end && hoveredDate
          ? isSameDay(d, hoveredDate)
          : false;

      cells.push(
        <div
          key={day}
          onClick={() => !isPast && handleDayClick(d)}
          onMouseEnter={() => setHoveredDate(d)}
          onMouseLeave={() => setHoveredDate(null)}
          className={[
            "relative flex h-9 w-9 items-center justify-center text-sm transition-colors",
            isPast ? "cursor-not-allowed text-gray-300" : "cursor-pointer",
            isStart || isEnd ? "z-10 rounded-full bg-[#1B3D6B] font-semibold text-white" : "",
            (inRange || isHoverRange) && !isStart && !isEnd ? "bg-[#1B3D6B]/10 text-[#1B3D6B]" : "",
            isHoverEnd && !isEnd && !isStart ? "rounded-full bg-[#1B3D6B]/20 text-[#1B3D6B]" : "",
            !isPast && !isStart && !isEnd ? "text-gray-800" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  const nightCount =
    tempRange.start && tempRange.end
      ? countNights(tempRange.start, tempRange.end)
      : null;

  const monthName = (y: number, m: number) =>
    new Date(y, m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-8">
        {/* Left month */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <button onClick={prevMonth} className="rounded-full p-1 hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium capitalize">{monthName(viewYear, viewMonth)}</span>
            <div className="w-6" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-medium text-gray-400">
                {d}
              </div>
            ))}
            {renderMonth(viewYear, viewMonth)}
          </div>
        </div>
        {/* Right month */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <div className="w-6" />
            <span className="text-sm font-medium capitalize">{monthName(rightYear, rightMonth)}</span>
            <button onClick={nextMonth} className="rounded-full p-1 hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-medium text-gray-400">
                {d}
              </div>
            ))}
            {renderMonth(rightYear, rightMonth)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        {tempRange.start && tempRange.end ? (
          <span className="text-sm text-gray-600">
            <strong>{nightCount}</strong> nuit{nightCount !== 1 ? "s" : ""}{" · "}
            {formatDate(tempRange.start)} – {formatDate(tempRange.end)}
          </span>
        ) : (
          <span className="text-sm text-gray-400">Sélectionnez vos dates</span>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setTempRange({ start: null, end: null });
              onClear();
            }}
            className="text-sm underline text-gray-500 hover:text-gray-800"
          >
            Effacer les dates
          </button>
          <button
            onClick={() => onSave(tempRange)}
            className="rounded-lg bg-[#1B3D6B] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GuestsPanel ────────────────────────────────────────────────────────────────

interface GuestsPanelProps {
  guests: Guests;
  onSave: (g: Guests) => void;
}

function GuestsPanel({ guests, onSave }: GuestsPanelProps) {
  const [temp, setTemp] = useState<Guests>(guests);
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Adulte</div>
          <div className="text-xs text-gray-400">18 ans et plus</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled={temp.adults <= 1}
            onClick={() => setTemp((t) => ({ ...t, adults: t.adults - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{temp.adults}</span>
          <button
            onClick={() => setTemp((t) => ({ ...t, adults: t.adults + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Enfants</div>
          <div className="text-xs text-gray-400">Moins de 18 ans</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled={temp.children <= 0}
            onClick={() => setTemp((t) => ({ ...t, children: t.children - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm">{temp.children}</span>
          <button
            onClick={() => setTemp((t) => ({ ...t, children: t.children + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      {/* Pets */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Animaux de compagnie</div>
        <input
          type="checkbox"
          checked={temp.pets}
          onChange={(e) => setTemp((t) => ({ ...t, pets: e.target.checked }))}
          className="h-4 w-4 accent-[#1B3D6B]"
        />
      </div>
      <button
        onClick={() => onSave(temp)}
        className="mt-2 w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── FormulaPanel ───────────────────────────────────────────────────────────────

interface FormulaPanelProps {
  formula: string;
  onSelect: (value: string) => void;
}

function FormulaPanel({ formula, onSelect }: FormulaPanelProps) {
  return (
    <div className="flex flex-col gap-1 p-2">
      {FORMULAS.map((f) => (
        <button
          key={f.value}
          onClick={() => onSelect(f.value)}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[#1B3D6B]/5",
            formula === f.value ? "bg-[#1B3D6B]/8 font-medium" : "text-gray-800",
          ].join(" ")}
        >
          <Home size={14} />
          {f.level >= 2 && (
            <>
              <span>+</span>
              <TicketCheck size={14} />
            </>
          )}
          {f.level >= 3 && (
            <>
              <span>+</span>
              <Wrench size={14} />
            </>
          )}
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ─── DestinationPanelSejourner ──────────────────────────────────────────────────

interface DestinationPanelSejournerProps {
  value: string;
  onSelect: (v: string) => void;
}

function DestinationPanelSejourner({ value, onSelect }: DestinationPanelSejournerProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Choisir un type de station
        </div>
        <div className="flex flex-wrap gap-2">
          {STATION_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[#1B3D6B] hover:text-[#1B3D6B]"
            >
              <Mountain size={13} />
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Ou une destination populaire
        </div>
        {DESTINATIONS_SEJOURNER.map((d) => (
          <button
            key={d.name}
            onClick={() => onSelect(d.isAll ? "" : d.name)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
              (d.isAll ? value === "" : value === d.name) ? "bg-[#1B3D6B]/10" : "",
            ].join(" ")}
          >
            <MapPin size={15} className="shrink-0 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{d.name}</div>
              {d.subtitle && <div className="text-xs text-gray-400">{d.subtitle}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── LocalityPanel ──────────────────────────────────────────────────────────────

interface LocalityPanelProps {
  value: string;
  onSelect: (v: string) => void;
}

function LocalityPanel({ value, onSelect }: LocalityPanelProps) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Notre sélection
      </div>
      {DESTINATIONS_ACHETER.map((d) => (
        <button
          key={d.name}
          onClick={() => onSelect(d.name)}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
            value === d.name ? "bg-[#1B3D6B]/10" : "",
          ].join(" ")}
        >
          <MapPin size={15} className="shrink-0 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">{d.name}</div>
            <div className="text-xs text-gray-400">{d.subtitle}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── PropertyTypePanel ──────────────────────────────────────────────────────────

interface PropertyTypePanelProps {
  selected: string[];
  onSave: (types: string[]) => void;
}

function PropertyTypePanel({ selected, onSave }: PropertyTypePanelProps) {
  const [temp, setTemp] = useState<string[]>(selected);

  const toggle = (type: string) => {
    setTemp((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      {PROPERTY_TYPES.map((type) => (
        <label key={type} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={temp.includes(type)}
            onChange={() => toggle(type)}
            className="h-4 w-4 rounded accent-[#1B3D6B]"
          />
          <span className="text-sm text-gray-700">{type}</span>
        </label>
      ))}
      <button
        onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── BudgetPanel ────────────────────────────────────────────────────────────────

interface BudgetPanelProps {
  budget: number | null;
  onSave: (b: number) => void;
}

function BudgetPanel({ budget, onSave }: BudgetPanelProps) {
  const [temp, setTemp] = useState<number>(budget ?? 2000000);
  const MAX = 5000000;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-sm font-medium text-gray-700">Sélectionnez votre budget maximum</div>
      <input
        type="range"
        min={0}
        max={MAX}
        step={50000}
        value={temp}
        onChange={(e) => setTemp(Number(e.target.value))}
        className="w-full accent-[#1B3D6B] mb-4"
        style={{ accentColor: "#1B3D6B" }}
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 shrink-0">Budget maximum</label>
        <input
          type="number"
          value={temp}
          onChange={(e) => setTemp(Math.min(MAX, Math.max(0, Number(e.target.value))))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B3D6B]/30"
        />
      </div>
      <button
        onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── Main SearchBar ─────────────────────────────────────────────────────────────

export default function SearchBar() {
  const [viewMode, setViewMode] = useState<ViewMode>("Séjourner");
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Séjourner state
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, pets: false });
  const [formula, setFormula] = useState("hebergement");

  // Acheter state
  const [locality, setLocality] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<number | null>(null);

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

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setActivePanel(null);
  };

  // Display labels
  const destLabel = destination || "Toutes les destinations";
  const dateLabel =
    dateRange.start && dateRange.end
      ? `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}`
      : "Sélectionner des dates";
  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} participant${totalGuests > 1 ? "s" : ""}`;
  const propertyLabel =
    propertyTypes.length > 0 ? propertyTypes.join(", ") : "Sélectionner des biens";
  const budgetLabel = budget ? `${budget.toLocaleString("fr-FR")} €` : "Budget maximum";

  const pillarBase =
    "relative flex flex-col justify-center cursor-pointer select-none px-4 py-2 transition-colors rounded-full hover:bg-white/70";
  const pillarActive = "bg-white shadow-sm";
  const isActive = (p: string) => activePanel === p;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <ViewModeToggle viewMode={viewMode} onChange={handleViewModeChange} />
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-full bg-white/50 backdrop-blur px-2 py-1 shadow-md gap-1">
        {viewMode === "Séjourner" ? (
          <>
            {/* Destination */}
            <div
              onClick={() => togglePanel("destination")}
              className={[pillarBase, isActive("destination") ? pillarActive : "", "flex-1 text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Où partir ?</span>
              <span className="text-sm text-gray-800 truncate">
                {destLabel.length > 20 ? destLabel.slice(0, 19) + "…" : destLabel}
              </span>
              {destination && (
                <button
                  onClick={(e) => { e.stopPropagation(); setDestination(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Dates */}
            <div
              onClick={() => togglePanel("dates")}
              className={[pillarBase, isActive("dates") ? pillarActive : "", "min-w-[160px] text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Quand ?</span>
              <span className="text-sm text-gray-800">{dateLabel}</span>
              {dateRange.start && (
                <button
                  onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Guests */}
            <div
              onClick={() => togglePanel("guests")}
              className={[pillarBase, isActive("guests") ? pillarActive : "", "min-w-[120px] text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Qui ?</span>
              <span className="text-sm text-gray-800">{guestLabel}</span>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Formula */}
            <div
              onClick={() => togglePanel("formula")}
              className={[pillarBase, isActive("formula") ? pillarActive : "", "min-w-[80px] text-left pr-3"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Formule</span>
              <span className="flex items-center gap-1 text-sm text-gray-800">
                <FormulaIcons formula={formula} />
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Locality */}
            <div
              onClick={() => togglePanel("locality")}
              className={[pillarBase, isActive("locality") ? pillarActive : "", "flex-1 text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Localité</span>
              <span className="text-sm text-gray-800">{locality || "Station, région..."}</span>
              {locality && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLocality(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Property type */}
            <div
              onClick={() => togglePanel("property")}
              className={[pillarBase, isActive("property") ? pillarActive : "", "min-w-[160px] text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Type de bien</span>
              <span className="text-sm text-gray-800">{propertyLabel}</span>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Budget */}
            <div
              onClick={() => togglePanel("budget")}
              className={[pillarBase, isActive("budget") ? pillarActive : "", "min-w-[130px] text-left"].join(" ")}
            >
              <span className="text-xs text-gray-400 font-medium">Budget</span>
              <span className="text-sm text-gray-800">{budgetLabel}</span>
              {budget && (
                <button
                  onClick={(e) => { e.stopPropagation(); setBudget(null); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </>
        )}

        {/* Search button */}
        <button
          onClick={() => setActivePanel(null)}
          className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B3D6B] text-white transition-colors hover:opacity-90"
          aria-label="Rechercher"
        >
          <Search size={16} />
        </button>
      </div>

      {/* ── Dropdowns ── */}
      {activePanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2">
          {/* Séjourner panels */}
          {activePanel === "destination" && (
            <div className="rounded-2xl bg-white shadow-xl">
              <DestinationPanelSejourner
                value={destination}
                onSelect={(d) => { setDestination(d); setActivePanel("dates"); }}
              />
            </div>
          )}
          {activePanel === "dates" && (
            <div className="rounded-2xl bg-white shadow-xl">
              <CalendarPanel
                dateRange={dateRange}
                onSave={(r) => { setDateRange(r); setActivePanel(null); }}
                onClear={() => setDateRange({ start: null, end: null })}
              />
            </div>
          )}

          {/* Acheter panels */}
          {activePanel === "locality" && (
            <div className="rounded-2xl bg-white shadow-xl">
              <LocalityPanel
                value={locality}
                onSelect={(d) => { setLocality(d); setActivePanel("property"); }}
              />
            </div>
          )}
          {activePanel === "property" && (
            <div className="rounded-2xl bg-white shadow-xl">
              <PropertyTypePanel
                selected={propertyTypes}
                onSave={(types) => { setPropertyTypes(types); setActivePanel(null); }}
              />
            </div>
          )}
        </div>
      )}

      {/* Guests panel */}
      {activePanel === "guests" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl bg-white shadow-xl">
          <GuestsPanel
            guests={guests}
            onSave={(g) => { setGuests(g); setActivePanel(null); }}
          />
        </div>
      )}

      {/* Formula panel */}
      {activePanel === "formula" && (
        <div className="absolute right-0 top-full z-50 mt-2 rounded-2xl bg-white shadow-xl min-w-[300px]">
          <FormulaPanel
            formula={formula}
            onSelect={(f) => { setFormula(f); setActivePanel(null); }}
          />
        </div>
      )}

      {/* Budget panel */}
      {activePanel === "budget" && (
        <div className="absolute right-0 top-full z-50 mt-2 rounded-2xl bg-white shadow-xl min-w-[300px]">
          <BudgetPanel
            budget={budget}
            onSave={(b) => { setBudget(b); setActivePanel(null); }}
          />
        </div>
      )}
    </div>
  );
}