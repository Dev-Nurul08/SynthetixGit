'use client';

import { ToggleSwitch } from '@/components/ui/toggle-switch';
import type { ModuleConfig } from '@/lib/template-engine';

interface StatsCardConfiguratorProps {
  statsCard: ModuleConfig['githubStats'];
  onUpdate: (value: Partial<ModuleConfig['githubStats']>) => void;
}

export function StatsCardConfigurator({ statsCard, onUpdate }: StatsCardConfiguratorProps) {
  return (
    <div className="space-y-1.5">
      <ToggleSwitch
        enabled={statsCard.showGeneralStats}
        onToggle={(v) => onUpdate({ showGeneralStats: v })}
        label="General Stats Card"
        description="Total stars, commits, PRs, and issues"
        icon="📊"
      />
      <ToggleSwitch
        enabled={statsCard.showStreak}
        onToggle={(v) => onUpdate({ showStreak: v })}
        label="Commit Streak Tracker"
        description="Current streak, total contributions & days"
        icon="🔥"
      />
      <ToggleSwitch
        enabled={statsCard.showTopLangs}
        onToggle={(v) => onUpdate({ showTopLangs: v })}
        label="Top Languages Breakdown"
        description="Compact language percentage card"
        icon="💬"
      />
      <ToggleSwitch
        enabled={statsCard.showActivityGraph}
        onToggle={(v) => onUpdate({ showActivityGraph: v })}
        label="Activity Timeline Graph"
        description="Visual contribution wave chart"
        icon="📈"
      />
      <ToggleSwitch
        enabled={statsCard.showTrophies}
        onToggle={(v) => onUpdate({ showTrophies: v })}
        label="Profile Trophy Badges"
        description="GitHub ranking and milestone trophies"
        icon="🏆"
      />
    </div>
  );
}
