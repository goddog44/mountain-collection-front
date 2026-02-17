"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search, MapPin, Home, X, ChevronLeft, ChevronRight,
  Minus, Plus, Mountain, Building2, Wrench, TicketCheck
} from "lucide-react";

// ─── Types / Constants ────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(d, start, end) {
  if (!start || !end) return false;
  return d > start && d < end;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function countNights(start, end) {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── FormulaIcons ────────────────────────────────────────────────────────────

function FormulaIcons({ formula }) {
  const f = FORMULAS.find(x => x.value === formula);
  const level = f?.level ?? 1;
  return (
    <span className="flex items-center gap-1 text-gray-700">
      <Home className="h-4 w-4" />
      {level >= 2 && (
        <>
          <span className="text-xs font-bold text-gray-500">+</span>
          <TicketCheck className="h-4 w-4" />
        </>
      )}
      {level >= 3 && (
        <>
          <span className="text-xs font-bold text-gray-500">+</span>
          <Wrench className="h-4 w-4" />
        </>
      )}
    </span>
  );
}

// ─── ViewModeToggle ───────────────────────────────────────────────────────────

function ViewModeToggle({ viewMode, onChange }) {
  const isSejourner = viewMode === "Séjourner";
  return (
    <div className="relative inline-flex rounded-xl bg-[#C5D5E4] px-1 py-1 border border-gray-300/50">
      <div
        className="absolute top-0.5 bottom-0.5 w-1/2 rounded-xl bg-white shadow-sm transition-all duration-300 ease-in-out"
        style={{ left: isSejourner ? "4px" : "calc(50%)" }}
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
          !isSejourner ? "text-gray-800" : "text-gray-600"
        }`}
      >
        Acheter
      </button>
    </div>
  );
}

// ─── CalendarPanel ────────────────────────────────────────────────────────────

function CalendarPanel({ dateRange, onSave, onClear }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [tempRange, setTempRange] = useState(dateRange);
  const [hoveredDate, setHoveredDate] = useState(null);

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

  const handleDayClick = (d) => {
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: d, end: null });
    } else {
      if (d < tempRange.start) setTempRange({ start: d, end: tempRange.start });
      else setTempRange({ start: tempRange.start, end: d });
    }
  };

  const renderMonth = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} />);

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < todayMidnight;
      const isStart = tempRange.start && isSameDay(d, tempRange.start);
      const isEnd = tempRange.end && isSameDay(d, tempRange.end);
      const inRange = isInRange(d, tempRange.start, tempRange.end);
      const isHoverRange = tempRange.start && !tempRange.end && hoveredDate && isInRange(d, tempRange.start, hoveredDate);
      const isHoverEnd = tempRange.start && !tempRange.end && hoveredDate && isSameDay(d, hoveredDate);

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
            isPast ? "cursor-not-allowed text-gray-300" : "cursor-pointer",
            (isStart || isEnd) ? "z-10 rounded-full bg-[#1B3D6B] font-semibold text-white" : "",
            (inRange || isHoverRange) && !isStart && !isEnd ? "bg-[#1B3D6B]/10 text-[#1B3D6B]" : "",
            isHoverEnd && !isEnd && !isStart ? "rounded-full bg-[#1B3D6B]/20 text-[#1B3D6B]" : "",
            !isPast && !isStart && !isEnd ? "text-gray-800" : "",
          ].filter(Boolean).join(" ")}
        >
          {day}
        </button>
      );
    }
    return cells;
  };

  const nightCount = tempRange.start && tempRange.end ? countNights(tempRange.start, tempRange.end) : null;
  const monthName = (y, m) => new Date(y, m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <div className="flex gap-8">
        {/* Left month */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={prevMonth} className="rounded-full p-1 hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <span className="text-sm font-semibold capitalize">{monthName(viewYear, viewMonth)}</span>
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
            <span className="text-sm font-semibold capitalize">{monthName(rightYear, rightMonth)}</span>
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
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="text-sm text-gray-600">
          {tempRange.start && tempRange.end ? (
            <span>
              <span className="font-semibold">{nightCount} nuit{nightCount !== 1 ? "s" : ""}</span>
              {" · "}{formatDate(tempRange.start)} – {formatDate(tempRange.end)}
            </span>
          ) : <span className="text-gray-400">Sélectionnez vos dates</span>}
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
            className="rounded-lg bg-[#1B3D6B] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GuestsPanel ─────────────────────────────────────────────────────────────

function GuestsPanel({ guests, onSave }) {
  const [temp, setTemp] = useState(guests);

  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-between py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">Adulte</div>
          <div className="text-xs text-gray-400">18 ans et plus</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button" disabled={temp.adults <= 1}
            onClick={() => setTemp(t => ({ ...t, adults: t.adults - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          ><Minus className="h-3.5 w-3.5" /></button>
          <span className="w-4 text-center text-sm font-medium">{temp.adults}</span>
          <button
            type="button"
            onClick={() => setTemp(t => ({ ...t, adults: t.adults + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          ><Plus className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="border-t border-gray-100" />
      <div className="flex items-center justify-between py-3">
        <div>
          <div className="text-sm font-medium text-gray-900">Enfants</div>
          <div className="text-xs text-gray-400">Moins de 18 ans</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button" disabled={temp.children <= 0}
            onClick={() => setTemp(t => ({ ...t, children: t.children - 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-gray-600"
          ><Minus className="h-3.5 w-3.5" /></button>
          <span className="w-4 text-center text-sm font-medium">{temp.children}</span>
          <button
            type="button"
            onClick={() => setTemp(t => ({ ...t, children: t.children + 1 }))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-600"
          ><Plus className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="border-t border-gray-100" />
      <div className="flex items-center justify-between py-3">
        <div className="text-sm font-medium text-gray-900">Animaux de compagnie</div>
        <input
          type="checkbox" checked={temp.pets}
          onChange={(e) => setTemp(t => ({ ...t, pets: e.target.checked }))}
          className="h-4 w-4 accent-[#1B3D6B]"
        />
      </div>
      <button
        type="button" onClick={() => onSave(temp)}
        className="mt-2 w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── FormulaPanel ────────────────────────────────────────────────────────────

function FormulaPanel({ formula, onSelect }) {
  return (
    <div className="w-80 rounded-2xl bg-white p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      {FORMULAS.map(f => (
        <button
          key={f.value} type="button" onClick={() => onSelect(f.value)}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[#1B3D6B]/5",
            formula === f.value ? "bg-[#1B3D6B]/8 font-medium" : "text-gray-800",
          ].join(" ")}
        >
          <span className="flex items-center gap-1 shrink-0 text-gray-700">
            <Home className="h-4 w-4" />
            {f.level >= 2 && (
              <>
                <span className="text-xs font-bold text-gray-500">+</span>
                <TicketCheck className="h-4 w-4" />
              </>
            )}
            {f.level >= 3 && (
              <>
                <span className="text-xs font-bold text-gray-500">+</span>
                <Wrench className="h-4 w-4" />
              </>
            )}
          </span>
          <span className="truncate">{f.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── DestinationPanel (Séjourner) ─────────────────────────────────────────────

function DestinationPanelSejourner({ value, onSelect }) {
  return (
    <div className="w-[480px] rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <div className="mb-4">
        <p className="mb-3 text-sm font-semibold text-gray-800">Choisir un type de station</p>
        <div className="grid grid-cols-2 gap-2">
          {STATION_TYPES.map(t => (
            <button
              key={t} type="button" onClick={() => onSelect(t)}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[#1B3D6B] hover:text-[#1B3D6B]"
            >
              <Mountain className="h-4 w-4 shrink-0 text-gray-400" />
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 mb-3" />
      <p className="mb-3 text-sm font-semibold text-gray-800">Ou une destination populaire</p>
      <div className="max-h-64 overflow-y-auto -mx-1 px-1">
        {DESTINATIONS_SEJOURNER.map(d => (
          <button
            key={d.name} type="button"
            onClick={() => onSelect(d.isAll ? "" : d.name)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
              (d.isAll ? value === "" : value === d.name) ? "bg-[#1B3D6B]/10" : "",
            ].join(" ")}
          >
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
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

// ─── LocalityPanel (Acheter) ──────────────────────────────────────────────────

function LocalityPanel({ value, onSelect }) {
  return (
    <div className="w-[380px] rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <p className="mb-3 text-sm font-semibold text-gray-800">Notre sélection</p>
      <div className="max-h-64 overflow-y-auto -mx-1 px-1">
        {DESTINATIONS_ACHETER.map(d => (
          <button
            key={d.name} type="button" onClick={() => onSelect(d.name)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
              value === d.name ? "bg-[#1B3D6B]/10" : "",
            ].join(" ")}
          >
            <Mountain className="h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900">{d.name}</div>
              <div className="text-xs text-gray-400">{d.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PropertyTypePanel (Acheter) ──────────────────────────────────────────────

function PropertyTypePanel({ selected, onSave }) {
  const [temp, setTemp] = useState(selected);

  const toggle = (type) => {
    setTemp(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="w-64 rounded-2xl bg-white p-4 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <div className="space-y-3 mb-4">
        {PROPERTY_TYPES.map(type => (
          <label key={type} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={temp.includes(type)}
              onChange={() => toggle(type)}
              className="h-4 w-4 rounded accent-[#1B3D6B]"
            />
            <span className="text-sm text-gray-800 group-hover:text-[#1B3D6B] transition-colors">{type}</span>
          </label>
        ))}
      </div>
      <button
        type="button" onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── BudgetPanel (Acheter) ────────────────────────────────────────────────────

function BudgetPanel({ budget, onSave }) {
  const [temp, setTemp] = useState(budget ?? 2000000);
  const MAX = 5000000;

  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.15)]">
      <p className="text-sm font-semibold text-gray-800 mb-4">Sélectionnez votre budget maximum</p>
      <input
        type="range" min={50000} max={MAX} step={10000}
        value={temp}
        onChange={(e) => setTemp(Number(e.target.value))}
        className="w-full accent-[#1B3D6B] mb-4"
        style={{ accentColor: "#1B3D6B" }}
      />
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-1 block">Budget maximum</label>
        <input
          type="number" value={temp}
          onChange={(e) => setTemp(Math.min(MAX, Math.max(0, Number(e.target.value))))}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B3D6B]/30"
        />
      </div>
      <button
        type="button" onClick={() => onSave(temp)}
        className="w-full rounded-lg bg-[#1B3D6B] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Enregistrer
      </button>
    </div>
  );
}

// ─── Main SearchBar ───────────────────────────────────────────────────────────

export default function SearchBar() {
  const [viewMode, setViewMode] = useState("Séjourner");
  const [activePanel, setActivePanel] = useState(null);

  // Séjourner state
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState({ adults: 2, children: 0, pets: false });
  const [formula, setFormula] = useState("hebergement");

  // Acheter state
  const [locality, setLocality] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [budget, setBudget] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = (panel) => setActivePanel(prev => prev === panel ? null : panel);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setActivePanel(null);
  };

  // Display labels
  const destLabel = destination || "Toutes les destinations";
  const dateLabel = dateRange.start && dateRange.end
    ? `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}`
    : "Sélectionner des dates";
  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} participant${totalGuests > 1 ? "s" : ""}`;

  const localityLabel = locality || "Station, région...";
  const propertyLabel = propertyTypes.length > 0
    ? propertyTypes.join(", ")
    : "Sélectionner des biens";
  const budgetLabel = budget ? `${budget.toLocaleString("fr-FR")} €` : "Budget maximum";

  const pillarBase = "relative flex flex-col justify-center cursor-pointer select-none px-4 py-2 transition-colors rounded-full hover:bg-white/70";
  const pillarActive = "bg-white shadow-sm";
  const isActive = (p) => activePanel === p;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center gap-3">
      {/* Toggle */}
      <ViewModeToggle viewMode={viewMode} onChange={handleViewModeChange} />

      {/* Search Bar */}
      <div
        className="flex flex-row items-center rounded-full bg-[#E8EEF4] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.18)] px-2 py-1.5 gap-0 transition-all duration-300"
        style={{ minWidth: 600 }}
      >
        {viewMode === "Séjourner" ? (
          <>
            {/* Destination */}
            <button
              type="button"
              onClick={() => togglePanel("destination")}
              className={[pillarBase, isActive("destination") ? pillarActive : "", "flex-1 text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Où partir ?</span>
              <span className={["text-sm font-medium truncate", !destination ? "text-gray-400" : "text-gray-900"].join(" ")}>
                {destLabel.length > 20 ? destLabel.slice(0, 19) + "…" : destLabel}
              </span>
              {destination && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDestination(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5 text-gray-500" />
                </button>
              )}
            </button>

            <div className="h-6 w-px bg-gray-300 shrink-0" />

            {/* Dates */}
            <button
              type="button"
              onClick={() => togglePanel("dates")}
              className={[pillarBase, isActive("dates") ? pillarActive : "", "min-w-[160px] text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Quand ?</span>
              <span className={["text-sm font-medium", !dateRange.start ? "text-gray-400" : "text-gray-900"].join(" ")}>
                {dateLabel}
              </span>
              {dateRange.start && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setDateRange({ start: null, end: null }); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5 text-gray-500" />
                </button>
              )}
            </button>

            <div className="h-6 w-px bg-gray-300 shrink-0" />

            {/* Guests */}
            <button
              type="button"
              onClick={() => togglePanel("guests")}
              className={[pillarBase, isActive("guests") ? pillarActive : "", "min-w-[120px] text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Qui ?</span>
              <span className="text-sm font-medium text-gray-900">{guestLabel}</span>
            </button>

            <div className="h-6 w-px bg-gray-300 shrink-0" />

            {/* Formula */}
            <button
              type="button"
              onClick={() => togglePanel("formula")}
              className={[pillarBase, isActive("formula") ? pillarActive : "", "min-w-[80px] text-left pr-3"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Formule</span>
              <FormulaIcons formula={formula} />
            </button>
          </>
        ) : (
          <>
            {/* Locality */}
            <button
              type="button"
              onClick={() => togglePanel("locality")}
              className={[pillarBase, isActive("locality") ? pillarActive : "", "flex-1 text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Localité</span>
              <span className={["text-sm font-medium truncate", !locality ? "text-gray-400" : "text-gray-900"].join(" ")}>
                {locality || "Station, région..."}
              </span>
              {locality && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLocality(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5 text-gray-500" />
                </button>
              )}
            </button>

            <div className="h-6 w-px bg-gray-300 shrink-0" />

            {/* Type de bien */}
            <button
              type="button"
              onClick={() => togglePanel("property")}
              className={[pillarBase, isActive("property") ? pillarActive : "", "min-w-[160px] text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Type de bien</span>
              <span className={["text-sm font-medium truncate max-w-[140px]", propertyTypes.length === 0 ? "text-gray-400" : "text-gray-900"].join(" ")}>
                {propertyLabel}
              </span>
            </button>

            <div className="h-6 w-px bg-gray-300 shrink-0" />

            {/* Budget */}
            <button
              type="button"
              onClick={() => togglePanel("budget")}
              className={[pillarBase, isActive("budget") ? pillarActive : "", "min-w-[130px] text-left"].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Budget</span>
              <span className={["text-sm font-medium", !budget ? "text-gray-400" : "text-gray-900"].join(" ")}>
                {budgetLabel}
              </span>
              {budget && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setBudget(null); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-gray-200"
                >
                  <X className="h-3.5 w-3.5 text-gray-500" />
                </button>
              )}
            </button>
          </>
        )}

        {/* Search button */}
        <button
          type="button"
          onClick={() => setActivePanel(null)}
          className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B3D6B] text-white transition-colors hover:opacity-90"
          aria-label="Rechercher"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* ── Dropdowns ── */}
      {activePanel && (
        <div className="absolute top-full left-0 z-50 mt-2">
          {/* Séjourner panels */}
          {activePanel === "destination" && (
            <DestinationPanelSejourner
              value={destination}
              onSelect={(d) => { setDestination(d); setActivePanel("dates"); }}
            />
          )}
          {activePanel === "dates" && (
            <div style={{ transform: "translateX(10%)" }}>
              <CalendarPanel
                dateRange={dateRange}
                onSave={(r) => { setDateRange(r); setActivePanel(null); }}
                onClear={() => setDateRange({ start: null, end: null })}
              />
            </div>
          )}

          {/* Acheter panels */}
          {activePanel === "locality" && (
            <LocalityPanel
              value={locality}
              onSelect={(d) => { setLocality(d); setActivePanel("property"); }}
            />
          )}
          {activePanel === "property" && (
            <PropertyTypePanel
              selected={propertyTypes}
              onSave={(types) => { setPropertyTypes(types); setActivePanel(null); }}
            />
          )}
        </div>
      )}

      {/* Guests panel */}
      {activePanel === "guests" && (
        <div className="absolute top-full z-50 mt-2" style={{ left: "38%" }}>
          <GuestsPanel
            guests={guests}
            onSave={(g) => { setGuests(g); setActivePanel(null); }}
          />
        </div>
      )}

      {/* Formula panel */}
      {activePanel === "formula" && (
        <div className="absolute top-full z-50 mt-2" style={{ right: 44 }}>
          <FormulaPanel
            formula={formula}
            onSelect={(f) => { setFormula(f); setActivePanel(null); }}
          />
        </div>
      )}

      {/* Budget panel */}
      {activePanel === "budget" && (
        <div className="absolute top-full z-50 mt-2" style={{ right: 44 }}>
          <BudgetPanel
            budget={budget}
            onSave={(b) => { setBudget(b); setActivePanel(null); }}
          />
        </div>
      )}
    </div>
  );
}