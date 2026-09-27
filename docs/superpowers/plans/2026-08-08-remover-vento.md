# Remover vento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover integralmente as animações de vento e manter a Jett como único elemento ilustrado do fundo.

**Architecture:** Eliminar a montagem do componente decorativo em `App.tsx` e as regras de animação associadas em `index.css`. Um teste estrutural garante que nenhuma referência executável ao vento permaneça na página.

**Tech Stack:** React 18, TypeScript, CSS, Node Test Runner, Vite, Cloudflare Pages

---

### Task 1: Garantir ausência de vento

**Files:**
- Modify: `tests/wind-layers.test.mjs`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

- [x] **Step 1: Escrever o teste que exige ausência de vento**

Substituir as expectativas atuais por verificações de que `App.tsx` não contém `WindStreaks` e `index.css` não contém `.wind-wisp` nem `@keyframes natural-wind`, preservando a imagem de fundo.

- [x] **Step 2: Executar o teste e confirmar a falha esperada**

Run: `npm test`
Expected: FAIL porque as referências ao vento ainda existem.

- [x] **Step 3: Fazer a implementação mínima**

Remover de `App.tsx` a importação e o bloco que renderiza `WindStreaks`. Remover de `index.css` somente `.wind-wisp`, `@keyframes natural-wind` e a exceção `.wind-wisp` dentro de `prefers-reduced-motion`.

- [x] **Step 4: Verificar testes e build**

Run: `npm test && npm run build`
Expected: todos os testes passam e o build Vite é concluído.

- [x] **Step 5: Publicar e validar**

Run: `npx wrangler pages deploy dist --project-name ramosxzz --branch main --commit-message "Remove wind animations"`
Expected: deployment em `Production`, branch `main`; a URL pública contém zero `.wind-wisp` e carrega sem erro de console.

Não há etapa de commit porque esta pasta não é um repositório Git.
