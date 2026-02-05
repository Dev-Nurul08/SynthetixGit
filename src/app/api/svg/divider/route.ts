import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const style = searchParams.get('style') || 'rainbow-gradient';
  const width = parseInt(searchParams.get('width') || '850', 10);
  const height = parseInt(searchParams.get('height') || '28', 10);

  let svg = '';

  if (style === 'rainbow-gradient') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="200%" y2="0%">
      <stop offset="0%" stop-color="#ff007f">
        <animate attributeName="stop-color" values="#ff007f;#7928ca;#00dfd8;#ff007f" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="#7928ca">
        <animate attributeName="stop-color" values="#7928ca;#00dfd8;#ff007f;#7928ca" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#00dfd8">
        <animate attributeName="stop-color" values="#00dfd8;#ff007f;#7928ca;#00dfd8" dur="4s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>
  <rect x="0" y="${height / 2 - 2}" width="${width}" height="4" rx="2" fill="url(#rainbowGrad)" />
</svg>`;
  } else if (style === 'snake-crawl') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes crawl {
        0% { transform: translateX(-60px); }
        100% { transform: translateX(${width + 60}px); }
      }
      .snake-head {
        animation: crawl 4s linear infinite;
      }
    </style>
  </defs>
  <!-- Track -->
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#161b22" stroke-width="4" stroke-linecap="round"/>
  <!-- Crawling Snake Segment -->
  <g class="snake-head">
    <rect y="${height / 2 - 4}" width="50" height="8" rx="4" fill="#39d353"/>
    <circle cx="46" cy="${height / 2}" r="6" fill="#38bdf8"/>
  </g>
</svg>`;
  } else if (style === 'neon-laser-shimmer') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0d1117" />
    </linearGradient>
    <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="url(#laserGrad)" stroke-width="3" filter="url(#laserGlow)"/>
  <circle cy="${height / 2}" r="5" fill="#ffffff" filter="url(#laserGlow)">
    <animate attributeName="cx" values="0;${width};0" dur="3s" repeatCount="indefinite" />
  </circle>
</svg>`;
  } else if (style === 'soundwave-eq') {
    const bars: string[] = [];
    const barCount = 45;
    const spacing = width / barCount;
    for (let i = 0; i < barCount; i++) {
      const x = i * spacing + spacing / 2;
      const minH = 4;
      const maxH = 18;
      const dur = (0.6 + (i % 7) * 0.15).toFixed(2);
      bars.push(`
        <rect x="${x - 2}" y="${height / 2 - 2}" width="4" height="4" rx="2" fill="#a855f7">
          <animate attributeName="height" values="${minH};${maxH};${minH}" dur="${dur}s" repeatCount="indefinite" />
          <animate attributeName="y" values="${height / 2 - minH / 2};${height / 2 - maxH / 2};${height / 2 - minH / 2}" dur="${dur}s" repeatCount="indefinite" />
          <animate attributeName="fill" values="#a855f7;#3b82f6;#ec4899;#a855f7" dur="${dur}s" repeatCount="indefinite" />
        </rect>
      `);
    }
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${bars.join('\n')}
</svg>`;
  } else if (style === 'cyber-circuit') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="circuitGlow">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <path d="M 0 ${height / 2} L ${width * 0.3} ${height / 2} L ${width * 0.35} ${height / 2 - 6} L ${width * 0.65} ${height / 2 - 6} L ${width * 0.7} ${height / 2} L ${width} ${height / 2}" stroke="#00ffff" stroke-width="2" fill="none" opacity="0.6"/>
  <circle cx="${width * 0.35}" cy="${height / 2 - 6}" r="3.5" fill="#00ffff" filter="url(#circuitGlow)"/>
  <circle cx="${width * 0.65}" cy="${height / 2 - 6}" r="3.5" fill="#ff0055" filter="url(#circuitGlow)"/>
  <circle cx="${width * 0.5}" cy="${height / 2 - 6}" r="4" fill="#39d353" filter="url(#circuitGlow)">
    <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
  </circle>
</svg>`;
  } else if (style === 'particle-sparkle') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#1e293b" stroke-width="2"/>
  ${Array.from({ length: 12 })
    .map((_, i) => {
      const cx = (width / 13) * (i + 1);
      const cy = height / 2 + (i % 2 === 0 ? -4 : 4);
      const dur = (1.2 + (i % 4) * 0.3).toFixed(1);
      return `<circle cx="${cx}" cy="${cy}" r="3" fill="#facc15">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1.5;4;1.5" dur="${dur}s" repeatCount="indefinite"/>
      </circle>`;
    })
    .join('\n')}
</svg>`;
  } else if (style === 'retro-dashed-terminal') {
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#38ef7d" stroke-width="2" stroke-dasharray="8 6"/>
  <rect x="${width / 2 - 8}" y="${height / 2 - 6}" width="16" height="12" rx="2" fill="#000000" stroke="#38ef7d" stroke-width="1.5"/>
  <text x="${width / 2}" y="${height / 2 + 3}" text-anchor="middle" font-family="monospace" font-size="10" font-weight="900" fill="#38ef7d">_</text>
</svg>`;
  } else {
    // curved-wave
    svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 0 ${height / 2} Q ${width * 0.25} ${height / 2 - 8}, ${width * 0.5} ${height / 2} T ${width} ${height / 2}" stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
  }

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
