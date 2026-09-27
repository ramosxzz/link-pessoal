import assert from "node:assert/strict";
import test, { before, after } from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

let server;
let html;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  html = renderToStaticMarkup(createElement(App));
});
after(async () => {
  await server?.close();
});

test("all three real social links are immediately available without opening the profile card", () => {
  const nav = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav, "The page needs a visible social navigation");
  const urls = [...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(urls, [
    "https://github.com/ramosxzz",
    "https://www.instagram.com/matheusz_rms/",
    "https://x.com/ramoszzxz",
  ]);
  assert.equal([...nav.matchAll(/rel="noopener noreferrer"/g)].length, 3);
});

test("renders Jett and the profile without loading wind effects or a WebGL canvas", () => {
  assert.match(html, /src="\/images\/background.webp"/);
  assert.match(html, /alt="Avatar de Matheus Ramos"/);
  assert.match(html, /<h1[^>]*>Matheus/);
  assert.doesNotMatch(html, /wind-wisp|\/images\/wind\/|<canvas/);
});

test("exposes accessible theme, search, and copy controls", () => {
  assert.match(html, /aria-label="Ativar tema escuro"/);
  assert.match(html, /aria-label="Buscar rede social"/);
  assert.match(html, /<dialog[^>]*aria-labelledby="command-title"/);
  assert.match(html, /role="status" aria-live="polite"/);
});
