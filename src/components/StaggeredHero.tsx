'use client';

import { motion, useReducedMotion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export function StaggeredHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      variants={containerVariants}
    >
      {/* Éyebrow */}
      <motion.p
        variants={itemVariants}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash"
      >
        Portfolio · EPHEC BAC 3 TI · 2025 — 2026
      </motion.p>

      {/* Hero title */}
      <motion.h1
        variants={itemVariants}
        className="mt-6 font-display text-4xl font-medium leading-[0.95] md:text-7xl lg:text-8xl"
      >
        Mohamed Mokhtar
        <br />
        El Mazani<span className="text-accent">.</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-xl"
      >
        Étudiant BAC 3 en Technologies de l&apos;Informatique à l&apos;EPHEC.
        Curieux et autodidacte, je navigue naturellement entre le{' '}
        <span className="text-ink">hardware</span>, les{' '}
        <span className="text-ink">réseaux</span> et l&apos;{' '}
        <span className="text-ink">administration système</span>. Ce qui me
        définit : la rigueur d&apos;un technicien et l&apos;envie constante de
        comprendre comment les choses fonctionnent — du composant au
        datacenter.
      </motion.p>
    </motion.div>
  );
}
