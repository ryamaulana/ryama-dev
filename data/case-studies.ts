export interface VisualSlot {
  position: "left" | "right" | "skip";
  text: string;
  video?: string;
  image?: string;
}

export interface CaseStudySection {
  title: string;
  text: string;
  visualSlot?: VisualSlot;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroVideo?: string;
  ceritaAwal: CaseStudySection;
  celah: CaseStudySection;
  approach: CaseStudySection;
  features: CaseStudySection[];
  overallImpact?: CaseStudySection;
  techStack: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "asset-lifespan-prediction": {
    slug: "asset-lifespan-prediction",
    title: "Predictive Maintenance",
    subtitle: "Predict Asset Lifespan Before Failure Occurs",
    heroVideo: "/case-studies/smart maintenance/Hero.mp4",
    ceritaAwal: {
      title: "Menanti Kerusakan dalam Kegelapan Informasi",
      text: "Pemeliharaan gedung selama ini jalan secara buta — mesin cuma diperbaiki sesuai jadwal kalender, bukan kondisi fisiknya, jadi AC atau genset sering mati mendadak tanpa peringatan. Keluhan penghuni pun masuk sebagai pesan acak yang bikin admin kewalahan cari lokasi masalahnya.",
      visualSlot: { position: "skip", text: "tidak ada visual natural, biarkan blok teks dengan whitespace lebih lega" }
    },
    celah: {
      title: "Mendengar Keluhan, Membaca Tanda Kerusakan",
      text: "Kebanyakan sistem pemeliharaan baru gerak setelah rusak, dan sistem pelaporan otomatis sering nggak ngerti bahasa gaul pelapor. Padahal keluhan orang biasa itu nyimpen info lokasi yang berharga — sayang banget kalau kebuang."
    },
    approach: {
      title: "Membangun Kepercayaan Melalui Gerbang Pengaman Lokasi",
      text: "Laporan masuk lewat dua jalur: bahasa gaul diselaraskan jadi bahasa standar, sambil ngejagain penyebutan lantai atau gedung biar nggak ke-hapus. Kalau sistem kurang yakin sama lokasinya, laporan ditahan dulu sebagai draft buat dicek manual — bukan langsung ditugaskan.",
      visualSlot: {
        position: "left",
        text: "diagram editorial minimalis yang menunjukkan alur keluhan suara/teks dikonversi menjadi laporan terstruktur dan dihubungkan ke kalkulator sisa umur pakai mesin",
        image: "/case-studies/visual slots/smart-maintenance-approach.png"
      }
    },
    features: [
      {
        title: "Menerjemahkan Suara dan Ketikan Menjadi Laporan Rapi",
        text: "Warga cukup ngirim pesan teks atau suara kayak ngobrol biasa, nggak perlu isi formulir ribet. Sistem otomatis mecah keluhan itu jadi info penting — barang, gedung, lantai, area, departemen, tingkat kedaruratan — dengan ketepatan sampai 100% buat lantai dan 99,5% buat gedung.",
        visualSlot: { position: "right", text: "screenshot tampilan antarmuka halaman laporan tempat pengguna mengirim pesan suara dan melihat hasil pengenalan lokasi secara instan", video: "/case-studies/smart maintenance/FeatureVoiceReport.mp4" }
      },
      {
        title: "Membaca Sisa Umur Pakai Mesin Sebelum Terlambat",
        text: "Kalkulator ini mantau seberapa sering mesin rusak, biaya yang keluar, dan usia pakainya buat nebak sisa umur mesin sebelum bener-bener harus diganti. Dari 961 unit yang diuji, selisih prediksinya cuma sekitar 262 hari dari waktu kerusakan aslinya.",
        visualSlot: { position: "left", text: "screenshot halaman dashboard detail mesin yang menampilkan sisa hari pakai aman dan grafik penurunan fungsi mesin", video: "/case-studies/smart maintenance/FeatureRulCalculator.mp4" }
      }
    ],
    techStack: [
      "Next.js 16.2.6 (React 19.2.4, TypeScript)",
      "Tailwind CSS v4",
      "Lucide React 1.16.0",
      "Recharts 3.8.1",
      "NextAuth 4.24.14",
      "Prisma ORM 6.19.3",
      "Python 3.11.9",
      "FastAPI 0.111.0",
      "Uvicorn 0.30.1",
      "Pydantic 2.7.4",
      "Scikit-Learn 1.8.0",
      "XGBoost 3.2.0",
      "Pandas 2.3.3",
      "NumPy 2.4.4",
      "category_encoders",
      "Sastrawi",
      "Openpyxl 3.1.5",
      "Joblib 1.5.3",
      "faster-whisper (Whisper-medium / Whisper Large-v3)",
      "MLflow 3.11.1 (dengan database mlflow.db)"
    ]
  },
  "complaint-ticket-analysis": {
    slug: "complaint-ticket-analysis",
    title: "Interview Assessment System",
    subtitle: "Menilai kelayakan kandidat secara objektif dengan memadukan pendengar otomatis dan mata pengawas cerdas.",
    heroVideo: "/case-studies/interview assessment system/HeroInterview.mp4",
    ceritaAwal: {
      title: "Menemukan Jarum di Tengah Gunung Video Wawancara",
      text: "Membaca puluhan rekaman wawancara satu per satu itu melelahkan buat tim perekrut — butuh berhari-hari, dan penilaiannya sering nggak konsisten karena capek. Saya pengen bikin proses seleksi ini lebih cepat and adil, tanpa detail penting yang kelewat.",
      visualSlot: {
        position: "right",
        text: "tangkapan layar halaman ringkasan utama yang menunjukkan rangkuman hasil wawancara kandidat",
        image: "/case-studies/visual slots/interview-cerita-awal.png"
      }
    },
    celah: {
      title: "Membaca Momen Ragu Tanpa Menghakimi",
      text: "Kebanyakan sistem pengawasan langsung menghukum begitu ada gerakan mencurigakan — padahal itu bisa aja cuma kandidat lagi mikir keras. Saya bikin sistem yang menandai momen itu buat diverifikasi manual, bukan langsung memvonis."
    },
    approach: {
      title: "Menyeimbangkan Ketegasan Pengawasan dengan Kenyamanan Kandidat",
      text: "Sistemnya jalan diam-diam di balik layar — begitu wawancara mulai, ada penyetelan singkat buat kenalin posisi duduk alami tiap kandidat. Tantangan paling berat? Nyaring suara berisik sekitar biar nggak ketuker sama suara orang lain yang mungkin lagi bisikin jawaban.",
      visualSlot: {
        position: "left",
        text: "perbandingan visual sebelum dan sesudah proses penyetelan posisi alami kandidat dilakukan untuk menunjukkan toleransi gerakan kepala",
        image: "/case-studies/visual slots/interview-approach.png"
      }
    },
    features: [
      {
        title: "Mata Digital yang Adil dan Penuh Toleransi",
        text: "Pernah kepikiran gimana bedain kandidat yang lagi mikir keras sama yang lagi curang? Fitur ini ngecek arah pandangan mata dan jumlah orang di ruangan — kalau ada yang aneh, waktunya langsung dicatat buat dicek ulang perekrut.",
        visualSlot: { position: "right", text: "tangkapan layar antarmuka pengawasan yang mendeteksi arah pandangan mata kandidat", video: "/case-studies/interview assessment system/FeatureGazeDetection.mp4" }
      },
      {
        title: "Pendengar Setia yang Memisahkan Suara Kandidat dari Suara Sekitar",
        text: "Rekaman wawancara diubah jadi teks rapi otomatis, dengan ketepatan sampai 97%. Suara kandidat juga dipisah dari suara luar, jadi perekrut tahu pasti siapa yang benar-benar ngomong.",
        visualSlot: { position: "left", text: "tampilan catatan ucapan lengkap dengan penanda pembicara secara rapi", video: "/case-studies/interview assessment system/FeatureTranscript.mp4" }
      },
      {
        title: "Penilai Pintar yang Objektif dan Bebas Bias",
        text: "Semua jawaban kandidat dibaca dan dibandingkan sama standar kelayakan yang udah disiapkan. Dalam hitungan detik, keluar skor plus alasannya — murni dari isi jawaban, bebas dari bias manusia.",
        visualSlot: { position: "right", text: "tangkapan layar panel penilaian otomatis yang menampilkan skor akhir and alasan penilaian", video: "/case-studies/interview assessment system/FeatureScoring.mp4" }
      }
    ],
    overallImpact: {
      title: "Proses Seleksi yang Makin Cepat, Akurat, dan Bebas Bias",
      text: "Dengan menggabungkan pengawasan visual yang fleksibel dan penilaian jawaban tertulis yang tajam, sistem ini mampu menyaring kandidat terbaik dengan efisiensi tinggi. Perekrut kini tidak perlu lagi menghabiskan waktu berjam-jam untuk setiap kandidat, melainkan cukup meninjau hasil rangkuman otomatis yang sudah terbukti akurat dan objektif."
    },
    techStack: [
      "FastAPI",
      "Uvicorn",
      "PyTorch",
      "Google GenAI SDK",
      "MediaPipe FaceMesh",
      "Ultralytics YOLOv8-pose",
      "Faster-Whisper",
      "PyAnnote Audio",
      "OpenCV (cv2)",
      "NumPy",
      "SoundFile",
      "PyYAML",
      "Python-dotenv"
    ]
  },
  "asset-condition-monitoring": {
    slug: "asset-condition-monitoring",
    title: "Mail Reader",
    subtitle: "Read Less. Respond Smarter. Prevents Missed Opportunities.",
    heroVideo: "/case-studies/mail reader/HeroMailReader.mp4",
    ceritaAwal: {
      title: "Kolaborasi Nyata Memodernisasi Sekolah",
      text: "Proyek ini lahir dari kebutuhan nyata sekolah menengah yang mau modernisasi administrasinya — tiap hari ada puluhan surat dinas fisik yang harus dibaca dan diinput manual satu per satu. Proses ini bertele-tele dan makan banyak waktu staf yang harusnya bisa dipakai buat hal lain.",
      visualSlot: {
        position: "right",
        text: "Mockup antarmuka pemindai surat saat mengunggah tumpukan surat fisik untuk langsung diubah menjadi arsip digital",
        image: "/case-studies/visual slots/mail-reader-cerita-awal.png"
      }
    },
    celah: {
      title: "Mengapa Arsip Digital Saja Tidak Cukup",
      text: "Kebanyakan sistem arsip cuma jadi tempat penyimpanan pasif — staf tetap harus ngetik ulang semua data surat manual. Yang mereka butuh bukan sekadar mindahin kertas ke komputer, tapi asisten yang beneran bisa baca dan ngisi datanya sendiri."
    },
    approach: {
      title: "Menjinakkan Kaku dan Formalnya Bahasa Dinas",
      text: "Aplikasi ini punya dua jalur kerja: cek instan lembar per lembar, atau proses tumpukan dokumen sekaligus di background biar kerja nggak keganggu. Tantangan terbesarnya? Ngajarin sistem paham bahasa surat dinas yang kaku, terus nerjemahin ke draf balasan yang sopan tanpa perlu ngetik manual.",
      visualSlot: {
        position: "left",
        text: "Screenshot perbandingan before-after antara berkas surat fisik yang berantakan dengan hasil ringkasan data yang rapi dan terstruktur dalam tabel digital",
        image: "/case-studies/visual slots/mail-reader-approach.png"
      }
    },
    features: [
      {
        title: "Mengekstrak Data Penting dari Lembaran Surat Tanpa Mengetik Ulang",
        text: "Staf tinggal upload foto surat masuk, sistem otomatis nangkep nomor surat, tanggal, pengirim, sampai perihal ke formulir yang rapi. Ada panel pratinjau dokumen asli di sebelahnya, jadi gampang dicocokin dan disunting sebelum disimpan.",
        visualSlot: { position: "right", text: "Screenshot antarmuka verifikasi surat tunggal dengan panel pratinjau dokumen asli di sebelahnya", video: "/case-studies/mail reader/FeatureExtraction.mp4" }
      },
      {
        title: "Menulis Saran Jawaban Resmi yang Siap Salin",
        text: "Begitu surat selesai dibaca, asisten langsung nyusun draf balasan resmi sesuai maksud surat — mau itu undangan rapat atau permohonan berkas. Staf tinggal salin, nggak perlu mikirin kalimat pembuka atau penutup lagi.",
        visualSlot: { position: "left", text: "Tampilan kartu 'Saran Balasan' yang menonjolkan teks draf jawaban resmi hasil rancangan sistem", video: "/case-studies/mail reader/FeatureReplyDraft.mp4" }
      },
      {
        title: "Konfigurator Kop Surat dan Dokumen Dinas A4 Siap Cetak",
        text: "Cukup isi formulir di kiri layar, lembar surat dinas A4 lengkap kop sekolah langsung muncul rapi di kanan — siap cetak presisi tanpa terpotong atau bolong.",
        visualSlot: { position: "right", text: "Tampilan editor surat dinas A4 dengan pratinjau kop surat resmi sekolah", video: "/case-studies/mail reader/FeatureLetterhead.mp4" }
      }
    ],
    overallImpact: {
      title: "Mengubah Ruang Kerja Tata Usaha Menjadi Serba Modern",
      text: "Secara keseluruhan, sistem ini mengubah ruang tata usaha dari yang awalnya sibuk dengan kertas menjadi alur kerja yang serba cepat dan modern. Staf kini memiliki kontrol penuh atas setiap surat masuk dan keluar secara lebih teratur tanpa harus membaca dan mengetik manual satu per satu."
    },
    techStack: [
      "Next.js (React)",
      "FastAPI (Python)",
      "PostgreSQL",
      "Prisma ORM",
      "PaddleOCR",
      "PyMuPDF",
      "Groq Cloud API (Llama 3)",
      "Zustand",
      "React Query",
      "TailwindCSS",
      "SheetJS (XLSX)",
      "SweetAlert2"
    ]
  }
};
