# Design System Specification — ryama.my.id

> **Status:** Revised | **Date:** July 15, 2026
> **Repository:** ryama-dev

---

## 1. Visual Philosophy: "Editorial Minimalis"

Prinsip inti (berlaku di SELURUH situs, bukan cuma Hero):

1. **Aki Create Minimalism First:** Default ke restraint & whitespace. Kalau ragu antara opsi lebih ramai vs lebih minimal, PILIH yang lebih minimal — kecuali ada alasan naratif yang jelas kenapa perlu tambahan elemen.
2. **Ghost/Ambient Text — DIHAPUS TOTAL.** Ghost text sebagai tekstur ambient BUKAN lagi bagian dari sistem desain ini, di section manapun. (Ini menggantikan aturan lama yang mewajibkan ghost text sebagai salah satu prinsip inti.)
3. **Tipografi sebagai Objek Visual:** SEMUA judul/headline di situs ini (bukan cuma judul project) menggunakan font **serif**, bukan sans — supaya tipografi terbaca sebagai elemen visual yang disengaja, bukan teks polos.
4. **One Focal Point per Section:** Warna aksen dibatasi ke satu titik fokus per section; imagery melayani narasi, tidak pernah bersaing dengan tipografi.

---

## 2. Global Design Tokens

### 2.1 Color Palette

| Nama Token | Nilai Hex | Deskripsi Penggunaan |
| :--- | :--- | :--- |
| `bg` | `#EEEDE9` | Latar belakang dasar warm off-white (satu nilai, bukan dua) |
| `text` | `#1A1A1A` | Teks utama, logo, elemen solid |
| `text-muted` | `#6B6B6B` | Sub-deskripsi, label metrik, tautan non-aktif |
| `border` | `#E5E4E0` | Pembatas garis tipis 1px |
| `surface` | `#FFFFFF` | Latar kartu solid kontras tinggi (dipakai minimal, hindari bento-card look) |

> ⚠️ **`accent` (coral `#FF5A36`) DIHAPUS/RETIRED.** Coral tidak lagi dipakai di manapun di situs ini — dianggap terlalu cerah/playful dibanding nuansa premium deep-color yang sekarang jadi identitas warna utama. Tidak ada residual use, termasuk untuk elemen non-project (About page, dsb) — elemen kecil yang butuh penekanan visual pakai `text`/`text-muted` (neutral charcoal), BUKAN warna baru.

#### Skema Warna Deep Per-Project (Homepage & Case Study)
Setiap project punya SATU warna aksen deep yang dipakai konsisten untuk: **warna judul project, dot indicator, hover underline, dan section-active accent** — bukan token terpisah-pisah (lihat data-model.md §1.1, field `titleColor` DIHAPUS, title pakai `accentColor` langsung).

| Project | Aksen |
| :--- | :--- |
| Predictive Maintenance (Exigen) | `#1B4332` — Deep Forest Green |
| Interview Assessment System | `#1B2A4A` — Deep Navy |
| Mail Reader | `#6B1F2A` — Deep Maroon |

Background section ikut bertransisi halus mengikuti project aktif (nuansa netral warm/cool sangat tipis, bukan warna solid terang).

---

### 2.2 Typography

- **Heading/Serif Font:** *Playfair Display* — dipakai di **SEMUA judul/headline di seluruh situs**: judul project, hero headline, judul section About (Pembuka, Bukti Kolaborasi, Filosofi, Tech Stack, Kontak), judul section case study. Ini bukan lagi terbatas ke 2-3 tempat spesifik.
- **Body/Sans Font:** *Space Grotesk* — deskripsi, body text, tag, UI label. Dipilih karena keterbacaan tinggi untuk body panjang.
- **UI/CTA Font:** *Inter* — navigasi, tombol kursor, tautan CTA panah.

---

### 2.3 Spacing Variables
Tidak berubah dari draft sebelumnya:
`--space-xs` 4px · `--space-sm` 8px · `--space-md` 16px · `--space-lg` 24px · `--space-xl` 32px · `--space-2xl` 48px · `--space-3xl` 64px

### 2.4 Shadow Depths
Dipakai secara MINIMAL — hindari shadow tebal yang bikin elemen terasa seperti "card" (lihat §4 Anti-Patterns, no-card rule).
`--shadow-sm` 0 1px 2px rgba(0,0,0,0.05) · `--shadow-md` 0 4px 6px rgba(0,0,0,0.07)

---

## 3. UI Component Specifications

### 3.1 Scroll CTA Link
Tetap tautan teks + panah (bukan solid button):
- Awal: teks charcoal, panah charcoal (bukan coral lagi). Underline 0% width.
- Hover: underline melebar 100%, panah bergeser 4px, transisi 150-300ms.

### 3.2 Custom Cursor — REVISI TOTAL
- **Instant-follow:** posisi kursor mengikuti mouse 1:1, TANPA lag/delay/spring/trailing sama sekali.
- Hanya **scale & opacity** yang animasi smooth (150-300ms) saat hover elemen interaktif.
- Warna: **charcoal/neutral** (`#1A1A1A` dengan opacity), BUKAN coral.
- Hover state: scale membesar (~1.5-1.8x), opacity fill sangat rendah, tanpa label teks kecuali benar-benar diperlukan (evaluasi lebih lanjut — versi paling minimal cukup scale + fill, tanpa teks "VIEW"/"ABOUT" mengambang).

### 3.3 Draggable Candid Photo Stack (Outro)
Tidak berubah signifikan — grayscale default, full color saat hover/drag, tanpa border/shadow tebal (frame putih tipis boleh, tapi jangan berat).
**CTA di sebelahnya SEKARANG VISIBLE NORMAL** — bukan disembunyikan di balik foto (superseded konsep hidden-CTA lama).

### 3.4 About Page — Section-Specific Notes
- **Section Pembuka:** flush-left grid, rag-kanan organik (dari word-wrap natural, bukan manual stagger), mixed weight bold-sans + serif per kata dalam satu kalimat nama/tagline. Tanpa foto, tanpa ghost text.
- **Section Bukti Kolaborasi & Kontak:** judul serif ukuran besar (~48-52px) — section yang boleh menonjol.
- **Section Tech Stack:** judul serif ukuran KECIL (~28px) — sengaja lebih quiet dari section lain. Tag: outline tipis tanpa fill, no icon/emoji.
- **Section Filosofi:** lihat prd.md §3 untuk detail chain-pill + network animation.

---

## 4. Design Guidelines & Anti-Patterns

### Aturan Wajib
- Semua elemen interaktif wajib `cursor-pointer`.
- Transisi hover: durasi 150-300ms.
- Sticky nav menghormati jarak aman via `clamp()`.
- **Semua judul/headline pakai font serif** (lihat §2.2).

### Anti-Patterns (Dilarang Keras)
- ❌ Emoji sebagai ikon — pakai SVG Lucide/Heroicons.
- ❌ Hover yang memindahkan layout — pakai `scale()`, bukan ubah padding/margin.
- ❌ Kontras rendah — rasio teks-vs-background minimal 4.5:1.
- ❌ **Ghost/ambient text** — dihapus total dari sistem desain, jangan dipakai lagi di section manapun.
- ❌ **Warna coral** — retired total, jangan dipakai lagi di manapun termasuk residual/neutral use.
- ❌ **Format tabel CV/resume** (Institution | Degree | Year style) untuk About page — konten kolaborasi harus narasi, bukan tabel.
- ❌ **Card/bento box dengan border+shadow tebal** untuk foto profil atau section umum — kalau ada foto, treatment-nya bebas (no border/frame), bukan dibingkai kartu formal.

### Focus Indicator (Accessibility)
- Outline 2px **charcoal** (bukan coral lagi) dengan `outline-offset: 3px` saat `:focus-visible`.