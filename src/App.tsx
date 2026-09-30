import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Github, Instagram, Moon, Sun } from "lucide-react";
import { links, profile, type LinkIcon } from "./data/profile";

function XLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
    </svg>
  );
}

function LinkGlyph({ icon }: { icon: LinkIcon }) {
  if (icon === "github") return <Github size={17} strokeWidth={1.6} aria-hidden="true" />;
  if (icon === "instagram") return <Instagram size={17} strokeWidth={1.6} aria-hidden="true" />;
  return <XLogo size={15} />;
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
        <span className="kanji" lang="ja">
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

      <main>
        <header className="hero">
          <div className="hero-main">
            <img
              className="avatar reveal"
              style={reveal(1)}
              src={profile.avatar}
              alt={`Foto de ${profile.name}`}
              width={96}
              height={96}
            />
            <h1 className="name reveal" style={reveal(2)}>
              {profile.name}
            </h1>
            <p className="name-ja reveal" style={reveal(3)} lang="ja">
              {profile.nameJa}
            </p>
          </div>

          <p className="phrase reveal" style={reveal(4)} lang="ja">
            {profile.phrase}
          </p>
        </header>

        <ul className="link-list reveal" style={reveal(5)}>
          {links.map((link) => (
            <li key={link.url}>
              <a className="link-row" href={link.url} target="_blank" rel="noopener noreferrer">
                <span className="link-icon">
                  <LinkGlyph icon={link.icon} />
                </span>
                <span className="link-title">{link.title}</span>
                <span className="link-handle">{link.handle}</span>
                <ArrowUpRight className="link-arrow" size={15} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer reveal" style={reveal(6)}>
        <span>© {year}</span>
        <span>{profile.handle}</span>
      </footer>
    </div>
  );
}
