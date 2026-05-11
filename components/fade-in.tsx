"use client";

import { motion } from "motion/react";

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 8,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.95] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
