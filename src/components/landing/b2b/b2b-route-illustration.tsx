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

            {/* Airport (right) */}
            <g transform="translate(1080, 70)">
              {/* Tower */}
              <rect
                x="20"
                y="0"
                width="14"
                height="60"
                fill="var(--brand-cream)"
                stroke="var(--brand-cobalt)"
                strokeWidth="1.5"
              />
              {/* Plane silhouette */}
              <path
                d="M 0 25 L 40 20 L 50 18 L 60 20 L 60 30 L 50 32 L 40 30 L 0 35 Z"
                fill="var(--brand-cobalt)"
                opacity="0.6"
              />
              {/* Runway lines */}
              <line x1="-10" y1="55" x2="70" y2="55" stroke="var(--brand-border)" strokeWidth="1" strokeDasharray="3 3" />
            </g>
            <text
              x="1110"
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
