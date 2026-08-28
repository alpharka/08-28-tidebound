# How to Customize Website Undangan Sagara & Raka

Panduan ini menjelaskan cara mengganti isi, aset, tema, dan perilaku website undangan digital tanpa perlu mengubah struktur aplikasi secara besar. Website menggunakan React + TypeScript dan dirancang sebagai single-page invitation dengan konfigurasi utama yang terpusat.

> **Prinsip utama:** mulai dari mengganti konfigurasi di `client/src/lib/weddingConfig.ts`, kemudian ganti aset visual dan copy di `client/src/pages/Home.tsx` hanya jika kebutuhan konten Anda memang berubah.

## Struktur File Penting

| File | Fungsi | Kapan perlu diedit |
|---|---|---|
| `client/src/lib/weddingConfig.ts` | Data pasangan, acara, pembayaran, musik, dan URL gambar | Hampir setiap personalisasi undangan |
| `client/src/pages/Home.tsx` | Struktur section, copy, interaksi RSVP, lightbox, countdown, dan navigasi | Saat mengubah susunan atau perilaku halaman |
| `client/src/index.css` | Warna, font, layout, responsive breakpoint, dan animasi | Saat mengubah identitas visual atau spacing |
| `client/index.html` | Judul, deskripsi, bahasa halaman, dan theme color | Saat mengganti metadata browser |
| `ideas.md` | Arah desain Tidebound Editorial dan keputusan visual | Sebagai referensi sebelum perubahan desain |
| `todo.md` | Checklist pekerjaan dan revisi | Saat menambahkan pekerjaan baru |

## 1. Mengganti Data Pasangan dan Acara

Buka `client/src/lib/weddingConfig.ts`. Semua nilai personal utama berada di dalam objek `weddingConfig`, sehingga tidak perlu mencari data yang tersebar di banyak komponen.

```ts
export const weddingConfig = {
  couple: {
    name: "Nama Mempelai 1 & Nama Mempelai 2",
    bride: "Nama lengkap mempelai 1",
    groom: "Nama lengkap mempelai 2",
    nicknames: "Panggilan 1 & Panggilan 2",
    parents: "Nama orang tua kedua mempelai",
  },
  event: {
    dateLabel: "Sabtu, 14 November 2026",
    dateISO: "2026-11-14T15:30:00+07:00",
    akadTime: "15.30 WIB",
    receptionTime: "18.30–21.00 WIB",
    akadVenue: "Nama lokasi akad",
    receptionVenue: "Nama lokasi resepsi",
    address: "Alamat lengkap acara",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
  },
};
```

`dateISO` harus menggunakan format tanggal ISO lengkap dengan offset zona waktu. Nilai tersebut dipakai oleh countdown. Jika tanggal diganti, periksa kembali label tanggal yang tampil agar keduanya tetap konsisten.

Untuk Google Calendar, fungsi `calendarUrl()` di `Home.tsx` berisi waktu mulai dan selesai dalam format event. Saat mengganti tanggal atau jam, perbarui nilai `start` dan `end` di fungsi tersebut agar tombol **Simpan ke kalender** tetap menunjuk pada waktu yang benar.

## 2. Mengubah Nama Tamu dari URL

Nama tamu dibaca dari parameter URL `to`. Contoh penggunaan:

```text
https://sagaraweddin-zhy7w7ac.manus.space/?to=Keluarga%20Budi%20Santoso
```

Jika parameter tidak tersedia, website menampilkan `Tamu undangan`. Nilai tersebut dirapikan, dibatasi panjangnya, dan dimasukkan ke halaman sebagai teks biasa. Karena itu, gunakan URL encoding untuk spasi dan karakter khusus.

Untuk menguji variasi nama, coba tiga kondisi berikut:

| URL | Hasil yang diharapkan |
|---|---|
| `/` | `Tamu undangan` |
| `/?to=Keluarga%20Budi%20Santoso` | `Keluarga Budi Santoso` |
| `/?to=%20Nama%20Dengan%20Spasi%20` | Spasi awal dan akhir dibersihkan |

## 3. Mengganti Foto dan Emblem

Asset website tidak disimpan sebagai file besar di `client/public`. URL asset berada di bagian `assets` dalam konfigurasi.

```ts
assets: {
  hero: "/manus-storage/nama-hero.jpg",
  emblem: "/manus-storage/nama-emblem.png",
  gallery: [
    {
      src: "/manus-storage/foto-01.jpg",
      alt: "Deskripsi foto yang bermakna",
      caption: "01 / Judul singkat",
    },
  ],
}
```

Sediakan minimal enam item galeri unik. Setiap item harus memiliki `src`, `alt`, dan `caption`. `alt` ditulis sebagai deskripsi singkat yang membantu pengguna screen reader memahami isi foto; jangan mengulang caption tanpa konteks.

Untuk asset baru, simpan file asli di `/home/ubuntu/webdev-static-assets/`, kemudian upload memakai workflow asset proyek. Gunakan URL storage yang dikembalikan pada konfigurasi, bukan path lokal sandbox. Hero dan emblem sebaiknya memiliki kontras yang sesuai dengan teks overlay.

## 4. Mengganti Musik Latar

Ubah `musicUrl` pada `weddingConfig`:

```ts
musicUrl: "https://alamat-asset-musik-anda/instrumental.mp3",
```

Gunakan musik instrumental yang Anda miliki atau memiliki lisensi penggunaan yang sesuai. Pemutaran dimulai setelah pengguna menekan **Buka undangan**, karena browser dapat membatasi autoplay sebelum interaksi pengguna. Jika URL dikosongkan, tombol musik menjadi nonaktif.

Volume awal berada di sekitar 25% melalui `audioRef.current.volume = 0.25`. Bila perlu, ubah angka tersebut dengan hati-hati agar musik tidak mengganggu pembacaan isi undangan.

## 5. Mengganti Warna dan Tipografi

Arah visual saat ini adalah **Tidebound Editorial**. Token utama berada di awal `client/src/index.css`:

| Token | Nilai saat ini | Peran |
|---|---|---|
| `--ink` | `#13283D` | Tide Ink, warna utama dan section gelap |
| `--bone` | `#F2EDE3` | Latar seperti kertas undangan |
| `--sand` | `#D7C7B2` | Nuansa material dan penyeimbang |
| `--rust` | `#B86E4B` | Aksen CTA, tanggal, dan indikator aktif |
| `--ink-soft` | `#25465C` | Teks pendukung pada latar terang |

Font dimuat dari Google Fonts di `index.css`: **Cormorant Garamond** untuk display dan **DM Sans** untuk body/interface. Jika ingin mengganti font, ubah import font dan seluruh deklarasi `font-family` terkait secara bersamaan agar hierarki tetap konsisten.

Jangan menghapus aturan `prefers-reduced-motion`. Pengguna yang meminta motion lebih sedikit tetap harus mendapatkan konten dan interaksi yang berfungsi tanpa animasi non-esensial. Media query tersebut juga mematikan scroll halus dan reveal agar pengalaman lebih nyaman.[1] [2]

## 6. Mengubah Copy atau Susunan Section

Struktur section utama berada di `Home.tsx` dengan urutan berikut:

| ID | Section | Isi utama |
|---|---|---|
| `atas` | Hero | Headline pembuka dan foto utama |
| `cerita` | Cerita | Narasi perjalanan pasangan |
| `acara` | Detail acara | Akad, resepsi, lokasi, calendar, countdown |
| `galeri` | Galeri | Foto pre-wedding dan lightbox |
| `rsvp` | RSVP | Form konfirmasi dan pesan ucapan |
| `kasih` | Tanda kasih | QR e-wallet dan detail rekening |

Jika menambah section baru yang ingin muncul di navigasi, tambahkan object pada array `navItems`, berikan `id` yang sama pada section, dan masukkan ID tersebut ke daftar observer section aktif. Pastikan label pendek agar bottom navigation tetap nyaman pada layar sekitar 320 px.

## 7. RSVP dan Guestbook

Website ini adalah frontend-only. Ketika pengguna mengirim RSVP, data ditampilkan pada guestbook dan disimpan sementara di `localStorage` browser dengan key `sagara-raka-guestbook`. Data tersebut tidak otomatis terkirim kepada pasangan dan dapat hilang ketika storage browser dibersihkan.

Validasi saat ini mewajibkan nama dan pesan ucapan. Status kehadiran tersedia dalam tiga pilihan: hadir, belum bisa memastikan, dan tidak dapat hadir. Untuk penggunaan nyata dengan banyak tamu, ganti penyimpanan lokal dengan backend atau layanan form yang Anda kontrol; jangan menambahkan data tamu buatan sebagai isi awal guestbook.

Jika ingin menghapus data RSVP lokal saat pengujian, jalankan perintah berikut di Console browser pada domain undangan:

```js
localStorage.removeItem("sagara-raka-guestbook")
```

## 8. Mengganti Data Tanda Kasih

Ubah objek `payment` di `weddingConfig`:

```ts
payment: {
  ewalletProvider: "DANA",
  ewalletNumber: "Nomor e-wallet",
  recipient: "Nama penerima",
  bank: "Nama bank",
  accountNumber: "Nomor rekening",
  accountHolder: "Nama pemilik rekening",
  paymentLink: "https://link-pembayaran-anda",
},
```

QR code dibentuk dari provider, nomor e-wallet, dan nama penerima. Setelah mengubah detail tersebut, periksa QR code dengan aplikasi pembayaran sebelum membagikan URL undangan. Tombol salin menggunakan Clipboard API dengan fallback sederhana ketika API utama tidak tersedia.[3]

## 9. Menjalankan Website Secara Lokal

Dari root repository, install dependency dan jalankan development server:

```bash
pnpm install
pnpm dev
```

Periksa kualitas kode dan production build sebelum menyimpan perubahan:

```bash
pnpm check
pnpm build
```

Jika dependency baru ditambahkan, restart development server setelah instalasi agar konfigurasi baru terbaca dengan benar.

## 10. Checklist Sebelum Membagikan Undangan

| Pemeriksaan | Status yang diharapkan |
|---|---|
| Nama pasangan dan orang tua | Sudah diganti dari placeholder |
| Tanggal, jam, lokasi, dan alamat | Konsisten di semua section |
| Google Maps | Membuka lokasi yang benar di tab baru |
| Google Calendar | Menampilkan judul, waktu, lokasi, dan timezone yang benar |
| Countdown | Mengarah ke tanggal acara yang benar |
| Galeri | Enam foto unik, tidak ada gambar rusak, alt text tersedia |
| RSVP | Validasi kosong menampilkan feedback dan guestbook bertambah setelah submit |
| Pembayaran | Nomor, penerima, bank, dan QR sudah diverifikasi |
| Musik | Asset berlisensi, playback dimulai setelah klik, volume nyaman |
| Mobile | Tidak ada overflow horizontal dan bottom navigation tidak menutup konten |
| Reduced motion | Konten tetap tampil ketika motion dikurangi |

## 11. Troubleshooting Singkat

**Foto tidak tampil.** Periksa apakah URL storage dapat dibuka langsung dan pastikan Anda tidak menggunakan path lokal seperti `/home/ubuntu/...` di dalam kode.

**Nama tamu tidak berubah.** Pastikan parameter URL bernama `to` dan spasi telah di-encode sebagai `%20` atau dibuat melalui `URLSearchParams`.

**Musik tidak berbunyi.** Pastikan URL file dapat diakses publik, format file didukung browser, dan playback dicoba setelah menekan tombol pembuka. Browser tetap dapat menolak file yang bermasalah atau server yang tidak mengizinkan akses lintas origin.

**RSVP tampak hilang.** Data saat ini tersimpan per browser dan per domain. Membuka undangan di perangkat lain tidak akan menampilkan data yang sama sampai backend ditambahkan.

**Navigasi tidak melakukan scroll.** Pastikan `href` pada `navItems` sama persis dengan `id` section, misalnya `href: "#galeri"` harus berpasangan dengan `id="galeri"`.

## Referensi

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion — MDN Web Docs, `prefers-reduced-motion`.

[2]: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView — MDN Web Docs, `Element.scrollIntoView()`.

[3]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API — MDN Web Docs, Clipboard API.
