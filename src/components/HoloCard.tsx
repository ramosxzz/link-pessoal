import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import "./HoloCard.css";

export type HoloPreset = "bursts" | "rainbow";

export interface HoloCardProps {
  /** Imagem da arte (janela da carta). */
  image: string;
  alt: string;
  /** Conteúdo acima da arte (nome, HP...). */
  header?: ReactNode;
  /** Conteúdo abaixo da arte (ataques, fraqueza...). */
  children?: ReactNode;
  preset?: HoloPreset;
  /** Cor da moldura metálica. */
  foilColor?: string;
  /** Força do efeito holográfico (0–1). */
  intensity?: number;
  scale?: number;
  /** Brilho nas bordas (0–1). */
  edgeSparkle?: number;
  /** Espessura da moldura em px. */
  frame?: number;
  /** Força do reflexo de luz (0–1). */
  glare?: number;
  /** Inclinação máxima em graus. */
  tiltMax?: number;
  hoverScale?: number;
  radius?: number;
  width?: number;
  /** Anima sozinha quando ninguém está mexendo. */
  idle?: boolean;
  shadow?: boolean;
  className?: string;
}

interface Pose {
  px: number;
  py: number;
  rx: number;
  ry: number;
  s: number;
  hyp: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function HoloCard({
  image,
  alt,
  header,
  children,
  preset = "bursts",
  foilColor = "#e2e6ec",
  intensity = 0.85,
  scale = 1,
  edgeSparkle = 0.8,
  frame = 4,
  glare = 0.5,
  tiltMax = 14,
  hoverScale = 1.04,
  radius = 14,
  width = 320,
  idle = true,
  shadow = true,
  className = "",
}: HoloCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pose: Pose = { px: 50, py: 50, rx: 0, ry: 0, s: scale, hyp: 0 };

    const apply = () => {
      el.style.setProperty("--px", `${pose.px}%`);
      el.style.setProperty("--py", `${pose.py}%`);
      el.style.setProperty("--rx", `${pose.rx}deg`);
      el.style.setProperty("--ry", `${pose.ry}deg`);
      el.style.setProperty("--s", `${pose.s}`);
      el.style.setProperty("--hyp", `${pose.hyp}`);
    };

    if (reduceMotion) {
      apply();
      return;
    }

    let raf = 0;
    let t = Math.random() * 10;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      let tx = 50;
      let ty = 50;
      let ts = scale;
      let tilt = 1;

      if (pointer.current) {
        tx = pointer.current.x;
        ty = pointer.current.y;
        ts = scale * hoverScale;
      } else if (idle) {
        t += dt;
        tx = 50 + 32 * Math.sin(t * 0.55);
        ty = 50 + 22 * Math.cos(t * 0.4);
        tilt = 0.45;
      }

      const k = pointer.current ? 0.18 : 0.06;
      pose.px = lerp(pose.px, tx, k);
      pose.py = lerp(pose.py, ty, k);
      pose.s = lerp(pose.s, ts, 0.12);
      const cx = (pose.px - 50) / 50;
      const cy = (pose.py - 50) / 50;
      pose.ry = cx * tiltMax * tilt;
      pose.rx = -cy * tiltMax * tilt;
      pose.hyp = Math.min(Math.hypot(cx, cy), 1);

      apply();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idle, scale, hoverScale, tiltMax]);

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)),
    };
  };
  const release = () => {
    pointer.current = null;
  };

  const style = {
    "--card-w": `${width}px`,
    "--radius": `${radius}px`,
    "--frame": `${frame}px`,
    "--foil": foilColor,
    "--intensity": intensity,
    "--glare": glare,
    "--sparkle": edgeSparkle,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`holo holo--${preset}${shadow ? " holo--shadow" : ""} ${className}`}
      style={style}
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={release}
      onPointerCancel={release}
      onPointerUp={(e) => e.pointerType !== "mouse" && release()}
    >
      <div className="holo__rotator">
        <div className={`holo__flipper${flipped ? " is-flipped" : ""}`} onClick={(event) => {
          if (!(event.target as HTMLElement).closest("a, button")) setFlipped(value => !value);
        }}>
        <div className="holo__front" {...(flipped ? { inert: "" } : {})} aria-hidden={flipped}>
        <div className="holo__card">
          <div className="holo__face">
            {header}
            <div className="holo__art">
              <img src={image} alt={alt} draggable={false} />
              <div className="holo__shine" aria-hidden="true" />
            </div>
            {children}
          </div>
          <div className="holo__shine holo__shine--soft" aria-hidden="true" />
          <div className="holo__sparkle" aria-hidden="true" />
          <div className="holo__glare" aria-hidden="true" />
        </div>
        </div>
        <div className="holo__back" aria-hidden={!flipped}>
          <img src="/images/card-back.svg" alt="Verso azul da carta com Poké Bola e logotipo Pokémon" draggable={false} />
          <div className="holo__glare" />
        </div>
        </div>
      </div>
      <button className="card-flip" type="button" onClick={() => setFlipped(value => !value)} aria-pressed={flipped}>
        <span aria-hidden="true">⤾</span> {flipped ? "Ver frente da carta" : "Virar a carta"}
      </button>
      <p className="card-hint">Mova para explorar o brilho · Toque para virar</p>
    </div>
  );
}
