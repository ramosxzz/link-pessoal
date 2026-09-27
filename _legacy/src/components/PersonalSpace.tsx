import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Command,
  Copy,
  Github,
  Globe2,
  Instagram,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { links, profile } from "../data/profile";

const descriptions = {
  github: {
    eyebrow: "ONDE AS IDEIAS VIRAM CÓDIGO",
    title: "Meu lado dev.",
    text: "Projetos, experimentos e próximos commits.",
  },
  instagram: {
    eyebrow: "ALÉM DO CÓDIGO",
    title: "Vida em pixels.",
    text: "Um pouco do meu mundo.",
  },
  x: {
    eyebrow: "PENSAMENTOS SOLTOS",
    title: "Sem filtro.",
    text: "Ideias em tempo real.",
  },
};

function XLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
    </svg>
  );
}
const icons = { github: Github, instagram: Instagram, x: XLogo };

function BrazilClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = window.setInterval(update, 10000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <span className="clock">
      <Globe2 size={13} aria-hidden="true" /> BRASIL{" "}
      <span className="clock-time">{time || "--:--"}</span>
      <span className="timezone">UTC−3</span>
    </span>
  );
}

export default function PersonalSpace() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("ramos-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const copyTimer = useRef<number>();
  const commandTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#15141c" : "#f2f1f6");
    try {
      localStorage.setItem("ramos-theme", dark ? "dark" : "light");
    } catch {
      /* Theme also works without storage. */
    }
  }, [dark]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else {
          setQuery("");
          dialog.current?.showModal();
          search.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://ramosxzz.pages.dev/");
      setCopied(true);
      setMessage("Link copiado. Agora é só compartilhar.");
    } catch {
      setMessage(
        "Não foi possível copiar. Você pode usar o endereço da página.",
      );
    }
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => {
      setCopied(false);
      setMessage("");
    }, 3500);
  }

  const filteredLinks = links.filter((link) =>
    `${link.title} ${link.handle} ${descriptions[link.icon].title}`
      .toLocaleLowerCase("pt-BR")
      .includes(query.toLocaleLowerCase("pt-BR").trim()),
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#links">
        Pular para os links
      </a>
      <header className="topbar page-width">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Matheus Ramos — início"
        >
          mr<span aria-hidden="true">✳</span>
          <span className="wordmark-label">RAMOS / PERSONAL SPACE</span>
        </a>
        <div className="topbar-actions">
          <button
            ref={commandTrigger}
            className="command-button"
            type="button"
            aria-label="Buscar links (Control ou Command K)"
            onClick={() => {
              setQuery("");
              dialog.current?.showModal();
              search.current?.focus();
            }}
          >
            <Search size={15} aria-hidden="true" />
            <span>Ir para...</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="share-button" type="button" onClick={copyLink}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? "Copiado!" : "Compartilhar"}</span>
          </button>
        </div>
      </header>

      <main id="inicio" className="page-width">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" /> DESENVOLVEDOR & CURIOSO POR
              NATUREZA
            </div>
            <h1 id="hero-title">
              Matheus
              <br />
              <span className="surname">
                Ramos.
                <span className="name-star" aria-hidden="true">
                  ✳
                </span>
              </span>
            </h1>
            <p className="hero-description">
              Código na cabeça.
              <br />
              Um universo de ideias fora dela.
            </p>
            <div className="identity">
              <img
                src={profile.avatar}
                alt="Avatar de Matheus Ramos"
                width="42"
                height="42"
              />
              <div>
                <span>@ramosxzz</span>
                <p>Dev. Gamer. Sempre explorando.</p>
              </div>
            </div>
            <a className="explore-link" href="#links">
              Explore meu universo{" "}
              <span>
                <ArrowDown size={16} aria-hidden="true" />
              </span>
            </a>
          </div>

          <figure className="artwork">
            <div className="art-frame">
              <img
                className="jett-art"
                src="/images/background.webp"
                alt="Ilustração da Jett, de Valorant, em tons de azul e violeta"
                width="2980"
                height="2596"
              />
              <div className="art-shade" />
              <div className="art-topline">
                <span>
                  <span className="art-dot" /> THE OTHER SIDE OF ME
                </span>
                <Code2 size={18} aria-hidden="true" />
              </div>
              <div className="art-title" aria-hidden="true">
                <span>PLAY.</span>
                <span>BUILD.</span>
                <span>REPEAT.</span>
              </div>
              <div className="art-bottomline">
                <span>JETT / VALORANT</span>
                <span>疾風</span>
              </div>
            </div>
            <figcaption className="art-caption">
              <span>Um pouco de quem eu sou, além do editor.</span>
              <span aria-hidden="true">↗</span>
            </figcaption>
            <span className="art-sticker" aria-hidden="true">
              <span>CREATIVE</span>
              <Code2 size={23} />
              <span>BY NATURE</span>
            </span>
          </figure>
        </section>

        <section
          id="links"
          className="links-section"
          aria-labelledby="links-title"
        >
          <div className="section-heading">
            <h2 id="links-title">
              Me encontre por aí<span>↘</span>
            </h2>
            <span className="eyebrow">TRÊS CAMINHOS. O MESMO EU.</span>
          </div>
          <nav className="link-grid" aria-label="Redes de Matheus Ramos">
            {links.map((link) => {
              const Icon = icons[link.icon];
              const content = descriptions[link.icon];
              return (
                <a
                  key={link.icon}
                  className={`social-card social-${link.icon}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.title} — ${link.handle}, abre em nova aba`}
                >
                  <div className="card-top">
                    <span className="network-name">
                      <Icon />
                      {link.title}
                    </span>
                    <span className="card-arrow">
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </span>
                  </div>
                  {link.icon === "github" && (
                    <div className="code-art" aria-hidden="true">
                      <span>{"{"}</span>
                      <i>✳</i>
                      <span>{"}"}</span>
                    </div>
                  )}
                  <div className="card-copy">
                    <span className="card-eyebrow">{content.eyebrow}</span>
                    <h3>{content.title}</h3>
                    <p>{content.text}</p>
                  </div>
                  <div className="card-footer">
                    <span>{link.handle}</span>
                    <span className="card-action">
                      {link.icon === "github"
                        ? "Explorar GitHub"
                        : "Abrir perfil"}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>
        </section>

        <footer className="footer">
          <div className="footer-signature">
            Feito de código<span aria-hidden="true">✳</span>e personalidade.
          </div>
          <BrazilClock />
          <span className="copyright">
            © {new Date().getFullYear()} Matheus Ramos
          </span>
        </footer>
      </main>
      <div
        className={`toast ${message ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {copied && <Check size={16} />}
        {message}
      </div>
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-labelledby="command-title"
        onClose={() => commandTrigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="command-surface">
          <div className="command-heading">
            <h2 id="command-title">
              <Command size={18} /> Para onde vamos?
            </h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Fechar busca"
              onClick={() => dialog.current?.close()}
            >
              <X size={18} />
            </button>
          </div>
          <label className="search-field">
            <Search size={18} />
            <input
              ref={search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque GitHub, Instagram, X..."
              aria-label="Buscar rede social"
              autoComplete="off"
            />
          </label>
          <div className="command-results">
            {filteredLinks.length ? (
              filteredLinks.map((link) => {
                const Icon = icons[link.icon];
                return (
                  <a
                    key={link.icon}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => dialog.current?.close()}
                  >
                    <Icon />
                    <span>
                      {link.title}
                      <small>{link.handle}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </a>
                );
              })
            ) : (
              <p className="empty-search">
                Nenhum link encontrado. Tente o nome de uma rede.
              </p>
            )}
          </div>
          <div className="command-hint">
            <span>
              <kbd>tab</kbd> navegar <kbd>enter</kbd> abrir
            </span>
            <span>
              <kbd>esc</kbd> fechar
            </span>
          </div>
        </div>
      </dialog>
    </div>
  );
}
