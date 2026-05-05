# Content Model

## Canonical content source
`frontend/src/content/landingContent.ts` is the single source of truth for on-page copy.

## Main content blocks
- `hero`
- `sobre`
- `divisoes`
- `historia`
- `recrutamento`
- `footer`

## Content policy
- Keep section copy aligned with the source SCBRS identity and messaging.
- Avoid generic marketing rewrites unless explicitly requested.
- Preserve official links:
  - Discord invite
  - RSI organization page

## Members count
- Real-time browser-only extraction from RSI is not used due CORS restrictions.
- Any members count shown in UI must be static/manual unless architecture changes.
