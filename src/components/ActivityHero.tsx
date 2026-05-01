import type { Activity } from "@/data/activities";

export default function ActivityHero({ activity }: { activity: Activity }) {
  return (
    <>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        [{activity.theme}] · {activity.type}
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] md:text-6xl">
        {activity.title}
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/80 md:text-lg">
        {activity.description}
      </p>
    </>
  );
}
