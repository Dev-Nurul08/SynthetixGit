import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || 'Developer';
  const subtitle = searchParams.get('subtitle') || '';
  const style = searchParams.get('style') || 'cartoonish-3d';
  const color1 = searchParams.get('color1') || '8A2387';
  const color2 = searchParams.get('color2') || 'E94057';
  const color3 = searchParams.get('color3') || 'F27121';
  const width = parseInt(searchParams.get('width') || '850', 10);
  const height = parseInt(searchParams.get('height') || '200', 10);

  let svgContent = '';

  if (style === 'cartoonish-3d') {
    svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad3d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#${color1}" />
      <stop offset="50%" stop-color="#${color2}" />
      <stop offset="100%" stop-color="#${color3}" />
    </linearGradient>
    <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#1b1035" flood-opacity="1" />
      <feDropShadow dx="8" dy="12" stdDeviation="4" flood-color="#000000" flood-opacity="0.6" />
    </filter>
    <style>
      @keyframes floatAnim {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .bubble-title {
        font-family: 'Arial Black', 'Impact', sans-serif;
        font-weight: 900;
        font-size: 52px;
        fill: url(#grad3d);
        stroke: #ffffff;
        stroke-width: 2.5px;
        filter: url(#shadow3d);
        letter-spacing: 2px;
      }
      .bubble-sub {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 18px;
        fill: #00ffff;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      .anim-group {
        animation: floatAnim 3s ease-in-out infinite;
      }
    </style>
  </defs>

  <g class="anim-group">
    <text x="50%" y="48%" text-anchor="middle" dominant-baseline="middle" class="bubble-title">${escapeXml(text)}</text>
    ${subtitle ? `<text x="50%" y="78%" text-anchor="middle" dominant-baseline="middle" class="bubble-sub">✨ ${escapeXml(subtitle)} ✨</text>` : ''}
  </g>
</svg>`;
  } else if (style === 'cyberpunk-glitch') {
    svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes glitchAnim1 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-3px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(3px, 1px); }
        80% { transform: translate(2px, -1px); }
      }
      @keyframes glitchAnim2 {
        0%, 100% { transform: translate(0); }
        25% { transform: translate(3px, -2px); }
        50% { transform: translate(-3px, 1px); }
        75% { transform: translate(2px, 2px); }
      }
      .glitch-base {
        font-family: 'Courier New', 'Fira Code', monospace;
        font-weight: 900;
        font-size: 48px;
        fill: #ffffff;
        letter-spacing: 4px;
      }
      .glitch-cyan {
        font-family: 'Courier New', 'Fira Code', monospace;
        font-weight: 900;
        font-size: 48px;
        fill: #00ffff;
        opacity: 0.8;
        letter-spacing: 4px;
        animation: glitchAnim1 2s infinite linear alternate-reverse;
      }
      .glitch-pink {
        font-family: 'Courier New', 'Fira Code', monospace;
        font-weight: 900;
        font-size: 48px;
        fill: #ff0055;
        opacity: 0.8;
        letter-spacing: 4px;
        animation: glitchAnim2 1.8s infinite linear alternate-reverse;
      }
      .glitch-sub {
        font-family: monospace;
        font-weight: 700;
        font-size: 15px;
        fill: #00ff66;
        letter-spacing: 2px;
      }
    </style>
  </defs>

  <rect width="100%" height="100%" rx="16" fill="#080812" stroke="#ff0055" stroke-width="1.5" stroke-opacity="0.4"/>
  <g transform="translate(0, 0)">
    <text x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" class="glitch-cyan">${escapeXml(text)}</text>
    <text x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" class="glitch-pink">${escapeXml(text)}</text>
    <text x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" class="glitch-base">${escapeXml(text)}</text>
    ${subtitle ? `<text x="50%" y="78%" text-anchor="middle" dominant-baseline="middle" class="glitch-sub">[SYS_ENG // ${escapeXml(subtitle)}]</text>` : ''}
  </g>
</svg>`;
  } else if (style === 'terminal-prompt') {
    svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes blinkCursor {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      .term-text {
        font-family: 'Fira Code', 'Courier New', monospace;
        font-weight: 700;
        font-size: 22px;
        fill: #38ef7d;
      }
      .term-cmd {
        fill: #ffffff;
      }
      .term-sub {
        font-family: 'Fira Code', monospace;
        font-size: 16px;
        fill: #00ffff;
      }
      .cursor {
        fill: #38ef7d;
        animation: blinkCursor 1s infinite;
      }
    </style>
  </defs>

  <rect width="100%" height="100%" rx="12" fill="#0c1017" stroke="#1f2937" stroke-width="2"/>
  <circle cx="24" cy="22" r="6" fill="#ff5f56"/>
  <circle cx="44" cy="22" r="6" fill="#ffbd2e"/>
  <circle cx="64" cy="22" r="6" fill="#27c93f"/>

  <text x="24" y="80" class="term-text">
    <tspan fill="#ec4899">dev@synthetixgit</tspan><tspan fill="#94a3b8">:</tspan><tspan fill="#3b82f6">~</tspan><tspan fill="#94a3b8">$</tspan>
    <tspan class="term-cmd"> whoami</tspan>
  </text>
  <text x="24" y="125" class="term-sub">&gt; ${escapeXml(text)} ${subtitle ? `— ${escapeXml(subtitle)}` : ''}</text>
  <rect x="24" y="145" width="10" height="20" class="cursor"/>
</svg>`;
  } else if (style === 'handwritten-script') {
    svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd700" />
      <stop offset="100%" stop-color="#ff8c00" />
    </linearGradient>
    <style>
      .script-text {
        font-family: 'Brush Script MT', 'Segoe Script', cursive, sans-serif;
        font-size: 58px;
        font-weight: 700;
        fill: url(#goldGrad);
        letter-spacing: 2px;
      }
      .script-sub {
        font-family: 'Georgia', serif;
        font-style: italic;
        font-size: 17px;
        fill: #e2e8f0;
        letter-spacing: 1px;
      }
    </style>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="script-text">~ ${escapeXml(text)} ~</text>
  ${subtitle ? `<text x="50%" y="82%" text-anchor="middle" dominant-baseline="middle" class="script-sub">${escapeXml(subtitle)}</text>` : ''}
</svg>`;
  } else {
    // Minimal Modern
    svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="minGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
    <style>
      .modern-title {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 46px;
        fill: url(#minGrad);
        letter-spacing: -0.5px;
      }
      .modern-sub {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        font-size: 16px;
        fill: #94a3b8;
        letter-spacing: 1px;
      }
    </style>
  </defs>
  <text x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" class="modern-title">${escapeXml(text)}</text>
  ${subtitle ? `<text x="50%" y="78%" text-anchor="middle" dominant-baseline="middle" class="modern-sub">${escapeXml(subtitle)}</text>` : ''}
</svg>`;
  }

  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
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
