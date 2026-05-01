export default function ReflectionBlock({
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
