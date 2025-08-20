"use client";

import { type Category, type Item, categoryLabels } from "@/constants";
import ItemCard from "./ItemCard";

interface WardrobeGridProps {
  items: Item[];
  onPickItem: (category: Category, item: Item) => void;
}

export default function WardrobeGrid({ items, onPickItem }: WardrobeGridProps) {
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<Category, Item[]>);

  const categoryOrder: Category[] = [
    "top",
    "dress",
    "bottom",
    "outwear",
    "bag",
    "shoes",
  ];

  return (
    <div className="space-y-6">
      {categoryOrder.map((category) => {
        const categoryItems = itemsByCategory[category] || [];

        if (categoryItems.length === 0) return null;

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-md font-medium text-gray-700">
                {categoryLabels[category]}
              </h3>
              <span className="text-xs text-gray-500">
                ({categoryItems.length})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemClick={onPickItem}
                  showCategory={false}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
