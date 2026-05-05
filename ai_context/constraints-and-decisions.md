# Constraints and Decisions

## Product constraints
- Frontend-first delivery.
- Visual quality is prioritized.
- Content fidelity to SCBRS source messaging is mandatory.

## Technical constraints
- No mandatory backend in current scope.
- Direct browser fetch to RSI members page is blocked by CORS policy.

## Key decisions already made
1. Root scripts orchestrate frontend commands for easier developer workflow.
2. Landing copy is centralized in one file (`landingContent.ts`).
3. Motion stack combines Framer Motion (component-level) and GSAP (scroll depth effects).
4. Reduced-motion users are respected via media-query handling.

## Documentation conventions
- `ai_context/` is English-only.
- `docs/` is Portuguese and human-oriented.
- `roadmaps/` tracks planning and phase execution.
