# Arah Desain Undangan Digital — Sagara & Raka

## Tiga Pendekatan Awal

### Pendekatan 1 — Tidebound Editorial
**Very Brief Intro:** Coastal editorial yang tenang, memakai indigo senja, pasir hangat, dan garis ombak sebagai identitas visual pasangan. Nuansanya intim, sinematik, dan terasa seperti halaman majalah perjalanan yang dipersonalisasi.

**Probability:** 0.06

### Pendekatan 2 — Terracotta Ceremony
**Very Brief Intro:** Modern Mediterranean dengan bidang kapur, terracotta, dan bayangan matahari yang membentuk suasana hangat serta meriah tanpa menjadi dekoratif berlebihan. Struktur halaman berangkat dari poster perjalanan dan undangan letterpress.

**Probability:** 0.03

### Pendekatan 3 — Ink Garden
**Very Brief Intro:** Japanese wabi-sabi yang lebih hening, dengan kertas putih tulang, tinta arang, aksen moss, dan motif botani yang digambar seperti sketsa tangan. Fokusnya pada jeda, ritual, dan detail kecil.

**Probability:** 0.08

## Arah yang Dipilih — Tidebound Editorial

### Design Movement
Contemporary coastal editorialism: perpaduan fotografi blue-hour, prinsip Swiss editorial yang asimetris, dan materialitas undangan letterpress. Desain tidak memakai layout kartu seragam; setiap section terasa seperti spread majalah yang memiliki ritme sendiri.

### Core Principles
1. **Horizon sebagai struktur:** Garis horizontal tipis, blok warna, dan pembagian ruang mengingatkan pada batas laut dan langit.
2. **Asimetri yang terukur:** Teks, foto, dan metadata ditempatkan sedikit menyimpang dari sumbu tengah agar terasa dikurasi, bukan otomatis.
3. **Material yang terasa:** Tekstur kertas, grain halus, garis tinta, dan warna dengan sedikit patina menggantikan gradient dan ornamen berlebihan.
4. **Romantis tanpa filler:** Copy menyebut detail waktu, tempat, dan perjalanan pasangan secara spesifik; hangat tetapi tidak memakai kalimat generik.

### Color Philosophy
Indigo senja (#13283D) menjadi ruang hening dan warna dasar yang memberi kedalaman pada foto. Bone (#F2EDE3) menjaga halaman tetap ringan seperti kertas undangan, sementara pasir (#D7C7B2) memberi kehangatan taktil. Aksen karat matahari (#B86E4B) dipakai sedikit untuk menandai CTA, tanggal, dan momen interaktif. Warna signature brand adalah **Tide Ink**, indigo gelap yang terasa seperti tinta yang baru kering di atas kertas krem.

### Layout Paradigm
Halaman memakai alur editorial vertikal dengan dua kolom yang sesekali pecah menjadi satu kolom penuh. Hero membagi ruang antara headline besar dan foto, cerita memakai rail metadata vertikal, detail acara memakai timeline horizontal yang berubah menjadi stack di mobile, dan galeri memakai masonry dengan ritme portrait-landscape-tall crop. Sticky mobile navigation menjadi indeks ringkas, bukan hamburger menu.

### Signature Elements
- **Tide line:** garis ombak satu tarikan, kadang sebagai divider, kadang sebagai underline nama section.
- **Sun mark:** emblem berupa lengkung matahari yang bersinggungan dengan garis laut dan bintang kecil.
- **Field notes:** label uppercase kecil dengan tracking lebar, nomor section, dan koordinat fiktif bergaya catatan perjalanan.

### Interaction Philosophy
Interaksi harus terasa seperti membuka amplop dan menelusuri album, bukan mengoperasikan dashboard. Tombol menggunakan perubahan warna dan sedikit pergeseran, bukan efek glow. Reveal saat scroll membantu mata membaca urutan editorial. Lightbox menjaga foto sebagai fokus utama dan tidak menambahkan dekorasi yang menghalangi.

### Animation
Cover membuka dengan slide-up 720ms menggunakan cubic-bezier yang lembut; konten di bawahnya tidak dapat disentuh sebelum transisi selesai. Header muncul dengan fade dan translateY ringan, lalu bottom navigation mobile naik setelahnya. Section reveal memakai opacity dan translateY 20px dengan stagger 50ms; foto memakai scale awal 0.98, bukan scale dari nol. Lightbox masuk dengan fade 180ms dan foto bergeser tipis. Hover galeri hanya memakai zoom 1.025. Semua animasi non-esensial dimatikan melalui `prefers-reduced-motion: reduce`.

### Typography System
Display memakai **Cormorant Garamond** 500–600 untuk nama pasangan, headline, dan angka countdown; karakternya editorial dan romantis tanpa terasa ornamental. Body memakai **DM Sans** 400–600 untuk keterbacaan antarmuka, form, nav, dan metadata. Label kecil memakai DM Sans 700 dengan letter-spacing 0.16em. Hierarki: H1 clamp(3.8rem, 9vw, 8.5rem), H2 clamp(2.5rem, 6vw, 5.25rem), body 1rem–1.125rem dengan line-height 1.7, label 0.68rem–0.75rem.

### Brand Essence
**Posisi:** Undangan pernikahan editorial untuk pasangan yang ingin membagikan hari besarnya dengan tenang, personal, dan seindah perjalanan menuju ke sana.

**Kepribadian:** intimate, considered, cinematic.

### Brand Voice
Headline berbicara singkat dan puitis, CTA terdengar seperti ajakan personal, dan microcopy selalu spesifik terhadap konteks. Hindari kata-kata promosi dan filler.

Contoh headline: “Satu horizon, dua langkah pulang.”

Contoh CTA: “Temui kami di tepi cerita ini.”

### Wordmark & Logo
Wordmark menggunakan pasangan nama dalam Cormorant Garamond dengan ampersand kecil sebagai pengikat visual, tetapi identitas utamanya adalah emblem tanpa teks: garis matahari yang memotong satu lengkung pasang-surut dengan bintang empat titik di titik temu. Emblem dipakai di cover, header, footer, dan favicon agar tetap terbaca saat diperkecil.

### Signature Brand Color
**Tide Ink — #13283D.** Indigo biru gelap yang meminjam kedalaman laut setelah matahari turun; cukup khas untuk menjadi penanda brand dan cukup netral untuk menopang foto serta teks panjang.

## Keputusan Implementasi

- Data pasangan, tanggal, lokasi, pembayaran, dan asset URLs diletakkan di satu objek konfigurasi terpusat.
- RSVP dan guestbook berjalan frontend-only menggunakan state serta localStorage; UI akan menjelaskan bahwa data belum dikirim ke server.
- Galeri memakai enam item unik: tiga aset generatif utama dan tiga crop/asset editorial tambahan yang tidak menduplikasi hero.
- Google Calendar dibentuk sebagai URL event nyata menggunakan timezone Asia/Jakarta.
- Musik latar memakai URL konfigurasi yang mudah diganti; jika asset kosong atau playback ditolak browser, kontrol musik tetap tersedia dengan status yang jelas.
- Semua file komponen dan stylesheet akan diberi komentar pengingat arah Tidebound Editorial di bagian atasnya.
