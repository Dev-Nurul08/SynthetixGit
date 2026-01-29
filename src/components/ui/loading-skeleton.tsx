'use client';

export function LoadingSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-shimmer rounded-lg"
          style={{
            height: i === 0 ? '24px' : '16px',
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-16 h-16 rounded-full animate-shimmer" />
      <div className="flex-1 space-y-2">
        <div className="h-5 w-40 animate-shimmer rounded" />
        <div className="h-4 w-60 animate-shimmer rounded" />
        <div className="h-3 w-32 animate-shimmer rounded" />
      </div>
    </div>
  );
}
