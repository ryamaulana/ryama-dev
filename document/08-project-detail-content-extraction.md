# Project Detail Page — Content Extraction Prompt (v2)

## Konteks
Halaman `/projects/[slug]` saat ini masih pakai data statis/placeholder di `lib/projects.ts`. Tujuan prompt ini: isi konten detail case study **untuk project yang sedang dibuka di workspace/editor ini saja** — dengan cara menggali dari source code yang benar-benar ada di repo ini, bukan mengarang.

**PENTING — SCOPE:** Prompt ini dijalankan satu repo dalam satu waktu. Jangan mencoba mengakses atau mereferensikan repo project lain (misal kalau sedang buka `exigen-smart-maintenance`, jangan sentuh/asumsikan isi `Interview-Assesment-System` atau `santara-mail-api`). Fokus 100% ke codebase yang sedang terbuka di window ini. Kalau butuh tahu project ini "yang mana" di `lib/projects.ts` (repo ryama-dev terpisah), cukup cocokkan berdasarkan nama/slug — jangan buka repo lain untuk itu.

> **Catatan terpisah (bukan bagian prompt ini):** field `caseStudyUrl` di `lib/projects.ts` saat ini masih mengarah ke link GitHub eksternal. Setelah halaman `/projects/[slug]` ini siap dipakai, `caseStudyUrl` per project perlu diganti ke path internal (`/projects/[slug]`) — ini task terpisah di `Header.tsx`/`projects.ts`, bukan bagian dari extraction ini.

## ATURAN BAHASA — WAJIB, INI YANG PALING PENTING
Yang baca halaman ini adalah **recruiter atau calon klien**, BUKAN developer lain. Referensi tone: robin-noguier.com/project/ueno — semua ditulis sebagai **cerita**, bukan dokumentasi teknis. Judul section itu sendiri harus menjual value, bukan label proses (contoh gaya Robin: "Redesigning Uber.com, a new home for Uber" — bukan "Approach: React + Node.js").

Aturan konkret:
- **DILARANG** pakai istilah teknis di body text: nama framework, nama library, istilah seperti "API", "endpoint", "database", "model", "algoritma", "backend", "query", dsb — SEMUA istilah ini HANYA boleh muncul di section Tech Stack paling akhir.
- Setiap fitur/keputusan teknis harus diterjemahkan ke **manfaat yang dirasakan orang**. Contoh: bukan "menggunakan model klasifikasi untuk prediksi kerusakan mesin", tapi "tahu mesin mana yang butuh perhatian sebelum benar-benar rusak, bukan setelah kejadian."
- Judul tiap bagian/fitur ditulis seperti headline artikel/majalah — menarik, personal, story-driven. Bukan "Feature 1: Predictive Model" tapi semacam "Melihat Kerusakan Sebelum Terjadi."
- Nada tulisan personal dan reflektif, seolah bercerita ke seseorang — boleh pakai kalimat pertama ("saya membangun...", "tantangan terbesarnya adalah...") seperti gaya Robin, bukan nada laporan formal pihak ketiga.
- JANGAN pakai label section eksplisit seperti "Problem:", "Approach:", "Impact:" di output final — itu cuma kerangka berpikir internal, bukan yang ditampilkan ke pembaca. Tulis sebagai narasi mengalir dengan judul yang catchy.
- Kalimat pendek-pendek, jangan bertele-tele. Robin style: to the point tapi tetap terasa manusiawi, bukan seperti press release korporat.

## ATURAN UTAMA — JANGAN HALU
- SEMUA konten (Problem, Approach, Feature, Impact) HARUS ditarik dari sumber nyata: **source code langsung** (routes, services, models, business logic), commit history, komentar kode, struktur folder, dependencies di package.json/requirements.txt. README TIDAK dipakai sebagai sumber utama (lihat bagian "Sumber" di bawah).
- Kalau suatu bagian (misal angka impact/metrik) TIDAK ADA di source manapun, JANGAN dikarang. Tulis placeholder eksplisit: `[NEEDS INPUT: metrik belum ditemukan di README/kode]` — biar gampang di-fill manual nanti.
- Jangan menambahkan klaim teknis (akurasi model, performa, dsb) yang tidak tertulis atau tidak bisa diverifikasi dari kode.
- Kalau README repo minim, gali dari nama variabel, docstring, struktur endpoint, nama file test, komentar kode — itu semua sumber sah, tapi tetap harus ada jejaknya di kode, bukan asumsi.

## Sumber yang harus dicek per project

**JANGAN pakai README sebagai sumber utama** — README di repo ini masih berantakan/belum rapi, jadi berisiko jadi bahan halu kalau dipercaya mentah-mentah. Fokus gali langsung dari source code **di repo yang sedang terbuka ini saja**:

1. **Source code langsung** — file-file utama (routes/endpoints, service/controller, model definition, business logic) — ini sumber PALING valid, karena kode nggak bisa bohong soal apa yang benar-benar dijalankan
2. Struktur folder & nama file (kasih clue soal fitur: nama endpoint, nama komponen, nama service, nama function)
3. Komentar kode & docstring (kalau ada) — hanya yang menjelaskan "kenapa", bukan komentar generik
4. package.json / requirements.txt — khusus untuk konfirmasi tech stack di section akhir, bukan untuk narasi
5. Commit messages (kalau ada akses git log) — bisa kasih clue soal challenge/keputusan yang diambil selama development
6. Kalau ada akses ke `lib/projects.ts` (repo ryama-dev) sebagai referensi cepat nama/slug/value-prop yang sudah ada — boleh dicek untuk pencocokan, tapi bukan untuk digali kontennya lebih dalam

README boleh dilirik sekilas HANYA untuk konteks nama/tujuan project secara umum (bukan untuk detail problem/approach/impact), dan tetap harus divalidasi silang dengan kode aslinya sebelum dipakai.

## Struktur Konten yang Harus Diisi (per project)

Label di bawah ini ("Konteks/Cerita Awal", "Bagaimana Saya Mendekatinya", dst) adalah **kerangka berpikir internal untuk agent** — bukan judul yang muncul di output final. Di output, semua ini jadi narasi mengalir dengan judul catchy ala headline (lihat contoh format di bawah).

Urutan alur, TIDAK termasuk role/year/client. Visual DIBAHAS eksplisit di tiap section (lihat sub-bagian "Visual" masing-masing) — gambar aslinya tetap diisi manual oleh user, tapi draft `.md` harus menandai DI MANA slot visual itu seharusnya berada dan jenis visual apa yang cocok, memakai marker `[VISUAL SLOT: <posisi> — <jenis/deskripsi singkat>]`.

### 1. Pembuka (Header)
- Nama project (sudah ada di `lib/projects.ts`, jangan diubah)
- Value proposition satu kalimat (sudah ada, jangan diubah kecuali diminta)
- **Visual:** tidak ada slot di sini — header murni teks (nama + value prop), sesuai prinsip typography-first di pembuka halaman.

### 2. Cerita Awal (internal label: Problem)
- 2-4 kalimat: masalah/pain point apa yang melatarbelakangi project ini, ditulis sebagai cerita bukan pernyataan masalah formal
- Ambil dari source code/struktur project (lihat bagian Sumber) — apa yang jelas-jelas coba diselesaikan lewat kode yang ada
- Kalau tidak jelas dari kode, tandai: `[NEEDS INPUT: konteks masalah tidak jelas dari source code]`
- Konteks tambahan (kalau relevan ke project ini): project-project Arya berasal dari masalah nyata yang diajukan client asli (via kurikulum Project-Based Learning PNJ atau capstone program Dicoding/Asah), BUKAN latihan/tutorial buatan sendiri. Kalau natural, boleh diselipkan sebagai kalimat pembuka yang menegaskan ini masalah bisnis riil — tapi JANGAN dipaksakan kalau nggak natural untuk project tertentu, dan jangan sebut nama institusi/program secara eksplisit di sini (itu bukan bagian dari cerita produk, cukup tersirat lewat nada "masalah nyata yang dihadapi").
- **Visual:** `[VISUAL SLOT: kiri/kanan — screenshot atau mockup produk jadi yang menunjukkan konteks masalah/situasi sebelum solusi ada]`. Kalau tidak ada visual natural untuk konteks awal, boleh skip slot ini sepenuhnya — jangan dipaksakan.

### 3. Celah yang Saya Lihat (internal label: Research Gap)
- Ini bagian yang menunjukkan kenapa project ini *worth dibuat* — apa yang biasanya dilakukan orang/cara lama/pendekatan umum, dan kenapa itu masih kurang
- Framing: bukan "riset akademis", tapi observasi personal — seolah menceritakan insight yang bikin kamu tergerak bikin ini. Contoh gaya: "Kebanyakan sistem yang saya lihat baru bertindak SETELAH masalah terjadi. Saya pikir, kenapa nggak dari awal?"
- Ambil dari source code: cari clue soal apa yang secara sengaja DIHINDARI atau DIPERBAIKI di pendekatan ini (misal ada validasi ekstra, ada langkah yang biasanya dilewatkan orang lain, ada penanganan edge-case yang menunjukkan sadar akan kelemahan pendekatan umum)
- **Kalau tidak ada clue jelas soal ini di kode, JANGAN cuma tulis placeholder generik.** Tulis 1-2 pertanyaan pancingan spesifik yang bisa dijawab manual oleh Arya, dalam format:
  `[NEEDS INPUT — jawab salah satu atau lebih: "Apa yang kamu sengaja hindari waktu bikin [nama project] ini, yang biasanya orang lain nggak kepikiran?" / "Pendekatan umum yang biasa dipakai orang untuk masalah ini apa, dan kenapa kamu nggak ikut itu?"]`
  Pertanyaannya boleh disesuaikan konteks project, tapi harus konkret dan spesifik ke project itu — bukan pertanyaan generik yang bisa dipakai untuk project manapun.
- Section ini yang paling penting untuk kesan "value" ke recruiter/klien — ini yang bikin project terasa punya pemikiran, bukan sekadar eksekusi tutorial
- **Visual:** biasanya TIDAK butuh visual — section ini lebih kuat sebagai pull-quote teks (serif, ukuran lebih besar dari body biasa) daripada disandingkan gambar. Default: tidak ada slot visual di sini kecuali ada bukti konkret berupa perbandingan (lihat section Approach untuk pola serupa).

### 4. Bagaimana Saya Mendekatinya (internal label: Approach)
- Cerita singkat soal keputusan besar yang diambil dan kenapa — ditulis dari sudut pandang manfaat/hasil, BUKAN nama teknologi
- Tantangan/trade-off boleh disebut, tapi dibahasakan sebagai cerita ("bagian tersulitnya adalah...") bukan istilah teknis
- Ambil dari: struktur kode yang menunjukkan pola keputusan (misal kenapa dipecah jadi beberapa bagian, kenapa ada validasi tertentu, dsb) — tapi diterjemahkan ke bahasa awam
- **Visual — bagian ini butuh perhatian khusus** karena section ini bicara soal *proses berpikir*, bukan hasil akhir, jadi screenshot UI biasa sering kurang pas. Pilih SALAH SATU jenis berikut yang paling relevan dengan project, dan tulis sebagai marker eksplisit:
  - `[VISUAL SLOT: kiri/kanan — before/after atau perbandingan yang membuktikan pendekatan ini beneran menyelesaikan masalah]`
  - `[VISUAL SLOT: kiri/kanan — screenshot momen edge-case/kondisi sulit yang berhasil ditangani (bukan tampilan biasa), sebagai bukti keputusan approach ini kepake]`
  - `[VISUAL SLOT: kiri/kanan — diagram editorial sederhana (gaya minimalis, bukan diagram teknis box-and-arrow), HANYA jika alurnya butuh divisualisasikan untuk orang awam]`
  - Kalau tidak ada satupun yang natural untuk project ini: `[VISUAL SLOT: skip — tidak ada visual natural, biarkan blok teks dengan whitespace lebih lega]`
  Agent harus memilih salah satu opsi ini berdasarkan apa yang paling didukung bukti dari kode — jangan asal pilih "diagram" kalau kodenya sebenarnya lebih cocok didukung dengan bukti before/after.

### 5. Fitur-fitur (internal label: Feature Blocks, ulangi 2-3x)
Untuk tiap fitur, kerangka internalnya:
- **What I Built** — fitur ini melakukan apa, dari sudut pandang orang yang memakainya
- **Why** — kenapa fitur ini penting/dibutuhkan
- **Impact** — dampak konkret dari fitur ini bagi penggunanya. Kalau ada bukti dari kode (misal hasil test, angka di komentar), pakai itu. Kalau tidak ada, tandai `[NEEDS INPUT: dampak fitur ini belum terukur]`

Di output, ketiga poin ini digabung jadi satu paragraf/narasi pendek dengan judul menarik — BUKAN tiga bullet berlabel.

Cara identifikasi fitur: lihat struktur route/endpoint utama atau nama komponen besar di source code.

- **Visual:** `[VISUAL SLOT: kiri/kanan — screenshot produk yang menunjukkan fitur ini secara langsung]`. Posisi kiri/kanan sebaiknya bergantian antar fitur (fitur 1 = kanan, fitur 2 = kiri, dst) supaya ritme halaman tidak monoton.

### 6. Penutup/Dampak Keseluruhan (internal label: Overall Impact, opsional)
- Isi HANYA jika ada dampak level-project yang tidak spesifik ke satu fitur. Kalau tidak ada, skip sepenuhnya — jangan dipaksakan.
- **Visual:** tidak ada slot — section ini murni penutup teks singkat, kalau ada.

### 7. Tech Stack
- Daftar singkat, ambil murni dari package.json/requirements.txt/dependencies
- Ini SATU-SATUNYA tempat istilah teknis boleh muncul apa adanya
- Format list sederhana, tanpa narasi
- **Visual:** tidak ada slot — ini footnote murni teks/list, terpisah visual dari konten utama.

## Yang TIDAK perlu diisi
- Role, Year, Client — skip semua

## Output Format

Output HARUS berupa file `.md` terpisah per project (bukan langsung ditulis ke `lib/projects.ts` atau file data lain). Simpan sebagai draft mentah dulu untuk direview manual sebelum dipakai di kode.

Nama file: `project-detail-draft-[slug].md`

Format tiap file — CATATAN: judul-judul di bawah ini contoh gaya, agent harus buat judul sendiri yang sesuai isi project, bukan dicontek persis. Marker `[VISUAL SLOT: ...]` ditulis di baris sendiri, tepat setelah paragraf section terkait:

```markdown
# [Nama Project]
[Value proposition satu kalimat]

## [Judul catchy untuk konteks/cerita awal — bukan "Problem"]
[Narasi 2-4 kalimat, bahasa awam, cerita bukan laporan]
[VISUAL SLOT: kiri/kanan/skip — deskripsi singkat]

## [Judul catchy untuk celah/insight — bukan "Research Gap"]
[Narasi personal soal apa yang biasanya kurang di pendekatan umum, dan kenapa itu jadi dorongan bikin project ini]
[NEEDS INPUT — jika perlu, tulis pertanyaan pancingan di sini]

## [Judul catchy untuk pendekatan — bukan "Approach"]
[Narasi soal keputusan besar & tantangan, bahasa awam]
[VISUAL SLOT: kiri/kanan/skip — before-after / edge-case / diagram editorial / skip]

## [Judul catchy untuk fitur 1]
[Paragraf narasi menggabungkan what/why/impact fitur ini, bahasa awam]
[VISUAL SLOT: kanan — screenshot fitur ini]

## [Judul catchy untuk fitur 2]
[Paragraf narasi menggabungkan what/why/impact fitur ini, bahasa awam]
[VISUAL SLOT: kiri — screenshot fitur ini]

## [Judul catchy penutup — hanya jika ada overall impact]
[Narasi singkat]

---
### Tech Stack
- ...
- ...

---
## ⚠️ Needs Manual Input (internal, hapus sebelum publish)
[daftar semua field yang ditandai NEEDS INPUT, dikumpulkan di sini biar gampang di-scan]
```
