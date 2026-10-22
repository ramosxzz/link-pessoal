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
  nameJa: "Matheus Ramos",
  handle: "@ramosxzz",
  // "em silêncio, sempre em frente."
  phrase: "Em silêncio, sempre em frente.",
  // "疾風" (shippū) = vento veloz
  kanji: "COLEÇÃO PESSOAL",
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
  stage: "V-ASTRO",
  hp: 280,
  // 風 = vento (o "tipo" da carta)
  type: "✦",
  typeLabel: "Tipo incolor",
  // "No.0001 · Pokémon desenvolvedor · Matheus Ramos (katakana)"
  info: "Evolui de Matheus V · Desenvolvedor",
  stats: [
    { label: "fraqueza", value: "segunda ×2" },
    { label: "resistência", value: "bugs −30" },
    { label: "recuo", value: "●" },
  ],
  flavor: "Transforma ideias em experiências. Sua próxima evolução está sempre em construção.",
  number: "001/001",
};
