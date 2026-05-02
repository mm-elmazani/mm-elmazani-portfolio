import { StaggeredHero } from "@/components/StaggeredHero";
import {
  StaggeredHubLinks,
  type HubLink,
} from "@/components/StaggeredHubLinks";
import { StaggeredStatusBlocks } from "@/components/StaggeredStatusBlocks";

const hubLinks: HubLink[] = [
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
      {/* Hero (anim au chargement) */}
      <StaggeredHero />

      <hr className="my-20 border-0 border-t border-rule" />

      {/* Hub 4 lignes (anim au scroll) */}
      <section>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          [index] Navigation
        </h2>
        <StaggeredHubLinks links={hubLinks} />
      </section>

      <hr className="my-20 border-0 border-t border-rule" />

      {/* Status / contact bloc (anim au scroll) */}
      <StaggeredStatusBlocks />
    </main>
  );
}
