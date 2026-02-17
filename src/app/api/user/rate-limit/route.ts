import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/github-service';
import { apiCache } from '@/lib/cache';
import { getPerformanceSummary } from '@/lib/performance';

export async function GET() {
  try {
    const rateLimit = await checkRateLimit();
    const cacheStats = apiCache.getStats();
    const performance = getPerformanceSummary();

    return NextResponse.json({
      success: true,
      rateLimit,
      cacheStats,
      performance,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check rate limit',
        cacheStats: apiCache.getStats(),
      },
      { status: 500 }
    );
  }
}
