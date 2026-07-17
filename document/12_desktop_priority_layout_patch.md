# Desktop-Priority Layout Patch (Patch untuk wireframe-handoff.md, design-system.md, 10_case_study_layout.md)

> **Status:** New Patch | **Date:** July 16, 2026
> **Repository:** ryama-dev

## Kenapa direvisi
Review desain terhadap implementasi saat ini menunjukkan konten di layar desktop besar (≥1440px) masih terkunci dalam container `max-width: 1280px` yang flat di semua breakpoint desktop (lihat `wireframe-handoff.md` §2.1). Efeknya: di layar lebar, konten jadi kolom sempit yang mengambang di tengah dengan margin kosong besar di kiri-kanan — kesan "baca koran di tengah layar", bukan memakai kanvas desktop secara maksimal.

**Ini prioritas tinggi** karena desktop adalah platform utama produk ini. Versi mobile/tablet portrait tetap harus berfungsi (layout stacked yang sudah didefinisikan di `10_case_study_layout.md` dan `wireframe-handoff.md` tetap berlaku apa adanya), tapi BUKAN prioritas polish lebih lanjut — seluruh effort revisi di patch ini diarahkan ke breakpoint Laptop ke atas.

## Aturan Baru — Sistem Lebar Dua Tingkat

Ganti satu token `max-width: 1280px` flat dengan dua token terpisah, karena masalah "kolom sempit" dan "teks harus tetap nyaman dibaca" itu dua kebutuhan berbeda yang selama ini disamakan:

### Token 1: `--text-measure` (untuk elemen teks panjang)
Dipakai KHUSUS untuk paragraf/body text yang butuh kenyamanan baca — body Cerita Awal, pull-quote Research Gap, paragraf About page.
```
--text-measure: 720px;   /* tidak berubah mengikuti lebar viewport */
```
Ini SENGAJA tidak dibuat fluid — baris teks yang terlalu lebar justru menurunkan keterbacaan, ini bukan bagian dari masalah yang mau diperbaiki.

### Token 2: `--canvas-width` (untuk container section secara keseluruhan)
Dipakai untuk lebar keseluruhan section (header, split layout, project showcase) — token inilah yang diperbaiki jadi fluid, menggantikan flat `1280px` lama:

| Breakpoint | Lama | Baru |
|---|---|---|
| Laptop (1024–1279px) | `1280px` flat | `min(92vw, 1200px)` |
| Desktop (1280–1535px) | `1280px` flat | `min(90vw, 1600px)` |
| Large Desktop (≥1536px) | `1280px` flat | `min(88vw, 1920px)` |

**Floating Header** (`wireframe-handoff.md` §2.1) yang sebelumnya eksplisit menyebut `max-width: 1280px` — ganti referensinya ke `--canvas-width`, bukan angka flat lagi.

## Dampak ke Split Section (patch ke `10_case_study_layout.md` §2, §4, §5)

Section Cerita Awal, Approach, dan Fitur-fitur (40% teks / 60% visual) **rasio splitnya tidak berubah** — yang berubah adalah container yang dipakai jadi acuan persentase itu (`--canvas-width` baru, bukan 1280px lama). Efeknya otomatis: kolom visual (60%) jadi proporsional lebih besar mengikuti lebar layar sungguhan.

### Opsional — Asymmetric Bleed untuk Large Desktop (≥1536px)
Untuk section Approach & Fitur-fitur (bukan Header atau Research Gap, yang memang didesain center/flush tanpa visual), kolom visual boleh "bocor" melebihi batas kanan `--canvas-width` mendekati tepi viewport:
```css
/* hanya di breakpoint Large Desktop, hanya pada kolom visual */
margin-right: -5vw;
```
Kolom teks tetap terkunci dalam `--text-measure` supaya kenyamanan baca tidak ikut terganggu. Efeknya: layar lebar terasa penuh terpakai tanpa mengorbankan keterbacaan teks. Ini teknik editorial umum (image bleed, text column tetap sempit) — bukan wajib diimplementasikan sekarang, tapi direkomendasikan kalau mau efek "penuh" yang lebih terasa.

## Standar Container Visual — Aspect Ratio & Frame (addendum ke `design-system.md` §3)

Belum ada spesifikasi eksplisit soal ukuran/framing visual slot sebelumnya — ini menyebabkan potensi ukuran box visual tidak konsisten antar section begitu diisi konten asli. Tambahkan:

```
--ratio-media: 3 / 2;   /* default untuk semua visual slot (before/after,
                           screenshot fitur, diagram editorial) */
```
Kalau ada kasus khusus yang butuh rasio lain (misal mockup ponsel vertikal), rasio itu harus dikunci eksplisit per instance saat implementasi — bukan otomatis mengikuti ukuran asli gambar yang diupload, supaya layout tidak "goyang" tiap section.

**Frame treatment** — berlaku ke semua visual slot container, terlepas dari isi gambar/video di dalamnya (dummy maupun final):
- Border `1px solid var(--border)` (bukan warna baru)
- Radius kecil, konsisten dengan radius lain di situs (bukan radius besar ala app-card)
- Shadow maksimal `--shadow-sm` (sesuai aturan §2.4 dipakai minimal — ini BUKAN pengecualian dari aturan itu, cuma penerapan eksplisit ke satu jenis elemen)

Tambahan catatan untuk Anti-Patterns (`design-system.md` §4): frame tipis ini **bukan** termasuk "card/bento box dengan border+shadow tebal" yang dilarang — border 1px + shadow-sm minimal masih sejalan dengan prinsip minimalis, bukan kontradiksi terhadap aturan no-card.

## Yang TIDAK berubah
- Rasio split 40/60 tetap sama.
- Layout mobile/tablet portrait (stacked: visual atas, teks bawah) tetap sama persis, tidak ada perubahan.
- Breakpoint list di `wireframe-handoff.md` §1 tetap sama — patch ini hanya mengubah nilai `max-width` yang direferensikan, bukan titik breakpoint-nya.
- Design tokens warna, tipografi, spacing (`design-system.md` §2) tidak berubah.
