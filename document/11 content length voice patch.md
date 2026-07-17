# Case Study Content — Revisi Panjang & Nada Tulisan (Patch untuk Prompt 08)

## Kenapa direvisi
Implementasi pertama masih kepanjangan di semua section narasi — bukan cuma Cerita Awal/Research Gap yang sempat dipangkas sebelumnya, tapi Approach dan Fitur-fitur juga kena. Referensi robin-noguier.com/project/fun menunjukkan pola yang jauh lebih ringkas: tiap fitur cuma 1-2 kalimat pendek, bukan paragraf naratif penuh yang menjelaskan proses. Orang jarang baca teks panjang — highlight per fitur aja udah cukup buat menyampaikan value-nya.

## Aturan Baru — Panjang Maksimal per Section
- **Cerita Awal**: maks 2 kalimat pendek (~40-50 kata) — sudah diterapkan sebelumnya, tetap berlaku
- **Research Gap**: 1-2 kalimat pull-quote (~30-40 kata) — sudah diterapkan sebelumnya, tetap berlaku
- **Approach**: maks 2 kalimat (~40-60 kata) — **DIPERKETAT**, sebelumnya bisa sampai 2 paragraf
- **Fitur-fitur**: maks 1-2 kalimat (~15-40 kata) per fitur — **PALING KETAT**, sebelumnya bisa 3-4 kalimat panjang menjelaskan proses

Kalau draft yang dihasilkan melebihi batas ini: potong lagi. Jangan nambah kalimat baru buat "melengkapi" — cari inti value-nya, buang sisanya.

## Nada Tulisan — Interaktif, Bukan Cuma Naratif
Prompt 08 asli mengarahkan nada "personal & reflektif, seolah bercerita." Ini masih benar sebagai prinsip, tapi implementasinya kebablasan jadi narasi proses yang panjang (menjelaskan detail tantangan, langkah demi langkah). Yang perlu ditambahkan: sesekali *berinteraksi* langsung sama pembaca, bukan cuma monolog laporan progres.

Variasikan cara buka tiap fitur:
- Kadang pertanyaan retorik ke pembaca
- Kadang pernyataan value langsung, tanpa proses cerita di baliknya
- Kadang konteks singkat sebelum masuk ke inti

Tetap pertahankan sudut pandang orang pertama ("saya") yang sudah jadi suara situs — tapi jangan semua fitur dibuka dengan pola "Fitur ini melakukan..." yang berulang dan berasa seperti laporan teknis.

## Yang TIDAK berubah
- Bahasa tetap jargon-free (aturan prompt 08 asli)
- Angka/metrik konkret dari kode WAJIB dipertahankan apa adanya — jangan ikut terpotong saat menyingkat kalimat
- Struktur section, urutan, dan visual slot tetap sama (lihat prompt 08 & 10)