# Project Overview

## What this project is
A frontend-focused landing page for **SCBRS-01 (Star Citizen Brazilian Station)**.

## Current scope
- Build and refine a premium visual experience.
- Keep the original community copy and narrative aligned with the source site.
- Provide smooth scroll-driven motion.

## Non-goals (current phase)
- No backend ownership in this repository.
- No real-time member scraping from RSI in-browser due CORS constraints.

## Repository map
- `frontend/`: application source code and build outputs.
- `roadmaps/`: planning artifacts (phase documents and execution tracking).
- `ai_context/`: AI-facing technical docs (English).
- `docs/`: human-facing business docs (Portuguese).

## Runtime model
- Root-level scripts proxy to frontend scripts using `npm --prefix frontend ...`.
- This allows developers to work from repository root without changing directories.
