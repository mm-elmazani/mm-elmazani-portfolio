import Link from "next/link";
import { notFound } from "next/navigation";
import {
  activities,
  formatDate,
  getActivity,
  type Activity,
} from "@/data/activities";
import MediaCarousel, { type MediaItem } from "@/components/MediaCarousel";

const VIDEO_RE = /\.(mp4|mov|webm|ogg|m4v)$/i;
const isVideoUrl = (url: string) => VIDEO_RE.test(url);

export default function ActivityPageContent({ slug }: { slug: string }) {
  const a = getActivity(slug);
  if (!a) notFound();

  // Navigation prev/next dans le portfolio (ordre du fichier)
  const idx = activities.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? activities[idx - 1] : null;
  const next = idx < activities.length - 1 ? activities[idx + 1] : null;

  // Carousel : fusionner images + vidéos extraites des links
  const videoLinks = (a.proof.links ?? []).filter((l) => isVideoUrl(l.url));
  const otherLinks = (a.proof.links ?? []).filter((l) => !isVideoUrl(l.url));
  const carouselMedia: MediaItem[] = [
    ...(a.proof.images ?? []).map(
      (url): MediaItem => ({ type: "image", url }),
    ),
    ...videoLinks.map(
      (l): MediaItem => ({ type: "video", url: l.url, label: l.label }),
    ),
  ];

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14 md:px-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        <Link
          href="/portfolio"
          className="transition-colors hover:text-accent"
        >
          ← Portfolio
        </Link>
      </nav>

      {/* Méta-en-tête */}
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        [{a.theme}] · {a.type}
      </p>

      <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] md:text-6xl">
        {a.title}
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80 md:text-lg">
        {a.description}
      </p>

      {/* Bandeau métadonnées (tableau récap inline) */}
      <dl className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 md:grid-cols-4">
        <Meta label="Date" value={formatDate(a.date)} />
        <Meta
          label="Lieu"
          value={a.location ?? "[À compléter]"}
          muted={!a.location}
        />
        <Meta label="Heures valorisées" value={`${a.hoursValued}h`} accent />
        <Meta
          label="Heures réelles"
          value={a.realHours !== null ? `${a.realHours}h` : "[À compléter]"}
          muted={a.realHours === null}
        />
      </dl>

      {/* Analyse réflexive — structure imposée rubric */}
      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [01] Analyse réflexive
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Structure rubric : cadre · faits · lien projet pro · compétences ·
          conclusion.
        </p>

        <div className="mt-10 space-y-12">
          <ReflectionBlock
            num="01"
            title="Cadre & contexte"
            text={a.reflection.context}
          />
          <ReflectionBlock
            num="02"
            title="Faits — ce qui a été réalisé"
            text={a.reflection.facts}
          />
          <ReflectionBlock
            num="03"
            title="Lien avec mon projet professionnel"
            text={a.reflection.projectLink}
          />
          <ReflectionBlock
            num="04"
            title="Compétences acquises"
            text={a.reflection.skills}
          />
          <ReflectionBlock
            num="05"
            title="Conclusion & perspectives"
            text={a.reflection.conclusion}
          />
        </div>
      </section>

      {/* Compétences (tags) */}
      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [02] Compétences mobilisées
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {a.skills.map((s) => (
            <li
              key={s}
              className="rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-sm text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Preuve */}
      <section
        id="preuve"
        className="mt-16 scroll-mt-24 border-t border-rule pt-10"
      >
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [03] Preuve
        </h2>
        <div className="mt-6 grid gap-6 border border-rule p-6 md:grid-cols-[180px_1fr] md:gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            Type
          </p>
          <p className="font-mono text-sm">{a.proof.type}</p>

          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            Description
          </p>
          <p className="text-sm leading-relaxed text-ink/80">
            {a.proof.description}
          </p>

          {a.proof.file && (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                Fichier source
              </p>
              <p className="font-mono text-sm text-ink/70">{a.proof.file}</p>
            </>
          )}
        </div>

        {/* Carousel preuves (photos + vidéos) */}
        {carouselMedia.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
              Preuves visuelles · {carouselMedia.length} média
              {carouselMedia.length > 1 ? "s" : ""}
              {videoLinks.length > 0 &&
                ` (${a.proof.images?.length ?? 0} photo${
                  (a.proof.images?.length ?? 0) > 1 ? "s" : ""
                } · ${videoLinks.length} vidéo${
                  videoLinks.length > 1 ? "s" : ""
                })`}
            </p>
            <div className="mt-4">
              <MediaCarousel media={carouselMedia} title={a.title} />
            </div>
            {carouselMedia.length > 1 && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                Glisser ou utiliser les flèches pour parcourir.
              </p>
            )}
          </div>
        )}

        {/* Liens non-vidéo (PDFs, repos, sites, etc.) */}
        {otherLinks.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
              Liens · {otherLinks.length} ressource
              {otherLinks.length > 1 ? "s" : ""}
            </p>
            <ul className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {otherLinks.map((l, i) => (
                <li key={l.url} className="bg-mist">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-frost"
                  >
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-sm text-ink group-hover:text-accent">
                        {l.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Navigation prev / next */}
      <nav className="mt-20 grid gap-px border border-rule bg-rule md:grid-cols-2">
        {prev ? (
          <NavCard activity={prev} direction="prev" />
        ) : (
          <div className="bg-mist p-6" />
        )}
        {next ? (
          <NavCard activity={next} direction="next" />
        ) : (
          <div className="bg-mist p-6" />
        )}
      </nav>
    </main>
  );
}

/* ---------- helpers ---------- */

function Meta({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 bg-mist p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
        {label}
      </p>
      <p
        className={`font-mono text-sm ${
          accent ? "text-accent" : muted ? "text-ash" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ReflectionBlock({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  return (
    <article className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          [{num}]
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          {title}
        </p>
      </div>
      <p className="max-w-prose text-base leading-relaxed text-ink/85">
        {text}
      </p>
    </article>
  );
}

function NavCard({
  activity,
  direction,
}: {
  activity: Activity;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/portfolio/${activity.slug}`}
      className={`group flex flex-col gap-2 bg-mist p-6 transition-colors hover:bg-frost ${
        direction === "next" ? "md:items-end md:text-right" : ""
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash group-hover:text-accent">
        {direction === "prev" ? "← précédente" : "suivante →"}
      </span>
      <span className="font-display text-lg leading-tight">
        {activity.title}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
        {activity.theme} · {activity.hoursValued}h
      </span>
    </Link>
  );
}
