/**
 * Git Painter Script Generator (Phase 4)
 * Generates standalone shell & Node.js scripts to draw pixel art onto GitHub calendars
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

  // Level to commit counts mapping
  const levelCommits: Record<number, number> = {
    0: 0,
    1: 2,
    2: 5,
    3: 10,
    4: 20,
  };

  // Find starting Sunday of 52 weeks back
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

  return `#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════════
# SYNTHETIXGIT — AUTOMATED GITHUB CONTRIBUTION GRAPH PAINTER
# Target User: ${username} <${userEmail}>
# ══════════════════════════════════════════════════════════════════════════════

set -e

echo "🎨 Initializing GitHub Contribution Canvas Painter for @${username}..."

# Setup clean painting repo
DIR="github-calendar-art-${Date.now()}"
mkdir -p "$DIR"
cd "$DIR"
git init -b main

git config user.name "${username}"
git config user.email "${userEmail}"

echo "# GitHub Calendar Art Canvas" > README.md
git add README.md
git commit -m "chore: initialize calendar art canvas" --quiet

echo "🖌️ Painting ${commitCommands.length / 3} contribution pixels on your timeline..."

${commitCommands.join('\n')}

echo ""
echo "✅ Contribution Art Generation Complete!"
echo "👉 Create an empty repository '${repoName}' on GitHub and run:"
echo "   git remote add origin https://github.com/${username}/${repoName}.git"
echo "   git push -u origin main --force"
`;
}
