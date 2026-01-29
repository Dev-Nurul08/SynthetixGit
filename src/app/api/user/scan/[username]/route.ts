import { NextResponse } from 'next/server';
import { fetchUserProfile } from '@/lib/github-service';

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

    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    const data = await fetchUserProfile(username, forceRefresh);

    if (!data) {
      return NextResponse.json(
        { error: `User @${username} not found on GitHub` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Scan Error]:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to scan GitHub profile' },
      { status: 500 }
    );
  }
}
