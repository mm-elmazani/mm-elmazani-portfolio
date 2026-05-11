import type { Metadata } from "next";
import {
  StaggeredActionPlan,
  type ActionPlanItem,
} from "@/components/StaggeredActionPlan";
import { StaggeredReflectionBlocks } from "@/components/StaggeredReflectionBlocks";
import { StaggeredSkillsProgress } from "@/components/StaggeredSkillsProgress";
import { TypewriterTitle } from "@/components/TypewriterTitle";

export const metadata: Metadata = {
  title: "Auto-évaluation — Mohamed Mokhtar El Mazani",
  description:
    "Lecture critique de mon parcours BAC 3 TI à l'EPHEC : évolution, progression, plan d'action.",
};

const evolution = [
  {
    date: "septembre 2023",
    title: "Début de formation EPHEC",
    desc: "Bases limitées en programmation, beaucoup d'appréhension. Connaissances principalement hardware acquises en autodidacte.",
  },
  {
    date: "septembre 2024",
    title: "Premiers projets réussis",
    desc: "Scripts Python, configuration de réseaux, premières manipulations Linux. Début de confiance dans mes capacités techniques.",
  },
  {
    date: "juin 2025",
    title: "Projets complexes maîtrisés",
    desc: "VPS Docker complet, application MERN PowerTrack. Passage de scripts isolés à des architectures complètes.",
  },
  {
    date: "octobre 2025",
    title: "Networking & ouverture",
    desc: "Tech Career Night AXA, Hackathon Upscaling. Premières connexions professionnelles, vision plus claire du marché IT.",
  },
  {
    date: "avril 2026",
    title: "Stage de fin d'études en cours",
    desc: "Confrontation au réel : production, contraintes, équipe. Le stage façonne la suite de ma trajectoire.",
  },
];

const skillsProgress = [
  { name: "Hardware et support IT", value: 85 },
  { name: "Réseaux et infrastructure", value: 65 },
  { name: "Développement web", value: 55 },
  { name: "Cloud et DevOps", value: 45 },
  { name: "Cybersécurité", value: 40 },
  { name: "Soft skills (communication, équipe)", value: 70 },
];

const actionPlan: ActionPlanItem[] = [
  {
    horizon: "Court terme",
    period: "Stage 2026 (en cours)",
    title: "Tirer le maximum du stage",
    desc: "Exposition maximale aux différentes facettes de l'IT en entreprise. Documenter chaque mission, identifier ce qui me passionne pour orienter la suite.",
  },
  {
    horizon: "Moyen terme",
    period: "2026 — 2027",
    title: "Certifications & spécialisation",
    desc: "CompTIA A+ (hardware), LPIC-1 (Linux), puis ITIL ou Azure Fundamentals. Certifier les acquis et combler les lacunes théoriques identifiées.",
  },
  {
    horizon: "Moyen terme",
    period: "2026 — 2027",
    title: "Discipliner ma curiosité — choisir un focus",
    desc: "Plutôt qu'effleurer dix domaines, m'enfoncer vraiment sur un axe : infrastructure Linux serveur, virtualisation et réseau. Le homelab devient le terrain de cette discipline — chaque service ajouté est creusé jusqu'au bout, pas survolé.",
  },
  {
    horizon: "Long terme",
    period: "Horizon 2-3 ans",
    title: "Veille & spécialisation métier",
    desc: "1h/jour de veille techno (articles, podcasts, tutoriels), contributions open-source. Poste cible : Technicien / Ingénieur Infrastructure IT, Data Center Engineer.",
  },
];

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        [{num}] {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}


export default function AutoEvaluationPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [04] Auto-évaluation · lecture critique
      </p>

      <TypewriterTitle
        text="Mesurer le chemin parcouru."
        className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl"
      />

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
        Cette page est une <span className="text-ink">lecture honnête</span>
        {" "}de mon parcours BAC 3 TI : ce que j&apos;ai appris, ce qui reste à
        faire,
        et la trajectoire que je me trace. Elle complète les{" "}
        <a
          href="/projet-pro"
          className="underline decoration-rule underline-offset-4 hover:text-accent hover:decoration-accent"
        >
          forces et axes de travail
        </a>{" "}
        détaillés sur la page projet professionnel.
      </p>

      {/* [01] Évolution — timeline */}
      <Section num="01" title="Mon évolution">
        <div className="divide-y divide-rule border-y border-rule">
          {evolution.map((e) => (
            <div
              key={e.title}
              className="grid gap-3 py-6 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                {e.date}
              </p>
              <div>
                <h3 className="font-display text-xl">{e.title}</h3>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-ink/80">
                  {e.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* [02] Progression des compétences */}
      <Section num="02" title="Progression des compétences clés">
        <p className="max-w-prose font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Auto-estimation à date · 0 % débutant → 100 % autonome senior
        </p>
        <StaggeredSkillsProgress items={skillsProgress} />
      </Section>

      {/* [03] Réflexion personnelle */}
      <Section num="03" title="Réflexion personnelle">
        <p className="max-w-prose font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Trois constats honnêtes en sortie de BAC 3.
        </p>

        <StaggeredReflectionBlocks />
      </Section>

      {/* Citation philosophie */}
      <blockquote className="mt-20 border-l-2 border-accent pl-6">
        <p className="max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl">
          Je ne prétends pas tout savoir, mais j&apos;ai la certitude de
          pouvoir tout apprendre. Chaque défi technique est une opportunité de
          croissance, chaque échec une leçon précieuse. Mon parcours atypique
          est ma force : il m&apos;a appris l&apos;adaptabilité et la
          persévérance.
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          — Ma philosophie d&apos;apprentissage
        </p>
      </blockquote>

      {/* [04] Plan d'action */}
      <Section num="04" title="Mon plan d'action">
        <StaggeredActionPlan items={actionPlan} />
      </Section>

      {/* [05] Bilan & perspectives */}
      <Section num="05" title="Bilan & perspectives">
        <div className="border border-rule bg-mist p-8 md:p-10">
          <p className="max-w-3xl text-base leading-relaxed text-ink/85 md:text-lg">
            Après bientôt trois années de formation à l&apos;EPHEC, je mesure
            le chemin parcouru. De technicien hardware passionné, je suis
            devenu un étudiant IT polyvalent capable de naviguer entre
            infrastructure, développement et support. Mes lacunes sont
            identifiées et mon plan d&apos;action est clair. Je suis en stage
            et je continuerai à me former dans les spécialisations découvertes
            sur le terrain. L&apos;IT n&apos;est pas qu&apos;un domaine
            d&apos;études pour moi, c&apos;est une passion qui guide mes choix
            professionnels.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            — Mohamed Mokhtar El Mazani · avril 2026
          </p>
        </div>
      </Section>
    </main>
  );
}
