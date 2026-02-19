"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search, MapPin, Home, X, ChevronLeft, ChevronRight,
  Minus, Plus, Mountain, Wrench, TicketCheck, ChevronDown, Info
} from "lucide-react";

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

// Each station type has its own icon character (SVG-like unicode ski symbols)
const STATION_TYPES = [
  { label: "Station Village", icon: "⛪" },
  { label: "Haute altitude", icon: "❄️" },
  { label: "Station familiale", icon: "❄️" },
  { label: "Station de charme", icon: "❄️" },
];

const PROPERTY_TYPES = ["Appartement", "Chalet", "Local commercial"];

const FORMULAS = [
  { value: "hebergement", label: "Hébergement", level: 1 },
  { value: "hebergement+forfait", label: "Hébergement + Forfait", level: 2 },
  { value: "hebergement+forfait+materiel", label: "Hébergement + Forfait + Matériel", level: 3 },
];

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const CHILD_AGES = Array.from({ length: 18 }, (_, i) => i); // 0–17

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function monthLabel(y: number, m: number): string {
  return new Date(y, m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

// ─── FormulaIcons ─────────────────────────────────────────────────────────────

interface FormulaIconsProps { formula: string; }

const FormulaIcons = ({ formula }: FormulaIconsProps) => {
  const f = FORMULAS.find((x) => x.value === formula);
  const level = f?.level ?? 1;
  return (
    <>
      <Home size={14} />
      {level >= 2 && (<><span>+</span><TicketCheck size={14} /></>)}
      {level >= 3 && (<><span>+</span><Wrench size={14} /></>)}
    </>
  );
};

// ─── ViewModeToggle ───────────────────────────────────────────────────────────

type ViewMode = "Séjourner" | "Acheter";

interface ViewModeToggleProps {
  readonly viewMode: ViewMode;
  readonly onChange: (mode: ViewMode) => void;
}

const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  const isSejourner = viewMode === "Séjourner";
  const isAcheter = viewMode === "Acheter";
  return (
    <div className="relative inline-flex rounded-full bg-white/25 p-1 backdrop-blur-sm">
      <div className={`absolute inset-y-1 rounded-full bg-white shadow-md transition-all duration-300 ${isSejourner ? "left-1 right-1/2" : "left-1/2 right-1"}`} />
      <button onClick={() => onChange("Séjourner")}
        className={`relative z-10 px-9 py-1.5 text-sm font-semibold transition-colors duration-200 ${isSejourner ? "text-gray-900" : "text-white"}`}>
        Séjourner
      </button>
      <button onClick={() => onChange("Acheter")}
        className={`relative z-10 px-9 py-1.5 text-sm font-semibold transition-colors duration-200 ${isAcheter ? "text-gray-900" : "text-white"}`}>
        Acheter
      </button>
    </div>
  );
};

// ─── CalendarPanel ────────────────────────────────────────────────────────────

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
      // All days in the selected range get filled circles like screenshots
      const inRange = isInRange(d, tempRange.start, tempRange.end);
      const isHoverRange = tempRange.start && !tempRange.end && hoveredDate
        ? isInRange(d, tempRange.start, hoveredDate) : false;
      const isHoverEnd = tempRange.start && !tempRange.end && hoveredDate
        ? isSameDay(d, hoveredDate) : false;

      // In-range days = same full dark circle as start/end (per screenshots)
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
          ].filter(Boolean).join(" ")}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  const nightCount = tempRange.start && tempRange.end
    ? countNights(tempRange.start, tempRange.end) : null;

  // Header shows both months like "février - mars 2026"
  const leftName = new Date(viewYear, viewMonth, 1).toLocaleDateString("fr-FR", { month: "long" });
  const rightName = new Date(rightYear, rightMonth, 1).toLocaleDateString("fr-FR", { month: "long" });
  const headerLabel = `${leftName} - ${rightName} ${rightYear}`;

  return (
    <div className="p-6 min-w-[700px]">
      {/* Single header with both months + nav arrows */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <span className="text-base font-semibold text-gray-900 capitalize">{headerLabel}</span>
        <button onClick={nextMonth} className="rounded-full p-2 hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Two month grids side by side */}
      <div className="flex gap-10">
        {/* Left month */}
        <div className="flex-1">
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-semibold text-[#1B3D6B]">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {renderMonth(viewYear, viewMonth)}
          </div>
        </div>
        {/* Right month */}
        <div className="flex-1">
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d, i) => (
              <div key={i} className="flex h-9 items-center justify-center text-xs font-semibold text-[#1B3D6B]">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {renderMonth(rightYear, rightMonth)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        {tempRange.start && tempRange.end ? (
          <span className="text-sm font-semibold text-gray-800">
            {nightCount} nuit{nightCount !== 1 ? "s" : ""}
            <span className="font-normal text-gray-500 ml-2">
              {formatDate(tempRange.start)} - {formatDate(tempRange.end)}
            </span>
          </span>
        ) : (
          <span className="text-sm text-gray-400" />
        )}
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

interface GuestsPanelProps {
  guests: Guests;
  onSave: (g: Guests) => void;
}

function GuestsPanel({ guests, onSave }: GuestsPanelProps) {
  const [temp, setTemp] = useState<Guests>(guests);

  const updateChildCount = (count: number) => {
    const newAges = Array.from({ length: count }, (_, i) => temp.childrenAges[i] ?? 8);
    setTemp((t) => ({ ...t, children: count, childrenAges: newAges }));
  };

  return (
    <div className="flex flex-col gap-5 p-5 min-w-[380px]">
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">Adulte</div>
          <div className="text-xs text-gray-500">18 ans et plus</div>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={temp.adults <= 1}
            onClick={() => setTemp((t) => ({ ...t, adults: t.adults - 1 }))}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-500 transition-colors">
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm font-semibold">{temp.adults}</span>
          <button onClick={() => setTemp((t) => ({ ...t, adults: t.adults + 1 }))}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 hover:border-gray-500 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">Enfants</div>
          <div className="text-xs text-gray-500">Moins de 18 ans</div>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={temp.children <= 0}
            onClick={() => updateChildCount(temp.children - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-500 transition-colors">
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-sm font-semibold">{temp.children}</span>
          <button onClick={() => updateChildCount(temp.children + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-600 hover:border-gray-500 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Age dropdowns per child — appears when children > 0 */}
      {temp.children > 0 && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: temp.children }, (_, i) => (
            <div key={i} className="relative">
              <select
                value={temp.childrenAges[i] ?? 8}
                onChange={(e) => {
                  const ages = [...temp.childrenAges];
                  ages[i] = Number(e.target.value);
                  setTemp((t) => ({ ...t, childrenAges: ages }));
                }}
                className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B3D6B]/30 bg-white"
              >
                {CHILD_AGES.map((age) => (
                  <option key={age} value={age}>{age} an{age !== 1 ? "s" : ""}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown size={14} className="text-gray-500" />
              </div>
              <label className="absolute left-4 top-1 text-[10px] font-medium text-gray-400">
                Age de l&apos;enfant {i + 1}
              </label>
            </div>
          ))}
          {/* Info message */}
          <div className="flex items-start gap-2 text-xs text-gray-500">
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
          className="h-5 w-5 rounded border-2 border-gray-300 accent-[#1B3D6B] cursor-pointer" />
      </div>

      <button onClick={() => onSave(temp)}
        className="w-full rounded-xl bg-[#1B3D6B] py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Enregistrer
      </button>
    </div>
  );
}

// ─── FormulaPanel ─────────────────────────────────────────────────────────────

interface FormulaPanelProps {
  formula: string;
  onSelect: (value: string) => void;
}

function FormulaPanel({ formula, onSelect }: FormulaPanelProps) {
  return (
    <div className="flex flex-col gap-1 p-3 min-w-[320px]">
      {FORMULAS.map((f) => (
        <button key={f.value} onClick={() => onSelect(f.value)}
          className={["flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[#1B3D6B]/5",
            formula === f.value ? "bg-[#1B3D6B]/10 font-semibold text-[#1B3D6B]" : "text-gray-800"].join(" ")}>
          <Home size={14} />
          {f.level >= 2 && (<><span className="text-gray-400">+</span><TicketCheck size={14} /></>)}
          {f.level >= 3 && (<><span className="text-gray-400">+</span><Wrench size={14} /></>)}
          <span className="ml-1">{f.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── DestinationPanel (Séjourner) ─────────────────────────────────────────────

interface DestinationPanelSejournerProps {
  value: string;
  onSelect: (v: string) => void;
}

function DestinationPanelSejourner({ value, onSelect }: DestinationPanelSejournerProps) {
  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Station types with bordered pill buttons */}
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

      {/* Popular destinations */}
      <div>
        <div className="mb-2 text-sm font-bold text-gray-900">Ou une destination populaire</div>
        <div className="flex flex-col">
          {DESTINATIONS_SEJOURNER.map((d) => (
            <button key={d.name} onClick={() => onSelect(d.isAll ? "" : d.name)}
              className={["flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
                (d.isAll ? value === "" : value === d.name) ? "bg-[#1B3D6B]/8" : ""].join(" ")}>
              <Mountain size={15} className="shrink-0 text-gray-400" />
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

// ─── LocalityPanel (Acheter) ──────────────────────────────────────────────────

interface LocalityPanelProps {
  value: string;
  onSelect: (v: string) => void;
}

function LocalityPanel({ value, onSelect }: LocalityPanelProps) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Notre sélection</div>
      {DESTINATIONS_ACHETER.map((d) => (
        <button key={d.name} onClick={() => onSelect(d.name)}
          className={["flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
            value === d.name ? "bg-[#1B3D6B]/10" : ""].join(" ")}>
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

// ─── PropertyTypePanel (Acheter) ──────────────────────────────────────────────

interface PropertyTypePanelProps {
  selected: string[];
  onSave: (types: string[]) => void;
}

function PropertyTypePanel({ selected, onSave }: PropertyTypePanelProps) {
  const [temp, setTemp] = useState<string[]>(selected);
  const toggle = (type: string) => {
    setTemp((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };
  return (
    <div className="flex flex-col gap-3 p-4 min-w-[260px]">
      {PROPERTY_TYPES.map((type) => (
        <label key={type} className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={temp.includes(type)} onChange={() => toggle(type)}
            className="h-4 w-4 rounded accent-[#1B3D6B]" />
          <span className="text-sm text-gray-700">{type}</span>
        </label>
      ))}
      <button onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90">
        Enregistrer
      </button>
    </div>
  );
}

// ─── BudgetPanel (Acheter) ────────────────────────────────────────────────────

interface BudgetPanelProps {
  budget: number | null;
  onSave: (b: number) => void;
}

function BudgetPanel({ budget, onSave }: BudgetPanelProps) {
  const [temp, setTemp] = useState<number>(budget ?? 2000000);
  const MAX = 5000000;
  return (
    <div className="flex flex-col gap-4 p-4 min-w-[280px]">
      <div className="text-sm font-medium text-gray-700">Sélectionnez votre budget maximum</div>
      <input type="range" min={0} max={MAX} step={50000} value={temp}
        onChange={(e) => setTemp(Number(e.target.value))}
        className="w-full mb-2" style={{ accentColor: "#1B3D6B" }} />
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-sm text-gray-600">Budget maximum</label>
        <input type="number" value={temp}
          onChange={(e) => setTemp(Math.min(MAX, Math.max(0, Number(e.target.value))))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B3D6B]/30" />
      </div>
      <button onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90">
        Enregistrer
      </button>
    </div>
  );
}

// ─── Main SearchBar ───────────────────────────────────────────────────────────

export default function SearchBar() {
  const [viewMode, setViewMode] = useState<ViewMode>("Séjourner");
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Séjourner state
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, childrenAges: [], pets: false });
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
  const destLabel = destination || "Station, région...";
  const dateLabel = dateRange.start && dateRange.end
    ? `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`
    : "Sélectionner des dates";
  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} participant${totalGuests > 1 ? "s" : ""}`;
  const localityLabel = locality || "Station, région...";
  const propertyLabel = propertyTypes.length > 0 ? propertyTypes.join(", ") : "Sélectionner des biens";
  const budgetLabel = budget ? `${budget.toLocaleString("fr-FR")} €` : "Budget maximum";

  const pillarBase = "relative flex flex-col justify-center cursor-pointer select-none px-5 py-2 transition-colors rounded-full hover:bg-gray-100";
  const pillarActive = "bg-gray-100";
  const isActive = (p: string) => activePanel === p;

  const barWidth = viewMode === "Séjourner" ? "max-w-3xl" : "max-w-2xl";

  return (
    // position:relative on the wrapper so dropdowns position relative to it
    // but we use fixed z-index so they appear above everything on the page
    <div ref={containerRef} className="relative flex flex-col items-center w-full">

      {/* ── Toggle ── */}
      <div className="mb-3">
        <ViewModeToggle viewMode={viewMode} onChange={handleViewModeChange} />
      </div>

      {/* ── Search Bar ── */}
      <div className={`flex w-full items-center rounded-full bg-white shadow-lg px-2 py-1 gap-0 transition-all duration-300 ${barWidth}`}>

        {viewMode === "Séjourner" ? (
          <>
            {/* Destination */}
            <div onClick={() => togglePanel("destination")}
              className={[pillarBase, isActive("destination") ? pillarActive : "", "flex-1 min-w-0 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Où partir ?</p>
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
              className={[pillarBase, isActive("dates") ? pillarActive : "", "w-full lg:w-auto lg:px-10 lg:py-1.5 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Quand ?</p>
              <p className="text-sm text-gray-500 truncate">{dateLabel}</p>
              {dateRange.start && (
                <button onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200">
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="h-7 w-px bg-gray-200 shrink-0" />

            {/* Guests */}
            <div onClick={() => togglePanel("guests")}
              className={[pillarBase, isActive("guests") ? pillarActive : "", "w-full lg:w-auto lg:px-12 lg:py-1.5 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Qui ?</p>
              <p className="text-sm font-bold text-gray-900">{guestLabel}</p>
            </div>

            <div className="h-7 w-px bg-gray-200 shrink-0" />

            {/* Formula */}
            <div onClick={() => togglePanel("formula")}
              className={[pillarBase, isActive("formula") ? pillarActive : "", "w-full lg:w-auto lg:px-12 lg:py-1.5 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Formule</p>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <FormulaIcons formula={formula} />
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Locality */}
            <div onClick={() => togglePanel("locality")}
              className={[pillarBase, isActive("locality") ? pillarActive : "", "flex-1 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Localité</p>
              <p className="text-sm text-gray-500">{localityLabel}</p>
              {locality && (
                <button onClick={(e) => { e.stopPropagation(); setLocality(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200">
                  <X size={12} />
                </button>
              )}
            </div>
            <div className="h-7 w-px bg-gray-200 shrink-0" />
            {/* Property type */}
            <div onClick={() => togglePanel("property")}
              className={[pillarBase, isActive("property") ? pillarActive : "", "flex-1 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Type de bien</p>
              <p className="text-sm text-gray-500">{propertyLabel}</p>
            </div>
            <div className="h-7 w-px bg-gray-200 shrink-0" />
            {/* Budget */}
            <div onClick={() => togglePanel("budget")}
              className={[pillarBase, isActive("budget") ? pillarActive : "", "flex-1 text-left"].join(" ")}>
              <p className="text-xs font-semibold text-gray-800">Budget</p>
              <p className="text-sm text-gray-500">{budgetLabel}</p>
              {budget && (
                <button onClick={(e) => { e.stopPropagation(); setBudget(null); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200">
                  <X size={12} />
                </button>
              )}
            </div>
          </>
        )}

        {/* Search button */}
        <button onClick={() => setActivePanel(null)}
          className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B3D6B] text-white hover:opacity-90"
          aria-label="Rechercher">
          <Search size={17} />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          DROPDOWNS
          Using position:fixed with high z-index so they always render
          on top of any content below the search bar on the page.
          We compute top from the bar's bounding rect via a ref.
      ══════════════════════════════════════════════════════════════ */}

      {/* Destination panel */}
      {activePanel === "destination" && (
        <div className={`absolute top-full mt-2 z-[9999] w-full ${barWidth}`}>
          <div className="rounded-2xl bg-white shadow-2xl overflow-auto max-h-[80vh]">
            <DestinationPanelSejourner value={destination}
              onSelect={(d) => {
                setDestination(d);
                // Auto-navigate to dates
                setActivePanel("dates");
              }} />
          </div>
        </div>
      )}

      {/* Dates panel */}
      {activePanel === "dates" && (
        <div className="absolute top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-2xl">
            <CalendarPanel dateRange={dateRange}
              onSave={(r) => {
                setDateRange(r);
                // Auto-navigate to guests after saving dates
                setActivePanel("guests");
              }}
              onClear={() => setDateRange({ start: null, end: null })} />
          </div>
        </div>
      )}

      {/* Guests panel */}
      {activePanel === "guests" && (
        <div className="absolute top-full mt-2 z-[9999] right-16">
          <div className="rounded-2xl bg-white shadow-2xl">
            <GuestsPanel guests={guests}
              onSave={(g) => {
                setGuests(g);
                setActivePanel("formula");
              }} />
          </div>
        </div>
      )}

      {/* Formula panel */}
      {activePanel === "formula" && (
        <div className="absolute top-full mt-2 z-[9999] right-10">
          <div className="rounded-2xl bg-white shadow-2xl">
            <FormulaPanel formula={formula}
              onSelect={(f) => { setFormula(f); setActivePanel(null); }} />
          </div>
        </div>
      )}

      {/* Locality panel */}
      {activePanel === "locality" && (
        <div className={`absolute top-full mt-2 z-[9999] w-full ${barWidth}`}>
          <div className="rounded-2xl bg-white shadow-2xl overflow-auto max-h-[80vh]">
            <LocalityPanel value={locality}
              onSelect={(d) => { setLocality(d); setActivePanel("property"); }} />
          </div>
        </div>
      )}

      {/* Property panel */}
      {activePanel === "property" && (
        <div className="absolute top-full mt-2 z-[9999]">
          <div className="rounded-2xl bg-white shadow-2xl">
            <PropertyTypePanel selected={propertyTypes}
              onSave={(types) => { setPropertyTypes(types); setActivePanel(null); }} />
          </div>
        </div>
      )}

      {/* Budget panel */}
      {activePanel === "budget" && (
        <div className="absolute top-full mt-2 z-[9999] right-10">
          <div className="rounded-2xl bg-white shadow-2xl">
            <BudgetPanel budget={budget}
              onSave={(b) => { setBudget(b); setActivePanel(null); }} />
          </div>
        </div>
      )}
    </div>
  );
}