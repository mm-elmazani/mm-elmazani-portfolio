import { formatDate, type Activity } from "@/data/activities";

export default function ActivityMeta({ activity }: { activity: Activity }) {
  return (
    <dl className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 md:grid-cols-4">
      <Cell label="Date" value={formatDate(activity.date)} />
      <Cell
        label="Lieu"
        value={activity.location ?? "[À compléter]"}
        muted={!activity.location}
      />
      <Cell
        label="Heures valorisées"
        value={`${activity.hoursValued}h`}
        accent
      />
      <Cell
        label="Heures réelles"
        value={
          activity.realHours !== null
            ? `${activity.realHoursOngoing ? "+" : ""}${activity.realHours}h`
            : "[À compléter]"
        }
        muted={activity.realHours === null}
      />
    </dl>
  );
}

function Cell({
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
