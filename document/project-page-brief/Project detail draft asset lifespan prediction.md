# Predictive Maintenance
Predict Asset Lifespan Before Failure Occurs

## Menanti Kerusakan dalam Kegelapan Informasi
Pemeliharaan gedung selama ini jalan secara buta — mesin cuma diperbaiki sesuai jadwal kalender, bukan kondisi fisiknya, jadi AC atau genset sering mati mendadak tanpa peringatan. Keluhan penghuni pun masuk sebagai pesan acak yang bikin admin kewalahan cari lokasi masalahnya.
[VISUAL SLOT: skip — tidak ada visual natural, biarkan blok teks dengan whitespace lebih lega]

## Mendengar Keluhan, Membaca Tanda Kerusakan
Kebanyakan sistem pemeliharaan baru gerak setelah rusak, dan sistem pelaporan otomatis sering nggak ngerti bahasa gaul pelapor. Padahal keluhan orang biasa itu nyimpen info lokasi yang berharga — sayang banget kalau kebuang.

## Membangun Kepercayaan Melalui Gerbang Pengaman Lokasi
Laporan masuk lewat dua jalur: bahasa gaul diselaraskan jadi bahasa standar, sambil ngejagain penyebutan lantai atau gedung biar nggak ke-hapus. Kalau sistem kurang yakin sama lokasinya, laporan ditahan dulu sebagai draft buat dicek manual — bukan langsung ditugaskan.
[VISUAL SLOT: kiri — diagram editorial minimalis yang menunjukkan alur keluhan suara/teks dikonversi menjadi laporan terstruktur dan dihubungkan ke kalkulator sisa umur pakai mesin]

## Menerjemahkan Suara dan Ketikan Menjadi Laporan Rapi
Warga cukup ngirim pesan teks atau suara kayak ngobrol biasa, nggak perlu isi formulir ribet. Sistem otomatis mecah keluhan itu jadi enam info penting — barang, gedung, lantai, area, departemen, tingkat kedaruratan — dengan ketepatan sampai 100% buat lantai dan 99,5% buat gedung.
[VISUAL SLOT: kanan — screenshot tampilan antarmuka halaman laporan tempat pengguna mengirim pesan suara dan melihat hasil pengenalan lokasi secara instan]

## Membaca Sisa Umur Pakai Mesin Sebelum Terlambat
Kalkulator ini mantau seberapa sering mesin rusak, biaya yang keluar, dan usia pakainya buat nebak sisa umur mesin sebelum bener-bener harus diganti. Dari 961 unit yang diuji, selisih prediksinya cuma sekitar 262 hari dari waktu kerusakan aslinya.
[VISUAL SLOT: kiri — screenshot halaman dashboard detail mesin yang menampilkan sisa hari pakai aman dan grafik penurunan fungsi mesin]

---
### Tech Stack
- **Frontend & App**: Next.js 16.2.6 (React 19.2.4, TypeScript), Tailwind CSS v4, Lucide React 1.16.0, Recharts 3.8.1, NextAuth 4.24.14, Prisma ORM 6.19.3
- **Backend & Core ML**: Python 3.11.9, FastAPI 0.111.0, Uvicorn 0.30.1, Pydantic 2.7.4
- **Libraries ML & NLP**: Scikit-Learn 1.8.0, XGBoost 3.2.0, Pandas 2.3.3, NumPy 2.4.4, category_encoders, Sastrawi, Openpyxl 3.1.5, Joblib 1.5.3
- **Speech-to-Text**: faster-whisper (Whisper-medium / Whisper Large-v3)
- **MLops**: MLflow 3.11.1 (dengan database mlflow.db)

---
## ⚠️ Needs Manual Input (internal, hapus sebelum publish)
- **Overall Impact**: Metrik bisnis level-organisasi (seperti persentase pengurangan downtime nyata atau efisiensi biaya pemeliharaan tahunan PT NTG) belum ditemukan di repositori atau dokumen teknis saat ini. Bagian ini memerlukan masukan data operasional riil dari user untuk melengkapi studi kasus.
- **Pertanyaan Konfirmasi**: "Apakah model Whisper yang digunakan dalam produksi dideploy menggunakan ukuran `medium` (seperti tertulis di `inference.py`) atau `large-v3` (seperti di dokumentasi awal)?"