import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/github-service';
import { apiCache } from '@/lib/cache';

export async function GET() {
  try {
    const rateLimit = await checkRateLimit();
    const cacheStats = apiCache.getStats();

    return NextResponse.json({
      success: true,
      githubRateLimit: rateLimit,
      cacheStats,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        cacheStats: apiCache.getStats(),
      },
      { status: 500 }
    );
  }
}
