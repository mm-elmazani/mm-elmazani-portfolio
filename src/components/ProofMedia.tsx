import type { Activity } from "@/data/activities";
import MediaCarousel, { type MediaItem } from "./MediaCarousel";

const VIDEO_RE = /\.(mp4|mov|webm|ogg|m4v)$/i;

export default function ProofMedia({ activity }: { activity: Activity }) {
  const videoLinks = (activity.proof.links ?? []).filter((l) =>
    VIDEO_RE.test(l.url),
  );
  const media: MediaItem[] = [
    ...(activity.proof.images ?? []).map(
      (url): MediaItem => ({ type: "image", url }),
    ),
    ...videoLinks.map(
      (l): MediaItem => ({ type: "video", url: l.url, label: l.label }),
    ),
  ];

  if (media.length === 0) return null;

  const photoCount = activity.proof.images?.length ?? 0;
  const videoCount = videoLinks.length;

  return (
    <div className="mt-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
        Preuves visuelles · {media.length} média
        {media.length > 1 ? "s" : ""}
        {videoCount > 0 &&
          ` (${photoCount} photo${photoCount > 1 ? "s" : ""} · ${videoCount} vidéo${videoCount > 1 ? "s" : ""})`}
      </p>
      <div className="mt-4">
        <MediaCarousel media={media} title={activity.title} />
      </div>
      {media.length > 1 && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
          Glisser ou utiliser les flèches pour parcourir.
        </p>
      )}
    </div>
  );
}
