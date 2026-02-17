/**
 * Performance & Telemetry Utilities (Milestone 17 Feb 2026)
 * Tracks server response latencies, cache ratios & SSR hydration metrics
 */

export interface PerformanceMetric {
  name: string;
  durationMs: number;
  timestamp: number;
  context?: Record<string, any>;
}

const inMemoryMetrics: PerformanceMetric[] = [];

export function recordMetric(name: string, durationMs: number, context?: Record<string, any>) {
  inMemoryMetrics.push({
    name,
    durationMs,
    timestamp: Date.now(),
    context,
  });

  // Keep last 100 entries
  if (inMemoryMetrics.length > 100) {
    inMemoryMetrics.shift();
  }
}

export function getPerformanceSummary() {
  if (inMemoryMetrics.length === 0) {
    return { count: 0, avgDurationMs: 0, latest: [] };
  }

  const total = inMemoryMetrics.reduce((sum, m) => sum + m.durationMs, 0);
  return {
    count: inMemoryMetrics.length,
    avgDurationMs: Math.round(total / inMemoryMetrics.length),
    latest: inMemoryMetrics.slice(-10),
  };
}
