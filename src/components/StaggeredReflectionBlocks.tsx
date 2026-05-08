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

/**
 * Bloc réflexion isolé (markup identique à l'ancien helper inline ReflectionBlock).
 * Wrappé dans un motion.article pour que le parent stagger l'anime.
 */
function Block({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-10"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          [{num}]
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
          {title}
        </p>
      </div>
      <div className="max-w-prose text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </motion.article>
  );
}

export function StaggeredReflectionBlocks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-10 space-y-12"
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      <Block num="A" title="Le déclic — l'IT est un horizon, pas une checklist">
        <p>
          En arrivant à l&apos;EPHEC, je voyais l&apos;informatique comme un
          ensemble fini de savoirs à acquérir : apprendre les bases, les
          répéter, devenir compétent. Le déclic est venu en progressant dans
          le cursus — j&apos;ai compris que le domaine est{' '}
          <span className="text-ink">infiniment plus vaste</span> que ce que
          j&apos;imaginais, et qu&apos;il évolue plus vite que la capacité
          d&apos;une formation à le couvrir.
        </p>
        <p className="mt-4">
          Cette prise de conscience a transformé mon rapport au métier. Je ne
          cherche plus à « finir d&apos;apprendre ». J&apos;accepte que ma
          carrière entière sera de la veille active, et c&apos;est une bonne
          nouvelle : ça veut dire que la curiosité — qui est ma matière
          première — restera utile bien plus longtemps que n&apos;importe
          quelle techno précise apprise pendant le BAC.
        </p>
      </Block>

      <Block num="B" title="Hors programme — la pratique sans deadline">
        <p>
          Mes projets personnels — homelab 3 machines, sites web pour des
          amis, mini-applications, réparations clients — m&apos;ont appris
          quelque chose que les cours ne pouvaient pas :{' '}
          <span className="text-ink">
            la pratique répétée sans contrainte de temps.
          </span>
        </p>
        <p className="mt-4">
          À l&apos;école, j&apos;ai souvent étudié au minimum pour réussir un
          examen. Sur mon homelab, je peux casser, refaire, comprendre
          vraiment pourquoi un service ne démarre pas, lire les logs
          jusqu&apos;à ce que ce soit clair. C&apos;est cette répétition
          lente, sans note à la clé, qui ancre les apprentissages. La
          formation m&apos;a donné le cadre théorique ; les projets perso
          m&apos;ont donné la mémoire musculaire. Les deux sont
          indispensables — mais je sais maintenant lesquels me font le plus
          progresser.
        </p>
      </Block>

      <Block num="C" title="L'angle mort — vouloir tout embrasser">
        <p>
          Ma vraie faiblesse en fin de BAC n&apos;est pas un manque de
          compétences techniques. C&apos;est l&apos;inverse : je veux{' '}
          <span className="text-ink">tout apprendre, tout comprendre</span>,
          au lieu de choisir un domaine et de m&apos;y enfoncer vraiment. Le
          revers de la curiosité est la dispersion, et je dois travailler ça.
        </p>
        <p className="mt-4">
          J&apos;assume aussi un autre angle mort : je mets un peu plus de
          temps que d&apos;autres à intégrer un nouveau concept. Cette
          lenteur n&apos;est pas un blocage — quand j&apos;ai compris,
          j&apos;ai compris pour de bon — mais elle suppose une discipline
          d&apos;apprentissage que je dois assumer. Mon stage VoIP à
          Ottignies-LLN est précisément le terrain pour transformer cette
          lenteur en méthode : prendre le temps d&apos;analyser
          l&apos;existant avant d&apos;agir, plutôt que de réagir vite et
          mal.
        </p>
      </Block>
    </motion.div>
  );
}
