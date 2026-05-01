import Link from "next/link";
import type { Activity } from "@/data/activities";

export default function ActivityNav({
  prev,
  next,
}: {
  prev: Activity | null;
  next: Activity | null;
}) {
  return (
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
