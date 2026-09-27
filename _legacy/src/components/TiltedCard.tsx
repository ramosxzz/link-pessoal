import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, Instagram, ChevronRight } from "lucide-react";
import type { LinkIcon, ProfileLink } from "../data/profile";
import "./TiltedCard.css";

function XIcon({ size = 20, strokeWidth = 1.75 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

const iconMap: Record<LinkIcon, (props: { size?: number; strokeWidth?: number }) => JSX.Element> = {
  github: (p) => <Github {...p} aria-hidden />,
  instagram: (p) => <Instagram {...p} aria-hidden />,
  x: (p) => <XIcon {...p} />,
};

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

const flipSpringValues = {
  damping: 22,
  stiffness: 180,
};

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  /** When provided, clicking the card flips it to reveal these links on the back. */
  links?: ProfileLink[];
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  links,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const tiltRotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const flipRotateY = useSpring(0, flipSpringValues);
  // Combined into a single rotateY driving one preserve-3d layer: nesting two
  // preserve-3d transforms (tilt + flip) renders both card faces at once on
  // iOS Safari, so tilt and flip must share the same 3D space.
  const rotateY = useTransform([tiltRotateY, flipRotateY], ([tilt, flip]: number[]) => tilt + flip);

  const [lastY, setLastY] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (!ref.current || flipped) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    tiltRotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (flipped) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    tiltRotateY.set(0);
    rotateFigcaption.set(0);
  }

  function handleClick() {
    if (!links) return;
    const next = !flipped;
    setFlipped(next);
    flipRotateY.set(next ? 180 : 0);
    rotateX.set(0);
    tiltRotateY.set(0);
    scale.set(1);
    opacity.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
        cursor: links ? "pointer" : undefined,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <div
          className="tilted-card-face tilted-card-face-front"
          style={{ pointerEvents: flipped ? "none" : "auto" }}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />

          {displayOverlayContent && overlayContent && (
            <div className="tilted-card-overlay">{overlayContent}</div>
          )}
        </div>

        {links && (
          <div
            className="tilted-card-face tilted-card-face-back"
            style={{ pointerEvents: flipped ? "auto" : "none" }}
          >
            <nav className="tilted-card-links" aria-label="Redes sociais">
              {links.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="tilted-card-link"
                  >
                    <span className="tilted-card-link-icon">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="tilted-card-link-text">
                      <span className="tilted-card-link-title">{link.title}</span>
                      {link.handle && (
                        <span className="tilted-card-link-handle">{link.handle}</span>
                      )}
                    </span>
                    <ChevronRight size={16} strokeWidth={2} aria-hidden className="tilted-card-link-chevron" />
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
