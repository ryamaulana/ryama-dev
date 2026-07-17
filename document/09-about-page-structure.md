# About Page — Structure & Content Prompt

## Konteks
Halaman `/about` dibangun dari nol (bukan lanjutan draft bento-grid sebelumnya — itu dibuang). Scroll biasa (normal document flow), TIDAK pakai snap-scroll per-slide. Nada penulisan: campuran personal/cerita dan profesional/ringkas — bukan resume formal, tapi juga bukan curhat santai.

**Prinsip posisi:** halaman ini dilihat dari sudut pandang recruiter/klien yang baru selesai liat 3 project di homepage dan lanjut klik "Get to know me". Yang mereka cari (dalam urutan mental, bukan berarti section harus identik urutan ini): siapa orangnya & fokus kerjanya apa → bukti pernah kerja beneran (bukan cuma personal project) → cara berpikirnya gimana (ini pembeda) → skill teknis (quick scan) → cara menghubungi.

**Referensi gaya (pola, bukan konten):** robin-noguier.com/about — bukan resume formal, tapi personal statement + bukti eksternal/kolaborasi + penutup personal. Jangan tiru layout atau kalimatnya, ambil pola pendekatannya saja: jual karakter & cara berpikir, bukan cuma daftar skill.

## Struktur Section (urutan default, dari atas ke bawah)

### 1. Pembuka
- Nama + satu-dua kalimat identitas kerja (AI Engineer, fokus predictive systems, Jakarta)
- LANGSUNG, tidak perlu judul besar formal seperti "ABOUT RYAMA"
- Tipografi: nama besar solid (hierarki utama section ini), identitas kerja di bawahnya lebih kecil, sans-serif untuk keterbacaan

### 2. Cerita personal singkat
- Kenapa masuk ke AI/predictive systems — ditulis sebagai cerita personal, bukan bio formal
- 2-4 kalimat, nada personal/reflektif (boleh kalimat pertama "saya...")
- Ini section yang paling "cerita", sisanya boleh lebih ringkas/profesional

### 3. Bukti kolaborasi
- Konteks penting: PNJ (Politeknik Negeri Jakarta) pakai kurikulum Project-Based Learning — project kuliah itu masalah nyata yang diajukan client asli (PT NTG mengusulkan project Exigen Smart Maintenance), BUKAN tugas fiktif/tutorial. Framing section ini: "terbiasa nangani masalah bisnis riil sejak kuliah", bukan "riwayat kerja formal di perusahaan X".
- Selipkan juga capstone Dicoding (Asah led by Dicoding x Accenture) yang juga pakai masalah nyata, sama seperti project PBL — dan sempat menang Best Capstone Project (Jan 2026). Jangan bikin section "Awards" terpisah yang formal — cukup jadi kalimat natural dalam narasi (bukan badge/lencana).
- Dibingkai sebagai narasi pengalaman kerja nyata (via jalur akademis yang project-based), BUKAN tabel akademis kaku (hindari format "Institution | Degree | Year" yang terasa seperti CV)
- Boleh disusun sebagai narasi singkat atau kartu ringkas, tapi tetap terasa manusiawi bukan tabel HR
- Status pendidikan masih aktif (PNJ Sep 2023–Present, belum lulus) — boleh dibingkai jujur & positif: "masih kuliah, tapi udah punya track record project nyata" sebagai poin inisiatif, bukan disamarkan seolah sudah lulus

### 4. Filosofi kerja (4 pilar)
- Local First, Problem-Driven, Research ↔ Product, Predict Don't React
- Ini section paling membedakan dari portfolio kebanyakan orang — taruh di posisi cukup menonjol, jangan disembunyikan di bawah sebagai section kecil
- Tipografi: tiap pilar bisa punya nomor besar (01-04) sebagai elemen visual, konsisten sama gaya numbering yang sudah dipakai di bagian lain situs

### 5. Tech stack tags
- Quick-scan section — visual LEBIH KECIL/RINGAN dibanding section lain (bukan section utama yang berat)
- Kategori tag boleh dikelompokkan (AI/ML, Web & API, dst) tapi tetap ringkas, bukan daftar panjang detail

### 6. Kontak/penutup
- Personal, direct — bukan cuma baris ikon sosial media polos
- Boleh ada sentuhan personal kecil (contoh pola dari referensi: cara dia menutup dengan gaya khas personal) — sesuaikan dengan gaya kamu sendiri, jangan dicontek dari referensi

## Yang HARUS dihindari
- Format tabel CV/resume formal (Institution | Degree | Year style) — sudah dibuang dari draft bento sebelumnya, jangan dipakai lagi
- Snap-scroll per-slide — halaman ini scroll biasa
- Section tech stack jadi terlalu dominan/besar — ini section pendukung, bukan section utama
- Ghost/ambient text tetap boleh dipakai sebagai tekstur di background (konsisten sama prinsip desain situs), tapi jangan sampai mengganggu keterbacaan section bukti kolaborasi/filosofi yang perlu jelas terbaca

## Catatan tambahan
- Warna aksen di halaman ini TIDAK terikat ke project manapun (beda dari homepage yang aksennya ikut project aktif) — dot status kontak menggunakan warna charcoal `#1A1A1A` / `text` (tanpa warna coral residual), sesuai keputusan skema warna yang disepakati (coral retired total).
- Layout detail per-section (kolom, breakpoint, dst) belum ditentukan di prompt ini — fokus prompt ini ke urutan & isi konten dulu. Layout visual akan dibahas terpisah setelah konten section ini disetujui.
