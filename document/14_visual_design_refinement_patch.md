# Visual Design Refinement Patch (Patch untuk design-system.md, 09-about-page-structure.md, 10_case_study_layout.md)

> **Status:** New Patch | **Date:** July 16, 2026
> **Repository:** ryama-dev
> **Cakupan:** Murni elemen grafis (tipografi, warna, layout, spacing) — tidak menyentuh animasi/interaksi.

## Kenapa direvisi
Review ulang terhadap keputusan grafis di seluruh dokumen menemukan beberapa titik yang belum benar-benar "diputuskan" (masih ambigu/kontradiktif antar dokumen), dan satu kesenjangan antara ambisi yang diklaim (`prd.md`) dengan token yang tersedia untuk mewujudkannya. Patch ini menyelesaikan semuanya dalam satu keputusan final per poin.

---

## 1. Tipografi

### 1.1 Perjelas Peran Space Grotesk vs Inter
Dua font sans ini di ukuran kecil terlalu mirip secara karakter — risikonya alasan "sengaja pilih font beda per peran" nggak kebaca secara visual. **Keputusan:** pertegas pembagian peran, bukan ganti font:
- **Space Grotesk** — HANYA untuk elemen yang dibaca sebagai konten: body paragraph, tag/label kategori, eyebrow text. Ukuran minimal 14px supaya karakter geometrisnya yang khas tetap kebaca.
- **Inter** — HANYA untuk elemen UI mikro yang fungsinya navigasi/aksi: nav link (`/`, `/about`), teks tautan CTA panah. Selalu di ukuran kecil, sering all-caps/letter-spaced — konteks ini yang membedakan dia dari Space Grotesk, bukan bentuk hurufnya semata.

### 1.2 Numeral Style untuk Philosophy Pillars (01-04) — belum ada spek sebelumnya
**Keputusan:** Playfair Display (serif, konsisten dengan aturan "semua headline pakai serif"), tabular lining figures, bold weight, ukuran besar (setara heading section, bukan body). Karena nomor ini eksplisit disebut sebagai "elemen visual" bukan cuma label urutan, dia harus diperlakukan setipografis itu.

### 1.3 Art-Direct Line Break di About Page — Pembuka
Spek lama: *"rag-kanan organik dari word-wrap natural."* Ini kontradiktif — kalau bentuk siluet rag itu memang diinginkan spesifik, dia nggak bisa diserahkan ke kebetulan lebar viewport. **Keputusan:** line-break harus di-art-direct manual per breakpoint utama (Desktop, Laptop, Tablet) — susunan kata bold-sans/serif tetap sama, tapi titik potong barisnya ditentukan eksplisit saat implementasi, bukan auto word-wrap. Hapus kata "natural" dari deskripsi — ganti jadi "rag yang disusun manual untuk terlihat organik."

---

## 2. Warna

### 2.1 Resolusi Final — Coral Retired Total (menyelesaikan konflik antar dokumen)
`09-about-page-structure.md` masih menyebut coral `#E05C3A` boleh dipakai sebagai "aksen netral residual" di section kontak. Ini **superseded** oleh `design-system.md` §4 dan `wireframe-handoff.md` §3.6 yang eksplisit: coral retired total, dot status pakai charcoal.

**Keputusan final:** hapus seluruh referensi coral dari `09-about-page-structure.md` bagian "Catatan tambahan". Dot status kontak = `text` (charcoal), tanpa pengecualian di manapun.

### 2.2 Naikkan Kontras Token `border`
`border` (`#E5E4E0`) dan `bg` (`#EEEDE9`) terlalu berdekatan secara lightness — berisiko divider/hairline nyaris tidak kelihatan di sebagian layar, termasuk border-top pemisah Tech Stack footnote yang fungsinya justru mengandalkan garis ini terlihat jelas.

**Keputusan:**
```
border: #D3D1CB   /* revisi dari #E5E4E0 */
```
Tetap warm neutral gray (satu keluarga dengan `bg`), tapi kontrasnya cukup untuk terlihat jelas sebagai pembatas di kondisi layar/cahaya normal.

---

## 3. Layout & Komposisi

### 3.1 Variasikan Proporsi Split — Jangan 40/60 di Semua Section
Split identik di Cerita Awal, Approach, dan tiap Fitur bikin section-section itu punya "bentuk" yang sama persis saat discroll berurutan — kehilangan ritme editorial.

**Keputusan — pola baru per jenis section:**
| Section | Rasio |
|---|---|
| Cerita Awal | 40/60 (tetap — ini pembuka standar, wajar konsisten) |
| Research Gap | Center, tanpa split (tidak berubah) |
| Approach | Kalau visual slot terisi: **55/45** (teks lebih dominan — section ini bicara proses berpikir, teks yang harus menang). Kalau visual slot `skip`: full-width teks, whitespace lega. |
| Fitur pertama (fitur unggulan/flagship) | **30/70** (visual dominan — fitur paling ingin ditonjolkan dapat porsi visual terbesar di halaman) |
| Fitur kedua & seterusnya | 40/60 (standar, gantian kiri-kanan seperti sebelumnya) |

Ini juga otomatis membantu kasus dengan tepat 2 fitur (paling rawan terasa "cuma diulang 2x") — fitur pertama sekarang punya proporsi visual berbeda dari fitur kedua, bukan sekadar dibalik kiri-kanan.

### 3.2 Formalkan Aturan Alignment — Center vs Flush-left
Homepage Hero center-aligned, tapi Case Study Header dan About Pembuka flush-left — ini valid sebagai keputusan, tapi sebelumnya nggak pernah dinyatakan sebagai *aturan*, cuma kebetulan konvensi berbeda.

**Keputusan, dijadikan aturan eksplisit:**
- **Center-aligned** — HANYA dipakai untuk Homepage Hero. Ini satu-satunya momen "pembuka dramatis" di seluruh situs.
- **Flush-left** — default untuk SEMUA section/halaman lain (Case Study Header, About Pembuka, dan seterusnya), sebagai mode "membaca editorial".

---

## 4. Spacing Scale

`prd.md` merujuk Aki Create sebagai referensi "extreme whitespace" untuk seluruh situs, tapi token terbesar yang ada (`--space-3xl: 64px`) bukan skala yang biasanya diasosiasikan dengan "extreme" — ada jarak antara ambisi dan tooling.

**Keputusan — tambah tier spacing baru:**
```
--space-4xl: 96px
--space-5xl: 128px
--space-6xl: 160px
```
**Aturan pemakaian:** padding vertikal (atas-bawah) tiap section di breakpoint Desktop/Large Desktop pakai **minimal `--space-5xl` (128px)**, idealnya `--space-6xl` (160px) untuk transisi antar section besar (misal sebelum/sesudah Header case study, antar section About page). Token `--space-3xl` ke bawah direservasi untuk spacing internal komponen (jarak heading-ke-body, gap dalam satu blok teks) — bukan lagi dipakai sebagai jarak antar section.

---

## Yang TIDAK berubah
- Tiga warna aksen deep per-project (Forest Green, Deep Navy, Deep Maroon) — tetap sama persis.
- Ketiga typeface (Playfair Display, Space Grotesk, Inter) tetap dipertahankan — cuma aturan pemakaiannya diperjelas, bukan diganti.
- Split 40/60 tetap jadi default/starting point untuk Cerita Awal dan fitur non-flagship — bukan dihapus, cuma ditambah variasi di titik-titik tertentu.
- Prinsip "One Focal Point per Section" dan tabel warna title (accentColor vs neutral) di `10_case_study_layout.md` tidak berubah — itu sudah sistem yang tepat.
