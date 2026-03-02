// src/app/api/opengraph/route.tsx
// OpenGraph Image Generation API – creates dynamic OG images for repository pages
// Uses next/og to generate PNG images on-the-fly.

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'SynthetixGit';
  const desc = searchParams.get('desc') ?? 'GitHub Profile README, Contribution Art & Interactive Arcade Suite';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #05070a 0%, #0d1527 50%, #17112c 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Glow pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34, 211, 238, 0.15)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '9999px',
            padding: '8px 24px',
            marginBottom: '24px',
            color: '#22d3ee',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          <span>⚡ SynthetixGit Studio</span>
        </div>

        <h1
          style={{
            fontSize: '68px',
            fontWeight: 900,
            margin: '0 0 20px 0',
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            background: 'linear-gradient(to right, #ffffff, #93c5fd, #c084fc)',
            backgroundClip: 'text',
            color: 'transparent',
            maxWidth: '1000px',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '28px',
            margin: '0',
            color: '#94a3b8',
            maxWidth: '860px',
            lineHeight: 1.4,
          }}
        >
          {desc}
        </p>

        {/* Footer Brand Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '18px',
            color: '#64748b',
          }}
        >
          <span>github.com/Dev-Nurul08/SynthetixGit</span>
          <span>•</span>
          <span>Interactive Profile Forge & Arcade</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
