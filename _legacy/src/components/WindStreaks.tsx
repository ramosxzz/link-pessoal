import type { CSSProperties } from "react";

interface WindWisp {
  id: string;
  src: string;
  top: string;
  width: string;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  scaleY: number;
  scaleX: 1 | -1;
}

const WISPS: WindWisp[] = [
  {
    id: "upper-ribbon",
    src: "/images/wind/wind-1-haze.webp",
    top: "10%",
    width: "clamp(460px, 66vw, 920px)",
    duration: 18,
    delay: -2,
    opacity: 0.22,
    drift: -8,
    scaleY: 0.86,
    scaleX: 1,
  },
  {
    id: "middle-crossing-ribbon",
    src: "/images/wind/wind-2-haze.webp",
    top: "34%",
    width: "clamp(480px, 70vw, 960px)",
    duration: 22,
    delay: -12,
    opacity: 0.18,
    drift: 8,
    scaleY: 0.76,
    scaleX: 1,
  },
  {
    id: "lower-sweeping-ribbon",
    src: "/images/wind/wind-3-haze.webp",
    top: "60%",
    width: "clamp(440px, 62vw, 860px)",
    duration: 20,
    delay: -16,
    opacity: 0.2,
    drift: -10,
    scaleY: 0.78,
    scaleX: 1,
  },
  {
    id: "bottom-wave-ribbon",
    src: "/images/wind/wind-4-haze.webp",
    top: "78%",
    width: "clamp(500px, 72vw, 980px)",
    duration: 24,
    delay: -21,
    opacity: 0.16,
    drift: 9,
    scaleY: 0.68,
    scaleX: 1,
  },
];

export function WindStreaks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {WISPS.map((wisp) => (
        <img
          alt=""
          className="wind-wisp"
          decoding="async"
          draggable={false}
          key={wisp.id}
          src={wisp.src}
          style={
            {
              top: wisp.top,
              width: wisp.width,
              animationDuration: `${wisp.duration}s`,
              animationDelay: `${wisp.delay}s`,
              "--wisp-opacity": wisp.opacity,
              "--wisp-drift": `${wisp.drift}px`,
              "--wisp-scale-y": wisp.scaleY,
              "--wisp-scale-x": wisp.scaleX,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
