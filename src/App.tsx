import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Github, Instagram, Moon, Sun } from "lucide-react";
import { links, now, profile, type LinkIcon } from "./data/profile";

function XLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
    </svg>
  );
}

function LinkGlyph({ icon }: { icon: LinkIcon }) {
  if (icon === "github") return <Github size={18} strokeWidth={1.75} aria-hidden="true" />;
  if (icon === "instagram") return <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />;
  return <XLogo size={16} />;
}

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0a0a0a" : "#fafafa");
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
const reveal = (step: number): CSSProperties => ({ "--d": `${step * 70}ms` }) as CSSProperties;

export default function App() {
  const [dark, toggleTheme] = useTheme();
  const time = useClock();
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <nav className="topbar reveal" style={reveal(0)}>
        <span className="mono muted">
          {profile.location} · {time}
        </span>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          {dark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
        </button>
      </nav>

      <main>
        <header className="hero">
          <img
            className="avatar reveal"
            style={reveal(1)}
            src={profile.avatar}
            alt={`Foto de ${profile.name}`}
            width={64}
            height={64}
          />

          <h1 className="name reveal" style={reveal(2)}>
            {profile.name}
          </h1>
          <p className="role reveal" style={reveal(3)}>
            {profile.role}, <em className="serif">{profile.tagline}</em>
          </p>

          {profile.available && (
            <p className="status reveal" style={reveal(4)}>
              <span className="dot" aria-hidden="true" />
              {profile.available}
            </p>
          )}
        </header>

        <section className="section reveal" style={reveal(5)} aria-labelledby="sobre">
          <h2 id="sobre" className="label">
            Sobre
          </h2>
          <p className="prose">{profile.about}</p>
        </section>

        <section className="section reveal" style={reveal(6)} aria-labelledby="links">
          <h2 id="links" className="label">
            Links
          </h2>
          <ul className="link-list">
            {links.map((link) => (
              <li key={link.url}>
                <a className="link-row" href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="link-icon">
                    <LinkGlyph icon={link.icon} />
                  </span>
                  <span className="link-text">
                    <span className="link-title">{link.title}</span>
                    <span className="link-blurb">{link.blurb}</span>
                  </span>
                  <span className="link-handle mono">{link.handle}</span>
                  <ArrowUpRight className="link-arrow" size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {now.length > 0 && (
          <section className="section reveal" style={reveal(7)} aria-labelledby="agora">
            <h2 id="agora" className="label">
              Agora
            </h2>
            <dl className="now-list">
              {now.map((item) => (
                <div className="now-row" key={item.label}>
                  <dt>{item.label}</dt>
                  <span className="now-rule" aria-hidden="true" />
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>

      <footer className="footer reveal" style={reveal(8)}>
        <span className="mono muted">
          © {year} {profile.name}
        </span>
        <span className="mono muted">{profile.handle}</span>
      </footer>
    </div>
  );
}
