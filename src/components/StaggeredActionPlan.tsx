'use client';

import { motion, useReducedMotion } from 'framer-motion';

export interface ActionPlanItem {
  horizon: string;
  period: string;
  title: string;
  desc: string;
}

interface StaggeredActionPlanProps {
  items: ActionPlanItem[];
}

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

export function StaggeredActionPlan({ items }: StaggeredActionPlanProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="grid gap-px bg-rule md:grid-cols-2"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {items.map((p, i) => (
        <motion.article
          key={p.title}
          variants={itemVariants}
          className="flex flex-col bg-mist p-6 md:p-8"
        >
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {String(i + 1).padStart(2, '0')} · {p.horizon}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              {p.period}
            </p>
          </div>
          <h3 className="mt-4 font-display text-xl">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.desc}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
