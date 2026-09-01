'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id: string
  className?: string
  /**
   * Fraction of the section that must be on screen before it fades in.
   * A section taller than ~5x the viewport can never reach the 0.2 default, so
   * long ones (Works) pass 'some' and reveal as soon as their top edge shows.
   */
  viewportAmount?: 'some' | 'all' | number
}

export default function Section({ children, id, className = '', viewportAmount = 0.2 }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
