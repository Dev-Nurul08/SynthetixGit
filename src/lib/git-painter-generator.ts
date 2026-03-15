/**
 * Git Painter Script Generator (Phase 4)
 * Generates standalone shell & PowerShell scripts to draw pixel art onto GitHub calendars
 */

export interface PainterConfig {
  username: string;
  userEmail: string;
  repoName: string;
  grid: number[][]; // 52 columns x 7 rows (0 to 4)
  targetYear?: number;
}

export function generateBashPainterScript(config: PainterConfig): string {
  const { username, userEmail, repoName, grid, targetYear = 2025 } = config;

  const levelCommits: Record<number, number> = {
    0: 0,
    1: 2,
    2: 5,
    3: 10,
    4: 20,
  };

  const startDate = new Date(Date.UTC(targetYear, 0, 1));
  while (startDate.getUTCDay() !== 0) {
    startDate.setUTCDate(startDate.getUTCDate() + 1);
  }

  const commitCommands: string[] = [];

  for (let col = 0; col < 52; col++) {
    for (let row = 0; row < 7; row++) {
      const level = grid[col]?.[row] || 0;
      const count = levelCommits[level] || 0;

      if (count > 0) {
        const cellDate = new Date(startDate);
        cellDate.setUTCDate(startDate.getUTCDate() + col * 7 + row);
        const isoDate = cellDate.toISOString().split('T')[0];

        for (let i = 0; i < count; i++) {
          const timeStr = `${isoDate}T${String(12 + Math.floor(i / 2)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}:00Z`;
          commitCommands.push(
            `echo "Commit on ${isoDate} #pixel-art" >> art.txt`,
            `git add art.txt`,
            `GIT_AUTHOR_DATE="${timeStr}" GIT_COMMITTER_DATE="${timeStr}" git commit -m "chore(art): paint calendar block (${col},${row}) #${i + 1}" --quiet`
          );
        }
      }
    }
  }

  const resolvedUser = username.trim() || 'octocat';
  const resolvedEmail = userEmail.trim() || `${resolvedUser}@users.noreply.github.com`;

  return `#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════════
# SYNTHETIXGIT — AUTOMATED GITHUB CONTRIBUTION GRAPH PAINTER (BASH)
# Target User: @${resolvedUser} <${resolvedEmail}>
# ══════════════════════════════════════════════════════════════════════════════

set -e

echo "🎨 Initializing GitHub Contribution Canvas Painter for @${resolvedUser}..."

DIR="github-calendar-art-${Date.now()}"
mkdir -p "$DIR"
cd "$DIR"
git init -b main

git config user.name "${resolvedUser}"
git config user.email "${resolvedEmail}"

echo "# GitHub Calendar Art Canvas" > README.md
git add README.md
git commit -m "chore: initialize calendar art canvas" --quiet

echo "🖌️ Painting ${commitCommands.length / 3} contribution pixels on your timeline..."

${commitCommands.join('\n')}

echo ""
echo "✅ Contribution Art Generation Complete!"
echo "👉 Create an empty repository '${repoName}' on GitHub and run:"
echo "   git remote add origin https://github.com/${resolvedUser}/${repoName}.git"
echo "   git push -u origin main --force"
`;
}

export function generatePowerShellPainterScript(config: PainterConfig): string {
  const { username, userEmail, repoName, grid, targetYear = 2025 } = config;

  const levelCommits: Record<number, number> = {
    0: 0,
    1: 2,
    2: 5,
    3: 10,
    4: 20,
  };

  const startDate = new Date(Date.UTC(targetYear, 0, 1));
  while (startDate.getUTCDay() !== 0) {
    startDate.setUTCDate(startDate.getUTCDate() + 1);
  }

  const commitCommands: string[] = [];

  for (let col = 0; col < 52; col++) {
    for (let row = 0; row < 7; row++) {
      const level = grid[col]?.[row] || 0;
      const count = levelCommits[level] || 0;

      if (count > 0) {
        const cellDate = new Date(startDate);
        cellDate.setUTCDate(startDate.getUTCDate() + col * 7 + row);
        const isoDate = cellDate.toISOString().split('T')[0];

        for (let i = 0; i < count; i++) {
          const timeStr = `${isoDate}T${String(12 + Math.floor(i / 2)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}:00Z`;
          commitCommands.push(
            `Add-Content -Path art.txt -Value "Commit on ${isoDate} #pixel-art"; git add art.txt; $env:GIT_AUTHOR_DATE="${timeStr}"; $env:GIT_COMMITTER_DATE="${timeStr}"; git commit -m "chore(art): paint calendar block (${col},${row}) #${i + 1}" --quiet`
          );
        }
      }
    }
  }

  const resolvedUser = username.trim() || 'octocat';
  const resolvedEmail = userEmail.trim() || `${resolvedUser}@users.noreply.github.com`;

  return `# ══════════════════════════════════════════════════════════════════════════════
# SYNTHETIXGIT — AUTOMATED GITHUB CONTRIBUTION GRAPH PAINTER (POWERSHELL)
# Target User: @${resolvedUser} <${resolvedEmail}>
# ══════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

Write-Host "🎨 Initializing GitHub Contribution Canvas Painter for @${resolvedUser}..." -ForegroundColor Cyan

$DIR = "github-calendar-art-${Date.now()}"
New-Item -ItemType Directory -Path $DIR | Out-Null
Set-Location $DIR
git init -b main

git config user.name "${resolvedUser}"
git config user.email "${resolvedEmail}"

Set-Content -Path README.md -Value "# GitHub Calendar Art Canvas"
git add README.md
git commit -m "chore: initialize calendar art canvas" --quiet

Write-Host "🖌️ Painting ${commitCommands.length} contribution pixels on your timeline..." -ForegroundColor Green

${commitCommands.join('\n')}

Write-Host ""
Write-Host "✅ Contribution Art Generation Complete!" -ForegroundColor Green
Write-Host "👉 Create an empty repository '${repoName}' on GitHub and run:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/${resolvedUser}/${repoName}.git"
Write-Host "   git push -u origin main --force"
`;
}
