"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";

type CounterProps = {
  value: number;
  /** Decimal places. */
  decimals?: number;
  /** Suffix appended (e.g. "M", "%", "+"). */
  suffix?: string;
  /** Prefix prepended (e.g. "+"). */
  prefix?: string;
  /** Duration in seconds. Default 2. */
  duration?: number;
  className?: string;
  /** Use comma as decimal separator (French). Default true. */
  french?: boolean;
};

/**
 * Number that counts up from 0 to value when in viewport.
 * For non-integer values, e.g. "8.5M" pass value=8.5 decimals=1 suffix="M".
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
  french = true,
}: CounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    const formatted = latest.toFixed(decimals);
    return french ? formatted.replace(".", ",") : formatted;
  });

  useEffect(() => {
    if (reduced) {
      motionValue.set(value);
      return;
    }
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      });
      return () => controls.stop();
    }
  }, [inView, motionValue, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
