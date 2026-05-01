/**
 * Données activités du portfolio.
 * Migrées depuis V1 + complétées pour rubric EPHEC (Lieu + Heures réelles obligatoires).
 *
 * À compléter par l'étudiant lors du content review :
 * - location (lieu)
 * - realHours (heures réelles, ≥ valorisées)
 * - proof.url (lien public vers la preuve)
 */

export type ActivityType =
  | "Hackathon"
  | "Formation en ligne"
  | "Formation présentiel"
  | "Conférence"
  | "Visite entreprise"
  | "Salon"
  | "IT Job Day"
  | "Autre";

export type Reflection = {
  context: string;
  facts: string;
  projectLink: string;
  skills: string;
  conclusion: string;
};

export type ProofLink = {
  label: string;
  url: string;
};

export type Proof = {
  type: string;
  description: string;
  url?: string | null; // lien public principal, sinon "[À compléter]" affiché
  file?: string; // metadata fichier source local (info)
  images?: string[]; // chemins publics vers une galerie d'images (sous-dossier public/files/proofs/<slug>/...)
  links?: ProofLink[]; // galerie de liens cliquables (repos, sites, etc.)
};

export type Activity = {
  id: string;
  slug: string;
  theme: string;
  title: string;
  type: ActivityType;
  hoursValued: number; // heures valorisées (rubric)
  realHours: number | null; // heures réelles (rubric, ≥ valorisées)
  realHoursOngoing?: boolean; // true → afficher "+Xh" (activité encore en cours)
  date: string; // ISO YYYY-MM-DD
  location: string | null; // lieu (rubric)
  status: "completed" | "ongoing" | "planned";
  proof: Proof;
  description: string;
  reflection: Reflection;
  skills: string[];
};

export const activities: Activity[] = [
  {
    id: "act_001",
    slug: "hackathon-electro-2024",
    theme: "Électronique & innovation",
    title: "Hackathon Électro 2024 — Retour vers le futur",
    type: "Hackathon",
    hoursValued: 10,
    realHours: 48,
    date: "2024-10-25",
    location: "EPHEC, Louvain-la-Neuve",
    status: "completed",
    proof: {
      type: "Photos du projet baffle Bluetooth + mails d'invitation officiels",
      description:
        "Photo de l'équipe pendant le hackathon, photo du tamtam d'origine récupéré, plan de construction du baffle, liste d'objets utilisés, plans de travail et soudure des composants + 4 mails officiels EPHEC (invitation, réunion préparatoire Teams, confirmation participation, mention).",
      url: "/files/proofs/hackathon-electro-2024/photo-hackathon-2024.jpg",
      file: "public/files/proofs/hackathon-electro-2024/",
      images: [
        "/files/proofs/hackathon-electro-2024/photo-hackathon-2024.jpg",
        "/files/proofs/hackathon-electro-2024/tamtam.jpg",
        "/files/proofs/hackathon-electro-2024/plan-construction-baffle.png",
        "/files/proofs/hackathon-electro-2024/liste-objets-hackathon.png",
        "/files/proofs/hackathon-electro-2024/plan-travail-1.jpg",
        "/files/proofs/hackathon-electro-2024/plan-travail-2.jpg",
        "/files/proofs/hackathon-electro-2024/soudure.jpg",
      ],
    },
    description:
      "Mon tout premier hackathon : 48h à l'EPHEC sur le thème « récupérer de l'ancien pour imaginer et créer des produits modernes ». Avec mon équipe, nous avons transformé un vieux tamtam en baffle Bluetooth fonctionnel — un week-end intense entre challenge technique et amusement.",
    reflection: {
      context:
        "C'était mon tout premier hackathon — toutes catégories confondues. Quand l'EPHEC a annoncé le Hackathon Électro 2024 organisé par les professeurs de la section TI sur le thème « récupérer de l'ancien pour imaginer et créer des produits modernes », j'étais super excité à l'idée de participer à ce week-end : 48h non-stop avec une équipe, du matériel à récupérer, un défi à relever. Je n'avais aucune idée de ce qu'allait être réellement un hackathon avant d'y entrer, et c'est exactement ce qui me motivait — vivre l'expérience pour la comprendre.",
      facts:
        "Avec mon équipe, on a transformé un vieux tamtam en baffle Bluetooth fonctionnel. Le tamtam servait de caisse de résonance, on a intégré un module Bluetooth, un amplificateur, une batterie, un haut-parleur, et on a fini par avoir un objet hybride : à la fois instrument du passé et speaker connecté. Les 48h se sont articulées autour d'une réunion préparatoire Teams en amont, puis un week-end complet sur place : brainstorming, planches de construction (cf. preuves photos), liste d'objets à récupérer, phases de soudure et d'assemblage, et présentation finale du prototype face au jury.",
      projectLink:
        "Cette expérience m'a permis d'explorer concrètement la création d'objets connectés à partir de matériel récupéré — exactement le type de prototypage IoT low-tech qui rejoint mon projet pro orienté infrastructure et hardware. Plus largement, ce hackathon m'a confirmé que je m'épanouis dans des contextes où il faut produire vite, avec des contraintes fortes et une équipe qui cherche en parallèle. C'est un format que je veux retrouver en milieu pro.",
      skills:
        "Au-delà du prototypage électronique pur (soudure, intégration Bluetooth, gestion d'alimentation), j'ai surtout développé ma capacité à collaborer sous pression : répartir les tâches en quelques minutes, accepter les idées des autres, trancher rapidement quand on bloque. J'ai aussi appris à itérer sur un design quand le matériel récupéré ne se comporte pas comme prévu — accepter de jeter une piste pour en relancer une autre sans s'attacher.",
      conclusion:
        "Si je devais résumer ce week-end en deux mots, ce serait challenge et amusement. C'était surtout un super moment passé avec mes collègues d'équipe — la pression, la fatigue, les blagues qui sortent à 2h du matin quand un câble lâche, c'est ce qui rend l'expérience inoubliable. J'en suis ressorti convaincu que les hackathons ne sont pas juste un format scolaire : c'est un terrain réel pour apprendre à livrer ensemble, et je compte en refaire d'autres.",
    },
    skills: [
      "Prototypage électronique",
      "Travail d'équipe",
      "Innovation durable",
      "Créativité",
      "Gestion du temps",
      "Communication technique",
    ],
  },
  {
    id: "act_002",
    slug: "reparation-smartphones-2024",
    theme: "Hardware",
    title: "Réparation de smartphones pour particuliers",
    type: "Autre",
    hoursValued: 8,
    realHours: 12.5,
    date: "2024-02-10",
    location: "Domicile / Jodoigne",
    status: "completed",
    proof: {
      type: "Photos & vidéos des 5 réparations",
      description:
        "Photos avant/après et vidéos de démontage/remontage des 5 smartphones réparés (remplacement d'écrans, batteries, ports de charge).",
      url: "/files/proofs/reparation-smartphones-2024/reparation_tel_1.0.jpeg",
      file: "public/files/proofs/reparation-smartphones-2024/",
      images: [
        "/files/proofs/reparation-smartphones-2024/reparation_tel_1.0.jpeg",
        "/files/proofs/reparation-smartphones-2024/reparation_tel_2.0.jpeg",
        "/files/proofs/reparation-smartphones-2024/reparation_tel_2.1.jpeg",
        "/files/proofs/reparation-smartphones-2024/reparation_tel_3.0.jpeg",
      ],
      links: [
        {
          label: "Vidéo réparation tél 1 — étape 1 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_1.1.mp4",
        },
        {
          label: "Vidéo réparation tél 1 — étape 2 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_1.2.mp4",
        },
        {
          label: "Vidéo réparation tél 2 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_2.2.mp4",
        },
        {
          label: "Vidéo réparation tél 3 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_3.0.mp4",
        },
        {
          label: "Vidéo réparation tél 4 — étape 1 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_4.0.mp4",
        },
        {
          label: "Vidéo réparation tél 4 — étape 2 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_4.1.mp4",
        },
        {
          label: "Vidéo réparation tél 5 (MP4)",
          url: "/files/proofs/reparation-smartphones-2024/reparation_tel_5.0.mp4",
        },
      ],
    },
    description:
      "Depuis fin 2023, je répare des smartphones à la maison pour des amis et des membres de ma famille — principalement des iPhones (écran, batterie, caméra) et plus rarement un Samsung. Cette pratique a démarré par envie d'élargir mes réparations au-delà des PC, et continue aujourd'hui de manière régulière.",
    reflection: {
      context:
        "Vers la fin de 2023, j'ai commencé à réparer des smartphones à la maison pour des amis et des membres de ma famille. À la base, je réparais déjà des PC — portables ou fixes — et je voulais découvrir un autre type de réparation, plus minutieux et avec des contraintes différentes : composants encore plus petits, étanchéité à respecter, peu de tolérance pour l'erreur. Les smartphones sont aussi le matériel que tout le monde dans mon entourage utilise au quotidien, donc les demandes arrivaient naturellement.",
      facts:
        "J'ai principalement réparé des iPhones — changement d'écran, remplacement de batterie, changement de caméra — ce sont les pannes les plus fréquentes que mon entourage me ramène. J'ai aussi réparé une seule fois un Samsung. Chaque intervention prend en moyenne 2h30 entre le diagnostic, la commande de la pièce d'origine ou compatible, le démontage minutieux, le remplacement et le remontage avec test fonctionnel. Les preuves jointes (photos avant/après + vidéos de démontage/remontage) couvrent 5 réparations parmi celles que j'ai effectuées.",
      projectLink:
        "Cette activité renforce directement mes compétences en diagnostic et résolution de problèmes hardware, essentielles pour un futur technicien IT. La capacité à réparer et maintenir du matériel informatique — du PC au smartphone — est un atout majeur dans le support technique, domaine que je vise pour mon stage.",
      skills:
        "J'ai perfectionné ma dextérité et ma précision dans la manipulation de composants fragiles (nappes, connecteurs, joints d'étanchéité). J'ai appris à gérer la relation directe avec la personne dont je répare le téléphone : poser les bonnes questions au diagnostic, expliquer ce qu'on va faire, communiquer clairement sur le délai et le coût des pièces. C'est aussi une activité qui m'a appris à gérer ma frustration quand une pièce arrive défectueuse ou qu'un démontage tourne mal.",
      conclusion:
        "Cette pratique m'a confirmé mon intérêt pour le hardware et m'a donné confiance dans ma capacité à gérer des interventions techniques de manière autonome, de A à Z. Je continue aujourd'hui à accepter les réparations qu'on me propose et je prévois d'étendre progressivement aux tablettes.",
    },
    skills: [
      "Hardware",
      "Diagnostic",
      "Micro-soudure",
      "Relation client",
      "Précision technique",
    ],
  },
  {
    id: "act_003",
    slug: "montage-pc-gaming-2024",
    theme: "Hardware",
    title: "Montage PC Gaming sur mesure",
    type: "Autre",
    hoursValued: 5,
    realHours: 12,
    date: "2024-01-20",
    location: "Domicile / Jodoigne",
    status: "completed",
    proof: {
      type: "Photos & vidéos des montages + réparation PC",
      description:
        "Photos et vidéos de plusieurs assemblages de PC gaming sur mesure et d'une intervention de réparation matérielle.",
      url: "/files/proofs/montage-pc-gaming-2024/montage_pc_1.0.jpeg",
      file: "public/files/proofs/montage-pc-gaming-2024/",
      images: [
        "/files/proofs/montage-pc-gaming-2024/montage_pc_1.0.jpeg",
        "/files/proofs/montage-pc-gaming-2024/montage_pc_2.0.jpeg",
      ],
      links: [
        {
          label: "Vidéo montage PC 1 (MP4)",
          url: "/files/proofs/montage-pc-gaming-2024/montage_pc_1.1.mp4",
        },
        {
          label: "Vidéo montage PC 2 (MP4)",
          url: "/files/proofs/montage-pc-gaming-2024/montage_pc_2.1.mp4",
        },
        {
          label: "Vidéo montage PC 3 (MP4)",
          url: "/files/proofs/montage-pc-gaming-2024/montage_pc_3.0.mp4",
        },
        {
          label: "Vidéo réparation PC — étape 1 (MP4)",
          url: "/files/proofs/montage-pc-gaming-2024/reparation_pc_1.0.mp4",
        },
        {
          label: "Vidéo réparation PC — étape 2 (MP4)",
          url: "/files/proofs/montage-pc-gaming-2024/reparation_pc_1.1.mp4",
        },
      ],
    },
    description:
      "Assemblage de plusieurs PC gaming sur mesure pour des particuliers (configurations adaptées à différents besoins et budgets) et intervention de réparation matérielle sur un poste existant.",
    reflection: {
      context:
        "Depuis début 2024, plusieurs personnes de mon entourage m'ont sollicité pour l'assemblage de PC gaming sur mesure ou pour le diagnostic et la réparation d'un PC existant. Ces interventions m'ont permis de mettre en pratique mes connaissances en hardware acquises durant ma formation EPHEC et mon expérience personnelle, en confrontant les choix de composants à des contraintes réelles (budget, usage, contraintes de boîtier, refroidissement).",
      facts:
        "J'ai monté trois configurations distinctes pour trois clients différents — chacune calibrée selon son usage cible (jeux visés, résolution, budget alloué) et son boîtier. Le déroulé type pour chaque montage : analyse des besoins, sélection des composants compatibles (CPU/GPU/RAM/alim/SSD/refroidissement), assemblage physique avec cable management soigné, installation de Windows 11 et des drivers, tests de stabilité et benchmarks. À cela s'ajoute une intervention de réparation matérielle sur un PC en panne (diagnostic, identification du composant défectueux, remplacement). Pour l'un des montages — config orientée 1440p haut de gamme (RTX 4070, Ryzen 7 5800X3D, 32GB DDR4) — j'ai poussé jusqu'à l'overclocking CPU/GPU et atteint 144 FPS constants en 1440p sur les titres AAA récents.",
      projectLink:
        "Cette expérience concrète en assemblage, diagnostic et optimisation hardware est directement applicable à mon futur métier en support IT et infrastructure. La capacité à conseiller, assembler, dépanner et optimiser des configurations matérielles est un atout central pour un technicien informatique — que ce soit sur poste utilisateur ou sur serveur.",
      skills:
        "J'ai approfondi mes connaissances sur l'architecture des PC modernes, l'optimisation des performances via BIOS, la gestion thermique et le diagnostic matériel par éliminations successives. Servir plusieurs clients aux profils différents m'a appris à traduire des besoins variés en solutions techniques cohérentes (et à dire non aux composants surdimensionnés pour l'usage). La documentation systématique de chaque montage m'a initié aux bonnes pratiques professionnelles : photos d'étapes, liste de pièces, notes BIOS.",
      conclusion:
        "Ces interventions m'ont donné une vision complète du cycle de vie d'un PC, de la conception à la livraison en passant par le SAV. Je souhaite maintenant transposer cette rigueur d'assemblage et de diagnostic vers les configurations serveur et workstation pour élargir mon champ de compétences vers l'infrastructure professionnelle.",
    },
    skills: [
      "Assemblage PC",
      "Optimisation Windows",
      "Conseil technique",
      "Gestion thermique",
      "Benchmarking",
    ],
  },
  {
    id: "act_004",
    slug: "labo-electronique-cables-2025",
    theme: "Électronique & innovation",
    title: "Laboratoire électronique — restauration de câbles",
    type: "Autre",
    hoursValued: 2,
    realHours: 2,
    date: "2025-04-05",
    location: "Labo électronique EPHEC, Louvain-la-Neuve",
    status: "completed",
    proof: {
      type: "Photo de la session de restauration",
      description:
        "Photo prise pendant la session de réparation des câbles du laboratoire électronique de l'EPHEC.",
      url: "/files/proofs/labo-electronique-cables-2025/restoration-cables-labo.jpeg",
      file: "public/files/proofs/labo-electronique-cables-2025/",
      images: [
        "/files/proofs/labo-electronique-cables-2025/restoration-cables-labo.jpeg",
      ],
    },
    description:
      "Session pratique de restauration des câbles du laboratoire électronique de l'EPHEC.",
    reflection: {
      context:
        "En avril 2025, les professeurs du laboratoire d'électronique de l'EPHEC ont sollicité de l'aide pour restaurer l'ensemble des câbles de test et de connexion du laboratoire. Ces câbles, utilisés intensivement par les étudiants depuis plusieurs années, présentaient des problèmes de connectivité et nécessitaient un diagnostic complet et des réparations.",
      facts:
        "J'ai passé 2 heures à diagnostiquer, réparer et tester plusieurs câbles. Les interventions incluaient : test de continuité au multimètre, identification des câbles défectueux, re-soudure des connexions endommagées.",
      projectLink:
        "Cette activité de maintenance pratique s'inscrit directement dans mes compétences en support technique et hardware. La capacité à diagnostiquer et réparer du matériel de laboratoire est une compétence transférable au support IT en entreprise, où la maintenance préventive et corrective du matériel est essentielle.",
      skills:
        "J'ai développé ma rigueur dans le diagnostic systématique et ma précision en micro-soudure.",
      conclusion:
        "Cette expérience courte mais intense m'a confirmé mon intérêt pour le hardware et le support technique. Elle démontre ma disponibilité à aider et ma polyvalence technique, qualités importantes pour un futur technicien IT.",
    },
    skills: [
      "Soudure CMS",
      "Lecture de schémas",
      "Multimètre",
      "Prototypage",
      "Précision manuelle",
    ],
  },
  {
    id: "act_005",
    slug: "tech-career-night-axa-2025",
    theme: "Communication & networking",
    title: "Tech Career Night — AXA Belgium",
    type: "Visite entreprise",
    hoursValued: 5,
    realHours: 5,
    date: "2025-10-13",
    location: "AXA Belgium, Place du Trône, Bruxelles",
    status: "completed",
    proof: {
      type: "Photos de la soirée + dossier preuves PDF (badge + programme)",
      description:
        "17 photos prises sur place : programme officiel, badge d'accès AXA, accueil et intro de Mathieu, présentations IA chez AXA (SecureGPT, GitHub Copilot, COO Assistant), présentations Business Transformation / programme CLUP, et photos de la soirée (Silent Disco, Speed Networking, Street Food). + dossier PDF compilant le badge et le programme.",
      url: "/files/proofs/tech-career-night-axa-2025/axa_tech_night_2025.pdf",
      file: "public/files/proofs/tech-career-night-axa-2025/",
      images: [
        "/files/proofs/tech-career-night-axa-2025/axa-01-programme.png",
        "/files/proofs/tech-career-night-axa-2025/axa-02-badge.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-03-accueil-intro-mathieu.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-04-accueil.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-05-activites-evenement.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-06-ia-axa-part1.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-07-ia-axa-part2.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-08-ia-axa-part4.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-09-ia-axa-part6.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-10-ia-axa-part8.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-11-ia-axa-part9.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-12-business-transformation-part1.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-13-business-transformation-part2.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-14-business-transformation-part5.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-15-soiree-1.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-16-soiree-2.jpg",
        "/files/proofs/tech-career-night-axa-2025/axa-17-soiree-3.jpg",
      ],
    },
    description:
      "Tech Career Night AXA Belgium au siège de Bruxelles. Découverte de l'innovation IT, IA, Cloud et transformation digitale dans l'assurance.",
    reflection: {
      context:
        "Le 13 octobre 2025, j'ai participé à la Tech Career Night organisée par AXA Belgium dans leurs locaux de la Place du Trône à Bruxelles. Cet événement visait à présenter les métiers IT du groupe, leurs innovations technologiques et à créer des opportunités de networking entre étudiants et professionnels du secteur.",
      facts:
        "La soirée s'est articulée autour de trois activités principales. D'abord, le Silent Disco avec deux présentations immersives : l'une sur l'intégration de l'IA chez AXA (SecureGPT, GitHub Copilot, COO Assistant) et l'autre sur la transformation digitale avec le programme CLUP. J'ai découvert leur stack technique moderne : TypeScript, Angular, Java Spring Boot, PostgreSQL, MongoDB et AWS. Ensuite, le Speed Networking m'a permis d'échanger avec quatre professionnels IT : un testeur, un Head of Network, un DevOps Cloud et un Feature Manager. La soirée s'est conclue par un Street Food Dinner propice aux échanges informels avec les RH et autres participants.",
      projectLink:
        "Cet événement s'inscrit parfaitement dans ma recherche de stage en infrastructure IT. La découverte concrète de l'utilisation de l'IA et du Cloud dans une grande entreprise m'a donné une vision claire des compétences recherchées sur le marché. Les contacts établis, notamment avec les RH du département IT, pourront déboucher sur des opportunités de stage. Cette expérience confirme mon intérêt pour les environnements techniques complexes où innovation et sécurité sont primordiales.",
      skills:
        "J'ai développé mes compétences en networking professionnel, apprenant à présenter mon parcours de manière concise lors du speed networking. J'ai approfondi ma compréhension de l'IA appliquée en entreprise, notamment les modèles GPT et leur intégration sécurisée. Ma culture technique s'est enrichie sur les architectures Cloud AWS et les pratiques DevOps. J'ai également amélioré ma capacité à échanger en anglais technique, certaines présentations étant dans cette langue.",
      conclusion:
        "Cette Tech Career Night a dépassé mes attentes en termes d'apprentissage et de networking. Elle m'a permis de comprendre concrètement comment une grande entreprise comme AXA utilise les technologies de pointe tout en maintenant sécurité et conformité. Les connexions LinkedIn établies et les échanges avec les RH ouvrent des perspectives concrètes pour mon stage. Je compte maintenir ces contacts et postuler aux opportunités de stage chez AXA, fort de cette première immersion dans leur culture d'entreprise.",
    },
    skills: [
      "Networking professionnel",
      "Cloud AWS",
      "Communication",
      "Anglais technique",
      "Culture d'entreprise",
      "Transformation digitale",
    ],
  },
  {
    id: "act_008",
    slug: "visite-sett-namur-2025",
    theme: "Salons & veille techno",
    title: "SETT Expo — Salon Education Tech, Namur",
    type: "Salon",
    hoursValued: 5,
    realHours: 7,
    date: "2026-01-29",
    location: "Namur Expo, Namur",
    status: "completed",
    proof: {
      type: "Mail d'invitation + galerie photos sur place",
      description:
        "Mail d'invitation officiel au salon SETT Namur + 15 photos prises sur place (stands, démonstrations, ambiance, échanges avec les exposants).",
      url: "/files/proofs/visite-sett-namur-2025/sett-namur-mail-invitation.png",
      file: "public/files/proofs/visite-sett-namur-2025/",
      images: [
        "/files/proofs/visite-sett-namur-2025/sett-namur-mail-invitation.png",
        "/files/proofs/visite-sett-namur-2025/20260129_101817823_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103027438_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103029876_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103039653_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103046893_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103048727_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103259567_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103302494_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103354113_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103406533_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103607641_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_103610882_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_104056166_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_105549447_iOS.jpg",
        "/files/proofs/visite-sett-namur-2025/20260129_110614107_iOS.jpg",
      ],
      links: [
        {
          label: "Vidéo — visite du salon (MOV)",
          url: "/files/proofs/visite-sett-namur-2025/20260129_104132000_iOS.MOV",
        },
      ],
    },
    description:
      "Visite du SETT Expo (Salon Education Tech) à Namur Expo : découverte des solutions technologiques appliquées au secteur de l'éducation — tableaux blancs interactifs, outils pédagogiques IA, applications spécialisées — et networking avec des entreprises tech et professionnels du secteur.",
    reflection: {
      context:
        "Le 29 janvier 2026, j'ai visité le SETT (Salon Education Tech) à Namur Expo. Ce salon spécialisé rassemble exposants, enseignants, responsables IT du secteur éducatif et professionnels de l'EdTech autour des technologies appliquées à l'enseignement. L'objectif de ma visite était de découvrir des solutions IT déployées dans un secteur spécifique (l'éducation) et d'élargir mon réseau professionnel au-delà de mon cercle EPHEC.",
      facts:
        "J'ai exploré différentes innovations présentées sur les stands : tableaux blancs interactifs, outils pédagogiques basés sur l'intelligence artificielle, applications spécialisées pour l'enseignement primaire et secondaire. J'ai assisté à plusieurs démonstrations de produits et échangé avec des représentants commerciaux et techniques d'entreprises EdTech. J'ai également pu dialoguer avec des professionnels du secteur (enseignants, responsables IT d'écoles, intégrateurs), ce qui m'a permis de comprendre concrètement les contraintes de déploiement IT en milieu éducatif.",
      projectLink:
        "Bien que le SETT soit principalement orienté vers l'enseignement primaire et secondaire, cette visite a mis en lumière la polyvalence du métier IT et la manière dont des technologies complexes sont adaptées aux utilisateurs finaux dans des secteurs spécialisés. Pour mon projet pro orienté infrastructure IT, comprendre comment les solutions techniques se déploient en environnement éducatif renforce ma vision des contraintes terrain (parc hétérogène, utilisateurs non-experts, exigences de fiabilité). Cette visite confirme aussi mon intérêt pour les missions à fort contact utilisateur, où la valeur de l'IT se mesure à l'expérience délivrée.",
      skills:
        "J'ai développé mes compétences en networking professionnel (présenter mon parcours en quelques phrases, recueillir des contacts pertinents), enrichi ma culture EdTech et compris les enjeux d'intégration IT dans un secteur spécialisé. J'ai aussi appris à dialoguer avec différents profils (commerciaux, techniques, utilisateurs finaux) sur un même sujet — compétence transversale clé pour un futur technicien/ingénieur IT.",
      conclusion:
        "Cette visite m'a confirmé que l'IT touche tous les secteurs, et que la valeur ajoutée se trouve souvent dans l'adaptation des technologies aux besoins réels des utilisateurs. Je compte continuer à participer à des salons sectoriels (santé, industrie, finance, smart city) pour élargir ma vision du marché et identifier les domaines verticaux où mes compétences infra IT pourront s'exprimer pleinement.",
    },
    skills: [
      "Networking professionnel",
      "Veille techno sectorielle",
      "Culture EdTech",
      "Communication multi-profils",
      "Compréhension écosystème IT vertical",
    ],
  },
  {
    id: "act_007",
    slug: "conference-cybersecurite-redsystem-2025",
    theme: "Cybersécurité",
    title: "e-Session Cyber Sécurité — Red System",
    type: "Conférence",
    hoursValued: 1,
    realHours: 1,
    date: "2025-11-04",
    location: "En ligne · Microsoft Teams Live",
    status: "completed",
    proof: {
      type: "Mail d'invitation EPHEC + captures de la session",
      description:
        "Mail officiel de la coordinatrice de la section TI (Mme V. Van den Schrieck) validant explicitement la valorisation portfolio + 7 captures d'écran de la session Teams Live.",
      url: "/files/proofs/conference-cybersecurite-redsystem-2025/mail-invitation.png",
      file: "public/files/proofs/conference-cybersecurite-redsystem-2025/",
      images: [
        "/files/proofs/conference-cybersecurite-redsystem-2025/mail-invitation.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_110138000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_110502000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_110600000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_110733000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_111829000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_111948000_iOS.png",
        "/files/proofs/conference-cybersecurite-redsystem-2025/20251104_112507000_iOS.png",
      ],
    },
    description:
      "Conférence en ligne d'1h donnée par Mme Cynthia Collinet (Red System) : panorama des menaces cyber actuelles — fuites de données et force brute, attaques par macros Office, outils physiques du hacker (Flipper Zero, câble OMG), ransomware, deepfakes & IA criminelle.",
    reflection: {
      context:
        "Le 4 novembre 2025, j'ai assisté à l'e-Session « Cyber Sécurité » donnée par Mme Cynthia Collinet de Red System sur Microsoft Teams Live. La conférence était proposée par la coordinatrice de la section TI de l'EPHEC, Mme Virginie Van den Schrieck, et explicitement valorisable dans le cadre du portfolio. Initialement destinée aux étudiants eBusiness 1eB LLN et WLW dans le cadre du cours de Traitement de l'info, elle était ouverte à tous les étudiants intéressés par la cybersécurité appliquée.",
      facts:
        "La session, animée par Cynthia Collinet (Red System), couvrait un panorama des menaces actuelles visant un utilisateur professionnel. Au programme : (1) les fuites de données et les bases publiques type IntelligenceX, qui rendent un mot de passe compromis cassable instantanément quelle que soit sa complexité — couplé à une démo d'attaque par force brute sur des mots de passe simples ; (2) une démo d'attaque par macro Excel malveillante déclenchant un reverse shell (listener `nc -lvnp 1337` côté attaquant + serveur web Python en parallèle) ; (3) les outils physiques du hacker : le Flipper Zero (copie de badges RFID, capture de fréquences radio, IR), et surtout le câble OMG — un câble USB indiscernable d'un câble standard mais embarquant keylogger et serveur web ; (4) une démo de ransomware (GhostHeist) avec compte à rebours et rançon en bitcoin ; (5) l'IA au service de la cybercriminalité : deepfake vidéo, clonage vocal, appels frauduleux indétectables. Format mixte : slides théoriques + démos vidéo concrètes.",
      projectLink:
        "Plusieurs points touchent directement mon stage en infrastructure VoIP et mon futur métier de technicien IT : l'hygiène d'authentification sur les équipements télécoms et serveurs (rotation, gestionnaire, MFA) ; la sensibilisation des utilisateurs aux pièces jointes Office piégées, qui restent un vecteur d'attaque massif en PME ; et la vigilance face aux outils physiques type Flipper Zero ou câble OMG, qui menacent autant les badges d'accès que les postes de travail laissés sans surveillance. Un technicien IT n'a pas le luxe d'ignorer ces menaces — il en est souvent la première ligne de défense.",
      skills:
        "Plutôt qu'une nouvelle compétence technique, cette session a approfondi ma culture cyber sur des sujets que je connaissais en surface. J'ai consolidé mes repères sur les vecteurs d'attaque (macros Office, ingénierie sociale par pièce jointe, force brute), pris conscience de la dimension physique de la sécurité (Flipper Zero, câble OMG indiscernable d'un USB standard contenant keylogger + serveur web), et mis à jour ma compréhension des nouvelles menaces IA (deepfakes, clonage vocal, fraude au président). C'est une mise à niveau de culture, pas une nouvelle ligne de CV — mais c'est précisément ce dont j'avais besoin pour ne pas être naïf sur le terrain.",
      conclusion:
        "Je réinvestis ces apprentissages immédiatement : audit de mes propres mots de passe via Have I Been Pwned, activation MFA partout où c'est possible, durcissement des macros Office sur mon poste et ceux des clients que je dépanne. Plus structurellement, la session m'a donné une vision plus holistique de la sécurité — elle ne se limite pas à protéger un serveur, elle englobe l'utilisateur (ingénierie sociale via macros), le matériel (câbles malveillants type OMG), et l'infrastructure (politiques de mots de passe, MFA, hygiène d'accès). C'est exactement la posture que je veux ramener dans mon stage.",
    },
    skills: [
      "Cybersécurité",
      "Sécurité bureautique",
      "Vecteurs d'attaque (malwares)",
      "Bonnes pratiques de durcissement",
      "Sensibilisation utilisateur",
    ],
  },
  {
    id: "act_006",
    slug: "hackathon-upscaling-2025",
    theme: "Développement & Linux",
    title: "Hackathon Upscaling 2025 — Media Server Retro (PS2)",
    type: "Hackathon",
    hoursValued: 10,
    realHours: 48,
    date: "2025-10-24",
    location: "EPHEC, Louvain-la-Neuve",
    status: "completed",
    proof: {
      type: "PDFs : récap, invitation officielle, photos compilées",
      description:
        "Trois PDFs : courrier d'invitation officiel EPHEC × Wallonie Entreprendre, dossier compilé des photos du projet (PS2 modifiée en media server avec éclairage RGB), et PDF récap du hackathon.",
      url: "/files/proofs/hackathon-upscaling-2025/photo-preuves-hackathon.pdf",
      file: "public/files/proofs/hackathon-upscaling-2025/",
      images: [],
      links: [
        {
          label: "Courrier d'invitation officielle (PDF)",
          url: "/files/proofs/hackathon-upscaling-2025/courrier-invitation-officielle.pdf",
        },
        {
          label: "Photos du projet — PS2 media server (PDF)",
          url: "/files/proofs/hackathon-upscaling-2025/photo-preuves-hackathon.pdf",
        },
        {
          label: "Récap hackathon Upscaling 2025 (PDF)",
          url: "/files/proofs/hackathon-upscaling-2025/hackathon_upscaling_2025.pdf",
        },
      ],
    },
    description:
      "Hackathon Upcycling Challenge 48h (24-26 oct.) EPHEC × Wallonie Entreprendre. Transformation d'une PS2 hors service en media server moderne avec éclairage RGB.",
    reflection: {
      context:
        "J'ai participé au Hackathon Upscaling 2025 organisé par l'EPHEC et Wallonie Entreprendre les 24-26 octobre 2025 à Louvain-La-Neuve. L'événement rassemblait des équipes pluridisciplinaires avec pour objectif de moderniser d'anciens appareils électroniques en ajoutant de nouvelles fonctionnalités tout en préservant leur esthétique rétro. Notre équipe a choisi de transformer une console PlayStation 2 non fonctionnelle en media server moderne avec éclairage RGB.",
      facts:
        "Le projet s'est déroulé sur 48h intensives. Nous avons récupéré un boîtier de PS2 hors service et conçu un media server autonome en y intégrant un Raspberry Pi 2. Mon rôle principal était l'installation et la configuration du système d'exploitation LibreELEC, suivie de l'installation du service de streaming KODI. J'ai été confronté à plusieurs défis techniques : compatibilité matérielle avec le Raspberry Pi 2 (architecture ARM limitée), optimisation des performances sur ce hardware ancien, configuration du réseau WiFi/Ethernet, et troubleshooting des erreurs de boot et de services. L'équipe a également intégré un système d'éclairage RGB contrôlable pour donner un aspect moderne au boîtier vintage. La présentation finale le dimanche a démontré un media server fonctionnel diffusant du contenu en streaming, le tout dans le châssis iconique de la PS2.",
      projectLink:
        "Ce projet illustre parfaitement l'upcycling technologique et s'inscrit dans mon intérêt pour l'infrastructure IT et l'IoT. La gestion d'un serveur média sur hardware embarqué rejoint mes objectifs de stage en support technique et administration système. Cette expérience m'a permis de travailler sur un projet Linux complet, de la configuration système à la résolution de problèmes complexes, compétences essentielles pour un technicien IT moderne.",
      skills:
        "J'ai développé mes compétences en administration Linux (installation, configuration, services), troubleshooting système (logs, débogage, optimisation), et gestion de projets techniques sous contrainte de temps. Le travail en équipe pluridisciplinaire m'a appris à communiquer efficacement avec des profils différents (électroniciens, designers). La présentation finale a renforcé ma capacité à expliquer des concepts techniques à un public non-expert. Enfin, la contrainte du hardware limité (Raspberry Pi 2) m'a forcé à optimiser chaque ressource, compétence précieuse en administration système.",
      conclusion:
        "Ce hackathon m'a prouvé que l'innovation ne nécessite pas toujours du matériel neuf et coûteux. L'upcycling technologique combine créativité, compétences techniques et conscience écologique. Je compte réutiliser ces compétences Linux et serveur dans mes futurs projets personnels, notamment pour créer un homelab avec du matériel récupéré. Cette expérience renforce ma candidature pour des stages en infrastructure IT, car elle démontre ma capacité à gérer des systèmes Linux et à résoudre des problèmes complexes de manière autonome.",
    },
    skills: [
      "Administration Linux",
      "Configuration serveur média",
      "Troubleshooting système",
      "Raspberry Pi",
      "Travail d'équipe",
      "Gestion du temps",
      "Présentation technique",
      "Optimisation performance",
    ],
  },
  {
    id: "act_009",
    slug: "homelab-personnel-2025",
    theme: "Administration système & homelab",
    title: "Homelab personnel — infrastructure auto-hébergée",
    type: "Autre",
    hoursValued: 10,
    realHours: 35,
    realHoursOngoing: true,
    date: "2025-11-01",
    location: "Domicile / Jodoigne",
    status: "ongoing",
    proof: {
      type: "Dépôt GitHub public + photo des serveurs",
      description:
        "Repo GitHub documentant l'architecture, les services déployés et les configurations du homelab (mis à jour régulièrement) + photo physique des trois machines (EXTRANET / INTRANET / NAS ZimaOS).",
      url: "https://github.com/dexteee-r/elmzn_homelab",
      file: "public/files/proofs/homelab-personnel-2025/",
      images: [
        "/files/proofs/homelab-personnel-2025/homelab-serveurs.jpeg",
      ],
      links: [
        {
          label: "Repo GitHub — elmzn_homelab",
          url: "https://github.com/dexteee-r/elmzn_homelab",
        },
      ],
    },
    description:
      "Mise en place et exploitation d'un homelab personnel à partir de PC reconditionnés et de matériel d'occasion. Déploiement d'une stack riche de services auto-hébergés pour mettre en pratique mes compétences d'administration système acquises en cours, dans un environnement réel et évolutif.",
    reflection: {
      context:
        "Depuis novembre 2025, je consacre une part importante de mon temps libre à la construction d'un homelab personnel. Cette démarche est née d'une volonté d'aller plus loin que les TP du cours d'administration système : disposer d'un environnement permanent, complexe et évolutif sur lequel expérimenter, casser et reconstruire — sans contrainte de temps de séance. Le homelab repose entièrement sur du matériel reconditionné et de seconde main, dans une logique d'optimisation budgétaire et de réutilisation responsable.",
      facts:
        "J'ai monté une infrastructure 24/7 répartie sur 3 machines en architecture DMZ multi-couches : Machine #1 EXTRANET (Beelink S12, Proxmox VE 9.1) exposée à Internet et hébergeant Nginx Proxy Manager + UFW + fail2ban + LXC Vaultwarden, Machine #2 INTRANET (PC custom i7-6700, Proxmox VE 9.1.1, ZFS pool 4 TB) jamais exposée et faisant tourner Immich (photos famille, 2 TB), Grafana, Prometheus, Node Exporter, PostgreSQL, Redis et un LXC Minecraft multi-profils, et Machine #3 NAS (ZimaOS) exposant NFS/Samba/ZeroTier/rclone/qBittorrent. Stack technique : Proxmox VE, Debian 13, Docker Compose, ZFS avec quotas et snapshots, Let's Encrypt + reverse proxy SSL wildcard, DNS dynamique. L'ensemble de l'architecture, des configs Docker, des runbooks et des ADR (Architecture Decision Records) est versionné publiquement sur GitHub (repo elmzn_homelab) — démarche assumée de documentation rigoureuse. Plus de 35h de travail effectif : installation des hyperviseurs, conception du réseau et de la DMZ, déploiement et durcissement des services, troubleshooting, et itérations successives (migration Dell OptiPlex → Beelink S12, ajout du NAS ZimaOS).",
      projectLink:
        "Le homelab est l'expression concrète de mon projet pro orienté infrastructure IT. Il me permet de pratiquer quotidiennement l'administration système Linux, la gestion de services en production (uptime, sauvegardes, mises à jour, monitoring), et la résolution de problèmes réels — exactement les compétences attendues pour mon stage VoIP à Ottignies-LLN puis pour mes objectifs métier (Infrastructure Engineer, Data Center Technician). C'est aussi un terrain d'apprentissage continu : chaque service ajouté est une nouvelle compétence à intégrer.",
      skills:
        "Administration Linux avancée, virtualisation et conteneurisation, configuration réseau, gestion de services auto-hébergés, sécurisation d'infrastructure (reverse proxy, accès distants), monitoring et observabilité, documentation technique versionnée (Git/Markdown), troubleshooting méthodique, optimisation matérielle sur hardware contraint.",
      conclusion:
        "Le homelab est devenu mon laboratoire personnel d'apprentissage continu. Je compte continuer à l'enrichir au fil de mes découvertes (nouveaux services, haute disponibilité, infra-as-code) et m'en servir comme support de démonstration concret lors d'entretiens de stage et d'embauche. Cette pratique régulière consolide chaque mois davantage ma posture d'administrateur système autonome.",
    },
    skills: [
      "Proxmox VE",
      "Docker Compose",
      "Administration Linux (Debian)",
      "ZFS & stockage NAS",
      "Réseau, DMZ & reverse proxy SSL",
      "Monitoring (Grafana / Prometheus)",
      "Sécurisation (UFW, fail2ban)",
      "Documentation Git & ADR",
      "Hardware reconditionné",
    ],
  },
  {
    id: "act_010",
    slug: "developpement-web-projets-perso-2024-2025",
    theme: "Développement web",
    title: "Développement web — sites & mini-applications",
    type: "Autre",
    hoursValued: 10,
    realHours: 25,
    realHoursOngoing: true,
    date: "2025-06-01",
    location: "Domicile / Jodoigne",
    status: "ongoing",
    proof: {
      type: "Dépôts GitHub + site en ligne",
      description:
        "Ensemble de projets web personnels (sites pour amis et projets perso) versionnés publiquement sur GitHub, plus mon site personnel en production sur elmzn.be.",
      url: "https://elmzn.be/",
      images: [],
      links: [
        { label: "elmzn.be — site personnel (production)", url: "https://elmzn.be/" },
        { label: "EchoTask — gestion de tâches", url: "https://github.com/dexteee-r/EchoTask" },
        { label: "AchatLIST-WebAPP — liste d'achats partagée", url: "https://github.com/dexteee-r/AchatLIST-WebAPP" },
        { label: "WIDGET Monitor — overlay perf système", url: "https://github.com/dexteee-r/WIDGET-Monitor_Perfomance_Overlay" },
        { label: "Windows Music Overlay Server", url: "https://github.com/dexteee-r/Windows-Music-overlay-server" },
        { label: "SolveRP — site communauté EmpireSunna", url: "https://github.com/dexteee-r/SolveRP-EmpireSunna" },
        { label: "top4cars-website — site auto", url: "https://github.com/dexteee-r/top4cars-website" },
      ],
    },
    description:
      "Développement de plusieurs sites web et mini-applications pour des projets personnels et pour des amis. Stack variée : React, Next.js, et HTML/CSS/JS pur selon le contexte du projet. Tous les projets sont publiés en open-source sur GitHub, plus un site personnel en production (elmzn.be).",
    reflection: {
      context:
        "En parallèle de ma formation TI orientée infrastructure, j'ai conservé une activité régulière de développement web sur des projets personnels et des demandes d'amis. Cette pratique régulière me permet de garder un pied dans le développement applicatif, de maîtriser les outils modernes du web et de livrer des projets concrets utilisés par d'autres. L'ensemble de mes travaux est versionné publiquement sur GitHub (compte dexteee-r), démarche assumée d'open source et de portfolio démontrable.",
      facts:
        "Plusieurs projets livrés ou en cours, regroupés ici en une activité unique : EchoTask (gestion de tâches), AchatLIST-WebAPP (liste d'achats partagée), WIDGET Monitor Performance Overlay (overlay de monitoring système), Windows Music Overlay Server (serveur d'overlay musical), SolveRP EmpireSunna (site communauté gaming), top4cars-website (site auto), et mon site personnel elmzn.be déployé en production. Stack mobilisée selon le besoin : React et Next.js pour les apps modernes, HTML/CSS/JS pur pour les sites simples et les overlays. Plus de 25h cumulées sur l'ensemble.",
      projectLink:
        "Même si mon projet pro vise principalement l'infrastructure IT, savoir développer reste une compétence transversale précieuse : automatiser des outils internes, créer des interfaces de monitoring, scripter des dashboards, ou simplement comprendre le langage des équipes dev avec lesquelles je travaillerai. Le déploiement de mon propre site (elmzn.be) m'a aussi confronté aux problématiques d'hébergement, de DNS et de mise en production — directement liées à mes compétences infra.",
      skills:
        "Développement front-end (React, Next.js, HTML/CSS/JS), gestion de versions Git/GitHub, déploiement et hébergement web, conception d'interfaces utilisateur, autonomie sur la chaîne complète (idée → code → déploiement → maintenance), capacité à choisir la bonne stack selon le contexte (over-engineering évité quand HTML/CSS/JS suffit).",
      conclusion:
        "Cette polyvalence dev/infra est un atout différenciant pour mon profil : à l'aise autant côté serveur que côté applicatif. Je compte continuer à publier mes projets en open-source, enrichir mon site personnel, et faire le pont entre mes compétences infra (homelab) et dev (web) en hébergeant moi-même mes propres applications.",
    },
    skills: [
      "React / Next.js",
      "HTML / CSS / JavaScript",
      "Git / GitHub",
      "Déploiement web",
      "DNS & hébergement",
      "UI / UX",
      "Autonomie projet",
      "Open source",
    ],
  },
  {
    id: "act_011",
    slug: "jobiste-printemps-sciences-2025",
    theme: "Médiation scientifique & pédagogie",
    title:
      "Jobiste au Printemps des Sciences — animation bras robotisé industriel",
    type: "Autre",
    hoursValued: 3,
    realHours: 3,
    date: "2025-03-24",
    location: "EPHEC, Louvain-la-Neuve",
    status: "completed",
    proof: {
      type: "Contrat jobiste signé EPHEC + photo & vidéo de l'animation",
      description:
        "Contrat d'occupation étudiante signé avec l'EPHEC (preuve formelle de la mission), photo de l'animation du bras robotisé en action, et vidéo courte de la démonstration aux élèves de 4e secondaire.",
      url: "/files/proofs/jobiste-printemps-sciences-2025/contrat-jobiste-printemps-sciences.pdf",
      file: "public/files/proofs/jobiste-printemps-sciences-2025/",
      images: [
        "/files/proofs/jobiste-printemps-sciences-2025/animation-bras-robotise.jpeg",
      ],
      links: [
        {
          label: "Contrat jobiste EPHEC signé (PDF)",
          url: "/files/proofs/jobiste-printemps-sciences-2025/contrat-jobiste-printemps-sciences.pdf",
        },
        {
          label: "Vidéo — démo bras robotisé (MP4)",
          url: "/files/proofs/jobiste-printemps-sciences-2025/animation-bras-robotise.mp4",
        },
      ],
    },
    description:
      "Job d'animateur lors du Printemps des Sciences à l'EPHEC : démonstration et initiation à l'utilisation d'un bras robotisé industriel à des élèves de 4e secondaire, via une mini-compétition ludique de construction d'une tour de Kapla pilotée à la télécommande.",
    reflection: {
      context:
        "En mars 2025, j'ai été engagé comme jobiste à l'EPHEC dans le cadre du Printemps des Sciences, événement national de vulgarisation scientifique. Mon rôle était d'animer un atelier autour d'un bras robotisé industriel à destination de classes de 4e secondaire en visite sur le campus. Cette mission combinait technicité (manipuler un équipement industriel) et pédagogie (transmettre à un public non-initié, jeune et hétérogène).",
      facts:
        "J'ai animé l'atelier sur plusieurs sessions de la journée. Pour chaque groupe, je commençais par présenter le bras robotisé industriel et son fonctionnement (axes de liberté, pinces, télécommande). Je faisais ensuite une démonstration concrète, puis je laissais les élèves prendre la télécommande à tour de rôle. Pour rendre l'expérience marquante et ludique, j'avais conçu un mini-jeu : construire la plus haute tour possible avec des pièces Kapla, en pilotant uniquement les pinces du bras robotisé. Ce format gamifié a fonctionné — les élèves restaient engagés, prenaient des risques, échouaient, recommençaient, et comprenaient au passage la difficulté du contrôle d'un bras industriel et l'importance de la précision.",
      projectLink:
        "Cette expérience est doublement alignée avec mon projet pro. D'abord, elle m'a confronté à un équipement industriel réel, là où mon stage VoIP me confronte à de l'infrastructure IT en production — dans les deux cas, on manipule des systèmes critiques avec des contraintes concrètes. Ensuite, le rôle de pédagogue rejoint directement le métier de technicien IT en entreprise : expliquer simplement à un utilisateur final non-technique, vulgariser sans perdre l'exactitude, garder le contrôle d'un équipement complexe pendant qu'un débutant le manipule. Ce sont les compétences exactes attendues d'un futur Infrastructure / Support Engineer.",
      skills:
        "J'ai développé ma capacité à vulgariser un sujet technique pour des élèves de secondaire (adapter le vocabulaire, simplifier sans déformer), ma posture pédagogique (laisser essayer, encourager, recadrer sans frustrer), la gestion d'un équipement industriel (sécurité, télécommande, calibrage), et la conception d'une activité gamifiée à objectif d'apprentissage. J'ai aussi appris à gérer plusieurs sessions consécutives sans perdre en énergie ni en clarté — endurance pédagogique.",
      conclusion:
        "Cette journée m'a confirmé que la dimension humaine et pédagogique du métier IT est aussi importante que la dimension technique. Je compte réinvestir cette posture pédagogique partout où j'aurai à former, accompagner ou supporter des utilisateurs — du collègue débutant au client final lors de mon stage et au-delà. Cette expérience démontre aussi ma polyvalence : je suis aussi à l'aise avec un terminal Linux qu'avec un groupe de quinze adolescents devant un bras robotisé.",
    },
    skills: [
      "Vulgarisation scientifique",
      "Pédagogie & médiation",
      "Manipulation équipement industriel",
      "Animation de groupe",
      "Gamification pédagogique",
      "Gestion sécurité",
      "Communication multi-publics",
    ],
  },
];

// Helpers
export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function getThemes(): string[] {
  return Array.from(new Set(activities.map((a) => a.theme)));
}

export function activitiesByTheme(): { theme: string; items: Activity[] }[] {
  const themes = getThemes();
  return themes.map((theme) => ({
    theme,
    items: activities.filter((a) => a.theme === theme),
  }));
}

export function totals() {
  return {
    activitiesCount: activities.length,
    themesCount: getThemes().length,
    hoursValued: activities.reduce((sum, a) => sum + a.hoursValued, 0),
    realHours: activities.reduce((sum, a) => sum + (a.realHours ?? 0), 0),
    proofsCount: activities.filter((a) => a.proof).length,
  };
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
