# Architecture

## Frontend stack
- Vite
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis

## Relevant files
- `frontend/src/app/AppShell.tsx`: main landing composition and motion behavior.
- `frontend/src/content/landingContent.ts`: textual content and links for sections.
- `frontend/src/lib/motion.ts`: reusable Framer Motion variants.
- `frontend/src/lib/useLenis.ts`: smooth scroll setup.
- `frontend/src/styles/tokens.css`: color and style tokens.
- `frontend/src/index.css`: global CSS and reduced-motion handling.

## Visual system
- Dark sci-fi base with controlled accent glows.
- Scroll-reactive background layers.
- Section reveals and subtle depth/parallax.

## Build
- Root script delegates build to `frontend`.
- Production output is generated under `frontend/dist/`.
