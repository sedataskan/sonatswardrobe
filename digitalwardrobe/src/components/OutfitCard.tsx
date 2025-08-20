"use client";

import Image from "next/image";
import {
  type Category,
  type Item,
  categoryLabels,
  categoryPlaceholders,
} from "@/constants";

interface OutfitCardProps {
  category: Category;
  item?: Item;
  onItemClick: (category: Category) => void;
  onItemDrop: (category: Category, item: Item) => void;
}

export default function OutfitCard({
  category,
  item,
  onItemClick,
  onItemDrop,
}: OutfitCardProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("application/json");
      if (!data) {
        console.warn("No JSON data found in drag transfer");
        return;
      }
      const droppedItem = JSON.parse(data) as Item;
      if (droppedItem.category === category) {
        onItemDrop(category, droppedItem);
      }
    } catch (err) {
      console.error("Drop error:", err);
    }
  };

  return (
    <div
      className="group relative rounded-xl border-2 border-dashed border-gray-300 p-2 min-h-[80px] hover:border-gray-400 transition bg-white"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {item ? (
        <div className="cursor-pointer" onClick={() => onItemClick(category)}>
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
              {categoryLabels[category]}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center h-full text-gray-400 cursor-pointer"
          onClick={() => onItemClick(category)}
        >
          <div className="mb-1">
            <Image
              src={categoryPlaceholders[category]}
              alt={categoryLabels[category]}
              width={24}
              height={24}
              className="opacity-40"
            />
          </div>
          <div className="text-xs text-center">
            Drop {categoryLabels[category]} here
          </div>
        </div>
      )}
    </div>
  );
}
