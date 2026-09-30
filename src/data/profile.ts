export type LinkIcon = "github" | "instagram" | "x";

export interface ProfileLink {
  title: string;
  url: string;
  icon: LinkIcon;
  handle: string;
}

export const profile = {
  name: "Matheus Ramos",
  // Nome em katakana, aparece embaixo do nome
  nameJa: "マテウス・ラモス",
  handle: "@ramosxzz",
  // Frase vertical ao lado do nome: "em silêncio, sempre em frente."
  phrase: "静かに、前へ。",
  // "疾風" (shippū) = vento veloz
  kanji: "疾風",
  // Troque por outra foto colocando o arquivo em /public/images/
  avatar: "/images/profile.jpg",
};

export const links: ProfileLink[] = [
  {
    title: "GitHub",
    url: "https://github.com/ramosxzz",
    icon: "github",
    handle: "@ramosxzz",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/matheusz_rms/",
    icon: "instagram",
    handle: "@matheusz_rms",
  },
  {
    title: "X",
    url: "https://x.com/ramoszzxz",
    icon: "x",
    handle: "@ramoszzxz",
  },
];
