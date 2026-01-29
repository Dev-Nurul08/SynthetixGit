'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  hover = true,
  glow = false,
  className = '',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`${hover ? 'glass-card' : 'glass-card-static'} ${glow ? 'animate-pulse-glow' : ''} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
