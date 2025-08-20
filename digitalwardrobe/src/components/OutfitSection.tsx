import { type Category, type Item, categoryLabels } from "@/constants";
import OutfitCard from "./OutfitCard";

interface OutfitSectionProps {
  selected: Partial<Record<Category, Item>>;
  hasSelectedItems: boolean;
  outfitType: "dress" | "topbottom" | null;
  onClearOutfit: () => void;
  onRandomizeOutfit: () => void;
  onSelectOutfitType: (type: "dress" | "topbottom") => void;
  onChangeType: () => void;
  onItemClick: (category: Category) => void;
  onItemDrop: (category: Category, item: Item) => void;
}

export default function OutfitSection({
  selected,
  hasSelectedItems,
  outfitType,
  onClearOutfit,
  onRandomizeOutfit,
  onSelectOutfitType,
  onChangeType,
  onItemClick,
  onItemDrop,
}: OutfitSectionProps) {
  return (
    <div className="w-1/4 flex flex-col overflow-hidden bg-surface p-4">
      <div className="mb-4 flex flex-row items-start justify-between">
        <h2 className="logo-title text-2xl font-semibold text-foreground">
          Today&apos;s Outfit
        </h2>
        {outfitType !== null && (
          <button
            onClick={onChangeType}
            className="h-8 px-3 rounded-md bg-muted text-white text-xs transition-all font-medium"
          >
            🔄 Change Type
          </button>
        )}
      </div>
      <div className="flex-shrink-0 mb-4 flex flex-col items-center justify-between">
        <div className="flex gap-2 w-full">
          {outfitType === null ? (
            <></>
          ) : (
            <div className="flex flex-row items-center justify-between w-full gap-2">
              {hasSelectedItems && (
                <button
                  onClick={onClearOutfit}
                  className="h-8 px-3 rounded-md hover:opacity-50 text-xs transition-all flex-shrink-0"
                >
                  🗑️ Clear
                </button>
              )}
              <button
                onClick={onRandomizeOutfit}
                className={`h-8 px-3 rounded-md bg-accent text-white hover:bg-opacity-90 text-xs transition-all font-medium ${
                  hasSelectedItems ? "w-3/4" : "w-full"
                }`}
              >
                🎲 Get Random Outfit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {outfitType !== null &&
          (Object.keys(categoryLabels) as Category[]).map((cat) => {
            const item = selected[cat];

            if (outfitType === "dress" && (cat === "bottom" || cat === "top")) {
              return null;
            }
            if (outfitType === "topbottom" && cat === "dress") {
              return null;
            }

            if (cat === "dress" && (selected.bottom || selected.top)) {
              return null;
            }

            if ((cat === "bottom" || cat === "top") && selected.dress) {
              return null;
            }

            return (
              <OutfitCard
                key={cat}
                category={cat}
                item={item}
                onItemClick={onItemClick}
                onItemDrop={onItemDrop}
              />
            );
          })}
        {outfitType === null && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Choose Your Style
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              Select whether you want a dress outfit or a top & bottom
              combination to get started.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onSelectOutfitType("dress")}
                className="px-6 py-3 rounded-lg bg-muted text-white text-sm transition-all font-medium"
              >
                👗 Dress
              </button>
              <button
                onClick={() => onSelectOutfitType("topbottom")}
                className="px-6 py-3 rounded-lg bg-surface border-2 border-muted text-foreground text-sm transition-all font-medium"
              >
                👕 Top + Bottom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
