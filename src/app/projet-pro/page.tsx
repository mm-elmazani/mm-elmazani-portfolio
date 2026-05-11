import type { Metadata } from "next";
import {
  Award,
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
  Server,
  Sparkles,
  Target,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  type Interest,
  StaggeredInterestCards,
} from "@/components/StaggeredInterestCards";
import { TypewriterTitle } from "@/components/TypewriterTitle";

export const metadata: Metadata = {
  title: "Projet professionnel — Mohamed Mokhtar El Mazani",
  description:
    "Projet professionnel : cible stage, forces, axes de travail, trajectoire vers infrastructure IT et administration système.",
};

const interests: Interest[] = [
  {
    title: "Infrastructure IT",
    desc: "Administration système, virtualisation, cloud. Comprendre l'architecture qui fait tourner les applications.",
    image: "/pictures/projet-pro/infrastructure-it.jpg",
  },
  {
    title: "Hardware & diagnostic",
    desc: "Montage PC, réparation, optimisation. Passion pour le matériel et la recherche de performance.",
    image: "/pictures/projet-pro/hardware-diagnostic.jpg",
  },
  {
    title: "Support technique",
    desc: "Résolution de problèmes, assistance utilisateurs. Contact humain et satisfaction d'aider.",
    image: "/pictures/projet-pro/technical-support.jpg",
  },
];

const forces = [
  "Curiosité technique — j'apprends vite sur du nouveau matériel/logiciel quand le sujet m'intéresse.",
  "Polyvalence hardware/software — à l'aise autant avec un fer à souder qu'avec un terminal Linux.",
  "Autonomie et rigueur — habitué à travailler seul sur des dépannages clients depuis 2020.",
  "Sens du service — écoute active, gestion du stress et capacité à vulgariser pour un non-technique.",
];

const axes = [
  "Prise de parole et documentation technique : structurer ma pensée à l'écrit et à l'oral.",
  "Scripting avancé (Bash / PowerShell / Python) : automatiser les tâches répétitives.",
  "Gestion de projet : estimation, priorisation, travail en équipe Agile.",
];

const skills: { group: string; icon: LucideIcon; items: string[] }[] = [
  {
    group: "Techniques",
    icon: Terminal,
    items: [
      "Administration Linux / Windows Server avancée",
      "Automatisation (Bash, PowerShell, Python)",
      "Monitoring et performances",
      "Sécurisation des infrastructures",
    ],
  },
  {
    group: "Professionnelles",
    icon: Users,
    items: [
      "Gestion de projet IT",
      "Documentation technique",
      "Communication client",
      "Résolution de problèmes sous pression",
    ],
  },
  {
    group: "Certifications visées",
    icon: Award,
    items: [
      "CompTIA A+ (court terme)",
      "LPIC-1 — Linux Administrator (court terme)",
      "CompTIA Security+ (après stage)",
    ],
  },
];

const timeline: { date: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    date: "2023 — juin 2026",
    title: "Bachelier TI · EPHEC",
    desc: "Formation complète : développement, réseaux, sécurité, infrastructure, gestion de projets.",
    icon: GraduationCap,
  },
  {
    date: "Février — mai 2026",
    title: "Stage — Migration serveur VoIP · Commune d'Ottignies-LLN",
    desc: "En cours. Expérience terrain pour affiner mes choix et confronter mes compétences au réel.",
    icon: Briefcase,
  },
  {
    date: "Post-études",
    title: "Poursuite de la formation",
    desc: "Continuer à me former dans les spécialisations découvertes en stage (infra, admin système, hardware) via certifications et expérience terrain.",
    icon: Sparkles,
  },
  {
    date: "Horizon 2-3 ans",
    title: "Technicien / Ingénieur Infrastructure IT",
    desc: "Cible métier : Data Center Technician / Engineer, Infrastructure Engineer. Consolidation technique + spécialisation.",
    icon: Target,
  },
];

const companies: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "ESN / Consulting IT",
    desc: "Diversité des clients et projets, exposition à plusieurs technologies et problématiques.",
    icon: Building2,
  },
  {
    title: "PME industrielle",
    desc: "L'aspect concret et tangible de l'IT au service de la production, défis hardware/software.",
    icon: Factory,
  },
  {
    title: "Secteur public",
    desc: "Impact social positif, enjeux de sécurité et fiabilité des systèmes critiques au service des citoyens.",
    icon: Landmark,
  },
  {
    title: "Data center",
    desc: "Le cœur névralgique de l'infrastructure IT moderne : serveurs à l'échelle, réseaux haute performance, rigueur opérationnelle 24/7.",
    icon: Server,
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

export default function ProjetProPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [02] Projet professionnel · phase consolidation
      </p>

      <TypewriterTitle
        text="En apprentissage constant."
        className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl"
      />

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
        En BAC 3 TI, je ne cherche pas à figer un plan de carrière rigide. Je{" "}
        <span className="text-ink">consolide actuellement mes bases</span>
        {" "}sur le terrain via mon stage à l&apos;administration communale
        d&apos;Ottignies-LLN. Je confronte mes compétences au réel et je
        laisse cette expérience orienter mes choix futurs.
      </p>

      {/* Philosophie — citation */}
      <blockquote className="mt-12 border-l-2 border-accent pl-6">
        <p className="max-w-2xl text-base leading-relaxed text-ink/80">
          Avant d&apos;être un étudiant TI, j&apos;ai été un curieux qui
          démontait des PC. C&apos;est cette curiosité, plus que les diplômes,
          qui m&apos;amènera là où je veux aller.
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          — M.M. El Mazani
        </p>
      </blockquote>

      {/* [01] Domaines d'intérêt */}
      <Section num="01" title="Mes domaines d'intérêt">
        <StaggeredInterestCards interests={interests} />
      </Section>

      {/* [02] Forces */}
      <Section num="02" title="Mes forces">
        <ul className="grid max-w-3xl gap-3">
          {forces.map((f, i) => (
            <li
              key={f}
              className="flex gap-4 border-b border-rule pb-3 text-base leading-relaxed"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* [03] Axes de travail */}
      <Section num="03" title="Axes de travail (faiblesses à renforcer)">
        <ul className="grid max-w-3xl gap-3">
          {axes.map((a, i) => (
            <li
              key={a}
              className="flex gap-4 border-b border-rule pb-3 text-base leading-relaxed"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* [04] Compétences à développer */}
      <Section num="04" title="Compétences à développer">
        <div className="grid gap-8 md:grid-cols-3">
          {skills.map((s) => {
            const Icon = s.icon;
            return (
            <div key={s.group}>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                <Icon aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
                {s.group}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="select-none text-accent">·</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </Section>

      {/* [05] Trajectoire */}
      <Section num="05" title="Trajectoire">
        <div className="divide-y divide-rule border-y border-rule">
          {timeline.map((t) => {
            const Icon = t.icon;
            return (
            <div
              key={t.title}
              className="grid gap-3 py-6 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                {t.date}
              </p>
              <div>
                <h3 className="flex items-center gap-3 font-display text-xl">
                  <Icon aria-hidden className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                  {t.title}
                </h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/80">
                  {t.desc}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </Section>

      {/* [06] Types d'entreprises */}
      <Section num="06" title="Types d'entreprises visées">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {companies.map((c) => {
            const Icon = c.icon;
            return (
            <article key={c.title} className="border border-rule bg-mist p-6">
              <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-lg">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {c.desc}
              </p>
            </article>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <section className="mt-24 border-t border-rule pt-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Contact
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          Ouvert aux échanges — stage, opportunité, ou simple discussion autour
          de l&apos;infrastructure IT.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:mohamedelmazani.pro@gmail.com"
            className="group inline-flex items-center gap-3 border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            Me contacter
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="/cv"
            className="group inline-flex items-center gap-3 border border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Voir mon CV
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
