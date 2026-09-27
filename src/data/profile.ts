export type LinkIcon = "github" | "instagram" | "x";

export interface ProfileLink {
  title: string;
  url: string;
  icon: LinkIcon;
  handle: string;
  blurb: string;
}

export interface NowItem {
  label: string;
  value: string;
}

export const profile = {
  name: "Matheus Ramos",
  handle: "@ramosxzz",
  // Aparece abaixo do nome: "Dev & gamer, sempre explorando."
  role: "Dev & gamer",
  tagline: "sempre explorando.",
  location: "Brasil",
  about:
    "Escrevo código, jogo quando dá e vivo testando ideias novas. Aqui ficam os lugares onde você me encontra.",
  // Troque por outra foto colocando o arquivo em /public/images/
  avatar: "/images/profile.jpg",
  available: "Aberto a novos projetos",
};

export const links: ProfileLink[] = [
  {
    title: "GitHub",
    url: "https://github.com/ramosxzz",
    icon: "github",
    handle: "@ramosxzz",
    blurb: "Projetos e experimentos",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/matheusz_rms/",
    icon: "instagram",
    handle: "@matheusz_rms",
    blurb: "O dia a dia",
  },
  {
    title: "X",
    url: "https://x.com/ramoszzxz",
    icon: "x",
    handle: "@ramoszzxz",
    blurb: "Pensamentos soltos",
  },
];

// Seção "Agora": o que você está fazendo no momento. Edite à vontade.
export const now: NowItem[] = [
  { label: "Construindo", value: "Projetos pessoais" },
  { label: "Jogando", value: "Valorant" },
  { label: "Aprendendo", value: "Algo novo toda semana" },
];
