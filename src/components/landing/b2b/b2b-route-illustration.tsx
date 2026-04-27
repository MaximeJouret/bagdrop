/**
 * Stylized SVG illustration: hotel → van → airport
 * Used as a visual interlude between sections
 */
export function B2BRouteIllustration() {
  return (
    <section className="bg-background py-16 md:py-20 px-6 border-y border-border/60">
      <div className="container mx-auto max-w-6xl">
        <div className="relative">
          <svg
            viewBox="0 0 1200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-label="Trajet illustré : hôtel vers aéroport"
          >
            {/* Dashed route */}
            <path
              d="M 80 100 Q 300 40, 600 100 T 1120 100"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              fill="none"
              className="text-border"
            />
            {/* Animated dot along path */}
            <circle r="6" fill="var(--brand-cobalt)">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M 80 100 Q 300 40, 600 100 T 1120 100"
              />
            </circle>

            {/* Hotel (left) */}
            <g transform="translate(40, 70)">
              <rect
                x="0"
                y="0"
                width="60"
                height="60"
                rx="3"
                fill="var(--brand-cream)"
                stroke="var(--brand-cobalt)"
                strokeWidth="1.5"
              />
              {/* Windows grid */}
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={10 + col * 14}
                    y={10 + row * 14}
                    width="8"
                    height="8"
                    fill="var(--brand-cobalt)"
                    opacity={(row + col) % 2 === 0 ? "0.8" : "0.2"}
                  />
                ))
              )}
            </g>
            <text
              x="70"
              y="155"
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Hôtel
            </text>

            {/* Van (center) */}
            <g transform="translate(560, 70)">
              {/* Van body */}
              <rect
                x="10"
                y="20"
                width="60"
                height="30"
                rx="3"
                fill="var(--brand-cobalt)"
              />
              <rect x="0" y="30" width="20" height="20" rx="2" fill="var(--brand-cobalt-deep)" />
              {/* Window */}
              <rect x="3" y="33" width="14" height="10" fill="var(--brand-yellow)" opacity="0.9" />
              {/* Wheels */}
              <circle cx="15" cy="55" r="6" fill="var(--brand-ink)" />
              <circle cx="15" cy="55" r="2" fill="var(--brand-cream)" />
              <circle cx="60" cy="55" r="6" fill="var(--brand-ink)" />
              <circle cx="60" cy="55" r="2" fill="var(--brand-cream)" />
              {/* BagDrop branding */}
              <rect x="30" y="28" width="32" height="14" rx="2" fill="var(--brand-yellow)" />
            </g>
            <text
              x="600"
              y="155"
              textAnchor="middle"
              className="fill-[var(--brand-cobalt)]"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              BagDrop
            </text>

            {/* Airport — stylized airplane (right) */}
            <g transform="translate(1060, 80)">
              {/* Fuselage */}
              <path
                d="M 0 22
                   Q 6 18, 30 16
                   L 60 12
                   Q 76 12, 76 22
                   Q 76 26, 70 28
                   Q 60 28, 30 28
                   Q 6 26, 0 22 Z"
                fill="var(--brand-cobalt)"
              />
              {/* Top wing (above fuselage) */}
              <path
                d="M 32 16 L 38 -2 L 44 -2 L 48 16 Z"
                fill="var(--brand-cobalt-deep)"
              />
              {/* Tail fin */}
              <path
                d="M 4 16 L 8 4 L 14 4 L 18 16 Z"
                fill="var(--brand-cobalt-deep)"
              />
              {/* Cockpit window */}
              <circle cx="62" cy="20" r="2" fill="var(--brand-yellow)" opacity="0.95" />
              {/* Engine highlight */}
              <rect x="38" y="22" width="14" height="3" rx="1" fill="var(--brand-cobalt-deep)" opacity="0.5" />
            </g>
            <text
              x="1100"
              y="155"
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Aéroport
            </text>

            {/* Time labels */}
            <text
              x="300"
              y="50"
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Collecte · 11h
            </text>
            <text
              x="900"
              y="50"
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Livraison · 16h
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
