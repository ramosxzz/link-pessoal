# Rajadas de vento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer rajadas azul-brancas fortes atravessarem toda a página, visíveis sobre a imagem da Jett e atrás do conteúdo.

**Architecture:** Manter `WindStreaks.tsx` como fonte declarativa das rajadas e `index.css` como responsável pela aparência e animação. Corrigir em `App.tsx` a pilha de camadas, criando um contexto isolado com níveis positivos para impedir que fundo e vento desapareçam atrás do documento.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, CSS animations, Vite

---

## Estrutura de arquivos

- `src/App.tsx`: define a ordem explícita das camadas visuais e do conteúdo.
- `src/components/WindStreaks.tsx`: descreve rajadas principais e seus rastros secundários.
- `src/index.css`: desenha, anima e adapta as rajadas, incluindo movimento reduzido.
- `tests/wind-layers.test.mjs`: verifica estruturalmente as garantias críticas de empilhamento, animação e acessibilidade.
- `package.json`: expõe o comando de teste.

### Task 1: Proteção estrutural das camadas

**Files:**
- Create: `tests/wind-layers.test.mjs`
- Modify: `package.json`
- Test: `tests/wind-layers.test.mjs`

- [ ] **Step 1: Criar o teste estrutural que inicialmente falha**

O teste deve ler `App.tsx`, `WindStreaks.tsx` e `index.css` e exigir: `isolate`, níveis positivos `z-0` a `z-40`, classe `wind-streak`, pseudo-elementos de rastro, `pointer-events-none`, `aria-hidden` e `prefers-reduced-motion`.

- [ ] **Step 2: Registrar e executar o teste**

Adicionar `"test": "node --test tests/*.test.mjs"` aos scripts do `package.json`.

Run: `npm test`

Expected: FAIL porque a pilha atual usa níveis negativos e ainda não há a nova classe de rajada.

### Task 2: Corrigir a pilha visual

**Files:**
- Modify: `src/App.tsx`
- Test: `tests/wind-layers.test.mjs`

- [ ] **Step 1: Isolar o contêiner principal**

Adicionar `isolate` ao `<main>` para criar um contexto local e previsível.

- [ ] **Step 2: Trocar camadas negativas por níveis positivos**

Usar `z-0` na imagem, `z-10` no overlay, `z-20` no vento, `z-30` na vinheta e ruído, e `z-40` no conteúdo. Manter todas as camadas decorativas com `pointer-events-none`.

- [ ] **Step 3: Executar o teste para observar a falha restante**

Run: `npm test`

Expected: FAIL somente nas garantias da nova aparência de `wind-streak`.

### Task 3: Construir rajadas fortes com rastros

**Files:**
- Modify: `src/components/WindStreaks.tsx`
- Modify: `src/index.css`
- Test: `tests/wind-layers.test.mjs`

- [ ] **Step 1: Ampliar os dados das rajadas**

Cada item receberá espessura e intensidade, além de posição, rotação, largura, duração, atraso e tom. As durações ficarão aproximadamente entre 2,4 e 4,4 segundos para que várias rajadas passem a cada poucos segundos.

- [ ] **Step 2: Renderizar a linha principal e rastros secundários**

Trocar `wind-bar` por `wind-streak`. Usar o elemento principal para o núcleo luminoso e `::before`/`::after` para duas linhas paralelas, deslocadas e mais finas.

- [ ] **Step 3: Aplicar o visual azul-branco energético**

Usar gradiente transparente nas pontas, núcleo branco, brilho ciano/azul, pequena compressão horizontal no início e aceleração suave durante a travessia. Garantir opacidade suficiente sobre o overlay escuro.

- [ ] **Step 4: Preservar acessibilidade**

Manter `aria-hidden`, `pointer-events: none` e uma regra de `prefers-reduced-motion` que pare a travessia e deixe somente poucos rastros estáticos discretos.

- [ ] **Step 5: Executar testes e build**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: TypeScript e Vite concluem sem erros.

### Task 4: Validação visual real

**Files:**
- Inspect: renderização local da aplicação

- [ ] **Step 1: Iniciar o servidor Vite**

Run: `npm run dev -- --host 127.0.0.1`

Expected: URL local disponível com resposta HTTP 200.

- [ ] **Step 2: Conferir viewport desktop**

Confirmar que a imagem da Jett aparece, as rajadas atravessam a tela na frente dela, o perfil e os links permanecem na frente e os botões continuam legíveis.

- [ ] **Step 3: Conferir viewport móvel**

Confirmar cobertura total, movimento fluido, ausência de rolagem horizontal e preservação dos alvos de toque.

- [ ] **Step 4: Encerrar o servidor e registrar o resultado**

Encerrar apenas o processo Vite iniciado nesta validação e relatar qualquer diferença entre o design e o resultado renderizado.
