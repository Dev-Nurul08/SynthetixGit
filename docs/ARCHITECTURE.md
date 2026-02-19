# 🏛️ SynthetixGit Comprehensive Architecture Guide

SynthetixGit is an all-in-one developer profile and repository README studio that aggregates live data from GitHub GraphQL v4, generates dynamic animated SVGs, offers an interactive 52x7 contribution art painter, embeds HTML5 arcade games, and provides 1-Click GitHub Actions deployment.

---

## 1. Core Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 16 App Router                     │
├──────────────────────────────┬──────────────────────────────┤
│      Studio Client (Zustand) │    REST & SVG API Routes     │
│  - 15 Designer Presets       │  - /api/user/scan/:user      │
│  - 52x7 Canvas Painter       │  - /api/user/generate-profile│
│  - Project Repo Mode         │  - /api/svg/header           │
│  - 1-Click GitHub Deployer   │  - /api/svg/divider          │
│                              │  - /api/svg/spotify          │
│                              │  - /api/svg/game-banner      │
├──────────────────────────────┴──────────────────────────────┤
│                   Data & Aggregation Layer                  │
│  - GitHub GraphQL v4 (52-week calendar, contributions, stars)│
│  - GitHub REST v3 Fallback                                  │
│  - In-Memory 6-Hour TTL Diagnostic Cache                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 10 Core Architectural Phases

1. **Phase 1: Core Engine & Multi-Source GitHub Aggregator**
   - Queries GitHub GraphQL v4 with REST v3 fallback.
   - 6-hour TTL cache with hit/miss ratio tracking.

2. **Phase 2: Live Split-View Interactive Workspace & 15 Presets**
   - High-contrast live markdown editor with split preview and 15 designer presets (Beast Mode Neon, Cyberpunk Glitch, Dracula, Nord, Retro Terminal, etc.).

3. **Phase 3: Dynamic Typography & Custom SVG Font Engine**
   - Server-side SVG rendering with 3D Bubble text, Cyberpunk glitch shifts, Terminal prompts, and Signature handwritten cursive.

4. **Phase 4: Contribution Canvas Art & Commit Graph Painter**
   - 52x7 interactive dot-matrix painter with text-to-pixel conversion and standalone `paint-graph.sh` backdate script generator.

5. **Phase 5: Interactive Game Suite & `/play` Route**
   - Playable browser arcade with Snake, Brick Breaker, and Pac-Man using the user's real GitHub commits as the playable level.

6. **Phase 6: Animated SVG Section Dividers**
   - 8 dynamic animated separator styles (Rainbow flow, Snake crawl, Laser node, EQ wave, Cyber circuit).

7. **Phase 7: Tech Stack, Skill Matrix & Trophy Customizer**
   - 250+ developer badges categorized with dynamic level status pills and S/A/B trophy rank filters.

8. **Phase 8: Repository & Single-Project README Architecture Builder**
   - Project mode generating complete documentation with ASCII tree diagrams, Docker guides, and API reference tables.

9. **Phase 9: Dynamic Widgets Engine**
   - Spotify live now-playing badge, LeetCode contest rating, Blog RSS sync, and daily quotes.

10. **Phase 10: 1-Click OAuth GitHub Deployer**
    - One-click publishing to `${username}/${username}` with automated `.github/workflows/snake.yml` provisioning.
