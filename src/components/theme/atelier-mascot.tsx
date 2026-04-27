"use client";

import { useTheme } from "./theme-provider";

/**
 * Hand-drawn suitcase mascot — only visible in Atelier theme.
 * Floats in bottom-left, bobbing gently, occasionally winking.
 */
export function AtelierMascot() {
  const { theme } = useTheme();
  if (theme !== "atelier") return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[55] pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="atelier-mascot">
        <svg
          width="84"
          height="92"
          viewBox="0 0 84 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handle */}
          <path
            d="M 28 14 Q 28 6, 42 6 T 56 14"
            stroke="var(--brand-charcoal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Suitcase body — wobbly hand-drawn rect */}
          <path
            d="M 14 18
               Q 14 14, 18 14
               L 66 13
               Q 70 13, 70 18
               L 71 80
               Q 71 86, 66 86
               L 17 87
               Q 13 87, 13 81
               Z"
            fill="var(--brand-cream)"
            stroke="var(--brand-charcoal)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Strap horizontal */}
          <path
            d="M 13 38 L 71 37"
            stroke="var(--brand-charcoal)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Buckle */}
          <rect
            x="36"
            y="33"
            width="12"
            height="9"
            rx="1.5"
            fill="var(--brand-yellow)"
            stroke="var(--brand-charcoal)"
            strokeWidth="2"
          />
          {/* Eyes — left (winking sometimes via animation) */}
          <ellipse
            cx="29"
            cy="55"
            rx="3"
            ry="4"
            fill="var(--brand-charcoal)"
            className="atelier-mascot-eye-left"
          />
          {/* Eyes — right */}
          <ellipse
            cx="55"
            cy="55"
            rx="3"
            ry="4"
            fill="var(--brand-charcoal)"
          />
          {/* Eye shine — left */}
          <circle cx="30.5" cy="53.5" r="0.8" fill="white" />
          {/* Eye shine — right */}
          <circle cx="56.5" cy="53.5" r="0.8" fill="white" />
          {/* Smile — handdrawn curve */}
          <path
            d="M 32 67 Q 42 73, 52 67"
            stroke="var(--brand-charcoal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cheek blush — left */}
          <ellipse
            cx="22"
            cy="64"
            rx="3"
            ry="2"
            fill="var(--brand-yellow-deep)"
            opacity="0.45"
          />
          {/* Cheek blush — right */}
          <ellipse
            cx="62"
            cy="64"
            rx="3"
            ry="2"
            fill="var(--brand-yellow-deep)"
            opacity="0.45"
          />

          {/* Sparkle 1 */}
          <g opacity="0.8">
            <path
              d="M 76 24 L 78 28 L 82 30 L 78 32 L 76 36 L 74 32 L 70 30 L 74 28 Z"
              fill="var(--brand-yellow-deep)"
            />
          </g>
          {/* Sparkle 2 */}
          <g opacity="0.6">
            <path
              d="M 4 50 L 5 53 L 8 54 L 5 55 L 4 58 L 3 55 L 0 54 L 3 53 Z"
              fill="var(--brand-cobalt)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
