import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lines = url.searchParams.get('lines') || 'Full Stack Developer;Open Source Enthusiast';
  const color = url.searchParams.get('color') || '00F0FF';
  const bg = url.searchParams.get('background') || '0D1117';
  const fontSize = url.searchParams.get('fontSize') || '24';

  const textLines = lines.split(';').filter(Boolean);

  // Build animated SVG with typing effect
  const lineHeight = parseInt(fontSize) + 12;
  const height = Math.max(60, lineHeight * textLines.length + 20);
  const width = 600;

  const animations = textLines.map((line, i) => {
    const delay = i * 3;
    const charCount = line.length;
    const duration = 2;

    return `
      <text
        x="50%"
        y="${30 + i * lineHeight}"
        text-anchor="middle"
        fill="#${color}"
        font-family="'Fira Code', 'JetBrains Mono', monospace"
        font-size="${fontSize}"
        font-weight="600"
      >
        ${escapeXml(line)}
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.8;1"
          dur="${duration + 1}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
      </text>
      <line
        x1="${width / 2 + (charCount * parseInt(fontSize) * 0.3)}"
        y1="${15 + i * lineHeight}"
        x2="${width / 2 + (charCount * parseInt(fontSize) * 0.3)}"
        y2="${35 + i * lineHeight}"
        stroke="#${color}"
        stroke-width="2"
      >
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="0.8s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
      </line>`;
  }).join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#${bg}" rx="8"/>
  ${animations}
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
