import type { Metadata } from "next";
import Link from "next/link";
import {
  activities,
  activitiesByTheme,
  formatDate,
  totals,
} from "@/data/activities";

export const metadata: Metadata = {
  title: "Portfolio d'activités — Mohamed Mokhtar El Mazani",
  description:
    "Portfolio d'activités d'acquisition de compétences (rubric EPHEC BAC 3 TI) : thèmes, activités, heures valorisées, preuves, analyses réflexives.",
};

export default function PortfolioPage() {
  const t = totals();
  const grouped = activitiesByTheme();

  // Trié pour la table (plus récent d'abord)
  const sorted = [...activities].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [03] Portfolio · activités d&apos;acquisition de compétences
      </p>

      <h1 className="mt-6 font-display text-5xl font-medium leading-[0.95] md:text-7xl">
        Apprendre
        <br />
        en faisant<span className="text-accent">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">
        Activités menées hors cursus pour acquérir des compétences techniques,
        humaines et professionnelles. Chacune est documentée avec une analyse
        réflexive et une preuve, conformément aux modalités du portfolio EPHEC.
      </p>

      {/* [00] Synthèse — 5 compteurs */}
      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [00] Synthèse
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-px bg-rule md:grid-cols-5">
          <Counter label="Thèmes" value={t.themesCount} suffix="/ 6" />
          <Counter
            label="Activités"
            value={t.activitiesCount}
            suffix="/ 6"
          />
          <Counter
            label="Heures valorisées"
            value={t.hoursValued}
            suffix="/ 60"
          />
          <Counter
            label="Heures réelles"
            value={t.realHours}
            suffix={t.realHours === 0 ? "à compléter" : "h"}
          />
          <Counter label="Preuves" value={t.proofsCount} suffix="documentées" />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
          Stratégie : inscrire toutes les activités. Les professeurs valident
          ensuite les 60h sur l&apos;ensemble.
        </p>
      </section>

      {/* [01] Tableau récapitulatif obligatoire (rubric) */}
      <section className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [01] Tableau récapitulatif
        </h2>
        <p className="mt-3 max-w-prose font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Format imposé par les modalités EPHEC.
        </p>

        <div className="mt-6 overflow-x-auto border border-rule">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="bg-mist">
              <tr className="text-left">
                <Th>Thème</Th>
                <Th>Activité</Th>
                <Th>Lieu</Th>
                <Th>Date</Th>
                <Th align="right">H. val.</Th>
                <Th align="right">H. réelles</Th>
                <Th>Preuve</Th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-rule transition-colors hover:bg-mist/50"
                >
                  <Td>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                      {a.theme}
                    </span>
                  </Td>
                  <Td>
                    <Link
                      href={`/portfolio/${a.slug}`}
                      className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {a.title}
                    </Link>
                  </Td>
                  <Td>
                    {a.location ?? (
                      <span className="text-ash">[À compléter]</span>
                    )}
                  </Td>
                  <Td>
                    <span className="font-mono text-xs">
                      {formatDate(a.date)}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="font-mono text-sm text-accent">
                      {a.hoursValued}h
                    </span>
                  </Td>
                  <Td align="right">
                    {a.realHours !== null ? (
                      <span className="font-mono text-sm">{a.realHours}h</span>
                    ) : (
                      <span className="font-mono text-xs text-ash">[À c.]</span>
                    )}
                  </Td>
                  <Td>
                    <Link
                      href={`/portfolio/${a.slug}#preuve`}
                      className="font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:underline"
                    >
                      {a.proof.type} →
                    </Link>
                  </Td>
                </tr>
              ))}
              {/* Ligne total */}
              <tr className="border-t-2 border-ink bg-mist">
                <Td colSpan={4}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                    Total
                  </span>
                </Td>
                <Td align="right">
                  <span className="font-mono text-sm font-semibold text-accent">
                    {t.hoursValued}h
                  </span>
                </Td>
                <Td align="right">
                  <span className="font-mono text-sm font-semibold">
                    {t.realHours}h
                  </span>
                </Td>
                <Td>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                    {t.activitiesCount} activités · {t.themesCount} thèmes
                  </span>
                </Td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* [02] Activités groupées par thème */}
      <section className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [02] Activités par thème
        </h2>

        <div className="mt-8 space-y-12">
          {grouped.map(({ theme, items }, idx) => {
            const themeHours = items.reduce(
              (s, a) => s + a.hoursValued,
              0,
            );
            return (
              <div key={theme}>
                <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
                  <h3 className="font-display text-2xl">
                    <span className="font-mono text-sm text-accent">
                      [{String(idx + 1).padStart(2, "0")}]{" "}
                    </span>
                    {theme}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                    {items.length} activité{items.length > 1 ? "s" : ""} ·{" "}
                    {themeHours}h valorisées
                    {themeHours > 10 && (
                      <span className="ml-2 text-accent">
                        · plafond rubric 10h/thème
                      </span>
                    )}
                  </p>
                </header>

                <div className="mt-6 grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <Link
                      key={a.id}
                      href={`/portfolio/${a.slug}`}
                      className="group flex h-full flex-col bg-bone p-6 transition-colors hover:bg-mist"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                          {a.type} · {a.hoursValued}h
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                      <h4 className="mt-3 font-display text-lg leading-tight">
                        {a.title}
                      </h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
                        {a.description}
                      </p>
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                        {formatDate(a.date)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/* ---------- helpers ---------- */

function Counter({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col justify-between bg-bone p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
        {label}
      </p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl text-ink md:text-5xl">
          {value}
        </span>
        {suffix && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  colSpan,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`px-4 py-3 align-top ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}
