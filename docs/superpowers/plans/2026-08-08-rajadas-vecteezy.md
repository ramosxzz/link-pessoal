# Rajadas Vecteezy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir as barras neon pelas rajadas curvas exatas do EPS fornecido, com fundo transparente e movimento sutil.

**Architecture:** Renderizar o EPS localmente em alta resolução com canal alfa, recortar as formas aprovadas em ativos WebP transparentes e animá-las como imagens decorativas em React/CSS. Preservar a pilha de camadas já corrigida.

**Tech Stack:** Ghostscript, WebP, React 18, TypeScript, CSS animations, Vite

---

### Task 1: Gerar ativos transparentes

**Files:**
- Source: `vecteezy_wind-white-smoke-or-cold-air-motion-effect_12975347_97.zip`
- Create: `public/images/wind/wind-1.webp`
- Create: `public/images/wind/wind-2.webp`
- Create: `public/images/wind/wind-3.webp`
- Create: `public/images/wind/wind-4.webp`

- [ ] Renderizar o EPS com transparência em resolução suficiente para desktop.
- [ ] Recortar as quatro rajadas sem incluir o padrão quadriculado da prévia.
- [ ] Otimizar cada recorte em WebP e verificar canal alfa e bordas transparentes.

### Task 2: Atualizar as garantias automatizadas

**Files:**
- Modify: `tests/wind-layers.test.mjs`

- [ ] Exigir quatro ativos WebP, elementos `wind-wisp`, ausência de `wind-streak`, ausência de `color-mix` e animação `natural-wind`.
- [ ] Executar `npm test` e confirmar falha antes da implementação.

### Task 3: Substituir o efeito

**Files:**
- Modify: `src/components/WindStreaks.tsx`
- Modify: `src/index.css`

- [ ] Renderizar poucas imagens por vez com posição, escala, duração e atraso diferentes.
- [ ] Remover integralmente gradientes neon, sombras luminosas e pseudo-rastros.
- [ ] Animar somente `transform` e `opacity`, com surgimento e desaparecimento suaves.
- [ ] Manter `aria-hidden`, `pointer-events: none` e `prefers-reduced-motion`.

### Task 4: Verificar resultado

**Files:**
- Inspect: aplicação local

- [ ] Executar `npm test` e `npm run build` com sucesso.
- [ ] Renderizar desktop e celular e confirmar curvas naturais, transparência, legibilidade e ausência de overflow.
- [ ] Confirmar zero erros no console e encerrar o servidor local.
