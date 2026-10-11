import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { revealEase as ease } from '../lib/motion'

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
}


/**
 * Fades and lifts its children into view once they scroll into the viewport.
 * With reduced motion enabled (see MotionConfig in App) only the fade remains.
 */
export function Reveal({ children, delay = 0, y = 28, className, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
