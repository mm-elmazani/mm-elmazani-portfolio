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

export function StaggeredStatusBlocks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="grid gap-10 md:grid-cols-3"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Localisation
        </p>
        <p className="mt-3 text-base leading-relaxed">
          <span className="inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-accent" />{' '}
          Bruxelles · mobilité Belgique.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Cible post-études
        </p>
        <p className="mt-3 text-base leading-relaxed">
          Technicien / Ingénieur Infrastructure IT · Data Center
          Technician / Engineer.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Contact
        </p>
        <p className="mt-3 text-base leading-relaxed">
          <a
            href="mailto:mohamedelmazani.pro@gmail.com"
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            mohamedelmazani.pro@gmail.com
          </a>
        </p>
      </motion.div>
    </motion.section>
  );
}
