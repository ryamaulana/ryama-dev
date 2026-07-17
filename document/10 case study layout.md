# Case Study Page — Layout Prompt

## Konteks
Halaman `/projects/[slug]` — layout dibangun dari nol, sebagai pasangan dari prompt `08-project-detail-content-extraction.md` (yang isi kontennya). Prompt ini fokus ke STRUKTUR VISUAL, bukan konten. Referensi gaya: robin-noguier.com/project — editorial, minimalis, imagery sebagai bukti bukan dekorasi.

## Scroll Behavior
**Hybrid**: normal document scroll (bukan GSAP scroll-scrub/pin seperti homepage), ditambah entrance animation ringan (fade/slide) tiap section masuk viewport. Ini beda dari homepage yang scroll-driven penuh, tapi juga beda dari About page yang scroll polos tanpa animasi sama sekali.

## Navigasi
- **TIDAK ADA** link "← Back to projects" (konsep lama di `user-flow-ia.md` dan `wireframe-handoff.md` §4 sudah tidak berlaku).
- Reuse komponen header global yang sama dengan homepage: logo RYAMA sticky/floating, klik → `/`.

## Struktur Section

### 1. Header
- **Tinggi:** full viewport (setara Hero homepage) — landing statement, murni tipografi, TANPA imagery.
- **Alignment:** flush-left (bukan center).
- **Isi & urutan:** eyebrow (small caps, sans, `accentColor`) → nama project (serif Playfair Display, `accentColor`) → underline tipis `accentColor` sebagai divider → value proposition (satu kalimat, sans, `text-muted`).
- **Kenapa accentColor di sini:** section ini tidak punya visual slot, jadi warna project jadi satu-satunya focal point.

### 2. Cerita Awal
- Judul catchy (serif, **neutral charcoal** — lihat prinsip warna di bawah).
- Narasi: ~3 kalimat pendek, plainspoken, ukuran sedikit lebih besar dari body biasa (gaya "lede" editorial) — beri bobot transisi setelah Header yang dramatis, sekaligus menahan dorongan nulis kepanjangan.
- Visual slot (opsional, sesuai prompt 08): kanan.
- **Split desktop:** 40% teks / 60% visual.
- **Mobile:** visual di atas, teks di bawah.

### 3. Celah yang Saya Lihat (Research Gap)
- Judul catchy (serif, neutral charcoal).
- Body: pull-quote, serif, **lebih besar dari body**, **center-aligned**.
- Warna: **neutral charcoal/text-muted** — BUKAN accentColor. Section ini sengaja jadi jeda tenang di antara section berwarna, bukan sorotan.
- **Tanpa** tanda kutip dekoratif — murni tipografi.
- **Tanpa visual.** Kolom sempit, terpusat (baik desktop maupun mobile — tidak ada split untuk di-collapse di sini).

### 4. Bagaimana Saya Mendekatinya (Approach)
- Judul catchy (serif, neutral charcoal).
- Narasi: ukuran body normal (BUKAN lede-size, itu eksklusif Cerita Awal).
- Visual slot: pilih salah satu — before/after, edge-case screenshot, diagram editorial, atau skip — sesuai bukti dari kode (lihat prompt 08 §4). Posisi kiri/kanan sesuai konten.
- **Split desktop:** 40% teks / 60% visual (sama seperti Cerita Awal).
- **Mobile:** visual di atas, teks di bawah.

### 5. Fitur-fitur (2-3x, ulangi per fitur)
- Judul catchy per fitur (serif, neutral charcoal).
- Narasi: body normal, menggabungkan what/why/impact jadi satu paragraf mengalir.
- Visual slot: screenshot fitur, posisi **gantian kiri-kanan antar fitur** (fitur 1 = kanan, fitur 2 = kiri, dst) untuk ritme scroll.
- **Split desktop:** 40% teks / 60% visual.
- **Mobile:** visual di atas, teks di bawah.

### 6. Penutup (opsional)
- Isi HANYA jika ada overall impact level-project yang tidak spesifik ke satu fitur. Kalau tidak ada, skip total.
- Judul serif (kalau section ini ada) + narasi singkat. Tanpa visual.

### 7. Tech Stack (footnote)
- Full width, dipisah jauh dari konten utama dengan border-top tipis.
- Tag: outline tipis, tanpa fill, dikelompokkan per kategori — styling sama persis dengan Tech Stack di About page.
- **Satu-satunya tempat** istilah teknis (nama framework, library, dsb) boleh muncul apa adanya.

## Prinsip Warna & Focal Point per Section
| Section | Warna title/body | Alasan |
|---|---|---|
| Header | `accentColor` | Tidak ada visual — warna project jadi focal point |
| Cerita Awal | Neutral charcoal | Visual (kanan) adalah focal point |
| Celah yang Saya Lihat | Neutral charcoal/text-muted | Jeda tenang, bukan sorotan, meski tanpa visual |
| Approach | Neutral charcoal | Visual adalah focal point |
| Fitur-fitur | Neutral charcoal | Visual adalah focal point |
| Tech Stack | Neutral | Konsisten sama About page |

## Responsive — Mobile/Portrait
Semua section split (Cerita Awal, Approach, Fitur) collapse jadi stacked: **visual di atas, teks di bawah**. Ini berlaku site-wide (termasuk homepage project showcase), menggantikan dokumentasi lama di `prd.md` §2.1 dan `wireframe-handoff.md` §2.3 yang menyebut "teks atas, mockup bawah" — dokumen itu perlu direvisi menyesuaikan.

Header dan Research Gap tetap satu kolom penuh di semua breakpoint (tidak ada split untuk di-collapse).

## Catatan Implementasi
- Semua judul section pakai font serif (Playfair Display) sesuai aturan global situs — termasuk yang warnanya neutral charcoal, cuma warnanya yang beda, bukan fontnya.
- Custom cursor, GSAP untuk entrance animation, Framer Motion untuk hover — sesuai pembagian library yang sudah baku di `prd.md`.
- Tidak ada ghost/ambient text di section manapun (prinsip situs, sudah dihapus total).