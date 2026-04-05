"use client";

import { useEffect, useRef, useState } from "react";

export function BrusselsSkyline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setAnimate(false);
      return;
    }
    // Trigger animation after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 200"
      className="absolute bottom-0 left-0 w-full h-auto opacity-[0.07] pointer-events-none select-none"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Brussels skyline: buildings, Atomium sphere, Grand-Place spire, rooftops */}
      <path
        d={[
          // Ground line
          "M0 190 L60 190",
          // Building 1 - low
          "L60 150 L100 150 L100 190",
          // Building 2 - tall narrow
          "L130 190 L130 110 L155 110 L155 190",
          // Building 3 - wide
          "L180 190 L180 130 L240 130 L240 190",
          // Grand-Place spire
          "L280 190 L280 120 L290 120 L300 40 L310 120 L320 120 L320 190",
          // Building 4
          "L360 190 L360 140 L410 140 L410 190",
          // Atomium (simplified: central sphere + 2 connecting lines)
          "L460 190 L480 190 L500 100 L520 190 L540 190",
          // Building 5 - stepped
          "L580 190 L580 145 L600 145 L600 120 L630 120 L630 145 L650 145 L650 190",
          // Building 6 - with pitched roof
          "L700 190 L700 130 L730 100 L760 130 L760 190",
          // Building 7 - modern tower
          "L800 190 L800 90 L840 90 L840 190",
          // Building 8 - low with chimney
          "L880 190 L880 150 L890 150 L890 130 L895 130 L895 150 L930 150 L930 190",
          // Building 9 - church
          "L970 190 L970 120 L990 70 L1010 120 L1010 190",
          // Building 10 - final
          "L1050 190 L1050 140 L1100 140 L1100 190",
          // Ground to end
          "L1200 190",
        ].join(" ")}
        style={{
          strokeDasharray: 4000,
          strokeDashoffset: animate ? 0 : 4000,
          transition: animate ? "stroke-dashoffset 2.5s ease-out" : "none",
        }}
      />
      {/* Atomium circles */}
      <circle cx="500" cy="95" r="15"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: animate ? 0 : 100,
          transition: animate ? "stroke-dashoffset 2s ease-out 0.5s" : "none",
        }}
      />
      <circle cx="480" cy="145" r="10"
        style={{
          strokeDasharray: 70,
          strokeDashoffset: animate ? 0 : 70,
          transition: animate ? "stroke-dashoffset 2s ease-out 0.7s" : "none",
        }}
      />
      <circle cx="520" cy="145" r="10"
        style={{
          strokeDasharray: 70,
          strokeDashoffset: animate ? 0 : 70,
          transition: animate ? "stroke-dashoffset 2s ease-out 0.7s" : "none",
        }}
      />
    </svg>
  );
}
