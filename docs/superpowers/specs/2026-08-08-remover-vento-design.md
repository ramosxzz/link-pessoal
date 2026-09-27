# Remoção das animações de vento

## Objetivo

Deixar a página somente com a imagem da Jett ao fundo, mantendo o overlay, a vinheta, a granulação, o perfil e os links atuais.

## Alteração

- Remover a importação e a renderização de `WindStreaks` em `App.tsx`.
- Remover de `index.css` as regras `.wind-wisp` e `@keyframes natural-wind`.
- Preservar todas as demais camadas visuais e interações.
- Manter os ativos antigos fora do bundle; eles não serão carregados pelo navegador.

## Verificação

- Um teste estrutural deve falhar enquanto houver referência ao componente, à classe ou aos keyframes de vento.
- O build deve concluir sem importar `WindStreaks`.
- Na URL pública devem existir zero elementos `.wind-wisp`, sem erros no console.
