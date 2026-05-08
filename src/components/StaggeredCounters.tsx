'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

export interface CounterItem {
  label: string;
  value: number;
  suffix?: string;
}

interface StaggeredCountersProps {
  counters: CounterItem[];
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

/**
 * Compteur numérique qui s'incrémente de 0 à `target` en 1.5s.
 * Auto-détecte les décimales : 198.5 → toFixed(1), 69 → Math.round.
 */
function CountUpNumber({
  target,
  shouldAnimate,
  delay,
}: {
  target: number;
  shouldAnimate: boolean;
  delay: number;
}) {
  const motionValue = useMotionValue(0);
  const isDecimal = target % 1 !== 0;
  const display = useTransform(motionValue, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString(),
  );

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(motionValue, target, {
        duration: 1.5,
        ease: 'easeOut',
        delay,
      });
      return () => controls.stop();
    }
  }, [shouldAnimate, target, motionValue, delay]);

  return <motion.span>{display}</motion.span>;
}

export function StaggeredCounters({ counters }: StaggeredCountersProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // useInView : déclenche tout en même temps quand le bloc entre dans le viewport
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={containerRef}
      className="mt-6 grid grid-cols-2 gap-px bg-rule md:grid-cols-5"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate={isInView || shouldReduceMotion ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {counters.map((c, idx) => (
        <motion.div
          key={c.label}
          variants={itemVariants}
          className="flex flex-col justify-between bg-mist p-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
            {c.label}
          </p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-4xl text-ink md:text-5xl">
              {shouldReduceMotion ? (
                c.value
              ) : (
                <CountUpNumber
                  target={c.value}
                  shouldAnimate={isInView}
                  delay={idx * 0.05}
                />
              )}
            </span>
            {c.suffix && (
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
                {c.suffix}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
