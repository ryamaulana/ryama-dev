# Product Requirements Document (PRD) — ryama.my.id

> **Status:** Revised | **Date:** July 15, 2026
> **Repository:** ryama-dev

---

## 1. Product Overview & Vision

`ryama.my.id` adalah website portofolio personal premium milik **Muhammad Arya Maulana** (AI Engineer & Fullstack Developer, Jakarta). Prinsip desain inti: **Editorial Minimalis** — mengomunikasikan value lewat tipografi dan imagery seminimal mungkin ("audience paham cuma dari tulisan dan gambar yang sedikit"), bukan lewat dekorasi interaktif yang ramai.

Referensi desain (pola, bukan konten yang ditiru):
- **Robin Noguier** — refined visual craft, scroll choreography, case study tone
- **Spencer Gabor** — typographic structure & editorial grid
- **Aki Create** — extreme whitespace, restraint-first minimalism (berlaku di SELURUH situs, bukan cuma Hero)

### Target Audience
- Recruiter & Talent Acquisition di bidang AI/ML dan fullstack development
- Engineering Manager & Tech Lead yang menilai kualitas kode dan pemahaman estetik
- Klien/kolaborator yang menjajaki kerja sama project predictive systems

---

## 2. Core Features & Functional Requirements

### 2.1 Homepage — Single Continuous Scroll
Satu route (`/`) menyatukan Hero → 3 Project Showcase → Outro dalam satu alur scroll vertikal.

- **Hero:** Murni tipografi — tanpa imagery, video, atau parallax. 3 blok teks + headline serif editorial.
- **Header Navigation:** Sticky floating, minimal. Tautan `/` dan `/about`.
- **Projects Showcase:** Landscape — 2 kolom (teks kiri, mockup visual kanan). Portrait — stacked (teks atas, mockup bawah).
  - Klik project → route ke `/projects/[slug]` (internal, lihat catatan `caseStudyUrl` di §4).
- **Outro:** CTA "There's more behind this." + "Get to know me" tampil **normal/visible** (bukan disembunyikan). Draggable candid photo stack (grayscale default) sebagai elemen dekoratif terpisah di sampingnya.
  - Klik CTA → `/about`.

### 2.2 About Page (`/about`) — Dibangun dari Nol
**Normal scroll, TIDAK snap-per-slide.** Nada penulisan: campuran personal & profesional. Enam section berurutan:

1. **Pembuka** — nama + identitas kerja singkat, tanpa judul besar formal. Layout: flush-left grid, rag-kanan organik dari word-wrap, mixed weight (bold sans + serif) per kata dalam satu kalimat. Tanpa foto profil.
2. **Cerita Personal** — 2-4 kalimat kenapa tertarik ke AI/predictive systems, ditulis sebagai cerita.
3. **Bukti Kolaborasi** — PNJ (Project-Based Learning) + PT NTG/Exigen, dibingkai sebagai narasi kerja nyata (bukan tabel CV). Best Capstone Project Award diselipin inline, bold, bukan badge terpisah.
4. **Filosofi Kerja (4 Pilar)** — section paling menonjol. Lihat §3 untuk detail lengkap & visualisasi.
5. **Tech Stack Tags** — quick-scan, visual lebih kecil/ringan dari section lain. Tag outline tipis tanpa fill, dikelompokkan per kategori.
6. **Kontak/Penutup** — personal, direct. Judul serif besar (boleh menonjol lagi sebagai closing).

### 2.3 Case Study Page (`/projects/[slug]`)
Struktur konten (detail lengkap di prompt `08-project-detail-content-extraction.md`):
Header → Cerita Awal → Celah yang Saya Lihat (Research Gap) → Bagaimana Saya Mendekatinya (Approach) → Fitur-fitur → Penutup opsional → Tech Stack footnote.

- Bahasa **jargon-free** di semua section kecuali Tech Stack footnote.
- Visual slot ditandai eksplisit per section (before/after, edge-case screenshot, diagram editorial, atau skip).
- Konten diambil dari source code langsung, BUKAN dari README.

### 2.4 Custom Cursor
- **Instant-follow** — posisi kursor 1:1 mengikuti mouse, TANPA lag/delay/spring/trailing.
- Hanya scale & opacity yang animasi smooth (150-300ms) saat hover elemen interaktif.
- Warna: neutral charcoal (bukan coral — lihat §3 Design System untuk detail warna).

### 2.5 Advanced GSAP Scroll Animations
- Crossfade background & tone warna mengikuti project aktif (skema warna deep per-project, lihat design-system.md).
- Outro cover trigger mematikan strip proyek dinamis saat outro masuk viewport.

---

## 3. Philosophy Pillars (About Page Section 4) — FINAL

Rantai sebab-akibat, general (berlaku ke semua domain project, bukan cuma predictive maintenance):

**01 Akar Masalah** → menciptakan → **02 Pencegahan** → menciptakan → **03 Implementasi Nyata** → menciptakan → **04 Dampak**

1. **Akar Masalah** — "Sebelum bikin solusi, saya gali dulu apa yang sebenarnya jadi sumber masalah — bukan cuma gejala yang kelihatan di permukaan."
2. **Pencegahan** — "Begitu akar masalahnya ketemu, saya desain sistem yang mencegah dari awal — bukan yang cuma merespon setelah dampaknya kelihatan."
3. **Implementasi Nyata** — "Solusi itu harus benar-benar jalan di kondisi nyata dan dipakai orang — bukan berhenti di demo atau proof-of-concept."
4. **Dampak** — "Ujungnya, semua itu diukur dari satu hal: apakah ini beneran mengubah cara kerja orang jadi lebih baik."

**Visualisasi:** animasi network — titik-titik tersebar dengan garis bezier yang "bernapas" (oscillate panjang), convergen ke SATU titik fokus di tengah section (bukan mesh/graph node-to-node). Chain pill (pill pertama solid/highlight, sisanya outline) di bawahnya, terhubung label "MENCIPTAKAN →", cycling otomatis sinkron dengan caption. Semua monokrom (charcoal/gray) — tanpa aksen warna.

*(Menggantikan pilar lama: Local First, Problem-Driven, Research↔Product, Predict Don't React — dianggap terlalu spesifik ke domain AI/predictive maintenance.)*

---

## 4. Technology Stack & Third-Party Libraries

- **Framework:** Next.js (App Router, SSG via `generateStaticParams`)
- **Styling:** Tailwind CSS v4, `@theme` di `globals.css`
- **Animasi:** GSAP + ScrollTrigger (scroll-scrubbing, pinning, snapping) — Framer Motion (hover micro-interactions, cursor, drag gesture)
- **3D:** Three.js via React Three Fiber & @react-three/drei (curved mesh mockup projection, mouse parallax tilt)

---

## 5. Key Constraints & Out-of-Scope

- WebGL diperlukan untuk performa 3D canvas optimal (60fps)
- `prefers-reduced-motion` harus mengurangi/mematikan animasi berat otomatis
- Dark mode: out of scope — situs tetap warm off-white
- Live AI model playground / dashboard analitik real-time: out of scope fase ini

## 6. Pending Tasks (Belum Dieksekusi)

- **`caseStudyUrl`** di `lib/projects.ts` (per data-model.md) saat ini masih mengarah ke GitHub eksternal di production — perlu diganti ke path internal `/projects/[slug]` setelah halaman case study siap. Ini task terpisah di `Header.tsx`/`lib/projects.ts`, bukan bagian dari prompt content-extraction.