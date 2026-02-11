import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get('track') || 'Coding Mode • Deep Focus Beats';
  const artist = searchParams.get('artist') || 'SynthetixGit Beats';
  const isPlaying = searchParams.get('isPlaying') !== 'false';
  const width = parseInt(searchParams.get('width') || '450', 10);
  const height = 120;

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="spotifyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a120f" />
      <stop offset="50%" stop-color="#071912" />
      <stop offset="100%" stop-color="#050a08" />
    </linearGradient>
    <filter id="spotifyGlow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="url(#spotifyBg)" stroke="#1db954" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Spotify Logo Icon -->
  <circle cx="42" cy="60" r="24" fill="#1db954"/>
  <path d="M32 50 C38 48, 48 48, 52 52 M34 58 C39 56, 47 57, 50 60 M36 66 C40 64, 46 65, 48 68" stroke="#000000" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- Track & Artist Info -->
  <text x="80" y="42" font-family="system-ui, sans-serif" font-weight="700" font-size="11" fill="#1db954" letter-spacing="1">
    ${isPlaying ? '🟢 NOW PLAYING ON SPOTIFY' : '⚪ RECENTLY PLAYED'}
  </text>
  <text x="80" y="65" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">
    ${escapeXml(track)}
  </text>
  <text x="80" y="85" font-family="system-ui, sans-serif" font-weight="500" font-size="12" fill="#94a3b8">
    ${escapeXml(artist)}
  </text>

  <!-- Animated Equalizer Bars -->
  ${
    isPlaying
      ? `
  <g transform="translate(${width - 50}, 50)">
    <rect x="0" y="10" width="3.5" height="15" rx="1.5" fill="#1db954">
      <animate attributeName="height" values="5;22;8;25;5" dur="1.2s" repeatCount="indefinite"/>
      <animate attributeName="y" values="20;3;17;0;20" dur="1.2s" repeatCount="indefinite"/>
    </rect>
    <rect x="6" y="5" width="3.5" height="20" rx="1.5" fill="#1db954">
      <animate attributeName="height" values="20;5;25;10;20" dur="0.9s" repeatCount="indefinite"/>
      <animate attributeName="y" values="5;20;0;15;5" dur="0.9s" repeatCount="indefinite"/>
    </rect>
    <rect x="12" y="15" width="3.5" height="10" rx="1.5" fill="#1db954">
      <animate attributeName="height" values="10;25;5;20;10" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="y" values="15;0;20;5;15" dur="1.4s" repeatCount="indefinite"/>
    </rect>
  </g>
  `
      : ''
  }
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
