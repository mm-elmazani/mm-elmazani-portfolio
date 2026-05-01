import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activities, getActivity } from "@/data/activities";
import ActivityHero from "@/components/ActivityHero";
import ActivityMeta from "@/components/ActivityMeta";
import ReflectionBlock from "@/components/ReflectionBlock";
import ActivitySkills from "@/components/ActivitySkills";
import ProofDetails from "@/components/ProofDetails";
import ProofMedia from "@/components/ProofMedia";
import ProofLinks from "@/components/ProofLinks";
import ActivityNav from "@/components/ActivityNav";

const SLUG = "conference-cybersecurite-redsystem-2025";
const activity = getActivity(SLUG);

export const metadata: Metadata = activity
  ? {
      title: `${activity.title} — Portfolio`,
      description: activity.description,
    }
  : { title: "Activité introuvable" };

export default function Page() {
  const a = getActivity(SLUG);
  if (!a) notFound();

  const idx = activities.findIndex((x) => x.slug === SLUG);
  const prev = idx > 0 ? activities[idx - 1] : null;
  const next = idx < activities.length - 1 ? activities[idx + 1] : null;

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14 md:px-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        <Link href="/portfolio" className="transition-colors hover:text-accent">
          ← Portfolio
        </Link>
      </nav>

      <ActivityHero activity={a} />
      <ActivityMeta activity={a} />

      {/* [01] Analyse réflexive — 5 sections rubric */}
      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [01] Analyse réflexive
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Structure rubric : cadre · faits · lien projet pro · compétences ·
          conclusion.
        </p>
        <div className="mt-10 space-y-12">
          <ReflectionBlock num="01" title="Cadre & contexte" text={a.reflection.context} />
          <ReflectionBlock num="02" title="Faits — ce qui a été réalisé" text={a.reflection.facts} />
          <ReflectionBlock num="03" title="Lien avec mon projet professionnel" text={a.reflection.projectLink} />
          <ReflectionBlock num="04" title="Compétences acquises" text={a.reflection.skills} />
          <ReflectionBlock num="05" title="Conclusion & perspectives" text={a.reflection.conclusion} />
        </div>
      </section>

      {/* [02] Compétences mobilisées */}
      <section className="mt-16 border-t border-rule pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [02] Compétences mobilisées
        </h2>
        <ActivitySkills skills={a.skills} />
      </section>

      {/* [03] Preuve */}
      <section
        id="preuve"
        className="mt-16 scroll-mt-24 border-t border-rule pt-10"
      >
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [03] Preuve
        </h2>
        <ProofDetails proof={a.proof} />
        <ProofMedia activity={a} />
        <ProofLinks activity={a} />
      </section>

      {/* Navigation prev / next entre activités */}
      <ActivityNav prev={prev} next={next} />
    </main>
  );
}
