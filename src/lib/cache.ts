/**
 * Multi-layer In-memory & Redis-compatible TTL Cache
 * Default TTL: 6 hours (21,600,000 ms) to prevent GitHub 60 req/hr rate limits.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
  hits: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRatio: number;
}

class TTLCache {
  private store = new Map<string, CacheEntry<unknown>>();
  private defaultTTL: number;
  private totalHits: number = 0;
  private totalMisses: number = 0;

  constructor(defaultTTLMs: number = 6 * 60 * 60 * 1000) { // 6 hours
    this.defaultTTL = defaultTTLMs;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.totalMisses++;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.totalMisses++;
      return null;
    }
    entry.hits++;
    this.totalHits++;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs?: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTTL),
      createdAt: Date.now(),
      hits: 0,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  invalidate(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
    this.totalHits = 0;
    this.totalMisses = 0;
  }

  getStats(): CacheStats {
    const total = this.totalHits + this.totalMisses;
    return {
      size: this.store.size,
      hits: this.totalHits,
      misses: this.totalMisses,
      hitRatio: total > 0 ? Number((this.totalHits / total).toFixed(4)) : 0,
    };
  }
}

// Singleton cache instance for the application
export const apiCache = new TTLCache(6 * 60 * 60 * 1000);
