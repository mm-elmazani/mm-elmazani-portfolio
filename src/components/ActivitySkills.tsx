export default function ActivitySkills({ skills }: { skills: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {skills.map((s) => (
        <li
          key={s}
          className="rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-sm text-ink"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
