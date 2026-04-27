"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Strength of magnetic pull. Default 0.25 (subtle). */
  strength?: number;
};

/**
 * Wrapper that gives children a subtle magnetic effect — content shifts
 * slightly toward the cursor while hovered.
 * Apple-like: very subtle, never aggressive.
 */
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
