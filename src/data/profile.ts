export type LinkIcon = "github" | "instagram" | "x";

export interface ProfileLink {
  title: string;
  url: string;
  icon: LinkIcon;
  handle: string;
  blurb: string;
}

export const profile = {
  name: "Matheus Ramos",
  handle: "@ramosxzz",
  bio: "Dev. Gamer. Sempre explorando.",
  // Troque por outra foto colocando o arquivo em /public/images/
  avatar: "/images/profile.jpg",
  // "疾風" (shippū) = vento veloz / rajada
  kanji: "疾風",
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
