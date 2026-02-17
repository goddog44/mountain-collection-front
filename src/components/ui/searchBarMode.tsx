"use client";

import { useState } from "react";

export type ViewMode = "Séjourner" | "Acheter";

interface ViewModeToggleProps {
  onChange: (mode: ViewMode) => void;
  defaultMode?: ViewMode;
}

export default function SearchBarMode({
  onChange,
  defaultMode = "Séjourner",
}: ViewModeToggleProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const handleChange = (mode: ViewMode) => {
    setViewMode(mode);
    onChange(mode);
  };

  const isSejourner = viewMode === "Séjourner";

  return (
    <div className="relative justify-center inline-flex w-flex rounded-xl bg-[#C5D5E4] px-1 py-1 border border-gray-300">
      
      {/* 🔥 Sliding Background */}
      <div
        className={`radio-label text-sm p-0.5 absolute top-0.5 bottom-0.5 w-1/2 pl-1 rounded-xl bg-white shadow-sm transition-all duration-300 ease-in-out ${
          isSejourner ? "left-1" : "left-1/2"
        }`}
      />

      {/* Buttons */}
      <button
        onClick={() => handleChange("Séjourner")}
        className={`relative justify-center z-10 px-9 py-0.5 text-sm font-medium transition-colors duration-200 ${
          isSejourner ? "text-gray-800" : "text-gray-900"
        }`}
      >
        Séjourner
      </button>

      <button
        onClick={() => handleChange("Acheter")}
        className={`relative justify-center z-10 px-9 py-0.5 text-sm font-medium transition-colors duration-200 ${
          !isSejourner ? "text-gray-800" : "text-gray-900"
        }`}
      >
        Acheter
      </button>
    </div>
  );
}
