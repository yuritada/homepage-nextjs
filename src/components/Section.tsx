'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id: string
  className?: string
}

export default function Section({ children, id, className = '' }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
