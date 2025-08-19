# 👕 Digital Wardrobe

Dijital gardırop uygulaması - kıyafetlerinizi organize edin ve yönetin!

## 📋 Proje Hakkında

Digital Wardrobe, kişisel gardırobunuzu dijital ortamda yönetmenizi sağlayan modern bir web uygulamasıdır. Kıyafetlerinizi kategorilere ayırabilir, mevsimsel özelliklerine göre filtreleyebilir ve hangi kıyafetlerin nerede olduğunu takip edebilirsiniz.

## ✨ Özellikler

- 🎯 **Kategori Bazlı Organizasyon**: Üst, alt, çanta ve ayakkabı kategorileri
- 🌡️ **Kalınlık Filtresi**: İnce, orta, kalın seçenekleri
- 📏 **Boy/Uzunluk Filtresi**: Kısa, orta, uzun seçenekleri
- 🌅 **Mevsim Filtresi**: İlkbahar, yaz, sonbahar, kış
- 📍 **Konum Takibi**: Kıyafetlerinizin nerede olduğunu bilin (ev, iş, okul vb.)
- 🎨 **Modern UI**: Tailwind CSS ile tasarlanmış kullanıcı dostu arayüz
- ⚡ **Hızlı Performans**: Next.js 15 ve React 19 ile geliştirildi

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Veri**: JSON dosyası tabanlı depolama
- **Geliştirme**: ESLint, Turbopack

## 🚀 Kurulum

1. **Projeyi klonlayın**

   ```bash
   git clone https://github.com/sedataskan/sonatswardrobe.git
   cd sonatswardrobe/digitalwardrobe
   ```

2. **Bağımlılıkları yükleyin**

   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   ```

3. **Geliştirme sunucusunu başlatın**

   ```bash
   npm run dev
   # veya
   yarn dev
   # veya
   pnpm dev
   ```

4. **Tarayıcınızda açın**

   [http://localhost:3000](http://localhost:3000) adresine gidin

## 📁 Proje Yapısı

```
digitalwardrobe/
├── public/
│   ├── data/
│   │   └── items.json          # Kıyafet verileri
│   ├── *.svg                   # Kategori ikonları
│   └── ...
├── src/
│   └── app/
│       ├── globals.css         # Global stiller
│       ├── layout.tsx          # Ana layout
│       └── page.tsx            # Ana sayfa komponenti
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 💾 Veri Yapısı

Her kıyafet öğesi şu özelliklere sahiptir:

```typescript
interface Item {
  id: string; // Benzersiz tanımlayıcı
  name: string; // Kıyafet adı
  category: "top" | "bottom" | "bag" | "shoes";
  thickness: "ince" | "orta" | "kalın";
  length: "kısa" | "orta" | "uzun";
  season: ("ilkbahar" | "yaz" | "sonbahar" | "kış")[];
  location: string; // Konum (ev, iş, okul vb.)
  image: string; // Görsel yolu
}
```

## 🎯 Kullanım

1. **Kıyafetleri Görüntüleme**: Ana sayfada tüm kıyafetlerinizi kategoriler halinde görün
2. **Filtreleme**: Sol taraftaki filtre seçeneklerini kullanarak kıyafetleri süzün
3. **Arama**: Kalınlık, uzunluk, mevsim ve konuma göre arama yapın
4. **Kategori Seçimi**: Belirli bir kategoriyi seçerek odaklanın

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat (Turbopack ile)
npm run dev

# Üretim için derle
npm run build

# Üretim sunucusunu başlat
npm run start

# Kod kalitesini kontrol et
npm run lint
```

## 🔮 Gelecek Özellikler

- [ ] Yeni kıyafet ekleme formu
- [ ] Kıyafet düzenleme/silme işlemleri
- [ ] Görsel yükleme özelliği
- [ ] Kombin önerileri
- [ ] Mobil uygulama desteği
- [ ] Veritabanı entegrasyonu
- [ ] Kullanıcı hesapları

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

made with ❤️ by [@sedataskan](https://github.com/sedataskan)
