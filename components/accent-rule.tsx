"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export function AccentRule({
  delay = 0.4,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.65, 0.3, 0.95] }}
      style={{ originX: 0 }}
      className={cn("h-[2px] bg-[var(--color-accent)]", className)}
    />
  );
}
