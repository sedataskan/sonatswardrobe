export type Category = "outwear" | "top" | "bottom" | "dress" | "bag" | "shoes";
export type Season = "spring" | "summer" | "autumn" | "winter";

export interface Item {
  id: string;
  name: string;
  category: Category;
  type: string;
  thickness: "thin" | "medium" | "thick" | string;
  length: "short" | "medium" | "long" | string;
  season: ("spring" | "summer" | "autumn" | "winter" | string)[];
  location: string;
  image: string;
}

export const categoryLabels: Record<Category, string> = {
  top: "Top",
  bottom: "Bottom",
  bag: "Bag",
  shoes: "Shoes",
  outwear: "Outwear",
  dress: "Dress",
};

export const categoryPlaceholders: Record<Category, string> = {
  top: "/shirt.svg",
  bottom: "/pants.svg",
  bag: "/bag.svg",
  shoes: "/shoes.svg",
  outwear: "/jacket.svg",
  dress: "/dress.svg",
};

export const thicknessOptions = ["thin", "medium", "thick"] as const;
export const lengthOptions = ["short", "medium", "long"] as const;
export const categoryOptions = [
  "shirt",
  "pants",
  "jacket",
  "dress",
  "skirt",
  "shoes",
  "sneakers",
  "jeans",
  "coat",
  "shorts",
  "bodysuit",
  "bag",
] as const;

export const seasonOptionsEn: { value: Season; label: string }[] = [
  { value: "spring", label: "🌸 Spring" },
  { value: "summer", label: "☀️ Summer" },
  { value: "autumn", label: "🍂 Autumn" },
  { value: "winter", label: "❄️ Winter" },
];
