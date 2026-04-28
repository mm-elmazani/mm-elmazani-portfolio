import Link from "next/link";

const hubLinks = [
  {
    num: "01",
    title: "CV",
    desc: "Parcours, compétences, langues, contact.",
    href: "/cv",
  },
  {
    num: "02",
    title: "Projet professionnel",
    desc: "Cible stage, forces, axes de travail, trajectoire.",
    href: "/projet-pro",
  },
  {
    num: "03",
    title: "Portfolio d'activités",
    desc: "6 thèmes · activités valorisées · preuves.",
    href: "/portfolio",
  },
  {
    num: "04",
    title: "Auto-évaluation",
    desc: "Lecture critique de mon parcours BAC 3 TI.",
    href: "/auto-evaluation",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        Portfolio · EPHEC BAC 3 TI · 2025 — 2026
      </p>

      {/* Hero */}
      <h1 className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl lg:text-8xl">
        Mohamed Mokhtar
        <br />
        El Mazani<span className="text-accent">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-xl">
        Étudiant BAC 3 en Technologies de l&apos;Informatique à l&apos;EPHEC.
        Curieux et autodidacte, je navigue naturellement entre le{" "}
        <span className="text-ink">hardware</span>, les{" "}
        <span className="text-ink">réseaux</span> et l&apos;
        <span className="text-ink">administration système</span>. Ce qui me
        définit : la rigueur d&apos;un technicien et l&apos;envie constante de
        comprendre comment les choses fonctionnent — du composant au
        datacenter.
      </p>

      <hr className="my-20 border-0 border-t border-rule" />

      {/* Hub 4 lignes */}
      <section>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [index] Navigation
        </h2>

        <div className="mt-8 divide-y divide-rule border-y border-rule">
          {hubLinks.map((l) => (
            <Link
              key={l.num}
              href={l.href}
              className="group flex items-center gap-6 py-8 transition-colors hover:bg-mist"
            >
              <span className="font-mono text-xs text-accent">[{l.num}]</span>
              <span className="flex-1">
                <span className="block font-display text-2xl md:text-3xl">
                  {l.title}
                </span>
                <span className="mt-1 block text-sm text-ash md:text-base">
                  {l.desc}
                </span>
              </span>
              <span className="font-mono text-ash transition-all group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="my-20 border-0 border-t border-rule" />

      {/* Status / contact bloc */}
      <section className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Localisation
          </p>
          <p className="mt-3 text-base leading-relaxed">
            <span className="inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-accent" />{" "}
            Bruxelles · mobilité Belgique.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Cible post-études
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Technicien / Ingénieur Infrastructure IT · Data Center
            Technician / Engineer.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Contact
          </p>
          <p className="mt-3 text-base leading-relaxed">
            <a
              href="mailto:mohamedelmazani.pro@gmail.com"
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              mohamedelmazani.pro@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
