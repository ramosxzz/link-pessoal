# Rajadas de vento naturais a partir do pacote Vecteezy

## Objetivo

Adicionar ao fundo da página rajadas de vento brancas, suaves e naturais usando as formas fornecidas no pacote `vecteezy_wind-white-smoke-or-cold-air-motion-effect_12975347_97.zip`. O movimento deve parecer ar ou fumaça leve, sem brilho neon e sem prejudicar a leitura ou a interação com os links.

## Diagnóstico atual

A primeira correção já resolveu a pilha de camadas e tornou o efeito visível, mas as barras retas com brilho ciano ficaram parecidas com lasers. Essa aparência foi rejeitada. A nova versão preservará a ordem correta das camadas e substituirá integralmente as barras pelas formas naturais do pacote fornecido.

## Fonte visual

O pacote contém uma prévia JPG com o quadriculado incorporado e um original EPS vetorial. A prévia não será exibida no site. As rajadas serão extraídas do original e exportadas com transparência real para preservar as curvas, fibras internas e névoa suave escolhidas pelo usuário.

## Solução escolhida

Usar elementos gráficos transparentes derivados do EPS, posicionados por React e animados com CSS, sem Canvas. A página manterá uma pilha de camadas positiva e previsível:

1. imagem de fundo;
2. overlay escuro;
3. rajadas de vento;
4. vinheta e granulação;
5. conteúdo interativo.

O contêiner principal criará seu próprio contexto de empilhamento. Nenhuma camada visual essencial dependerá de ficar atrás do fundo do documento.

## Aparência e movimento

- Serão usadas exatamente as formas curvas aprovadas no pacote fornecido.
- As rajadas serão brancas, translúcidas e difusas, sem brilho azul ou aparência de laser.
- Somente uma ou duas rajadas aparecerão por vez.
- Cada rajada atravessará apenas parte da tela, com leve deslocamento vertical, escala e opacidade variáveis.
- O surgimento e o desaparecimento serão graduais, com intervalos de respiro entre as passagens.
- As rajadas ficarão atrás do perfil e dos botões para manter a legibilidade e os alvos de clique livres.
- O efeito cobrirá toda a viewport e se adaptará a telas móveis e desktop.

## Acessibilidade e desempenho

- A camada será decorativa, terá `aria-hidden` e não interceptará cliques.
- Os ativos transparentes serão otimizados para web e a animação usará somente `transform` e `opacity`.
- Em `prefers-reduced-motion: reduce`, as rajadas ficarão estáticas ou quase imperceptíveis.
- Não serão adicionadas bibliotecas nem requisições externas.

## Validação

- Executar a compilação TypeScript/Vite sem erros.
- Renderizar a página localmente e confirmar visualmente que o fundo, as rajadas e o conteúdo aparecem juntos.
- Confirmar que as rajadas curvas passam na frente da imagem e atrás do conteúdo, sem qualquer fundo quadriculado.
- Confirmar que não há linhas neon, brilho azul ou movimento excessivo.
- Conferir o comportamento em viewport móvel e desktop.
- Confirmar que os botões continuam clicáveis e legíveis.
