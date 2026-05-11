'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Server,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface Milestone {
  date: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const milestones: Milestone[] = [
  {
    date: 'septembre 2023',
    title: 'Début de formation EPHEC',
    desc: "Bases limitées en programmation, beaucoup d'appréhension. Connaissances principalement hardware acquises en autodidacte.",
    icon: GraduationCap,
  },
  {
    date: 'septembre 2024',
    title: 'Premiers projets réussis',
    desc: 'Scripts Python, configuration de réseaux, premières manipulations Linux. Début de confiance dans mes capacités techniques.',
    icon: Rocket,
  },
  {
    date: 'juin 2025',
    title: 'Projets complexes maîtrisés',
    desc: 'VPS Docker complet, application MERN PowerTrack. Passage de scripts isolés à des architectures complètes.',
    icon: Server,
  },
  {
    date: 'octobre 2025',
    title: 'Networking & ouverture',
    desc: 'Tech Career Night AXA, Hackathon Upscaling. Premières connexions professionnelles, vision plus claire du marché IT.',
    icon: Users,
  },
  {
    date: 'avril 2026',
    title: "Stage de fin d'études en cours",
    desc: 'Confrontation au réel : production, contraintes, équipe. Le stage façonne la suite de ma trajectoire.',
    icon: Briefcase,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export function StaggeredEvolutionTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.ol
      className="relative space-y-10 pl-14 md:pl-16"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      <motion.span
        aria-hidden
        className="absolute left-4 top-5 bottom-5 w-px origin-top bg-rule md:left-5"
        variants={lineVariants}
      />

      {milestones.map((e, idx) => {
        const Icon = e.icon;
        const isLast = idx === milestones.length - 1;
        return (
          <motion.li
            key={e.title}
            variants={itemVariants}
            className="relative"
          >
            <span
              className={`absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-bone md:-left-16 md:h-10 md:w-10 ${
                isLast
                  ? 'border-accent shadow-[0_0_0_4px_var(--color-accent-soft)]'
                  : 'border-rule'
              }`}
            >
              <Icon
                aria-hidden
                className={`h-4 w-4 md:h-5 md:w-5 ${isLast ? 'text-accent' : 'text-ash'}`}
                strokeWidth={1.75}
              />
            </span>

            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
              {e.date}
              {isLast && (
                <span className="ml-2 text-accent">· aujourd&apos;hui</span>
              )}
            </p>
            <h3 className="mt-1 font-display text-xl">{e.title}</h3>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-ink/80">
              {e.desc}
            </p>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
