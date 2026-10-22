import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Github, Instagram, Moon, Sun, Star } from "lucide-react";
import HoloCard from "./components/HoloCard";
import { card, links, profile, type LinkIcon } from "./data/profile";

function XLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
    </svg>
  );
}

function LinkGlyph({ icon }: { icon: LinkIcon }) {
  if (icon === "github") return <Github strokeWidth={1.8} aria-hidden="true" />;
  if (icon === "instagram") return <Instagram strokeWidth={1.8} aria-hidden="true" />;
  return <XLogo />;
}

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0b0b0c" : "#f7f7f5");
    try {
      localStorage.setItem("ramos-theme", dark ? "dark" : "light");
    } catch {
      // armazenamento indisponível (aba anônima etc.)
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  return time || "--:--";
}

// Atraso escalonado para a animação de entrada de cada bloco.
const reveal = (step: number): CSSProperties => ({ "--d": `${step * 80}ms` }) as CSSProperties;

export default function App() {
  const [dark, toggleTheme] = useTheme();
  const time = useClock();
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <nav className="topbar reveal" style={reveal(0)}>
        <span className="kanji">
          {profile.kanji}
        </span>
        <div className="topbar-right">
          <span className="clock">Brasil · {time}</span>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {dark ? <Sun size={14} strokeWidth={1.6} /> : <Moon size={14} strokeWidth={1.6} />}
          </button>
        </div>
      </nav>

      <main className="stage">
        <h1 className="sr-only">{profile.name}</h1>
        <div className="stage-card reveal" style={reveal(1)}>
          <HoloCard
            image={profile.avatar}
            alt={`Foto de ${profile.name}`}
            preset="rainbow"
            foilColor="#e2e6ec"
            intensity={0.85}
            scale={1}
            edgeSparkle={0.8}
            frame={5}
            glare={0.5}
            tiltMax={14}
            hoverScale={1.04}
            radius={13}
            width={360}
            idle
            shadow
            header={
              <div className="pk-head">
                <span className="pk-stage">
                  {card.stage}
                </span>
                <span className="pk-name">{profile.name}<em>V-ASTRO</em></span>
                <span className="pk-hp">
                  <small>PS</small>
                  {card.hp}
                </span>
                <span className="pk-type" title={card.typeLabel}>
                  <Star fill="currentColor" size={18} aria-hidden="true" />
                </span>
              </div>
            }
          >
            <p className="pk-info">
              {card.info}
            </p>

            <div className="pk-power">Poder V-ASTRO</div>
            <ul className="pk-moves">
              {links.map((link) => (
                <li key={link.url}>
                  <a className="pk-move" href={link.url} target="_blank" rel="noopener noreferrer">
                    <span className="pk-energy">
                      <LinkGlyph icon={link.icon} />
                    </span>
                    <span className="pk-move-text">
                      <span className="pk-move-name">{link.title}</span>
                      <span className="pk-move-handle">{link.handle}</span>
                    </span>
                    <ArrowUpRight className="pk-move-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <dl className="pk-stats">
              {card.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <p className="pk-flavor">
              <span>{profile.phrase}</span> {card.flavor}
            </p>

            <div className="pk-foot">
              <span>illus. {profile.handle.slice(1)} · Edição pessoal</span>
              <span>★ {card.number} · HOLO</span>
            </div>
          </HoloCard>
        </div>
      </main>

      <footer className="footer reveal" style={reveal(2)}>
        <span>© {year}</span>
        <span>{profile.handle}</span>
      </footer>
    </div>
  );
}
