export type LinkIcon = "github" | "instagram" | "x";

export interface ProfileLink {
  title: string;
  url: string;
  icon: LinkIcon;
  handle: string;
}

export const profile = {
  name: "Matheus Ramos",
  // Nome em katakana
  nameJa: "マテウス・ラモス",
  handle: "@ramosxzz",
  // "em silêncio, sempre em frente."
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

// Textos da carta. Os rótulos em japonês são os mesmos das cartas Pokémon
// japonesas: たね = básico, 弱点 = fraqueza, 抵抗力 = resistência, にげる = recuo.
export const card = {
  stage: "たね",
  hp: 99,
  // 風 = vento (o "tipo" da carta)
  type: "風",
  typeLabel: "Tipo vento",
  // "No.0001 · Pokémon desenvolvedor · Matheus Ramos (katakana)"
  info: `No.0001 · 開発ポケモン · ${profile.nameJa}`,
  stats: [
    { label: "弱点", value: "segunda ×2" },
    { label: "抵抗力", value: "bugs −30" },
    { label: "にげる", value: "●" },
  ],
  flavor: "Em silêncio, sempre em frente.",
  number: "001/001",
};
