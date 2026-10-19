# Simsalaclean — Landing Page

Pre-launch landing page untuk Simsalaclean, layanan laundry online yang akan segera hadir di Jakarta Selatan.

Tujuan utama halaman ini adalah mengumpulkan leads dari calon pelanggan sebelum layanan resmi diluncurkan.

---

## Project Overview

| Item | Detail |
|---|---|
| Status | Pre-launch |
| Target area | Jakarta Selatan |
| Primary goal | Lead generation via waitlist form |
| Form fields | Nama Lengkap, Username Instagram |
| Backend | Google Apps Script → Google Sheets |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Static HTML5 + CSS3 + Vanilla JavaScript (ES5-compatible) |
| Fonts | Poppins via Google Fonts CDN |
| Icons | Inline SVG |
| Backend | Google Apps Script Web App |
| Lead storage | Google Sheets |
| Analytics | Google Tag Manager + GA4 |
| Hosting | Vercel (static deployment) |
| Version control | Git + GitHub |

Tidak ada build tool, bundler, atau framework frontend yang digunakan. Project ini adalah static site yang langsung dapat di-deploy.

---

## Struktur Project

```
/
├── index.html                  # Entry point — seluruh halaman dalam satu file
├── favicon.svg                 # Favicon SVG (monogram "S", navy + mint)
├── .gitignore
├── README.md
├── Simsalaclean_Asset_Guide.md # Visual direction & asset inventory
├── css/
│   └── style.css               # Semua styling: design tokens, komponen, responsive
├── js/
│   └── main.js                 # Form submission, GAS integration, modals, GTM, nav
└── public/
    └── assets/                 # Placeholder untuk logo, hero image, dan ikon
```

---

## Cara Menjalankan Secara Lokal

Tidak ada instalasi atau build step yang diperlukan.

### Opsi 1 — Buka langsung di browser

```bash
open index.html
```

Atau klik dua kali `index.html` di Finder.

> Google Fonts (Poppins) memerlukan koneksi internet. Tanpa koneksi, browser akan menggunakan system font fallback.

### Opsi 2 — Local server (direkomendasikan)

Menggunakan Python (tersedia di macOS tanpa instalasi):

```bash
python3 -m http.server 3000
```

Buka `http://localhost:3000` di browser.

Menggunakan VS Code Live Server extension:
1. Install extension **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**

> Local server diperlukan untuk GTM Preview Mode — GTM tidak dapat di-preview melalui `file://` protocol.

---

## Production Build

Project ini adalah static site — tidak ada build step. File yang ada di root sudah merupakan production-ready output.

Untuk deployment ke Vercel, semua file di root directory akan di-serve langsung. Verifikasi sebelum deploy:

```bash
# Pastikan tidak ada file sensitif yang ikut
git status
git diff --staged

# Pastikan file berikut ada:
# - index.html
# - favicon.svg
# - css/style.css
# - js/main.js
```

---

## Environment Variables

Project ini tidak menggunakan environment variables di sisi frontend. Semua konfigurasi ada di dalam `js/main.js`.

Satu-satunya nilai yang perlu diperbarui sebelum go-live:

```javascript
// js/main.js — baris CONFIG
var CONFIG = {
  GAS_ENDPOINT: 'https://script.google.com/macros/s/.../exec'
};
```

> Endpoint ini adalah URL publik Google Apps Script Web App. Tidak mengandung secret atau credential. Aman untuk di-commit ke repository.

---

## Google Sheets Integration

### Konfigurasi

| Item | Value |
|---|---|
| Endpoint | `https://script.google.com/macros/s/AKfycbyP-ZoVXj9RfPJXgSeZqix_JFlIPQr5ZHRqwOrAwZg8djEKfWCwGDmnvVkGzLq_RXJ_/exec` |
| Spreadsheet ID | `1zGTynDun1h1bU9qMY3e5TEbEOQH0flQ5HkBXAaFn-EE` |
| Sheet name | `Leads` |
| Kolom | A: Timestamp · B: Full Name · C: Instagram Username |

### Cara kerja

1. Form dikirim sebagai JSON (`Content-Type: text/plain;charset=UTF-8`) via `fetch()` dengan `mode: 'no-cors'`
2. GAS `doPost(e)` menerima body, `JSON.parse(e.postData.contents)`, lalu menulis ke Sheets
3. Response bersifat opaque (GAS tidak mengembalikan CORS header) — jika `fetch()` resolve tanpa error, request dianggap berhasil

### Update endpoint

Jika Apps Script di-deploy ulang dan menghasilkan URL baru:
1. Salin URL `/exec` dari GTM → Manage Deployments
2. Update `CONFIG.GAS_ENDPOINT` di `js/main.js`
3. Commit dan deploy ulang

---

## Google Tag Manager & GA4

### Konfigurasi

| Item | Value |
|---|---|
| GTM Container ID | `GTM-TT5MX4KC` |
| GA4 Measurement ID | `G-YLBJDXFMFT` |
| Custom event | `simsalaclean_lead_form_submit` |

### GTM snippet

Snippet sudah terpasang di `index.html`:
- `<head>`: GTM loader script (async)
- `<body>` (baris pertama): noscript iframe fallback

### Tag yang harus dikonfigurasi di GTM dashboard

1. **Google Tag**
   - Type: Google Tag
   - Tag ID: `G-YLBJDXFMFT`
   - Trigger: All Pages

2. **GA4 Event — Lead Form**
   - Type: Google Analytics: GA4 Event
   - Configuration Tag: tag di atas
   - Event name: `simsalaclean_lead_form_submit`
   - Trigger: Custom Event → `simsalaclean_lead_form_submit`

Setelah konfigurasi: **Submit → Publish** di GTM dashboard.

### Custom event behavior

Event `simsalaclean_lead_form_submit` hanya dikirim ketika:
- Validasi form lolos
- `fetch()` ke GAS resolve (tidak throw)
- Tidak ada request lain yang sedang berjalan

Event **tidak** dikirim saat: field kosong, validasi gagal, network error, atau double-click.

Tidak ada data pribadi (nama, username) yang dikirim ke GA4.

---

## Deployment ke Vercel

### Pertama kali

1. Push project ke GitHub (lihat bagian Git Workflow di bawah)
2. Buka [vercel.com](https://vercel.com) → **Add New Project**
3. Import repository dari GitHub
4. Framework Preset: **Other** (static site, tidak ada build command)
5. Build Command: *(kosongkan)*
6. Output Directory: *(kosongkan atau `.`)*
7. Klik **Deploy**

### Update berikutnya

Setiap push ke branch `main` akan otomatis trigger re-deploy di Vercel.

---

## Git Workflow

### Setup awal (sudah dikerjakan)

```bash
git init
git add .
git commit -m "Initial commit: Simsalaclean pre-launch landing page"
```

### Push ke GitHub

```bash
# Buat repository baru di github.com (jangan centang "Initialize with README")
# Lalu jalankan:

git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

### Alur kerja harian

```bash
# Cek perubahan
git status
git diff

# Stage perubahan
git add css/style.css js/main.js index.html

# Commit
git commit -m "feat: deskripsi singkat perubahan"

# Push
git push
```

---

## Checklist Sebelum Go-Live

- [ ] Test form submission → konfirmasi baris baru di Google Sheets
- [ ] Konfigurasi tag GTM (Google Tag + GA4 Event) dan publish container
- [ ] Deploy ke Vercel
- [ ] Verifikasi GTM Preview Mode di URL live
- [ ] Verifikasi GA4 DebugView
- [ ] Lengkapi placeholder kontak di Privacy Policy modal (Instagram + email)
- [ ] Tambahkan asset final (logo, hero image, ikon)

---

## Design Tokens

| Token | Hex | Penggunaan |
|---|---|---|
| Navy | `#0F2D52` | Typography, CTA, brand mark |
| Mint Green | `#6ED6A7` | Accent, highlights, positive states |
| Cream | `#FAF8F4` | Background utama |
| Light Mint | `#E8F4F1` | Section alt background, icon containers |
| White | `#FFFFFF` | Card, form, modal surface |

Font: **Poppins** (Google Fonts) — weight 400, 500, 600, 700.
