# Specification: SynthetixGit UI Overhaul & Feature Completion

## 1. Problem Statement
SynthetixGit has 100+ cross-cutting issues across the entire product surface:
- Hardcoded developer name ("Nurul", "Fr_Nurul") appears as default/placeholder text instead of dynamically using the connecting GitHub user's username
- Gradient and neon/aesthetic naming leaks into the app UI layer (not just generated README content), against explicit design constraints
- The 3D hero canvas is visually intense and out of balance with the "subtle animation, not heavy 3D" guideline
- The Profile README Studio lacks a guided, step-by-step wizard UX — users currently face a flat tab-based sidebar
- GitHub direct deployment is unreliable; the download-and-manual-deploy path needs to be elevated to first-class UX
- The GitHub contribution art painter doesn't reliably pick the connected username as the default paint text
- Post-game CTA (call-to-action) exists but is not integrated with the game-suite markdown that users embed in their READMEs
- Playable game links in generated READMEs do not route visitors back to SynthetixGit, losing referral traffic
- Slate-* raw colors are still used in several components (deploy-modal, sidebar-controls, canvas-painter, play-page) instead of the semantic token system

## 2. Users & Goals

### Primary Users
1. **GitHub Profile Owner**: Wants a fast, guided way to produce a polished README.md + contribution art + arcade games, pushed to their profile repo (or downloaded if OAuth/PAT isn't configured).
2. **README Visitor (referral)**: Clicks a game play link or banner inside a profile README, lands on SynthetixGit, and should be gently encouraged to generate their own README.

### Goals
- G1: Eliminate every hardcoded "Nurul" default/placeholder/name so the product feels personal for every new connecting user
- G2: Ban gradient/neon from the synthetix.app surface UI (not user-generated content) — rename template IDs/names that include "neon" in the UI display
- G3: Build a step-wise README Wizard (7 steps) that onboards users without overwhelming them
- G4: Elevate the "Download & Manual Deploy" option in the Deploy modal to be the primary path, while keeping the OAuth placeholder as clearly labeled
- G5: Make HeroCanvas subtle (reduced 3D intensity, lower particle count, reduced additive blending to feel calm)
- G6: Wire the game-suite README section to produce clickable "Play Game" badges that redirect to the SynthetixGit play routes; on the play page strengthen the in-line CTA for new visitors
- G7: Unify styling across the app to use only globals.css semantic tokens (no raw slate-* classes in shared components)
- G8: Use smooth, tasteful Framer Motion animations (fade/slide/scale) — avoid flashy transitions

## 3. Non-Goals
- NG1: Implementing real GitHub OAuth token exchange server-side (client-side OAuth button redirect placeholder only, with documentation links)
- NG2: Rewriting the template engine compiler itself (markdown structure is out of scope — only bannerColor defaults and game suite link injection)
- NG3: Adding new games or new SVG widget types
- NG4: Redis/zany cache layer, AWS/Azure infra setup, or database work (acknowledged by user but de-scoped pending their DevOps input)
- NG5: Dark/light theme toggle (stays dark-only for now)

## 4. Functional Requirements

### FR1 — Username Defaults
- FR1.1: The LeetCode widget default username must be the active GitHub username (placeholder empty, fall back to "octocat")
- FR1.2: The LeetCode sidebar input placeholder must not contain "Fr_Nurul" (use "your-leetcode" style placeholder)
- FR1.3: The Canvas Painter default customText must derive from the active user's GitHub login (capitalized, alphanumeric, ≤ 8 chars), not static
- FR1.4: The profile-store default username must be empty string; fall back to "octocat" only when scanning anonymously on the home page

### FR2 — Gradient & Neon Removal From App UI
- FR2.1: bannerColor 'gradient' defaults in editor-store applyTemplatePreset must be replaced with solid color hex codes from the design palette
- FR2.2: compileTypingSvg color default must be a solid hex ("22D3EE") not "gradient"
- FR2.3: Project README engine capsule banner must use solid palette colors in place of gradient parameter
- FR2.4: Template display names that contain "Neon" are rebranded to non-neon display labels (the underlying templateId may remain for backwards compatibility)
- FR2.5: Remove any rainbow-gradient / neon divider names from the visible sidebar options list (keep internal API support for existing cached renders)
- FR2.6: globals.css subtle radial/linear grid background textures are EXEMPT (they are atmosphere, not "gradient UI")

### FR3 — Step-Wise README Wizard
- FR3.1: New component `src/components/studio/readme-wizard.tsx` renders as a stepper UI with numbered steps
- FR3.2: Step 1 — Identity & Header: Name (pre-filled), subtitle, header style picker (5 styles, thumbnails), background effect selector
- FR3.3: Step 2 — Tech Stack: Searchable multi-select tech badge picker with role presets
- FR3.4: Step 3 — Productivity Integrations: WakaTime username/URL input, toggle on/off
- FR3.5: Step 4 — Coding Profiles: LeetCode username, LinkedIn URL, optional Twitter/X, Portfolio URL
- FR3.6: Step 5 — Section Divider Style: Visual picker of divider styles with per-style preview SVG
- FR3.7: Step 6 — Featured Projects & Sections: One-by-one toggles for beast dashboard, GitHub analytics, About Me, Social links, Trophies
- FR3.8: Step 7 — GitHub Arcade Game: Choose Snake / Brick Breaker / Pac-Man (toggle on), plus CTA "Play Game" badge that links to SynthetixGit
- FR3.9: Wizard provides "Previous / Next" navigation and a progress indicator; completing final step applies modules to editor store and closes wizard; open from studio entry banner CTA button

### FR4 — Deploy Modal Overhaul
- FR4.1: "Option 2: Download & Manual Deploy" is moved above Option 1 (OAuth/PAT) and visually highlighted as the recommended reliable path
- FR4.2: GitHub OAuth button becomes a prominent "Connect with GitHub →" style button that links to github.com/login/oauth (placeholder URL), clearly labeled as "coming soon auth"; users who enter username are conceptually redirected through GitHub authorize flow
- FR4.3: Download buttons use semantic tokens styling, not raw slate colors
- FR4.4: Target repo line uses active username dynamically

### FR5 — Game Suite: Playable Links & CTA Loop
- FR5.1: template-engine gameSuite section markdown must render clickable "🎮 Play Snake | Brick Breaker | Pac-Man on SynthetixGit" image badges that navigate to `/play/${username}/${game}`
- FR5.2: Each game CTA badge uses a solid accent background, not gradient
- FR5.3: The play/[username]/[game] page triggers a CTA toast at 25s (not 30) AND a modal on game-over with stronger copy: "Want YOUR README to have playable arcade games? Generate yours in 2 minutes →"
- FR5.4: Store `lastUsername` on play visit for CTA primary-action routing back to the studio

### FR6 — HeroCanvas 3D Intensity Reduction
- FR6.1: Reduce starCount from 1800 to 900
- FR6.2: Remove the two nested icosahedron globes (wireframe spheres) from the scene entirely
- FR6.3: Lower palette to 2 brand colors plus white (no accent violet/emerald particles)
- FR6.4: Reduce additive blending opacity from 0.85 → 0.55; raise fog density to 0.06 so the scene fades earlier
- FR6.5: Reduce group rotation speed so the whole canvas feels calm, not spinning

### FR7 — Semantic Token Styling Cleanup
- FR7.1: `deploy-modal.tsx` replaces all `slate-*` classes with semantic tokens (bg-bg-secondary, text-text-primary, border-border-primary, etc.)
- FR7.2: `sidebar-controls.tsx` replaces all `slate-*` classes with semantic tokens
- FR7.3: `canvas-painter.tsx` replaces all `slate-*` classes with semantic tokens
- FR7.4: `play/[username]/[game]/page.tsx` replaces all `slate-*` classes with semantic tokens

## 5. Non-Functional Requirements

### NFR1 — Aesthetic & Animation
- NFR1.1: All component-level animations use Framer Motion fade-up / scale-in with durations between 0.25s and 0.5s
- NFR1.2: No infinite CSS `animate-ping` on status indicators except ONE single live-dot on the home page header chip
- NFR1.3: No radial/linear-gradient backgrounds on buttons or cards (solid semantic tokens only)
- NFR1.4: Color palette stays strictly within the semantic token ranges of globals.css (no direct hex overrides in components)

### NFR2 — Performance
- NFR2.1: HeroCanvas must not exceed 14 draw calls (currently ~3 after globe removal target)
- NFR2.2: Wizard stepper mounts only one step's form body at a time (no 7-form hidden DOM bloat)
- NFR2.3: Lighthouse TTI on home page should stay under 2.2s (no new heavy JS)

### NFR3 — Correctness & Compatibility
- NFR3.1: After edits, Next.js production build (`next build`) must compile with 0 TypeScript errors
- NFR3.2: `eslint` reports no new errors (tolerate pre-existing but fix any introduced)
- NFR3.3: LocalStorage persisted state (editor-store v3, profile-store) format compatibility preserved — no storage key changes

## 6. Constraints & Dependencies

### Constraints
- C1: Existing template-id strings are preserved at REST API / URL param level for URL backwards compatibility; display labels only are renamed
- C2: No new npm packages are installed (use existing: react, zustand, framer-motion, react-hot-toast, react-icons/fi, three)
- C3: No server-side GitHub OAuth secret handling; keep OAuth buttons as placeholder with redirect-to-github-links
- C4: .env secrets and any Azure/AWS/DevOps support are user-provided later; stub only the UI surfaces

### Dependencies
- D1: `zustand` editor-store — module state must be updated atomically by wizard apply step
- D2: `template-engine.ts` compileProfile flow — gameSuite section markdown must be extended without breaking signature
- D3: `globals.css` semantic token vocabulary — all new styling binds to existing vars
- D4: `studio/page.tsx` layout — wizard mounts into the Profile Workspace header area as an optional collapsible panel

## 7. Assumptions
- A1: OAuth real flow is deferred; the user accepts the Connect GitHub buttons as links to the GitHub OAuth settings page with clear "Configure OAuth App" messaging
- A2: Download README as the primary deploy path meets user requirements given the known limitations of direct GitHub API deploys without backend secrets
- A3: The user's uploaded 5 screenshots (image_1.png … image_5.png) reference issues consistent with the textual issue list; screenshots are treated as issue visual context, not pixel-perfect redesign targets
- A4: Project repo links pointing to github.com/Dev-Nurul08/SynthetixGit — these are intentionally the correct source-repo URLs and should NOT be rewritten; only username-default/placeholder entries are rewritten

## 8. Open Questions
- Q1: Should GitHub OAuth buttons point users to create their own OAuth app via https://github.com/settings/developers (recommended), or to a dedicated hosted auth page if/when DevOps secrets arrive? (Default: developers settings page)
- Q2: For the wizard open/close UX — should it auto-open on first studio visit for a new username, or always stay closed behind a "Start Wizard" button? (Default: auto-open once per new username via localStorage flag)

## 9. Acceptance Criteria

### Rule ACs (binary pass/fail)
- AC-R1: Grep for `/[Nn]urul/` across `src/**` returns 0 hits inside default username placeholder / widget default / LeetCode input-placeholder contexts (project repo URL exemptions OK)
- AC-R2: `bannerColor: 'gradient'` in editor-store applyPreset branches count === 0; `compileTypingSvg` default color param === solid hex; project-readme-engine header has `color=0a0d12` style solid
- AC-R3: Deploy modal DOM order: Option 2 (Download) precedes Option 1 (OAuth/PAT)
- AC-R4: gameSuite markdown in template-engine contains at least one anchor with href pointing to `/play/` for every selected game
- AC-R5: HeroCanvas THREE.js scene contains 0 Meshes after optimization (Points only; no icosahedrons) AND particle count ≤ 900
- AC-R6: Deploy modal, sidebar-controls, canvas-painter, and play-page — each file has 0 remaining `slate-` class strings
- AC-R7: Step-wise wizard component is mounted and accessible from the Studio profile workspace; 7 steps exist with Prev/Next/Apply navigation
- AC-R8: next build + tsc typecheck exits with status 0

### Rubric ACs (scored 0-2, threshold ≥1.5)
- AC-RB1 — **Animation tastefulness (0-2)**
  - 0: jarring motion, infinite loops visible, gradients on buttons/cards
  - 1: acceptable but some easing feels rushed or overlong
  - 2: calm fade/scale animations, durations 0.25–0.5s, ONE live ping max, no gradients on chrome
- AC-RB2 — **Wizard UX clarity (0-2)**
  - 0: steps unclear, no progress indicator, broken nav
  - 1: works end-to-end but copy/placement is rough
  - 2: every step has a title, subtitle, icon, progress bar, clear copy, fields reflect current store state and can resume mid-flow
- AC-RB3 — **CTA loop completeness (0-2)**
  - 0: no play links in README game section; no post-game prompts
  - 1: links exist or prompts exist but not both
  - 2: game README links point to play routes, play page fires toast at 25s + modal on game-over with clear "Generate My README" action routed back to studio/home
