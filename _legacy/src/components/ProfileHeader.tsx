import TiltedCard from "./TiltedCard";
import type { ProfileLink } from "../data/profile";

interface ProfileHeaderProps {
  name: string;
  description: string;
  avatar: string;
  kanji?: string;
  links: ProfileLink[];
}

export function ProfileHeader({ name, description, avatar, kanji, links }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <h1 className="sr-only">{name}</h1>

      <TiltedCard
        imageSrc={avatar}
        altText={`Foto de ${name}`}
        containerHeight="260px"
        containerWidth="260px"
        imageHeight="260px"
        imageWidth="260px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <div className="flex h-full w-full items-end justify-center bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-frost-100">{name}</span>
              {kanji && (
                <span aria-hidden className="select-none font-serif text-base text-accent-cyan/70">
                  {kanji}
                </span>
              )}
            </div>
          </div>
        }
        links={links}
      />

      <p className="mt-5 text-[11px] tracking-wide text-frost-300/60">Toque no card para ver os links</p>
      <p className="mt-2 text-sm text-frost-300 sm:text-[15px]">{description}</p>
    </header>
  );
}
