"use client";

import Image from "next/image";
import { type Category, type Item, categoryLabels } from "@/constants";

interface ItemCardProps {
  item: Item;
  onItemClick?: (category: Category, item: Item) => void;
  showCategory?: boolean;
  size?: "small" | "medium" | "large";
  draggable?: boolean;
  className?: string;
}

export default function ItemCard({
  item,
  onItemClick,
  showCategory = true,
  size = "medium",
  draggable = true,
  className = "",
}: ItemCardProps) {
  const sizeClasses = {
    small: "p-2",
    medium: "p-3",
    large: "p-4",
  };

  const imageSizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item.category, item);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (draggable) {
      e.dataTransfer.setData("application/json", JSON.stringify(item));
    }
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 hover:shadow-md transition cursor-grab active:cursor-grabbing ${sizeClasses[size]} ${className}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onClick={handleClick}
      title={`${item.name} - ${categoryLabels[item.category]}`}
    >
      <div className="aspect-square relative rounded-md bg-gray-50 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={`object-contain ${imageSizeClasses[size]}`}
        />
      </div>
      <div className="mt-2">
        <div className="font-medium text-sm">{item.name}</div>
        <div className="text-xs text-gray-500">
          {showCategory && `${categoryLabels[item.category]} • `}
          {item.thickness} • {item.length}
        </div>
      </div>
    </div>
  );
}
