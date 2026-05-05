# Fase 3 - Motion System

## Objetivo
Criar um sistema de animacoes reutilizavel, elegante e performatico para a narrativa de scroll.

## Escopo
- Padroes reutilizaveis de motion
- Scroll suave
- Timelines por secao
- Limites para performance

## Blocos de Animacao
1. Reveal (fade + translateY)
2. Stagger para listas/cards
3. Parallax de profundidade
4. Blur-in/blur-out controlado
5. Scale suave em elementos de destaque

## Ferramentas
- Framer Motion para animacoes de componente
- GSAP + ScrollTrigger para timeline no scroll
- Lenis para suavidade de rolagem

## Regras de Uso
- Uma animacao principal por viewport
- Evitar mais de 2 efeitos simultaneos de alto custo
- Prefers-reduced-motion respeitado
- Fallback para mobile intermediario/fraco

## Entregaveis
- Biblioteca interna de efeitos prontos
- Aplicacao em 2-3 secoes piloto
- Guia rapido de quando usar cada efeito

## Criterios de Aceite
- Animacoes consistentes entre secoes
- Scroll fluido sem stutter relevante
- Fallback funcional em dispositivos limitados

## Riscos
- Excesso de timelines concorrentes
  - Mitigacao: budget de motion e auditoria por secao.

## Checklist
- [ ] Lenis integrado
- [ ] ScrollTrigger integrado
- [ ] Presets de animacao definidos
- [ ] Piloto validado em secoes-chave
- [ ] Fallbacks configurados
