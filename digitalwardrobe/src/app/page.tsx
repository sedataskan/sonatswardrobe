"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";

// Veri tipleri
type Category = "top" | "bottom" | "bag" | "shoes";

interface Item {
  id: string;
  name: string;
  category: Category;
  thickness: "ince" | "orta" | "kalın" | string;
  length: "kısa" | "orta" | "uzun" | string; // boy/uzunluk
  season: ("ilkbahar" | "yaz" | "sonbahar" | "kış" | string)[];
  location: string;
  image: string; // public/ altında yol
}

const categoryLabels: Record<Category, string> = {
  top: "Üst",
  bottom: "Alt",
  bag: "Çanta",
  shoes: "Ayakkabı",
};

const categoryPlaceholders: Record<Category, string> = {
  top: "/shirt.svg",
  bottom: "/pants.svg",
  bag: "/bag.svg",
  shoes: "/shoes.svg",
};

const thicknessOptions = ["ince", "orta", "kalın"] as const;
const lengthOptions = ["kısa", "orta", "uzun"] as const;
type Season = "ilkbahar" | "yaz" | "sonbahar" | "kış";
const seasonOptionsEn: { value: Season; label: string }[] = [
  { value: "ilkbahar", label: "🌸 Spring" },
  { value: "yaz", label: "☀️ Summer" },
  { value: "sonbahar", label: "🍂 Autumn" },
  { value: "kış", label: "❄️ Winter" },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtre durumları
  const [thickness, setThickness] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  // Seçili ürünler (slotlar)
  const [selected, setSelected] = useState<Partial<Record<Category, Item>>>({});

  // Modal durumu
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<Category | null>(null);

  // Floating label state management
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

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/data/items.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Veri yüklenemedi");
        const data: Item[] = await res.json();
        if (active) {
          setItems(data);
          // Auto-generate random outfit on first load
          const randomOutfit: Partial<Record<Category, Item>> = {};
          (Object.keys(categoryLabels) as Category[]).forEach((cat) => {
            const categoryItems = data.filter((item) => item.category === cat);
            if (categoryItems.length > 0) {
              const randomItem =
                categoryItems[Math.floor(Math.random() * categoryItems.length)];
              randomOutfit[cat] = randomItem;
            }
          });
          setSelected(randomOutfit);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
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
    const set = new Set(items.map((i) => i.location));
    return Array.from(set);
  }, [items]);

  const applyFilters = useCallback(
    (list: Item[]) => {
      return list.filter((i) => {
        if (thickness && i.thickness !== thickness) return false;
        if (length && i.length !== length) return false;
        if (location && i.location !== location) return false;
        if (selectedSeasons.length > 0) {
          const hasSeason = i.season?.some((s) => selectedSeasons.includes(s));
          if (!hasSeason) return false;
        }
        return true;
      });
    },
    [thickness, length, location, selectedSeasons]
  );

  const filtered = useMemo(() => applyFilters(items), [items, applyFilters]);

  const filteredByCategory = useMemo(() => {
    const map: Record<Category, Item[]> = {
      top: [],
      bottom: [],
      bag: [],
      shoes: [],
    };
    for (const i of filtered) {
      map[i.category]?.push(i);
    }
    return map;
  }, [filtered]);

  const allByCategory = useMemo(() => {
    const map: Record<Category, Item[]> = {
      top: [],
      bottom: [],
      bag: [],
      shoes: [],
    };
    for (const i of items) map[i.category]?.push(i);
    return map;
  }, [items]);

  const hasActiveFilters =
    thickness || length || location || selectedSeasons.length > 0;

  const clearFilters = () => {
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
    setSelected((prev) => ({ ...prev, [category]: item }));
    closePicker();
  };

  const getRandom = <T,>(arr: T[]): T | undefined =>
    arr[Math.floor(Math.random() * arr.length)];

  const randomizeOutfit = () => {
    const next: Partial<Record<Category, Item>> = {};
    (Object.keys(categoryLabels) as Category[]).forEach((cat) => {
      const pool =
        filteredByCategory[cat].length > 0
          ? filteredByCategory[cat]
          : allByCategory[cat];
      const rnd = pool.length > 0 ? getRandom(pool) : undefined;
      if (rnd) next[cat] = rnd;
    });
    setSelected(next);
  };

  return (
    <div className="h-screen text-foreground flex flex-col overflow-hidden bg-gray-50">
      <header className="flex-shrink-0  border-b bg-white/80 backdrop-blur border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div>
            <h1 className="logo-title text-3xl font-semibold tracking-tight">
              Digital Wardrobe
            </h1>
            <p className="text-sm text-gray-600">OUTFIT OF THE DAY #OOTD</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sol taraf: Filtreler ve Ürünler (%75) */}
        <div className="w-3/4 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Filtreler */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtreler</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="h-8 px-3 rounded-md border border-gray-300 hover:bg-gray-50 text-xs ml-auto"
                  >
                    🗑️ Clear Filter
                  </button>
                )}
              </div>
              <div className="glass-card rounded-2xl border border-border p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <label className="floating-label">🧵 Kalınlık</label>
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
                    <label className="floating-label">📏 Uzunluk</label>
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
                        setSelectedSeasons(
                          e.target.value ? [e.target.value] : []
                        );
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

            {/* Ürünler (All Wardrobe) */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All Wardrobe</h2>
                <span className="text-sm text-gray-500">
                  {filtered.length} sonuç
                </span>
              </div>
              {loading ? (
                <p className="text-sm text-gray-500">Yükleniyor...</p>
              ) : error ? (
                <p className="text-sm text-red-600">Hata: {error}</p>
              ) : filtered.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Sonuç bulunamadı. Filtreleri genişletmeyi deneyin.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((i) => (
                    <div
                      key={i.id}
                      className="rounded-xl border border-gray-200 p-3 hover:shadow-md transition cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "application/json",
                          JSON.stringify(i)
                        );
                      }}
                      onClick={() => pickItem(i.category, i)}
                      title={`${i.name} - ${categoryLabels[i.category]}`}
                    >
                      <div className="aspect-square relative rounded-md bg-gray-50 overflow-hidden">
                        <Image
                          src={i.image}
                          alt={i.name}
                          fill
                          className="object-contain p-6"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="font-medium text-sm">{i.name}</div>
                        <div className="text-xs text-gray-500">
                          {categoryLabels[i.category]} • {i.thickness} •{" "}
                          {i.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-xs text-gray-500">
                Sonat&apos;ın Dijital Dolabı — {new Date().getFullYear()}
              </footer>
            </section>
          </div>
        </div>

        {/* Separator */}
        <div className="w-px bg-gray-300"></div>

        {/* Sağ taraf: Outfit Builder (%25) */}
        <div className="w-1/4 flex flex-col overflow-hidden bg-gray-50 px-4 py-6">
          <div className="flex-shrink-0 mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today&apos;s Outfit</h2>
            <button
              onClick={randomizeOutfit}
              className="h-8 px-3 rounded-md bg-black text-white hover:bg-gray-800 text-xs"
            >
              🎲 Random
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => {
              const item = selected[cat];
              return (
                <div
                  key={cat}
                  className="group relative rounded-xl border-2 border-dashed border-gray-300 p-2 min-h-[80px] hover:border-gray-400 transition bg-white"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    try {
                      const droppedItem = JSON.parse(
                        e.dataTransfer.getData("application/json")
                      ) as Item;
                      if (droppedItem.category === cat) {
                        pickItem(cat, droppedItem);
                      }
                    } catch (err) {
                      console.error("Drop error:", err);
                    }
                  }}
                >
                  {item ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => openPicker(cat)}
                    >
                      <div className="w-25 h-25 relative rounded-md bg-gray-50 overflow-hidden mb-1 mx-auto">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-xs">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {categoryLabels[cat]}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-full text-gray-400 cursor-pointer"
                      onClick={() => openPicker(cat)}
                    >
                      <div className="mb-1">
                        <Image
                          src={categoryPlaceholders[cat]}
                          alt={categoryLabels[cat]}
                          width={24}
                          height={24}
                          className="opacity-40"
                        />
                      </div>
                      <div className="text-xs text-center">
                        Drop {categoryLabels[cat]} here
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal Seçici */}
      {modalOpen && modalCategory && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closePicker} />
          <div className="relative bg-white w-full sm:max-w-3xl max-h-[80vh] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">
                {categoryLabels[modalCategory!]} Change
              </h3>
              <button
                onClick={closePicker}
                className="text-sm text-gray-600 hover:text-black"
              >
                Close
              </button>
            </div>
            <div className="p-4 overflow-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(filteredByCategory[modalCategory!].length > 0
                  ? filteredByCategory[modalCategory!]
                  : allByCategory[modalCategory!]
                ).map((i: Item) => (
                  <button
                    key={i.id}
                    className="rounded-xl border border-gray-200 p-3 hover:shadow-md transition text-left"
                    onClick={() => pickItem(modalCategory!, i)}
                  >
                    <div className="aspect-square relative rounded-md bg-gray-50 overflow-hidden">
                      <Image
                        src={i.image}
                        alt={i.name}
                        fill
                        className="object-contain p-6"
                      />
                    </div>
                    <div className="mt-2">
                      <div className="font-medium text-sm">{i.name}</div>
                      <div className="text-xs text-gray-500">
                        {i.thickness} • {i.length}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
