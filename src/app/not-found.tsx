import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page introuvable",
  description: "La ressource demandée n'existe pas sur ce portfolio.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[1100px] flex-col justify-center px-5 py-14 md:px-12 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        [404] · ressource introuvable
      </p>

      <h1 className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl">
        Cette page<br />
        n&apos;existe pas<span className="text-accent">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
        L&apos;URL que tu cherches n&apos;a jamais existé, ou alors elle a été
        renommée pendant un refactor — désolé pour la friction. Voici les
        chemins valides :
      </p>

      <nav className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {[
          { href: "/", label: "Accueil", num: "00" },
          { href: "/cv", label: "CV", num: "01" },
          { href: "/projet-pro", label: "Projet professionnel", num: "02" },
          { href: "/portfolio", label: "Portfolio d'activités", num: "03" },
          { href: "/auto-evaluation", label: "Auto-évaluation", num: "04" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center justify-between gap-4 bg-mist p-5 transition-colors hover:bg-frost"
          >
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                [{l.num}]
              </span>
              <span className="font-display text-lg text-ink group-hover:text-accent">
                {l.label}
              </span>
            </span>
            <span className="font-mono text-ash group-hover:text-accent">
              →
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
