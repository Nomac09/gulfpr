"use client";

import { motion } from "motion/react";

const HEADLINE = ["The", "agencies,", "the", "people,", "the", "work."];

export function HeroHeadline() {
  return (
    <h1 className="font-display text-[42px] leading-[0.98] font-medium tracking-[-0.025em] text-[var(--color-text)] sm:text-[54px] lg:text-[72px] xl:text-[88px]">
      {HEADLINE.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.05 + i * 0.06,
            duration: 0.55,
            ease: [0.2, 0.65, 0.3, 0.95],
          }}
          className="inline-block whitespace-nowrap"
        >
          {word}
          {i < HEADLINE.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </h1>
  );
}
