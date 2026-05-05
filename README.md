# SCBRS-01 Site

## Resumo
Projeto frontend da landing page da comunidade **SCBRS-01 (Star Citizen Brazilian Station)**.

Foco atual:
- visual premium com animações de scroll
- conteúdo institucional da comunidade
- execução local simples via scripts na raiz

## Stack
- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis

## Estrutura do Repositório
- `frontend/`: aplicação web principal
- `roadmaps/`: planejamento por fases e plano mestre
- `ai_context/`: documentação técnica para IA (em inglês)
- `docs/`: documentação de negócio para humanos (em português)

## Como Rodar
Na raiz do projeto:

```powershell
npm install
npm run dev
```

Abrir: [http://localhost:5173](http://localhost:5173)

## Scripts da Raiz
- `npm run dev`: inicia frontend
- `npm run build`: build de produção do frontend
- `npm run preview`: preview do build
- `npm run dev:front`: inicia somente frontend
- `npm run dev:back`: reservado para backend futuro

## Conteúdo e Atualizações
Os textos da landing estão centralizados em:
- `frontend/src/content/landingContent.ts`

O layout/efeitos principais estão em:
- `frontend/src/app/AppShell.tsx`

## Status
- Planejamento Fases 1 a 6: concluído (ver `roadmaps/`)
- Implementação visual: em evolução contínua
