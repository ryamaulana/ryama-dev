# Data Model Specification — ryama.my.id

> **Status:** Revised | **Date:** July 15, 2026
> **Repository:** ryama-dev

---

## 1. Project Entities

### 1.1 Interface: `Project` — REVISI

```typescript
export interface Project {
  slug: string;             // Segmentasi URL unik
  name: string;              // Judul tampilan proyek (serif headline)
  description: string;       // Deskripsi singkat (1-2 kalimat)
  previewImage: string;
  previewVideo?: string;
  previewBgColor: string;
  caseStudyUrl: string;      // ⚠️ Saat ini masih ke GitHub eksternal di production.
                             //    PENDING: ganti ke path internal `/projects/${slug}`
                             //    setelah halaman case study siap (lihat prd.md §6).
  accentColor: string;       // Warna aksen deep spesifik proyek — dipakai untuk
                             // TITLE COLOR, dot indicator, hover underline, DAN
                             // section-active accent. SATU sumber kebenaran.
  eyebrow: string;           // Sub-judul kecil kapital
  // metrics: DIHAPUS dari sini — lihat catatan di §1.2 soal metrik yang
  // sebelumnya nyasar/tidak akurat antar-project. Metrik ditarik ulang per
  // project via prompt 08 (content extraction dari source code langsung),
  // BUKAN didefinisikan statis di interface ini lagi.
}
```

**Perubahan dari draft sebelumnya:**
- ❌ Field `titleColor` **DIHAPUS** — title project sekarang pakai `accentColor` langsung, tidak ada field terpisah.
- ❌ Field `modelIndicator` **DIHAPUS** dari tampilan utama — istilah teknis kayak "Predictive Maintenance", "NLP & Extraction" hanya boleh muncul di Tech Stack footnote case study, bukan di data yang tampil ke recruiter di homepage/label utama.
- ⚠️ `metrics` sebagai array statis di interface ini **dihapus** — sebelumnya ada catatan "ketidaksesuaian sengaja dipertahankan" (mis. Mail Reader dikasih metric sensor yang nggak relevan). Ini melanggar prinsip anti-halu di prompt 08. Metrik yang valid harus ditarik ulang dari source code tiap project secara individual, dengan `[NEEDS INPUT]` kalau tidak ditemukan bukti — bukan dipertahankan sebagai placeholder nyasar.

### 1.2 Data Instansiasi: `projects`

| Slug | Nama Proyek | Aksen |
| :--- | :--- | :--- |
| `asset-lifespan-prediction` | Predictive Maintenance | `#1B4332` (Forest Green) |
| `complaint-ticket-analysis` | Interview Assessment System | `#1B2A4A` (Deep Navy) |
| `asset-condition-monitoring` | Mail Reader | `#6B1F2A` (Deep Maroon) |

> **Catatan slug:** slug historis (`complaint-ticket-analysis`, `asset-condition-monitoring`) tidak match domain bisnis nama project saat ini (Interview Assessment System, Mail Reader) — ini kemungkinan sisa penamaan dari iterasi project sebelumnya. Tidak wajib diganti (mengubah slug = breaking URL), tapi perlu disadari saat ada yang inspect URL langsung.

---

## 2. Candid Photo Stack Entities (Outro)

Tidak berubah dari draft sebelumnya — `CANDID_PHOTOS` array di `app/page.tsx` tetap sama (ragunan.jpeg, SMK.jpg, batik.png dengan rotasi & offset masing-masing).

**Perubahan konteks:** CTA "Get to know me" di sebelah photo stack ini sekarang **visible normal**, bukan disembunyikan di balik foto (superseded konsep hidden-CTA).

---

## 3. About Page Entities — REVISI TOTAL

Halaman `/about` dibangun ulang dari nol. Struktur data di bawah ini MENGGANTIKAN seluruh draft `SPECS`, `TECH_CATEGORIES` lama, dan `PHILOSOPHIES` lama.

### 3.1 Opening / Identity
```typescript
const IDENTITY = {
  name: "Muhammad Arya Maulana",
  role: "AI Engineer & Fullstack Developer",
  location: "Jakarta",
};
```
Tidak ada lagi `SPECS` tabel dengan `dotColor` coral — About page tidak pakai tabel biodata formal.

### 3.2 Collaboration Proof (narrative, bukan tabel)
Konten section ini adalah paragraf naratif (lihat prompt `09-about-page-structure.md`), bukan array data terstruktur seperti `SPECS` lama. Poin kunci yang harus ada di narasi:
- PNJ — Project-Based Learning, masalah nyata dari client asli
- PT NTG — client yang mengusulkan project Exigen Smart Maintenance
- Best Capstone Project Award (Asah led by Dicoding x Accenture, Jan 2026) — diselipin inline, bukan badge

### 3.3 Tech Stack Categories — REVISI (data akurat dari resume)
```typescript
const TECH_CATEGORIES = [
  {
    title: "AI / ML",
    tags: ["Python", "TensorFlow", "Keras", "MLflow"],
  },
  {
    title: "WEB & API",
    tags: ["Next.js", "React", "Laravel", "Supabase", "RESTful API"],
  },
];
```
**Perubahan:** entri lama seperti PaddleOCR, Qwen2.5-Ollama dihapus karena tidak match resume ATS asli. Tag ditampilkan sebagai outline tipis tanpa fill/warna dot (lihat design-system.md §3.4) — bukan badge berwarna per-tag seperti draft lama.

### 3.4 Philosophy Pillars — REVISI TOTAL (FINAL)
```typescript
const PHILOSOPHY_CHAIN = [
  {
    order: "01",
    label: "Akar Masalah",
    description: "Sebelum bikin solusi, saya gali dulu apa yang sebenarnya jadi sumber masalah — bukan cuma gejala yang kelihatan di permukaan.",
  },
  {
    order: "02",
    label: "Pencegahan",
    description: "Begitu akar masalahnya ketemu, saya desain sistem yang mencegah dari awal — bukan yang cuma merespon setelah dampaknya kelihatan.",
  },
  {
    order: "03",
    label: "Implementasi Nyata",
    description: "Solusi itu harus benar-benar jalan di kondisi nyata dan dipakai orang — bukan berhenti di demo atau proof-of-concept.",
  },
  {
    order: "04",
    label: "Dampak",
    description: "Ujungnya, semua itu diukur dari satu hal: apakah ini beneran mengubah cara kerja orang jadi lebih baik.",
  },
];
// Relasi antar item: order[i] "menciptakan" order[i+1] — divisualisasikan
// sebagai chain-pill dengan konektor "MENCIPTAKAN →", cycling otomatis.
// Lihat prd.md §3 untuk detail visualisasi network background.
```
**Perubahan:** menggantikan total `PHILOSOPHIES` lama (Local First, Problem-Driven, Research↔Product, Predict Don't React) yang dianggap terlalu spesifik ke domain AI/predictive maintenance.

---

## 4. UI Interactive States

### 4.1 Halaman Utama
Tidak berubah — `activeProjectIndex`, `scrollDirection`, `zOrder` tetap sama seperti draft sebelumnya.

### 4.2 Kursor Kustom — REVISI
```typescript
// Posisi kursor: instant-follow, TIDAK ADA lag/spring/lerp pada x/y.
// State yang dianimasikan secara smooth (150-300ms): scale, opacity SAJA.
cursorPosition: { x: number; y: number };  // direct mouse position, no interpolation
isHovering: boolean;   // triggers scale + opacity transition only
isVisible: boolean;    // hidden on pointer:coarse (touch)
// cursorLabel dihapus dari state wajib — evaluasi ulang apakah label teks
// ("VIEW"/"ABOUT") tetap dipakai atau di-skip demi minimalisme (lihat
// design-system.md §3.2).
```

### 4.3 About Page — State Baru
```typescript
activePillarIndex: number;  // 0-3, cycling otomatis tiap ~2.6 detik untuk
                             // chain-pill highlight + network center label
                             // di section Filosofi (§3.4)
```