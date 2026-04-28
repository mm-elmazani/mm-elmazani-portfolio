import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Mohamed Mokhtar El Mazani",
  description:
    "CV de Mohamed Mokhtar El Mazani — étudiant BAC 3 TI à l'EPHEC. Formation, expériences, compétences hardware, réseaux, infrastructure.",
};

type TimelineItem = {
  date: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  description?: string;
};

const formations: TimelineItem[] = [
  {
    date: "2023 — aujourd'hui",
    title: "Bachelier en Technologies de l'Informatique",
    subtitle: "EPHEC · Louvain-la-Neuve",
    description:
      "Formation complète en informatique : développement, réseaux, sécurité, infrastructure, gestion de projets. Cursus incluant un stage d'insertion professionnelle.",
  },
  {
    date: "2022",
    title: "CESS · Sciences Économiques — immersion anglais",
    subtitle: "CEPES de Jodoigne",
    description:
      "Certificat d'enseignement secondaire supérieur avec option immersion anglaise.",
  },
  {
    date: "Février 2020",
    title: "Séjour linguistique anglais",
    subtitle: "Broadstairs, Angleterre",
    description:
      "Une semaine d'immersion en école de langue (Broadstairs + journée à Londres) pour perfectionner l'anglais.",
  },
];

const experiences: TimelineItem[] = [
  {
    date: "Février — mai 2026",
    title: "Stage d'insertion professionnelle — Migration serveur VoIP",
    subtitle: "Administration communale d'Ottignies-Louvain-la-Neuve",
    description:
      "Migration de l'infrastructure VoIP de la commune. Analyse de l'existant, planification de la bascule, configuration et tests en environnement de production.",
  },
  {
    date: "2020 — aujourd'hui",
    title: "Assistance informatique aux particuliers",
    subtitle: "Travailleur indépendant",
    bullets: [
      "Montage & installation d'environ 10 PC sur mesure",
      "Réinstallation Windows, dépannage et support utilisateur",
      "Remplacement SSD/RAM, diagnostic matériel",
      "Support à distance (Remote Desktop)",
      "Réparation de smartphones : écrans, batteries, ports",
    ],
  },
  {
    date: "Juillet 2023",
    title: "Technicien de surface",
    subtitle: "ISS · Bruxelles — job étudiant",
    description:
      "Rigueur, organisation et travail en équipe dans un environnement professionnel exigeant.",
  },
];

const skills: { group: string; items: string[] }[] = [
  {
    group: "Hardware",
    items: ["Montage & diagnostic PC", "Réparation smartphones", "Soudure électronique"],
  },
  {
    group: "Réseaux",
    items: ["Cisco Packet Tracer", "Wireshark", "TCP/IP", "VLAN"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Linux / Windows Server", "DNS / DHCP", "HTTPS / SSL"],
  },
  {
    group: "Virtualisation",
    items: ["VMware", "VirtualBox", "Proxmox"],
  },
  {
    group: "Développement",
    items: ["Python (bases)", "JavaScript (MERN)", "HTML / CSS", "MongoDB", "Git"],
  },
  {
    group: "IoT & Électronique",
    items: ["Raspberry Pi / Pico", "Arduino", "MQTT", "Capteurs"],
  },
];

const languages = [
  { lang: "Français", level: 5, note: "C2 · langue maternelle" },
  { lang: "Anglais", level: 4, note: "B2 · intermédiaire avancé" },
  { lang: "Arabe", level: 3, note: "Darija · dialecte marocain · parlé" },
];

const softSkills = [
  "Esprit d'équipe et autonomie",
  "Rigueur et organisation",
  "Curiosité technique et envie d'apprendre",
  "Responsabilité, gestion du stress, écoute active",
];

const projects = [
  {
    title: "TFE — Migration serveur VoIP",
    desc: "Travail de fin d'études : migration de l'infrastructure VoIP de la commune d'Ottignies-Louvain-la-Neuve. Analyse de l'existant, planification, configuration et bascule en production.",
    stack: ["VoIP", "Réseaux", "Linux", "Production"],
  },
  {
    title: "VPS Infrastructure",
    desc: "Mise en place d'un VPS complet : Docker, DNS public, serveur web HTTPS, service mail.",
    stack: ["Docker", "Linux", "DNS", "SSL"],
  },
  {
    title: "PowerTrack",
    desc: "Application web pour contrôler une multiprise connectée et suivre la consommation en temps réel.",
    stack: ["MERN", "IoT", "MQTT"],
  },
  {
    title: "PC Gaming Custom",
    desc: "Assemblage et optimisation de PC gaming pour clients : overclocking, benchmarking.",
    stack: ["Hardware", "Windows", "OC"],
  },
];

const interests = [
  "Hardware PC",
  "Photographie & cinéma",
  "Gaming",
  "Nouvelles technologies",
  "Sport",
];

function Card({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-rule bg-mist p-6 md:p-8">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        [{num}] {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function TimelineBlock({ items }: { items: TimelineItem[] }) {
  return (
    <div className="divide-y divide-rule">
      {items.map((it, idx) => (
        <div
          key={it.title}
          className={`grid gap-3 md:grid-cols-[170px_1fr] md:gap-8 ${
            idx === 0 ? "pb-6" : "py-6"
          } ${idx === items.length - 1 ? "pt-6 pb-0" : ""}`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            {it.date}
          </p>
          <div>
            <h3 className="font-display text-lg md:text-xl">{it.title}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
              {it.subtitle}
            </p>
            {it.description && (
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                {it.description}
              </p>
            )}
            {it.bullets && (
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/80">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="select-none text-accent">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CVPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-14 md:px-12 md:py-24">
      {/* Éyebrow + hero */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
        [01] CV · mis à jour avril 2026
      </p>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-medium leading-[0.95] md:text-7xl">
            Mohamed Mokhtar
            <br />
            El Mazani<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
            Étudiant BAC 3 · Technologies de l&apos;Informatique · EPHEC
          </p>
        </div>

        <a
          href="/files/cv-mohamed-elmazani.pdf"
          download="CV-Mohamed-El-Mazani.pdf"
          className="group inline-flex items-center gap-3 border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-bone"
        >
          Télécharger PDF
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
      </div>

      {/* Contact row */}
      <div className="mt-10 grid gap-4 border-y border-rule py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-ash sm:grid-cols-3">
        <div>
          <span className="text-ash">Email · </span>
          <a
            href="mailto:mohamedelmazani.pro@gmail.com"
            className="text-ink transition-colors hover:text-accent"
          >
            mohamedelmazani.pro@gmail.com
          </a>
        </div>
        <div>
          <span className="text-ash">Localité · </span>
          <span className="text-ink">Jodoigne (1370), Belgique</span>
        </div>
        <div>
          <span className="text-ash">Mobilité · </span>
          <span className="text-ink">Permis B</span>
        </div>
      </div>

      {/* Grid 2 colonnes : sidebar + main */}
      <div className="mt-12 grid gap-6 md:grid-cols-[300px_1fr] md:gap-8">
        {/* SIDEBAR — skills / soft / langues */}
        <aside className="flex flex-col gap-6">
          <Card num="01" title="Compétences techniques">
            <div className="space-y-5">
              {skills.map((s) => (
                <div key={s.group}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    {s.group}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <li
                        key={i}
                        className="rounded-full border border-rule px-3 py-1 text-xs"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <Card num="02" title="Soft skills">
            <ul className="space-y-2 text-sm">
              {softSkills.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="select-none text-accent">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card num="03" title="Langues">
            <div className="space-y-4">
              {languages.map((l) => (
                <div key={l.lang}>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base">{l.lang}</p>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((d) => (
                        <span
                          key={d}
                          className={`h-1.5 w-1.5 rounded-full ${
                            d <= l.level ? "bg-accent" : "bg-rule"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                    {l.note}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* MAIN — formation / exp / projets / intérêts */}
        <div className="flex flex-col gap-6">
          <Card num="04" title="Formation">
            <TimelineBlock items={formations} />
          </Card>

          <Card num="05" title="Expérience professionnelle">
            <TimelineBlock items={experiences} />
          </Card>

          <Card num="06" title="Projets & réalisations">
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="flex h-full flex-col border border-rule p-5"
                >
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card num="07" title="Centres d'intérêt">
            <ul className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <li
                  key={i}
                  className="rounded-full border border-rule px-4 py-1.5 text-sm"
                >
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
