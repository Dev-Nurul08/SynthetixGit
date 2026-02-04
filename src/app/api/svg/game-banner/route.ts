import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'developer';
  const game = searchParams.get('game') || 'snake';
  const theme = searchParams.get('theme') || 'dark';

  let title = 'Contribution Snake';
  let badgeColor = '39d353';
  let icon = '🐍';

  if (game === 'brick-breaker' || game === 'breakout') {
    title = 'Graph Brick Breaker';
    badgeColor = 'ff0055';
    icon = '🧱';
  } else if (game === 'pacman') {
    title = 'Pac-Man Commit Run';
    badgeColor = 'ffd700';
    icon = '👾';
  }

  const width = 850;
  const height = 240;

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e17" />
      <stop offset="50%" stop-color="#141c2e" />
      <stop offset="100%" stop-color="#0d1117" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <style>
      @keyframes pulseBtn {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.03); opacity: 0.85; }
      }
      .game-title {
        font-family: 'Fira Code', 'Courier New', monospace;
        font-weight: 800;
        font-size: 28px;
        fill: #ffffff;
        letter-spacing: 2px;
      }
      .game-sub {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
        font-size: 14px;
        fill: #38bdf8;
      }
      .play-btn-text {
        font-family: 'Fira Code', monospace;
        font-weight: 800;
        font-size: 15px;
        fill: #ffffff;
        letter-spacing: 1px;
      }
    </style>
  </defs>

  <!-- Background container -->
  <rect width="100%" height="100%" rx="20" fill="url(#bgGrad)" stroke="#2a364f" stroke-width="2"/>

  <!-- Simulated Commit Grid in background -->
  <g opacity="0.4" transform="translate(40, 40)">
    ${generateBackgroundGrid()}
  </g>

  <!-- Game Icon & Title -->
  <text x="50" y="65" class="game-title">${icon} ${escapeXml(title)}</text>
  <text x="50" y="95" class="game-sub">Playable arcade level generated from @${escapeXml(username)}'s live GitHub commits</text>

  <!-- Interactive Play Button Graphic -->
  <g transform="translate(50, 140)">
    <rect width="260" height="54" rx="14" fill="#${badgeColor}" filter="url(#neonGlow)"/>
    <rect width="258" height="52" x="1" y="1" rx="13" fill="#0d1117" stroke="#${badgeColor}" stroke-width="2"/>
    <text x="130" y="32" text-anchor="middle" dominant-baseline="middle" class="play-btn-text">▶ CLICK TO PLAY</text>
  </g>

  <!-- Controls guide -->
  <g transform="translate(340, 145)">
    <text x="0" y="18" font-family="monospace" font-size="12" fill="#94a3b8">🕹️ CONTROLS: Arrow Keys / WASD / Touch</text>
    <text x="0" y="38" font-family="monospace" font-size="12" fill="#38ef7d">⚡ REAL-TIME COMMIT TILES &amp; HIGH SCORES</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

function generateBackgroundGrid(): string {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  const rects: string[] = [];
  for (let col = 0; col < 38; col++) {
    for (let row = 0; row < 5; row++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      rects.push(`<rect x="${col * 20}" y="${row * 20}" width="14" height="14" rx="3" fill="${color}" />`);
    }
  }
  return rects.join('\n');
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
