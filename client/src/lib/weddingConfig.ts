// Tidebound Editorial reminder: keep all personal data and brand assets centralized for easy handoff.
export const weddingConfig = {
  couple: {
    name: "Sagara & Raka",
    bride: "Sagara Kirana",
    groom: "Raka Adinata",
    nicknames: "Saga & Raka",
    parents: "Putri & Bima Kirana · Ratih & Dimas Adinata",
  },
  event: {
    dateLabel: "Sabtu, 14 November 2026",
    dateISO: "2026-11-14T15:30:00+07:00",
    akadTime: "15.30 WIB",
    receptionTime: "18.30–21.00 WIB",
    akadVenue: "Rumah Senja",
    receptionVenue: "The Cove, Sanur",
    address: "Jl. Pantai Mertasari No. 18, Sanur, Denpasar",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Cove+Sanur+Bali",
  },
  payment: {
    ewalletProvider: "DANA",
    ewalletNumber: "0812 3456 7890",
    recipient: "Raka Adinata",
    bank: "Bank BCA",
    accountNumber: "1234567890",
    accountHolder: "Raka Adinata",
    paymentLink: "https://link.dana.id/minta/placeholder-sagara-raka",
  },
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  assets: {
    hero: "/manus-storage/sagara-raka-hero_0239e3a6.jpg",
    emblem: "/manus-storage/sagara-raka-emblem_dffe106f.png",
    gallery: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=84", alt: "Sagara dan Raka berjalan di garis pantai saat senja", caption: "01 / Garis air" },
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=84", alt: "Sagara dan Raka duduk memandang laut", caption: "02 / Jeda biru" },
      { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1200&q=84", alt: "Sagara dan Raka di ambang pintu menghadap laut", caption: "03 / Menuju terang" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=84", alt: "Sagara dan Raka berdiri bersama di tepi laut", caption: "04 / Satu horizon" },
      { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84", alt: "Detail momen tenang Sagara dan Raka di pesisir", caption: "05 / Tenang" },
      { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=84", alt: "Sagara dan Raka berbagi langkah di bawah langit biru", caption: "06 / Pulang" },
    ],
  },
} as const;

export type GalleryItem = (typeof weddingConfig.assets.gallery)[number];
