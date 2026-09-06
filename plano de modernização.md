# Plano de Modernização Visual — Portfólio Bruno Gonçalves Siqueira

> Documento de execução derivado da Auditoria Visual completa do projeto.
> Cada fase lista: objetivo, arquivos afetados, tarefas concretas e critério de "pronto".
> Nenhuma fase deve começar sem aprovação prévia do Fase 1 (Design System), pois todas as outras dependem dela.

---

## Visão Geral das Fases

| Fase | Nome | Prioridade | Depende de |
|---|---|---|---|
| 1 | Design System (tokens) | P0 | — |
| 2 | Cores | P0 | Fase 1 |
| 3 | Deduplicação de CSS (Currículo/Recomendações) | P0 | Fase 1 |
| 4 | Tipografia | P1 | Fase 1 |
| 5 | Superfícies, cards, bordas e sombras | P1 | Fase 2 |
| 6 | Botões (componente único) | P1 | Fase 2 |
| 7 | Header, navegação e iconografia | P1 | Fase 2 |
| 8 | Conteúdo principal (Home / Currículo / Recomendações / Blog) | P1 | Fases 2, 6, 7 |
| 9 | Test.Me (contenção da paleta e da narrativa Matrix) | P0/P1 | Fases 1, 2 |
| 10 | Responsividade — revisão pós-mudanças | P2 | Fases 5–9 |
| 11 | Microinterações (hover/transition unificados) | P2 | Fase 6 |
| 12 | Auditoria visual final | P2 | Todas |

---

## Fase 1 — Design System (Tokens)

**Objetivo:** criar a fonte única da verdade para cor, tipografia, espaçamento e raio, em `css/00_globals.css`, para que nenhuma página volte a "inventar" valores.

**Arquivos afetados:** `css/00_globals.css` (edição), demais arquivos apenas leem as novas variáveis nas fases seguintes.

**Tarefas:**
1. Adicionar tokens de cor novos ao `:root`, mantendo os já existentes que fazem sentido:
   - `--color-accent` (nova cor de marca própria — a definir com o usuário; não usar o azul do LinkedIn puro)
   - `--color-accent-hover`
   - `--color-success`, `--color-error`, `--color-warning` (1 tom cada, uso semântico apenas)
   - `--border-color-subtle` (substituto neutro para as bordas azuis decorativas)
2. Adicionar escala tipográfica modular (ex.: `--font-size-xs/sm/base/lg/xl/2xl`) cobrindo os tamanhos hoje soltos (`0.75rem` até `1.45rem`/`28px`).
3. Adicionar escala de espaçamento em grade de 8px (`--space-1` a `--space-8`).
4. Consolidar `--borderRadius-padrao` em 2 variáveis: `--radius-sm` (cards/inputs) e `--radius-pill` (tags/avatar).
5. Definir 1–2 variáveis de sombra (`--shadow-sm`, `--shadow-md`) para uso pontual controlado.

**Critério de pronto:** `00_globals.css` contém todas as variáveis novas, documentadas com comentário de uso; nenhuma outra página foi tocada ainda.

---

## Fase 2 — Cores

**Objetivo:** eliminar os hardcodes de cor duplicados/divergentes e trocá-los pelos tokens da Fase 1.

**Arquivos afetados:** `03_body.css`, `04_forms.css`, `05_formRedesExterna.css`, `06_footer.css`, `button.css`, `tooltip.css`, `pageBlog.css`, `pageCurriculo.css`, `pageRecomendacoes.css`, `pageTestMe.css`.

**Tarefas:**
1. Substituir todas as ocorrências de `#0066cc`, `#0A66C2`, `#0a66c2` por `var(--color-accent)`.
2. Remover as cores de bandeira dos botões `.btn-pt`, `.btn-es`, `.btn-in` (ver Fase 8 para o novo tratamento visual desses botões).
3. Trocar bordas azuis decorativas de cards (`.projetos`, `.sobre`, `.contWhats`, `.entreEmContato`, `.blog-card-*`, `.curriculum-card-*`, `.recommendations-card-*`) por `var(--border-color-subtle)`.
4. Em `pageTestMe.css`: mapear os ~65 hex atuais para o pequeno conjunto de tokens semânticos (`--color-success`, `--color-error`, `--color-warning`, `--color-accent`) — cada família de cor (verde, vermelho, laranja, azul) vira 1 tom só.
5. Substituir a cor da estrela do carrossel (`#ffc107`) por `--color-warning` ou remover se decorativa sem função semântica real.

**Critério de pronto:** `grep` por hex codes soltos nos arquivos CSS retorna apenas os valores definidos dentro de `00_globals.css`; nenhuma cor de marca é mais digitada à mão fora dele.

---

## Fase 3 — Deduplicação de CSS (Currículo/Recomendações)

**Objetivo:** eliminar o risco de manutenção causado por `pageCurriculo.css` e `pageRecomendacoes.css` compartilharem ~550 linhas idênticas.

**Arquivos afetados:** criar `css/_profileCard.css` (ou nome equivalente); editar `pageCurriculo.css`, `pageRecomendacoes.css`, `pageBlog.css`; editar os `<link>` em `curriculo.html`, `recomendacoes.html`, `blog.html`.

**Tarefas:**
1. Extrair para o novo arquivo compartilhado: `.profile-photo`, `.profile-name`, `.profile-title`, `.profile-location`, `.profile-company`, `.profile-skills`, `.skill-tag`, `.profile-actions`, `.btn-secondary`, `.accordion-*` (tudo hoje duplicado nas 3 páginas).
2. Remover essas regras de `pageBlog.css`, `pageCurriculo.css` e `pageRecomendacoes.css`, deixando cada arquivo apenas com o que é específico daquela página.
3. Adicionar `<link rel="stylesheet" href="../../css/_profileCard.css" />` nas 3 páginas, antes do CSS específico de cada uma.

**Critério de pronto:** as 3 páginas renderizam visualmente idênticas ao estado atual; nenhuma regra de componente de perfil/accordion está duplicada em mais de um arquivo.

---

## Fase 4 — Tipografia

**Objetivo:** consolidar os tamanhos de fonte soltos na escala definida na Fase 1.

**Arquivos afetados:** todos os arquivos CSS de página.

**Tarefas:**
1. Levantar todos os `font-size` com valor literal (`0.9rem`, `1.1rem`, `1.2rem`, `1.3rem`, `13px`, `14px`, `16px`, `28px`, etc.).
2. Mapear cada um para o token de escala mais próximo (Fase 1) e substituir.
3. Confirmar que `line-height` e `letter-spacing` seguem as variáveis já existentes (`--line-height-padrao`, `--letter-spacing-padrao`) sem overrides soltos desnecessários.

**Critério de pronto:** nenhum `font-size` com valor literal fora da lista de tokens definida na Fase 1.

---

## Fase 5 — Superfícies, Cards, Bordas e Sombras

**Objetivo:** um único critério visual para "o que é um card" e "quando algo tem destaque".

**Arquivos afetados:** `02_head.css`, `03_body.css`, `04_forms.css`, `button.css`, arquivos `page*.css`.

**Tarefas:**
1. Padronizar todos os cards (`.caixa-conteudo`, `.card-projeto`, `.blog-card-*`, `.curriculum-card-*`, `.recommendations-card-*`, `.testing-card-*`) para usar `var(--border-color-subtle)` + `var(--radius-sm)` + `var(--shadow-sm)` no estado padrão.
2. Reservar `var(--color-accent)` como borda/realce **apenas** em estados interativos (hover, foco) ou CTA primário — nunca como borda estática decorativa.
3. Revisar hovers de card (`background-color: #1a1a1a`) para usar variável em vez de hex solto.

**Critério de pronto:** busca por `border.*#0066cc` ou `border.*#1a1a1a` hardcoded não retorna mais resultados fora de `00_globals.css`.

---

## Fase 6 — Botões (Componente Único)

**Objetivo:** substituir as 6+ variantes de botão por um componente único com poucas variantes reais.

**Arquivos afetados:** `button.css` (vira o arquivo central de botões), `02_head.css`, `04_forms.css`, `pageBlog.css`, `pageCurriculo.css`, `pageRecomendacoes.css`, `pageTestMe.css`.

**Tarefas:**
1. Definir em `button.css` uma classe base `.btn` + modificadores `.btn--primary`, `.btn--secondary`, `.btn--ghost`.
2. Migrar `.btn-action`, `.btn-secondary`, `.verMais`, `.contact-btn`, `.sidebar-btn` para essa base (mantendo classes de compatibilidade se necessário para não reescrever todo HTML de uma vez).
3. Em `pageTestMe.css`: unificar `.btn-primary/success/danger/get/post/put/delete` num único `.btn` + variante semântica (`.btn--success`, `.btn--danger`), mantendo cor por verbo HTTP **apenas** onde for funcionalmente necessário para o propósito educativo daquele bloco de teste.
4. Remover as cores de bandeira de `.btn-pt`/`.btn-es`/`.btn-in` (Fase 2) e redesenhar como variante `.btn--secondary` com uma bandeira pequena apenas como emoji/ícone de apoio, não como borda inteira colorida.

**Critério de pronto:** existe 1 arquivo (`button.css`) do qual todas as variantes de botão herdam; nenhuma página define padding/cor de botão do zero.

---

## Fase 7 — Header, Navegação e Iconografia

**Objetivo:** remover emoji estrutural e consolidar os ícones em um único conjunto visual.

**Arquivos afetados:** `01_header.css`, `img/icones/` (curadoria de arquivos), `index.html`, `blog.html`, `curriculo.html`, `recomendacoes.html`, `testMe.html`.

**Tarefas:**
1. Substituir os emojis do menu (`🏠 👥 💼 💬 🔔`) por ícones SVG monocromáticos que herdam `currentColor`.
2. Auditar `img/icones/` e remover/renomear duplicatas (`rs_email.png` vs `rs_emaill.png`), padronizar formato (preferencialmente SVG ou WebP).
3. Manter emoji **apenas** em corpo de texto de blog/seção "Sobre", nunca em nav, título de seção estrutural ou botão de CTA.

**Critério de pronto:** nenhum emoji dentro de `<nav>`, `<h1>`/`<h2>` de seção estrutural, ou texto de `<button>`/CTA principal.

---

## Fase 8 — Conteúdo Principal

**Objetivo:** aplicar as fases anteriores ao conteúdo real de cada página e corrigir problemas de UX apontados na auditoria.

### Home (`index.html`)
- Corrigir os 3 links mortos do hero (`href="#"` em Skills/Projetos/Contatos) — apontar para âncoras reais ou remover os botões até existirem destinos.
- Reestruturar o texto de "Sobre" em listas HTML reais (`<ul>/<li>`) em vez de `<br><br>`, mantendo o conteúdo, reduzindo densidade de emoji por linha.

### Currículo / Recomendações
- Aplicar Fase 3 (dedupe) e Fase 2 (remoção das cores de bandeira).
- Revisar paginação do carrossel de recomendações (17 dots) — considerar agrupar em blocos ou trocar por setas + contador ("3 / 17").

### Blog
- Já é a referência visual mais próxima do alvo — aplicar apenas tokens da Fase 1/2, sem mudanças estruturais.

**Critério de pronto:** todos os CTAs do site levam a um destino real; seção "Sobre" é navegável por leitor de tela como lista; carrossel tem paginação legível em qualquer contagem de itens.

---

## Fase 9 — Test.Me (Contenção da Paleta e da Narrativa Matrix)

**Objetivo:** manter o playground de testes como diferencial funcional, sem que ele carregue a identidade visual do site inteiro para uma estética "hacker" datada.

**Arquivos afetados:** `pageTestMe.css`, `testMe.html`, `js/matrix.js`.

**Tarefas:**
1. Reduzir a paleta de status a 4 tokens (`--color-success/error/warning/accent`), já feito na Fase 2 — aqui é a validação final de que nenhum hex solto de status sobrou.
2. Decidir com o usuário o destino da animação Matrix/Zion: opções a colocar em pauta —
   - (a) manter como easter egg opcional, ativado por um botão discreto, não como fundo padrão da página;
   - (b) suavizar drasticamente (sem glow, 1 cor neutra, opacidade baixa);
   - (c) remover.
3. Ajustar a introdução textual ("pílula vermelha", "Zion") para um tom mais alinhado ao restante do site, mantendo a personalidade sem contradizer o objetivo de "maduro e profissional" — **a decidir com o usuário antes de reescrever qualquer texto**, pois é conteúdo de marca, não só estilo.

**Critério de pronto:** paleta do Test.Me com o mesmo conjunto de tokens do resto do site; decisão registrada sobre o destino da animação Matrix.

---

## Fase 10 — Responsividade (Revisão Pós-Mudanças)

**Objetivo:** garantir que nenhuma mudança das Fases 2–9 quebrou os breakpoints existentes (1024px/768px).

**Tarefas:**
1. Revisar visualmente cada página nos breakpoints atuais após as mudanças de cor/tipografia/componentes.
2. Confirmar que botões unificados (Fase 6) mantêm `min-height: 44px` (padrão de acessibilidade já presente no código).

---

## Fase 11 — Microinterações

**Objetivo:** um único vocabulário de hover/transição.

**Tarefas:**
1. Consolidar todas as transições em `var(--transicao-padrao)` já existente, removendo `transition` redefinidos ad-hoc por componente quando não houver razão funcional.
2. Padronizar o efeito de hover de card (hoje: escurece background) e de botão (hoje: `scale(1.05)`) como os dois únicos padrões de feedback do site.

---

## Fase 12 — Auditoria Visual Final

**Objetivo:** checagem cruzada entre todas as páginas após a modernização.

**Tarefas:**
1. Repetir o levantamento de cores hex (`grep` por `#[0-9a-fA-F]{3,8}` fora de `00_globals.css`) e confirmar que o resultado é próximo de zero.
2. Revisar todas as páginas lado a lado para confirmar consistência de card, botão, borda, tipografia.
3. Validar que o Test.Me não destoa mais do restante do site em densidade de cor.

---

## Observações Gerais

- Nenhuma fase deve remover conteúdo (texto, projetos, depoimentos) — o escopo é exclusivamente visual/estrutural de CSS, com exceção pontual do texto "Sobre" (Fase 8, reestruturação em lista) e da narrativa do Test.Me (Fase 9, a decidir com o usuário).
- A cor de marca (`--color-accent`) ainda precisa ser definida com o usuário antes da Fase 2 — este plano assume que ela **não** será o azul do LinkedIn puro (`#0A66C2`), conforme recomendado na auditoria.
- Cada fase pode ser aprovada e executada independentemente, mas a ordem acima respeita as dependências reais entre elas (ex.: não faz sentido mexer em botões antes de existir o token de cor).
