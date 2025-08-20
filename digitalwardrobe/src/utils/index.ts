import { type Category, type Item, categoryLabels } from "@/constants";

export const getRandom = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};

export const groupItemsByCategory = (
  items: Item[]
): Record<Category, Item[]> => {
  const map: Record<Category, Item[]> = {
    top: [],
    bottom: [],
    bag: [],
    shoes: [],
    outwear: [],
    dress: [],
  };

  for (const item of items) {
    map[item.category]?.push(item);
  }

  return map;
};

export const applyFilters = (
  items: Item[],
  filters: {
    type?: string;
    thickness?: string;
    length?: string;
    location?: string;
    selectedSeasons?: string[];
  }
): Item[] => {
  const { type, thickness, length, location, selectedSeasons = [] } = filters;

  return items.filter((item) => {
    if (type && item.type !== type) return false;
    if (thickness && item.thickness !== thickness) return false;
    if (length && item.length !== length) return false;
    if (location && item.location !== location) return false;
    if (selectedSeasons.length > 0) {
      const hasSeason = item.season?.some((s) => selectedSeasons.includes(s));
      if (!hasSeason) return false;
    }
    return true;
  });
};

export const generateRandomOutfit = (
  allItemsByCategory: Record<Category, Item[]>,
  filteredItemsByCategory?: Record<Category, Item[]>
): Partial<Record<Category, Item>> => {
  const outfit: Partial<Record<Category, Item>> = {};

  // Check if dress items are available
  const dressPool =
    filteredItemsByCategory && filteredItemsByCategory.dress?.length > 0
      ? filteredItemsByCategory.dress
      : allItemsByCategory.dress;

  // Check if bottom and top items are available
  const bottomPool =
    filteredItemsByCategory && filteredItemsByCategory.bottom?.length > 0
      ? filteredItemsByCategory.bottom
      : allItemsByCategory.bottom;

  const topPool =
    filteredItemsByCategory && filteredItemsByCategory.top?.length > 0
      ? filteredItemsByCategory.top
      : allItemsByCategory.top;

  // Decide whether to use dress or bottom+top
  // Only use dress if dress items are available
  // If no dress available, use bottom+top
  // If both are available, choose randomly
  let useDress = false;

  if (
    dressPool?.length > 0 &&
    (bottomPool?.length === 0 || topPool?.length === 0)
  ) {
    // Use dress if no bottom or top available
    useDress = true;
  } else if (
    dressPool?.length > 0 &&
    bottomPool?.length > 0 &&
    topPool?.length > 0
  ) {
    // Both available, choose randomly
    useDress = Math.random() < 0.5;
  }
  // If only bottom+top available, useDress stays false

  (Object.keys(categoryLabels) as Category[]).forEach((category) => {
    // Skip bottom and top if we're using dress
    if (useDress && (category === "bottom" || category === "top")) {
      return;
    }
    // Skip dress if we're using bottom+top
    if (!useDress && category === "dress") {
      return;
    }

    const pool =
      filteredItemsByCategory && filteredItemsByCategory[category]?.length > 0
        ? filteredItemsByCategory[category]
        : allItemsByCategory[category];

    const randomItem = getRandom(pool);
    if (randomItem) {
      outfit[category] = randomItem;
    }
  });

  return outfit;
};

export const generateDressOutfit = (
  allItemsByCategory: Record<Category, Item[]>,
  filteredItemsByCategory?: Record<Category, Item[]>
): Partial<Record<Category, Item>> => {
  const outfit: Partial<Record<Category, Item>> = {};

  (Object.keys(categoryLabels) as Category[]).forEach((category) => {
    // Skip bottom and top for dress outfit
    if (category === "bottom" || category === "top") {
      return;
    }

    const pool =
      filteredItemsByCategory && filteredItemsByCategory[category]?.length > 0
        ? filteredItemsByCategory[category]
        : allItemsByCategory[category];

    const randomItem = getRandom(pool);
    if (randomItem) {
      outfit[category] = randomItem;
    }
  });

  return outfit;
};

export const generateTopBottomOutfit = (
  allItemsByCategory: Record<Category, Item[]>,
  filteredItemsByCategory?: Record<Category, Item[]>
): Partial<Record<Category, Item>> => {
  const outfit: Partial<Record<Category, Item>> = {};

  (Object.keys(categoryLabels) as Category[]).forEach((category) => {
    // Skip dress for top+bottom outfit
    if (category === "dress") {
      return;
    }

    const pool =
      filteredItemsByCategory && filteredItemsByCategory[category]?.length > 0
        ? filteredItemsByCategory[category]
        : allItemsByCategory[category];

    const randomItem = getRandom(pool);
    if (randomItem) {
      outfit[category] = randomItem;
    }
  });

  return outfit;
};

export const getDistinctLocations = (items: Item[]): string[] => {
  const locationSet = new Set(items.map((item) => item.location));
  return Array.from(locationSet);
};
