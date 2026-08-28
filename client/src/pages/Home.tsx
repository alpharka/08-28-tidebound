// Tidebound Editorial reminder: this page is an asymmetric coastal editorial spread, not a generic card template.
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown,
  Clipboard, ExternalLink, Heart, MapPin, Music2, Pause, Play, Send,
  Sparkles, X, ZoomIn,
} from "lucide-react";
import { weddingConfig, GalleryItem } from "@/lib/weddingConfig";

const navItems = [
  { label: "Cerita", href: "#cerita" },
  { label: "Acara", href: "#acara" },
  { label: "Galeri", href: "#galeri" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Tanda kasih", href: "#kasih" },
];

function guestName() {
  const raw = new URLSearchParams(window.location.search).get("to");
  return raw?.trim().replace(/\s+/g, " ").slice(0, 72) || "Tamu undangan";
}

function calendarUrl() {
  const start = "20261114T083000Z";
  const end = "20261114T140000Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Pernikahan Sagara & Raka",
    dates: `${start}/${end}`,
    details: "Akad dan resepsi Sagara & Raka. Sampai jumpa di tepi cerita kami.",
    location: weddingConfig.event.address,
    ctz: "Asia/Jakarta",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(target).getTime() - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, new Date(target).getTime() - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(value);
      else {
        const input = document.createElement("textarea");
        input.value = value; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove();
      }
      setCopied(true); window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };
  return <button className="copy-button" type="button" onClick={copy}><span>{copied ? "Tersalin" : label}</span>{copied ? <Check size={14} /> : <Clipboard size={14} />}</button>;
}

export default function Home() {
  useReveal();
  const guest = useMemo(guestName, []);
  const countdown = useCountdown(weddingConfig.event.dateISO);
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [rsvp, setRsvp] = useState({ name: "", attendance: "Hadir", message: "" });
  const [rsvpError, setRsvpError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<Array<{ name: string; attendance: string; message: string }>>([]);

  useEffect(() => {
    try { setMessages(JSON.parse(localStorage.getItem("sagara-raka-guestbook") || "[]")); } catch { setMessages([]); }
  }, []);
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % weddingConfig.assets.gallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + weddingConfig.assets.gallery.length) % weddingConfig.assets.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const openInvitation = async () => {
    setOpened(true);
    if (audioRef.current && weddingConfig.musicUrl) {
      audioRef.current.volume = 0.25;
      try { await audioRef.current.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); }
    }
  };
  const toggleMusic = async () => {
    if (!audioRef.current || !weddingConfig.musicUrl) return;
    if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false); }
    else { try { await audioRef.current.play(); setMusicPlaying(true); } catch { setMusicPlaying(false); } }
  };
  const submitRsvp = (event: FormEvent) => {
    event.preventDefault();
    if (!rsvp.name.trim() || !rsvp.message.trim()) { setRsvpError("Nama dan pesan ucapan perlu diisi terlebih dahulu."); setSubmitted(false); return; }
    const next = [...messages, { name: rsvp.name.trim(), attendance: rsvp.attendance, message: rsvp.message.trim() }];
    setMessages(next); localStorage.setItem("sagara-raka-guestbook", JSON.stringify(next));
    setRsvpError(""); setSubmitted(true); setRsvp({ name: "", attendance: "Hadir", message: "" });
  };

  return (
    <div className={`invitation-shell ${opened ? "is-open" : "is-closed"}`}>
      <audio ref={audioRef} src={weddingConfig.musicUrl || undefined} loop aria-hidden="true" />
      <section className="cover" aria-label="Sampul undangan">
        <div className="cover-image" style={{ backgroundImage: `url(${weddingConfig.assets.hero})` }} />
        <div className="cover-shade" />
        <div className="cover-content">
          <img className="emblem emblem-light" src={weddingConfig.assets.emblem} alt="Emblem Sagara dan Raka" />
          <p className="eyebrow light">A small ceremony by the sea</p>
          <h1>Sagara <i>&</i> Raka</h1>
          <p className="cover-date">14 · 11 · 2026</p>
          <div className="guest-line"><span>Untuk</span><strong>{guest}</strong></div>
          <button className="open-button" type="button" onClick={openInvitation}>Buka undangan <ArrowDownRight size={18} /></button>
        </div>
        <p className="cover-foot">Tidebound / Sanur, Bali</p>
      </section>

      <header className="site-header">
        <a className="brand-lockup" href="#atas" aria-label="Kembali ke atas"><img src={weddingConfig.assets.emblem} alt="" /><span>S / R</span></a>
        <nav>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <span className="header-date">14.11.26</span>
      </header>

      <main id="atas">
        <section className="hero-section section-frame">
          <div className="hero-copy reveal"><p className="eyebrow">01 / A note from the shoreline</p><h2>Satu horizon,<br /><em>dua langkah pulang.</em></h2><p className="hero-lede">Dengan hangat, kami mengundang {guest} untuk hadir di hari ketika dua perjalanan memilih arah yang sama.</p><a className="text-link" href="#cerita">Baca cerita kami <ArrowRight size={16} /></a></div>
          <div className="hero-photo reveal"><img src={weddingConfig.assets.hero} alt="Sagara dan Raka berdiri di tepi laut" /><span className="photo-note">Sanur / 08.24 PM</span></div>
          <div className="hero-stamp">SR<br /><span>est. 2019</span></div>
        </section>

        <section id="cerita" className="story-section section-frame">
          <div className="section-marker reveal"><span>02</span><span className="marker-line" /><span>OUR STORY</span></div>
          <div className="story-layout"><div className="story-title reveal"><p className="eyebrow">A tide brought us here</p><h2>Yang dimulai<br /><em>dari sebuah jeda.</em></h2></div><div className="story-copy reveal"><p>Kami bertemu di sore yang tidak direncanakan—di antara kopi yang terlalu pahit dan obrolan tentang tempat-tempat yang belum pernah kami datangi.</p><p>Sejak itu, kami belajar bahwa pulang bukan selalu tentang alamat. Kadang, ia adalah seseorang yang membuat perjalanan terasa lebih pelan, lebih jujur, dan layak dirayakan.</p><div className="signature">Sagara <span>×</span> Raka</div></div></div>
          <div className="story-rule"><span>—</span><span>the long way home</span><span>—</span></div>
        </section>

        <section id="acara" className="event-section section-frame dark-section">
          <div className="event-intro reveal"><p className="eyebrow light">03 / Save the date</p><h2>Hari yang kami<br /><em>tunggu bersama.</em></h2><p>{weddingConfig.event.dateLabel}<br />Sanur, Bali</p><a className="outline-button" href={calendarUrl()} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Simpan ke kalender</a></div>
          <div className="event-details"><div className="event-item reveal"><span className="event-number">01</span><div><p className="eyebrow light">Akad nikah</p><h3>{weddingConfig.event.akadTime}</h3><p>{weddingConfig.event.akadVenue}<br />Kediaman keluarga</p></div></div><div className="event-item reveal"><span className="event-number">02</span><div><p className="eyebrow light">Resepsi</p><h3>{weddingConfig.event.receptionTime}</h3><p>{weddingConfig.event.receptionVenue}<br />{weddingConfig.event.address}</p><a className="text-link warm" href={weddingConfig.event.mapsUrl} target="_blank" rel="noreferrer">Lihat lokasi <ExternalLink size={15} /></a></div></div></div>
          <div className="countdown reveal"><p className="eyebrow light">Counting the quiet days</p><div className="countdown-row">{Object.entries(countdown).map(([unit, value]) => <div key={unit}><strong>{String(value).padStart(2, "0")}</strong><span>{unit === "days" ? "hari" : unit === "hours" ? "jam" : unit === "minutes" ? "menit" : "detik"}</span></div>)}</div></div>
        </section>

        <section id="galeri" className="gallery-section section-frame"><div className="gallery-heading reveal"><div><p className="eyebrow">04 / In frames</p><h2>Beberapa jeda<br /><em>yang kami simpan.</em></h2></div><p>Enam fragmen dari perjalanan kecil kami menuju hari ini.</p></div><div className="gallery-grid">{weddingConfig.assets.gallery.map((item: GalleryItem, index) => <button key={item.caption} className={`gallery-item gallery-${index + 1} reveal`} type="button" onClick={() => setLightboxIndex(index)} aria-label={`Lihat ${item.caption}`}><img src={item.src} alt={item.alt} /><span className="gallery-overlay"><ZoomIn size={18} /><small>{item.caption}</small></span></button>)}</div></section>

        <section id="rsvp" className="rsvp-section section-frame"><div className="rsvp-aside reveal"><p className="eyebrow">05 / Be our guest</p><h2>Hadirmu adalah<br /><em>tanda paling hangat.</em></h2><p>Mohon titipkan kabar sebelum 1 November 2026 agar kami dapat menyiapkan tempat untukmu.</p></div><form className="rsvp-form reveal" onSubmit={submitRsvp}><label>Nama lengkap<input value={rsvp.name} onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })} placeholder="Namamu" /></label><fieldset><legend>Konfirmasi kehadiran</legend><label className="radio-option"><input type="radio" name="attendance" value="Hadir" checked={rsvp.attendance === "Hadir"} onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })} /><span>Saya akan hadir</span></label><label className="radio-option"><input type="radio" name="attendance" value="Belum bisa memastikan" checked={rsvp.attendance === "Belum bisa memastikan"} onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })} /><span>Belum bisa memastikan</span></label><label className="radio-option"><input type="radio" name="attendance" value="Tidak dapat hadir" checked={rsvp.attendance === "Tidak dapat hadir"} onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })} /><span>Tidak dapat hadir</span></label></fieldset><label>Pesan ucapan<textarea value={rsvp.message} onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })} placeholder="Tuliskan doa baikmu di sini..." rows={4} /></label>{rsvpError && <p className="form-error">{rsvpError}</p>}{submitted && <p className="form-success"><Check size={16} /> Terima kasih, kabarmu sudah tercatat di perangkat ini.</p>}<button className="primary-button" type="submit">Kirim konfirmasi <Send size={15} /></button><p className="form-note">RSVP tersimpan sementara di browser ini dan belum terkirim ke server.</p></form></section>

        <section className="guestbook-section section-frame"><div className="guestbook-heading"><p className="eyebrow">Notes from our people</p><h2>Doa yang tinggal<br /><em>di antara halaman.</em></h2></div><div className="guestbook-list">{messages.length === 0 ? <div className="empty-state"><Sparkles size={20} /><p>Pesan ucapanmu akan muncul di sini setelah dikirim.</p></div> : messages.map((message, index) => <article className="guest-message" key={`${message.name}-${index}`}><div><strong>{message.name}</strong><span>{message.attendance}</span></div><p>“{message.message}”</p></article>)}</div></section>

        <section id="kasih" className="gift-section dark-section"><div className="gift-inner section-frame"><div className="gift-copy reveal"><p className="eyebrow light">06 / With gratitude</p><h2>Tanda kasih,<br /><em>jika berkenan.</em></h2><p>Kehadiranmu adalah hadiah yang paling kami nantikan. Jika ingin mengirimkan tanda kasih, dapat melalui detail berikut.</p></div><div className="gift-details reveal"><div className="qr-placeholder"><img src={`https://quickchart.io/qr?text=${encodeURIComponent(`${weddingConfig.payment.ewalletProvider} ${weddingConfig.payment.ewalletNumber} a.n. ${weddingConfig.payment.recipient}`)}&size=220`} alt={`QR code ${weddingConfig.payment.ewalletProvider} untuk ${weddingConfig.payment.recipient}`} /><small>QR DANA</small></div><div className="gift-row"><div><span className="eyebrow light">{weddingConfig.payment.ewalletProvider}</span><strong>{weddingConfig.payment.ewalletNumber}</strong><small>a.n. {weddingConfig.payment.recipient}</small></div><CopyButton value={weddingConfig.payment.ewalletNumber} label="Salin nomor" /></div><div className="gift-row"><div><span className="eyebrow light">{weddingConfig.payment.bank}</span><strong>{weddingConfig.payment.accountNumber}</strong><small>a.n. {weddingConfig.payment.accountHolder}</small></div><CopyButton value={weddingConfig.payment.accountNumber} label="Salin nomor" /></div><a className="text-link warm" href={weddingConfig.payment.paymentLink} target="_blank" rel="noreferrer">Buka link pembayaran <ExternalLink size={15} /></a></div></div></section>
      </main>

      <footer className="site-footer"><img src={weddingConfig.assets.emblem} alt="" /><p>Sagara <i>&</i> Raka</p><span>With love, always.</span></footer>
      <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Jeda musik" : "Putar musik"} disabled={!weddingConfig.musicUrl}><span className={musicPlaying ? "music-bars playing" : "music-bars"}><i /><i /><i /></span>{musicPlaying ? <Pause size={15} /> : <Music2 size={15} />}</button>
      <nav className="mobile-nav" aria-label="Navigasi utama di bagian bawah">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightboxIndex(null)}><button className="lightbox-close" type="button" aria-label="Tutup galeri" onClick={() => setLightboxIndex(null)}><X /></button><button className="lightbox-prev" type="button" aria-label="Foto sebelumnya" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + weddingConfig.assets.gallery.length) % weddingConfig.assets.gallery.length); }}><ArrowLeft /></button><figure onClick={(e) => e.stopPropagation()}><img src={weddingConfig.assets.gallery[lightboxIndex].src} alt={weddingConfig.assets.gallery[lightboxIndex].alt} /><figcaption>{weddingConfig.assets.gallery[lightboxIndex].caption}</figcaption></figure><button className="lightbox-next" type="button" aria-label="Foto berikutnya" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % weddingConfig.assets.gallery.length); }}><ArrowRight /></button></div>}
    </div>
  );
}
