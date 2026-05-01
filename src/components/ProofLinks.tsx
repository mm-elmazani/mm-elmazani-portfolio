import type { Activity } from "@/data/activities";

const VIDEO_RE = /\.(mp4|mov|webm|ogg|m4v)$/i;

export default function ProofLinks({ activity }: { activity: Activity }) {
  const otherLinks = (activity.proof.links ?? []).filter(
    (l) => !VIDEO_RE.test(l.url),
  );
  if (otherLinks.length === 0) return null;

  return (
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
  );
}
