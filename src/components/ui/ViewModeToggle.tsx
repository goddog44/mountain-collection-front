"use client";

import { useState } from "react";

export type ViewMode = "liste" | "mosaique";

interface ViewModeToggleProps {
  onChange: (mode: ViewMode) => void;
  defaultMode?: ViewMode;
}

export default function ViewModeToggle({
  onChange,
  defaultMode = "liste",
}: ViewModeToggleProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const handleChange = (mode: ViewMode) => {
    setViewMode(mode);
    onChange(mode);
  };

  return (
    <div className="px-0.5 py-0.5 rounded-md bg-[#C5D5E4] border border-gray-300 overflow-hidden">
      <button
        onClick={() => handleChange("liste")}
        className={`px-8 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === "liste"
            ? "bg-white text-gray-700 hover:bg-gray-50"
            : "bg-[#C5D5E4] text-gray-900"
        }`}
      >
        Liste
      </button>

      <button
        onClick={() => handleChange("mosaique")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-l border-gray-300 ${
          viewMode === "mosaique"
            ? "bg-white text-gray-700 hover:bg-gray-50"
            : "bg-[#C5D5E4] text-gray-900"
        }`}
      >
        Mosaïque
      </button>
    </div>
  );
}
