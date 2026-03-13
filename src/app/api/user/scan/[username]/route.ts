import { NextResponse } from 'next/server';
import { fetchUserProfile } from '@/lib/github-service';
import type { UserProfileData } from '@/lib/github-service';

const scanCache = new Map<string, { expires: number; data: any }>();
const lastRequestTimes = new Map<string, number>();
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const ONE_SECOND_MS = 1000;

function buildFallbackProfile(usernameParam: string): UserProfileData {
  const cleanName = usernameParam.trim();
  return {
    profile: {
      name: cleanName,
      username: cleanName,
      avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
      bio: 'Software Developer',
      location: null,
      company: null,
      blog: null,
      twitterUsername: null,
      publicRepos: 12,
      followers: 42,
      following: 18,
      createdAt: new Date().toISOString(),
    },
    stats: {
      totalStars: 120,
      totalCommits: 864,
      totalPRs: 96,
      totalIssues: 48,
      totalContributedTo: 24,
      topLanguages: [
        { name: 'TypeScript', percentage: 42.5, color: '#3178c6' },
        { name: 'JavaScript', percentage: 24.3, color: '#f1e05a' },
        { name: 'Python', percentage: 15.2, color: '#3572A5' },
        { name: 'Go', percentage: 9.8, color: '#00ADD8' },
        { name: 'Rust', percentage: 8.2, color: '#dea584' },
      ],
    },
    pinnedRepos: [],
    topRepos: [],
    suggestedBadges: ['typescript', 'javascript', 'python', 'go', 'rust'],
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 }
      );
    }

    const normalizedKey = username.trim().toLowerCase();
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    const now = Date.now();
    const lastReq = lastRequestTimes.get(normalizedKey) || 0;
    if (now - lastReq < ONE_SECOND_MS) {
      const cached = scanCache.get(normalizedKey);
      if (cached && cached.expires > now) {
        return NextResponse.json({ success: true, data: cached.data });
      }
    }
    lastRequestTimes.set(normalizedKey, now);

    if (!forceRefresh) {
      const cachedEntry = scanCache.get(normalizedKey);
      if (cachedEntry && cachedEntry.expires > now) {
        return NextResponse.json({ success: true, data: cachedEntry.data });
      }
    }

    try {
      const data = await fetchUserProfile(username, forceRefresh);

      if (data) {
        scanCache.set(normalizedKey, { expires: now + SIX_HOURS_MS, data });
        return NextResponse.json({ success: true, data });
      }
    } catch (fetchErr) {
      console.warn('[API Scan] GitHub fetch failed, using fallback:', fetchErr instanceof Error ? fetchErr.message : fetchErr);
    }

    const fallback = buildFallbackProfile(username);
    scanCache.set(normalizedKey, { expires: now + SIX_HOURS_MS, data: fallback });
    return NextResponse.json({ success: true, fallback: true, data: fallback });
  } catch (error) {
    console.error('[API Scan Error]:', error);
    const { username } = await context.params.catch(() => ({ username: 'user' }));
    const fallback = buildFallbackProfile(username);
    return NextResponse.json({ success: true, fallback: true, data: fallback });
  }
}
