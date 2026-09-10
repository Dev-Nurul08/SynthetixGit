import { NextRequest, NextResponse } from 'next/server';
import { parseExistingReadme } from '@/lib/readme-parser';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.trim();

    // Try fetching from main and master branches
    const urls = [
      `https://raw.githubusercontent.com/${cleanUsername}/${cleanUsername}/main/README.md`,
      `https://raw.githubusercontent.com/${cleanUsername}/${cleanUsername}/master/README.md`,
      `https://raw.githubusercontent.com/${cleanUsername}/${cleanUsername}/main/readme.md`,
    ];

    let rawReadme: string | null = null;

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'SynthetixGit/2.0' },
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          rawReadme = await res.text();
          break;
        }
      } catch {
        // try next
      }
    }

    if (!rawReadme) {
      return NextResponse.json({
        found: false,
        message: `No existing profile README found in @${cleanUsername}/${cleanUsername}`,
      });
    }

    const parsed = parseExistingReadme(rawReadme, cleanUsername);

    return NextResponse.json({
      found: true,
      rawReadme,
      parsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to scan existing profile README' },
      { status: 500 }
    );
  }
}
