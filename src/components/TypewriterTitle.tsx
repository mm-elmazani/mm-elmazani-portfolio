'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface TypewriterTitleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function TypewriterTitle({
  text,
  className = '',
  as = 'h1',
}: TypewriterTitleProps) {
  const shouldReduceMotion = useReducedMotion();

  // Séparation stricte du texte en caractères individuels
  const characters = Array.from(text);

  // Parent : gère le rythme de frappe
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // 40ms par lettre (rythme de frappe naturel)
      },
    },
  };

  // Enfant : chaque lettre apparaît d'un coup net
  // display: 'inline' permet aux mots de wrap normalement (pas au milieu d'un mot)
  const charVariants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline' },
  };

  // Le curseur de la machine à écrire
  const cursorVariants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: 'linear' as const,
      },
    },
  };

  const MotionTag = motion[as];

  // Accessibilité : on désactive l'effet si l'OS le demande
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) =>
        char === '\n' ? (
          // Retour à la ligne animé : apparaît à son tour dans la cascade
          <motion.br key={index} variants={charVariants} />
        ) : (
          <motion.span key={index} variants={charVariants}>
            {char}
          </motion.span>
        )
      )}
      {/* Curseur inline — suit le dernier caractère visible.
          Si le texte wrap, le curseur suit naturellement la fin de la dernière ligne. */}
      <motion.span
        variants={cursorVariants}
        animate="blinking"
        className="ml-1 inline-block w-[0.08em] h-[0.85em] bg-accent align-middle"
      />
    </MotionTag>
  );
}
