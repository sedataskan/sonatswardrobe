# 👕 Digital Wardrobe

A digital wardrobe application - organize and manage your clothes!

## 📋 About the Project

Digital Wardrobe is a modern web application that allows you to manage your personal wardrobe digitally. You can categorize your clothes, filter them by seasonal properties, and track where your clothes are located.

## ✨ Features

- 🎯 **Category-Based Organization**: Top, bottom, bag, and shoes categories
- 👗 **Smart Outfit Generation**: Create complete outfits with dress or top-bottom combinations
- 🔄 **Interactive Outfit Builder**: Drag and drop or click to select items for your daily outfit
- 🌡️ **Thickness Filter**: Thin, medium, thick options
- 📏 **Length Filter**: Short, medium, long options
- 🌅 **Season Filter**: Spring, summer, autumn, winter
- 🎨 **Modern UI**: User-friendly interface designed with Tailwind CSS
- ⚡ **High Performance**: Built with Next.js 15 and React 19

## 🛠️ Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Data**: JSON file-based storage
- **Development**: ESLint, Turbopack

## 🚀 Installation

1. **Clone the project**

   ```bash
   git clone https://github.com/sedataskan/sonatswardrobe.git
   cd sonatswardrobe/digitalwardrobe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in your browser**

   Go to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
digitalwardrobe/
├── public/
│   ├── data/
│   │   └── items.json          # Clothing data
│   ├── *.svg                   # Category icons
│   └── ...
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Main layout
│   │   └── page.tsx            # Main page component
│   ├── components/
│   │   ├── Filters.tsx         # Filter component
│   │   ├── ItemCard.tsx        # Individual item display
│   │   ├── ItemPickerModal.tsx # Item selection modal
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── OutfitCard.tsx      # Outfit item display
│   │   ├── OutfitSection.tsx   # Today's outfit section
│   │   └── WardrobeGrid.tsx    # Main grid layout
│   ├── constants/
│   │   └── index.ts            # Type definitions and constants
│   └── utils/
│       └── index.ts            # Utility functions
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 💾 Data Structure

Each clothing item has the following properties:

```typescript
interface Item {
  id: string; // Unique identifier
  name: string; // Clothing name
  type:
    | "shirt"
    | "pants"
    | "bag"
    | "shoes"
    | "boots"
    | "dress"
    | "skirt"
    | "jacket"
    | "sweater"
    | "sneaker"
    | "bodysuit"
    | "blouse"
    | "t-shirt"
    | "shorts"
    | "hoodie"
    | "coat";
  category: "top" | "bottom" | "bag" | "shoes" | "dress";
  thickness: "thin" | "medium" | "thick";
  length: "short" | "medium" | "long";
  season: ("spring" | "summer" | "autumn" | "winter")[];
  location: string; // Location (home, work, school, etc.)
  image: string; // Image path
}
```

## 🎯 How to Use

1. **View Clothing Items**: See all your clothes categorized on the main page
2. **Filtering**: Use the filter options on the left to narrow down items
3. **Search**: Search by thickness, length, season, and location
4. **Category Selection**: Focus on a specific category
5. **Outfit Generation**:
   - Select "Dress" for dress-based outfits
   - Select "Top + Bottom" for traditional combinations
   - Use "Randomize" to get new suggestions
6. **Manual Selection**: Click on outfit slots or drag items to build custom outfits
7. **Today's Outfit**: View and manage your selected outfit in the right panel

## 🛠️ Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check code quality
npm run lint
```

## 🔮 Future Features

- [ ] Mobile app support
- [ ] Clothing sharing features
- [ ] Photo upload for custom items

## 🤝 Contributing

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👨‍💻 Developer

Made with ❤️ by [@sedataskan](https://github.com/sedataskan)
