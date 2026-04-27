"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin progress bar at top of page that follows scroll.
 * Sits above the sticky header.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--brand-cobalt)] origin-left z-[60] motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
