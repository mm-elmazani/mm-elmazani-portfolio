'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

export interface SkillProgressItem {
  name: string;
  value: number;
}

interface StaggeredSkillsProgressProps {
  items: SkillProgressItem[];
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

const rowVariants = {
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

function SkillRow({
  item,
  index,
  inView,
  reduceMotion,
}: {
  item: SkillProgressItem;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const count = useMotionValue(reduceMotion ? item.value : 0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);
  const [display, setDisplay] = useState(
    reduceMotion ? `${item.value}%` : '0%',
  );

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, item.value, {
      duration: 1.2,
      ease: [0.0, 0.0, 0.2, 1],
      delay: 0.2 + index * 0.05,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, count, item.value, index]);

  return (
    <motion.div variants={rowVariants}>
      <div className="flex items-baseline justify-between">
        <p className="font-sans text-base">{item.name}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
          {display}
        </p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden bg-rule">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: reduceMotion ? `${item.value}%` : '0%' }}
          animate={
            inView
              ? { width: `${item.value}%` }
              : { width: reduceMotion ? `${item.value}%` : '0%' }
          }
          transition={{
            duration: 1.2,
            ease: [0.0, 0.0, 0.2, 1],
            delay: 0.2 + index * 0.05,
          }}
          role="progressbar"
          aria-valuenow={item.value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={item.name}
        />
      </div>
    </motion.div>
  );
}

export function StaggeredSkillsProgress({
  items,
}: StaggeredSkillsProgressProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="mt-8 space-y-6"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {items.map((s, i) => (
        <SkillRow
          key={s.name}
          item={s}
          index={i}
          inView={inView}
          reduceMotion={shouldReduceMotion}
        />
      ))}
    </motion.div>
  );
}
