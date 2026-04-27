"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance to slide up from. Default 24px. */
  y?: number;
};

/**
 * Fade + slide-up on viewport entry. Respects prefers-reduced-motion.
 * Apple/Linear style: smooth, subtle, only animates once.
 */
export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Apple-like ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
