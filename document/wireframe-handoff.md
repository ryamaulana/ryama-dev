# Wireframe Handoff Blueprints — ryama.my.id

> **Status:** Revised | **Date:** July 15, 2026
> **Repository:** ryama-dev

---

## 1. Global Viewport & Adaptive Breakpoints

Tidak berubah dari draft sebelumnya:
- Mobile `<640px` · Tablet Portrait `640-767px` · Tablet Landscape `768-1023px` · Laptop `1024-1279px` · Desktop `1280-1535px` · Large Desktop `≥1536px`

---

## 2. Homepage (`/`) Layout Spec

### 2.1 Floating Header
Tidak berubah — `fixed`, `z-index:50`, max-width 1280px, padding `clamp(1.25rem, 4.5vh, 3.5rem)`.

### 2.2 Hero Section
- **Tinggi:** 100vh
- **Konten:** MURNI 3 blok teks (headline, sub-headline, scroll CTA) — **TANPA imagery, video, atau parallax mouse**. Ini beda dari draft lama yang sempat nambahin logo besar + shared-element flying transition.
- Headline: serif (Playfair Display), tanpa warna aksen (charcoal solid).

### 2.3 Projects Showcase (Landscape)
Tidak berubah signifikan — kolom kiri teks (28%), kolom kanan mockup canvas 3D (70%). Warna aksen di kolom ini ikut deep-color project aktif (Forest Green/Navy/Maroon), bukan coral.

### 2.4 Outro
- CTA "There's more behind this." + "Get to know me" **visible normal**, ditempatkan sebagai elemen terpisah — BUKAN disembunyikan di balik photo stack (superseded konsep hidden-CTA draft lama).
- Photo stack tetap draggable, grayscale default, di sampingnya sebagai elemen dekoratif independen.

---

## 3. About Page (`/about`) Layout Spec — REVISI TOTAL

**Normal scroll, TIDAK snap-per-slide.** Struktur 6 section berurutan (bukan lagi "bento slide"):

### 3.1 Section 1 — Pembuka
- Layout: flush-left grid, TANPA foto profil.
- Nama disusun mixed-weight: kata tertentu bold-sans tebal, kata lain serif reguler, dalam satu "kalimat" nama+tagline — menciptakan rag-kanan organik dari panjang baris yang natural (bukan staggered/diagonal manual).
- Tanpa ghost text di background.

### 3.2 Section 2 — Cerita Personal
- Body text biasa, lanjutan alami dari Section 1, tanpa judul terpisah.

### 3.3 Section 3 — Bukti Kolaborasi
- Kicker kecil "COLLABORATION" + judul serif besar (~48px).
- Narasi flush-left (BUKAN tabel 2-kolom seperti draft lama) menyebut PNJ, PT NTG, Exigen secara eksplisit.
- Best Capstone Award diselipin bold inline di kalimat, bukan badge/lencana terpisah.

### 3.4 Section 4 — Filosofi (4 Pilar)
- Kicker "PHILOSOPHY" + judul serif besar.
- **BUKAN lagi grid 2x2** seperti draft lama (yang juga sempat pakai nomor warna ungu) — sekarang:
  - Chain-pill horizontal: 4 pill (pill pertama solid/highlight charcoal, sisanya outline), terhubung label "MENCIPTAKAN →", cycling aktif otomatis tiap ~2.6 detik.
  - Background: animasi network — titik tersebar dengan garis bezier "bernapas" convergen ke satu titik fokus di tengah section.
  - Semua monokrom charcoal/gray di atas `#EEEDE9` — tanpa warna aksen.

### 3.5 Section 5 — Tech Stack Tags
- Judul serif KECIL (~28px) — sengaja lebih quiet dari section lain.
- Tag: rounded outline tipis (`border 1px #BEBDB9`), tanpa fill/warna dot, dikelompokkan per kategori (AI/ML, Web & API) dengan label kategori serif kecil.
- Data tag: Python, TensorFlow, Keras, MLflow, Next.js, React, Laravel, Supabase, RESTful API (sesuai resume asli — bukan lagi PaddleOCR/Qwen2.5 dari draft lama).

### 3.6 Section 6 — Kontak/Penutup
- Judul serif besar lagi (~52px) — boleh menonjol sebagai closing statement.
- Status dot: **charcoal**, bukan coral. Label "Available for new projects".
- Link (Email/LinkedIn/GitHub): teks + underline solid, BUKAN tombol/badge.

---

## 4. Case Study Page (`/projects/[slug]`) Layout Spec — BARU

Belum ada di draft sebelumnya. Struktur (detail lengkap di prompt `08`):

1. Back link kecil "← Back to projects"
2. Header: nama project (serif, warna = `accentColor` project) + value proposition
3. Cerita Awal — narasi + slot visual opsional (kiri/kanan)
4. Celah yang Saya Lihat — pull-quote serif lebih besar dari body, biasanya TANPA visual
5. Bagaimana Saya Mendekatinya — narasi + slot visual (before/after, edge-case, atau diagram editorial, atau skip)
6. Fitur-fitur (2-3x) — narasi + slot visual bergantian kiri/kanan
7. Penutup opsional
8. Tech Stack footnote — border-top tipis, terpisah jauh dari konten utama, SATU-SATUNYA tempat istilah teknis boleh muncul

---

## 5. Accessibility & Interactive Cues

- **Keyboard Focus Indicator:** outline 2px **charcoal** (bukan coral), offset 3px, saat `:focus-visible`.
- **Custom Cursor:** instant-follow (no lag), warna charcoal, hanya scale/opacity yang animasi.
- **Aria Roles:** R3F Canvas `role="img"` + deskripsi alternatif.
- **Dynamic Media:** video mockup `muted loop playsInline`.