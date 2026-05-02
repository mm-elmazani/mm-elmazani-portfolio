'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

export interface HubLink {
  num: string;
  title: string;
  desc: string;
  href: string;
}

interface StaggeredHubLinksProps {
  links: HubLink[];
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

export function StaggeredHubLinks({ links }: StaggeredHubLinksProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-8 divide-y divide-rule border-y border-rule"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {links.map((l) => (
        <motion.div key={l.num} variants={itemVariants}>
          <Link
            href={l.href}
            className="group flex items-center gap-6 py-8 transition-colors hover:bg-mist"
          >
            <span className="font-mono text-xs text-accent">[{l.num}]</span>
            <span className="flex-1">
              <span className="block font-display text-2xl md:text-3xl">
                {l.title}
              </span>
              <span className="mt-1 block text-sm text-ash md:text-base">
                {l.desc}
              </span>
            </span>
            <span className="font-mono text-ash transition-all group-hover:translate-x-1 group-hover:text-accent">
              →
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
