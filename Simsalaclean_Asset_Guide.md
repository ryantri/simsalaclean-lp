# Simsalaclean — Landing Page Asset Guide

Dokumen ini menjelaskan visual direction, daftar asset, rekomendasi penamaan file, dan cara menggunakan asset Simsalaclean untuk landing page pre-launch.

## 1. Project Overview

**Brand:** Simsalaclean  
**Business:** Layanan laundry online  
**Area:** Jakarta Selatan  
**Status:** Pre-launch  
**Primary objective:** Mengumpulkan leads sebelum peluncuran resmi  
**Primary conversion:** Lead form submission dengan dua field: Nama Lengkap dan Username Instagram

Simsalaclean diposisikan sebagai brand laundry modern yang ingin membuat rutinitas laundry terasa lebih praktis dan sederhana.

### Brand message

**Headline:** Urusan Laundry, Biar Kami yang Bikin Lebih Simpel.

**Supporting copy:** Kesibukan sehari-hari sudah cukup menyita waktu. Simsalaclean hadir dengan visi membuat urusan laundry jadi lebih praktis, supaya kamu punya lebih banyak waktu untuk hal-hal yang penting.

**CTA:** Daftar Sekarang

> Penting: Website harus tetap jelas menyampaikan bahwa Simsalaclean masih dalam tahap pre-launch. Jangan menyiratkan bahwa layanan sudah bisa dipesan atau digunakan.

---

## 2. Visual Direction

Arah visual yang direkomendasikan:

- Modern, clean, minimalis, dan approachable.
- Terasa premium tanpa menjadi terlalu formal.
- Menggunakan visual laundry yang rapi, terang, dan nyaman.
- Menggunakan ilustrasi lembut atau lifestyle photography yang terasa natural.
- Mengutamakan keterbacaan, whitespace, dan visual hierarchy.
- Hindari visual yang terlalu ramai, warna neon, atau gaya korporat yang kaku.

### Suggested color palette

Warna berikut adalah rekomendasi awal dari konsep asset, bukan brand guideline final yang sudah disahkan.

| Color | Hex | Recommended usage |
|---|---|---|
| Navy | `#0F2D52` | Primary typography, dark CTA, brand mark |
| Mint Green | `#6ED6A7` | Primary accent, highlights, positive states |
| Cream | `#FAF8F4` | Main background |
| Light Mint | `#E8F4F1` | Soft backgrounds, icon containers |
| White | `#FFFFFF` | Cards, form fields, modal backgrounds |

Periksa konsistensi warna pada semua asset sebelum production.

### Typography

Rekomendasi: gunakan sans-serif yang modern dan mudah dibaca, misalnya **Poppins** atau font sans-serif sejenis yang sudah tersedia di project.

- Heading: Bold atau SemiBold.
- Body copy: Regular.
- Form labels: Medium.
- Button labels: SemiBold.

Jangan menambahkan font eksternal baru jika project sudah memiliki design system yang sesuai tanpa mengevaluasi dampaknya pada performa.

---

## 3. Asset Inventory

Asset concept board yang dibuat mencakup kategori berikut.

| No. | Asset | Purpose | Suggested filename |
|---|---|---|---|
| 1 | Primary Logo | Logo utama dengan simbol dan wordmark | `simsalaclean-logo-primary.svg` |
| 2 | Horizontal Logo | Header dan area dengan layout horizontal | `simsalaclean-logo-horizontal.svg` |
| 3 | Logo Icon | Favicon, avatar, atau aplikasi | `simsalaclean-logo-icon.svg` |
| 4 | Monochrome Logo | Penggunaan satu warna jika diperlukan | `simsalaclean-logo-mono.svg` |
| 5 | Hero Image | Visual utama pada Hero Section | `simsalaclean-hero.webp` |
| 6 | Character Illustration 1 | Ilustrasi lifestyle dengan pakaian bersih | `illustration-laundry-folded.webp` |
| 7 | Character Illustration 2 | Ilustrasi menikmati kain/pakaian bersih | `illustration-fresh-laundry.webp` |
| 8 | Character Illustration 3 | Ilustrasi dengan keranjang laundry | `illustration-laundry-basket.webp` |
| 9 | Benefit Icon — Time | Benefit: lebih banyak waktu | `icon-benefit-time.svg` |
| 10 | Benefit Icon — Routine | Benefit: rutinitas lebih praktis | `icon-benefit-routine.svg` |
| 11 | Benefit Icon — Simplicity | Benefit: hidup lebih simpel | `icon-benefit-simplicity.svg` |
| 12 | Benefit Icon — Comfort | Benefit: kenyamanan | `icon-benefit-comfort.svg` |
| 13 | How It Works — Waitlist | Langkah 1: daftar waitlist | `icon-step-waitlist.svg` |
| 14 | How It Works — Updates | Langkah 2: ikuti perkembangan | `icon-step-updates.svg` |
| 15 | How It Works — Launch | Langkah 3: menyambut peluncuran | `icon-step-launch.svg` |
| 16 | Decorative Elements | Bubbles, sparkles, dan shape dekoratif | `decorative-elements.svg` |
| 17 | Lifestyle Photo — Folded Laundry | Visual pendukung untuk journal/section | `photo-folded-laundry.webp` |
| 18 | Lifestyle Photo — Hanging Clothes | Visual pakaian pada hanger | `photo-hanging-clothes.webp` |
| 19 | Lifestyle Photo — Laundry Basket | Visual keranjang laundry | `photo-laundry-basket.webp` |
| 20 | Fabric Detail Photo | Detail tekstur kain | `photo-fabric-detail.webp` |
| 21 | Background Texture | Background dekoratif untuk section | `background-soft-shapes.svg` |
| 22 | Favicon 32px | Browser tab | `favicon-32.png` |
| 23 | Favicon 16px | Browser tab ukuran kecil | `favicon-16.png` |
| 24 | Favicon SVG | Favicon vector jika didukung | `favicon.svg` |
| 25 | Open Graph Image | Preview saat URL dibagikan | `og-image.png` |

**Penting:** Gambar asset board adalah referensi visual gabungan, bukan kumpulan file individual yang sudah terpisah. Jika hanya file board yang tersedia, jangan memotongnya lalu menganggap setiap hasil crop sebagai asset final tanpa pemeriksaan kualitas. Buat atau ekspor setiap asset secara terpisah sebelum digunakan di production.

---

## 4. Asset Usage by Landing Page Section

### Header
- Gunakan horizontal logo jika tersedia dalam file terpisah.
- Gunakan logo icon hanya jika ruang header terbatas.
- Pastikan logo cukup kontras dengan background.

### Hero Section
- Gunakan hero image utama dengan komposisi yang tidak mengalahkan headline dan form.
- Pada desktop, image dapat ditempatkan di sisi kanan jika layout dua kolom digunakan.
- Pada mobile, pertimbangkan ukuran gambar yang lebih ringkas agar form tetap mudah ditemukan.
- Jangan lazy-load hero image utama jika hal itu menunda tampilan konten utama.

### Benefits Section
Gunakan tiga ikon utama:
1. Time — lebih banyak waktu untuk dirimu.
2. Routine — dirancang untuk hari yang sibuk.
3. Simplicity — rutinitas yang lebih simpel.

Ikon harus konsisten dari sisi ukuran, stroke, warna, dan padding.

### How It Works
Gunakan tiga ikon berurutan:
1. Daftar di waitlist.
2. Ikuti perkembangannya.
3. Bersiap menyambut peluncuran.

### FAQ
Tidak memerlukan ilustrasi tambahan. Prioritaskan keterbacaan, interaksi accordion, dan spacing.

### Footer
Gunakan logo yang sesuai dan informasi brand yang sudah terkonfirmasi. Jangan menambahkan alamat, email, akun sosial, atau detail legal yang belum tersedia.

### Social sharing
Gunakan Open Graph image dengan ukuran yang sesuai untuk preview tautan. Pastikan headline tetap terbaca saat image tampil dalam ukuran kecil.

---

## 5. Asset Production Notes

Asset board yang dihasilkan AI membantu menentukan arah visual, tetapi beberapa item perlu dibuat atau diekspor ulang sebagai file individual.

### Logo
- Gunakan logo vector (SVG) untuk website jika memungkinkan.
- Periksa ejaan “Simsalaclean” dan tagline sebelum dipublikasikan.
- Pastikan bentuk logo tetap terbaca pada ukuran kecil.
- Pastikan tersedia versi terang/gelap jika dibutuhkan.
- Jangan menggunakan gambar logo yang masih memiliki panel, label, atau background dari asset board.

### Hero image
- Pilih satu visual utama yang relevan dengan layanan laundry.
- Utamakan komposisi landscape untuk desktop.
- Siapkan crop alternatif untuk mobile bila diperlukan.
- Hindari teks yang tertanam di dalam gambar.
- Hindari watermark atau logo generik yang tidak sesuai brand.

### Icons
- Utamakan SVG untuk ikon.
- Gunakan satu gaya ilustrasi yang konsisten.
- Ikon dekoratif sebaiknya memiliki `alt=""` atau `aria-hidden="true"`.

### Lifestyle photography
- Gunakan foto yang terasa terang, natural, dan bersih.
- Kompres ke WebP atau AVIF untuk performa.
- Pastikan hak penggunaan asset sesuai dengan kebutuhan project.

### Favicon
- Gunakan simbol sederhana yang masih terbaca pada 16×16 px.
- Periksa hasilnya pada browser tab.
- Sediakan PNG fallback jika dibutuhkan oleh implementasi.

---

## 6. Suggested Folder Structure

Sesuaikan struktur ini dengan framework yang digunakan oleh project Kiro. Jangan mengganti struktur yang sudah ada jika tidak diperlukan.

```text
public/
├── favicon.svg
├── favicon-32.png
├── favicon-16.png
├── og-image.png
└── assets/
    ├── simsalaclean-logo-primary.svg
    ├── simsalaclean-logo-horizontal.svg
    ├── simsalaclean-logo-icon.svg
    ├── simsalaclean-logo-mono.svg
    ├── simsalaclean-hero.webp
    ├── illustration-laundry-folded.webp
    ├── illustration-fresh-laundry.webp
    ├── illustration-laundry-basket.webp
    ├── icon-benefit-time.svg
    ├── icon-benefit-routine.svg
    ├── icon-benefit-simplicity.svg
    ├── icon-benefit-comfort.svg
    ├── icon-step-waitlist.svg
    ├── icon-step-updates.svg
    ├── icon-step-launch.svg
    ├── decorative-elements.svg
    ├── photo-folded-laundry.webp
    ├── photo-hanging-clothes.webp
    ├── photo-laundry-basket.webp
    ├── photo-fabric-detail.webp
    └── background-soft-shapes.svg
```

---

## 7. Implementation Guidance

### Image performance
- Gunakan SVG untuk logo dan ikon sederhana.
- Gunakan WebP/AVIF untuk foto dan ilustrasi raster jika sesuai.
- Tentukan `width` dan `height` untuk mengurangi layout shift.
- Lazy-load gambar di bawah fold.
- Hindari memuat asset beresolusi terlalu besar tanpa kebutuhan.

### Accessibility
- Gunakan alt text deskriptif untuk gambar informatif.
- Gunakan alt kosong untuk dekorasi.
- Pastikan teks pada gambar tidak menjadi satu-satunya sumber informasi.
- Periksa kontras warna dan fokus keyboard.

### Responsive behavior
- Uji crop gambar pada desktop, tablet, dan mobile.
- Jangan biarkan gambar mendorong lead form keluar dari area awal halaman.
- Pastikan asset tidak menyebabkan horizontal overflow.

---

## 8. Technical Stack Context

Landing page akan dikembangkan menggunakan Kiro AI. Teknologi final mengikuti struktur project yang sudah ada.

Komponen yang direncanakan:

- **Frontend:** Framework yang sudah digunakan project; jika project kosong, pilih setup sederhana yang sesuai.
- **Lead form backend:** Google Apps Script Web App.
- **Lead storage:** Google Sheets.
- **Analytics management:** Google Tag Manager.
- **Analytics:** Google Analytics 4.
- **Version control:** GitHub.
- **Deployment:** Vercel.

Asset guide ini hanya mencakup arah visual dan pengelolaan asset. Dokumen ini tidak mengimplementasikan integrasi atau menjamin konfigurasi teknis sudah berjalan.

### Lead form requirement
Form hanya mengumpulkan:
1. Nama Lengkap.
2. Username Instagram.

### Custom analytics event
Nama event yang direncanakan:

`simsalaclean_lead_form_submit`

Event hanya boleh dikirim setelah backend mengonfirmasi bahwa submission berhasil. Jangan kirim nama lengkap atau username Instagram ke GA4.

---

## 9. Final QA Checklist

### Visual assets
- [ ] Logo individual sudah tersedia dan ejaannya benar.
- [ ] Hero image individual sudah tersedia.
- [ ] Benefit icons konsisten.
- [ ] How It Works icons konsisten.
- [ ] Favicon tampil pada browser tab.
- [ ] Open Graph image sudah tersedia.
- [ ] Tidak ada watermark atau label dari asset board pada asset final.

### Landing page
- [ ] Lead form terlihat above the fold.
- [ ] Form hanya memiliki dua field.
- [ ] Copywriting jelas menyatakan status pre-launch.
- [ ] Privacy Policy link berada tepat di bawah form.
- [ ] Thank You pop-up hanya muncul setelah submission berhasil.
- [ ] Layout responsive.

### Integrations
- [ ] Google Sheets menerima submission.
- [ ] GTM terpasang tanpa duplikasi.
- [ ] GA4 menerima page view sesuai konfigurasi.
- [ ] Custom event diuji melalui GTM Preview dan GA4 DebugView.
- [ ] Tidak ada informasi pribadi yang dikirim ke GA4.

### Deployment
- [ ] Source code tersimpan di repository GitHub yang benar.
- [ ] Production build berhasil.
- [ ] Website sudah di-deploy ke Vercel.
- [ ] Live URL diuji pada desktop dan mobile.

---

## 10. Important Note

Dokumen ini merupakan **asset guide dan implementation reference** untuk membantu pengembangan landing page Simsalaclean.

Asset board AI yang digunakan sebagai referensi visual tidak otomatis menyediakan seluruh logo, foto, ikon, favicon, dan Open Graph image sebagai file individual. Setiap asset yang akan digunakan pada website perlu dibuat atau diekspor secara terpisah dan diperiksa kualitasnya.

Jangan menganggap fitur Google Sheets, GTM, GA4, GitHub, atau Vercel telah selesai hanya karena sudah disebutkan dalam dokumen. Seluruh fitur tetap harus diimplementasikan dan diuji secara aktual.
