import type { Metadata } from "next";

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

const actionPlan = [
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

function ReflectionBlock({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
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
      <div className="max-w-prose text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </article>
  );
}

export default function AutoEvaluationPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [04] Auto-évaluation · lecture critique
      </p>

      <h1 className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl">
        Mesurer le
        <br />
        chemin parcouru<span className="text-accent">.</span>
      </h1>

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
        <div className="mt-8 space-y-6">
          {skillsProgress.map((s) => (
            <div key={s.name}>
              <div className="flex items-baseline justify-between">
                <p className="font-sans text-base">{s.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                  {s.value}%
                </p>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden bg-rule">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${s.value}%` }}
                  aria-valuenow={s.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* [03] Réflexion personnelle */}
      <Section num="03" title="Réflexion personnelle">
        <p className="max-w-prose font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          Trois constats honnêtes en sortie de BAC 3.
        </p>

        <div className="mt-10 space-y-12">
          <ReflectionBlock
            num="A"
            title="Le déclic — l'IT est un horizon, pas une checklist"
          >
            <p>
              En arrivant à l&apos;EPHEC, je voyais l&apos;informatique comme
              un ensemble fini de savoirs à acquérir : apprendre les bases,
              les répéter, devenir compétent. Le déclic est venu en
              progressant dans le cursus — j&apos;ai compris que le domaine
              est{" "}
              <span className="text-ink">infiniment plus vaste</span>
              {" "}que ce que j&apos;imaginais, et qu&apos;il évolue plus vite
              que la
              capacité d&apos;une formation à le couvrir.
            </p>
            <p className="mt-4">
              Cette prise de conscience a transformé mon rapport au métier.
              Je ne cherche plus à « finir d&apos;apprendre ». J&apos;accepte
              que ma carrière entière sera de la veille active, et c&apos;est
              une bonne nouvelle : ça veut dire que la curiosité — qui est
              ma matière première — restera utile bien plus longtemps que
              n&apos;importe quelle techno précise apprise pendant le BAC.
            </p>
          </ReflectionBlock>

          <ReflectionBlock
            num="B"
            title="Hors programme — la pratique sans deadline"
          >
            <p>
              Mes projets personnels — homelab 3 machines, sites web pour
              des amis, mini-applications, réparations clients — m&apos;ont
              appris quelque chose que les cours ne pouvaient pas :{" "}
              <span className="text-ink">
                la pratique répétée sans contrainte de temps.
              </span>
            </p>
            <p className="mt-4">
              À l&apos;école, j&apos;ai souvent étudié au minimum pour
              réussir un examen. Sur mon homelab, je peux casser, refaire,
              comprendre vraiment pourquoi un service ne démarre pas, lire
              les logs jusqu&apos;à ce que ce soit clair. C&apos;est cette
              répétition lente, sans note à la clé, qui ancre les
              apprentissages. La formation m&apos;a donné le cadre théorique
              ; les projets perso m&apos;ont donné la mémoire musculaire.
              Les deux sont indispensables — mais je sais maintenant
              lesquels me font le plus progresser.
            </p>
          </ReflectionBlock>

          <ReflectionBlock
            num="C"
            title="L'angle mort — vouloir tout embrasser"
          >
            <p>
              Ma vraie faiblesse en fin de BAC n&apos;est pas un manque de
              compétences techniques. C&apos;est l&apos;inverse : je veux{" "}
              <span className="text-ink">tout apprendre, tout comprendre</span>
              , au lieu de choisir un domaine et de m&apos;y enfoncer
              vraiment. Le revers de la curiosité est la dispersion, et je
              dois travailler ça.
            </p>
            <p className="mt-4">
              J&apos;assume aussi un autre angle mort : je mets un peu plus
              de temps que d&apos;autres à intégrer un nouveau concept.
              Cette lenteur n&apos;est pas un blocage — quand j&apos;ai
              compris, j&apos;ai compris pour de bon — mais elle suppose une
              discipline d&apos;apprentissage que je dois assumer. Mon stage
              VoIP à Ottignies-LLN est précisément le terrain pour
              transformer cette lenteur en méthode : prendre le temps
              d&apos;analyser l&apos;existant avant d&apos;agir, plutôt que
              de réagir vite et mal.
            </p>
          </ReflectionBlock>
        </div>
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
        <div className="grid gap-px bg-rule md:grid-cols-2">
          {actionPlan.map((p, i) => (
            <article key={p.title} className="flex flex-col bg-mist p-6 md:p-8">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")} · {p.horizon}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                  {p.period}
                </p>
              </div>
              <h3 className="mt-4 font-display text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
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
