"use client";

import ItemCard from "./ItemCard";
import { type Category, type Item, categoryLabels } from "@/constants";

interface ItemPickerModalProps {
  isOpen: boolean;
  category: Category | null;
  filteredItems: Item[];
  allItems: Item[];
  onClose: () => void;
  onPickItem: (category: Category, item: Item) => void;
}

export default function ItemPickerModal({
  isOpen,
  category,
  filteredItems,
  allItems,
  onClose,
  onPickItem,
}: ItemPickerModalProps) {
  if (!isOpen || !category) return null;

  const itemsToShow = filteredItems.length > 0 ? filteredItems : allItems;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-3xl max-h-[80vh] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">{categoryLabels[category]} Change</h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {itemsToShow.map((item: Item) => (
              <ItemCard
                key={item.id}
                item={item}
                onItemClick={onPickItem}
                showCategory={false}
                draggable={false}
                className="hover:shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
