# Implementation Tasks: SynthetixGit UI Overhaul

Mapped from spec.md acceptance criteria. Each task is atomic; process in priority order; update Status field on completion.

---

## Task 1: Purge hardcoded "Nurul" username defaults & placeholders

**Status:** pending
**Priority:** high
**Parent AC:** AC-R1

### Scope
Replace every non-project "Nurul" / "Fr_Nurul" string with dynamic active-user derivation or neutral placeholders. Keep project-source-repo Dev-Nurul08 GitHub URLs intact.

### Files
- `src/lib/dynamic-widgets-engine.ts`
- `src/app/studio/page.tsx`
- `src/components/studio/sidebar-controls.tsx`
- `src/components/studio/canvas-painter.tsx` (verify customText default behavior with empty user)

### Test Requirements
- **TR-rule-1.1:** Running `rg -n "Fr_Nurul|Nurul" src/lib src/components/studio src/app/studio/page.tsx` after the task returns zero lines.
- **TR-rule-1.2:** `compileLeetCodeWidget()` default param username is empty string; caller is responsible for passing an active user.
- **TR-rule-1.3:** studio page widget card LeetCode entry uses `compileLeetCodeWidget(activeUser ?? "octocat", "dark")` instead of a hardcoded name.
- **TR-rule-1.4:** Sidebar LeetCode input placeholder becomes `"your-leetcode-handle"` (no Nurul reference).
- **TR-rubric-1.5 (0-2, ≥1.5):** When no user is active, Canvas Painter shows empty string or a generic placeholder like "YOURNAME"; active users correctly see capitalized first-letter of their GitHub handle. Score: evidence from screenshot/description.

### Completion Evidence
TBD after implementation.

---

## Task 2: Remove bannerColor gradient defaults; solidify typing SVG and template display names

**Status:** pending
**Priority:** high
**Parent AC:** AC-R2, AC-RB1

### Scope
- Replace `bannerColor: 'gradient'` in editor-store template preset branches with solid palette codes (0a0d12 for dark, or matching theme color)
- Replace compileTypingSvg default color from 'gradient' to solid '22D3EE'
- Keep template IDs stable for URL compat; rename only the human display strings in ALL_15_TEMPLATES that currently say "neon" to non-neon synonyms:
  - beast-mode-neon display → "Beast Mode Pro"
  - Cyberpunk Glitch → keep id; edit desc s/neon matrices/edge-lit matrices/
  - Tokyo Night desc s/neon glow charts/subtle accent charts/
  - Synthwave 84 desc s/neon sunset/retro sunset/

### Files
- `src/stores/editor-store.ts`
- `src/lib/dynamic-widgets-engine.ts`
- `src/lib/template-engine.ts` (ALL_15_TEMPLATES display strings only)
- `src/components/studio/sidebar-controls.tsx` (embedded duplicate ALL_15_TEMPLATES inline table)

### Test Requirements
- **TR-rule-2.1:** Count of `bannerColor: 'gradient'` in editor-store === 0
- **TR-rule-2.2:** compileTypingSvg default param === `"22D3EE"`
- **TR-rule-2.3:** Grep `display-name neon` across both template tables returns 0 literal "Neon" words in display strings (IDs may remain)
- **TR-rubric-2.4 (0-2, ≥1.5):** Typing SVG renders with solid cyan brand color; banner renders solid palette; no visual rainbow or rainbow-band artifacts on any app chrome button/card.

### Completion Evidence
TBD.

---

## Task 3: Project README solid header + semantic tokens in 4 components

**Status:** pending
**Priority:** high
**Parent AC:** AC-R2, AC-R6

### Scope
- project-readme-engine header uses `color=0a0d12` solid, no `color=gradient`
- deploy-modal.tsx: swap all slate-* classes for semantic bg-bg-*, text-text-*, border-border-*, tones; use semantic shadow tokens; keep modal layout identical visually
- sidebar-controls.tsx: swap all slate-* for semantic tokens; tab active state uses brand tokens
- canvas-painter.tsx: swap slate-* for semantic tokens
- play/[username]/[game]/page.tsx: swap slate-* for semantic tokens

### Files
- `src/lib/project-readme-engine.ts`
- `src/components/studio/deploy-modal.tsx`
- `src/components/studio/sidebar-controls.tsx`
- `src/components/studio/canvas-painter.tsx`
- `src/app/play/[username]/[game]/page.tsx`

### Test Requirements
- **TR-rule-3.1:** Project README hero capsule uses `color=0a0d12` solid
- **TR-rule-3.2:** Grep for `slate-` in each of the 4 component files returns 0 matches
- **TR-rule-3.3:** Deploy modal button variant classes all map to existing semantic tokens (no new CSS vars needed)

### Completion Evidence
TBD.

---

## Task 4: Deploy Modal — elevate Download path; prominent GitHub OAuth Connect button

**Status:** pending
**Priority:** high
**Parent AC:** AC-R3, FR4

### Scope
- Reorder modal sections: Option 2 (Download & Manual Deploy) now appears FIRST; label it "Recommended · Download README"
- OAuth/PAT section moves second, labeled "Advanced · Direct API Deploy (requires PAT or OAuth)"
- Replace the plain OAuth link with a styled Connect GitHub button that links to `https://github.com/login/oauth/authorize` (placeholder) and a clearly-worded helper: "Authorize SynthetixGit so we can pre-fill your GitHub username & push READMEs. Backend OAuth callback route is being configured — for now download-first is the recommended path."
- Download buttons use the brand palette semantic styling

### Files
- `src/components/studio/deploy-modal.tsx`

### Test Requirements
- **TR-rule-4.1:** In rendered DOM, the Option 2 (Download) card appears as a sibling that precedes the OAuth/PAT card when both are serialized in order
- **TR-rule-4.2:** "Connect GitHub" button `<a>` element has `href` starting with `https://github.com/` and opens in new tab
- **TR-rule-4.3:** Deploy successful state still shows "View on GitHub" link + close; no regression

### Completion Evidence
TBD.

---

## Task 5: Game suite README section — add Play Game redirect badges

**Status:** pending
**Priority:** high
**Parent AC:** AC-R4, AC-RB3

### Scope
- In template-engine `compileProfile`, inside the `modules.gameSuite.enabled` block, AFTER the snake SVG (or replacing if gameType !== snake), render per-game "Play Game On SynthetixGit" image badges:
  - For snake: `<a href="https://synthetix.app/play/${user}/snake"><img src="https://img.shields.io/badge/🎮_Play_Snake_on_SynthetixGit-06b6d4?style=for-the-badge&logo=githubactions&logoColor=fff" /></a>`
  - For breakout/brick-breaker: matching amber badge
  - For pacman: matching rose badge
- Extend ModuleConfig gameSuite to accept an array of games OR use the gameType single selector with a "Show Play Badge" companion toggle; keep simple for now: always render the play badges for whichever gameType is set
- Ensure workflow snake SVG also keeps rendering

### Files
- `src/lib/template-engine.ts` (gameSuite rendering block)
- `src/lib/template-engine.ts` ModuleConfig types (extend optional playBadges flag boolean default true)

### Test Requirements
- **TR-rule-5.1:** For gameSuite.enabled with any selected gameType, resulting markdown string contains at least 1 `<a href="/play/` or absolute `/play/` anchor
- **TR-rule-5.2:** Badge `img.shields.io` URLs use solid hex colors (06b6d4, fbbf24, fb7185 etc.), no keyword `gradient`

### Completion Evidence
TBD.

---

## Task 6: Post-game CTA strengthening + 25s toast

**Status:** pending
**Priority:** high
**Parent AC:** AC-RB3

### Scope
- play/[username]/[game]/page.tsx: reduce toast timer from 30s to 25s
- Strengthen toast + modal copy: title "Love this game? 🚀 Generate YOUR GitHub README with playable arcade games in 2 minutes"
- Primary CTA button routes: if localStorage lastUser is set → `/studio?user=${lastUser}&mode=profile`; else → `/` (home with username prompt)
- Add an inline top-of-page banner CTA strip (small, dismissible) that says first-time viewers: "👋 Playing @{username}'s arcade — want YOUR own README with games? Start here"
- Add `synthetixgit-wizard-seen` localStorage guard so we don't auto-open the banner on every game visit

### Files
- `src/app/play/[username]/[game]/page.tsx`

### Test Requirements
- **TR-rule-6.1:** Toast delay constant = 25000ms
- **TR-rule-6.2:** Modal/gameover CTA button onClick calls router.push with path that either starts with `/studio?user=` OR `/`
- **TR-rule-6.3:** Banner strip present on first mount, dismissible via localStorage flag
- **TR-rubric-6.4 (0-2, ≥1.5):** CTA copy is non-spammy, grammatically clean, and routes correctly to either studio or home based on prior-user context.

### Completion Evidence
TBD.

---

## Task 7: Build Step-Wise README Wizard (7 steps)

**Status:** pending
**Priority:** high
**Parent AC:** AC-R7, AC-RB2

### Scope
Create new component: `src/components/studio/readme-wizard.tsx`

Props:
```tsx
interface ReadmeWizardProps {
  username: string;
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}
```

Steps:
1. **Step 1 Identity & Header** — title input (pre-filled active user's name or GH username), subtitle, headerStyle radio with 5 thumbnail mini-cards, background effect preview
2. **Step 2 Tech Stack Badges** — role preset buttons (Frontend/Backend/Fullstack/DevOps/AI-ML/Mobile) then a scrollable grid of searchable tech badges to toggle
3. **Step 3 Productivity Integrations** — WakaTime username input, enable toggle, help link
4. **Step 4 Coding & Social Profiles** — LeetCode handle, LinkedIn URL, Twitter/X, Portfolio URL inputs
5. **Step 5 Section Divider** — 7 style options, each rendered as a tiny preview thumbnail (use `/api/svg/divider?style=X`)
6. **Step 6 Featured Sections** — Toggle switches one by one: Beast Dashboard, GitHub Analytics, About Me, Social Links, Trophies/Achievements, Interactive Widgets, Footer
7. **Step 7 GitHub Arcade Games** — Select game type (Snake / Brick Breaker / Pac-Man) + motto + "Include Play Game on SynthetixGit Badge" toggle default on

Wizard chrome:
- Left progress rail: numbered step list 1–7 with dot indicators showing done/current/upcoming states
- Main card body shows only the active step's form (no hidden form bloat)
- Bottom bar: "← Previous", "Next →", and in final step "Apply & Generate README ✨"
- On clicking Apply, update modules object in editor-store matching form state, close wizard, fire `onComplete`

Mount into Studio profile workspace as a collapsible entry-point banner button labeled "✨ Start Guided README Wizard (7 Steps)"

### Files
- `src/components/studio/readme-wizard.tsx` (new file)
- `src/app/studio/page.tsx` (import & mount in ProfileWorkspace header area, with open/close button)
- `src/stores/editor-store.ts` (ensure `updateModule` handles deep patch atomically)

### Test Requirements
- **TR-rule-7.1:** File `readme-wizard.tsx` exports a component matching the interface above
- **TR-rule-7.2:** Step-count data array has length === 7; step 7 has Apply final button not Next
- **TR-rule-7.3:** On apply, editor-store modules state changes (beastModeDashboard, headerBanner, etc.) reflect the wizard form data — verified via store selectors
- **TR-rule-7.4:** Studio profile workspace page renders an "Start Guided Wizard" entry button that toggles the modal
- **TR-rubric-7.5 (0-2, ≥1.5):** Wizard animations tasteful (fade/scale 0.3s), progress indicator clear, copy concise, prefill respects existing editor-store state when reopening mid-session so user edits are not lost.

### Completion Evidence
TBD.

---

## Task 8: Reduce HeroCanvas 3D intensity

**Status:** pending
**Priority:** medium
**Parent AC:** AC-R5, AC-RB1

### Scope
- starCount: 1800 → 900
- Remove wireframe Icosahedron globe + inner globe entirely (no Meshes in scene — only Points)
- Trim palette to THREE colors only: #22d3ee, #06b6d4, #ffffff — remove violet and emerald
- starMaterial.opacity: 0.85 → 0.55; fog density 0.035 → 0.06
- Reduce group.rotation.y increment per frame by 60% (so rotation feels slow)
- Keep canvas responsive but don't add any new geometries

### Files
- `src/components/hero/HeroCanvas.tsx`

### Test Requirements
- **TR-rule-8.1:** Source contains 0 occurrences of `IcosahedronGeometry` or `Mesh` class instantiation (imports OK)
- **TR-rule-8.2:** starCount variable ≤ 900
- **TR-rule-8.3:** palette array length = 3 items exactly
- **TR-rubric-8.4 (0-2, ≥1.5):** Visual effect feels calm, ambient, not spinning-too-fast; hero text above readable; no eye-strain bright highlights.

### Completion Evidence
TBD.

---

## Task 9: Final build, typecheck, lint diagnostics

**Status:** pending
**Priority:** high
**Parent AC:** AC-R8, NFR3

### Scope
- Run `npx tsc --noEmit`
- Run `next build`
- Run ESLint via configured command
- Fix any introduced errors only (don't scope-creep pre-existing issues)
- Record outputs as evidence

### Files
- All touched files in tasks 1–8
- No net-new source additions beyond the wizard component

### Test Requirements
- **TR-rule-9.1:** `tsc --noEmit` exit code === 0
- **TR-rule-9.2:** `next build` exit code === 0
- **TR-rule-9.3:** ESLint reports no newly-introduced errors (count before vs count after delta ≤ 0)

### Completion Evidence
TBD.

---

## Task Dependency Order
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

(Tasks 3 and 5 can swap order if needed as they touch disjoint files; keep ordering for safety.)
