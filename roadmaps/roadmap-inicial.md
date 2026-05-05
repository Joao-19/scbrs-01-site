# Roadmap Inicial - SCBRS Frontend

## Objetivo
Construir um frontend moderno, imersivo e responsivo para o site da comunidade SCBRS, com foco em narrativa visual, animações de scroll e base técnica escalável.

## Princípios de Produto
- Visual premium com identidade "galaxy/sci-fi" sem poluição.
- Performance primeiro: efeitos visuais com orçamento de renderização.
- Mobile tão bem resolvido quanto desktop.
- Arquitetura simples no início, preparada para crescer.

## Stack Definida (Fase Inicial)
- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (scroll suave)

## Fase 1 - Descoberta e Direção Visual
1. Definir referências visuais (3 a 5 sites) e extrair padrões.
2. Definir moodboard: cores, tipografia, atmosfera, motion.
3. Definir mapa da landing (seções e narrativa do scroll).
4. Definir critérios de sucesso visual e técnico.

Entregáveis:
- Documento de direção visual.
- Estrutura de seções da landing.
- Lista priorizada de animações por seção.

## Fase 2 - Fundação do Projeto
1. Inicializar projeto Vite + React + TypeScript.
2. Configurar Tailwind e tokens visuais (cores, espaçamento, sombras, gradientes).
3. Definir estrutura de pastas e convenções de componentes.
4. Criar layout base com Header, seções e Footer.

Entregáveis:
- Projeto rodando localmente.
- Design tokens iniciais.
- Estrutura base de UI pronta para evolução.

## Fase 3 - Motion System
1. Implementar sistema de animações utilitário (reveal, stagger, fade, parallax).
2. Integrar Lenis para suavidade de scroll.
3. Integrar GSAP ScrollTrigger para timelines por seção.
4. Definir limites de uso de animação para não comprometer UX.

Entregáveis:
- Biblioteca interna de padrões de animação.
- Demo com animações base aplicadas em 2 a 3 seções.

## Fase 4 - Implementação da Landing (V1)
1. Hero imersivo com visual impactante e CTA principal.
2. Seções de conteúdo (comunidade, benefícios, atividades, entrada).
3. Blocos visuais com transições entre seções.
4. CTA final e Footer com links essenciais.

Entregáveis:
- Landing page V1 funcional.
- Fluxo de leitura com narrativa visual consistente.

## Fase 5 - Responsividade e Performance
1. Ajustar breakpoints críticos (mobile, tablet, desktop).
2. Otimizar imagens e reduzir custo de animações pesadas.
3. Revisar CLS/LCP/INP e corrigir gargalos principais.
4. Implementar fallback para dispositivos mais fracos.

Entregáveis:
- Versão responsiva validada.
- Checklist de performance atendido.

## Fase 6 - QA Visual e Polimento
1. Revisão visual completa (spacing, contraste, hierarquia).
2. Ajustes de microinterações e timing de motion.
3. Testes cross-browser essenciais.
4. Congelar V1 para publicação.

Entregáveis:
- Release Candidate de frontend.
- Lista de ajustes pós-lançamento (V1.1).

## Backlog Inicial (Pós V1)
- Tema alternativo por evento/campanha.
- Modo com fundo 3D opcional.
- Sistema de notícias/eventos dinâmico.
- Internacionalização (PT/EN).

## Riscos e Mitigações
- Excesso de animação prejudicar usabilidade.
  - Mitigação: budgets de motion e revisão por seção.
- Queda de performance em mobile.
  - Mitigação: redução progressiva de efeitos e assets adaptativos.
- Escopo visual crescer sem controle.
  - Mitigação: definição de "Definition of Done" por fase.

## Definition of Done (Planejamento)
- Roadmap validado.
- Stack aprovada.
- Prioridades da V1 fechadas.
- Critérios de qualidade definidos antes de codar.
