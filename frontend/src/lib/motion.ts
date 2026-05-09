import type { Variants } from 'framer-motion'

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const glitchReveal: Variants = {
  hidden: { opacity: 0, x: 0, skewX: 0, filter: 'blur(8px)' },
  show: {
    opacity: [0, 0, 1, 0.3, 1, 0.6, 1, 1],
    x:       [0, 0, -8, 6, -4, 2, 0, 0],
    skewX:   [0, 0, -4, 3, -2, 1, 0, 0],
    filter:  [
      'blur(8px)',
      'blur(8px)',
      'blur(0px)',
      'blur(5px)',
      'blur(0px)',
      'blur(2px)',
      'blur(0px)',
      'blur(0px)',
    ],
    transition: {
      duration: 0.72,
      ease: 'easeOut',
      times: [0, 0.07, 0.22, 0.38, 0.54, 0.70, 0.86, 1],
    },
  },
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
}
