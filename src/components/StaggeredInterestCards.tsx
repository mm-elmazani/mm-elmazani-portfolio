'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export interface Interest {
  title: string;
  desc: string;
  image: string;
}

interface StaggeredInterestCardsProps {
  interests: Interest[];
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

export function StaggeredInterestCards({
  interests,
}: StaggeredInterestCardsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-3"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {interests.map((i) => (
        <motion.article
          key={i.title}
          variants={itemVariants}
          className="overflow-hidden border border-rule bg-mist transition-colors hover:bg-frost"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={i.image}
              alt={i.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg">{i.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {i.desc}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
