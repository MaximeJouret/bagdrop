"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  /** Stagger delay between words in seconds */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Word-by-word slide-up + fade reveal.
 * Apple-like: smooth, staggered, only once.
 */
export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h1",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  const words = children.split(" ");

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.21, 0.47, 0.32, 0.98],
                },
              },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

/** Wrap children in a motion.div that participates in parent stagger. */
export function StaggerItem({ children, className }: RevealItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

/** Parent that orchestrates stagger of children on viewport entry. */
export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerContainerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
