import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useState, useRef, useEffect } from "react";
import heroCouple from "@/assets/hero-couple.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.png";
import story4 from "@/assets/story-4.png";
import story5 from "@/assets/story-5.png";
import venue from "@/assets/venue.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { Petals } from "@/components/wedding/Petals";
import { Ornament } from "@/components/wedding/Ornament";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpForm } from "@/components/wedding/RsvpForm";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noah & Emma — 20 February 2027" },
      {
        name: "description",
        content:
          "Together with their families, Noah and Emma request the honour of your presence as they begin their forever. 20 February 2027, St. Mary's Church.",
      },
      { property: "og:title", content: "Noah & Emma — 20 February 2027" },
      {
        property: "og:description",
        content: "Together with their families, Noah and Emma request the honour of your presence as they begin their forever. 20 February 2027, St. Mary's Church.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Wedding,
});

function Wedding() {
  const [showIntro, setShowIntro] = useState(true);
  const [isFaded, setIsFaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setShowIntro(false);
      
      const startAudioOnInteraction = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        }
        window.removeEventListener("click", startAudioOnInteraction);
      };
      window.addEventListener("click", startAudioOnInteraction);
      return () => {
        window.removeEventListener("click", startAudioOnInteraction);
      };
    }
  }, []);

  const handleIntroClick = () => {
    const video = introVideoRef.current;
    const audio = audioRef.current;

    if (!isPlaying) {
      if (video) {
        video.muted = false;
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Play failed, trying muted:", err);
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
          });
        });
      }
      if (audio) {
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
    } else {
      setIsFaded(true);
      setTimeout(() => {
        setShowIntro(false);
      }, 1500);
    }
  };

  const handleVideoEnded = () => {
    setIsFaded(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1500);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        preload="auto"
        muted={isMuted}
      />
      {showIntro && (
        <div
          id="intro-screen"
          onClick={handleIntroClick}
          onTouchStart={(e) => {
            e.preventDefault();
            handleIntroClick();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            cursor: "pointer",
            transition: "opacity 1.5s ease",
            background: "radial-gradient(circle at center, #1b261b 0%, #0d120d 100%)",
            opacity: isFaded ? 0 : 1,
            pointerEvents: isFaded ? "none" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Actual video player container */}
          <div 
            className="relative w-full h-full md:h-[85vh] md:max-w-[480px] md:rounded-sm md:overflow-hidden md:shadow-[0_20px_60px_rgba(0,0,0,0.65)] md:border-4 md:border-double md:border-sand/35 transition-all duration-300"
            style={{
              aspectRatio: "9/16",
            }}
          >
            <video
              id="intro-video"
              ref={introVideoRef}
              src="/intro-video.mp4#t=0.1"
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 1.5s ease",
                transform: isPlaying ? "scale(1)" : "scale(1.02)",
              }}
            />
          </div>
        </div>
      )}
      <Hero />
      <LoveStory />
      <CountdownSection />
      <Schedule />
      <Gallery />
      <Venue />
      <DressCode />
      <RsvpSection />
      <Footer />
      {!showIntro && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-ivory/90 text-primary backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-ivory hover:border-primary/45 shadow-[var(--shadow-soft)] cursor-pointer"
          aria-label={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.2s" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.4s" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.15s" }} />
            </div>
          )}
        </button>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="video-container" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}>
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.42)" }} />
      </div>
      <Petals count={22} />

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
        <p className="animate-fade-up font-sans-ui text-[11px] uppercase tracking-[0.5em] text-ivory/90">
          Together with their families
        </p>
        <h1 className="animate-fade-up mt-8 font-display text-6xl leading-none sm:text-8xl md:text-9xl">
          Noah
          <span className="mx-6 inline-block font-script text-5xl align-middle text-sand sm:text-6xl md:text-7xl">
            &amp;
          </span>
          Emma
        </h1>
        <div className="animate-fade-up mt-8 flex flex-col items-center justify-center select-none" style={{ animationDelay: "0.3s" }}>
          <div className="relative flex flex-col items-center">
            <span className="font-display text-8xl sm:text-9xl text-ivory/95 font-semibold leading-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
              20
            </span>
            <span className="absolute bottom-5 sm:bottom-7 font-script text-5xl sm:text-6xl text-sand drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] whitespace-nowrap">
              February
            </span>
            <span className="mt-4 font-display text-2xl sm:text-3xl tracking-[0.25em] text-ivory/90 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              2027
            </span>
          </div>
        </div>
        <p className="animate-fade-up mt-10 max-w-xl font-body text-lg italic text-ivory/90" style={{ animationDelay: "0.5s" }}>
          request the honour of your presence as they begin their forever.
        </p>
        <a
          href="#rsvp"
          className="animate-fade-up mt-12 inline-flex items-center gap-3 border border-ivory/60 px-10 py-4 font-sans-ui text-[11px] uppercase tracking-[0.4em] text-ivory transition hover:bg-ivory hover:text-primary backdrop-blur-[2px] bg-black/10"
          style={{ animationDelay: "0.7s" }}
        >
          Confirm Attendance
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/70">
        <div className="animate-shimmer flex flex-col items-center gap-2">
          <span className="font-sans-ui text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="h-10 w-px bg-ivory/60" />
        </div>
      </div>
    </section>
  );
}

const storyItems = [
  { year: "2021", title: "Our First Meeting", body: "A quiet café, a shared glance, a conversation that lasted long into the night.", img: story1 },
  { year: "2022", title: "A Beautiful Friendship", body: "Weekend hikes, midnight calls and a hundred small rituals — the foundation of us.", img: story3 },
  { year: "2023", title: "Love Blossomed", body: "Between two cities and a thousand letters, love wrote its own quiet story.", img: story4 },
  { year: "2025", title: "The Proposal", body: "Under candlelight and roses, one question — and one very certain 'yes'.", img: story2 },
  { year: "2027", title: "Forever Begins", body: "The next chapter — surrounded by the ones we love most.", img: story5 },
] as const;

function LoveStory() {
  return (
    <section id="story" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="Our Journey" />
          <h2 className="font-display text-5xl text-primary sm:text-6xl">Our Love Story</h2>
        </div>

        <div className="relative mx-auto mt-20 max-w-4xl">
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-primary/25 md:block" />
          <div className="space-y-16">
            {storyItems.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <article
                  key={item.year}
                  className="grid gap-8 md:grid-cols-2 md:items-center"
                >
                  <div className={left ? "md:order-1 md:pr-12 md:text-right" : "md:order-2 md:pl-12"}>
                    <p className="font-script text-4xl text-primary">{item.year}</p>
                    <h3 className="mt-2 font-display text-3xl text-foreground">{item.title}</h3>
                    <p className="mt-4 font-body text-lg italic leading-relaxed text-foreground/75">
                      {item.body}
                    </p>
                  </div>
                  <div className={left ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12"}>
                    {item.img ? (
                      <div className="overflow-hidden rounded-sm border border-primary/20 shadow-[var(--shadow-soft)]">
                        <img src={item.img} alt={item.title} loading="lazy" className="h-72 w-full object-cover transition duration-700 hover:scale-105" />
                      </div>
                    ) : (
                      <div className="flex h-48 items-center justify-center rounded-sm border border-dashed border-primary/25 bg-ivory/40">
                        <svg width="40" height="40" viewBox="0 0 32 32" className="text-primary/50">
                          <path d="M16 5c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WeddingCalendar() {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  
  // February 2027 starts on Monday (index 1)
  const calendarCells = [
    null, // Sunday
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, // 20 is the wedding day
    21, 22, 23, 24, 25, 26, 27,
    28
  ];

  return (
    <div className="w-[300px] sm:w-[340px] bg-ivory text-primary p-6 sm:p-8 rounded-sm shadow-[var(--shadow-frame)] border border-sand/30 flex flex-col items-center select-none">
      {/* Month Title */}
      <h3 className="font-script text-4xl sm:text-5xl text-primary mb-4">
        February 2027
      </h3>
      
      {/* Days of Week Headers */}
      <div className="grid grid-cols-7 gap-2 w-full text-center border-b border-primary/10 pb-2 mb-2">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="font-sans-ui text-[10px] sm:text-xs uppercase tracking-wider text-primary/75 font-semibold">
            {day}
          </span>
        ))}
      </div>
      
      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-2 w-full text-center">
        {calendarCells.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="aspect-square" />;
          }
          
          if (day === 20) {
            return (
              <div key={idx} className="relative flex items-center justify-center aspect-square">
                <svg className="absolute w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] text-wine fill-current drop-shadow-sm animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="relative z-10 text-white font-sans-ui text-[12px] sm:text-[14px] font-bold">
                  20
                </span>
              </div>
            );
          }
          
          return (
            <div key={idx} className="flex items-center justify-center aspect-square font-sans-ui text-[12px] sm:text-[14px] text-foreground/80 hover:text-primary transition-colors cursor-default">
              {day}
            </div>
          );
        })}
      </div>
      
      {/* Minimalist Birds Line Art */}
      <svg className="w-28 h-12 mt-6 text-primary/70 fill-none stroke-current" viewBox="0 0 100 40" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25,28 C28,24 33,22 37,25 C40,24 43,26 43,28 C41,29 38,30 36,29 C32,32 28,32 25,28 Z" />
        <path d="M38,25 C41,20 40,16 35,17" />
        <path d="M75,28 C72,24 67,22 63,25 C60,24 57,26 57,28 C59,29 62,30 64,29 C68,32 72,32 75,28 Z" />
        <path d="M62,25 C59,20 60,16 65,17" />
        <path d="M50,22 C49,20 47,20 47,21.5 C47,23 50,25 50,25 C50,25 53,23 53,21.5 C53,20 51,20 50,22 Z" fill="currentColor" className="text-wine stroke-none" />
        <path d="M15,32 Q35,34 50,30" />
        <path d="M50,30 Q65,34 85,32" />
        <path d="M22,32 Q23,30 25,32" />
        <path d="M78,32 Q77,30 75,32" />
      </svg>
    </div>
  );
}

function CountdownSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Calendar Column */}
          <div className="flex-shrink-0 animate-fade-in order-2 lg:order-1">
            <WeddingCalendar />
          </div>
          
          {/* Countdown Clock Column */}
          <div className="flex-grow text-center lg:text-left order-1 lg:order-2">
            <p className="font-sans-ui text-[10px] uppercase tracking-[0.5em] text-primary-foreground/70">
              Counting the moments
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-white">Until We Say I Do</h2>
            <div className="mt-10">
              <Countdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const schedule = [
  { time: "4:00 PM", title: "Guest Arrival", note: "Welcome & seating" },
  { time: "4:30 PM", title: "Wedding Ceremony", note: "Exchange of vows" },
  { time: "6:00 PM", title: "Reception", note: "Aperitifs & photographs" },
  { time: "8:00 PM", title: "Dinner", note: "A shared feast" },
  { time: "10:00 PM", title: "Celebration", note: "First dance & dancing" },
];

function Schedule() {
  return (
    <section id="schedule" className="bg-background py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Ornament label="The Programme" />
        <h2 className="font-display text-5xl text-primary sm:text-6xl">Order of the Day</h2>
        <p className="mx-auto mt-4 max-w-md font-body italic text-foreground/70">
          What we have prepared for you on the twentieth of February.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {schedule.map((s) => (
          <article
            key={s.time}
            className="group relative overflow-hidden rounded-sm border border-primary/20 bg-ivory p-8 text-center shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-primary/50"
          >
            <span className="absolute inset-x-6 top-0 h-px bg-primary/40" />
            <p className="font-sans-ui text-[10px] uppercase tracking-[0.4em] text-primary/70">
              {s.time}
            </p>
            <h3 className="mt-3 font-display text-2xl text-primary">{s.title}</h3>
            <p className="mt-2 font-body italic text-foreground/70">{s.note}</p>
            <span className="absolute inset-x-6 bottom-0 h-px bg-primary/20" />
          </article>
        ))}
      </div>
    </section>
  );
}

const galleryImgs = [
  { src: gallery1, alt: "Walking through the vineyard", cls: "row-span-2" },
  { src: gallery2, alt: "The bouquet", cls: "" },
  { src: gallery3, alt: "Candlelit reception", cls: "row-span-2" },
  { src: gallery4, alt: "First dance", cls: "" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Ornament label="Moments" />
        <h2 className="font-display text-5xl text-primary sm:text-6xl">A Life in Pictures</h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-4 px-6 sm:grid-cols-4 sm:auto-rows-[220px]">
        {galleryImgs.map((g, i) => (
          <figure
            key={i}
            className={`group relative overflow-hidden rounded-sm border border-primary/15 shadow-[var(--shadow-soft)] ${g.cls}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-wine-deep/0 transition group-hover:bg-wine-deep/20" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="Find Us" />
          <h2 className="font-display text-5xl text-primary sm:text-6xl">The Venue</h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-sm border border-primary/20 shadow-[var(--shadow-frame)]">
            <img src={venue} alt="St. Mary's Church" loading="lazy" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <VenueCard
              title="St. Mary's Church"
              subtitle="The Ceremony · 4:30 PM"
              address="12 Old Chapel Lane, Rosewood Hill"
              maps="https://maps.google.com/?q=St+Mary's+Church"
            />
            <VenueCard
              title="Grand Palace Convention Centre"
              subtitle="The Reception · 6:00 PM onwards"
              address="88 Heritage Avenue, Rosewood Hill"
              maps="https://maps.google.com/?q=Grand+Palace+Convention+Centre"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VenueCard({
  title, subtitle, address, maps,
}: { title: string; subtitle: string; address: string; maps: string }) {
  return (
    <article className="relative rounded-sm border border-primary/25 bg-ivory/70 p-8 backdrop-blur-sm shadow-[var(--shadow-soft)]">
      <p className="font-sans-ui text-[10px] uppercase tracking-[0.4em] text-primary/70">
        {subtitle}
      </p>
      <h3 className="mt-2 font-display text-3xl text-primary">{title}</h3>
      <p className="mt-3 font-body text-lg italic text-foreground/75">{address}</p>
      <a
        href={maps}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 font-sans-ui text-[11px] uppercase tracking-[0.35em] text-primary transition hover:opacity-70"
      >
        Open in Maps →
      </a>
    </article>
  );
}

function DressCode() {
  const items = [
    {
      label: "Ladies",
      title: "Pastel Elegance",
      note: "Long or midi gowns in soft sand, blush or ivory tones.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M24 8h16l-4 10 12 38H20l12-38-4-10z" />
          <path d="M28 22c2 2 6 2 8 0" />
        </svg>
      ),
    },
    {
      label: "Gentlemen",
      title: "Classic Ivory",
      note: "Tailored suit in cream, sand or muted earth tones, with a wine accent.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M18 12l14 8 14-8v44H18z" />
          <path d="M32 20v16" />
          <circle cx="32" cy="42" r="1.5" fill="currentColor" />
          <circle cx="32" cy="48" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
  ];
  return (
    <section className="bg-secondary py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Ornament label="A Kind Note" />
        <h2 className="font-display text-5xl text-primary sm:text-6xl">Dress Code</h2>
        <p className="mx-auto mt-4 max-w-lg font-body italic text-foreground/70">
          We would love our celebration to feel like a canvas of soft, warm tones.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {items.map((i) => (
            <article key={i.label} className="rounded-sm border border-primary/20 bg-ivory p-10 text-primary shadow-[var(--shadow-soft)]">
              <div className="flex justify-center">{i.icon}</div>
              <p className="mt-6 font-sans-ui text-[10px] uppercase tracking-[0.4em]">{i.label}</p>
              <h3 className="mt-2 font-display text-2xl">{i.title}</h3>
              <p className="mt-3 font-body italic text-foreground/70">{i.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RsvpSection() {
  return (
    <section id="rsvp" className="relative bg-background py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Ornament label="Kindly Respond" />
        <h2 className="font-display text-5xl text-primary sm:text-6xl">RSVP</h2>
        <p className="mx-auto mt-4 max-w-lg font-body italic text-foreground/70">
          Your presence is the most precious gift. Please respond by 20 January 2027.
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-3xl px-6">
        <RsvpForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary py-16 text-center text-primary-foreground">
      <p className="font-script text-5xl">Noah &amp; Emma</p>
      <p className="mt-4 font-sans-ui text-[11px] uppercase tracking-[0.5em] text-primary-foreground/70">
        20 · 02 · 2027
      </p>
      <div className="ornament-divider mt-6 text-primary-foreground">
        <span className="ornament-line" style={{ background: "linear-gradient(90deg, transparent, currentColor, transparent)" }} />
        <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="2" /></svg>
        <span className="ornament-line" style={{ background: "linear-gradient(90deg, transparent, currentColor, transparent)" }} />
      </div>
      <p className="mt-6 font-body italic text-primary-foreground/80">
        With love, from our families to yours.
      </p>
    </footer>
  );
}
