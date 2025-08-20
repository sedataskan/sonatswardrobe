"use client";

import { useEffect } from "react";
import {
  categoryOptions,
  thicknessOptions,
  lengthOptions,
  seasonOptionsEn,
} from "@/constants";

interface FiltersProps {
  type: string;
  setType: (value: string) => void;
  thickness: string;
  setThickness: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  selectedSeasons: string[];
  setSelectedSeasons: (value: string[]) => void;
  distinctLocations: string[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export default function Filters({
  type,
  setType,
  thickness,
  setThickness,
  length,
  setLength,
  location,
  setLocation,
  selectedSeasons,
  setSelectedSeasons,
  distinctLocations,
  hasActiveFilters,
  clearFilters,
}: FiltersProps) {
  useEffect(() => {
    const updateFloatingLabels = () => {
      const selects = document.querySelectorAll(".floating-select");
      selects.forEach((select) => {
        const htmlSelect = select as HTMLSelectElement;
        if (htmlSelect.value && htmlSelect.value !== "") {
          htmlSelect.classList.add("has-value");
        } else {
          htmlSelect.classList.remove("has-value");
        }
      });
    };
    updateFloatingLabels();
  }, [thickness, length, location, selectedSeasons]);

  return (
    <section className="mb-6">
      <div className="glass-card rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-8 px-3 rounded-md border border-gray-300 hover:bg-gray-50 text-xs ml-auto"
            >
              🗑️ Clear Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="floating-select-container">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="floating-select"
            >
              <option value=""></option>
              {categoryOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="floating-label">👕 Type</label>
          </div>
          <div className="floating-select-container">
            <select
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              className="floating-select"
            >
              <option value=""></option>
              {thicknessOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="floating-label">🧵 Thickness</label>
          </div>

          <div className="floating-select-container">
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="floating-select"
            >
              <option value=""></option>
              {lengthOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="floating-label">📏 Length</label>
          </div>

          <div className="floating-select-container">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="floating-select"
            >
              <option value=""></option>
              {distinctLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <label className="floating-label">📍 Location</label>
          </div>

          <div className="floating-select-container">
            <select
              value={selectedSeasons[0] || ""}
              onChange={(e) => {
                setSelectedSeasons(e.target.value ? [e.target.value] : []);
              }}
              className="floating-select"
            >
              <option value=""></option>
              {seasonOptionsEn.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <label className="floating-label">🌤️ Season</label>
          </div>
        </div>
      </div>
    </section>
  );
}
