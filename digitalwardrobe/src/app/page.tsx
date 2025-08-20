"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import Filters from "@/components/Filters";
import ItemPickerModal from "@/components/ItemPickerModal";
import WardrobeGrid from "@/components/WardrobeGrid";
import OutfitSection from "@/components/OutfitSection";
import { type Category, type Item } from "@/constants";
import {
  groupItemsByCategory,
  applyFilters,
  generateRandomOutfit,
  generateDressOutfit,
  generateTopBottomOutfit,
  getDistinctLocations,
} from "@/utils";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selected, setSelected] = useState<Partial<Record<Category, Item>>>({});
  const [outfitType, setOutfitType] = useState<"dress" | "topbottom" | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<Category | null>(null);

  const hasActiveFilters = Boolean(
    type || thickness || length || location || selectedSeasons.length > 0
  );

  const hasSelectedItems = Object.values(selected).some(
    (item) => item !== undefined
  );

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/data/items.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load data");
        const data: Item[] = await res.json();
        if (active) {
          setItems(data);
          // Don't automatically generate outfit, wait for user selection
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const distinctLocations = useMemo(() => {
    return getDistinctLocations(items);
  }, [items]);

  const applyFiltersCallback = useCallback(
    (list: Item[]) => {
      return applyFilters(list, {
        type,
        thickness,
        length,
        location,
        selectedSeasons,
      });
    },
    [type, thickness, length, location, selectedSeasons]
  );

  const filtered = useMemo(
    () => applyFiltersCallback(items),
    [items, applyFiltersCallback]
  );

  const filteredByCategory = useMemo(() => {
    return groupItemsByCategory(filtered);
  }, [filtered]);

  const allByCategory = useMemo(() => {
    return groupItemsByCategory(items);
  }, [items]);

  const clearFilters = () => {
    setType("");
    setThickness("");
    setLength("");
    setLocation("");
    setSelectedSeasons([]);
  };

  const openPicker = (category: Category) => {
    setModalCategory(category);
    setModalOpen(true);
  };

  const closePicker = () => {
    setModalOpen(false);
    setModalCategory(null);
  };

  const pickItem = (category: Category, item: Item) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [category]: item };

      // If adding a dress, remove bottom and top
      if (category === "dress") {
        delete newSelected.bottom;
        delete newSelected.top;
      }
      // If adding bottom or top, remove dress
      else if (category === "bottom" || category === "top") {
        delete newSelected.dress;
      }

      return newSelected;
    });
    closePicker();
  };

  const randomizeOutfit = () => {
    if (outfitType === "dress") {
      const next = generateDressOutfit(allByCategory, filteredByCategory);
      setSelected(next);
    } else if (outfitType === "topbottom") {
      const next = generateTopBottomOutfit(allByCategory, filteredByCategory);
      setSelected(next);
    } else {
      const next = generateRandomOutfit(allByCategory, filteredByCategory);
      setSelected(next);
    }
  };

  const selectOutfitType = (type: "dress" | "topbottom") => {
    setOutfitType(type);
    if (type === "dress") {
      const next = generateDressOutfit(allByCategory, filteredByCategory);
      setSelected(next);
    } else {
      const next = generateTopBottomOutfit(allByCategory, filteredByCategory);
      setSelected(next);
    }
  };

  const changeType = () => {
    setOutfitType(null);
    setSelected({});
  };

  const clearOutfit = () => {
    setSelected({});
  };

  return (
    <div>
      <div className="h-screen text-foreground flex flex-col overflow-hidden bg-gray-50">
        <main className="flex flex-1 overflow-hidden">
          <div className="w-3/4 flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <Filters
                type={type}
                setType={setType}
                thickness={thickness}
                setThickness={setThickness}
                length={length}
                setLength={setLength}
                location={location}
                setLocation={setLocation}
                selectedSeasons={selectedSeasons}
                setSelectedSeasons={setSelectedSeasons}
                distinctLocations={distinctLocations}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />

              <section className="mb-10">
                {loading ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-sm text-red-600">Error: {error}</p>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-6xl mb-4">🤷‍♀️</div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No items found
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md">
                      Your filters might be too specific. Try adjusting them to
                      see more options.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ✨ Clear All Filters
                    </button>
                  </div>
                ) : (
                  <WardrobeGrid items={filtered} onPickItem={pickItem} />
                )}

                <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-xs text-gray-500">
                  Sonat&apos;s Digital Wardrobe — {new Date().getFullYear()}
                </footer>
              </section>
            </div>
          </div>

          <div className="w-px bg-gray-300"></div>
          <OutfitSection
            selected={selected}
            hasSelectedItems={hasSelectedItems}
            outfitType={outfitType}
            onClearOutfit={clearOutfit}
            onRandomizeOutfit={randomizeOutfit}
            onSelectOutfitType={selectOutfitType}
            onChangeType={changeType}
            onItemClick={openPicker}
            onItemDrop={pickItem}
          />
        </main>
      </div>
      <ItemPickerModal
        isOpen={modalOpen}
        category={modalCategory}
        filteredItems={modalCategory ? filteredByCategory[modalCategory] : []}
        allItems={modalCategory ? allByCategory[modalCategory] : []}
        onClose={closePicker}
        onPickItem={pickItem}
      />
    </div>
  );
}
