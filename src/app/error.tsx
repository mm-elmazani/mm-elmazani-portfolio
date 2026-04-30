"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log côté client pour traçabilité
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[1100px] flex-col justify-center px-5 py-14 md:px-12 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        [500] · erreur côté application
      </p>

      <h1 className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl">
        Quelque chose<br />
        a planté<span className="text-accent">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
        Une erreur est survenue côté application. Tu peux réessayer la page,
        ou revenir à l&apos;accueil. Si l&apos;erreur persiste, contacte-moi à{" "}
        <a
          href="mailto:mohamedelmazani.pro@gmail.com"
          className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          mohamedelmazani.pro@gmail.com
        </a>
        .
      </p>

      {error.digest && (
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Digest · {error.digest}
        </p>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
        >
          Réessayer
          <span className="transition-transform group-hover:rotate-180">↻</span>
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-3 border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-bone"
        >
          Retour à l&apos;accueil
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
