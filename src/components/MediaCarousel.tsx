"use client";

import { useEffect, useRef, useState } from "react";

export type MediaItem =
  | { type: "image"; url: string; label?: string }
  | { type: "video"; url: string; label?: string };

export default function MediaCarousel({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Update active index on scroll (snap detection)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const slideWidth = track.clientWidth;
      if (slideWidth > 0) {
        const idx = Math.round(track.scrollLeft / slideWidth);
        setActive(idx);
      }
    };
    track.addEventListener("scroll", handler, { passive: true });
    return () => track.removeEventListener("scroll", handler);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(media.length - 1, i));
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto border border-rule bg-mist [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {media.map((item, i) => (
          <div
            key={item.url}
            className="relative flex aspect-[4/3] w-full shrink-0 snap-center items-center justify-center bg-ink/5 md:aspect-[16/9]"
          >
            {item.type === "image" ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.url}
                alt={item.label ?? `${title} — média ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-contain"
              />
            ) : (
              <video
                src={item.url}
                controls
                preload="metadata"
                playsInline
                className="h-full w-full object-contain"
              >
                Ton navigateur ne lit pas les vidéos HTML5.
              </video>
            )}

            {/* Index badge */}
            <span className="absolute bottom-3 right-3 bg-bone/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink backdrop-blur">
              {String(i + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
              {item.type === "video" && " · vidéo"}
            </span>
          </div>
        ))}
      </div>

      {/* Prev / Next (cachés sur mobile, swipe natif) */}
      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Média précédent"
            disabled={active === 0}
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-rule bg-bone/90 font-mono text-lg text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent disabled:opacity-30 md:flex"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Média suivant"
            disabled={active === media.length - 1}
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-rule bg-bone/90 font-mono text-lg text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent disabled:opacity-30 md:flex"
          >
            →
          </button>
        </>
      )}

      {/* Dots */}
      {media.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {media.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller au média ${i + 1}`}
              aria-current={active === i}
              className={`h-1.5 transition-all ${
                active === i ? "w-8 bg-accent" : "w-4 bg-rule"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
