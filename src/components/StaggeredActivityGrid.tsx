'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { type Activity, formatDate } from '@/data/activities';

interface StaggeredActivityGridProps {
  items: Activity[];
}

// Parent : dicte le rythme de la cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms entre chaque enfant — standard de fluidité
    },
  },
};

// Enfants : s'animent selon le rythme du parent
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.0, 0.0, 0.2, 1] as [number, number, number, number], // ease-out premium
    },
  },
};

export function StaggeredActivityGrid({ items }: StaggeredActivityGridProps) {
  // Accessibilité : désactive l'animation si l'utilisateur a réduit les mouvements
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {items.map((a) => (
        <motion.div key={a.id} variants={itemVariants} className="flex">
          <Link
            href={`/portfolio/${a.slug}`}
            className="group flex h-full w-full flex-col bg-mist p-6 transition-colors hover:bg-frost"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                {a.type} · {a.hoursValued}h
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </div>
            <h4 className="mt-3 font-display text-lg leading-tight">
              {a.title}
            </h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
              {a.description}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              {formatDate(a.date)}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
