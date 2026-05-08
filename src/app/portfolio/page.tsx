import type { Metadata } from "next";
import Link from "next/link";
import {
  activities,
  activitiesByTheme,
  formatDate,
  totals,
} from "@/data/activities";
import { getThemeIcon } from "@/lib/themeIcons";
import { StaggeredActivityGrid } from "@/components/StaggeredActivityGrid";
import {
  StaggeredCounters,
  type CounterItem,
} from "@/components/StaggeredCounters";
import { TypewriterTitle } from "@/components/TypewriterTitle";

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

  // Compteurs synthèse [00] — passés en props au Client Component
  const synthCounters: CounterItem[] = [
    { label: "Thèmes", value: t.themesCount, suffix: "/ 6" },
    { label: "Activités", value: t.activitiesCount, suffix: "/ 6" },
    { label: "Heures valorisées", value: t.hoursValued, suffix: "/ 60" },
    {
      label: "Heures réelles",
      value: t.realHours,
      suffix: t.realHours === 0 ? "à compléter" : "h",
    },
    { label: "Preuves", value: t.proofsCount, suffix: "documentées" },
  ];

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [03] Portfolio · activités d&apos;acquisition de compétences
      </p>

      <TypewriterTitle
        text="Apprendre en faisant."
        className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl"
      />

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
        Activités menées hors cursus pour acquérir des compétences techniques,
        humaines et professionnelles. Chacune est documentée avec une analyse
        réflexive et une preuve, conformément aux modalités du portfolio EPHEC.
      </p>

      {/* [00] Synthèse — 5 compteurs */}
      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [00] Synthèse
        </h2>
        <StaggeredCounters counters={synthCounters} />
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

        {/* Mobile : liste de cartes empilées (< md) */}
        <ul className="mt-6 space-y-3 md:hidden">
          {sorted.map((a, idx) => (
            <li
              key={a.id}
              className="border border-rule bg-mist p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                <span className="mr-2 text-accent">{String(idx + 1).padStart(2, "0")}</span>
                {a.theme}
              </p>
              <h3 className="mt-2 font-display text-lg leading-tight">
                <Link
                  href={`/portfolio/${a.slug}`}
                  className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {a.title}
                </Link>
              </h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    Lieu
                  </dt>
                  <dd className="mt-0.5 text-sm">
                    {a.location ?? (
                      <span className="text-ash">[À compléter]</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    Date
                  </dt>
                  <dd className="mt-0.5 font-mono text-xs">
                    {formatDate(a.date)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    H. valorisées
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-accent">
                    {a.hoursValued}h
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    H. réelles
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm">
                    {a.realHours !== null ? (
                      `${a.realHoursOngoing ? "+" : ""}${a.realHours}h`
                    ) : (
                      <span className="text-ash">[À c.]</span>
                    )}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/portfolio/${a.slug}#preuve`}
                className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:underline"
              >
                {a.proof.type} →
              </Link>
            </li>
          ))}
          {/* Carte total (mobile) */}
          <li className="border-2 border-ink bg-mist p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Total
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                  H. valorisées
                </dt>
                <dd className="mt-0.5 font-mono text-base font-semibold text-accent">
                  {t.hoursValued}h
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                  H. réelles
                </dt>
                <dd className="mt-0.5 font-mono text-base font-semibold">
                  {t.realHours}h
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                  Bilan
                </dt>
                <dd className="mt-0.5 font-mono text-sm">
                  {t.activitiesCount} activités · {t.themesCount} thèmes
                </dd>
              </div>
            </dl>
          </li>
        </ul>

        {/* Desktop : tableau (>= md) */}
        <div className="mt-6 hidden overflow-x-auto border border-rule md:block">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="bg-mist">
              <tr className="text-left">
                <Th>#</Th>
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
              {sorted.map((a, idx) => (
                <tr
                  key={a.id}
                  className="border-t border-rule transition-colors hover:bg-mist/50"
                >
                  <Td>
                    <span className="font-mono text-[10px] text-ash">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </Td>
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
                      <span className="font-mono text-sm">
                        {a.realHoursOngoing ? "+" : ""}
                        {a.realHours}h
                      </span>
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
                <Td colSpan={5}>
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
            const ThemeIcon = getThemeIcon(theme);
            return (
              <div key={theme}>
                <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
                  <h3 className="flex items-center gap-3 font-display text-2xl">
                    <span className="font-mono text-sm text-accent">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <ThemeIcon
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.75}
                    />
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

                <StaggeredActivityGrid items={items} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/* ---------- helpers ---------- */

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
